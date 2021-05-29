// Vendors.
import React, { useState, useReducer, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import FormGroup from "@material-ui/core/FormGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Dayjs from "dayjs";
import { useParams, useHistory } from "react-router-dom";
import { Prompt } from "react-router";
import { useLazyQuery, useMutation, ApolloError } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import clsx from "clsx";

// Custom.
import { VoAuth } from "@vocollege/app";
import VoTextField from "VoTextField";
import {
  VoDatePickerField,
  VoDateTimePickerField,
  VoTimePickerField,
} from "VoPickerField";
import VoSelectField, { VoSelectFieldAvailableValue } from "VoSelectField";
import ContentList from "./fields/ContentList";
import SortableTree from "./fields/SortableTree";
import UrlField from "./fields/UrlField";
import EntityField from "./fields/EntityField";
import TagsField from "./fields/TagsField";
import FileField from "./fields/FileField";
import Switch from "Switch";
import { reducer } from "./state";
import { useStyles } from "./styles";
import {
  FormProps,
  FormField,
  FormTabProps,
  FormFieldContentListItem,
  EntityPickerItem,
  TagsFieldItem,
  FormFieldLocation,
} from "./global";
import FormTabs from "./FormTabs";
import FormViews from "./FormViews";
import FormToolbar from "./FormToolbar";
import VoLoader from "VoLoader";
import ErrorBox from "ErrorBox";
import Editor from "Editor";
import { FileManagerFolderElement } from "FileManager/global";
import { stylesLayout } from "@vocollege/theme";
import { I18n } from "@vocollege/app";
import { fakeMutation } from "@vocollege/app";
import Location from "./fields/Location";

// const useStylesCommon = makeStyles(() => stylesCommon);
const useStylesLayout = makeStyles(() => stylesLayout);

let typingTimer: { [key: string]: number } = {};

const Form: React.FC<FormProps> = (props) => {
  const {
    tabs,
    labels,
    operations,
    variables,
    paths,
    initialState,
    pageTitleField,
    primaryField,
    client,
    onComplete,
    onCancel,
    urlParams,
    createParam = "create",
    classes: classesProp,
    disableToolbar,
    onFormChange,
    onQueryLoading,
  } = props;
  const classes = useStyles();
  useStylesLayout();
  const params = urlParams || useParams<any>();
  const [currentTab, setTab] = useState(0);
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formSaved, setFormSaved] = useState(false);

  const {
    handleSubmit,
    // trigger,
    register,
    // unregister,
    // clearErrors,
    setError,
    setValue,
    reset,
    formState,
    getValues,
  } = useForm({
    mode: "onChange",
    // shouldUnregister: true,
  });

  const { isDirty, isValid, errors } = formState;

  // Methods

  const isCreateNew = () => {
    return params[primaryField || "id"] === createParam;
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (paths?.back) {
      history.push(paths.back);
    }
  };

  const getInputValues = () => {
    const values: { [key: string]: any } = {};
    tabs.forEach((tab: FormTabProps) => {
      tab.fields
        // .filter((field: FormField) => field.name !== primaryField)
        .forEach((field: FormField) => {
          // if (
          //   ["datetime_filed", "date_field", "time_field"].indexOf(field.type) >
          //   -1
          // ) {
          //   values[field.name] = Dayjs(state[field.name]).format(
          //     getDefaultDateFormat(field)
          //   );
          // } else {
          values[field.name] = state[field.name];
          // }
        });
    });
    return values;
  };

  const getDefaultDateFormat = (field: FormField) => {
    if (field?.params?.format) {
      return field?.params?.format;
    }
    switch (field.type) {
      case "datetime_field":
        return "YYYY-MM-DD HH:mm";
      case "time_field":
        return "HH:mm";
      default:
        return "YYYY-MM-DD";
    }
  };

  const handleSave = () => {
    const variables: { [key: string]: any } = {
      input: getInputValues(),
    };
    if (!isCreateNew()) {
      variables[primaryField || "id"] = state[primaryField || "id"];
      update({
        variables: variables,
      });
    } else {
      create({
        variables: variables,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: FormField["onChange"]
  ) => {
    const { name, value } = e.target;
    let newValue: any = value;
    clearTimeout(typingTimer[name]);
    dispatch({ field: name, value: newValue });
    if (onChange) {
      onChange(newValue);
    }
    typingTimer[name] = window.setTimeout(async () => {
      setValue(`${name}` as const, newValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    onChange: FormField["onChange"]
  ) => {
    const { name, value } = e.target;
    if (!name) {
      return;
    }
    dispatch({ field: name, value: value });
    if (onChange) {
      onChange(value);
    }
    setValue(`${name}` as const, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: FormField
  ) => {
    const { name } = e.target;
    let newValue: boolean | number;
    if (field?.params?.boolean) {
      newValue = e.target.checked;
    } else {
      newValue = e.target.checked ? 1 : 0;
    }
    dispatch({ field: field.name, value: newValue });
    if (field.onChange) {
      field.onChange(newValue);
    }
    setValue(`${name}` as const, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleEditorChange = (
    content: string,
    field: string,
    onChange: FormField["onChange"]
  ) => {
    clearTimeout(typingTimer[field]);
    dispatch({ field: field, value: content });
    if (onChange) {
      onChange(content);
    }
    typingTimer[field] = window.setTimeout(async () => {
      setValue(`${field}` as const, content, { shouldDirty: true });
    }, 300);
  };

  const handleContentListChange = (
    items: FormFieldContentListItem[],
    field: string,
    fieldParams: any,
    onChange: FormField["onChange"]
  ) => {
    clearTimeout(typingTimer[field]);
    let parsedItems = items.map((v: FormFieldContentListItem) => {
      if (!fieldParams || !fieldParams.fields) {
        return v;
      }
      let titleField = fieldParams.fields[v.type.toLowerCase()]?.title;
      return {
        id: v.id,
        [titleField]: v.title,
        type: v.type,
      };
    });
    dispatch({ field: field, value: parsedItems });
    if (onChange) {
      onChange(parsedItems);
    }
    typingTimer[field] = window.setTimeout(async () => {
      setValue(`${field}` as const, items, { shouldDirty: true });
    }, 300);
  };

  const handleContentListReset = (field: string) => {
    dispatch({ field: field, value: data[operations.category][field] });
  };

  const handleSortableTreeChange = (
    items: any[],
    field: string,
    onChange: FormField["onChange"]
  ) => {
    clearTimeout(typingTimer[field]);
    dispatch({ field: field, value: items });
    if (onChange) {
      onChange(items);
    }
    typingTimer[field] = window.setTimeout(async () => {
      setValue(`${field}` as const, items, { shouldDirty: true });
    }, 300);
  };

  const handleSortableTreeChangeReset = (field: string) => {
    dispatch({ field: field, value: data[operations.category][field] });
  };

  const handleChangeUrl = (
    field: string,
    value: string,
    onChange: FormField["onChange"]
  ) => {
    clearTimeout(typingTimer[field]);
    dispatch({ field: field, value: value });
    if (onChange) {
      onChange(value);
    }
    typingTimer[field] = window.setTimeout(() => {
      setValue(`${field}` as const, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleChangeUser = (field: string, item: EntityPickerItem) => {
    let value = `${item.id} - ${item.title}`;
    dispatch({ field: field, value: value });
    setValue(`${field}` as const, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleUserFieldReset = (
    field: string,
    type: string,
    defaultValue = true
  ) => {
    handleChangeUser(field, {
      id: defaultValue ? VoAuth.currentUser.id : 0,
      title: defaultValue ? VoAuth.currentUser.name : "",
      type: type,
    });
  };

  const handleChangeDate = (
    field: string,
    date: MaterialUiPickersDate,
    onChange: FormField["onChange"],
    format: string
  ) => {
    let value = date?.format(format);
    // let value = date;
    dispatch({ field: field, value: value });
    if (onChange) {
      onChange(value);
    }
    setValue(`${field}` as const, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleChangeTags = (field: string, items: TagsFieldItem[]) => {
    dispatch({ field: field, value: items });
    setValue(`${field}` as const, items, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleChangeFile = (
    field: string,
    files: FileManagerFolderElement[],
    onChange: FormField["onChange"]
  ) => {
    dispatch({ field: field, value: files });
    setValue(`${field}` as const, files, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (onChange) {
      onChange(files);
    }
  };

  const handleChangeLocation = (field: string, location: FormFieldLocation) => {
    let value =
      location.latitude !== "" && location.longitude !== "" ? location : "";
    dispatch({ field: field, value: value });
    setValue(`${field}` as const, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const getPageTitle = () => {
    if (isCreateNew()) {
      return labels.create;
    } else if (!data) {
      return labels.loading;
    } else {
      return (
        <>
          {data[operations.category][pageTitleField]} (
          {data[operations.category][primaryField || "id"]})
        </>
      );
    }
  };

  const getContentListItems = (items: any, fieldParams: any) => {
    if (!items || !fieldParams || !fieldParams.fields) {
      return items;
    }
    return items.map((v: any) => {
      let titleField = fieldParams.fields[v.type.toLowerCase()]?.title;
      return {
        id: v.id,
        title: v[titleField] ? v[titleField] : v.title,
        type: v.type,
      };
    });
  };

  const getAvailableValues = (
    field: FormField
  ): VoSelectFieldAvailableValue[] => {
    if (field.params?.availableValues) {
      return field.params?.availableValues(data);
    }
    return [];
  };

  const getSelectValue = (field: FormField) => {
    if (!state[field.name]) {
      return "";
    }
    if (Array.isArray(state[field.name])) {
      return state[field.name][0] ? state[field.name][0].id : "";
    }
    return state[field.name];
  };

  const getField = (field: FormField) => {
    let visible = true;
    if (field.params?.dependency) {
      for (let fieldDependee in field.params?.dependency) {
        visible =
          (state[fieldDependee] ===
            field.params?.dependency[fieldDependee].value) ===
          field.params?.dependency[fieldDependee].visibility;
      }
      if (!visible) {
        return "";
      }
    }

    register(`${field.name}` as const, field?.validation);

    if (field.validation && field.validation.match) {
      field.validation.validate = {
        matchesField: (value: string) => {
          let valueToCompare = getValues(field?.validation?.match.field);
          return valueToCompare === value || field?.validation?.match.message;
        },
      };
    }

    if (field.render) {
      return field.render(state[field.name]);
    }

    let format = "";

    switch (field.type) {
      case "text":
        return (
          <VoTextField
            name={field.name}
            label={field.label}
            value={state[field.name] || ""}
            onChange={(e) => handleChange(e, field.onChange)}
            variant="filled"
            fullWidth
            type={field.inputType || "text"}
            required={field.required}
            error={!!errors[field.name]}
            helperText={errors[field.name] ? errors[field.name]?.message : ""}
            hidden={field.hidden}
          />
        );
      case "select":
        return (
          <VoSelectField
            SelectProps={{
              name: field.name,
              value: getSelectValue(field),
              onChange: (event) => handleSelectChange(event, field.onChange),
            }}
            availableValues={getAvailableValues(field)}
            label={field.label}
            fullWidth
            required={field.required}
            error={!!errors[field.name]}
            helperText={errors[field.name] ? errors[field.name]?.message : ""}
          />
        );
      case "switch":
        return (
          <Switch
            checked={
              !field?.params?.boolean
                ? state[field.name] === 1
                : state[field.name]
            }
            onChange={(e) => handleCheckChange(e, field)}
            label={field.label}
            name={field.name}
          />
        );
      case "editor":
        return (
          <Editor
            value={state[field.name]}
            onChange={(content: any) =>
              handleEditorChange(content, field.name, field.onChange)
            }
          />
        );
      case "content_list":
        return (
          <ContentList
            name={field.name}
            label={field.label}
            onChange={(items: FormFieldContentListItem[]) =>
              handleContentListChange(
                items,
                field.name,
                field.params,
                field.onChange
              )
            }
            onReset={() => handleContentListReset(field.name)}
            items={getContentListItems(state[field.name], field.params)}
            types={field.params?.types}
            contentType={field.params?.contentType}
            multiple={field.params?.multiple}
          />
        );

      case "sortable_tree":
        return (
          <SortableTree
            name={field.name}
            label={field.label}
            onChange={(items) =>
              handleSortableTreeChange(items, field.name, field.onChange)
            }
            onReset={() => handleSortableTreeChangeReset(field.name)}
            items={state[field.name]}
            types={field.params?.types}
          />
        );

      case "url_field":
        return (
          <UrlField
            name={field.name}
            label={field.label}
            value={state[field.name]}
            overrideValue={field.overrideValue}
            onChange={(url) => handleChangeUrl(field.name, url, field.onChange)}
            helperText={
              errors[field.name]
                ? errors[field.name]?.message
                : field?.params?.dependencyHelperText
            }
            fieldLock={field.params?.fieldLock}
            notNew={!isCreateNew}
          />
        );
      case "user_field":
        let defaultValue =
          typeof field.params?.defaultValue !== "undefined"
            ? field.params?.defaultValue
            : true;
        return (
          <EntityField
            name={field.name}
            label={field.label}
            value={state[field.name]}
            onChange={(item) => handleChangeUser(field.name, item)}
            onReset={() =>
              handleUserFieldReset(
                field.name,
                field.params?.types,
                defaultValue
              )
            }
            required={field?.required}
            types={field.params?.types}
            primaryField={field.params?.primaryField || "id"}
          />
        );
      case "date_field":
        format = getDefaultDateFormat(field);
        return (
          <VoDatePickerField
            name={field.name}
            label={field.label}
            value={Dayjs(state[field.name], format)}
            onChange={(value) =>
              handleChangeDate(field.name, value, field.onChange, format)
            }
            format={format}
            required={field?.required}
            fullWidth
          />
        );
      case "datetime_field":
        format = getDefaultDateFormat(field);
        return (
          <VoDateTimePickerField
            name={field.name}
            label={field.label}
            value={Dayjs(state[field.name], format)}
            onChange={(value) =>
              handleChangeDate(field.name, value, field.onChange, format)
            }
            format={format}
            required={field?.required}
            fullWidth
          />
        );
      case "time_field":
        format = getDefaultDateFormat(field);
        return (
          <VoTimePickerField
            name={field.name}
            label={field.label}
            value={Dayjs(state[field.name], format)}
            onChange={(value) =>
              handleChangeDate(field.name, value, field.onChange, format)
            }
            format={format}
            required={field?.required}
            fullWidth
          />
        );
      case "tags_field":
        return (
          <TagsField
            label={field.label}
            value={state[field.name]}
            onChange={(items) => handleChangeTags(field.name, items)}
            required={field?.required}
            types={field.params?.types}
            addNew={field.params?.addNew}
          />
        );
      case "file_field":
        return (
          <FileField
            label={field.label}
            value={state[field.name]}
            required={field?.required}
            onChange={(files: FileManagerFolderElement[]) =>
              handleChangeFile(field.name, files, field.onChange)
            }
            filetypes={field.params?.filetypes}
            multiple={field.params?.multiple}
            directUpload={field.params?.directUpload}
            portfolio={field.params?.portfolio}
            operations={field.params?.operations}
          />
        );
      case "location":
        return (
          <Location
            label={field.label}
            value={state[field.name]}
            required={field?.required}
            onChange={(location) => handleChangeLocation(field.name, location)}
          />
        );
      default:
        return <div>DEFAULT</div>;
    }
  };

  const setValidationError = (error: ApolloError["graphQLErrors"]) => {
    error.forEach((v: any) => {
      if (v.extensions && v.extensions.validation) {
        for (let field in v.extensions.validation) {
          setError(
            `${field}` as const,
            {
              type: v.extensions.category,
              message: v.extensions.validation[field].join(" | "),
            },
            { shouldFocus: true }
          );
        }
      }
    });
  };

  const handleCompleted = (data: any) => {
    setFormSaved(true);
    toast.success(labels.saved);
    if (onComplete) {
      onComplete();
    } else if (paths?.back) {
      history.push(paths.back, { refetch: true });
    }
  };

  const handleError = (error: any) => {
    setValidationError(error.graphQLErrors);
    toast.error(error.message, { autoClose: 10000 });
  };

  const getOperation = () => {
    return isCreateNew() && operations.getOnCreate
      ? operations.getOnCreate
      : operations.get;
  };

  // API

  const [
    loadQuery,
    { error: queryError, data, called: queryCalled, loading: queryLoading },
  ] = useLazyQuery(getOperation(), {
    client: client || undefined,
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    variables: {
      [primaryField || "id"]: params[primaryField || "id"],
    },
  });

  const [create, { loading: createLoading }] = useMutation(
    operations.create || fakeMutation,
    {
      client: client || undefined,
      onError: handleError,
      onCompleted: handleCompleted,
    }
  );

  const [update, { loading: updateLoading }] = useMutation(operations.update, {
    client: client || undefined,
    onError: handleError,
    onCompleted: handleCompleted,
  });

  // useEffect

  useEffect(() => {
    let callLoadQuery = !queryCalled;
    if (isCreateNew()) {
      reset(initialState);
      if (operations) {
        callLoadQuery = typeof operations.getOnCreate !== "undefined" || false;
      }
    }
    if (callLoadQuery) {
      loadQuery({
        variables: {
          ...variables,
        },
      });
    }

    // if (isCreateNew()) {
    //   reset(initialState);
    // } else if (!queryCalled) {
    //   loadQuery({
    //     variables: {
    //       ...variables,
    //     },
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
    return () => {
      window.onbeforeunload = null;
    };
  });

  useEffect(() => {
    if (data && data[operations.category]) {
      let mergedData = { ...initialState, ...data[operations.category] };
      dispatch({
        item: mergedData,
      });
      reset(mergedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (onFormChange) {
      onFormChange({
        isDirty,
        isValid,
      });
    }
  }, [isDirty, isValid]);

  useEffect(() => {
    if (onQueryLoading) {
      onQueryLoading(queryLoading);
    }
  }, [queryLoading]);

  if (queryError) {
    toast.error(queryError.message, { autoClose: 10000 });
  }

  return (
    <div>
      {/* <Prompt
        when={isDirty && !formSaved}
        message={I18n.get.form.messages.unsavedContent}
      /> */}
      {(queryLoading || createLoading || updateLoading) && (
        <VoLoader />
        // <VoLoader noOverlay={data && queryLoading} />
      )}
      {!queryLoading && queryError && (
        <div className="vo-global__top-bottom-space">
          <ErrorBox
            severity="error"
            title={I18n.get.misc.error}
            content={JSON.stringify(queryError)}
          />
        </div>
      )}
      {!queryLoading && !queryError && (
        <form
          className={clsx(classes.root, classesProp?.root)}
          noValidate
          autoComplete="off"
        >
          {/* <div style={{ marginTop: 100 }}>{JSON.stringify(state)}</div> */}
          {/* <div style={{ marginTop: 100 }}>{JSON.stringify(getValues())}</div> */}
          {/* <div style={{ marginTop: 100 }}>{JSON.stringify(formState)}</div> */}
          {/* <div style={{ marginTop: 100 }}>{JSON.stringify(errors)}</div> */}
          {!disableToolbar && (
            <FormToolbar
              title={getPageTitle()}
              onSave={handleSubmit(handleSave)}
              onCancel={handleCancel}
              loading={createLoading || updateLoading}
              options={{
                saveButton: {
                  disabled: !isDirty || !isValid,
                },
              }}
              className={classesProp?.toolbar}
            />
          )}
          <Paper
            elevation={10}
            className={classesProp?.paper}
            classes={{ root: classesProp?.paperRoot }}
          >
            <Grid container spacing={4}>
              {tabs.length > 1 && (
                <Grid item xs={12}>
                  <FormTabs
                    tabs={tabs}
                    currentTab={currentTab}
                    setTab={setTab}
                  ></FormTabs>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormViews currentTab={currentTab} setTab={setTab}>
                  {tabs.map((tab: FormTabProps, index: number) => {
                    return (
                      <Box key={index}>
                        <Grid container spacing={3}>
                          {tab.fields.map(
                            (field: FormField, fieldIndex: number) => {
                              let fieldElement = getField(field);
                              return (
                                fieldElement && (
                                  <Grid key={fieldIndex} item {...field.grid}>
                                    {fieldElement}
                                  </Grid>
                                )
                              );
                            }
                          )}
                        </Grid>
                      </Box>
                    );
                  })}
                </FormViews>
              </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    </div>
  );
};

export default Form;
