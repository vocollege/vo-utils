import React from "react";
import { TimePicker, TimePickerProps } from "@material-ui/pickers";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import DayjsUtils from "@date-io/dayjs"; // This has to be imported to make TypeScript compilation work.
import makeStyles from "@material-ui/core/styles/makeStyles";

// Custom.
import { stylesReddit } from "@vocollege/theme";

const useStylesReddit = makeStyles(() => stylesReddit);

const VoTimePickerField: React.FC<TimePickerProps> = (props) => {
  const classes = useStylesReddit();
  return (
    <TimePicker
      ampm={false}
      inputVariant="filled"
      InputProps={
        { classes, disableUnderline: true } as Partial<OutlinedInputProps>
      }
      {...props}
    />
  );
};

export default VoTimePickerField;
