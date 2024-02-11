"use client";
import React from "react";
import { BorderBox, TabItem, TabsNav } from "../../styles/pressRelease.style";
import SinglePRCampaign from "../../components/SinglePRCampaign";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";


export default function Context() {
  const [tabIndex, setTabIndex] = React.useState(0);
  return (
    <BorderBox>
      <Box sx={{ display: "flex", backgroundColor: "", padding: "10px" }}>
        <TabsNav
          textColor="inherit"
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
        >
          <TabItem disableRipple label={"In Progress"} />
          <TabItem disableRipple label={"Completed"} />
          <TabItem disableRipple label={"Drafts"} />
          <TabItem disableRipple label={"Scheduled Posts"} />
        </TabsNav>
        <Stack direction="row" spacing={4} sx={{ padding: "5px 20px" }}>
          <Button
            variant="contained"
            startIcon={<EditNoteIcon />}
            sx={{ width: "180px" }}
          >
            Create Event
          </Button>
          <Button
            variant="contained"
            startIcon={<ScheduleIcon />}
            sx={{ width: "190px" }}
          >
            Post Scheduling
          </Button>
        </Stack>
      </Box>
      <Box sx={{display:"flex",flexWrap:"wrap"}}>
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign/>
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
      </Box>
    </BorderBox>
  );
}
