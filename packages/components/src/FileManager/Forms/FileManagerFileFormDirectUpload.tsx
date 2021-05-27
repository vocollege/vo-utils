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
  status: 1,
  filename: null,
  filesize: null,
  filetype: null,
  file: null,
};

const FileManagerFileFormDirectUpload: React.FC<FileManagerFormProps> = (
  props
) => {
  return (
    <FileManagerForm
      {...props}
      hidePath
      messages={{
        createTitle: I18n.get.docs.label.createFile,
        updateTitle: I18n.get.docs.label.updateFile,
        itemCreated: I18n.get.docs.messages.fileCreated,
        itemUpdated: I18n.get.docs.messages.fileUpdated,
      }}
      fields={[
        {
          name: "file",
          label: I18n.get.form.labels.description,
          type: "file_uploader",
          required: true,
          grid: {
            xs: 12,
          },
          validation: {
            required: true,
          },
        },
      ]}
      initialState={initialState}
    />
  );
};

export default FileManagerFileFormDirectUpload;
