import React, { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
  DraggableProvided,
  DraggableStateSnapshot,
  // SensorAPI,
  // PreDragActions,
} from "react-beautiful-dnd";
import clsx from "clsx";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
// import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";

// Custom.
import { useStyles } from "./styles";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import {
  FormFieldContentListItem,
  FormFieldTransferListProps,
} from "../../global";
import { reorder } from "../ContentList";

interface ListObject {
  [key: string]: any;
}

const move = (
  source: any,
  destination: any,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result: ListObject = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const TransferList: React.FC<FormFieldTransferListProps> = (props) => {
  const {
    name,
    label,
    sourceLabel,
    targetLabel,
    source,
    target,
    renderItemTitle,
    renderItemDetails,
    onChange,
  } = props;
  const classes = useStyles();

  const [lists, setLists] = useState<ListObject>({
    source: [],
    target: [],
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list.
    if (!destination) {
      return;
    }

    // Do not allow order change on the source list.
    if (
      source.droppableId === "source" &&
      destination.droppableId === "source"
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        lists[source.droppableId],
        source.index,
        destination.index
      );
      if (source.droppableId === "target") {
        setLists({ ...lists, target: items });
      }
      callOnChange(items);
    } else {
      const newResult = move(
        lists[source.droppableId],
        lists[destination.droppableId],
        source,
        destination
      );
      setLists({
        source: newResult.source,
        target: newResult.target,
      });
      callOnChange(newResult.target);
    }
  };

  const getTitle = (item: FormFieldContentListItem) => {
    return renderItemTitle ? renderItemTitle(item) : item.title;
  };

  const getDetails = (item: FormFieldContentListItem) => {
    if (renderItemDetails) {
      return renderItemDetails(item);
    }
    let type = getType(item);
    let typeString =
      type && I18n.get[type]?.label ? I18n.get[type]?.label : item.type;
    return (
      <>
        <span className={classes.rowItemDetailsLabel}>{I18n.get.misc.id}:</span>
        <span className={classes.rowItemDetailsValue}>{item.id}</span>
        <span className={classes.rowItemDetailsLabel}>
          {I18n.get.misc.type}:
        </span>
        <span className={classes.rowItemDetailsValue}>{typeString}</span>
      </>
    );
  };

  const getType = (item: FormFieldContentListItem) => {
    return item.type?.toLowerCase();
  };

  // const removeItem = (item: FormFieldContentListItem) => {
  // };

  const getItem = (
    droppableId: string,
    item: FormFieldContentListItem,
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
  ) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={clsx(classes.item, {
          [classes.itemDragging]: snapshot.isDragging,
          [classes.itemSelected]: droppableId === "target",
        })}
      >
        <div className={classes.row}>
          <div className={classes.rowDragArea}>
            <DragIndicatorIcon />
          </div>
          <div className={classes.rowTitle}>
            <Typography
              variant="subtitle1"
              className={clsx(classes.rowItemTitle, classes.textNoWrap)}
            >
              {getTitle(item)}
            </Typography>
            <div className={clsx(classes.rowItemDetails, classes.textNoWrap)}>
              {getDetails(item)}
            </div>
          </div>
          {/* {droppableId === "target" && (
            <div className={classes.rowActions}>
              <IconButton
                color="inherit"
                aria-label="delete"
                onClick={() => removeItem(item)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )} */}
        </div>
      </div>
    );
  };

  const callOnChange = (items: FormFieldContentListItem[]) => {
    if (onChange) {
      onChange(items);
    }
  };

  // Effects.

  useEffect(() => {
    const result = {
      source: Array.from(lists.source),
      target: Array.from(lists.target),
    };
    if (target && target.length > 0) {
      result.target = target;
    }
    if (source && source.length > 0) {
      if (result.target.length === 0) {
        result.source = source;
      } else {
        result.source = source.filter((v: any) => {
          let items = result.target.filter((v2: any) => v.id === v2.id);
          return items.length === 0;
        });
      }
    }
    setLists(result);
  }, [source, target]);

  return (
    <div className={classes.root}>
      {label && (
        <Typography variant="h5" component="label" className={classes.label}>
          {label}
        </Typography>
      )}
      {(lists.source || lists.target) && (
        <div className={classes.lists}>
          {/* <DragDropContext onDragEnd={onDragEnd} sensors={[useMyCoolSensor]}> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={classes.list}>
              {sourceLabel && (
                <Typography
                  variant="subtitle1"
                  component="label"
                  className={classes.listLabel}
                >
                  {sourceLabel}
                </Typography>
              )}
              <Droppable droppableId="source">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={clsx(classes.listContent, {
                      [classes.listContentDragging]: snapshot.isDraggingOver,
                    })}
                  >
                    {lists.source &&
                      lists.source.map((item: any, index: any) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) =>
                            getItem("source", item, provided, snapshot)
                          }
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div className={classes.list}>
              {targetLabel && (
                <Typography
                  variant="subtitle1"
                  component="label"
                  className={classes.listLabel}
                >
                  {targetLabel}
                </Typography>
              )}
              <Droppable droppableId="target">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={clsx(classes.listContent, {
                      [classes.listContentDragging]: snapshot.isDraggingOver,
                    })}
                  >
                    {lists.target &&
                      lists.target.map((item: any, index: any) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) =>
                            getItem("target", item, provided, snapshot)
                          }
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default TransferList;
