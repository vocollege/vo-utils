// Vendors.
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Custom.
import { useStylesCommon } from "ui/styles/common";
import { useStyles } from "./styles";
import FormTabs from "./FormTabs";
import FormViews from "./FormViews";
import { FormNakedProps, FormTabProps } from "./global";

const Form: React.FC<FormNakedProps> = (props) => {
  const { tabs } = props;
  useStylesCommon();
  const classes = useStyles();
  const [currentTab, setTab] = useState(0);
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <Paper elevation={1} className="vo-global__content-with-toolbar">
          <Grid container spacing={4}>
            {tabs.length > 1 && (
              <Grid item xs={12}>
                <FormTabs
                  tabs={tabs}
                  currentTab={currentTab}
                  setTab={setTab}
                ></FormTabs>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormViews currentTab={currentTab} setTab={setTab}>
                {tabs.map((tab: FormTabProps, index: number) => {
                  return <Box key={index}>{tab?.children}</Box>;
                })}
              </FormViews>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default Form;
