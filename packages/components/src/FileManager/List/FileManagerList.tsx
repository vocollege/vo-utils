import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import makeStyles from "@mui/styles/makeStyles";

// Icons.
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Custom.
import { FileManagerListProps, FileManagerFolderElement } from "../global";
import FileManagerElement from "../Element";
import FileManagerIcon from "../Element/FileManagerIcon";
import { I18n } from "@vocollege/app";
import { useStyles } from "./styles";
import { stylesCommon } from "@vocollege/theme";

const useStylesCommon = makeStyles(() => stylesCommon);

interface Column {
  label: string;
  field: string;
  classeName?: string;
  render?: (element: any) => void;
}

const getColumns = (category: string): Column[] => {
  switch (category) {
    case "portfolios":
      return [
        {
          label: I18n.get.form.labels.title,
          field: "title",
        },
        {
          label: I18n.get.form.labels.description,
          field: "description",
          classeName: "vo-global__file-manager-column-description",
        },
        {
          label: I18n.get.misc.updated_at,
          field: "updated_at",
          classeName: "vo-global__file-manager-column-date",
        },
        {
          label: I18n.get.misc.created_at,
          field: "created_at",
          classeName: "vo-global__file-manager-column-date",
        },
      ];

    case "folderElements":
      break;
  }
  return [];
};

export default function FileManagerList(props: FileManagerListProps) {
  const { items, category, onSelect, selectedElement, baseUrl } = props;
  const classes = useStyles();
  useStylesCommon();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    setColumns(getColumns(category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.type}></TableCell>
              {columns.map((column: Column) => (
                <TableCell className={column.classeName || ""}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items[category].data.length > 0 &&
              items[category].data.map((element: any, i: number) => (
                <TableRow
                  hover
                  classes={{ root: classes.rowRoot, hover: classes.rowHover }}
                >
                  <TableCell>
                    <FileManagerIcon
                      element={element}
                      color="inherit"
                      fontSize="large"
                    />
                  </TableCell>
                  {columns.map((column: Column) => (
                    <TableCell>
                      {column.render
                        ? column.render(element)
                        : element[column.field]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className={classes.actions}>
                      <IconButton
                        aria-label="show 4 new mails"
                        color="inherit"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        color="inherit"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container style={{ display: "none" }}>
        {items[category].data.length === 0 && (
          <Grid item xs={12}>
            <div className="vo-global__nothing-found">
              <span>{I18n.get.misc.nothingFound}</span>
            </div>
          </Grid>
        )}
        {items[category].data.length > 0 &&
          items[category].data.map(
            (element: FileManagerFolderElement, i: number) => {
              return (
                <Grid item key={i} xs={6} md={2}>
                  <FileManagerElement
                    element={element}
                    baseUrl={baseUrl}
                    onSelect={onSelect}
                    selected={
                      selectedElement &&
                      selectedElement.id === element.id &&
                      selectedElement.__typename === element.__typename
                    }
                  />
                  {/* <FileManagerElement
                  id={params.id}
                  title={params.title}
                  elementType={params.elementType}
                  type={params.type}
                  url={params.url}
                  onSelect={onSelect}
                  selected={
                    selectedElement &&
                    selectedElement.id === params.id &&
                    selectedElement.elementType === params.elementType
                  }
                /> */}
                </Grid>
              );
            }
          )}
      </Grid>
    </>
  );
}
