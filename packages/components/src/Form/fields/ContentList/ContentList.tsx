import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

// Custom.
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import {
  FormFieldContentListProps,
  FormFieldContentListItem,
} from "../../global";
import { useStyles } from "./styles";
import EntityPicker from "../EntityPicker";
import FileManagerPicker from "@/FileManager/Picker";
import { FileManagerFolderElement } from "@/FileManager/global";
import Form from "@/Form";

export const reorder = (
  list: any,
  startIndex: any,
  endIndex: any,
): FormFieldContentListItem[] => {
  let result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const ContentList: React.FC<FormFieldContentListProps> = (props) => {
  const {
    name,
    label,
    onChange,
    onReset,
    items,
    required,
    // types,
    multiple = true,
    contentType = "entity",
    dialog = {
      types: [],
    },
    renderItemTitle,
    createCallback,
    createCallbackLabel,
    overrideValue,
    renderActionButtons,
    hideType,
    renderExtraDetails,
  } = props;
  const classes = useStyles();
  const [draggableItems, setDraggableItems] = useState<
    FormFieldContentListItem[] | undefined
  >([]);
  const [isChanged, setIsChanged] = useState(false);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems: FormFieldContentListItem[] = reorder(
      draggableItems,
      result.source.index,
      result.destination.index,
    );
    setDraggableItems(reorderedItems);
    setIsChanged(true);
    callOnChange(reorderedItems);
  };

  const callOnChange = (items: FormFieldContentListItem[]) => {
    if (onChange) {
      onChange(items);
    }
  };

  const resetList = () => {
    setIsChanged(false);
    if (onReset && items) {
      onReset();
    }
  };

  const addItem = (item: FormFieldContentListItem, remove = false) => {
    let result: FormFieldContentListItem[] = [];
    if (draggableItems) {
      result = [...draggableItems];
    }
    let i = result.findIndex(
      (v: FormFieldContentListItem) => v.id === item.id && v.type === item.type,
    );
    if (i > -1 && !remove) {
      toast.error(I18n.get.misc.alreadyAdded);
      return;
    }
    if (remove) {
      result.splice(i, 1);
    } else {
      result.unshift(item);
    }
    setDraggableItems(result);
    setIsChanged(true);
    callOnChange(result);
  };

  const getType = (item: FormFieldContentListItem) => {
    return item.type?.toLowerCase();
  };

  const getDetails = (item: FormFieldContentListItem) => {
    let type = getType(item);
    let typeString =
      type && I18n.get[type]?.label ? I18n.get[type]?.label : item.type;
    return (
      <>
        <span className={classes.rowItemDetailsLabel}>{I18n.get.misc.id}:</span>
        <span className={classes.rowItemDetailsValue}>{item.id}</span>
        {typeString && typeString !== "" && (
          <>
            <span className={classes.rowItemDetailsLabel}>
              {I18n.get.misc.type}:
            </span>
            <span className={classes.rowItemDetailsValue}>{typeString}</span>
          </>
        )}
      </>
    );
  };

  const handleSelect = (item: FormFieldContentListItem) => {
    addItem(item);
  };

  const handleFileSelect = (items: FileManagerFolderElement[]) => {
    addItem(items[0]);
  };

  const getTitle = (item: FormFieldContentListItem) => {
    if (renderItemTitle) {
      return renderItemTitle(item);
    }
    let title = [];
    if (hideType) {
      title.push(item.id);
    }
    title.push(item.title);
    return title.join(" | ");
  };

  // Effects.

  useEffect(() => {
    if (items) {
      //console.log("@vocollege/components->ContentList->items:", items);
      setDraggableItems(
        items
          ?.filter((v: FormFieldContentListItem) => v)
          .map((v: FormFieldContentListItem) => {
            return v;
          }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (overrideValue) {
      let items = overrideValue
        ?.filter((v: FormFieldContentListItem) => v)
        .map((v: FormFieldContentListItem) => v);
      setDraggableItems(items);
      callOnChange(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrideValue]);

  return (
    <div id={`contentlist-${name}`} className={classes.root}>
      <div className={classes.head}>
        {label && (
          <Typography
            variant="subtitle1"
            component="label"
            className={classes.headLabel}
          >
            {label}
            {required && (
              <span
                aria-hidden="true"
                className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
              >
                *
              </span>
            )}
          </Typography>
        )}
        <div className={classes.headActions}>
          {isChanged && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<RotateLeftIcon />}
              onClick={() => resetList()}
              className={classes.headButton}
            >
              {I18n.get.actions.reset}
            </Button>
          )}

          {createCallback && (
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => createCallback()}
              size="small"
            >
              {createCallbackLabel || I18n.get.actions.create}
            </Button>
          )}

          {contentType === "entity" && (
            <EntityPicker
              className={classes.headButton}
              dialog={{
                ...dialog,
                onSelect: handleSelect,
                open: false,
              }}
            />
          )}
          {contentType === "file" && (
            <FileManagerPicker
              className={classes.headButton}
              onSelect={handleFileSelect}
              filetypes={dialog.types}
            />
          )}
        </div>
      </div>
      {draggableItems?.length === 0 && (
        <Typography
          align="center"
          variant="subtitle1"
          className={classes.nothingAdded}
        >
          {I18n.get.misc.nothingAdded}
        </Typography>
      )}
      {draggableItems && draggableItems?.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided: any, snapshot: any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={clsx(classes.list, {
                  [classes.listDragging]: snapshot.isDraggingOver,
                })}
              >
                {draggableItems &&
                  draggableItems.map((item: any, index: any) => (
                    <Draggable
                      key={`${item.type}-${item.id}`}
                      draggableId={`${getType(item)}-${item.id}`}
                      index={index}
                    >
                      {(provided: any, snapshot: any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={clsx(classes.item, {
                            [classes.itemDragging]: snapshot.isDragging,
                          })}
                        >
                          <div className={classes.row}>
                            <div className={classes.rowDragArea}>
                              <DragIndicatorIcon />
                            </div>
                            <div className={classes.rowTitle}>
                              <Typography
                                variant="subtitle1"
                                className={clsx(
                                  classes.rowItemTitle,
                                  classes.textNoWrap,
                                )}
                              >
                                {getTitle(item)}
                              </Typography>
                              {!hideType && (
                                <div
                                  className={clsx(
                                    classes.rowItemDetails,
                                    classes.textNoWrap,
                                  )}
                                >
                                  {getDetails(item)}
                                </div>
                              )}
                              {renderExtraDetails && (
                                <div
                                  className={clsx(classes.rowItemExtraDetails)}
                                >
                                  {renderExtraDetails(item)}
                                </div>
                              )}
                            </div>
                            <div className={classes.rowActions}>
                              {renderActionButtons && renderActionButtons(item)}
                              <IconButton
                                color="inherit"
                                aria-label="delete"
                                onClick={() => addItem(item, true)}
                                size="large"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default ContentList;
