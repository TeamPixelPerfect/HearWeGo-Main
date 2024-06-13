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
import {
  CheckBox,
  Delete,
  Task as TaskIcon,
  Edit,
  Add,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  const [confirmClose, setConfirmClose] = useState(false); // State for confirmation dialog
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
    setConfirmClose(true); // Open confirmation dialog
  };

  const handleConfirmClose = () => {
    setTasks(originalTasks); // Revert to original tasks
    setConfirmClose(false); // Close confirmation dialog
    setOpen(false); // Close the main dialog
  };

  const handleCancelClose = () => {
    setConfirmClose(false); // Close confirmation dialog
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
      setEditedTaskName(taskToEdit.name);
    }
  };

  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, name: editedTaskName } : task
    );
    setTasks(updatedTasks); // Save edited task
    setEditingTaskId(null); // Reset editing state
    setEditedTaskName(""); // Clear edited task name
  };

  const handleAddTask = (values: { newTaskName: string }) => {
    const newTask: Task = {
      id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
      name: values.newTaskName,
      completed: false,
    };
    setTasks([...tasks, newTask]); // Add new task
    setNewTaskName(""); // Clear new task name
  };

  const calculateProgress = (tasksList = tasks) => {
    const totalTasks = tasksList.length;
    const completedTasks = tasksList.filter((task) => task.completed).length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    setCompletedProgress(progress); // Update progress
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
          flexDirection: "column",
          height: "100%",
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          style={{
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
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
                          onBlur={handleSaveEditTask}
                          autoFocus
                        />
                      ) : (
                        <ListItemText primary={task.name} />
                      )}
                    </Box>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleToggleTaskCompletion(task.id)}
                      >
                        <Checkbox checked={task.completed} />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
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
                        fullWidth
                        variant="outlined"
                        placeholder="New task name"
                        error={
                          touched.newTaskName && Boolean(errors.newTaskName)
                        }
                        helperText={touched.newTaskName && errors.newTaskName}
                      />
                      <IconButton color="primary" type="submit">
                        <Add />
                      </IconButton>
                    </Box>
                  </Form>
                )}
              </Formik>
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
          <Button onClick={handleDone} color="primary">
            Done
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmClose} onClose={handleCancelClose}>
        <DialogTitle>Are you sure you want to close?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Any unsaved changes will be lost. Do you still want to close?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClose} color="primary">
            Confirm
          </Button>
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
