import React, { useState } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditorClass, RawEditorOptions } from "tinymce";
import { jssPreset } from "@mui/styles";
import jss from "jss";
import Typography from "@mui/material/Typography";

// Custom.

import FileManagerDialog from "@/FileManager/Dialog";
import { EntityPickerDialog } from "@/Form/fields/EntityPicker";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { FileManagerFolderElement } from "@/FileManager/global";
import { FormFieldContentListItem } from "@/Form/global";
import { stylesGlobal } from "@vocollege/theme/dist/material/vocollege2-global";
import colors from "@vocollege/theme/dist/material/vocollege2-colors";
import styleFormats from "./settings/styleFormats";
import formats from "./settings/formats";
import linkClassList from "./settings/linkClassList";
import { useStyles } from "./styles";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
  editorSettings?: RawEditorOptions & {
    selector?: undefined;
    target?: undefined;
  };
  label?: string;
  disabled?: boolean;
}

// Create a stylesheet from stylesGlobal.
jss.setup(jssPreset());
const stylesGlobalSheet = jss.createStyleSheet(stylesGlobal);

const Editor: React.FC<EditorProps> = (props) => {
  const { value, onChange, editorSettings = {}, label, disabled } = props;
  const classes = useStyles();
  // const [editorInstance, setEditorInstance] = useState<TinyMCEEditor | null>(
  //   null
  // );
  const [openFileManager, setOpenFileManager] = useState(false);
  const [openEntityPicker, setOpenEntityPicker] = useState(false);
  const [filePickerParams, setFilePickerParams] = useState<{
    [key: string]: any;
  }>({});

  // Methods.

  const handleEditorChange = (content: string, editor: TinyMCEEditorClass) => {
    onChange(content);
  };

  const filePicker = (callback: any, value: any, meta: any) => {
    setFilePickerParams({ callback, value, meta });
    switch (meta.filetype) {
      case "image":
        setOpenFileManager(true);
        break;
      case "file":
        setOpenEntityPicker(true);
        break;
      default:
        break;
    }
  };

  const handleFileManagerChange = (elements: FileManagerFolderElement[]) => {
    filePickerParams.callback(`${elements[0].url}?d=784x407&fit=inside`, {
      alt: elements[0].title,
    });
    setOpenFileManager(false);
    setFilePickerParams({});
  };

  const handleEntityPickerSelect = (item: FormFieldContentListItem) => {
    filePickerParams.callback(`/${item.urlAlias?.alias}`);
    handleEntityPickerClose();
  };

  const handleEntityPickerClose = () => {
    setOpenEntityPicker(false);
    setFilePickerParams({});
  };

  return (
    <>
      {label && (
        <div className={classes.labelWrapper}>
          <Typography
            variant="subtitle1"
            component="label"
            className={classes.label}
          >
            {label}
          </Typography>
        </div>
      )}
      <TinyMCEEditor
        // ref={(editor) => setEditorInstance(editor)}
        value={value}
        // apiKey="o6ga9s2czm0raynfmvaj1h3pgzv57brklv5bh7kmiitf5pjf"
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        init={{
          branding: false,
          height: 500,
          language: "sv_SE",
          body_class: "vo-global__content",
          content_style: stylesGlobalSheet.toString(),
          relative_urls: false,
          menubar: false,
          plugins: ["lists link image media visualblocks code table paste hr"],
          toolbar: `undo redo | removeformat | styleselect | bold italic underline strikethrough |
                    forecolor backcolor | alignleft aligncenter alignright alignjustify |
                    image media link | table | bullist numlist outdent indent hr | code`,
          toolbar_mode: "sliding",
          block_formats: "Heading 1=h2; Heading 2=h3; Heading 3=h4",
          style_formats_autohide: true,
          style_formats: styleFormats(),
          formats: formats(),
          color_map: colors(),
          color_cols: 5,
          link_class_list: linkClassList(),
          custom_colors: false,
          visualblocks_default_state: true,
          // file_picker_types: "image",
          file_picker_callback: filePicker,
          // valid_elements: "strong/b,italic/i,p,br",
          valid_elements: "*[*]",
          image_title: true,
          ...editorSettings,
        }}
        onEditorChange={handleEditorChange}
        disabled={disabled}
      />
      <FileManagerDialog
        open={openFileManager}
        title={I18n.get.docs.label.selectFile}
        onChange={handleFileManagerChange}
        onCancel={() => setOpenFileManager(false)}
        filetypes={["image"]}
      />
      <EntityPickerDialog
        open={openEntityPicker}
        onSelect={handleEntityPickerSelect}
        onClose={handleEntityPickerClose}
        types={["page", "article", "event", "queue"]}
      />
    </>
  );
};

export default Editor;
