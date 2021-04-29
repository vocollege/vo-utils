// Vendors.
import React from "react";
import { useTheme } from "@material-ui/core/styles";

// Custom.
import { FormViewsProps, TabPanelProps } from "./global";

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
      {/* {value === index && <div>{children}</div>} */}
      <div>{children}</div>
    </div>
  );
}

const FormViews = ({ children, currentTab }: FormViewsProps) => {
  const theme = useTheme();
  return (
    <>
      {children?.map((child: any, key: number) => (
        <TabPanel
          value={currentTab}
          key={key}
          index={key}
          dir={theme.direction}
        >
          {child}
        </TabPanel>
      ))}
    </>
  );
};

export default FormViews;
