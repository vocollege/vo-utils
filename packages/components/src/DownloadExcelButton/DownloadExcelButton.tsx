import React, { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Workbook, AddWorksheetOptions, Column } from "exceljs";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";
// Custom.
import { DownloadExcelButtonProps, Sheet, SheetRow } from "./global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

const EMPTY_QUERY = gql`
  query {
    __typename
  }
`;

const DownloadExcelButton: React.FC<DownloadExcelButtonProps> = (props) => {
  const { filename, sheets, query, queryProps, sx, handleExcelQueryData} = props;
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [loadData, {called, loading, data, error: queryError}] = useLazyQuery(query || EMPTY_QUERY, {variables: queryProps});
  const useQueryData = useMemo(() => { return !!query; }, [query]);

  // Methods.

  const handleDownload = () => {
    try {
      if (!workbook) {
        return;
      }
      workbook.xlsx.writeBuffer().then(function (data) {
        var blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, filename);
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleClick = () => {
    if (useQueryData) {
      loadData();
    } else {
      handleDownload();
    }
  
  };

  const createWorkbook = (sheets) => {
    if (!sheets) {
      console.error("No sheets to create workbook from");
      return;
    }
    const newWorkbook = new Workbook();

    sheets.map((v: Sheet) => {
      const options: Partial<AddWorksheetOptions> = {
        pageSetup: {
          paperSize: 9,
          fitToPage: true,
          fitToHeight: 0,
          fitToWidth: 1,
        },
      };
      if (v?.properties) {
        options.properties = v.properties;
      }
      const sheet = newWorkbook.addWorksheet(v.name, options);

      sheet.addRows(v.rows || []);

      let column01 = sheet.getColumn(1);
      column01.width = 35;
      column01.alignment = { wrapText: true };

      let column03 = sheet.getColumn(3);
      column03.width = 30;
      column03.alignment = { horizontal: "right", vertical: "top" };
    });

    setWorkbook(newWorkbook);
  };

  // Effects.

  useEffect(() => {
    createWorkbook(sheets);
  }, [sheets]);

  useEffect(() => {
    if (data && useQueryData) {
      createWorkbook(handleExcelQueryData ? handleExcelQueryData(data) : data);
    }
  }, [data, useQueryData, handleExcelQueryData]);

  useEffect(() => {
    if (useQueryData && workbook && data) {
      handleDownload();
    }
  }, [workbook, data]);


  useEffect(() => {
    if (queryError) {
      toast.error(queryError.message, {autoClose: 20000});
    }
  }, [queryError]);

  if (!workbook && !useQueryData) {
    return <></>;
  }

  return (
    <Box>
      <Fab
        size="medium"
        color="secondary"
        variant="extended"
        onClick={handleClick}
        disabled={loading}
        sx={[{
          position: "fixed",
          bottom: 16,
          right: 16,
        }, ...(sx && Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <FileDownloadIcon sx={{ mr: 0.5 }} />
        {I18n.get.actions.downloadExcel}
      </Fab>
    </Box>
  );
};

export default DownloadExcelButton;
