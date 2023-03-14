import React from "react";
import clsx from "clsx";
import Typography from "@mui/material/Typography";

// Icons.
import UpdateIcon from "@mui/icons-material/Update";
import AddBoxIcon from "@mui/icons-material/AddBox";

// Custom.
import { FileManagerBottomAreaProps } from "../global";
import { useStyles } from "./styles";
import FileManagerIcon from "../Element/FileManagerIcon";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

const FileManagerBottomArea: React.FC<FileManagerBottomAreaProps> =
  React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
    const { className, selectedElement } = props;
    const classes = useStyles();
    return (
      <div ref={ref} className={clsx(classes.root, className)}>
        {selectedElement && (
          <>
            <FileManagerIcon
              element={selectedElement}
              invisibleBadge={true}
              className={classes.selectedElementIcon}
              fontSize="large"
            />
            <div className={classes.selectedElementDetails}>
              <Typography
                variant="subtitle2"
                classes={{ root: classes.selectedElementTitle }}
              >
                {selectedElement.title}
              </Typography>
              <Typography
                variant="caption"
                component="div"
                classes={{ root: classes.selectedElementId }}
              >
                ID: {selectedElement?.id}
              </Typography>
              {selectedElement.filesize && (
                <Typography
                  variant="caption"
                  component="div"
                  classes={{ root: classes.selectedElementSize }}
                >
                  {(selectedElement.filesize / 1000000).toFixed(2)} MB
                </Typography>
              )}
              {selectedElement.description && (
                <Typography
                  variant="caption"
                  component="div"
                  classes={{ root: classes.selectedElementDescription }}
                >
                  {selectedElement?.description}
                </Typography>
              )}
            </div>
            <div className={classes.selectedElementDates}>
              <Typography
                variant="caption"
                classes={{ root: classes.date }}
                title={I18n.get.misc.updated_at}
              >
                <UpdateIcon
                  classes={{ root: classes.icon }}
                  aria-label={I18n.get.misc.updated_at}
                />
                <span>{selectedElement?.updated_at}</span>
              </Typography>
              <Typography
                variant="caption"
                classes={{ root: classes.date }}
                title={I18n.get.misc.created_at}
              >
                <AddBoxIcon
                  classes={{ root: classes.icon }}
                  aria-label={I18n.get.misc.created_at}
                />
                <span>{selectedElement?.created_at}</span>
              </Typography>
            </div>
          </>
        )}
      </div>
    );
  });

export default FileManagerBottomArea;
