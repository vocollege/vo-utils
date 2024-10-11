import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Custom.
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import {
  FormFieldContentListProps,
  FormFieldContentListItem,
} from "../../global";
import EntityPicker from "../EntityPicker";
import FileManagerPicker from "@/FileManager/Picker";
import { FileManagerFolderElement } from "@/FileManager/global";

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
  const [draggableItems, setDraggableItems] = useState<
    FormFieldContentListItem[] | undefined
  >([]);
  const [isChanged, setIsChanged] = useState(false);

  const textNoWrapSx = (theme: any) => {
    return {
      overflow: "hidden",
      textOverflow: "elipsis",
      whiteSpace: "nowrap",
    };
  };
  const rowItemDetailsLabelSx = (theme: any) => {
    return {
      fontWeight: theme.typography.fontWeightBold,
      marginRight: theme.spacing(1),
    };
  };

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
        <Box
          component="span"
          sx={(theme: any) => ({ ...rowItemDetailsLabelSx(theme) })}
        >
          {I18n.get.misc.id}:
        </Box>
        <Box
          component="span"
          sx={(theme: any) => ({ marginRight: theme.spacing(2) })}
        >
          {item.id}
        </Box>
        {typeString && typeString !== "" && (
          <>
            <Box
              component="span"
              sx={(theme: any) => ({ ...rowItemDetailsLabelSx(theme) })}
            >
              {I18n.get.misc.type}:
            </Box>
            <Box
              component="span"
              sx={(theme: any) => ({ marginRight: theme.spacing(2) })}
            >
              {typeString}
            </Box>
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
    <Box
      id={`contentlist-${name}`}
      sx={(theme: any) => ({
        border: `1px dotted ${theme.palette.grey[500]}`,
        borderRadius: 1,
        padding: theme.spacing(2),
        width: "100%",
      })}
    >
      <Box
        sx={(theme: any) => ({
          alignItems: "center",
          display: "flex",
          minHeight: theme.spacing(5),
        })}
      >
        {label && (
          <Typography
            variant="subtitle1"
            component="label"
            sx={(theme: any) => ({
              display: "block",
              flex: 1,
            })}
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
        <Stack direction="row" spacing={1}>
          {isChanged && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<RotateLeftIcon />}
              onClick={() => resetList()}
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
              dialog={{
                ...dialog,
                onSelect: handleSelect,
                open: false,
              }}
            />
          )}
          {contentType === "file" && (
            <FileManagerPicker
              onSelect={handleFileSelect}
              filetypes={dialog.types}
            />
          )}
        </Stack>
      </Box>
      {draggableItems?.length === 0 && (
        <Typography
          align="center"
          variant="subtitle1"
          sx={(theme: any) => ({ margin: `${theme.spacing(2)} 0 0` })}
        >
          {I18n.get.misc.nothingAdded}
        </Typography>
      )}
      {draggableItems && draggableItems?.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided: any, snapshot: any) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={(theme: any) => ({
                  border: "2px dashed transparent",
                  borderRadius: 1,
                  margin: `0 -${theme.spacing(1.25)} -${theme.spacing(1)}`,
                  padding: `${theme.spacing(2)} ${theme.spacing(1)} 0`,
                  ...(snapshot.isDraggingOver && {
                    borderColor: theme.palette.primary.main,
                  }),
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
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          sx={(theme: any) => ({
                            backgroundColor: theme.palette.grey[100],
                            border: `1px solid ${theme.palette.grey[200]}`,
                            borderRadius: 1,
                            margin: `0 0 ${theme.spacing(2)} 0`,
                            padding: theme.spacing(1),
                            userSelect: "none",
                            "&:last-child": {
                              marginBottom: theme.spacing(0.5),
                            },
                            ...(snapshot.isDragging && {
                              backgroundColor: theme.palette.primary.main,
                              borderColor: theme.palette.primary.main,
                              boxShadow: theme.shadows[20],
                              color: theme.palette.primary.contrastText,
                            }),
                          })}
                        >
                          <Box
                            sx={(theme: any) => ({
                              alignItems: "center",
                              display: "flex",
                              flexWrap: "wrap",
                            })}
                          >
                            <Box
                              sx={(theme: any) => ({
                                alignItems: "center",
                                display: "flex",
                                marginRight: theme.spacing(1),
                              })}
                            >
                              <DragIndicatorIcon />
                            </Box>
                            <Box
                              sx={(theme: any) => ({ flex: 1, minWidth: 0 })}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={(theme: any) => ({
                                  ...textNoWrapSx(theme),
                                })}
                              >
                                {getTitle(item)}
                              </Typography>
                              {!hideType && (
                                <Box
                                  sx={(theme: any) => ({
                                    ...textNoWrapSx(theme),
                                  })}
                                >
                                  {getDetails(item)}
                                </Box>
                              )}
                              {renderExtraDetails && (
                                <Box sx={(theme: any) => ({})}>
                                  {renderExtraDetails(item)}
                                </Box>
                              )}
                            </Box>
                            <Box
                              sx={(theme: any) => ({
                                marginLeft: theme.spacing(1),
                              })}
                            >
                              {renderActionButtons && renderActionButtons(item)}
                              <IconButton
                                color="inherit"
                                aria-label="delete"
                                onClick={() => addItem(item, true)}
                                size="large"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Box>
  );
};

export default ContentList;
