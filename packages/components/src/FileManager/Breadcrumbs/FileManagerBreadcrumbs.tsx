import React, { useEffect, useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

// Custom.
import {
  FileManagerBreadcrumbsProps,
  FileManagerBreadcrumbLink,
} from "../global";
import { getBreadcrumbs } from "../FileManagerHelper";
import { useStyles } from "./styles";

export default function FileManagerBreadcrumbs(
  props: FileManagerBreadcrumbsProps
) {
  const { loading, items, category, baseUrl, path, onClick } = props;
  const classes = useStyles();
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<
    FileManagerBreadcrumbLink[]
  >([]);

  // Methods.

  const handleClick = (
    event: React.SyntheticEvent,
    path: string | null = null
  ) => {
    event.preventDefault();
    if (onClick) {
      let value = "";
      let type = "";
      if (path) {
        const pathParts = path.split("/");
        if (pathParts[0] === "") {
          pathParts.shift();
        }
        value = pathParts[pathParts.length - 1];
        type =
          pathParts[pathParts.length - 2].charAt(0).toUpperCase() +
          pathParts[pathParts.length - 2].slice(1);
      }
      onClick(value, type);
    }
  };

  // Effects.

  useEffect(() => {
    const portfolio = items && items[category] && items[category].portfolio;
    setBreadcrumbLinks(getBreadcrumbs(baseUrl, portfolio, path));
  }, [items, category, baseUrl, path]);

  if (breadcrumbLinks.length === 0) {
    return <div></div>;
  }

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      classes={{ root: classes.root, ol: classes.ol, li: classes.li }}
    >
      {!loading &&
        breadcrumbLinks.map((v: FileManagerBreadcrumbLink, i: number) => {
          if (v.path || (i === 0 && breadcrumbLinks.length > 1)) {
            if (onClick) {
              return (
                <Link
                  key={i}
                  classes={{ root: classes.link }}
                  onClick={(event: React.SyntheticEvent) =>
                    handleClick(event, v?.path)
                  }
                >
                  {v.title}
                </Link>
              );
            } else {
              return (
                <Link key={i} component={RouterLink} to={v.path || ""}>
                  {v.title}
                </Link>
              );
            }
          } else {
            return (
              <Typography key={i} color="textPrimary">
                {v.title}
              </Typography>
            );
          }
        })}
    </Breadcrumbs>
  );
}
