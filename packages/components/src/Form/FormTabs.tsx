import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import clsx from "clsx";

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
        return <Tab key={key} label={tab.label} {...a11yProps(key)} />;
      })}
    </Tabs>
  );
};

export default FormTabs;
