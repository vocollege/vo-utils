import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";

// Custom.
import { useStyles } from "./styles";

const VoButton: React.FC<ButtonProps> = React.forwardRef((props, ref) => {
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
});

export default VoButton;
