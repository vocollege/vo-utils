import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import clsx from "clsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

// Custom.

import { SEARCH_CONTENT } from "@vocollege/app";
import { useStyles } from "./styles";
import { EntityPickerDialogProps, EntityPickerItem } from "@/Form/global";
import { getTemporaryId } from "@vocollege/app";
import VoTextField from "@/VoTextField";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

let typingTimer: number;

const EntityPickerDialog: React.FC<EntityPickerDialogProps> = (props) => {
  const {
    onSelect,
    onClose,
    open = false,
    types,
    primaryField,
    addNew,
    renderTitleField,
    query,
    category = "searchContent",
    variables = {},
    client,
    extraDetails,
    DialogProps,
  } = props;
  const classes = useStyles();
  const searchInput = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<null | EntityPickerItem[]>(
    []
  );

  // Methods.

  const [searchItems, { loading: searchLoading, data: searchData }] =
    useLazyQuery(query || SEARCH_CONTENT, {
      fetchPolicy: "network-only",
      // errorPolicy: "all",
      client: client || undefined,
      onError: (error) => {
        toast.error(error.message, { autoClose: false });
      },
    });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchResults(null);
    setSearchTerm(value);
    if (value && value !== "" && value.length > 2) {
      clearTimeout(typingTimer);
      typingTimer = window.setTimeout(async () => {
        let newVariables: { [key: string]: any } = {
          ...variables,
          search: value,
          types: types,
        };
        if (primaryField) {
          newVariables.primaryField = primaryField;
        }
        searchItems({
          variables: newVariables,
        });
      }, 300);
    }
  };

  const getType = (item: EntityPickerItem) => {
    // return item.type?.toLowerCase();
    return item.type?.charAt(0).toLowerCase() + item.type?.slice(1);
  };

  const getDetails = (item: EntityPickerItem) => {
    let type = getType(item);
    let typeString =
      type && I18n.get[type]?.label ? I18n.get[type]?.label : item.type;
    return (
      <Stack alignItems="center" spacing={1.5} direction="row">
        <Box>
          <span className={classes.rowItemDetailsLabel}>
            {I18n.get.misc.id}:
          </span>
          <span
          // className={classes.rowItemDetailsValue}
          >
            {item.id}
          </span>
        </Box>
        {typeString && typeString !== "" && (
          <Box>
            <span className={classes.rowItemDetailsLabel}>
              {I18n.get.misc.type}:
            </span>
            <span
            // className={classes.rowItemDetailsValue}
            >
              {type && I18n.get[type]?.label}
            </span>
          </Box>
        )}
        {extraDetails && <Box>{extraDetails(item)}</Box>}
      </Stack>
    );
  };

  const addNewItem = () => {
    selectItem({
      id: getTemporaryId(),
      title: searchTerm,
      type: types.join(","),
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

  const getTitle = (item: any) => {
    if (renderTitleField) {
      return renderTitleField(item);
    }
    return item.title || "";
  };

  // Effects.

  useEffect(() => {
    if (searchData) {
      let data = category
        .split(".")
        .reduce((o: any, i) => o && o[i], searchData);
      if (data) {
        setSearchResults(data);
      }
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
      classes={{ paper: classes.dialogPaper }}
      {...DialogProps}
      open={open}
      onClose={onClose}
    >
      <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
        <Typography
          variant="h6"
          component="div"
          className={classes.dialogTitle}
        >
          {I18n.get.entities.label.search}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <div className={classes.fieldWrapper}>
          {searchLoading && (
            <LinearProgress
              classes={{ root: classes.searchResultLoaderRoot }}
              className={classes.searchResultLoader}
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
              size="large"
            >
              <AddIcon />
            </IconButton>
          )}
          {searchTerm !== "" && (
            <IconButton
              className={classes.clearButton}
              aria-label="clear search field"
              onClick={() => clearSearch()}
              size="large"
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
                        {getTitle(item)}
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
