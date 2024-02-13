"use client";
import {
  BorderBox,
  TabItem,
  PostSchedulePopup,
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
  const handle01Change = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [openCreateCampaign, setOpenCreateCampaign] = React.useState(false);
  const handleCreateCampaignOpen = () => setOpenCreateCampaign(true);
  const handleCreateCampaignClose = () => setOpenCreateCampaign(false);

  const [openPostScheduling, setOpenPostScheduling] = React.useState(false);
  const handlePostSchedulingOpen = () => setOpenPostScheduling(true);
  const handlePostSchedulingClose = () => setOpenPostScheduling(false);
  return (
    <BorderBox>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "",
            padding: "10px",
            width: "100%",
          }}
        >
          <TabsNav sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  position: "relative",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <TabList
                  onChange={handle01Change}
                  aria-label="lab API tabs example"
                >
                  <TabItem label="In Progress" value="1" />
                  <TabItem label="Completd" value="2" />
                  <TabItem label="Drafts" value="3" />
                  <TabItem label="Scheduled Posts" value="4" />
                </TabList>

                <Stack direction="row" spacing={4}>
                  <Button
                    onClick={handleCreateCampaignOpen}
                    variant="contained"
                    startIcon={<EditNoteIcon />}
                    sx={{ width: "60%" }}
                  >
                    Create Campaign
                  </Button>
                  <Modal
                    open={openCreateCampaign}
                    onClose={handleCreateCampaignClose}
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
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "20px",
                          }}
                        >
                          <Stack direction="row" spacing={1}>
                            <Button
                              onClick={handleCreateCampaignClose}
                              sx={{ backgroundColor: "background.default" }}
                            >
                              <Typography component="h2">Cancel</Typography>
                            </Button>
                            <Button variant="contained">
                              <Typography component="h2">Create</Typography>
                            </Button>
                          </Stack>
                        </Box>
                      </Box>
                    </CreateCampaignPopup>
                  </Modal>
                  <Button
                    onClick={handlePostSchedulingOpen}
                    variant="contained"
                    startIcon={<ScheduleIcon />}
                    sx={{ width: "60%" }}
                  >
                    Post Scheduling
                  </Button>
                  <Modal
                    open={openPostScheduling}
                    onClose={handlePostSchedulingClose}
                  >
                    <PostSchedulePopup>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Text in a modal
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                      </Typography>
                    </PostSchedulePopup>
                  </Modal>
                </Stack>
              </Box>
              <TabPanel
                value="1"
                style={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "auto",
                  }}
                  style={{ boxSizing: "initial" }}
                >
                  <SinglePRCampaign />
                  <SinglePRCampaign />
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
