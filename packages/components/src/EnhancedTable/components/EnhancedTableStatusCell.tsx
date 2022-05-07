import React from "react";
import Chip from "@mui/material/Chip";

// Custom.
import { EnhancedTableStatusCellProps } from "../global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

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
    case 2:
      return (
        <Chip
          size="small"
          color="secondary"
          label={I18n.get.status.open.toLowerCase()}
        />
      );
    case 3:
      return (
        <Chip
          size="small"
          color="info"
          label={I18n.get.status.inProgress.toLowerCase()}
        />
      );
    case 4:
      return (
        <Chip
          size="small"
          color="default"
          variant="outlined"
          label={I18n.get.status.closed.toLowerCase()}
        />
      );
    default:
      return data;
  }
  return <span></span>;
};

export default EnhancedTableStatusCell;
