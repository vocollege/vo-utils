import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Cookies from "js-cookie";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import CookieIcon from "@mui/icons-material/Cookie";
import Button from "@mui/material/Button";

// Custom.
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import VoButton from "../VoButton";
import { useStyles } from "./styles";

export interface CookieConsentProps {
  className?: string;
  message?: string;
  link?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = (props) => {
  const { className, message, link } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [showCookieButton, setShowCookieButton] = useState(false);

  // Methods.

  const getDomain = () => {
    let hostnameParts = window.location.hostname.split(".");
    let domain = `${hostnameParts[hostnameParts.length - 2]}.${
      hostnameParts[hostnameParts.length - 1]
    }`;
    return domain;
  };

  const clearCookies = () => {
    const allCookies = Cookies.get();
    // let domain = getDomain();
    let domain = window.location.hostname;
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
      Cookies.remove(cookieName, { path: "/" });
      Cookies.remove(cookieName, {
        path: "/",
        domain: window.location.hostname,
      });
      Cookies.remove(cookieName, {
        path: "/",
        domain: "." + window.location.hostname,
      });
      Cookies.remove(cookieName, {
        path: "/",
        domain: domain,
      });
      Cookies.remove(cookieName, {
        path: "/",
        domain: "." + domain,
      });
    });
  };

  const handleAccept = (value = "1") => {
    if (value === "0") {
      clearCookies();
    }

    // let domain = getDomain();
    let domain = window.location.hostname;

    Cookies.set("vo_cookie_consent", value, {
      expires: 100,
      sameSite: "Lax",
      domain: domain,
    });
    setReloading(true);
    // window.location = window.location;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // const handleReject = () => {
  //   Cookies.set("vo_cookie_consent", "0", {
  //     expires: 100,
  //     sameSite: "Lax",
  //   });
  //   setOpen(false);
  // };

  const handleShowCookieButtonClick = () => {
    setShowCookieButton(false);
    setOpen(true);
  };

  // Effects

  useEffect(() => {
    let alreadyAccepted = Cookies.get("vo_cookie_consent");
    if (!alreadyAccepted) {
      setTimeout(() => {
        setOpen(true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    setShowCookieButton(
      !open && link && window?.location?.href?.indexOf(link) > -1
    );
  });

  return (
    <>
      <Slide in={open} direction="up">
        <Paper elevation={15} className={clsx(classes.root, className)}>
          <Typography
            className={classes.title}
            component="h2"
            variant="h6"
            color="primary"
          >
            {I18n.get.messages.cookiesTitle}
          </Typography>
          <Typography
            className={classes.message}
            component="div"
            variant="body1"
          >
            {message || I18n.get.messages.cookiesMessage}
          </Typography>
          {/* <div className={classes.actions}> */}
          <Stack sx={{ mt: 1 }} spacing={1} direction="row">
            <Box sx={{ flex: 1 }}>
              {link && (
                <Link variant="caption" href={link}>
                  {I18n.get.actions.readMore}
                </Link>
              )}
            </Box>
            <VoButton
              onClick={() => handleAccept("0")}
              color="error"
              variant="text"
              size="small"
            >
              {I18n.get.actions.doNotApprove}
            </VoButton>
            <VoButton
              onClick={() => handleAccept("1")}
              color="secondary"
              variant="contained"
              size="small"
            >
              {I18n.get.actions.approveCookies}
            </VoButton>
          </Stack>
          {/* </div> */}
          {reloading && (
            <Box
              sx={(theme) => ({
                alignItems: "center",
                background: alpha(theme.palette.common.white, 0.7),
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                padding: 1,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
              })}
            >
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Slide>
      {showCookieButton && (
        <Box
          sx={(theme) => ({
            // background: alpha(theme.palette.common.white, 0.85),
            background: theme.palette.common.white,
            // border: `1px solid ${theme.palette.grey}`,
            borderRadius: theme.spacing(1),
            // borderBottomRightRadius: theme.spacing(1),
            // borderTopRightRadius: theme.spacing(1),
            bottom: theme.spacing(4),
            boxShadow: theme.shadows[15],
            left: theme.spacing(4),
            position: "fixed",
            zIndex: 1,
          })}
        >
          <Button
            startIcon={<CookieIcon color="secondary" />}
            disableFocusRipple
            size="medium"
            onClick={handleShowCookieButtonClick}
          >
            {I18n.get.actions.cookies}
          </Button>
        </Box>
      )}
    </>
  );
};

export default CookieConsent;
