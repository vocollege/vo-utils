import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Tooltip from "@mui/material/Tooltip";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
// import Fab from "@mui/material/Fab";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

// Custom.
import { useToolbarStyles } from "./styles";
import { EnhancedTableToolbarProps } from "./global";
import { stylesActions } from "@vocollege/theme";
import FloatingButton from "FloatingButton";

const useStylesActions = makeStyles(() => stylesActions);

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const classes = useToolbarStyles();
  useStylesActions();
  const { title, addItem } = props;

  return (
    <Toolbar className={clsx(classes.root, { [classes.noTitle]: !title })}>
      {title && (
        <Typography className={classes.title} variant="h6" component="div">
          {title}
        </Typography>
      )}
      {/* <>
        <Tooltip title={I18n.get.toolbar.filterList}>
          <IconButton aria-label={I18n.get.toolbar.filterList}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </> */}

      {addItem && (
        <FloatingButton
          label=""
          className="vo-global__actions-floating-button"
          onClick={addItem ? () => addItem() : () => {}}
        >
          <AddIcon />
        </FloatingButton>
      )}

      {/* <Fab
        className="vo-global__actions-button-add-content"
        color="primary"
        aria-label="add"
        onClick={addItem ? () => addItem() : () => {}}
      >
        <AddIcon />
      </Fab> */}
    </Toolbar>
  );
}
