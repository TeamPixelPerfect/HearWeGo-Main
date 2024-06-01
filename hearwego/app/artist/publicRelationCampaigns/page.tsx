"use client";
import {
  TabItem,
  PostSchedulePopup,
  CreateCampaignPopup,
  NameBox,
  TabsNav,
  ArtistDetail,
  PostTextField,
  PostContextBox,
  BorderLinearProgress,
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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { renderTimeViewClock } from "@mui/x-date-pickers";
import DropFile from "../../components/DropFile";
import { useTheme } from "@mui/material";
import { CampaignPopup } from "../../components/SinglePRCampaign";

const options = [
  "None",
  "New Song Release",
  "New Album Release",
  "New Music Video Release",
];

export default function Context() {
  const [songFile, setSongFile] = React.useState(null);

  const [value, setValue] = React.useState("1");
  const handle01Change = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [value11, setValue11] = React.useState("11");
  const handle11Change = (event: React.SyntheticEvent, newValue: string) => {
    setValue11(newValue);
  };

  const [openCreateCampaign, setOpenCreateCampaign] = React.useState(false);
  const handleCreateCampaignOpen = () => {
    setOpenCreateCampaign(true);
    setOpenCreateNewCampaign(false);
  };
  const handleCreateCampaignClose = () => setOpenCreateCampaign(false);

  const [openCreateNewCampaign, setOpenCreateNewCampaign] =
    React.useState(false);
  const handleCreateNewCampaignOpen = () => {
    setOpenCreateNewCampaign(true);
    setOpenCreateCampaign(false);
  };
  const handleCreateNewCampaignClose = () => {
    if (window.confirm("Are you sure you want to close this?")) {
      setTasks([]);
      setOpenCreateNewCampaign(false);
      setClickCount(0); // Reset click count when modal is closed
    }
  };

  const [tasks, setTasks] = React.useState<object[]>([]);
  const [clickCount, setClickCount] = React.useState(0); // State to track the number of clicks

  const AddNewTaskToCampaign = () => {
    setTasks([...tasks, { text: "Enter The Task" }]);
    setClickCount(clickCount + 1);
  };

  const handleTextChange = (index: number, newText: any) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const [openPostScheduling, setOpenPostScheduling] = React.useState(false);
  const handlePostSchedulingOpen = () => setOpenPostScheduling(true);
  const handlePostSchedulingClose = () => setOpenPostScheduling(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const theme = useTheme();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
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

            <Stack direction="row" spacing={1}>
              <Button
                onClick={handleCreateCampaignOpen}
                variant="contained"
                startIcon={<EditNoteIcon />}
                // sx={{ width: "60%" }}
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
                          <Typography
                            component="h2"
                            onClick={handleCreateNewCampaignOpen}
                          >
                            Create
                          </Typography>
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </CreateCampaignPopup>
              </Modal>
              <Modal
                open={openCreateNewCampaign}
                onClose={handleCreateNewCampaignClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PostSchedulePopup
                  sx={{ backgroundColor: "background.default" }}
                >
                  <CampaignPopup />
                </PostSchedulePopup>
              </Modal>
              <Button
                onClick={handlePostSchedulingOpen}
                variant="contained"
                startIcon={<ScheduleIcon />}
              >
                Post Scheduling
              </Button>
              <Modal
                open={openPostScheduling}
                onClose={handlePostSchedulingClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PostSchedulePopup>
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{
                      color: theme.palette.text.primary,
                      textAlign: "center",
                      padding: "10px",
                      borderColor: "divider",
                      borderBottom: "2px solid",
                      textTransform: "uppercase",
                      fontWeight: 600,
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
                        color: theme.palette.text.primary,
                      }}
                    >
                      Damidu Thathsara<br></br>
                      <Box sx={{ fontSize: "12px" }}>
                        2021-09-20<br></br> 12:30:00
                      </Box>
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
                      minRows={2}
                      placeholder="What's On Your Mind?"
                      variant="filled"
                      inputProps={{
                        style: {
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      // height: "28%",
                    }}
                  >
                    <DropFile
                      fileTypes="Post Image"
                      fileExtensions="JPEG,PNG,WEBP,SVG"
                      isCircular={false}
                      width="100%"
                      height="150px"
                      file={songFile}
                      setFile={setSongFile}
                      aspectX={1}
                      aspectY={1}
                      shape="rect"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "50%",
                        textAlign: "center",
                        borderRadius: "10px",
                        height: "fit-content",
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                      }}
                    >
                      <PostContextBox>
                        <Typography sx={{ color: "black" }}>
                          Share Post On :
                        </Typography>
                      </PostContextBox>
                      <div>
                        <List
                          component="nav"
                          sx={{
                            backgroundColor: "#B2B1FF",
                            marginTop: "10px",
                            textAlign: "center",
                            borderRadius: "10px",
                          }}
                        >
                          <ListItemButton
                            id="lock-button"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClickListItem}
                          >
                            <ListItemText
                              primary="Select the Event "
                              secondary={options[selectedIndex]}
                            />
                          </ListItemButton>
                        </List>
                        <Menu
                          id="lock-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "lock-button",
                            role: "listbox",
                          }}
                        >
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 0}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#B2B1FF",
                        padding: "10px",
                        marginTop: "10px",
                        width: "50%",
                        textAlign: "center",
                        borderRadius: "10px",
                        height: "45%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          components={["DatePicker"]}
                          sx={{ overflow: "hidden" }}
                        >
                          <div style={{ boxSizing: "initial" }}>
                            <DatePicker label="Input The Date" />
                          </div>
                        </DemoContainer>
                      </LocalizationProvider>

                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["TimePicker"]}>
                          <div style={{ boxSizing: "initial" }}>
                            <TimePicker
                              label="Input The Time"
                              viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                              }}
                            />
                          </div>
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ marginTop: "10px", justifyContent: "right" }}
                  >
                    <Button
                      onClick={handlePostSchedulingClose}
                      variant="text"
                      sx={{
                        width: "20%",
                        backgroundColor: "background.default",
                      }}
                    >
                      Cancle
                    </Button>
                    <Button variant="contained" sx={{ width: "20%" }}>
                      Schedule
                    </Button>
                  </Stack>
                </PostSchedulePopup>
              </Modal>
            </Stack>
          </Box>
          <TabPanel
            value="1"
            style={{
              width: "100%",
              padding: "1em 0",
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
            </Box>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Four</TabPanel>
        </TabContext>
      </TabsNav>
    </>
  );
}
