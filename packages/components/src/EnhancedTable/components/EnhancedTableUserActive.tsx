import React from "react";
import Chip from "@mui/material/Chip";

// Custom.
import { EnhancedTableUserActiveProps } from "../global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

const EnhancedTableUserActive: React.FC<EnhancedTableUserActiveProps> = ({
  data,
}) => {
  switch (data) {
    case false:
      return (
        <Chip
          size="small"
          color="error"
          label={I18n.get.misc.inactive.toLowerCase()}
        />
      );
    case true:
      return (
        <Chip
          size="small"
          color="success"
          label={I18n.get.misc.active.toLowerCase()}
        />
      );

    default:
      return data;
  }
};

export default EnhancedTableUserActive;
