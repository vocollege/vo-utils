import React, { useEffect, useState } from "react";
import clsx from "clsx";
import SortableTreeLib, {
  removeNodeAtPath,
  getTreeFromFlatData,
  // ExtendedNodeData,
  TreeItem,
  changeNodeAtPath,
  getFlatDataFromTree,
  // NodeData,
  // FullTree,
  // OnMovePreviousAndNextLocation,
} from "@nosferatu500/react-sortable-tree";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import makeStyles from "@mui/styles/makeStyles";

// Custom.
import {
  FormFieldSortableTreeProps,
  FormFieldSortableTreeItem,
  FormFieldNumberOrStringArray,
  FormFieldSortableTreeItemFormProps,
} from "../../global";
import { useStyles } from "./styles";
import { stylesActions } from "@vocollege/theme";
import FloatingButton from "@/FloatingButton";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import SortableTreeItemForm from "./SortableTreeItemForm";
import { stylesCommon } from "@vocollege/theme";
import { getTemporaryId } from "@vocollege/app";

const useStylesCommon = makeStyles(() => stylesCommon);
const useStylesActions = makeStyles(() => stylesActions);

const orderByPosition = (a: any, b: any) => {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
};

const getSubtitle = (item: any) => {
  if (!item.urlAlias) {
    return "";
  }
  let subtitle = [];
  if (item.urlAlias.usage_type) {
    subtitle.push(item.urlAlias.usage_type);
  }
  if (item.urlAlias.usage_id) {
    subtitle.push(item.urlAlias.usage_id);
  }
  if (item.urlAlias.alias) {
    subtitle.push(item.urlAlias.alias);
  }
  return subtitle.join(" | ");
};

