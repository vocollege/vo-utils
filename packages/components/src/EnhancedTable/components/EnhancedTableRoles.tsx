import React from "react";
import Chip from "@mui/material/Chip";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

import clsx from "clsx";

// Custom.
import { EnhancedTableRolesProps } from "../global";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      margin: theme.spacing(0.5),
    },
  })
);

const EnhancedTableRoles: React.FC<EnhancedTableRolesProps> = ({
  data,
  classesMap,
}) => {
  const classes = useStyles();
  if (data) {
    return (
      <div className={classes.root}>
        {data.map((v: any, i: number) => (
          <Chip
            className={clsx(classes.item, classesMap && classesMap[v.name])}
            key={i}
            size="small"
            color="primary"
            label={v.label || v.title || v.name}
          />
        ))}
      </div>
    );
  }
  return <span></span>;
};

export default EnhancedTableRoles;
