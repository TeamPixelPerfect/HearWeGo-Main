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
  Snackbar,
  DialogContentText,
} from "@mui/material";
import { Task as TaskIcon, Edit, Add, Save, Delete } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  updatePRCampaign,
  deletePRCampaign,
  getPrPostsByCampaign,
  deleteAllPostsForCampaign,
} from "@/app/services/PrServices";
import { PRtask, PRCampaigns, PRPosts } from "@/app/constants/models";

interface CampaignCardProps {
  title: string;
  image: string;
  description: string;
  status: string;
  tasks?: PRtask[];
  token: string;
  id: string;
  setIsChanged: (value: boolean) => void;
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
  tasks: initialTasks = [],
  token,
  id,
  setIsChanged,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [tasks, setTasks] = useState<PRtask[]>(initialTasks);
  const [originalTasks, setOriginalTasks] = useState<PRtask[]>([]);
  const [completedProgress, setCompletedProgress] = useState(0);
  const [newTaskName, setNewTaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const [prPosts, setPrPosts] = useState<PRPosts[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    calculateProgress();
  }, [tasks]);

  const handleClickOpen = () => {
    setOriginalTasks([...tasks]);
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      getPrPostsByCampaign(token, id)
        .then((response) => {
          setPrPosts(response.data);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Failed to load posts.");
        });
    }
  }, [open, token, id]);

  const handleClose = () => {
    if (status === "completed") {
      setOpen(false);
    } else {
      setTasks(originalTasks);
      setOpen(false);
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.TaskID !== taskId);
    setTasks(updatedTasks);
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.TaskID === taskId
        ? {
            ...task,
            TaskStatus:
              task.TaskStatus === "completed" ? "in_progress" : "completed",
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId: string) => {
    const taskToEdit = tasks.find((task) => taskId === task.TaskID);
    if (taskToEdit) {
      setEditingTaskId(taskId);
      setEditedTaskName(taskToEdit.TaskName || "");
    }
  };

  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.TaskID === editingTaskId
        ? { ...task, TaskName: editedTaskName }
        : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskName("");
  };

  const handleAddTask = (values: { newTaskName: string }) => {
    if (status === "completed") return;

    const newTask: PRtask = {
      TaskID: tasks.length
        ? (
            Math.max(...tasks.map((task) => parseInt(task.TaskID || "0"))) + 1
          ).toString()
        : "1",
      TaskName: values.newTaskName,
      TaskStatus: "incomplete",
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
  };

  const calculateProgress = (tasksList = tasks) => {
    const totalTasks = tasksList.length;
    const completedTasks = tasksList.filter(
      (task) => task.TaskStatus === "completed"
    ).length;
    const progress =
      totalTasks === 0 ? 0 : ((completedTasks / totalTasks) * 100).toFixed(2);
    setCompletedProgress(Number(progress));
  };

  const handleDone = async () => {
    if (completedProgress === 100) {
      setConfirmCompleteOpen(true);
    } else {
      await saveCampaignChanges();
    }
  };

  const saveCampaignChanges = async () => {
    try {
      await updatePRCampaign(token, { PRtask: tasks, completedProgress }, id);
      setSuccessMessage(true);
      setOpen(false);
      setIsChanged(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to save changes.");
    }
  };

  const handleConfirmComplete = async (complete: boolean) => {
    if (complete) {
      try {
        await updatePRCampaign(
          token,
          {
            PRtask: tasks,
            CampaignStatus: "completed",
            completedProgress: 100,
          },
          id
        );
        setConfirmCompleteOpen(false);
        setSuccessMessage(true);
        setIsChanged(true);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to complete the campaign.");
      }
    } else {
      await saveCampaignChanges();
      setConfirmCompleteOpen(false);
    }
  };

  const handleDeleteCampaign = async () => {
    try {
      await deleteAllPostsForCampaign(token, id).then(() => {
        deletePRCampaign(token, id);
      });
      setIsChanged(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete campaign.");
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  const handleCloseErrorSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <Card
        elevation={2}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "450px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          style={{
            height: "180px",
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
              onClick={handleClickOpen}
            >
              See More
            </Button>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              onClick={handleDeleteCampaign}
            >
              Delete
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
                    key={task.TaskID}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #e0e0e0",
                      textDecoration:
                        task.TaskStatus === "completed"
                          ? "line-through"
                          : "none",
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
                      {editingTaskId === task.TaskID ? (
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
                              editingTaskId === task.TaskID
                                ? handleSaveEditTask()
                                : handleEditTask(task.TaskID!)
                            }
                          >
                            {editingTaskId === task.TaskID ? (
                              <Save />
                            ) : (
                              <Edit />
                            )}
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDeleteTask(task.TaskID!)}
                          >
                            <Delete />
                          </IconButton>
                        </>
                      )}
                      <IconButton
                        edge="end"
                        onClick={() =>
                          status !== "completed" &&
                          handleToggleTaskCompletion(task.TaskID!)
                        }
                        disabled={status === "completed"}
                      >
                        <Checkbox checked={task.TaskStatus === "completed"} />
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
              <List>
                {prPosts.map((post) => (
                  <ListItem key={post.PrPostID}>
                    <ListItemAvatar>
                      <Avatar src={post.PostImage_URL} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={post.Description}
                      secondary={`Scheduled Date: ${new Date(
                        post.Scheduled_Date!
                      ).toLocaleDateString()} - Time: ${post.Scheduled_Time}`}
                    />
                  </ListItem>
                ))}
              </List>
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
      <Dialog
        open={confirmCompleteOpen}
        onClose={() => setConfirmCompleteOpen(false)}
      >
        <DialogTitle>Complete Campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this campaign as completed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmComplete(false)} color="primary">
            Continue Adding Tasks
          </Button>
          <Button
            onClick={() => handleConfirmComplete(true)}
            color="primary"
            autoFocus
          >
            Mark as Completed
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successMessage}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        color="success"
        message="Changes saved successfully!"
      />
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={3000}
        onClose={handleCloseErrorSnackbar}
        color="error"
        message={errorMessage}
      />
    </>
  );
};

export default CampaignCard;