const SortableTree: React.FC<FormFieldSortableTreeProps> = (props) => {
  const {
    items,
    // types,
    onChange,
    onReset,
    dialog = {
      types: [],
    },
  } = props;
  const classes = useStyles();
  useStylesActions();
  useStylesCommon();
  const [item, setItem] = useState<TreeItem | null | undefined>(null);
  const [itemPath, setItemPath] = useState<number[] | null | undefined>(null);
  // const [itemPath, setItemPath] = useState<
  //   FormFieldNumberOrStringArray | null | undefined
  // >(null);
  const [isChanged, setIsChanged] = useState(false);
  const [treeData, setTreeData] = useState<any>([]);
  const [openSortableTreeItemForm, setOpenSortableTreeItemForm] =
    useState(false);

  // Methods.

  const getNodeKey = ({ treeIndex }: any) => treeIndex;

  const callOnChange = (newTreeData: TreeItem[]) => {
    setIsChanged(true);
    if (onChange) {
      let flatData = getFlatDataFromTree({
        treeData: newTreeData.map((v: any, i: number) => {
          v.position = i;
          return v;
        }),
        getNodeKey: ({ node }) => node.id,
        ignoreCollapsed: false,
      }).map(({ node }, i: number) => {
        let newNode = { ...node };
        delete newNode.path;
        delete newNode.subtitle;
        delete newNode.children;
        delete newNode.expanded;
        newNode.position = i;
        newNode.parent_id =
          newNode.parent_id === "0" ? null : newNode.parent_id;
        return newNode;
      });
      onChange(flatData);
    }
  };

  // const editItem = (node: TreeItem, path: FormFieldNumberOrStringArray) => {
  const editItem = (node: TreeItem, path: number[]) => {
    setItem(node);
    setItemPath(path);
    setOpenSortableTreeItemForm(true);
  };

  // const removeItem = (path: FormFieldNumberOrStringArray) => {
  const removeItem = (path: number[]) => {
    let newTreeData = removeNodeAtPath({
      treeData,
      path,
      getNodeKey,
    });
    setTreeData(newTreeData);
    callOnChange(newTreeData);
  };

  const handleCreateItem = () => {
    setItem(null);
    setItemPath([]);
    setOpenSortableTreeItemForm(true);
  };

  const handleItemFormChange = (
    item: FormFieldSortableTreeItem,
    path: FormFieldSortableTreeItemFormProps["itemPath"]
  ) => {
    let newItem = { ...item };
    newItem.subtitle = getSubtitle(item);
    let newTreeData = [];
    if (newItem.id !== "0") {
      newTreeData = changeNodeAtPath({
        treeData,
        path: path || [],
        // path: path && typeof path === "number" ? path : [],
        getNodeKey,
        newNode: { ...newItem },
      });
      setTreeData(newTreeData);
    } else {
      newItem.id = getTemporaryId();
      newTreeData = [newItem].concat(treeData);
      setTreeData(newTreeData);
    }
    setOpenSortableTreeItemForm(false);
    callOnChange(newTreeData);
  };

  const handleOnMove = (
    // data: NodeData & FullTree & OnMovePreviousAndNextLocation
    data: any
  ) => {
    data.node.parent_id = data?.nextParentNode?.id;
    let newTreeData = changeNodeAtPath({
      treeData: data.treeData,
      path: data.path,
      getNodeKey,
      newNode: { ...data.node },
    });
    callOnChange(newTreeData);
  };

  const resetList = () => {
    setIsChanged(false);
    if (onReset && items) {
      onReset();
    }
  };

  // const getNodeProps = (data: ExtendedNodeData) => {
  const getNodeProps = (data: any) => {
    const { path, node } = data;
    return {
      buttons: [
        <IconButton
          color="inherit"
          aria-label="edit"
          size="small"
          onClick={() => editItem(node, path)}
        >
          <EditIcon />
        </IconButton>,
        <IconButton
          color="inherit"
          aria-label="remove"
          size="small"
          onClick={() => removeItem(path)}
        >
          <DeleteIcon />
        </IconButton>,
      ],
      className: clsx(classes.treeNode, {
        [classes.treeNodeChanged]: node.id === 0,
      }),
    };
  };

  // Effects.

  useEffect(() => {
    if (items && items.length > 0) {
      setTreeData(
        getTreeFromFlatData({
          flatData: [...items].sort(orderByPosition).map((node) => ({
            ...node,
            subtitle: getSubtitle(node),
            expanded: true,
            parent_id: node.parent_id || "0",
          })),
          getKey: (node: any) => node.id, // resolve a node's key
          getParentKey: (node: any) => node.parent_id, // resolve a node's parent's key
          rootKey: "0", // The value of the parent key when there is no parent (i.e., at root level)
        })
      );
    }
  }, [items]);

  return (
    <div className={classes.root}>
      <div className={classes.treeWrapper}>
        {isChanged && (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<RotateLeftIcon />}
            onClick={() => resetList()}
            className={classes.resetButton}
          >
            {I18n.get.actions.reset}
          </Button>
        )}
        {treeData.length === 0 && (
          <div className="vo-global__nothing-found">
            <span>{I18n.get.misc.nothingFound}</span>
          </div>
        )}
        {treeData.length > 0 && (
          <SortableTreeLib
            treeData={treeData}
            onChange={(treeData) => {
              setTreeData(treeData);
            }}
            generateNodeProps={(data) => getNodeProps(data)}
            onMoveNode={handleOnMove}
            // isVirtualized={false}
          />
        )}
      </div>
      <FloatingButton
        className="vo-global__actions-floating-button"
        label={I18n.get.menu.labels.createLink}
        onClick={() => handleCreateItem()}
      >
        <AddIcon />
      </FloatingButton>
      <SortableTreeItemForm
        open={openSortableTreeItemForm}
        // types={types}
        onChange={handleItemFormChange}
        onCancel={() => setOpenSortableTreeItemForm(false)}
        item={item}
        itemPath={itemPath}
        dialog={dialog}
      />
    </div>
  );
};

export default SortableTree;
