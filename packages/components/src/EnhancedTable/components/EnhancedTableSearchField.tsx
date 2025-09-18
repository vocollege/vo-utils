import React, { useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Custom.
import { EnhancedTableSearchFieldProps } from "../global";
import VoTextField from "@/VoTextField";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

let typingTimer: number;

const EnhancedTableSearchField: React.FC<EnhancedTableSearchFieldProps> = (
  props
) => {
  const { label, searchLoading, onSearchTermChange } = props;
  const [searchTerm, setSearchTerm] = useState("");

  // Methods.

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    clearTimeout(typingTimer);
    if (onSearchTermChange && value && value !== "" && value.length > 2) {
      typingTimer = window.setTimeout(async () => {
        onSearchTermChange(value);
      }, 300);
    } else if (value === "") {
      typingTimer = window.setTimeout(async () => {
        clearSearch();
      }, 300);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearchTermChange && onSearchTermChange("");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <VoTextField
        label={label || I18n.get.form.labels.searchField}
        variant="filled"
        size="small"
        type="text"
        onChange={handleSearch}
        value={searchTerm}
        inputProps={{
          autoComplete: "off",
        }}
        sx={(theme) => ({
          zIndex: 0,
          "& .MuiFilledInput-input": {
            paddingRight: 7,
            transition: theme.transitions.create("width"),
            width: "6ch",
            "&:focus": {
              width: "12ch",
            },
          },
        })}
      />

      {searchTerm !== "" && (
        <IconButton
          aria-label="clear search field"
          onClick={() => clearSearch()}
          size="medium"
          sx={{
            position: "absolute",
            right: 2,
            top: 5,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      {searchLoading && searchTerm !== "" && (
        <LinearProgress
          color="secondary"
          sx={{
            bottom: 3.5,
            left: 6,
            position: "absolute",
            right: 6,
            zIndex: 3,
          }}
        />
      )}
    </Box>
  );
};

export default EnhancedTableSearchField;
