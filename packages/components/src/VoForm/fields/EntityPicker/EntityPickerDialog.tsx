import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import clsx from "clsx";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { useSnackbar } from "notistack";

// Custom.

import { SEARCH_CONTENT } from "api";
import { useStyles } from "./styles";
import {
  EntityPickerDialogProps,
  EntityPickerItem,
} from "containers/Form/global";
import { getTemporaryId } from "@vocollege/app";
import { VoTextField } from "@vocollege/components";
import I18n from "services/I18n";

let typingTimer: number;

const EntityPickerDialog: React.FC<EntityPickerDialogProps> = (props) => {
  const { onSelect, onClose, open, types, primaryField, addNew } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const searchInput = useRef();
  // const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<null | EntityPickerItem[]>(
    []
  );

  // Methods.

  const [
    searchItems,
    { loading: searchLoading, data: searchData },
  ] = useLazyQuery(SEARCH_CONTENT, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchResults(null);
    setSearchTerm(value);
    if (value && value !== "" && value.length > 2) {
      clearTimeout(typingTimer);
      typingTimer = window.setTimeout(async () => {
        let variables: { [key: string]: any } = { search: value, types: types };
        if (primaryField) {
          variables.primaryField = primaryField;
        }
        searchItems({
          variables,
        });
      }, 300);
    }
  };

  const getType = (item: EntityPickerItem) => {
    return item.type?.toLowerCase();
  };

  const getDetails = (item: EntityPickerItem) => {
    let type = getType(item);
    return (
      <>
        <span className={classes.rowItemDetailsLabel}>{I18n.get.misc.id}:</span>
        <span className={classes.rowItemDetailsValue}>{item.id}</span>
        <span className={classes.rowItemDetailsLabel}>
          {I18n.get.misc.type}:
        </span>
        <span className={classes.rowItemDetailsValue}>
          {type && I18n.get[type]?.label}
        </span>
      </>
    );
  };

  const addNewItem = () => {
    selectItem({
      id: getTemporaryId(),
      title: searchTerm,
      type: types,
    });
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchTerm("");
  };

  const canBeAdded = () => {
    if (!addNew || searchTerm === "" || (searchTerm !== "" && !searchResults)) {
      return false;
    }
    let foundItems = searchResults?.filter(
      (item: EntityPickerItem) =>
        searchTerm.trim().toLowerCase() === item.title.trim().toLowerCase()
    );
    return foundItems?.length === 0;
  };

  const selectItem = (item: EntityPickerItem) => {
    if (onSelect) {
      onSelect(item);
    }
    if (onClose) {
      onClose();
    }
  };

  // Effects.

  useEffect(() => {
    if (searchData && searchData.searchContent) {
      setSearchResults(searchData.searchContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  useEffect(() => {
    if (open) {
      clearSearch();
      setTimeout(() => {
        if (searchInput.current) {
          // @ts-ignore: Unreachable code error
          searchInput.current?.focus();
        }
      }, 300);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle
        disableTypography
        classes={{ root: classes.dialogTitleRoot }}
      >
        <Typography variant="h6" className={classes.dialogTitle}>
          {I18n.get.entities.label.search}
        </Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <div className={classes.fieldWrapper}>
          {searchLoading && (
            <LinearProgress
              classes={{ root: classes.searchResultLoader }}
              color="secondary"
            />
          )}
          <VoTextField
            inputRef={searchInput}
            name="entity_picker_field"
            label={I18n.get.entities.label.search}
            value={searchTerm}
            onChange={handleSearch}
            variant="filled"
            fullWidth
            type="text"
            required
            inputProps={{
              className: classes.fieldInput,
              autoComplete: "off",
            }}
          />
          {canBeAdded() && searchTerm !== "" && (
            <IconButton
              className={classes.addButton}
              aria-label="clear search field"
              onClick={() => addNewItem()}
            >
              <AddIcon />
            </IconButton>
          )}
          {searchTerm !== "" && (
            <IconButton
              className={classes.clearButton}
              aria-label="clear search field"
              onClick={() => clearSearch()}
            >
              <CloseIcon />
            </IconButton>
          )}
        </div>
        {searchResults && searchResults.length === 0 && (
          <div className={classes.nothingFound}>
            {I18n.get.misc.nothingFound}
          </div>
        )}
        {searchResults && searchResults.length > 0 && (
          <div className={classes.searchResultWrapper}>
            <List
              component="nav"
              className={classes.searchResult}
              aria-label="select search result"
            >
              {searchResults.map((item: EntityPickerItem, i: number) => (
                <ListItem
                  key={`${item.type}-${item.id}`}
                  button
                  className={classes.searchResultItem}
                  onClick={() => selectItem(item)}
                >
                  <ListItemText
                    disableTypography={true}
                    primary={
                      <Typography
                        variant="subtitle1"
                        className={clsx(
                          classes.rowItemTitle,
                          classes.textNoWrap
                        )}
                      >
                        {item.title}
                      </Typography>
                    }
                    secondary={getDetails(item)}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EntityPickerDialog;
