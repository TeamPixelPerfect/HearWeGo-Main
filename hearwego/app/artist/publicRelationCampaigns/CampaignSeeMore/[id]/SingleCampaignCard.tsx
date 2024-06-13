"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  CardActions,
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Checkbox,
  Avatar,
} from "@mui/material";
import { CheckBox, Delete, Task as TaskIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface CampaignCardProps {
  title: string;
  image: string;
  description: string;
  status: "in_progress" | "completed" | "drafts";
  tasks?: Task[]; // Optional tasks array
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  image,
  description,
  status,
  tasks: initialTasks = [], // Default to empty array if tasks not provided
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false); // State to handle dialog open/close
  const [activeTab, setActiveTab] = useState(0); // State to handle active tab
  const [tasks, setTasks] = useState<Task[]>(initialTasks); // State to handle tasks
  const [completedProgress, setCompletedProgress] = useState(0); // State to handle progress

  useEffect(() => {
    calculateProgress(); // Calculate initial progress
  }, []);

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue); // Update active tab
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks); // Delete task
    calculateProgress(updatedTasks); // Recalculate progress
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Toggle task completion
    calculateProgress(updatedTasks); // Recalculate progress
  };

  const calculateProgress = (tasksList = tasks) => {
    const totalTasks = tasksList.length;
    const completedTasks = tasksList.filter((task) => task.completed).length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    setCompletedProgress(progress); // Update progress
  };

  let statusLabel = "";

  switch (status) {
    case "in_progress":
      statusLabel = "In Progress";
      break;
    case "completed":
      statusLabel = "Completed";
      break;
    case "drafts":
      statusLabel = "Drafts";
      break;
    default:
      statusLabel = "";
  }

  return (
    <>
      <Card
        elevation={2}
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%", // Full height for Grid item
          width: "30%", // Full width for Grid item
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)", // Subtle shadow
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          style={{
            width: "50%",
            objectFit: "cover",
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
          }}
        />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <CardContent
            style={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: theme.spacing(2),
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              style={{ fontSize: "1.6rem" }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              paragraph
              style={{ fontSize: "1.3rem" }}
            >
              {description}
            </Typography>
            <Box sx={{ width: "100%", mt: theme.spacing(2) }}>
              <LinearProgress variant="determinate" value={completedProgress} />
              <Typography
                variant="body2"
                component="p"
                style={{ fontSize: "1rem" }}
              >
                {completedProgress}% completed
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            style={{ justifyContent: "flex-end", padding: theme.spacing(1) }}
          >
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={handleClickOpen} // Open the dialog on click
            >
              See More
            </Button>
          </CardActions>
        </Box>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", mb: theme.spacing(2) }}>
            <LinearProgress variant="determinate" value={completedProgress} />
            <Typography
              variant="body2"
              component="p"
              style={{ fontSize: "1rem", textAlign: "center" }}
            >
              {completedProgress}% completed
            </Typography>
          </Box>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Tasks" />
            <Tab label="Posts" />
          </Tabs>
          {activeTab === 0 && (
            <Box sx={{ p: theme.spacing(2) }}>
              {/* Task Tab Content */}
              <List>
                {tasks.map((task) => (
                  <ListItem
                    key={task.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <TaskIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={task.name} />
                    <IconButton
                      edge="end"
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    >
                      <Checkbox checked={task.completed} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          {activeTab === 1 && (
            <Box sx={{ p: theme.spacing(2) }}>
              {/* Posts Tab Content */}
              <Typography variant="body1">
                {/* Posts content goes here */}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CampaignCard;
