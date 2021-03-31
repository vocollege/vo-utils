import React from "react";
import { DatePicker, DatePickerProps } from "@material-ui/pickers";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import DayjsUtils from "@date-io/dayjs";

// Custom.
import { useStylesReddit } from "../styles/reddit";

const VoPicker: React.FC<DatePickerProps> = (props) => {
  const classes = useStylesReddit();
  return (
    <DatePicker
      inputVariant="filled"
      InputProps={
        { classes, disableUnderline: true } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
};

export default VoPicker;
