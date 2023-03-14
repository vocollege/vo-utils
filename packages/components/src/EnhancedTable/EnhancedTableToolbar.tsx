import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Custom.
import { useToolbarStyles } from "./styles";
import { EnhancedTableToolbarProps } from "./global";
import { stylesActions } from "@vocollege/theme";
import FloatingButton from "@/FloatingButton";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import EnhancedTableSearchField from "./components/EnhancedTableSearchField";
import EnhancedTableFilters from "./components/EnhancedTableFilters";

const useStylesActions = makeStyles(() => stylesActions);

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const classes = useToolbarStyles();
  useStylesActions();
  const {
    title,
    total,
    addItem,
    enableSearch,

    SearchFieldProps,
    FiltersProps,

    // searchLoading,
    // onSearchTermChange,
    // searchResult,
  } = props;

  return (
    <Toolbar className={clsx(classes.root, { [classes.noTitle]: !title })}>
      <Grid container spacing={2}>
        {title && (
          <Grid item xs={12} md="auto">
            <Typography className={classes.title} variant="h6" component="h2">
              {title}
            </Typography>
            <Typography
              className={classes.title}
              variant="body1"
              component="h3"
            >
              {I18n.trans(I18n.get.form.labels.numberOfObjects, {
                number: SearchFieldProps.searchLoading ? 0 : total,
              })}
            </Typography>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md
          container
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          {enableSearch && (
            <Grid item xs="auto">
              <EnhancedTableSearchField {...SearchFieldProps} />
            </Grid>
          )}
          {FiltersProps?.filters && (
            <Grid item xs="auto" container alignItems="center">
              {enableSearch && (
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ ml: 1, mr: 2 }}
                />
              )}
              <EnhancedTableFilters {...FiltersProps} />
            </Grid>
          )}
        </Grid>
      </Grid>
      {addItem && (
        <FloatingButton
          label=""
          className="vo-global__actions-floating-button"
          onClick={addItem ? () => addItem() : () => {}}
        >
          <AddIcon />
        </FloatingButton>
      )}
    </Toolbar>
  );
}
