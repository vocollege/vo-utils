import React from "react";

// Custom.
import { FileManagerFormProps } from "../global";
import FileManagerForm from "./FileManagerForm";
import { I18n, regexPatterns } from "@vocollege/app";

const initialState = {
  id: 0,
  disk: "s3.vodocs_files",
  name: "",
  title: "",
  description: "",
};

const getAvailableDiskValues = () => {
  return Object.keys(I18n.get.docs.disks).map((disk: string) => ({
    label: I18n.get.docs.disks[disk],
    value: disk,
  }));
};

const FileManagerPortfolioForm: React.FC<FileManagerFormProps> = (props) => {
  return (
    <FileManagerForm
      {...props}
      messages={{
        createTitle: I18n.get.docs.label.createPortfolio,
        updateTitle: I18n.get.docs.label.updatePortfolio,
        itemCreated: I18n.get.docs.messages.portfolioCreated,
        itemUpdated: I18n.get.docs.messages.portfolioUpdated,
      }}
      fields={[
        {
          name: "disk",
          label: I18n.get.docs.label.diskName,
          type: "select",
          required: true,
          grid: {
            xs: 12,
          },
          validation: {
            required: true,
          },
          params: {
            availableValues: getAvailableDiskValues,
          },
          // onChange: handleCategoryChange,
        },

        // {
        //   name: "disk",
        //   label: I18n.get.docs.label.diskName,
        //   type: "text",
        //   required: true,
        //   grid: {
        //     xs: 12,
        //   },
        //   validation: {
        //     required: true,
        //     // pattern: {
        //     //   value: regexPatterns.cleanName,
        //     // },
        //   },
        // },
        {
          name: "name",
          label: I18n.get.docs.label.portfolioName,
          type: "text",
          required: true,
          grid: {
            xs: 12,
          },
          validation: {
            required: true,
            pattern: {
              value: regexPatterns.cleanName,
              message: I18n.get.docs.errors.invalidPortfolioName,
            },
          },
        },
        {
          name: "title",
          label: I18n.get.form.labels.title,
          type: "text",
          required: true,
          grid: {
            xs: 12,
          },
          validation: {
            required: true,
          },
        },
        {
          name: "description",
          label: I18n.get.form.labels.description,
          type: "text",
          grid: {
            xs: 12,
          },
        },
      ]}
      initialState={initialState}
    />
  );
};

export default FileManagerPortfolioForm;
