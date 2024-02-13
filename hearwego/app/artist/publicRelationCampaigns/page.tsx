"use client";
import {
  BorderBox,
  TabItem,
  //TabsNav,
  CreateCampaignPopup,
  NameBox,
  TabsNav,
} from "../../styles/pressRelease.style";
import SinglePRCampaign from "../../components/SinglePRCampaign";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";

export default function Context() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <BorderBox>
      <Box
        sx={{
          position: "relative",
          width: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Box sx={{ display: "flex", backgroundColor: "", padding: "10px" }}>
          <TabsNav sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider",display:"flex",position:"relative",alignItems:"baseline",justifyContent:"space-between",width:"100%"}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <TabItem label="Item One" value="1" />
                  <TabItem label="Item Two" value="2" />
                  <TabItem label="Item Three" value="3" />
                  <TabItem label="Item four" value="4" />
                  <TabItem label="Item five" value="5" />
                </TabList>

                <Stack direction="row" spacing={4}>
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
                      <Box
                        sx={{
                          padding: "15px",
                          maxWidth: "100%",
                          backgroundColor: "background.default",
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Enter the Name"
                          style={{ boxSizing: "initial" }}
                        />
                      </Box>
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
              <TabPanel value="1">
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <SinglePRCampaign />
                  <SinglePRCampaign />
                </Box>
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
              <TabPanel value="4">Item Four</TabPanel>
            </TabContext>
          </TabsNav>
        </Box>
      </Box>
    </BorderBox>
  );
}
