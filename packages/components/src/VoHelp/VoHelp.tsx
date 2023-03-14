import React, { useEffect, useReducer } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { useQuery } from "@apollo/client";
import parse from "html-react-parser";
import clsx from "clsx";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Custom.
import { HelpProps } from "./global";
import { GeneralObject } from "@vocollege/app/dist/global";
import { useStyles } from "./styles";
import { reducer } from "@vocollege/app/dist/modules/VoHelpers";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import VoLoader from "../VoLoader";
import { GET_HELP } from "@vocollege/app/dist/modules/VoApi";

const initialState = {
  items: null,
  selected: null,
  selectedId: null,
  history: [],
};

const drawerWidth = 560;
const drawerWidthMobile = "100%";

const Help: React.FC<HelpProps> = (props) => {
  const {
    settingName,
    category = "help",
    operation,
    client,
    onClose,
    ...rest
  } = props;
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  // Methods.

  const handleItemClick = (id: string | null) => {
    let newHistory = [...state.history, state.selectedId];
    dispatch({
      values: {
        history: newHistory,
        selectedId: id,
      },
    });
  };

  const navigateBack = () => {
    if (state.history.length === 0) {
      return;
    }
    let pos = state.history.length - 1;
    let id = state.history[pos];
    dispatch({
      values: {
        history: [...state.history.filter((v: any, i: number) => i !== pos)],
        selectedId: id,
      },
    });
  };

  const setContent = () => {
    // if (!data || !data[category]) {
    //   dispatch({
    //     values: {
    //       items: null,
    //       selected: null,
    //     },
    //   });
    // } else {
    if (data && data[category]) {
      dispatch({
        values: {
          items: data[category].filter(
            (v: GeneralObject) => v.parent && v.id !== state.selectedId
          ),
          selected: data[category].find((v: GeneralObject) => {
            if (!v.parent && !state.selectedId) {
              return true;
            }
            return v.id === state.selectedId;
          }),
        },
      });
    }
  };

  // API.

  const { loading, error, data } = useQuery(operation || GET_HELP, {
    errorPolicy: "all",
    client: client || undefined,
    variables: {
      name: settingName,
      parent: state.selectedId,
    },
  });

  // Effects.

  useEffect(() => {
    setContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Drawer
      {...rest}
      anchor="right"
      variant={matchesLg ? "persistent" : "temporary"}
      ModalProps={{ keepMounted: true }}
      classes={{ paper: classes.root }}
      className={classes.drawer}
      sx={{
        width: matchesSm ? drawerWidthMobile : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: matchesSm ? drawerWidthMobile : drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {matchesLg && <Toolbar />}
      <div className={classes.container}>
        <div className={classes.actions}>
          <Typography
            variant="h5"
            component="h5"
            className={classes.actionsTitle}
          >
            {I18n.get.help.labels.help}
          </Typography>
          <div className={classes.grow}></div>
          {state.history.length > 0 && (
            <IconButton
              color="success"
              onClick={() => navigateBack()}
              title={I18n.get.help.labels.previousSection}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          {state.selectedId && (
            <IconButton
              color="success"
              onClick={() => handleItemClick(null)}
              title={I18n.get.help.labels.start}
            >
              <HomeIcon />
            </IconButton>
          )}
          <IconButton
            color="success"
            onClick={(event) => onClose && onClose(event, "escapeKeyDown")}
            className={classes.closeButton}
            title={I18n.get.help.labels.close}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {state.selected && (
          <div className={classes.content}>
            <Typography
              color="primary"
              variant="h4"
              component="h2"
              className={classes.contentTitle}
            >
              {state.selected.title}
            </Typography>
            {state.selected.body && (
              <div className={clsx("vo-global__content", classes.contentBody)}>
                {parse(state.selected.body)}
              </div>
            )}

            {state.selected.tags && state.selected.tags.length > 0 && (
              <div className={classes.contentTags}>
                {state.selected.tags.map((v: GeneralObject, i: number) => (
                  <Chip
                    key={i}
                    label={v.label}
                    color="secondary"
                    size="small"
                    className={classes.tag}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {!state.items && (
          <div className={classes.nothingFound}>
            <Typography variant="h6" component="h6">
              {I18n.get.misc.nothingFound}
            </Typography>
          </div>
        )}
        {state.items && state.items.length > 0 && (
          <>
            <Typography
              variant="h6"
              component="h3"
              className={classes.relatedTitle}
            >
              {I18n.get.help.labels.relatedContent}
            </Typography>
            <List>
              {state.items.map((v: GeneralObject, i: number) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(v.id)}>
                    <ListItemIcon className={classes.listIcon}>
                      <LabelImportantIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={v.title}
                      primaryTypographyProps={{
                        className: classes.listPrimaryText,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
        {loading && <VoLoader className={classes.loader} />}
      </div>
    </Drawer>
  );
};

export default Help;
