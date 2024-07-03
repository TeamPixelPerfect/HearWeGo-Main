"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Typography,
  Snackbar,
  Alert,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import DropFile from "../../../components/DropFile"; // Adjust the import based on your file structure

const CreatePost: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<"postNow" | "schedule">();
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      event: "",
      postContent: "",
      additionalImageFile: null,
    },
    validationSchema: Yup.object({
      event: Yup.string().required("Event is required"),
      postContent: Yup.string().required("Content is required"),
      additionalImageFile: Yup.mixed().required("Image is required"),
    }),
    onSubmit: (values) => {
      if (confirmAction === "schedule") {
        console.log("Scheduled Post:", {
          ...values,
          date: selectedDate,
          time: selectedTime,
          socialMedia: selectedSocialMedia,
        });
        setSnackbarMessage("Post Scheduled Successfully!");
      } else if (confirmAction === "postNow") {
        console.log("Immediate Post:", {
          ...values,
          date: new Date(),
          time: new Date(),
          socialMedia: selectedSocialMedia,
        });
        setSnackbarMessage("Post Created Successfully!");
      }
      setSnackbarOpen(true);
      onClose();
      router.push("/artist/publicRelationCampaigns");
    },
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSocialMediaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.name;
    setSelectedSocialMedia((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleConfirmOpen = (action: "postNow" | "schedule") => {
    if (formik.isValid) {
      setConfirmAction(action);
      setConfirmOpen(true);
    } else {
      formik.setTouched({
        event: true,
        postContent: true,
        additionalImageFile: true,
      });
    }
  };

  const handleConfirmClose = (confirmed: boolean) => {
    setConfirmOpen(false);
    if (confirmed) {
      formik.handleSubmit();
    }
  };

  const handlePreviewOpen = () => {
    if (formik.isValid) {
      setPreviewOpen(true);
    } else {
      formik.setTouched({
        event: true,
        postContent: true,
        additionalImageFile: true,
      });
    }
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="What's On Your Mind?"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="postContent"
            value={formik.values.postContent}
            onChange={formik.handleChange}
            error={
              formik.touched.postContent && Boolean(formik.errors.postContent)
            }
            helperText={formik.touched.postContent && formik.errors.postContent}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="event-label">Select the Event</InputLabel>
            <Select
              labelId="event-label"
              id="event-select"
              name="event"
              value={formik.values.event}
              onChange={formik.handleChange}
              variant="outlined"
              error={formik.touched.event && Boolean(formik.errors.event)}
            >
              <MenuItem value="New Song Release">New Song Release</MenuItem>
              <MenuItem value="New Album Release">New Album Release</MenuItem>
              <MenuItem value="Concert Announcement">
                Concert Announcement
              </MenuItem>
            </Select>
            {formik.touched.event && formik.errors.event && (
              <Typography color="error" variant="caption">
                {formik.errors.event}
              </Typography>
            )}
          </FormControl>
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Select Social Media Platforms
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSocialMedia.includes("facebook")}
                  onChange={handleSocialMediaChange}
                  name="facebook"
                />
              }
              label="Facebook"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSocialMedia.includes("twitter")}
                  onChange={handleSocialMediaChange}
                  name="twitter"
                />
              }
              label="Twitter"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSocialMedia.includes("linkedin")}
                  onChange={handleSocialMediaChange}
                  name="linkedin"
                />
              }
              label="LinkedIn"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSocialMedia.includes("instagram")}
                  onChange={handleSocialMediaChange}
                  name="instagram"
                />
              }
              label="Instagram"
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DatePicker
                  label="Input The Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="Input The Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth variant="outlined" />
                  )}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Box sx={{ mt: 2 }}>
            <DropFile
              fileTypes="Additional Product Image"
              fileExtensions="JPEG,PNG,WEBP,SVG"
              isCircular={false}
              width="100%"
              height="200px"
              file={formik.values.additionalImageFile}
              setFile={(file) =>
                formik.setFieldValue("additionalImageFile", file)
              }
              aspectX={1}
              aspectY={1}
              shape="rect"
              error={
                formik.touched.additionalImageFile &&
                Boolean(formik.errors.additionalImageFile)
              }
            />
            {formik.touched.additionalImageFile &&
              formik.errors.additionalImageFile && (
                <Typography color="error" variant="caption">
                  {formik.errors.additionalImageFile}
                </Typography>
              )}
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handlePreviewOpen()} color="primary">
          Preview
        </Button>
        <Button onClick={() => handleConfirmOpen("postNow")} color="primary">
          Post Now
        </Button>
        <Button onClick={() => handleConfirmOpen("schedule")} color="primary">
          Schedule
        </Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={confirmOpen} onClose={() => handleConfirmClose(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to{" "}
            {confirmAction === "postNow" ? "post now" : "schedule"} this post?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmClose(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmClose(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Post Preview</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{formik.values.event}</Typography>
          <Typography variant="body1">{formik.values.postContent}</Typography>
          <Typography variant="subtitle1">Social Media Platforms:</Typography>
          <ul>
            {selectedSocialMedia.map((platform) => (
              <li key={platform}>{platform}</li>
            ))}
          </ul>
          <Typography variant="subtitle1">
            Date: {selectedDate?.toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1">
            Time: {selectedTime?.toLocaleTimeString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default CreatePost;
