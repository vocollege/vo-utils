import React from "react";
import Badge from "@material-ui/core/Badge";
import clsx from "clsx";

// Icons.
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import FolderIcon from "@material-ui/icons/Folder";
import DocumentIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import GridOnIcon from "@material-ui/icons/GridOn";
import PublicIcon from "@material-ui/icons/Public";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";

// Custom.
import { FileManagerIconProps } from "../global";
import { useStyles } from "./styles";
import { isDiskPublic } from "../FileManagerHelper";

const FileManagerIcon: React.FC<FileManagerIconProps> = (props) => {
  const { element, invisibleBadge, fontSize, classes: classesProp } = props;
  const classes = useStyles();
  const getType = () => {
    let parts = element.filename.split(".");
    return parts[parts.length - 1] || "";
  };
  const isImage = () => {
    return element.filetype.indexOf("image") > -1;
  };
  switch (element.__typename) {
    case "Portfolio":
      return (
        <Badge
          badgeContent={<PublicIcon color="error" />}
          color="primary"
          classes={{
            badge: clsx(classes.badge, classes.imageBadgeWithIcon),
          }}
          invisible={!isDiskPublic(element)}
        >
          <BusinessCenterIcon
            classes={classesProp}
            fontSize={fontSize}
            className={clsx(classes.portfolioIcon, props.className)}
          />
        </Badge>
      );
    case "Folder":
      return (
        <FolderIcon
          classes={classesProp}
          fontSize={fontSize}
          className={clsx(classes.folderIcon, props.className)}
        />
      );
    default:
      if (element.filetype) {
        if (isImage()) {
          return (
            <Badge
              badgeContent={getType()}
              color="primary"
              classes={{
                badge: classes.badge,
                colorPrimary: classes.imageBadge,
              }}
              invisible={invisibleBadge}
            >
              <>
                {element.previewUrl && (
                  <img
                    alt={element.title}
                    src={`${element.previewUrl}`}
                    className={clsx(classes.image, props.className)}
                  />
                )}
                {!element.previewUrl && (
                  <ImageIcon
                    classes={classesProp}
                    fontSize={fontSize}
                    className={clsx(classes.imageIcon, props.className)}
                  />
                )}
              </>
            </Badge>
          );
        } else if (element.filetype.indexOf("pdf") > -1) {
          return (
            <Badge
              badgeContent={getType()}
              color="primary"
              classes={{
                badge: classes.badge,
                colorPrimary: classes.pdfBadge,
              }}
              invisible={invisibleBadge}
            >
              <PictureAsPdfIcon
                classes={classesProp}
                fontSize={fontSize}
                className={clsx(classes.pdfIcon, props.className)}
              />
            </Badge>
          );
        } else if (element.filetype.indexOf("sheet") > -1) {
          return (
            <Badge
              badgeContent={getType()}
              color="primary"
              classes={{
                badge: classes.badge,
                colorPrimary: classes.sheetBadge,
              }}
              invisible={invisibleBadge}
            >
              <GridOnIcon
                classes={classesProp}
                fontSize={fontSize}
                className={clsx(classes.sheetIcon, props.className)}
              />
            </Badge>
          );
        } else if (element.filetype.indexOf("document") > -1) {
          return (
            <Badge
              badgeContent={getType()}
              color="primary"
              classes={{
                badge: classes.badge,
                colorPrimary: classes.documentBadge,
              }}
              invisible={invisibleBadge}
            >
              <DocumentIcon
                classes={classesProp}
                fontSize={fontSize}
                className={clsx(classes.documentIcon, props.className)}
              />
            </Badge>
          );
        } else if (element.filetype.indexOf("video") > -1) {
          return (
            <Badge
              badgeContent={getType()}
              color="primary"
              classes={{
                badge: classes.badge,
                colorPrimary: classes.videoBadge,
              }}
              invisible={invisibleBadge}
            >
              <LocalMoviesIcon
                classes={classesProp}
                fontSize={fontSize}
                className={clsx(classes.videoIcon, props.className)}
              />
            </Badge>
          );
        }
      }
      return (
        <Badge
          badgeContent={getType()}
          color="primary"
          classes={{
            badge: classes.badge,
            colorPrimary: classes.defaultBadge,
          }}
          invisible={invisibleBadge}
        >
          <InsertDriveFileIcon
            classes={classesProp}
            className={clsx(classes.defaultIcon, props.className)}
            fontSize={fontSize}
          />
        </Badge>
      );
  }
};

export default FileManagerIcon;
