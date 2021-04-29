import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Custom.
import { stylesCommon } from "@vocollege/theme";
import { useStyles } from "./styles";
import { SimpleTableProps, SimpleTableColumn, SimpleTableRow } from "./global";

const useStylesCommon = makeStyles(() => stylesCommon);

const SimpleTable: React.FC<SimpleTableProps> = (props) => {
  const { columns, rows, isLoading, elevation, className, labels } = props;
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
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="simple table"
        >
          {!isLoading && (
            <TableHead>
              <TableRow>
                {columns.map((column: any, index: number) => {
                  return <TableCell key={index}>{column.title}</TableCell>;
                })}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {isLoading && getFakeRowLoading()}
            {!isLoading &&
              rows.map((row: any, index: number) => (
                <TableRow key={index}>
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
