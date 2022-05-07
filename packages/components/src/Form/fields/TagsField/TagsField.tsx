import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

// Custom.
import { TagsFieldProps, TagsFieldItem } from "../../global";
import { useStyles } from "./styles";
import { useStyles as useStylesForm } from "../../styles";
import EntityPicker from "../EntityPicker";
import { createSlug2 } from "@vocollege/app";

const TagsField: React.FC<TagsFieldProps> = (props) => {
  const classes = useStyles();
  const classesForm = useStylesForm();
  const {
    label,
    value,
    required,
    onChange,
    dialog = { open: false, types: [] },
  } = props;
  const [itemsData, setItemsData] = React.useState<TagsFieldItem[]>([]);

  // Methods.

  const handleSelect = (item: TagsFieldItem) => {
    let newItems = itemsData.concat([item]);
    setItemsData(newItems);
    if (onChange) {
      onChange(newItems);
    }
  };

  const handleDelete = (item: TagsFieldItem) => {
    let newItems = itemsData.filter((v) => v.id !== item.id);
    setItemsData(newItems);
    if (onChange) {
      onChange(newItems);
    }
  };

  const isNew = (item: TagsFieldItem) => {
    return item.id.indexOf("new_") > -1;
  };

  // Effects.

  useEffect(() => {
    if (value) {
      setItemsData(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={classesForm.fieldRoot}>
      <div className={classesForm.fieldHead}>
        {label && (
          <Typography
            variant="subtitle1"
            component="label"
            className={classesForm.fieldHeadLabel}
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
        <div className={classesForm.fieldHeadActions}>
          <EntityPicker
            className={classesForm.fieldHeadButton}
            dialog={{
              ...dialog,
              onSelect: (item) =>
                handleSelect({
                  id: item.id,
                  label: item.title,
                  slug: createSlug2(item.title),
                }),
              // types: types,
              // addNew: addNew,
              // open: false,
            }}
          />
        </div>
      </div>
      {itemsData.length > 0 && (
        <div className={classes.items}>
          {itemsData.map((item: TagsFieldItem) => (
            <Chip
              key={item.id}
              className={classes.item}
              label={item.label}
              color="secondary"
              variant={isNew(item) ? "filled" : "outlined"}
              onDelete={() => handleDelete(item)}
              classes={{ outlinedSecondary: classes.chipOutlinedSecondary }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsField;
