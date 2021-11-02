import React from "react";
import Chip from "@material-ui/core/Chip";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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
    console.log("data", data);

    return (
      <span className={classes.root}>
        {data.map((v: any, i: number) => (
          <Chip
            className={clsx(classes.item, classesMap && classesMap[v.name])}
            key={i}
            size="small"
            color="primary"
            label={v.label}
          />
        ))}
      </span>
    );
  }
  return <span></span>;
};

export default EnhancedTableRoles;
