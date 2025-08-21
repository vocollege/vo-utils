import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

export interface VoRadioButton {
  label: string;
  value: any;
} 

export interface VoRadioField {
  label: string;
  name: string;
  values: VoRadioButton[];
  value: any;
  onChange?: (value: any) => void;
}

const VoRadioField: React.FC<VoRadioField> = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    value,
    values,
    onChange
  } = props;
  
  const getButtons = () => {
    return values.map((v) => {
      return <FormControlLabel value={v.value} control={<Radio />} label={v.label} key={v.value}/>
    });
  };
  const handleChange = (v) => {
    if (onChange) {
      onChange(v);
    }
  } 

  return (
    <FormControl sx={(theme: any) => ({
      border: "1px dotted",
      borderColor: theme.palette.grey[500],
      padding: theme.spacing(1),
      borderRadius: "8px",
      width:"100%",
      /*transitionDuration: "1s",
      "&:hover": {
        transform: "translate(50%, 0) rotate(80deg)",
      },*/
    })}>
      <FormLabel id="VoRadioGroup">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="VoRadioGroup"
        name={name}
        value={value}
        defaultValue={value}
        onChange={(e) => handleChange(e.target.value)}
      >
      {getButtons()}
      </RadioGroup>
    </FormControl>
  );
});

export default VoRadioField;
