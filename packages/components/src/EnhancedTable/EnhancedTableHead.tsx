import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";

// Custom.
import { EnhancedTableHeadProps } from "./global";

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    columns,
    actionButtons = true,
  } = props;
  const createSortHandler = (property: any) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property.toUpperCase());
  };
  return (
    <TableHead>
      <TableRow>
        {columns.map((column: any, index: number) => (
          <TableCell key={index} style={{ width: column.width || "auto" }}>
            <TableSortLabel
              active={orderBy === column.field.toLowerCase()}
              direction={orderBy === column.field.toLowerCase() ? order : "asc"}
              onClick={createSortHandler(column.field)}
            >
              {column.title}
              {orderBy === column.field ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {actionButtons && (
          <TableCell className={classes.actionColumn}></TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
