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
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";

export default function SinglePRCampaign() {
  const [progress, setProgress] = React.useState(10);

  const [openSeeMore, setopenSeeMore] = React.useState(false);
  const handleSeeMoreOpen = () => setopenSeeMore(true);
  const handleSeeMoreClose = () => setopenSeeMore(false);

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
              <CampaignPopup />
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
  onCompletionChange,
}: {
  text: string;
  onTextChange: (text: string) => void;
  onCompletionChange: (completed: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [taskText, setTaskText] = React.useState(text);
  const [error, setError] = React.useState("");

  const theme = useTheme();

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCompletionChange(newCheckedState);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    if (taskText.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    setIsEditing(false);
    setError("");
    onTextChange(taskText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
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
                  variant="standard"
                  type="text"
                  value={taskText}
                  onChange={handleInputChange}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                  error={!!error}
                  helperText={error}
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
                <Typography variant="body1">{taskText}</Typography>
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

export const CampaignPopup = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState("1");
  const [tasks, setTasks] = React.useState([{ text: "New Task" }]);
  const [openSeeMore, setOpenSeeMore] = React.useState(false);
  const [completedTaskCount, setCompletedTaskCount] = React.useState(0);

  const [isPostsEmpty, setIsPostsEmpty] = React.useState(false);

  const handleSeeMoreOpen = () => setOpenSeeMore(true);
  const handleSeeMoreClose = () => setOpenSeeMore(false);
  const handleValueChange = (event, newValue) => setValue(newValue);
  const handleAddNewTask = () => setTasks([...tasks, { text: "New Task" }]);
  const handleTextChange = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskCompletionChange = (index, isCompleted) => {
    setCompletedTaskCount((prev) => (isCompleted ? prev + 1 : prev - 1));
  };

  const progressValue = (completedTaskCount / tasks.length) * 100;

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Classic Song Mixtape Album Cover
      </Typography>
      <Box sx={{ flexGrow: 1, padding: "15px" }}>
        <BorderLinearProgress variant="determinate" value={progressValue} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "black",
        }}
      >
        <Typography
          sx={{ paddingLeft: "10px", color: theme.palette.text.primary }}
        >
          Progress
        </Typography>
        <Typography
          sx={{ paddingRight: "10px", color: theme.palette.text.primary }}
        >
          {`${progressValue.toFixed(2)}% Completed`}
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
              onChange={handleValueChange}
              aria-label="lab API tabs example"
              sx={{ justifyContent: "space-between", width: "100%" }}
            >
              <TabItem label="Tasks" value="1" />
              <TabItem label="Posts" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ minHeight: "100%" }}>
            <Button onClick={handleAddNewTask} sx={{ paddingBottom: "20px" }}>
              <AddCircleOutlineIcon />
              <p style={{ paddingLeft: "10px" }}>Add New Task</p>
            </Button>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              {tasks.map((task, index) => (
                <SingleTask
                  key={index}
                  text={task.text}
                  onTextChange={(newText) => handleTextChange(index, newText)}
                  onCompletionChange={(isCompleted) =>
                    handleTaskCompletionChange(index, isCompleted)
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
            {isPostsEmpty ? (
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                No Posts Available
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <Posts />
                <Posts />
                <Posts />
                <Button
                  onClick={handleSeeMoreClose}
                  variant="contained"
                  sx={{
                    paddingTop: "10px",
                    width: "25%",
                    right: "0",
                    position: "absolute",
                    bottom: "0",
                  }}
                >
                  Done
                </Button>
              </Box>
            )}
          </TabPanel>
        </TabContext>
      </TabsNav>
    </>
  );
};

export const Posts = () => {
  const theme = useTheme();
  const [openSeeMore, setopenSeeMore] = React.useState(false);
  const handleSeeMoreClose = () => setopenSeeMore(false);

  return (
    <Box sx={{ width: "48%" }}>
      <PostForPopup>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
            opacity: 0.7,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          <Typography
            variant="body1"
            component="p"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Icon sx={{ marginRight: "5px" }}>
              <CalendarMonthIcon />
            </Icon>
            2/06/2024
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Icon sx={{ marginRight: "5px" }}>
              <BrowseGalleryIcon />
            </Icon>
            15:00 P.M.
          </Typography>
        </Box>
      </PostForPopup>
    </Box>
  );
};