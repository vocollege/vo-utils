import React, { useEffect, useReducer, useState } from "react";
import { useMutation } from "@apollo/client";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Custom.
import { Vapor } from "@vocollege/app";
import VoTextField from "@/VoTextField";
import { FormField } from "@/Form/global";
import { reducer } from "./state";
import { fakeMutation } from "@vocollege/app";
// import FileManagerDialog from "../Dialog";
import EditDialog from "@/EditDialog";
import FileUploader from "@/FileUploader";
import VoSelectField, { VoSelectFieldAvailableValue } from "@/VoSelectField";
import { FileManagerFormProps, FileManagerBreadcrumbLink } from "../global";
// import VoApi from "@vocollege/app/dist/modules/VoApi";
import VoConfig from "@vocollege/app/dist/modules/VoConfig";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { getBucket } from "../FileManagerHelper";
import Switch from "@/Switch";

let typingTimer: number;

const FileManagerForm: React.FC<FileManagerFormProps> = (props) => {
  const {
    title,
    initialState,
    portfolio,
    folder,
    onChange,
    onCancel,
    operations,
    messages,
    open,
    client,
    fields,
    editElement,
    hidePath,
  } = props;
  const { handleSubmit, register, setValue, formState } = useForm({
    mode: "onChange",
  });
  const { isDirty, errors } = formState;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState(0);

  // Methods.

  const handleError = (error: any) => {
    toast.error(error?.message, { autoClose: 10000 });
  };

  const handleCompleted = (data: any) => {
    toast.success(
      isCreateNew() ? messages?.itemCreated : messages?.itemUpdated
    );
    let keys = Object.keys(data);
    if (onChange) {
      onChange(data[keys[0]]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    clearTimeout(typingTimer);
    dispatch({
      key: name,
      value: value,
    });
    typingTimer = window.setTimeout(async () => {
      setValue(`${name}` as const, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleFileChange = (file: any, name: string) => {
    dispatch({
      value: {
        filename: file.name,
        filesize: file.size,
        filetype: file.type,
        file: file,
      },
    });
    setValue(`${name + "size"}` as const, file.size, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    if (!name) {
      return;
    }
    dispatch({ key: name, value: value });
    setValue(`${name}` as const, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let newValue: boolean | number;
    newValue = e.target.checked ? 1 : 0;
    dispatch({ key: name, value: newValue });
    setValue(`${name}` as const, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const getSelectValue = (field: FormField) => {
    if (Array.isArray(state[field.name])) {
      return state[field.name][0] ? state[field.name][0].id : "";
    }
    return state[field.name];
  };

  const handleSave = async () => {
    setLoading(true);
    const variables: { [key: string]: any } = {
      input: { ...state },
    };

    // Use this if stream against vo-app should be used.
    // if (state.file) {
    //   variables.file = state.file;
    // }

    // Delete values handled outside "input".
    delete variables.input.id;
    delete variables.input.file;

    let bucket = portfolio ? getBucket(portfolio) : "";

    try {
      if (state.file) {
        const response = await Vapor.store(state.file, {
          // progress: (progress: any) => {
          //   setUploadProgress(Math.round(progress * 100));
          // },
          bucket: bucket,
          baseURL: VoConfig.get.API_BASE_URL,
          // baseURL: process.env.REACT_APP_API_BASE_URL,
          // headers: {
          //   Authorization: "",
          // },
        });

        variables.input.tempFile = {
          bucket: response.bucket,
          key: response.key,
          uuid: response.uuid,
        };
      }
      if (!isCreateNew()) {
        variables.id = state.id;
        update({
          variables: variables,
        });
      } else {
        create({
          variables: variables,
        });
      }
    } catch (error: any) {
      toast.error(error.message, { autoClose: 10000 });
    }
    setLoading(false);
  };

  const getAvailableValues = (
    field: FormField
  ): VoSelectFieldAvailableValue[] => {
    if (field.params?.availableValues) {
      return field.params?.availableValues();
    }
    return [];
  };

  const getField = (field: FormField) => {
    switch (field.type) {
      case "switch":
        register(`${field.name}` as const, field?.validation);
        return (
          <Switch
            checked={state[field.name] === 1}
            onChange={handleCheckChange}
            label={field.label}
            name={field.name}
            disabled={field.params?.disabled}
            helperText={field?.params?.helperText || ""}
          />
        );
      case "text":
        register(`${field.name}` as const, field?.validation);
        return (
          <VoTextField
            name={field.name}
            label={field.label}
            value={state[field.name]}
            onChange={handleChange}
            variant="filled"
            fullWidth
            type="text"
            required={field?.required}
            error={!!errors[field.name]}
            helperText={
              errors[field.name]
                ? (`${errors[field.name]?.message}` as string)
                : ""
            }
            inputProps={{
              autoComplete: "off",
            }}
            hidden={field.hidden}
          />
        );
      case "file_uploader":
        register(`${field.name + "size"}` as const, field?.validation);
        return (
          <FileUploader
            onChange={(file) => handleFileChange(file, field.name)}
            value={{
              name: state[`${field.name}name`],
              size: state[`${field.name}size`],
              type: state[`${field.name}type`],
            }}
          />
        );
      case "select":
        register(`${field.name}` as const, field?.validation);
        return (
          <VoSelectField
            SelectProps={{
              name: field.name,
              value: getSelectValue(field),
              onChange: (event) => handleSelectChange(event),
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
      default:
        return <div></div>;
    }
  };

  const getParentPath = () => {
    if (!portfolio) {
      return "/";
    }
    const fullPath = [portfolio?.title || portfolio?.name];
    if (folder) {
      if (folder.fullPath && folder.fullPath.length > 0) {
        folder.fullPath.forEach((v: FileManagerBreadcrumbLink) => {
          fullPath.push(v.title);
        });
      }
      fullPath.push(folder.title);
    }
    return ` / ${fullPath.join(" / ")} / `;
  };

  const getContentText = () => {
    return (
      <>
        <strong>{I18n.get.docs.label.path}:</strong>&nbsp;
        {getParentPath()}
        <strong>{state.title}</strong>
      </>
    );
  };

  const isCreateNew = () => {
    return !state.id || state.id === "";
  };

  const getTitle = () => {
    if (title) {
      return title;
    }
    if (messages) {
      return isCreateNew() ? messages.createTitle : messages.updateTitle;
    }
    return "";
  };

  const getSubtitle = () => {
    return !isCreateNew() && editElement ? `ID: ${editElement?.id}` : "";
  };

  // Api.

  const [create, { loading: createLoading }] = useMutation(
    operations?.create || fakeMutation,
    {
      client: client || undefined,
      onError: handleError,
      onCompleted: handleCompleted,
    }
  );

  const [update, { loading: updateLoading }] = useMutation(
    operations?.update || fakeMutation,
    {
      client: client || undefined,
      onError: handleError,
      onCompleted: handleCompleted,
    }
  );

  // Effects.

  useEffect(() => {
    if (open) {
      let newValues: { [key: string]: any } = {};
      Object.keys(state).forEach((key: any) => {
        if (editElement && editElement.hasOwnProperty(key)) {
          newValues[key] = editElement[key];
          setValue(key, editElement[key]);
        } else {
          if (portfolio && key === "portfolio_id") {
            newValues[key] = portfolio.id;
          } else if (folder && key === "folder_id") {
            newValues[key] = folder.id;
          } else {
            newValues[key] = initialState[key];
            setValue(key, initialState[key]);
          }
        }
      });
      dispatch({
        value: newValues,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <EditDialog
      open={open}
      title={getTitle()}
      subtitle={getSubtitle()}
      contentText={!hidePath ? getContentText() : null}
      onConfirm={handleSubmit(handleSave)}
      onCancel={onCancel}
      loading={loading || createLoading || updateLoading}
      saveDisabled={!isDirty}
    >
      <Grid container spacing={2}>
        {fields &&
          fields.map((field: FormField, fieldIndex: number) => {
            return (
              <Grid key={fieldIndex} item {...field.grid}>
                {getField(field)}
              </Grid>
            );
          })}
      </Grid>
    </EditDialog>
  );
};

export default FileManagerForm;
