import React, { useEffect, useState, useReducer } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
// import { gql } from "@apollo/client";
import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";

// Custom.
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { GeneralObject } from "@vocollege/app/dist/global";
import { useStyles } from "./styles";
import FileField from "../../Form/fields/FileField";
import { FileManagerFolderElement } from "../../FileManager/global";
import {
  CREATE_FILE,
  UPDATE_FILE,
  DELETE_FILE,
} from "@vocollege/app/dist/modules/VoApi/graphql";
// import VoAuth from "@vocollege/app/dist/modules/VoAuth";
// import VoLoader from "../../VoLoader";
import VoTextField from "../../VoTextField";
import { regexPatterns, reducer } from "@vocollege/app/dist/modules/VoHelpers";
import { AccountFormProps } from "./global";

export const initialState = {
  id: 0,
  email: "",
  name: "",
  firstname: "",
  lastname: "",
  images: [],
  personal_number: "",
  gdpr: false,
  address1: "",
  address2: "",
  postalcode: "",
  town: "",
  country: "",
  phone1: "",
  phone2: "",
  profession: "",
  workplace: "",
  password: "",
  password_current: "",
  password_repeat: "",
};

let typingTimer: GeneralObject = {};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={classes.panelWrapper}>{children}</div>
      )}
    </div>
  );
};

const AccountForm: React.FC<AccountFormProps> = (props) => {
  const { onChange, onFormStateChange, initialData, settings, client } = props;
  const { control, setValue, formState, reset } = useForm({
    mode: "onChange",
  });
  const { isDirty, isValid, errors } = formState;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tab, setTab] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const classes = useStyles();

  // Methods.

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    clearTimeout(typingTimer[name]);
    dispatch({ key: name, values: value });
    typingTimer[name] = window.setTimeout(async () => {
      setValue(`${name}` as const, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    clearTimeout(typingTimer[name]);
    dispatch({ key: name, values: checked });
    typingTimer[name] = window.setTimeout(async () => {
      setValue(`${name}` as const, checked, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }, 300);
  };

  const handleImagesChange = (
    name: string,
    files: FileManagerFolderElement[]
  ) => {
    dispatch({ key: name, values: files });
    setValue(`${name}` as const, files, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Effects.

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    onChange && onChange(state);
  }, [state]);

  useEffect(() => {
    if (!firstLoad) {
      onFormStateChange && onFormStateChange({ isDirty, isValid });
    }
  }, [isDirty, isValid]);

  useEffect(() => {
    if (initialData) {
      let newValues: GeneralObject = {};
      Object.keys(state)
        .filter((field: string) => initialData[field])
        .map((field: string) => (newValues[field] = initialData[field]));
      dispatch({ values: newValues });
      reset(newValues);
    }
  }, [initialData]);

  return (
    <div className={classes.formRoot}>
      <div className={classes.tabsWrapper}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          aria-label="tabs"
          variant="scrollable"
        >
          <Tab label={I18n.get.misc.account} {...a11yProps(0)} />
          <Tab label={I18n.get.user.labels.personalData} {...a11yProps(1)} />
          <Tab label={I18n.get.user.labels.password} {...a11yProps(2)} />
        </Tabs>
      </div>
      <TabPanel value={tab} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {initialData?.gdpr && (
              <Typography
                variant="caption"
                fontStyle="italic"
                sx={{ alignItems: "center", display: "flex" }}
              >
                <CheckIcon fontSize="small" />
                &nbsp;{I18n.get.user.labels.gdpr}
              </Typography>
            )}
            {!initialData?.gdpr && (
              <>
                {!state.gdpr && (
                  <Alert severity="error">
                    {I18n.get.user.labels.gdprIsRequired}
                  </Alert>
                )}
                <Controller
                  name="gdpr"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          value={state.gdpr}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={I18n.get.user.labels.gdpr}
                    />
                  )}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: I18n.get.form.errors.required,
                pattern: {
                  value: regexPatterns.email,
                  message: I18n.get.form.errors.invalidEmail,
                },
              }}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.email}
                  variant="filled"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={state.email || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Controller
              name="name"
              control={control}
              // rules={{
              //   required: I18n.get.form.errors.required,
              // }}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.name}
                  variant="filled"
                  fullWidth
                  //   required
                  onChange={handleChange}
                  value={state.name || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="firstname"
              control={control}
              rules={{
                required: I18n.get.form.errors.required,
              }}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.firstname}
                  variant="filled"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={state.firstname || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="lastname"
              control={control}
              rules={{
                required: I18n.get.form.errors.required,
              }}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.lastname}
                  variant="filled"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={state.lastname || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <FileField
                  title={I18n.get.docs.label.uploadImage}
                  label={I18n.get.misc.image}
                  value={state.images}
                  onChange={(files: FileManagerFolderElement[]) =>
                    handleImagesChange(field.name, files)
                  }
                  filetypes={["image"]}
                  multiple={false}
                  directUpload={true}
                  portfolio={settings?.publicDefaultPortfolio}
                  operations={{
                    createFile: CREATE_FILE,
                    updateFile: UPDATE_FILE,
                    deleteFile: DELETE_FILE,
                  }}
                  client={client}
                />
              )}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Controller
              name="profession"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.professionalTitle}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.profession || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="personal_number"
              control={control}
              rules={{
                validate: (value: any) => {
                  if (!value || value === "") {
                    return true;
                  }
                  return (
                    !!value.match(regexPatterns.personalNumber) ||
                    I18n.get.form.errors.personalNumberInvalid
                  );
                },
              }}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.personalNumber}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.personal_number || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address1"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.address}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.address1 || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address2"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.address}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.address2 || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="postalcode"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.postalcode}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.postalcode || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="county"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.county}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.county || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.country}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.country || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="phone1"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.phone}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.phone1 || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="phone2"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.phone}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.phone2 || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="workplace"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.form.labels.workplace}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.workplace || ""}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="password_current"
              control={control}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.passwordCurrent}
                  variant="filled"
                  fullWidth
                  onChange={handleChange}
                  value={state.password_current}
                  size="small"
                  helperText={I18n.get.form.messages.currentPassword}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="password"
              control={control}
              rules={{
                validate: (value: any) => {
                  if (!value || value === "") {
                    return true;
                  }
                  return (
                    Boolean(value.match(regexPatterns.password)) ||
                    I18n.get.form.errors.password
                  );
                },
              }}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.password}
                  variant="filled"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={state.password}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="password_repeat"
              control={control}
              rules={{
                validate: {
                  matchesField: (value: string) => {
                    return (
                      state.password === value ||
                      I18n.get.form.errors.passwordNotMatch
                    );
                  },

                  //   match: {
                  //     field: "password",
                  //     message: I18n.get.form.errors.passwordNotMatch,
                  //   },
                },
              }}
              render={({ field }) => (
                <VoTextField
                  {...field}
                  label={I18n.get.user.labels.passwordRepeat}
                  variant="filled"
                  fullWidth
                  required
                  onChange={handleChange}
                  value={state.password_repeat}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errors[field.name] && errors[field.name]?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  );
};

export default AccountForm;
