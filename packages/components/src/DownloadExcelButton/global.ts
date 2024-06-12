import {
  Style,
  CellValue,
  Worksheet,
  AddWorksheetOptions,
  WorksheetProperties,
  Column,
} from "exceljs";

import { GeneralObject } from "@vocollege/app";

export interface DownloadExcelButtonProps {
  filename?: string;
  sheets?: Sheet[];
  sheetData?: Partial<Worksheet>[];
}

// export interface SheetColumn {
//   key: string;
//   label?: string;
//   width?: number;
// }

export interface SheetRow {
  column: string;
  value?: CellValue;
  style?: Partial<Style>;
}

export interface Sheet {
  name?: string;
  columns?: Partial<Column>[];
  rows?: any[];
  // rows?: SheetRow[];
  properties?: Partial<WorksheetProperties>;
  // data?: SheetData[];
}

// export interface SheetData {
//   cell?: string | number;
//   value?: CellValue;
//   style?: Partial<Style>;
// }
