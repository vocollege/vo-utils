import React from "react";
import { Alert, AlertTitle, AlertProps } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

// Custom.
import { useStyles } from "./styles";

interface ErrorBoxProps extends AlertProps {
  title?: string;
  content?: string;
  buttonTitle?: string;
  buttonPath?: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
  const { severity, title, content, buttonTitle, buttonPath } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert
        severity={severity}
        classes={{ root: classes.alert, message: classes.message }}
      >
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
      {buttonTitle && (
        <div className={classes.grow}>
          <Button
            size="large"
            variant="text"
            color="primary"
            component={RouterLink}
            to={buttonPath || "/"}
          >
            {buttonTitle}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorBox;
