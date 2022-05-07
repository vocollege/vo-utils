import React, { useEffect, useReducer, useRef } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// Custom.
import EditDialog from "../../../EditDialog";
import {
  FormFieldSortableTreeItemFormProps,
  EntityPickerItem,
} from "../../global";
import { I18n } from "@vocollege/app";
import VoTextField from "../../../VoTextField";
import EntityField from "../EntityField";

const reducer = (state: any, action: any) => {
  const { field, value } = action;
  if (!field) {
    return { ...state, ...value };
  }
  return { ...state, [field]: value };
};

const initialState = {
  id: "0",
  parent_id: "0",
  title: "",
  urlAlias: null, // camelCase is required here to match the backend attribute.
  set_custom_url: false,
  path: [],
};

let typingTimer: number;

const SortableTreeItemForm: React.FC<FormFieldSortableTreeItemFormProps> = (
  props
) => {
  const {
    title,
    open,
    // types,
    onChange,
    onCancel,
    item,
    itemPath,
    dialog = { types: [] },
  } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const titleInput = useRef(null);
  const customUrlInput = useRef(null);

  const { handleSubmit, register, setValue, formState, reset } = useForm({
    mode: "onChange",
  });

  const { isDirty, isValid, errors } = formState;

  // Methods.

  const isCreateNew = () => {
    return !state.id || state.id === "" || state.id === "0";
  };

  const getTitle = () => {
    if (title) {
      return title;
    }
    return isCreateNew()
      ? I18n.get.menu.labels.createLink
      : I18n.get.menu.labels.updateLink;
  };

  const handleSave = () => {
    if (onChange) {
      let newState = { ...state };
      delete newState.set_custom_url;
      if (newState.urlAlias && newState.urlAlias.alias === "") {
        newState.urlAlias = null;
      }
      onChange(newState, itemPath || []);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    clearTimeout(typingTimer);
    dispatch({ field: name, value: value });
    typingTimer = window.setTimeout(async () => {
      setValue(`${name}` as const, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleCustomUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    clearTimeout(typingTimer);
    let newUrlAlias = { ...state.urlAlias, alias: value };
    dispatch({ field: "urlAlias", value: newUrlAlias });
    typingTimer = window.setTimeout(async () => {
      setValue("urlAlias", newUrlAlias, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleEntityFieldChange = (name: string, item: EntityPickerItem) => {
    dispatch({
      field: name,
      value: item.urlAlias || null,
    });
    setValue(`${name}` as const, item.urlAlias, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleEntityFieldReset = (name: string) => {
    dispatch({
      field: name,
      value: null,
    });
    setValue(`${name}` as const, null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleSetCustomUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let urlAlias = null;
    let checked = event.target.checked;
    if (checked && item && item.urlAlias && !item.urlAlias.usage_id) {
      urlAlias = {
        id: item.urlAlias.id,
        alias: "",
      };
    }
    dispatch({
      value: {
        set_custom_url: checked,
        urlAlias,
      },
    });
  };

  const bindFieldValidation = () => {
    register("title", { required: true });
    register("urlAlias");
    setTimeout(() => {
      if (titleInput.current) {
        // @ts-ignore: Unreachable code error
        titleInput.current?.focus();
      }
    }, 300);
  };

  // Effects.

  useEffect(() => {
    if (open) {
      if (item) {
        dispatch({
          value: {
            ...item,
            set_custom_url: item.urlAlias && !item.urlAlias.usage_id,
          },
        });
        reset(item);
      } else {
        dispatch({
          value: initialState,
        });
        reset(initialState);
      }
      bindFieldValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  useEffect(() => {
    if (state.set_custom_url) {
      setTimeout(() => {
        if (customUrlInput.current) {
          // @ts-ignore: Unreachable code error
          customUrlInput.current?.focus();
        }
      }, 300);
    }
  }, [state.set_custom_url]);

  return (
    <EditDialog
      open={open}
      title={getTitle()}
      // subtitle={getSubtitle()}
      // contentText={getContentText()}
      onConfirm={handleSubmit(handleSave)}
      onCancel={onCancel}
      saveDisabled={!isDirty || !isValid}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VoTextField
            inputRef={titleInput}
            name="title"
            label={I18n.get.menu.labels.menuLinkTitle}
            value={state.title}
            onChange={handleChange}
            variant="filled"
            fullWidth
            type="text"
            required={true}
            error={!!errors.title}
            helperText={errors.title ? errors.title?.message : ""}
            inputProps={{
              autoComplete: "off",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.set_custom_url}
                onChange={handleSetCustomUrlChange}
                name="set_custom_url"
                color="primary"
              />
            }
            label={I18n.get.menu.labels.setCustomUrl}
          />
        </Grid>
        {!state.set_custom_url && (
          <Grid item xs={12}>
            <EntityField
              name="urlAlias"
              label={I18n.get.misc.content}
              value={
                state.urlAlias
                  ? `${state.urlAlias.alias} (${state.urlAlias.id})`
                  : ""
              }
              onChange={(item) => handleEntityFieldChange("urlAlias", item)}
              onReset={() => handleEntityFieldReset("urlAlias")}
              dialog={{ ...dialog, open: false }}
            />
          </Grid>
        )}
        {state.set_custom_url && (
          <Grid item xs={12}>
            <VoTextField
              inputRef={customUrlInput}
              name="custom_url"
              label={I18n.get.menu.labels.customUrl}
              value={state.urlAlias ? state.urlAlias.alias : "https://"}
              onChange={handleCustomUrlChange}
              variant="filled"
              fullWidth
              type="text"
              error={!!errors.custom_url}
              helperText={errors.custom_url ? errors.custom_url?.message : ""}
              inputProps={{
                autoComplete: "off",
              }}
            />
          </Grid>
        )}
      </Grid>
    </EditDialog>
  );
};

export default SortableTreeItemForm;
