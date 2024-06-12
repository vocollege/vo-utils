import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Workbook, AddWorksheetOptions, Column } from "exceljs";
import { saveAs } from "file-saver";

// Custom.
import { DownloadExcelButtonProps, Sheet, SheetRow } from "./global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

const DownloadExcelButton: React.FC<DownloadExcelButtonProps> = (props) => {
  const { filename, sheets } = props;

  const [workbook, setWorkbook] = useState<Workbook | null>(null);

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

  const createWorkbook = () => {
    if (!sheets) {
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
    createWorkbook();
  }, [sheets]);

  if (!workbook) {
    return <></>;
  }

  return (
    <Box>
      <Fab
        size="medium"
        color="secondary"
        variant="extended"
        onClick={handleDownload}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <FileDownloadIcon sx={{ mr: 0.5 }} />
        {I18n.get.actions.downloadExcel}
      </Fab>
    </Box>
  );
};

export default DownloadExcelButton;
