"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";

import SchedulingTab from "./SchedulingTab";
import SavedOnesTab from "./SavedTab";
import DraftsTab from "./DraftsTab";
import AlreadySharedTab from "./SharedTab";

const PressRelease = () => {
  const [value, setValue] = useState<string>("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Card
        variant="outlined"
        sx={{ maxWidth: 1200, mx: "auto", p: 3, boxShadow: 3 }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            Press Release
          </Typography>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TabList
                  onChange={handleTabChange}
                  aria-label="Press Release Tabs"
                >
                  <Tab label="Scheduling" value="1" />
                  <Tab label="Saved Ones" value="2" />
                  <Tab label="Drafts" value="3" />
                  <Tab label="Already Shared" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <SchedulingTab />
              </TabPanel>
              <TabPanel value="2">
                <SavedOnesTab />
              </TabPanel>
              <TabPanel value="3">
                <DraftsTab />
              </TabPanel>
              <TabPanel value="4">
                <AlreadySharedTab />
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PressRelease;
