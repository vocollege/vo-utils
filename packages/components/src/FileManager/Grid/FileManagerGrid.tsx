import React from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import makeStyles from "@mui/styles/makeStyles";

// Custom.
import { FileManagerGridProps, FileManagerFolderElement } from "../global";
import FileManagerElement from "../Element";
import { I18n } from "@vocollege/app";
import { useStyles } from "./styles";
import { stylesCommon } from "@vocollege/theme";

const useStylesCommon = makeStyles(() => stylesCommon);

export default function FileManagerGrid(props: FileManagerGridProps) {
  const {
    items,
    category,
    onSelect,
    onAction,
    onDoubleClick,
    selectedElement,
    baseUrl,
    search,
    order,
    orderBy,
  } = props;
  const classes = useStyles();
  useStylesCommon();

  // Methods.

  const handleClickAway = () => {
    if (onSelect) {
      onSelect(null);
    }
  };

  const sortItems = (a: any, b: any) => {
    let field = orderBy?.toLowerCase() || "title";
    if (order === "ASC") {
      if (a[field]?.toLowerCase() < b[field]?.toLowerCase()) {
        return -1;
      }
      if (a[field]?.toLowerCase() > b[field]?.toLowerCase()) {
        return 1;
      }
    } else {
      if (a[field]?.toLowerCase() > b[field]?.toLowerCase()) {
        return -1;
      }
      if (a[field]?.toLowerCase() < b[field]?.toLowerCase()) {
        return 1;
      }
    }
    return 0;
  };

  const hasData = () => {
    return items[category] && items[category].data.length > 0;
  };

  // @TODO This can be a heavy process if too many elements are present
  // in the current page. Maybe we should move this logic to a worker...
  const getData = () => {
    let data = null;
    if (category === "folderElements") {
      const folders = [...items[category].data]
        .filter((v: FileManagerFolderElement) => v.__typename === "Folder")
        .sort(sortItems);
      const files = [...items[category].data]
        .filter((v: FileManagerFolderElement) => v.__typename === "File")
        .sort(sortItems);
      data = folders.concat(files);
    } else {
      data = [...items[category].data];
    }
    if (search && search !== "" && search.length > 2) {
      const fields = ["name", "title", "description"];
      return data.filter((v: FileManagerFolderElement) => {
        let visible = false;
        fields.forEach((field: string) => {
          if (!visible && v[field]) {
            visible = v[field].toLowerCase().indexOf(search.toLowerCase()) > -1;
          }
        });
        return visible;
      });
    }
    return data;
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className={classes.root}>
        {!hasData() && (
          <Box>
            <div className="vo-global__nothing-found">
              <span>{I18n.get.misc.nothingFound}</span>
            </div>
          </Box>
        )}
        {hasData() &&
          getData().map((element: FileManagerFolderElement, i: number) => (
            <Box key={i} className={classes.elementWrapper}>
              <FileManagerElement
                portfolio={items[category].portfolio}
                element={element}
                baseUrl={baseUrl}
                onSelect={onSelect}
                onAction={onAction}
                onDoubleClick={onDoubleClick}
                selected={
                  selectedElement &&
                  selectedElement.id === element.id &&
                  selectedElement.__typename === element.__typename
                }
              />
            </Box>
          ))}
      </Box>

      {/* <Grid
        container
        spacing={2}
        classes={{ root: classes.root }}
        className={clsx({ [classes.withBottomArea]: selectedElement })}
      >
        {!hasData() && (
          <Grid item xs={12}>
            <div className="vo-global__nothing-found">
              <span>{I18n.get.misc.nothingFound}</span>
            </div>
          </Grid>
        )}
        {hasData() &&
          getData().map((element: FileManagerFolderElement, i: number) => {
            return (
              <>
                <Grid
                  item
                  key={i}
                  xs={6}
                  sm={3}
                  md={2}
                  xl={1}
                  className={classes.elementWrapper}
                >
                  <FileManagerElement
                    portfolio={items[category].portfolio}
                    element={element}
                    baseUrl={baseUrl}
                    onSelect={onSelect}
                    onAction={onAction}
                    selected={
                      selectedElement &&
                      selectedElement.id === element.id &&
                      selectedElement.__typename === element.__typename
                    }
                  />
                </Grid>
              </>
            );
          })}
      </Grid> */}
    </ClickAwayListener>
  );
}
