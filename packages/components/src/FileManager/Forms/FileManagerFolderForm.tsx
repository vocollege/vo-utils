import React from "react";

// Custom.
import { FileManagerFormProps } from "../global";
import FileManagerForm from "./FileManagerForm";
import { I18n } from "@vocollege/app";

const initialState = {
  id: 0,
  portfolio_id: null,
  folder_id: null,
  title: "",
  description: "",
};

const FileManagerFolderForm: React.FC<FileManagerFormProps> = (props) => {
  return (
    <FileManagerForm
      {...props}
      messages={{
        createTitle: I18n.get.docs.label.createFolder,
        updateTitle: I18n.get.docs.label.updateFolder,
        itemCreated: I18n.get.docs.messages.folderCreated,
        itemUpdated: I18n.get.docs.messages.folderUpdated,
      }}
      fields={[
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

export default FileManagerFolderForm;
