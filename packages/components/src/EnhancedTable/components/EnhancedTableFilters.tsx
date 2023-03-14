import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SelectChangeEvent } from "@mui/material/Select";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";

// Custom.
import VoSelectField from "@/VoSelectField";
import {
  EnhancedTableFiltersProps,
  EnhancedTableFilter,
  EnhancedTableSelectedFilter,
  EnhancedTableFilterValue,
} from "../global";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { GeneralObject } from "@vocollege/app/dist/global";
import { getValue } from "@mui/system";

const EnhancedTableFilters: React.FC<EnhancedTableFiltersProps> = (props) => {
  const { filters, onChange } = props;
  const [selectedFilters, setSelectedFilters] = useState<
    EnhancedTableSelectedFilter[]
  >([]);
  const [filtersChanged, setFiltersChanged] = useState(false);

  // Methods.

  const handleChange =
    (filter: EnhancedTableFilter) => (event: SelectChangeEvent) => {
      const { name, value } = event.target;
      let newValue: string | string[] = [...value];
      if (filter.multiple) {
        if (newValue.length > 1) {
          let allIndex = newValue.indexOf("all");
          if (allIndex === newValue.length - 1) {
            newValue = filter.default;
          } else if (allIndex > -1) {
            let i = newValue.indexOf("all");
            newValue.splice(i, 1);
          }
        } else if (newValue.length === 0) {
          newValue = filter.default;
        }
      } else {
        newValue = [value];
      }

      let newSelectedFilters = [...selectedFilters];
      let i = newSelectedFilters.findIndex(
        (v: EnhancedTableFilter) => v.name === name
      );
      if (i > -1) {
        newSelectedFilters[i] = { name, value: newValue as string | string[] };
      } else {
        newSelectedFilters.push({ name, value: newValue as string | string[] });
      }
      setSelectedFilters(newSelectedFilters);
      setFiltersChanged(true);
    };

  const applyFilters = () => {
    if (!onChange) {
      return;
    }
    setFiltersChanged(false);
    onChange(
      selectedFilters.filter(
        (v: GeneralObject) =>
          v.value.filter((v: string) => v !== "all").length > 0
      )
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setFiltersChanged(false);
    onChange([]);
  };

  const getValue = (filter: EnhancedTableFilter) => {
    let selectedFilter = selectedFilters.find(
      (v: EnhancedTableSelectedFilter) => v.name === filter.name
    );
    return selectedFilter ? selectedFilter.value : filter?.default;
  };

  const applyButtonIsDisabled = () => {
    return selectedFilters.length === 0 ? true : !filtersChanged;
  };

  const getFilterValue = (value: any, filter: EnhancedTableFilter) => {
    let values: string[] = [];
    if (!filter.multiple) {
      let i = filter.values.find((v: EnhancedTableFilterValue) => {
        return v.value === value[0];
      });

      if (i) {
        values.push(i.label || "");
      }
    } else {
      value.map((filterValue: any) => {
        let i = filter.values.find(
          (v: EnhancedTableFilterValue) => v.value === filterValue
        );
        if (i) {
          values.push(i.label);
        }
      });
    }
    return <ListItemText primary={values.join(" | ")} />;
  };

  return (
    <Box sx={{ alignItems: "center", display: "flex" }}>
      {filters.map((filter: EnhancedTableFilter) => (
        <Box key={filter.name} sx={{ marginRight: 1 }}>
          <VoSelectField
            name={filter.name}
            label={filter.label}
            availableValues={filter.values}
            SelectProps={{
              name: filter.name,
              value: getValue(filter),
              onChange: handleChange(filter),
              size: "small",
              multiple: filter.multiple,
              renderValue: (value: any) => getFilterValue(value, filter),
            }}
          />
        </Box>
      ))}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        color="secondary"
        disableElevation
      >
        <Button
          size="small"
          // color="secondary"
          onClick={() => applyFilters()}
          disabled={applyButtonIsDisabled()}
          // sx={{ ml: 0.5 }}
          startIcon={<FilterAltIcon />}
        >
          {I18n.get.actions.apply}
        </Button>
        {/* {selectedFilters.length > 0 && ( */}
        <Button
          size="small"
          // color="secondary"
          onClick={() => clearFilters()}
          // sx={{ marginLeft: 1 }}
          // startIcon={<ClearIcon />}
          disabled={selectedFilters.length === 0}
          title={I18n.get.actions.reset}
        >
          <ClearIcon />
        </Button>
        {/* )} */}
      </ButtonGroup>
    </Box>
  );
};

export default EnhancedTableFilters;
