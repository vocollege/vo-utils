import React, { useEffect, useReducer } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useConfirm } from "material-ui-confirm";
import parse from "html-react-parser";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import clsx from "clsx";
import { toast } from "react-toastify";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Custom.
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { useStyles } from "./styles";
import { I18n } from "@vocollege/app";
import { reducer, initialState } from "./state";
import { EnhancedTableProps, EnhancedTableColumns } from "./global";
import { stylesCommon } from "@vocollege/theme";

const useStylesCommon = makeStyles(() => stylesCommon);

// @TODO API:et is called twice on the first load, but it's not triggered
// by useEffect... Investigate later...

const EnhancedTable: React.FC<EnhancedTableProps> = (props) => {
  useStylesCommon();
  const classes = useStyles();
  const confirm = useConfirm();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    title,
    columns,
    addItem,
    editItem,
    openItem,
    operations,
    className,
    order,
    orderBy,
    primaryField,
    client,
    actionButtons = ["edit", "delete"],
  } = props;

  if (!operations.delete) {
    operations.delete = gql``;
  }

  const [
    loadData,
    { data: queryData, loading: queryLoading, called: queryCalled },
  ] = useLazyQuery(operations.get, {
    fetchPolicy: "network-only",
    client: client || undefined,
    variables: {
      page: state.page,
      limit: state.limit,
      search: state.search,
      order: state.order,
      orderBy: [
        {
          column: state.orderBy,
          order: state.order,
        },
      ],
    },
    onError: (error) => {
      toast.error(error.message, {
        autoClose: false,
        position: toast.POSITION.BOTTOM_LEFT,
      });
    },
  });

  const [deleteRow, { loading: deleteLoading }] = useMutation(
    operations?.delete,
    {
      client: client || undefined,
      onCompleted: () => {
        loadData();
      },
      //   update(cache, { data }) {
      //     const existingItems: any = cache.readQuery({ query: operations.get });
      //     let category = Object.keys(data)[0];
      //     const newItems = existingItems![operations.category].filter(
      //       (t: any) => t.id !== data[category].id
      //     );
      //     cache.writeQuery({
      //       query: operations.get,
      //       data: { [operations.category]: newItems },
      //     });
      //   },
    }
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = state.orderBy === property && state.order === "ASC";
    dispatch({
      values: {
        order: isAsc ? "DESC" : "ASC",
        orderBy: property,
      },
    });
  };

  const getFakeRowLoading = () => {
    const fakeRows = [];
    let limit = Math.round(state.limit / 2);
    for (let i = 1; i <= limit; i++) {
      fakeRows.push(i);
    }
    return fakeRows.map((v: any, i: number) => {
      return (
        <TableRow key={i}>
          {columns.map((column: any, index: number) => (
            <TableCell key={index}>
              <span className="vo-global__fake-element"></span>
            </TableCell>
          ))}
          <TableCell>
            <span className="vo-global__fake-element"></span>
          </TableCell>
        </TableRow>
      );
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch({ key: "page", values: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      values: {
        limit: parseInt(event.target.value, 10),
        page: 0,
      },
    });
  };

  const handleEdit = (rowId: any) => {
    if (editItem) {
      editItem(rowId);
    }
  };

  const handleOpen = (rowId: any) => {
    if (openItem) {
      openItem(rowId);
    }
  };

  const handleDelete = (rowId: any) => {
    let description = I18n.trans(I18n.get.messages.deleteElement, {
      element: `<b>${rowId}</b>`,
    });
    confirm({
      description: parse(description),
    }).then(async () => {
      await deleteRow({
        variables: {
          id: rowId,
        },
      });
    });
  };

  const getCellData = (column: EnhancedTableColumns, row: any) => {
    if (column.render) {
      return column.render(row[column.field]);
    }
    return row[column.field];
  };

  // Effects.

  useEffect(() => {
    const stateValues: { [key: string]: any } = {};
    if (order) {
      stateValues.order = order;
    }
    if (orderBy) {
      stateValues.orderBy = orderBy;
    }
    if (Object.keys(stateValues).length > 0) {
      dispatch({
        values: stateValues,
      });
    }
    if (!queryCalled) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (queryData) {
      dispatch({
        values: {
          data:
            queryData[operations.category].data ||
            queryData[operations.category],
          total: queryData[operations.category].paginatorInfo
            ? queryData[operations.category].paginatorInfo.total
            : queryData[operations.category].length,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  return (
    <div className={clsx(classes.root, className)}>
      <Paper className={classes.paper} elevation={10}>
        <EnhancedTableToolbar addItem={addItem} title={title} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={state.order.toLowerCase()}
              orderBy={state.orderBy.toLowerCase()}
              onRequestSort={handleRequestSort}
              columns={columns}
              actionButtons={actionButtons && actionButtons.length > 0}
            />
            <TableBody>
              {(queryLoading || deleteLoading) && getFakeRowLoading()}
              {!queryLoading &&
                !deleteLoading &&
                state.data.map((row: any, index: number) => (
                  <TableRow key={index}>
                    {columns.map((column: any, index: number) => (
                      <TableCell key={index}>
                        <span className={classes.cellContent}>
                          {getCellData(column, row)}
                        </span>
                      </TableCell>
                    ))}
                    {actionButtons && actionButtons.length > 0 && (
                      <TableCell className={classes.actionColumn}>
                        {actionButtons.indexOf("open") > -1 && (
                          <IconButton
                            className={classes.actionButton}
                            aria-label="open"
                            onClick={() =>
                              handleOpen(row[primaryField || "id"])
                            }
                          >
                            <OpenInBrowserIcon />
                          </IconButton>
                        )}
                        {actionButtons.indexOf("edit") > -1 && (
                          <IconButton
                            className={classes.actionButton}
                            aria-label="edit"
                            onClick={() =>
                              handleEdit(row[primaryField || "id"])
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        {actionButtons.indexOf("delete") > -1 && (
                          <IconButton
                            className={classes.actionButton}
                            aria-label="delete"
                            onClick={() =>
                              handleDelete(row[primaryField || "id"])
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 40]}
          component="div"
          count={state.total}
          rowsPerPage={state.limit}
          page={state.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default EnhancedTable;
