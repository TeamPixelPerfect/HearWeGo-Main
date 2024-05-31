"use client";
import * as React from "react";
import {
  SingleCampaign,
  CampaignMedia,
  CampaignContent,
  PostSchedulePopup,
  BorderLinearProgress,
  TabsNav,
  TabItem,
  PostForPopup,
} from "../styles/pressRelease.style";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TabList from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Icon from "@mui/material/Icon";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TextField, useTheme } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
export default function SinglePRCampaign() {
  const [value, setValue] = React.useState("1");
  const handle01Change = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [progress, setProgress] = React.useState(10);

  const theme = useTheme();

  const [openSeeMore, setopenSeeMore] = React.useState(false);
  const handleSeeMoreOpen = () => setopenSeeMore(true);
  const handleSeeMoreClose = () => setopenSeeMore(false);

  const [tasks, setTasks] = React.useState<{ text: string }[]>([]); // Provide the correct type for tasks
  const AddNewTaskToCampaign = () => {
    setTasks([...tasks, { text: "New Task" }]);
  };
  const handleTextChange = (index: number, newText: string) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { text: newText } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Box>
      <SingleCampaign>
        <CampaignMedia
          image={
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/classic-song-mixtape-album-cover-template-design-3ba3255137894fac49ae81b1346b289e_screen.jpg?ts=1635384548"
          }
        />
        <CampaignContent>
          <h2> Classic Song Mixtape</h2>
          <p> Classic Song Mixtape Album Cover Template Design</p>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
          <Button
            onClick={handleSeeMoreOpen}
            variant="contained"
            sx={{ width: "140px" }}
          >
            See More
          </Button>
          <Modal
            open={openSeeMore}
            onClose={handleSeeMoreClose}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PostSchedulePopup sx={{ backgroundColor: "background.default" }}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Classic Song Mixtape Album Cover
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  padding: "15px",
                }}
              >
                <BorderLinearProgress variant="determinate" value={60} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "black",
                }}
              >
                <Typography
                  sx={{
                    paddingLeft: "10px",
                    color: theme.palette.text.primary,
                  }}
                >
                  Progress
                </Typography>
                <Typography
                  sx={{
                    paddingRight: "10px",
                    color: theme.palette.text.primary,
                  }}
                >
                  60% Completed
                </Typography>
              </Box>
              <TabsNav sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box
                    sx={{
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
                      sx={{ justifyContent: "space-between", width: "100%" }}
                    >
                      <TabItem label="Tasks" value="1" />
                      <TabItem label="Posts" value="2" />
                    </TabList>
                  </Box>

                  <TabPanel
                    value="1"
                    sx={{
                      minHeight: "100%",
                    }}
                  >
                    <Button onClick={AddNewTaskToCampaign}>
                      <AddCircleOutlineIcon />
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      {tasks.map((task, index) => (
                        <SingleTask
                          key={index}
                          text={task.text}
                          onTextChange={(newText: any) =>
                            handleTextChange(index, newText)
                          }
                        />
                      ))}
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "right", width: "100%" }}
                    >
                      <Button
                        onClick={handleSeeMoreClose}
                        variant="contained"
                        sx={{
                          width: "25%",
                          backgroundColor: "background.main",
                          color: "primary.default",
                        }}
                      >
                        Done
                      </Button>
                    </Stack>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box>
                      <PostForPopup>
                        <Box
                          sx={{
                            backgroundColor: "background.default",
                            opacity: "0.8",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Stack direction="row" spacing="2">
                            <Typography
                              variant="body1"
                              component="p"
                              sx={{ color: "black", alignItems: "center" }}
                            >
                              <Icon
                                sx={{ color: "black", marginRight: "5 px" }}
                              >
                                <CalendarMonthIcon />
                              </Icon>
                              <br />
                              2/06/2024
                            </Typography>
                            <Typography
                              variant="body1"
                              component="p"
                              sx={{ color: "black" }}
                            >
                              <Icon
                                sx={{ color: "black", marginRight: "5 px" }}
                              >
                                <CalendarMonthIcon />
                              </Icon>
                              <br />
                              15:00P.M.
                            </Typography>
                            <Button
                              onClick={handleSeeMoreClose}
                              variant="contained"
                              sx={{ width: "25%" }}
                            >
                              Done
                            </Button>
                          </Stack>
                        </Box>
                      </PostForPopup>
                    </Box>
                  </TabPanel>
                </TabContext>
              </TabsNav>
            </PostSchedulePopup>
          </Modal>
        </CampaignContent>
      </SingleCampaign>
    </Box>
  );
}

//Linear Progress with label
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
//a single task component for a Campaign
export const SingleTask = ({
  text,
  onTextChange,
}: {
  text: string;
  onTextChange: (text: string) => void;
}) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const theme = useTheme();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [isEditing, setIsEditing] = React.useState(false);
  const [taskText, setTaskText] = React.useState(text);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onTextChange(taskText); // Notify parent component of text change
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<Promise<string>> };
  }) => {
    setTaskText(e.target.value);
  };
  return (
    <Box
      sx={{
        width: "100%",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        borderRadius: "10px",
        backgroundColor: isChecked ? "lightgreen" : "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Icon sx={{ color: theme.palette.text.primary, marginRight: "15px" }}>
          <ListAltIcon />
        </Icon>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isEditing ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  textDecoration: isChecked ? "line-through" : "none",
                }}
              >
                <TextField
                  fullWidth
                  id="filled-basic"
                  variant="standard"
                  type="text"
                  value={taskText as unknown as string}
                  onChange={handleInputChange}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                />
              </Box>
              <Button onClick={handleSaveClick}>
                <SaveIcon />
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  textDecoration: isChecked ? "line-through" : "none",
                }}
              >
                <h4>{taskText}</h4>
              </Box>
              <Button onClick={handleEditClick}>
                <ModeEditOutlineIcon />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
    </Box>
  );
};
