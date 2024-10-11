import React, { useEffect, useReducer } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useConfirm } from "material-ui-confirm";
import parse from "html-react-parser";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import clsx from "clsx";
import { toast } from "react-toastify";
import makeStyles from "@mui/styles/makeStyles";
import { animateScroll } from "react-scroll";

// Custom.
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { useStyles } from "./styles";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { reducer, initialState } from "./state";
import {
  EnhancedTableProps,
  EnhancedTableColumns,
  EnhancedTableSelectedFilter,
} from "./global";
import { stylesCommon } from "@vocollege/theme";

const useStylesCommon = makeStyles(() => stylesCommon);

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
    renderActionButtons,
    refetch,
    labels,
    classes: classesProp,
    queryVariables,
    onDelete,
    enableSearch,
    filters,
    onDataChange,
    actionButtonIsDisabled,
  } = props;

  if (!operations.delete) {
    operations.delete = gql``;
  }

  // Methods.

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any,
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
    animateScroll.scrollToTop();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({
      values: {
        limit: parseInt(event.target.value, 10),
        page: 0,
      },
    });
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
      return column.render(row);
    }
    return row[column.field];
  };

  const handleSearch = (searchTerm: string) => {
    dispatch({ key: "search", values: searchTerm });
  };

  const handleFiltersChange = (filters: EnhancedTableSelectedFilter[]) => {
    dispatch({ key: "filters", values: filters });
  };

  // Api.

  const [
    loadData,
    {
      data: queryData,
      loading: queryLoading,
      called: queryCalled,
      refetch: refetchData,
    },
  ] = useLazyQuery(operations.get, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
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
      filters: state.filters,
      ...queryVariables,
    },
    onError: (error) => {
      toast.error(error.message, {
        autoClose: 10000,
      });
    },
  });

  const [deleteRow, { loading: deleteLoading }] = useMutation(
    operations?.delete,
    {
      client: client || undefined,
      onError: (error) => {
        toast.error(error.message, {
          autoClose: 10000,
        });
      },
      onCompleted: (data: any) => {
        if (labels?.deleted) {
          toast.success(labels.deleted);
        }
        loadData();
        onDelete && onDelete(data);
      },
    },
  );

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
      onDataChange && onDataChange(queryData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  useEffect(() => {
    if (refetch && refetchData) {
      refetchData();
    }
  }, [refetch]);

  return (
    <div className={clsx(classes.root, className)}>
      <Paper className={clsx(classes.paper, classesProp?.paper)} elevation={10}>
        <EnhancedTableToolbar
          addItem={addItem}
          title={title}
          total={state.total}
          enableSearch={enableSearch}
          SearchFieldProps={{
            searchLoading: queryLoading,
            onSearchTermChange: handleSearch,
          }}
          FiltersProps={{
            filters,
            onChange: handleFiltersChange,
          }}
        />
        <TableContainer>
          <Table
            className={clsx(classes.table, classesProp?.table)}
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
                  <TableRow key={index} hover>
                    {columns.map((column: any, index: number) => (
                      <TableCell key={index}>
                        <span className={classes.cellContent}>
                          {getCellData(column, row)}
                        </span>
                      </TableCell>
                    ))}
                    {actionButtons && actionButtons.length > 0 && (
                      <TableCell className={classes.actionColumn}>
                        {renderActionButtons && renderActionButtons(row, index)}
                        {actionButtons.indexOf("open") > -1 && openItem && (
                          <IconButton
                            className={classes.actionButton}
                            aria-label="open"
                            onClick={() =>
                              openItem(row[primaryField || "id"], row)
                            }
                            size="large"
                            disabled={
                              (actionButtonIsDisabled &&
                                actionButtonIsDisabled("open", row)) ||
                              false
                            }
                          >
                            <OpenInBrowserIcon />
                          </IconButton>
                        )}
                        {actionButtons.indexOf("edit") > -1 && editItem && (
                          <IconButton
                            className={classes.actionButton}
                            aria-label="edit"
                            onClick={() =>
                              editItem(row[primaryField || "id"], row)
                            }
                            size="large"
                            disabled={
                              (actionButtonIsDisabled &&
                                actionButtonIsDisabled("edit", row)) ||
                              false
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
                            size="large"
                            disabled={
                              (actionButtonIsDisabled &&
                                actionButtonIsDisabled("delete", row)) ||
                              false
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
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={state.total}
          rowsPerPage={state.limit}
          page={state.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default EnhancedTable;
