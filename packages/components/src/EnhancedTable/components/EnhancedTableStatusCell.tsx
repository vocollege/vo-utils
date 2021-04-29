import React from "react";
import Chip from "@material-ui/core/Chip";

// Custom.
import { EnhancedTableStatusCellProps } from "../global";
import { I18n } from "@vocollege/app";

const EnhancedTableStatusCell: React.FC<EnhancedTableStatusCellProps> = ({
  data,
}) => {
  switch (data) {
    case 0:
      return (
        <Chip size="small" label={I18n.get.status.unpublished.toLowerCase()} />
      );
    case 1:
      return (
        <Chip
          size="small"
          color="primary"
          label={I18n.get.status.published.toLowerCase()}
        />
      );
  }
  return <span></span>;
};

export default EnhancedTableStatusCell;
