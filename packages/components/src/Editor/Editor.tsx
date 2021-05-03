import React, { useEffect, useState } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditorClass } from "tinymce";

// Custom.

import FileManagerDialog from "FileManager/Dialog";
import { EntityPickerDialog } from "Form/fields/EntityPicker";
import { I18n } from "@vocollege/app";
import { FileManagerFolderElement } from "FileManager/global";
import { FormFieldContentListItem } from "Form/global";
import styles from "./vocollege2-content";
import colors from "@vocollege/theme/dist/material/vocollege2-colors";
// import { useStylesGlobal } from ;

// import { useStyles, useStylesEditor } from "./styles";

// import "./styles.css";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = (props) => {
  // const classesEditor = useStylesEditor();
  const { value, onChange } = props;
  const [editorInstance, setEditorInstance] = useState<TinyMCEEditor | null>(
    null
  );
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
    filePickerParams.callback(`${elements[0].url}?d=784x407`, {
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

  // Effects.

  useEffect(() => {
    // console.log("editorInstance", editorInstance);
  }, [editorInstance]);

  useEffect(() => {
    // console.log("classesEditor", classesEditor);
  }, []);

  return (
    <>
      <TinyMCEEditor
        ref={(editor) => setEditorInstance(editor)}
        // initialValue={value}
        value={value}
        apiKey="o6ga9s2czm0raynfmvaj1h3pgzv57brklv5bh7kmiitf5pjf"
        init={{
          branding: false,
          height: 500,
          language: "sv_SE",
          content_style: styles,
          relative_urls: false,
          menubar: false,
          plugins: ["lists link image media visualblocks code table paste"],
          toolbar: `undo redo | removeformat | styleselect | bold italic underline strikethrough |
                    forecolor backcolor | alignleft aligncenter alignright alignjustify |
                    image media link | table | bullist numlist outdent indent | code`,
          toolbar_mode: "sliding",
          block_formats: "Heading 1=h2; Heading 2=h3; Heading 3=h4",
          style_formats_autohide: true,
          style_formats: [
            {
              title: "Layout",
              items: [
                {
                  title: "Vänsterjustera",
                  selector: "img,p,h2,h3,h4,table,ul,ol,li",
                  classes: "left",
                },
                {
                  title: "Högerjustera",
                  selector: "img,p,h2,h3,h4,table,ul,ol,li",
                  classes: "right",
                },
              ],
            },
            {
              title: "Rubriker",
              items: [
                {
                  title: "Rubrik 1",
                  block: "h2",
                },
                {
                  title: "Rubrik 2",
                  block: "h3",
                },
                {
                  title: "Rubrik 3",
                  block: "h4",
                },
              ],
            },
            {
              title: "Paragraf",
              items: [
                {
                  title: "Paragraf",
                  block: "p",
                },
                {
                  title: "Ingress",
                  block: "p",
                  classes: "preamble",
                  selector: "p",
                },
              ],
            },
            {
              title: "Image",
              items: [
                {
                  title: "Fullbredd",
                  selector: "img",
                  attributes: { class: "fullwidth" },
                },
                {
                  title: "Halv (392px)",
                  selector: "img",
                  attributes: { class: "half" },
                },
                {
                  title: "Liten (196px)",
                  selector: "img",
                  attributes: { class: "small" },
                },
                {
                  title: "Kvadrat halv (392px)",
                  selector: "img",
                  attributes: { class: "square-half" },
                },
                {
                  title: "Kvadrat liten (196px)",
                  selector: "img",
                  attributes: { class: "square-small" },
                },
              ],
            },
          ],
          formats: {
            alignleft: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
              classes: "left",
            },
            aligncenter: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
              classes: "center",
            },
            alignright: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
              classes: "right",
            },
            alignfull: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img",
              classes: "full",
            },
            bold: { inline: "strong", classes: "bold" },
            italic: { inline: "span", classes: "italic" },
            underline: { inline: "u", classes: "underline", exact: true },
            strikethrough: { inline: "del", classes: "del" },
            // customformat: {
            //   inline: "span",
            //   styles: { color: "#00ff00", fontSize: "20px" },
            //   attributes: { title: "My custom format" },
            //   classes: "example1",
            // },
          },
          color_map: colors(),
          color_cols: 5,
          custom_colors: false,
          visualblocks_default_state: true,
          // file_picker_types: "image",
          file_picker_callback: filePicker,
        }}
        onEditorChange={handleEditorChange}
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
        types="page,article"
      />
    </>
  );
};

export default Editor;
