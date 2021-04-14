// Vendors.
import React from "react";
import SwipeableViews from "react-swipeable-views";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";

// Custom.
import { FormViewsProps, TabPanelProps } from "./global.d";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const FormSwipeableViews = ({
  children,
  currentTab,
  setTab,
}: FormViewsProps) => {
  const theme = useTheme();
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };

  return (
    <SwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      index={currentTab}
      onChangeIndex={handleChangeIndex}
    >
      {children?.map((child, key) => (
        <TabPanel
          value={currentTab}
          key={key}
          index={key}
          dir={theme.direction}
        >
          {child}
        </TabPanel>
      ))}
    </SwipeableViews>
  );
};

export default FormSwipeableViews;
