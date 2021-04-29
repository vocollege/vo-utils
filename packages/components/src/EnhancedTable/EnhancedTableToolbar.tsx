import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Tooltip from "@material-ui/core/Tooltip";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
// import Fab from "@material-ui/core/Fab";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" component="div">
        {title}
      </Typography>
      {/* <>
        <Tooltip title={I18n.get.toolbar.filterList}>
          <IconButton aria-label={I18n.get.toolbar.filterList}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </> */}
      <FloatingButton
        label=""
        className="vo-global__actions-floating-button"
        onClick={addItem ? () => addItem() : () => {}}
      >
        <AddIcon />
      </FloatingButton>

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
