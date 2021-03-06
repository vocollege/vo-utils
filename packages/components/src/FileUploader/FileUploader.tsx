import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Custom.
import { I18n } from "@vocollege/app";
import { useStyles } from "./styles";

interface FileUploaderProps {
  onChange?: (file: any) => void;
  value?: {
    name?: string;
    size?: string;
    type?: string;
  };
}

const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const { onChange, value } = props;
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // Methods.

  const changeHandler = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (onChange) {
      onChange(file);
    }
  };

  // Effects.

  useEffect(() => {
    setSelectedFile(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        {selectedFile && selectedFile.name ? (
          <div>
            <Typography
              variant="subtitle2"
              classes={{ root: classes.textRoot }}
            >
              <strong>{I18n.get.docs.label.filename}:</strong>{" "}
              {selectedFile.name}
            </Typography>
            <Typography
              variant="subtitle2"
              classes={{ root: classes.textRoot }}
            >
              <strong>{I18n.get.docs.label.filetype}:</strong>{" "}
              {selectedFile.type}
            </Typography>
            <Typography
              variant="subtitle2"
              classes={{ root: classes.textRoot }}
            >
              <strong>{I18n.get.docs.label.filesize}:</strong>{" "}
              {(selectedFile.size / 1000000).toFixed(2)} MB
            </Typography>
          </div>
        ) : (
          <div className={classes.detailsNothingSelected}>
            {I18n.get.misc.nothingSelected}
          </div>
        )}
      </div>
      <Button variant="contained" component="label" size="small">
        {I18n.get.docs.label.selectFile}
        <input type="file" hidden onChange={changeHandler} />
      </Button>
    </div>
  );
};

export default FileUploader;
