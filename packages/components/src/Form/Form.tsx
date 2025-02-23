// Vendors.
import React, { useState, useReducer, useEffect, useRef } from "react";
import {
  Paper,
  Box,
  Grid,
  Alert,
  List,
  ListItem,
  TextField,
  Autocomplete,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import Dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation, ApolloError } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import clsx from "clsx";

// Custom.
import VoTextField from "@/VoTextField";
import VoTextArea from "@/VoTextArea";
import {
  VoDatePickerField,
  VoDateTimePickerField,
  VoTimePickerField,
} from "@/VoPickerField";
import VoSelectField, { VoSelectFieldValue } from "@/VoSelectField";
import ContentList from "./fields/ContentList";
import SortableTree from "./fields/SortableTree";
import UrlField from "./fields/UrlField";
import EntityField from "./fields/EntityField";
import TagsField from "./fields/TagsField";
import FileField from "./fields/FileField";
import Switch from "@/Switch";
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
import VoLoader from "@/VoLoader";
import ErrorBox from "@/ErrorBox";
import Editor from "@/Editor";
import { FileManagerFolderElement } from "@/FileManager/global";
import { stylesLayout } from "@vocollege/theme";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { GeneralObject, fakeMutation } from "@vocollege/app";
import Location from "./fields/Location";
import Checkboxes from "./fields/Checkboxes";
import TransferList from "./fields/TransferList";
import { getError } from "@vocollege/app/dist/modules/VoHelpers";

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
    onSave,
    urlParams,
    createParam = "create",
    classes: classesProp,
    disableToolbar,
    onFormChange,
    onQueryLoading,
    renderPageTitle,
    initialData,
    onDataChange,
    loadQueryOnParamsChange = false,
    toolbarProps,
    header,
    refetchQueries,
    autosave,
    autosaveInterval,
  } = props;
  const classes = useStyles();
  useStylesLayout();
  const params = urlParams || useParams<any>();
  const [currentTab, setTab] = useState(0);
  const autosaveIntervalId = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    handleSubmit,
    register,
    trigger,
    setError,
    setValue,
    reset,
    formState,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const { isDirty, isValid, errors } = formState;

  // Methods
  const initiateAutosave = () => {
    if (!autosave) {
      return;
    }
    if (!autosaveIntervalId.current) {
      autosaveIntervalId.current = setInterval(() => {
        handleSave("autosave");
      }, autosaveInterval || 1000);
    }
  };

  const onSubmit = () => {
    handleSave("submit");
  };

  const isCreateNew = () => {
    return params[primaryField || "id"] === createParam;
  };

  const redirect = (params: { [key: string]: any } = {}) => {
    if (paths?.back) {
      window.location.href = paths.back;
    }
  };

  const handleCancel = () => {
    if (autosave && isValid && isDirty) {
      // autosave
      handleSave("autosave");
    }
    if (onCancel) {
      onCancel(state);
    } else {
      redirect();
    }
  };

  const getInputValues = (customCategory: null | string = null) => {
    const values: { [key: string]: any } = {};
    tabs.forEach((tab: FormTabProps) => {
      tab.fields
        .filter((field: FormField) => {
          if (customCategory) {
            return field.name.indexOf(`${customCategory}.`) > -1;
          }
          return field.name.indexOf(".") === -1;
        })
        .forEach((field: FormField) => {
          let fieldName = field.name;
          if (field.name.indexOf(".") > -1) {
            let fieldParts = field.name.split(".");
            fieldName = fieldParts[1];
          }
          let value = state[field.name];
          if (state[field.name] && field.type === "entity_field") {
            value = {
              id: state[field.name].id,
              type: state[field.name].type || "",
            };
          }
          values[fieldName] = value;
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

  const handleSave = (saveType?: string) => {
    let variables: { [key: string]: any } = {
      input: getInputValues(),
    };
    // Find custom data categories.
    let customCategoryFields = Object.keys(state).filter(
      (field: string) => field.indexOf(".") > -1
    );
    if (customCategoryFields.length > 0) {
      customCategoryFields?.map((field: string) => {
        let fieldParts = field.split(".");
        variables[fieldParts[0]] = getInputValues(fieldParts[0]);
      });
    }
    if (onSave) {
      variables = onSave(variables, saveType || "save");
    }
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

  const handleChangeCustomField = (
    name: string,
    value: any,
    onChange: FormField["onChange"]
  ) => {
    clearTimeout(typingTimer[name]);
    dispatch({ field: name, value });
    if (onChange) {
      onChange(value, data);
    }
    typingTimer[name] = window.setTimeout(async () => {
      setValue(`${name}` as const, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
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
      onChange(newValue, data);
    }
    typingTimer[name] = window.setTimeout(async () => {
      setValue(`${name}` as const, newValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleSelectChange = (e: any, onChange: FormField["onChange"]) => {
    const { name, value } = e.target;
    if (!name) {
      return;
    }
    dispatch({ field: name, value: value });
    if (onChange) {
      onChange(value, data);
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
      field.onChange(newValue, data);
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
      onChange(content, data);
    }
    typingTimer[field] = window.setTimeout(async () => {
      setValue(`${field}` as const, content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleContentListChange = (
    items: FormFieldContentListItem[],
    field: string,
    fieldParams: any,
    onChange: FormField["onChange"]
  ) => {
    clearTimeout(typingTimer[field]);

    dispatch({ field: field, value: items });
    if (onChange) {
      onChange(items, data);
    }
    typingTimer[field] = window.setTimeout(async () => {
      setValue(`${field}` as const, items, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleAutocompleteChange = (
    field: string,
    value: any,
    onChange: FormField["onChange"]
  ) => {
    dispatch({ field: field, value: value });
    if (onChange) {
      onChange(value, data);
    }
    typingTimer[field] = window.setTimeout(async () => {
      setValue(`${field}` as const, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
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
      onChange(items, data);
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
      onChange(value, data);
    }
    typingTimer[field] = window.setTimeout(() => {
      setValue(`${field}` as const, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleChangeEntity = (
    field: string,
    item: EntityPickerItem | null,
    onChange: FormField["onChange"] | null
  ) => {
    dispatch({ field: field, value: item });
    setValue(`${field}` as const, item, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (onChange) {
      onChange(item, data);
    }
  };

  const handleChangeDate = (
    field: string,
    date: any,
    onChange: FormField["onChange"],
    format: string
  ) => {
    let value = Dayjs(date, format).format(format);
    dispatch({ field: field, value: value });
    if (onChange) {
      onChange(value, data);
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
      onChange(files, data);
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

  const handleChangeCheckboxes = (
    field: string,
    values: String[],
    onChange: FormField["onChange"]
  ) => {
    dispatch({ field: field, value: values });
    setValue(`${field}` as const, values, {
      shouldValidate: true,
      shouldDirty: true,
    });
    if (onChange) {
      onChange(values, data);
    }
  };

  const getPageTitle = () => {
    if (renderPageTitle) {
      return renderPageTitle(state);
    } else if (isCreateNew()) {
      return labels.create;
    } else if (!data) {
      return labels.loading;
    } else if (pageTitleField) {
      return (
        <>
          {data[operations.category][pageTitleField]} (
          {data[operations.category][primaryField || "id"]})
        </>
      );
    } else {
      return "";
    }
  };

  const getAvailableValues = (field: FormField): VoSelectFieldValue[] => {
    if (field.params?.availableValues) {
      return field.params?.availableValues(data, state);
    }
    return [];
  };

  const getSelectValue = (field: FormField, multiple?: boolean) => {
    if (multiple) {
      return state[field.name] || [];
    }
    if (!state[field.name] && state[field.name] !== 0) {
      return "";
    }
    if (Array.isArray(state[field.name])) {
      return state[field.name][0] ? state[field.name][0].id : "";
    }
    return state[field.name];
  };

  const getAutocompleteOptions = (field: FormField): GeneralObject[] => {
    if (field.params?.options) {
      return field.params?.options(data);
    }
    return [];
  };

  const getField = (field: FormField) => {
    let visible = true;

    if (field.params?.dependency) {
      for (let fieldDependee in field.params?.dependency) {
        let dependencyValue = field.params?.dependency[fieldDependee].value;
        if (Array.isArray(dependencyValue)) {
          visible =
            field.params?.dependency[fieldDependee].value.indexOf(
              state[fieldDependee]
            ) >
              -1 ===
            field.params?.dependency[fieldDependee].visibility;
        } else {
          visible =
            (state[fieldDependee] ===
              field.params?.dependency[fieldDependee].value) ===
            field.params?.dependency[fieldDependee].visibility;
        }
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
      // @note
      // field?.overrideValue
      // Look at useEffect(() => {}, [tabs])
      // If placed here it causes infinite loop on React.

      return field.render(state[field.name], data);
    }

    let format = "";

    let runOnChange = (func: any, ...args: any[]) => {
      func(...args);
      if (field.hasOwnProperty("triggers")) {
        trigger(field.triggers);
      }
    };

    switch (field.type) {
      case "text":
        return (
          <VoTextField
            name={field.name}
            label={field.label}
            value={state[field.name] || ""}
            onChange={(e) => runOnChange(handleChange, e, field.onChange)}
            variant="filled"
            fullWidth
            type={field.inputType || "text"}
            required={field.required}
            error={!!errors[field.name]}
            helperText={
              errors[field.name]
                ? errors[field.name]?.message
                : field?.params?.helperText || ""
            }
            hidden={field.hidden}
            inputProps={field?.params && field?.params?.inputProps}
            {...field?.params}
          />
        );
      case "textarea":
        return (
          <VoTextArea
            name={field.name}
            label={field.label}
            value={state[field.name] || ""}
            onChange={(e) => runOnChange(handleChange, e, field.onChange)}
            required={field.required}
            helperText={
              errors[field.name]
                ? errors[field.name]?.message
                : field?.params?.helperText || ""
            }
            hidden={field.hidden}
            {...field?.params}
          />
        );
      case "select":
        return (
          <VoSelectField
            SelectProps={{
              name: field.name,
              value: getSelectValue(field, field.params?.multiple),
              onChange: (event) =>
                runOnChange(handleSelectChange, event, field.onChange),
              disabled: field.params?.disabled,
              multiple: field.params?.multiple,
              renderValue: field.params?.renderValue,
            }}
            availableValues={getAvailableValues(field)}
            label={field.label}
            fullWidth
            required={field.required}
            error={!!errors[field.name]}
            helperText={
              errors[field.name]
                ? errors[field.name]?.message
                : field?.params?.helperText || ""
            }
          />
        );
      case "switch":
        return (
          <Switch
            checked={
              !field?.params?.boolean
                ? state[field.name] === 1
                : Boolean(state[field.name])
            }
            onChange={(e) => runOnChange(handleCheckChange, e, field)}
            label={field.label}
            name={field.name}
            disabled={field.params?.disabled}
            helperText={field?.params?.helperText || ""}
          />
        );
      case "editor":
        return (
          <Editor
            value={state[field.name]}
            onChange={(content: any) =>
              runOnChange(
                handleEditorChange,
                content,
                field.name,
                field.onChange
              )
            }
            editorSettings={field.params?.editorSettings}
            label={field.label}
            disabled={field.params?.disabled}
          />
        );
      case "content_list":
        return (
          <ContentList
            name={field.name}
            label={field.label}
            onChange={(items: FormFieldContentListItem[]) =>
              runOnChange(
                handleContentListChange,
                items,
                field.name,
                field.params,
                field.onChange
              )
            }
            onReset={() => handleContentListReset(field.name)}
            items={state[field.name]}
            contentType={field.params?.contentType}
            multiple={field.params?.multiple}
            renderItemTitle={field.params?.renderItemTitle}
            dialog={field.params?.dialog}
            required={field?.required}
            createCallback={field.params?.createCallback}
            createCallbackLabel={field.params?.createCallbackLabel}
            overrideValue={field?.overrideValue}
            renderActionButtons={field.params?.renderActionButtons}
            hideType={field.params?.hideType}
            renderExtraDetails={field.params?.renderExtraDetails}
          />
        );

      case "sortable_tree":
        return (
          <SortableTree
            name={field.name}
            label={field.label}
            onChange={(items) =>
              runOnChange(
                handleSortableTreeChange,
                items,
                field.name,
                field.onChange
              )
            }
            onReset={() => handleSortableTreeChangeReset(field.name)}
            items={state[field.name]}
            dialog={field.params?.dialog}
          />
        );

      case "url_field":
        return (
          <UrlField
            name={field.name}
            label={field.label}
            value={state[field.name]}
            overrideValue={field.overrideValue}
            onChange={(url) =>
              runOnChange(handleChangeUrl, field.name, url, field.onChange)
            }
            helperText={
              errors[field.name]
                ? errors[field.name]?.message
                : field?.params?.dependencyHelperText
            }
            fieldLock={field.params?.fieldLock}
            notNew={!isCreateNew()}
          />
        );
      case "entity_field":
        return (
          <EntityField
            name={field.name}
            label={field.label}
            value={state[field.name]}
            onChange={(item) =>
              runOnChange(handleChangeEntity, field.name, item, field.onChange)
            }
            onReset={() =>
              runOnChange(handleChangeEntity, field.name, null, field.onChange)
            }
            required={field?.required}
            fields={field.params?.fields}
            dialog={field.params?.dialog}
            renderFieldValue={field.params?.renderFieldValue}
            createCallback={field.params?.createCallback}
            createCallbackLabel={field.params?.createCallbackLabel}
            overrideValue={field.overrideValue}
          />
        );
      case "date_field":
        format = getDefaultDateFormat(field);
        return (
          <VoDatePickerField
            renderInput={(params: any) => (
              <VoTextField
                name={field.name}
                required={field?.required}
                fullWidth
                {...params}
                variant="filled"
                helperText={
                  errors[field.name]
                    ? errors[field.name]?.message
                    : field?.params?.helperText || ""
                }
              />
            )}
            label={field.label}
            value={state[field.name] ? Dayjs(state[field.name], format) : null}
            onChange={(value: any) =>
              runOnChange(
                handleChangeDate,
                field.name,
                value,
                field.onChange,
                format
              )
            }
            inputFormat={format}
            mask={field?.params?.mask}
          />
        );
      case "datetime_field":
        format = getDefaultDateFormat(field);
        return (
          <VoDateTimePickerField
            renderInput={(params: any) => (
              <VoTextField
                name={field.name}
                required={field?.required}
                fullWidth
                {...params}
                variant="filled"
                helperText={
                  errors[field.name]
                    ? errors[field.name]?.message
                    : field?.params?.helperText || ""
                }
              />
            )}
            label={field.label}
            value={state[field.name] ? Dayjs(state[field.name], format) : null}
            onChange={(value: any) =>
              runOnChange(
                handleChangeDate,
                field.name,
                value,
                field.onChange,
                format
              )
            }
            inputFormat={format}
            mask={field?.params?.mask}
          />
        );
      case "time_field":
        format = getDefaultDateFormat(field);
        return (
          <VoTimePickerField
            renderInput={(params: any) => (
              <VoTextField
                name={field.name}
                required={field?.required}
                fullWidth
                {...params}
                variant="filled"
                helperText={
                  errors[field.name]
                    ? errors[field.name]?.message
                    : field?.params?.helperText || ""
                }
              />
            )}
            label={field.label}
            value={state[field.name] ? Dayjs(state[field.name], format) : null}
            onChange={(value: any) =>
              runOnChange(
                handleChangeDate,
                field.name,
                value,
                field.onChange,
                format
              )
            }
            inputFormat={format}
            mask={field?.params?.mask}
          />
        );
      case "tags_field":
        return (
          <TagsField
            label={field.label}
            value={state[field.name]}
            onChange={(items) =>
              runOnChange(handleChangeTags, field.name, items)
            }
            required={field?.required}
            dialog={field.params?.dialog}
          />
        );
      case "file_field":
        return (
          <FileField
            label={field.label}
            value={state[field.name]}
            required={field?.required}
            onChange={(files: FileManagerFolderElement[]) =>
              runOnChange(handleChangeFile, field.name, files, field.onChange)
            }
            filetypes={field.params?.filetypes}
            multiple={field.params?.multiple}
            directUpload={field.params?.directUpload}
            portfolio={field.params?.portfolio}
            operations={field.params?.operations}
            client={client}
          />
        );
      case "location":
        return (
          <Location
            label={field.label}
            value={state[field.name]}
            required={field?.required}
            onChange={(location) =>
              runOnChange(handleChangeLocation, field.name, location)
            }
          />
        );
      case "checkboxes":
        return (
          <Checkboxes
            label={field.label}
            values={state[field.name]}
            availableValues={field.params?.availableValues}
            required={field?.required}
            onChange={(values) =>
              runOnChange(
                handleChangeCheckboxes,
                field.name,
                values,
                field.onChange
              )
            }
            row={field.params?.row}
          />
        );

      case "transfer_list":
        return (
          <TransferList
            name={field.name}
            label={field.label}
            sourceLabel={field.params?.sourceLabel}
            targetLabel={field.params?.targetLabel}
            source={field.params?.getSource(data) || []}
            target={state[field.name]}
            renderItemTitle={field.params?.renderItemTitle}
            renderItemDetails={field.params?.renderItemDetails}
            onChange={(items: FormFieldContentListItem[]) =>
              runOnChange(
                handleContentListChange,
                items,
                field.name,
                field.params,
                field.onChange
              )
            }
          />
        );

      case "autocomplete":
        return (
          <Autocomplete
            {...field.params?.AutocompleteProps}
            options={getAutocompleteOptions(field)}
            disablePortal
            ChipProps={{ size: "small", ...field.params?.ChipProps }}
            value={
              state[field.name] ??
              (field.params?.AutocompleteProps.multiple ? [] : null)
            }
            onChange={(event, newValue) =>
              runOnChange(
                handleAutocompleteChange,
                field.name,
                newValue,
                field.onChange
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                {...field.params?.TextFieldProps}
                helperText={
                  errors[field.name]
                    ? errors[field.name]?.message
                    : field.params?.TextFieldProps?.helperText
                }
                label={field.label}
              />
            )}
          />
        );
      case "list":
        return (
          <List
            sx={{
              listStyleType: "disc",
              listStylePosition: "inside",
            }}
            {...field?.params}
          >
            {field.params?.items?.map((item) => (
              <ListItem sx={{ display: "list-item" }} dense={true}>
                {item}
              </ListItem>
            ))}
          </List>
        );

      case "info":
        return (
          <Alert severity="info" variant="outlined">
            {field.label}
          </Alert>
        );

      case "hidden":
        return (
          <input type="hidden" name={field.name} value={state[field.name]} />
        );

      case "empty":
        return "";

      default:
        return <div></div>;
    }
  };

  const setValidationError = (error: ApolloError["graphQLErrors"]) => {
    if (!error) {
      return;
    }
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

  const getToastAutoCloseTime = (message: string) => {
    let time = Math.round(message.length / 6) * 1000;
    if (time > 20000) {
      return 20000;
    }
    return time > 4000 ? time : 4000;
  };

  const handleCompleted = (data: any, message = "") => {
    toast.success(message, { autoClose: getToastAutoCloseTime(message) });
    if (onComplete) {
      onComplete(data);
    } else {
      redirect({ refetch: true });
    }
  };

  const handleError = (error: any) => {
    console.error("error", error);
    setValidationError(error.graphQLErrors);
    let errorMessages = getError(error);
    if (errorMessages.fields) {
      Object.keys(errorMessages.fields).forEach((field: string) => {
        let message =
          errorMessages?.fields && errorMessages.fields[field]
            ? errorMessages.fields[field].join(" | ")
            : null;

        if (message) {
          toast.error(message, {
            autoClose: getToastAutoCloseTime(message),
          });
        }
      });
    } else {
      toast.error(errorMessages.message, {
        autoClose: getToastAutoCloseTime(error.message),
      });
    }
  };

  const getOperation = () => {
    return isCreateNew() && operations.getOnCreate
      ? operations.getOnCreate
      : operations.get;
  };

  const setData = (data: any) => {
    let mergedData: { [key: string]: any } = {};
    Object.keys(initialState)?.map((field: any) => {
      if (field.indexOf(".") > -1) {
        let fieldParts = field.split(".");
        if (fieldParts.length === 3) {
          mergedData[field] =
            data[fieldParts[0]][fieldParts[1]][fieldParts[2]] ||
            initialState[field];
          mergedData[field] =
            data[fieldParts[0]] &&
            data[fieldParts[0]][fieldParts[1]] &&
            data[fieldParts[0]][fieldParts[1]][fieldParts[2]] !== undefined
              ? data[fieldParts[0]][fieldParts[1]][fieldParts[2]]
              : initialState[field];
        } else {
          mergedData[field] =
            data[fieldParts[0]] &&
            data[fieldParts[0]][fieldParts[1]] !== undefined
              ? data[fieldParts[0]][fieldParts[1]]
              : initialState[field];
        }
      } else {
        mergedData[field] =
          typeof data[operations.category][field] !== undefined
            ? data[operations.category][field]
            : initialState[field];
      }
    });
    dispatch({
      item: mergedData,
    });
    reset(mergedData, { keepIsValid: true });
    if (onDataChange) {
      onDataChange(mergedData, data);
    }
  };

  const getVariables = () => {
    let queryVariables = {
      [primaryField || "id"]: params[primaryField || "id"],
    };
    if (variables) {
      queryVariables = {
        ...queryVariables,
        ...variables,
      };
    }
    return queryVariables;
  };

  // API
  const [
    loadQuery,
    {
      error: queryError,
      data,
      called: queryCalled,
      loading: queryLoading,
      // refetch,
    },
  ] = useLazyQuery(getOperation(), {
    client: client || undefined,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    errorPolicy: "all",
  });

  const [create, { loading: createLoading }] = useMutation(
    operations.create || fakeMutation,
    {
      client: client || undefined,
      refetchQueries,
      onError: handleError,
      onCompleted: (data: any) => handleCompleted(data, labels.created),
    }
  );

  const [update, { loading: updateLoading }] = useMutation(
    operations.update || fakeMutation,
    {
      client: client || undefined,
      refetchQueries,
      onError: handleError,
      onCompleted: (data: any) => handleCompleted(data, labels.updated),
    }
  );

  // Effects.
  useEffect(() => {
    let callLoadQuery = !queryCalled;
    if (isCreateNew()) {
      reset(initialState);
      if (operations) {
        callLoadQuery = typeof operations.getOnCreate !== "undefined" || false;
      }
    }
    if (callLoadQuery) {
      if (initialData) {
        setData(initialData);
      } else {
        loadQuery({
          variables: getVariables(),
        });
      }
    } else if (initialData) {
      setData(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
    return () => {
      if (autosaveIntervalId.current) {
        clearInterval(autosaveIntervalId.current);
      }
      window.onbeforeunload = null;
    };
  });

  useEffect(() => {
    if (data && data[operations.category]) {
      setData(data);
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
    if (autosave && isDirty && isValid) {
      // set new interval of save

      initiateAutosave();
    }
  }, [isDirty, isValid]);

  useEffect(() => {
    if (onQueryLoading) {
      onQueryLoading(queryLoading);
    }
  }, [queryLoading]);

  useEffect(() => {
    if (loadQueryOnParamsChange && !isCreateNew()) {
      loadQuery({
        variables: getVariables(),
      });
    }
  }, [params]);

  useEffect(() => {
    let customFields: FormField[] = [];
    tabs.forEach((tab: FormTabProps) => {
      customFields = customFields.concat(
        tab?.fields?.filter(
          (field: FormField) => field.type === "custom" && field?.overrideValue
        )
      );
    });
    customFields.forEach((field: FormField) => {
      handleChangeCustomField(field.name, field.overrideValue, field?.onChange);
    });
  }, [tabs]);

  if (queryError) {
    toast.error(queryError.message, {
      autoClose: getToastAutoCloseTime(queryError.message),
    });
  }

  return (
    <div className={clsx(classesProp?.formWrapper)}>
      {(queryLoading || createLoading || updateLoading) && <VoLoader />}
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
          encType="multipart/form-data"
        >
          <input
            autoComplete="false"
            name="hidden"
            type="text"
            style={{ display: "none" }}
          />
          {!disableToolbar && (
            <FormToolbar
              {...toolbarProps}
              title={getPageTitle()}
              onSave={handleSubmit(() => {
                handleSave();
              })}
              onCancel={handleCancel}
              onSubmit={onSubmit}
              loading={createLoading || updateLoading}
              options={{
                saveButton: {
                  disabled: !isDirty || !isValid,
                  ...toolbarProps?.options?.saveButton,
                },
                ...toolbarProps?.options,
              }}
              className={classesProp?.toolbar}
            />
          )}
          {header && (
            <div className={clsx(classes.formHeader, classesProp?.header)}>
              {header}
            </div>
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
                    className={classesProp?.formTabs}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormViews currentTab={currentTab} setTab={setTab}>
                  {tabs?.map((tab: FormTabProps, index: number) => {
                    return (
                      <Box key={index}>
                        <Grid
                          container
                          spacing={3}
                          className={classes.gridContainer}
                        >
                          {tab?.fields?.map(
                            (field: FormField, fieldIndex: number) => {
                              let fieldElement = getField(field);
                              if (fieldElement === "") {
                                return "";
                              }
                              return (
                                fieldElement && (
                                  <Grid
                                    key={fieldIndex}
                                    className={clsx(classes.gridItem, {
                                      [classes.gridItemHidden]:
                                        field.type === "hidden",
                                    })}
                                    item
                                    {...field.grid}
                                  >
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
