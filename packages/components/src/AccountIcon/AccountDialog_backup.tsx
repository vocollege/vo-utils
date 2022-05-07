import React, { useState } from "react";
import clsx from "clsx";

// Custom.
import EditDialog from "../EditDialog";
// import EditDialog from "@vocollege/components/dist/EditDialog";
import VoAuth from "@vocollege/app/dist/modules/VoAuth";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { regexPatterns } from "@vocollege/app/dist/modules/VoHelpers";
import Form, { FormTabProps } from "../Form";
// import Form, { FormTabProps } from "@vocollege/components/dist/Form";
import {
  GET_USER,
  UPDATE_USER,
  CREATE_USER,
  CREATE_FILE,
  UPDATE_FILE,
  DELETE_FILE,
} from "@vocollege/app/dist/modules/VoApi/graphql";
import { useStyles } from "./styles";
// import { toast } from "react-toastify";

export interface AccountDialogProps {
  open: boolean;
  onChange?: (state: string) => void;
  onCancel?: () => void;
}

export const initialState = {
  id: 0,
  email: "",
  name: "",
  firstname: "",
  lastname: "",
  active: true,
  images: [],
  password: "",
  password_current: "",
  password_repeat: "",
  personal_number: "",
  address1: "",
  address2: "",
  zip: "",
  county: "",
  country: "",
  phone1: "",
  phone2: "",
  profession: "",
};

