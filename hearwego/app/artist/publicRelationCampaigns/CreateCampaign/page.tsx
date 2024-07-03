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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TaskIcon from "@mui/icons-material/Assignment";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CreateCampaignPopProps {
  open: boolean;
  onClose: () => void;
}

const CreateCampaignPop: React.FC<CreateCampaignPopProps> = ({
  open,
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [tasks, setTasks] = useState<
    { id: number; name: string; editing: boolean }[]
  >([{ id: Date.now(), name: "New Task", editing: false }]);

  const formik = useFormik({
    initialValues: {
      campaignName: "",
    },
    validationSchema: Yup.object({
      campaignName: Yup.string().required("Campaign name is required"),
    }),
    onSubmit: (values) => {
      handleNext();
    },
  });

  const steps = ["Enter Campaign Name", "Create Campaign", "Review & Save"];

  const handleNext = async () => {
    if (step === 0) {
      await formik.validateForm();
      if (!formik.errors.campaignName) {
        setStep(step + 1);
      }
    } else if (step === 1) {
      const emptyTask = tasks.some((task) => task.name.trim() === "");
      if (!emptyTask) {
        setStep(step + 1);
      } else {
        alert("All task names must be filled out.");
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
    const newTaskId = Date.now(); // Use timestamp for unique ID
    setTasks([...tasks, { id: newTaskId, name: "", editing: true }]);
  };

  const handleEditSaveTask = (index: number) => {
    const updatedTasks = [...tasks];
    if (updatedTasks[index].editing) {
      if (updatedTasks[index].name.trim()) {
        updatedTasks[index].editing = false;
      } else {
        alert("Task name cannot be empty!");
      }
    } else {
      updatedTasks[index].editing = true;
    }
    setTasks(updatedTasks);
  };

  const handleTaskNameChange = (index: number, newName: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = newName;
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (!open) {
      setStep(0);
      formik.resetForm();
      setTabValue(0);
      setConfirmCancelOpen(false);
      setConfirmSaveOpen(false);
      setTasks([{ id: Date.now(), name: "New Task", editing: false }]);
    }
  }, [open]);

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
              id="campaignName"
              name="campaignName"
              value={formik.values.campaignName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.campaignName &&
                Boolean(formik.errors.campaignName)
              }
              helperText={
                formik.touched.campaignName && formik.errors.campaignName
              }
            />
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
                <List>
                  {tasks.map((task, index) => (
                    <ListItem key={task.id}>
                      <ListItemIcon>
                        <TaskIcon />
                      </ListItemIcon>
                      {task.editing ? (
                        <TextField
                          fullWidth
                          value={task.name}
                          onChange={(e) =>
                            handleTaskNameChange(index, e.target.value)
                          }
                          error={task.name.trim() === ""}
                          helperText={
                            task.name.trim() === "" &&
                            "Task name cannot be empty"
                          }
                        />
                      ) : (
                        <ListItemText>{task.name || "New Task"}</ListItemText>
                      )}
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleEditSaveTask(index)}
                        >
                          {task.editing ? <SaveIcon /> : <EditIcon />}
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
              Campaign Name: {formik.values.campaignName}
            </Typography>
            <Typography variant="h6">Tasks:</Typography>
            <List>
              {tasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemIcon>
                    <TaskIcon />
                  </ListItemIcon>
                  <ListItemText>{task.name}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      default:
        return null;
    }
  };

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
          <Button onClick={handleSave} color="primary">
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
          <Button onClick={handleConfirmSaveClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default CreateCampaignPop;
