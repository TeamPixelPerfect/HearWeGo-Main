"use client";
import React from "react";
import {
  BorderBox,
  TabItem,
  TabsNav,
  CreateCampaignPopup,
  NameBox,
} from "../../styles/pressRelease.style";
import SinglePRCampaign from "../../components/SinglePRCampaign";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
export default function Context() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            onClick={handleOpen}
            variant="contained"
            startIcon={<EditNoteIcon />}
            sx={{ width: "190px" }}
          >
            Create Campaign
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CreateCampaignPopup>
              <NameBox>
                <Typography variant="h6" component="h2">
                  Create Campaign
                </Typography>
                </NameBox>
            </CreateCampaignPopup>
          </Modal>
          <Button
            variant="contained"
            startIcon={<ScheduleIcon />}
            sx={{ width: "190px" }}
          >
            Post Scheduling
          </Button>
        </Stack>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
        <SinglePRCampaign />
      </Box>
    </BorderBox>
  );
}
