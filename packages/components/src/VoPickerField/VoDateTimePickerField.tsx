import React from "react";
import MobileDateTimePicker, {
  MobileDateTimePickerProps,
} from "@mui/lab/MobileDateTimePicker";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import DayjsUtils from "@date-io/dayjs"; // This has to be imported to make TypeScript compilation work.
import makeStyles from "@mui/styles/makeStyles";

// Custom.
import { stylesReddit } from "@vocollege/theme";
import VoTextField from "VoTextField";

const useStylesReddit = makeStyles(() => stylesReddit);

const VoDateTimePickerField: React.FC<MobileDateTimePickerProps> = (props) => {
  const classes = useStylesReddit();
  return (
    <MobileDateTimePicker
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

export default VoDateTimePickerField;
