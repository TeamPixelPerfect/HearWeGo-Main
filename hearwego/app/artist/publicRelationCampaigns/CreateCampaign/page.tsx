"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Stepper,
  Step,
  StepLabel,
  Paper,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TaskIcon from "@mui/icons-material/Assignment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addPRCampaign } from "@/app/services/PrServices";
import { PRCampaigns, PRtask } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import DropFile from "@/app/components/DropFile";

interface CreateCampaignPopProps {
  open: boolean;
  onClose: () => void;
}

const initialCampaignData = (artistId: string): PRCampaigns => ({
  ArtistID: artistId,
  Campaign_Name: "",
  Campaign_Description: "",
  CampaignImage_URL: "",
  CampaignStatus: "in_progress",
  completedProgress: 0,
  PRPosts: [],
  PRtask: [],
});

const CreateCampaignPop: React.FC<CreateCampaignPopProps> = ({
  open,
  onClose,
}) => {
  const artist = useAppSelector((state) => state.artist.user);
  const [step, setStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [taskError, setTaskError] = useState<string | null>(null);
  const [campaignImg, setCampaignImg] = useState<File | null>(null);
  const [campaignData, setCampaignData] = useState<PRCampaigns>(
    initialCampaignData(artist?.user.artist_id ?? "")
  );

  const formik = useFormik({
    initialValues: {
      Campaign_Name: "",
    },
    validationSchema: Yup.object({
      Campaign_Name: Yup.string().required("Campaign name is required"),
    }),
    onSubmit: (values) => {
      handleNext();
    },
  });

  const steps = ["Enter Campaign Name", "Create Campaign", "Review & Save"];

  const handleNext = async () => {
    setTaskError(null);
    if (step === 0) {
      await formik.validateForm();
      if (!formik.errors.Campaign_Name) {
        setStep(step + 1);
      }
    } else if (step === 1) {
      const emptyTask =
        campaignData.PRtask?.some((task) => task.TaskName?.trim() === "") ??
        false;
      if (!emptyTask) {
        setStep(step + 1);
      } else {
        setTaskError("All task names must be filled out.");
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCancel = () => {
    setConfirmCancelOpen(true);
  };

  const handleConfirmCancelClose = () => {
    setConfirmCancelOpen(false);
  };

  const handleSave = () => {
    setConfirmSaveOpen(true);
  };

  const handleConfirmSaveClose = () => {
    setConfirmSaveOpen(false);
    onClose();
  };

  const handleAddTask = () => {
    const newTaskId = Date.now().toString(); // Use timestamp for unique ID
    setCampaignData({
      ...campaignData,
      PRtask: [
        ...campaignData.PRtask,
        { TaskID: newTaskId, TaskName: "", TaskDescription: "", isEdit: true },
      ],
    });
  };

  const handleEditSaveTask = (index: number) => {
    const updatedTasks = [...campaignData.PRtask];
    if (updatedTasks[index].TaskName.trim()) {
      updatedTasks[index].isEdit = !updatedTasks[index].isEdit; // Toggle editing state
    } else {
      setTaskError("Task name cannot be empty!");
    }
    setCampaignData({
      ...campaignData,
      PRtask: updatedTasks,
    });
  };

  const handleTaskNameChange = (index: number, newName: string) => {
    const updatedTasks = [...campaignData.PRtask];
    updatedTasks[index].TaskName = newName;
    setCampaignData({
      ...campaignData,
      PRtask: updatedTasks,
    });
  };

  const submitCampaign = async () => {
    try {
      // Filter out tasks with empty TaskName
      const tasksToSubmit = campaignData.PRtask.filter(
        (task) => task.TaskName.trim() !== ""
      );
      const campaignToSubmit = {
        ...campaignData,
        Campaign_Name: formik.values.Campaign_Name,
        CampaignStatus: "in_progress",
        artist_id: artist ? artist.user.artist_id : "",
        PRtask: tasksToSubmit.map((task) => ({
          ...task,
          isEdit: undefined, // Remove editing state before submission
        })),
      };

      const res = await addPRCampaign(
        artist ? artist.token : "",
        campaignToSubmit
      );
      console.log(res);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Campaign Name"
              fullWidth
              id="Campaign_Name"
              name="Campaign_Name"
              value={formik.values.Campaign_Name}
              onChange={(e) =>
                formik.setFieldValue("Campaign_Name", e.target.value)
              }
              onBlur={formik.handleBlur}
              error={
                formik.touched.Campaign_Name &&
                Boolean(formik.errors.Campaign_Name)
              }
              helperText={
                formik.touched.Campaign_Name && formik.errors.Campaign_Name
              }
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <DropFile
                fileTypes="image"
                fileExtensions="JPEG,PNG,WEBP,SVG"
                isCircular={false}
                width="70%"
                height="220px"
                aspectX={1}
                aspectY={1}
                shape="rect"
                file={campaignImg}
                setFile={setCampaignImg}
              />
            </Box>
          </form>
        );
      case 1:
        return (
          <Box>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Tasks" />
              <Tab label="Posts" />
            </Tabs>
            {tabValue === 0 && (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleAddTask}
                >
                  Add New Task
                </Button>
                {taskError && (
                  <FormHelperText error>{taskError}</FormHelperText>
                )}
                <List>
                  {campaignData.PRtask?.map((task, index) => (
                    <ListItem key={task.TaskID}>
                      <ListItemIcon>
                        <TaskIcon />
                      </ListItemIcon>
                      {task.isEdit ? (
                        <TextField
                          fullWidth
                          value={task.TaskName}
                          onChange={(e) =>
                            handleTaskNameChange(index, e.target.value)
                          }
                          error={task.TaskName?.trim() === ""}
                          helperText={
                            task.TaskName?.trim() === "" &&
                            "Task name cannot be empty"
                          }
                        />
                      ) : (
                        <ListItemText>
                          {task.TaskName ? task.TaskName : "New Task"}
                        </ListItemText>
                      )}
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditSaveTask(index)}
                        >
                          {task.isEdit ? <SaveIcon /> : <EditIcon />}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            {tabValue === 1 && (
              <Box>
                <Typography variant="body1">Posts content here</Typography>
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">
              Campaign Name: {formik.values.Campaign_Name}
            </Typography>
            <Typography variant="h6">Tasks:</Typography>
            <List>
              {campaignData.PRtask?.map((task) => (
                <ListItem key={task.TaskID}>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText>{task.TaskName}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!open) {
      setStep(0);
      formik.resetForm();
      setTabValue(0);
      setConfirmCancelOpen(false);
      setConfirmSaveOpen(false);
      setCampaignImg(null);
      setCampaignData(initialCampaignData(artist?.user.artist_id ?? ""));
      setTaskError(null);
    }
  }, [open]);

  useEffect(() => {
    if (campaignImg) {
      // Update the campaign data with the campaign image URL
      setCampaignData({
        ...campaignData,
        CampaignImage_URL: campaignImg,
      });
    }
  }, [campaignImg]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Campaign</DialogTitle>
      <DialogContent>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper sx={{ mt: 3, p: 2 }}>{renderStepContent(step)}</Paper>
      </DialogContent>
      <DialogActions>
        {step > 0 && (
          <Button onClick={handleBack} color="secondary">
            Back
          </Button>
        )}
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        {step === steps.length - 1 ? (
          <Button onClick={submitCampaign} color="primary">
            Save
          </Button>
        ) : (
          <Button onClick={handleNext} color="primary">
            Next
          </Button>
        )}
      </DialogActions>
      {/* Confirmation Dialogs */}
      <Dialog open={confirmCancelOpen} onClose={handleConfirmCancelClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Do you want to cancel creating this campaign?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmCancelClose} color="secondary">
            No
          </Button>
          <Button
            onClick={() => {
              handleConfirmCancelClose();
              onClose();
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmSaveOpen} onClose={handleConfirmSaveClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Do you want to save this campaign?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmSaveClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleConfirmSaveClose();
              submitCampaign();
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default CreateCampaignPop;
