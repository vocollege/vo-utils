import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteIcon from "@material-ui/icons/Delete";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useSnackbar } from "notistack";

// Custom.
import {
  FormFieldHierarchicalListProps,
  FormFieldHierarchicalListItem,
} from "../../global";
import { useStyles } from "./styles";
import { useStyles as useStylesContentList } from "../ContentList/styles";

const getItems = (items: any, children: any = []) => {
  if (children.length === 0) {
    children = items.filter((v: any) => v.parent_id === "0");
  }
  let newItems: any = [];
  children.forEach((v: any) => {
    let newItem = { ...v };
    let children = items.filter((v: any) => v.parent_id === newItem.id);
    if (children.length > 0) {
      newItem.children = getItems(items, children);
    }
    newItems.push(newItem);
  });
  return newItems;
};

const HierarchicalList: React.FC<FormFieldHierarchicalListProps> = (props) => {
  const { items } = props;
  const classes = useStyles();
  const classesContentList = useStylesContentList();
  const [draggableItems, setDraggableItems] = useState<
    FormFieldHierarchicalListItem[] | undefined
  >([]);

  // Methods.

  const onDragEnd = (result: any) => {};

  const addItem = (item: any, remove = false) => {};

  const getDraggableItem = (item: any, index: number) => {
    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided: any, snapshot: any) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            className={classes.rowWrapper}
          >
            <div
              className={clsx(classes.item, {
                [classesContentList.itemDragging]: snapshot.isDragging,
              })}
            >
              <div className={classesContentList.row}>
                <div className={classesContentList.rowDragArea}>
                  <DragIndicatorIcon />
                </div>
                <div className={classesContentList.rowTitle}>
                  <Typography
                    variant="subtitle1"
                    className={clsx(
                      classesContentList.rowItemTitle,
                      classesContentList.textNoWrap
                    )}
                  >
                    {item.id}
                  </Typography>
                  <div
                    className={clsx(
                      classesContentList.rowItemDetails,
                      classesContentList.textNoWrap
                    )}
                  >
                    DETAILS
                  </div>
                </div>
                <div className={classesContentList.rowActions}>
                  <IconButton
                    color="inherit"
                    aria-label="delete"
                    onClick={() => addItem(item, true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <Droppable droppableId="droppableItem">
              {(provided: any, snapshot: any) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={clsx(
                    classes.rowDropArea,
                    classesContentList.list,
                    {
                      [classesContentList.listDragging]:
                        snapshot.isDraggingOver,
                    }
                  )}
                >
                  {item.children &&
                    item.children.length > 0 &&
                    item.children.map((child: any, childIndex: any) =>
                      getDraggableItem(child, childIndex)
                    )}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  };

  // Effects.

  useEffect(() => {
    if (items) {
      setDraggableItems(getItems(items));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className={classesContentList.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any, snapshot: any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={clsx(classesContentList.list, {
                [classesContentList.listDragging]: snapshot.isDraggingOver,
              })}
            >
              {draggableItems &&
                draggableItems.map((item: any, index: any) =>
                  getDraggableItem(item, index)
                )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default HierarchicalList;
