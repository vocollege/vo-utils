import {
  FileManagerBreadcrumbLink,
  FileManagerBreadcrumb,
  FileManagerPortfolio,
} from "./global";
import { I18n, VoConfig } from "@vocollege/app";

export function getBreadcrumbs(
  baseUrl: string,
  portfolio: FileManagerPortfolio | null | undefined,
  // paths: FileManagerBreadcrumb[] | null | undefined
  paths: any
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
      path: `${baseUrl}/portfolio/${portfolio.id}`,
    });
    paths?.forEach((v: FileManagerBreadcrumb, i: number) => {
      result.push({
        title: v.title,
        path: `${baseUrl}/folder/${v.id}`,
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
