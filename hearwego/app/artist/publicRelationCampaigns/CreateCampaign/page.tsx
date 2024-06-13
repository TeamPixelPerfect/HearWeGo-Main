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
  LinearProgress,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  ListItemSecondaryAction,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TaskIcon from "@mui/icons-material/Assignment";

interface CreateCampaignPopProps {
  open: boolean;
  onClose: () => void;
}

const CreateCampaignPop: React.FC<CreateCampaignPopProps> = ({
  open,
  onClose,
}) => {
  const [step, setStep] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [tasks, setTasks] = useState<
    { id: number; name: string; editing: boolean }[]
  >([
    { id: 1, name: "New Task", editing: false }, // Default task item
  ]);

  const handleNext = () => {
    setStep(step + 1);
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
    const newTaskId = tasks.length + 1;
    setTasks([...tasks, { id: newTaskId, name: "", editing: true }]);
  };

  const handleEditSaveTask = (index: number) => {
    const updatedTasks = [...tasks];
    if (updatedTasks[index].editing) {
      // Save the task
      updatedTasks[index].editing = false;
    } else {
      // Enable editing
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
      setCampaignName("");
      setTabValue(0);
      setConfirmCancelOpen(false);
      setConfirmSaveOpen(false);
      setTasks([{ id: 1, name: "New Task", editing: false }]);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={step === 0 ? "xs" : "md"}
      fullWidth
    >
      {step === 0 ? (
        <>
          <DialogTitle>Enter Campaign Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Campaign Name"
              fullWidth
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleNext} color="primary">
              Next
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Create Campaign</DialogTitle>
          <DialogContent sx={{ height: "calc(100vh - 250px)" }}>
            <Typography variant="h6">{campaignName}</Typography>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Tasks" />
              Hide the "Posts" tab
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
                {tasks.map((task, index) => (
                    
                  <ListItem key={task.id} disableGutters>
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
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="body1">Posts content here</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </>
      )}

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
