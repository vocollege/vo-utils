import React from "react";
import DocumentIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GridOnIcon from "@mui/icons-material/GridOn";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

// Custom.
import {
  FileManagerBreadcrumbLink,
  FileManagerBreadcrumb,
  FileManagerPortfolio,
} from "./global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import VoConfig from "@vocollege/app/dist/modules/VoConfig";

export function getBreadcrumbs(
  baseUrl: string,
  portfolio: FileManagerPortfolio | null | undefined,
  // paths: FileManagerBreadcrumb[] | null | undefined
  paths: any,
  basePaths = {
    portfolio: "portfolio",
    folder: "folder",
  }
) {
  const result: FileManagerBreadcrumbLink[] = [];
  // if (baseUrl !== "") {
  result.push({
    title: I18n.get.docs.label.portfolios,
    path: baseUrl,
  });
  // }
  if (portfolio) {
    result.push({
      title: portfolio.title || portfolio.name,
      path: `${baseUrl}/${basePaths.portfolio}/${portfolio.id}`,
    });
    paths?.forEach((v: FileManagerBreadcrumb, i: number) => {
      result.push({
        title: v.title,
        path: `${baseUrl}/${basePaths.folder}/${v.id}`,
      });
    });
  }
  if (result[result.length - 1]) {
    result[result.length - 1].path = null;
  }
  return result;
}

export function isDiskPublic(portfolio: FileManagerPortfolio) {
  let publicDisks = VoConfig.get.DOCS_PUBLIC_DISKS?.split(",");
  // let publicDisks = process.env.REACT_APP_DOCS_PUBLIC_DISKS?.split(",");
  return publicDisks && publicDisks.indexOf(portfolio.disk) > -1;
}

export function getBucket(portfolio: FileManagerPortfolio) {
  let disk = portfolio.disk.split(".");
  if (!disk[1]) {
    return null;
  }
  return VoConfig.get[`AWS_BUCKET_${disk[1].toUpperCase()}`];
  // return process.env[`REACT_APP_AWS_BUCKET_${disk[1].toUpperCase()}`];
}

export const getIcon = (filetype = "") => {
  switch (true) {
    case filetype.indexOf("image") > -1:
      return <ImageIcon />;
    case filetype.indexOf("pdf") > -1:
      return <PictureAsPdfIcon />;
    case filetype.indexOf("sheet") > -1:
      return <GridOnIcon />;
    case filetype.indexOf("video") > -1:
      return <LocalMoviesIcon />;
    case filetype.indexOf("document") > -1:
      return <DocumentIcon />;
    default:
      return <InsertDriveFileIcon />;
  }
};

export const getSizeString = (filesize?: number) => {
  if (!filesize) {
    return "";
  }
  return `${(filesize / 1000000).toFixed(2)} MB`;
};
