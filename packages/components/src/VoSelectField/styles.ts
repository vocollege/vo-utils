import { Theme, alpha } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      "& .MuiFilledInput-root": {
        backgroundColor: "transparent",
      },
      "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": {
        display: "none",
      },
    },
    fullWidth: {
      width: "100%",
    },
    error: {
      // "& $root": {
      "& $select": {
        borderColor: theme.palette.error.dark,
      },
      "& $select:focus": {
        boxShadow: `${alpha(theme.palette.error.dark, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.error.dark,
      },
    },
    // root: {
    //   border: "1px solid #e2e2e1",
    //   overflow: "hidden",
    //   borderRadius: theme.spacing(1),
    //   backgroundColor: "#fcfcfb",
    //   outline: "none",
    //   transition: theme.transitions.create(["border-color", "box-shadow"]),
    //   "&:hover": {
    //     backgroundColor: "#ffffff",
    //   },
    // },
    select: {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: theme.spacing(1),
      backgroundColor: "#fcfcfb",
      outline: "none",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "#ffffff",
      },

      "&:focus": {
        backgroundColor: "#fff",
        borderRadius: theme.spacing(1),
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
);
