import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

// Custom.
import { stylesCommon } from "@vocollege/theme";
import { useStyles } from "./styles";
import { SimpleTableProps, SimpleTableColumn, SimpleTableRow } from "./global";

const useStylesCommon = makeStyles(() => stylesCommon);

const SimpleTable: React.FC<SimpleTableProps> = (props) => {
  const {
    columns,
    rows,
    isLoading,
    elevation,
    className,
    labels,
    stickyHead,
    classes: classesProp,
  } = props;
  const classes = useStyles();
  useStylesCommon();

  const getCellValue = (column: SimpleTableColumn, row: SimpleTableRow) => {
    if (!column?.render) {
      return row[column.field];
    }
    return column.render(row);
  };

  const getFakeRowLoading = () => {
    const fakeColumns: number[] = [];
    for (let i = 1; i <= columns.length; i++) {
      fakeColumns.push(i);
    }
    const fakeRows: number[] = [];
    for (let i = 1; i <= 5; i++) {
      fakeRows.push(i);
    }
    return fakeRows.map((v: any, i: number) => {
      return (
        <TableRow key={i}>
          {fakeColumns.map((number: any, index: number) => (
            <TableCell key={index}>
              <span className="vo-global__fake-element"></span>
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <Paper
      classes={{ root: classes.paperRoot }}
      className={className}
      elevation={elevation !== undefined ? elevation : 1}
    >
      {!isLoading && rows.length === 0 && labels && (
        <div className="vo-global__nothing-found">
          <span>{labels?.nothingFound}</span>
        </div>
      )}
      <TableContainer className={classes.tableContainer}>
        <Table
          className={clsx(classes.table, classesProp?.table)}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="simple table"
        >
          {!isLoading && (
            <TableHead
              className={clsx(classes.tableHead, classesProp?.head, {
                [classes.sticky]: stickyHead,
              })}
            >
              <TableRow>
                {columns.map((column: any, index: number) => {
                  return <TableCell key={index}>{column.title}</TableCell>;
                })}
              </TableRow>
            </TableHead>
          )}
          <TableBody className={classesProp?.body}>
            {isLoading && getFakeRowLoading()}
            {!isLoading &&
              rows.map((row: any, index: number) => (
                <TableRow key={index} className={classes.tableRow}>
                  {columns.map((column: any, index: number) => (
                    <TableCell key={index}>
                      {getCellValue(column, row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SimpleTable;
