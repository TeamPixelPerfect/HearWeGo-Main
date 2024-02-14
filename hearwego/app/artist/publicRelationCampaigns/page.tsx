"use client";
import {
  BorderBox,
  TabItem,
  PostSchedulePopup,
  CreateCampaignPopup,
  NameBox,
  TabsNav,
  ArtistDetail,
  PostTextField,
  PostContextBox,
} from "../../styles/pressRelease.style";
import SinglePRCampaign from "../../components/SinglePRCampaign";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
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
      <TabsNav sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: "2px solid",
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
                    variant="h5"
                    component="h5"
                    sx={{
                      color: "black",
                      textAlign: "center",
                      padding: "10px",
                      borderColor: "divider",
                      borderBottom: "2px solid",
                    }}
                  >
                    Create Post
                  </Typography>
                  <ArtistDetail>
                    <Avatar
                      sx={{
                        width: "60px",
                        height: "60px",
                        position: "relative",
                      }}
                      alt="Remy Sharp"
                      src="https://avantmusicport.ie/wp-content/uploads/2020/05/dlsuh.jpg"
                    />
                    <Typography
                      sx={{
                        paddingLeft: "10px",
                        color: "black",
                      }}
                    >
                      Damidu Thathsara<br></br>
                      2021-09-20<br></br> 12:30:00
                    </Typography>
                  </ArtistDetail>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <PostTextField
                      multiline
                      minRows={4}
                      placeholder="What's On Your Mind?"
                      variant="filled"
                      inputProps={{
                        style: {
                          color: "black",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "background.default",
                      width: "100%",
                      height: "28%",
                    }}
                  >
                    hi
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "50%",
                    }}
                  >
                    <PostContextBox>
                      <Typography sx={{ color: "black" }}>
                        Share Post On :
                      </Typography>
                    </PostContextBox>
                    <Box
                      sx={{
                        backgroundColor: "#B2B1FF",
                        padding: "20px",
                        marginTop: "10px",
                        width: "50%",
                        textAlign: "center",
                        borderRadius: "10px",
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker"]}
                          sx={{ overflow: "hidden" }}
                        >
                          <div style={{boxSizing:"initial"}}>
                            <DatePicker label="Input The Date" />
                          </div>
                        </DemoContainer>
                      </LocalizationProvider>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["TimeField"]}
                          sx={{ overflow: "hidden" }}
                        >
                          <TimeField
                            label="Input The Time"
                            style={{ boxSizing: "initial" }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Box>
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
    </BorderBox>
  );
}