const AccountDialog: React.FC<AccountDialogProps> = (props) => {
  const { open, onChange, onCancel } = props;
  const classes = useStyles();

  const getTabs = () => {
    const tabs: FormTabProps[] = [];

    tabs.push({
      key: "account",
      label: I18n.get.misc.account,
      fields: [
        {
          name: "email",
          label: I18n.get.user.labels.email,
          type: "text",
          required: true,
          grid: {
            xs: 12,
            md: 8,
          },
          validation: {
            required: I18n.get.form.errors.required,
            pattern: {
              value: regexPatterns.email,
              message: I18n.get.form.errors.invalidEmail,
            },
          },
          params: {
            inputProps: {
              "data-lpignore": true,
            },
          },
        },
        {
          name: "name",
          label: I18n.get.user.labels.name,
          type: "text",
          // required: true,
          grid: {
            xs: 12,
            md: 4,
          },
          validation: {
            // required: I18n.get.form.errors.required,
            pattern: {
              value: regexPatterns.username,
              message: I18n.get.form.errors.invalidName,
            },
          },
        },

        {
          name: "images",
          label: I18n.get.misc.image,
          type: "file_field",
          grid: {
            xs: 12,
          },
          params: {
            filetypes: ["image"],
            multiple: false,
            directUpload: true,
            portfolio: VoAuth.currentUser.settings.publicDefaultPortfolio,
            operations: {
              createFile: CREATE_FILE,
              updateFile: UPDATE_FILE,
              deleteFile: DELETE_FILE,
            },
          },
        },
        {
          name: "firstname",
          label: I18n.get.user.labels.firstname,
          type: "text",
          required: true,
          grid: {
            xs: 12,
            md: 6,
          },
          validation: {
            required: I18n.get.form.errors.required,
            pattern: {
              value: regexPatterns.stringNonDigit,
              message: I18n.get.form.errors.invalidFirstname,
            },
          },
        },
        {
          name: "lastname",
          label: I18n.get.user.labels.lastname,
          type: "text",
          required: true,
          grid: {
            xs: 12,
            md: 6,
          },
          validation: {
            required: I18n.get.form.errors.required,
            pattern: {
              value: regexPatterns.stringNonDigit,
              message: I18n.get.form.errors.invalidLastname,
            },
          },
        },
      ],
    });

    tabs.push(
      {
        key: "personal_data",
        label: I18n.get.user.labels.personalData,
        fields: [
          {
            name: "profession",
            label: I18n.get.user.labels.professionalTitle,
            type: "text",
            grid: {
              xs: 12,
              md: 6,
            },
          },
          {
            name: "personal_number",
            label: I18n.get.user.labels.personalNumber,
            type: "text",
            grid: {
              xs: 12,
              md: 6,
            },
            validation: {
              validate: (value: any) => {
                if (!value || value === "") {
                  return true;
                }
                return (
                  !!value.match(regexPatterns.personalNumber) ||
                  I18n.get.form.errors.personalNumberInvalid
                );
              },
            },
          },

          {
            name: "address1",
            label: I18n.get.user.labels.address,
            type: "text",
            grid: {
              xs: 12,
              md: 6,
            },
          },
          {
            name: "address2",
            label: I18n.get.user.labels.address,
            type: "text",
            grid: {
              xs: 12,
              md: 6,
            },
          },
          {
            name: "zip",
            label: I18n.get.user.labels.zip,
            type: "text",
            grid: {
              xs: 12,
              md: 3,
            },
          },
          {
            name: "county",
            label: I18n.get.user.labels.county,
            type: "text",
            grid: {
              xs: 12,
              md: 5,
            },
          },
          {
            name: "country",
            label: I18n.get.user.labels.country,
            type: "text",
            grid: {
              xs: 12,
              md: 4,
            },
          },
          {
            name: "phone1",
            label: I18n.get.user.labels.phone,
            type: "text",
            grid: {
              xs: 12,
              md: 6,
            },
          },
          {
            name: "phone2",
            label: I18n.get.user.labels.phone,
            type: "text",
            grid: {
              xs: 12,
              md: 6,
            },
          },
        ],
      },
      {
        key: "password",
        label: I18n.get.user.labels.password,
        fields: [
          {
            name: "password_current",
            label: I18n.get.user.labels.passwordCurrent,
            type: "text",
            inputType: "password",
            required: true,
            grid: {
              xs: 12,
            },
          },
          {
            name: "password",
            label: I18n.get.user.labels.password,
            type: "text",
            inputType: "password",
            required: false,
            grid: {
              xs: 12,
            },
            validation: {
              validate: (value: any) => {
                if (!value || value === "") {
                  return true;
                }
                return (
                  Boolean(value.match(regexPatterns.password)) ||
                  I18n.get.form.errors.password
                );
              },
            },
          },
          {
            name: "password_repeat",
            label: I18n.get.user.labels.passwordRepeat,
            type: "text",
            inputType: "password",
            required: false,
            grid: {
              xs: 12,
            },
            validation: {
              match: {
                field: "password",
                message: I18n.get.form.errors.passwordNotMatch,
              },
            },
          },
        ],
      }
    );

    return tabs;
  };

  const handleComplete = () => {
    if (onChange) {
      onChange("saved");
    }
  };

  return (
    <EditDialog
      open={open}
      // onCancel={onCancel}
      className={classes.accountDialog}
      disableActions
      disableCloseButton
    >
      <Form
        tabs={getTabs()}
        labels={{
          loading: I18n.get.form.labels.loadingContent,
          create: I18n.get.form.labels.createUser,
          created: I18n.get.user.messages.userCreated,
          updated: I18n.get.user.messages.userUpdated,
          deleted: I18n.get.user.messages.userDeleted,
          fieldRequired: I18n.get.form.errors.required,
        }}
        operations={{
          category: "user",
          get: GET_USER,
          create: CREATE_USER,
          update: UPDATE_USER,
        }}
        initialState={initialState}
        pageTitleField="email"
        // classes={{
        //   paper: classes.accountDialogPaper,
        //   formTabs: classes.accountDialogFormTabs,
        //   toolbar: classes.accountDialogToolbar,
        // }}
        classes={{
          paper: "vo-global__content-with-toolbar",
          toolbar: clsx(
            "vo-global__content-toolbar",
            classes.accountDialogToolbar
          ),
        }}
        urlParams={{
          id: VoAuth.currentUser.id,
        }}
        onComplete={handleComplete}
        onCancel={onCancel}
        // disableToolbar
        // onQueryLoading={(queryLoading: boolean) => setLoading(queryLoading)}
      />
    </EditDialog>
  );
};

export default AccountDialog;
