import React from "react";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import DayjsUtils from "@date-io/dayjs"; // This has to be imported to make TypeScript compilation work.
import makeStyles from "@mui/styles/makeStyles";
import Dayjs from "dayjs";

// Custom.
import { stylesReddit } from "@vocollege/theme";
// import VoTextField from "../VoTextField";

const useStylesReddit = makeStyles(() => stylesReddit);

const VoDatePickerField: React.FC<any> = (props) => {
  const classes = useStylesReddit();
  return (
    <MobileDatePicker
      InputProps={
        {
          classes,
          disableUnderline: true,
          size: "small",
        } as Partial<OutlinedInputProps>
      }
      value={Dayjs()}
      {...props}
      // renderInput={(params) => <VoTextField {...params} variant="filled" />}
    />
  );
};

export default VoDatePickerField;
