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
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Avatar,
  TextField,
  DialogContentText,
  Snackbar,
} from "@mui/material";
import { Task as TaskIcon, Edit, Add, Save, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Task {
  id: number;
  TaskName: string;
  completed: boolean;
}

interface CampaignCardProps {
  title: string;
  image: string;
  description: string;
  status: "in_progress" | "completed";
  tasks?: Task[]; // Optional tasks array
}

const validationSchema = Yup.object().shape({
  newTaskName: Yup.string()
    .required("Task name is required")
    .min(2, "Task name must be at least 2 characters"),
});

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
  const [originalTasks, setOriginalTasks] = useState<Task[]>([]); // State to handle original tasks
  const [completedProgress, setCompletedProgress] = useState(0); // State to handle progress
  const [newTaskName, setNewTaskName] = useState(""); // State for new task name
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // State for editing task ID
  const [editedTaskName, setEditedTaskName] = useState(""); // State for edited task name
  const [successMessage, setSuccessMessage] = useState(false); // State for success message

  useEffect(() => {
    calculateProgress(); // Calculate initial progress
  }, [tasks]);

  const handleClickOpen = () => {
    setOriginalTasks([...tasks]); // Save original tasks
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    if (status === "completed") {
      setOpen(false); // Close the main dialog directly for completed campaigns
    } else {
      setTasks(originalTasks); // Revert to original tasks
      setOpen(false); // Close the main dialog
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue); // Update active tab
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks); // Delete task
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Toggle task completion
  };

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => taskId === task.id);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditedTaskName(taskToEdit.TaskName);
    }
  };

  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, TaskName: editedTaskName } : task
    );
    setTasks(updatedTasks); // Save edited task
    setEditingTaskId(null); // Reset editing state
    setEditedTaskName(""); // Clear edited task name
  };

  const handleAddTask = (values: { newTaskName: string }) => {
    if (status === "completed") return; // Disable adding new tasks if status is completed

    const newTask: Task = {
      id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
      TaskName: values.newTaskName,
      completed: false,
    };
    setTasks([...tasks, newTask]); // Add new task
    setNewTaskName(""); // Clear new task name
  };

  const calculateProgress = (tasksList = tasks) => {
    const totalTasks = tasksList.length;
    const completedTasks = tasksList.filter((task) => task.completed).length;
    const progress =
      totalTasks === 0 ? 0 : ((completedTasks / totalTasks) * 100).toFixed(2);
    setCompletedProgress(Number(progress)); // Update progress

    if (Number(progress) === 100) {
      status = "completed"; // Change status to completed if progress is 100%
    }
  };

  const handleDone = () => {
    setSuccessMessage(true); // Show success message
    setOpen(false); // Close the main dialog
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false); // Hide success message
  };

  let statusLabel = "";

  switch (status) {
    case "in_progress":
      statusLabel = "In Progress";
      break;
    case "completed":
      statusLabel = "Completed";
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
          flexDirection: "column",
          height: "450px", // Set fixed height
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          style={{
            height: "180px", // Set fixed height for the image
            width: "100%",
            objectFit: "cover",
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
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
              <LinearProgress
                variant="determinate"
                value={completedProgress}
                style={{ height: 10, borderRadius: 5 }}
              />
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
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h4" component="div" align="center">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%", mb: theme.spacing(2) }}>
            <LinearProgress
              variant="determinate"
              value={completedProgress}
              style={{ height: 10, borderRadius: 5 }}
            />
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
            <Box
              sx={{
                p: theme.spacing(2),
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <List>
                {tasks.map((task) => (
                  <ListItem
                    key={task.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #e0e0e0",
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <TaskIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Box
                      sx={{ flex: 1, display: "flex", alignItems: "center" }}
                    >
                      {editingTaskId === task.id ? (
                        <TextField
                          fullWidth
                          value={editedTaskName}
                          onChange={(e) => setEditedTaskName(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <ListItemText primary={task.TaskName} />
                      )}
                    </Box>
                    <ListItemSecondaryAction>
                      {status !== "completed" && (
                        <>
                          <IconButton
                            edge="end"
                            onClick={() =>
                              editingTaskId === task.id
                                ? handleSaveEditTask()
                                : handleEditTask(task.id)
                            }
                          >
                            {editingTaskId === task.id ? <Save /> : <Edit />}
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Delete />
                          </IconButton>
                        </>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() =>
                          status !== "completed" &&
                          handleToggleTaskCompletion(task.id)
                        }
                        disabled={status === "completed"}
                      >
                        <Checkbox checked={task.completed} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              {status !== "completed" && (
                <Formik
                  initialValues={{ newTaskName: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleAddTask(values);
                    resetForm();
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Box
                        sx={{
                          display: "flex",
                          mt: theme.spacing(2),
                          alignItems: "center",
                        }}
                      >
                        <Field
                          as={TextField}
                          name="newTaskName"
                          variant="outlined"
                          placeholder="New task name"
                          error={
                            touched.newTaskName && Boolean(errors.newTaskName)
                          }
                          helperText={touched.newTaskName && errors.newTaskName}
                          sx={{ flex: 1, mr: theme.spacing(2) }}
                        />
                        <IconButton color="primary" type="submit">
                          <Add />
                        </IconButton>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
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
          {status === "completed" ? (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          ) : (
            <>
              <Button onClick={handleDone} color="primary">
                Done
              </Button>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Changes saved successfully!"
      />
    </>
  );
};

export default CampaignCard;
