"use client";
import React from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { TabItem } from "../../styles/pressRelease.style";

export default function TabsTwitter() {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <Tabs
      textColor="inherit"
      value={tabIndex}
      onChange={(e, index) => setTabIndex(index)}
      sx={{
        width: "100%",
        boxShadow: "inset 0 -1px 0 0 #E6ECF0",
        [`& .${tabsClasses.indicator}`]: {
          backgroundColor: "#1da1f2",
        },
      }}
    >
      <TabItem disableRipple label={"In Progress"} />
      <TabItem disableRipple label={"Completed"} />
      <TabItem disableRipple label={"Drafts"} />
      <TabItem disableRipple label={"Scheduled Posts"} />
    </Tabs>
  );
}