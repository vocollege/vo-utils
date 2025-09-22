import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

// Custom.
import { useStyles } from "./styles";

const VoButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const classes = useStyles();
    return (
      <Button
        classes={{
          root: classes.root,
          containedSecondary: classes.containedSecondary,
          outlinedSecondary: classes.outlinedSecondary,
        }}
        {...props}
      />
    );
  }
);

export default VoButton;
