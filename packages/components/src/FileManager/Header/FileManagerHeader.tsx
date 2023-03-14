import React, { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

// Custom.
import VoTextField from "../../VoTextField";
import { useStyles } from "./styles";
import { FileManagerHeaderProps } from "../global";
import { reducer, initialState } from "./state";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

let typingTimer: number;

const FileManagerHeader: React.FC<FileManagerHeaderProps> = (props) => {
  const { className, onChange } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changingState, setChangingState] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Methods.

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectField = (field: string) => {
    dispatch({
      key: "orderBy",
      value: field.toUpperCase(),
    });
    handleClose();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setChangingState(true);
    clearTimeout(typingTimer);
    dispatch({
      key: "search",
      value: value,
    });
    typingTimer = window.setTimeout(() => {
      setChangingState(false);
    }, 500);
  };

  const handleChangeOrder = () => {
    dispatch({
      key: "order",
      value: state.order === "ASC" ? "DESC" : "ASC",
    });
  };

  const getLabel = () => {
    switch (state.orderBy) {
      case "TITLE":
        return I18n.get.form.labels.title;
      case "UPDATED_AT":
        return I18n.get.misc.updated_at;
      case "CREATED_AT":
        return I18n.get.misc.created_at;
      default:
        return "";
    }
  };

  // Effects.

  useEffect(() => {
    if (!changingState && onChange) {
      onChange(state.search, state.order, state.orderBy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, changingState]);

  return (
    <Box className={clsx(classes.root, className)}>
      <div className={classes.searchFieldWrapper}>
        <VoTextField
          label={I18n.get.form.labels.searchField}
          size="small"
          variant="filled"
          onChange={handleSearch}
          value={state.search}
          inputProps={{
            className: classes.searchField,
          }}
        />
        {state.search !== "" && (
          <IconButton
            className={classes.clearSearchButton}
            aria-label="clear search"
            size="small"
            onClick={() =>
              dispatch({
                key: "search",
                value: "",
              })
            }
          >
            <CloseIcon />
          </IconButton>
        )}
        {changingState && (
          <div className={classes.searchLoader}>
            <CircularProgress
              color="primary"
              // size="small"
              // className={classes.searchLoader}
            />
          </div>
        )}
      </div>
      <div className={classes.grow}></div>
      <div className={classes.sortWrapper}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          size="small"
          onClick={handleClick}
          classes={{ root: classes.sortButton }}
        >
          {getLabel()}
        </Button>
        <IconButton
          aria-label="sort order"
          size="small"
          onClick={handleChangeOrder}
        >
          {state.order === "ASC" && <ArrowUpwardIcon />}
          {state.order === "DESC" && <ArrowDownwardIcon />}
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleSelectField("title")}>
            {I18n.get.form.labels.title}
          </MenuItem>
          <MenuItem onClick={() => handleSelectField("updated_at")}>
            {I18n.get.misc.updated_at}
          </MenuItem>
          <MenuItem onClick={() => handleSelectField("created_at")}>
            {I18n.get.misc.created_at}
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

export default FileManagerHeader;
