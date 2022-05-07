import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableCell from "@mui/material/TableCell";

// Custom.
import { EnhancedTableHeadProps, EnhancedTableColumns } from "./global";

export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    columns,
    actionButtons = true,
  } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property.toUpperCase());
    };
  return (
    <TableHead>
      <TableRow>
        {columns.map((column: EnhancedTableColumns, index: number) => (
          <TableCell
            key={index}
            style={{
              maxWidth: column.width || "100%",
              width: column.width || "auto",
            }}
          >
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
