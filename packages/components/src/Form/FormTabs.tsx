import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import clsx from "clsx";
import Badge from "@mui/material/Badge";

import { FormTabProps, FormTabsProps } from "./global";
import { useStyles } from "./styles";

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const FormTabs = ({ className, tabs, currentTab, setTab }: FormTabsProps) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const getLabel = (tab: FormTabProps) => {
    if (tab.badge) {
      return <Badge {...tab.badge}>{tab.label}</Badge>;
    }
    return tab.label;
  };

  return (
    <Tabs
      className={clsx(classes.formTabs, className)}
      value={currentTab}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      aria-label="tabs"
      variant="scrollable"
    >
      {tabs.map((tab: FormTabProps, key: number) => {
        if (tab.visible !== undefined && !tab.visible) {
          return (
            <Tab
              key={tab.key}
              disabled
              sx={(theme: any) => ({
                display: "None",
              })}
            ></Tab>
          );
        }
        return <Tab key={tab.key} label={getLabel(tab)} {...a11yProps(key)} />;
      })}
    </Tabs>
  );
};

export default FormTabs;
