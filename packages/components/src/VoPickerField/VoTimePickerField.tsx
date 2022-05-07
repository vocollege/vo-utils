import React from "react";
import MobileTimePicker, {
  MobileTimePickerProps,
} from "@mui/lab/MobileTimePicker";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import DayjsUtils from "@date-io/dayjs"; // This has to be imported to make TypeScript compilation work.
import makeStyles from "@mui/styles/makeStyles";

// Custom.
import { stylesReddit } from "@vocollege/theme";
import VoTextField from "VoTextField";

const useStylesReddit = makeStyles(() => stylesReddit);

const VoTimePickerField: React.FC<MobileTimePickerProps> = (props) => {
  const classes = useStylesReddit();
  return (
    <MobileTimePicker
      ampm={false}
      InputProps={
        {
          classes,
          disableUnderline: true,
          size: "small",
        } as Partial<OutlinedInputProps>
      }
      {...props}
      // renderInput={(params) => <VoTextField {...params} variant="filled" />}
    />
  );
};

export default VoTimePickerField;
