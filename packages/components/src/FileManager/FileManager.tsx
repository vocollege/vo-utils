import React, { useReducer, useState, useEffect } from "react";
import clsx from "clsx";
import { useLazyQuery, useMutation } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
// import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import parse from "html-react-parser";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

// Custom.
import { VoDocs } from "@vocollege/app";
import { I18n } from "@vocollege/app";
import { reducer, initialState } from "./state";
import FileManagerHeader from "./Header";
import FileManagerGrid from "./Grid";
import {
  FileManagerProps,
  FileManagerBreadcrumbLink,
  FileManagerActionName,
  FileManagerFolderElement,
  FileManagerElementAction,
} from "./global";
import FileManagerBreadcrumbs from "./Breadcrumbs";
import FileManagerBottomArea from "./BottomArea";
import FileManagerActions from "./Actions";
import {
  FileManagerPortfolioForm,
  FileManagerFolderForm,
  FileManagerFileForm,
} from "./Forms";
import { useStyles } from "./styles";
import { fakeMutation } from "@vocollege/app";

const FileManager: React.FC<FileManagerProps> = (props) => {
  const {
    className,
    classes: classesProp,
    portfolioId,
    baseUrl = "",
    folderId,
    client,
    operations,
    onDoubleClick,
    onBreadcrumbClick,
    filetypes,
  } = props;
  const classes = useStyles();
  const history = useHistory();
  // const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [path, setPath] = useState<FileManagerBreadcrumbLink[]>([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [
    selectedElement,
    setSelectedElement,
  ] = useState<FileManagerFolderElement | null>(null);

  const handleSelectClick = (element: FileManagerFolderElement | null) => {
    if (!element) {
      setSelectedElement(null);
    }
    if (
      selectedElement &&
      element &&
      element.id === selectedElement.id &&
      element.__typename === selectedElement.__typename
    ) {
      setSelectedElement(null);
    } else {
      setSelectedElement(element);
    }
  };

  const handleActionClick = (action: string | null) => {
    dispatch({
      key: `open${action}Form`,
      value: true,
    });
  };

  const handleElementActionClick = (
    action: FileManagerElementAction,
    element: FileManagerFolderElement
  ) => {
    switch (action) {
      case "edit":
        dispatch({
          value: {
            editElement: element,
            [`open${element.__typename}Form`]: true,
          },
        });
        break;
      case "delete":
        let type = element.__typename || null;
        let label = type ? I18n.get.docs.label["the" + type].toLowerCase() : "";
        let description =
          I18n.trans(I18n.get.messages.deleteElement, {
            element: `${label} <b>"${element.title}"</b>`,
          }) +
          " " +
          `<br /><i>${I18n.get.messages.actionCantBeUndone}</i>`;
        confirm({
          description: parse(description),
        }).then(async () => {
          let variables = {
            id: element.id,
          };
          switch (element.__typename) {
            case "Portfolio":
              await deletePortfolio({
                variables,
              });
              break;
            case "Folder":
              await deleteFolder({
                variables,
              });
              break;
            case "File":
              await deleteFile({
                variables,
              });
              break;
          }
          if (refetch) {
            refetch();
          }
        });

        break;
      case "download":
        VoDocs.downloadFile(element.id);
        break;
    }
  };

  const handleDoubleClick = (
    url: string,
    element: FileManagerFolderElement
  ) => {
    if (onDoubleClick) {
      onDoubleClick(element);
    } else if (element.__typename !== "File") {
      history.push(url);
    }
  };

  const handleFormChange = (element: FileManagerFolderElement) => {
    closeForm(`open${element.__typename}Form`);
    if (refetch) {
      refetch();
    }
  };

  const getActions = (): FileManagerActionName[] => {
    return portfolioId || folderId ? ["Folder", "File"] : ["Portfolio"];
  };

  const getModel = (model: string) => {
    if (
      !queryData ||
      !queryData[operations.category] ||
      !queryData[operations.category][model]
    ) {
      return null;
    }
    return queryData[operations.category][model];
  };

  const closeForm = (form: string) => {
    dispatch({
      value: {
        editElement: null,
        [form]: false,
      },
    });
  };

  const isLoading = () => {
    return (
      queryLoading ||
      deletePortfolioLoading ||
      deleteFolderLoading ||
      deleteFileLoading
    );
  };

  const handleHeaderChange = (
    search: string,
    order: string,
    orderBy: string
  ) => {
    dispatch({
      value: {
        search,
        order,
        orderBy,
      },
    });
  };

  const hasData = () => {
    return (
      queryData &&
      queryData[operations.category] &&
      queryData[operations.category].data.length > 0
    );
  };

  // Api.

  const [deletePortfolio, { loading: deletePortfolioLoading }] = useMutation(
    operations?.deletePortfolio || fakeMutation
  );
  const [deleteFolder, { loading: deleteFolderLoading }] = useMutation(
    operations?.deleteFolder || fakeMutation
  );
  const [deleteFile, { loading: deleteFileLoading }] = useMutation(
    operations?.deleteFile || fakeMutation
  );
  const [
    loadData,
    {
      data: queryData,
      loading: queryLoading,
      error: queryError,
      called: queryCalled,
      refetch,
    },
  ] = useLazyQuery(operations.get, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    client: client || undefined,
    variables: {
      portfolio_id: portfolioId,
      folder_id: folderId,
      filetypes: filetypes,
      // page: state.page,
      // limit: state.limit,
      // search: state.search,
      orderBy: [
        {
          // column: state.orderBy,
          // order: state.order,
          column: "TITLE",
          order: "ASC",
        },
      ],
    },
  });

  // Effects.

  useEffect(() => {
    if (!queryCalled) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedElement(null);
    if (queryData && queryData[operations.category]?.folder) {
      let currentPath: FileManagerBreadcrumbLink[] = [];
      if (queryData[operations.category].folder.fullPath.length > 0) {
        currentPath = currentPath.concat(
          queryData[operations.category].folder.fullPath
        );
      }
      currentPath.push({
        id: null,
        title: queryData[operations.category].folder.title,
      });
      setPath(currentPath);
    } else {
      setPath([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  if (queryError) {
    // enqueueSnackbar(queryError.message, {
    //   variant: "error",
    //   persist: true,
    // });
    toast.error(queryError.message, { autoClose: false });
  }

  return (
    <div className={clsx(classes.root, className)}>
      <Slide direction="down" in={!isLoading()} mountOnEnter unmountOnExit>
        <Toolbar className={clsx(classes.toolbar, classesProp?.toolbar)}>
          <FileManagerBreadcrumbs
            loading={queryLoading}
            baseUrl={baseUrl}
            items={queryData}
            category={operations.category}
            path={path}
            onClick={onBreadcrumbClick}
          />
        </Toolbar>
      </Slide>
      {isLoading() && (
        <div className={classes.loaderWrapper}>
          <CircularProgress color="primary" />
        </div>
      )}
      {!isLoading() && queryData && (
        <div className={classes.contentWrapper}>
          {hasData() && (
            <FileManagerHeader
              className={classes.header}
              onChange={handleHeaderChange}
            />
          )}
          <FileManagerGrid
            items={queryData}
            category={operations.category}
            onSelect={handleSelectClick}
            onAction={handleElementActionClick}
            onDoubleClick={handleDoubleClick}
            selectedElement={selectedElement}
            baseUrl={baseUrl}
            search={state.search}
            order={state.order}
            orderBy={state.orderBy}
          />
          <FileManagerActions
            actions={getActions()}
            onClick={handleActionClick}
            className={clsx(classes.actions, classesProp?.actions, {
              [classes.actionsWithBottomArea]: selectedElement,
            })}
          />
          <Slide
            direction="up"
            in={!!selectedElement}
            mountOnEnter
            unmountOnExit
          >
            <FileManagerBottomArea
              className={clsx(classes.bottomArea, classesProp?.bottomArea)}
              selectedElement={selectedElement}
            />
          </Slide>
          <FileManagerPortfolioForm
            operations={{
              create: operations?.createPortfolio,
              update: operations?.updatePortfolio,
            }}
            onChange={handleFormChange}
            onCancel={() => closeForm("openPortfolioForm")}
            open={state.openPortfolioForm}
            client={client}
            editElement={state.editElement}
          />
          <FileManagerFolderForm
            portfolio={getModel("portfolio")}
            folder={getModel("folder")}
            operations={{
              create: operations?.createFolder,
              update: operations?.updateFolder,
            }}
            onChange={handleFormChange}
            onCancel={() => closeForm("openFolderForm")}
            open={state.openFolderForm}
            client={client}
            editElement={state.editElement}
          />
          <FileManagerFileForm
            portfolio={getModel("portfolio")}
            folder={getModel("folder")}
            operations={{
              create: operations?.createFile,
              update: operations?.updateFile,
            }}
            onChange={handleFormChange}
            onCancel={() => closeForm("openFileForm")}
            open={state.openFileForm}
            client={client}
            editElement={state.editElement}
          />
        </div>
      )}
    </div>
  );
};

export default FileManager;
