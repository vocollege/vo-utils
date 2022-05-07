import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Cookies from "js-cookie";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

// Custom.
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import VoButton from "../VoButton";
import { useStyles } from "./styles";

export interface CookieConsentProps {
  className?: string;
  message?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = (props) => {
  const { className, message } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Methods.

  const handleAccept = () => {
    Cookies.set("vo_cookie_consent", "1", {
      expires: 100,
      sameSite: "Lax",
    });
    setOpen(false);
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

  return (
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
        <Typography className={classes.message} component="div" variant="body1">
          {message || I18n.get.messages.cookiesMessage}
        </Typography>
        <div className={classes.actions}>
          <VoButton
            onClick={handleAccept}
            color="secondary"
            variant="contained"
            size="small"
          >
            {I18n.get.actions.acceptCookies}
          </VoButton>
        </div>
      </Paper>
    </Slide>
  );
};

export default CookieConsent;
