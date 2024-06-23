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
import DropFile from "../../../components/DropFile";
import { addPRPost } from "../../../services/PrServices";
import { PRPosts } from "../../../constants/models";
import { useAppSelector } from "@/lib/hooks";

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
  const artist = useAppSelector((state) => state.artist.user);
  const router = useRouter();
  const[prPostData, setPrPostData] = useState<PRPosts>();

  const formik = useFormik({
    initialValues: {
      ArtistName: "",
      Description: "",
      Scheduled_Date: new Date(),
      Scheduled_Time: "",
      SocialMedias: [],
      PostImage_URL: "",
      CampaignID: "",
    },
    validationSchema: Yup.object({
      ArtistName: Yup.string().required("Artist Name is required"),
      Description: Yup.string().required("Description is required"),
      Scheduled_Date: Yup.date().required("Scheduled Date is required"),
      Scheduled_Time: Yup.string().required("Scheduled Time is required"),
      SocialMedias: Yup.array()
        .of(Yup.string())
        .min(1, "Select at least one social media platform"),
      PostImage_URL: Yup.string().required("Post Image is required"),
    }),
    onSubmit: async (values) => {
      try {
        const postData: PRPosts = {
          ArtistName: values.ArtistName,
          Description: values.Description,
          Scheduled_Date:
            confirmAction === "schedule" ? selectedDate : new Date(),
          Scheduled_Time:
            confirmAction === "schedule" ? selectedTime : new Date(),
          SocialMedias: selectedSocialMedia,
          PostImage_URL: values.PostImage_URL,
          CampaignID: values.CampaignID,
        };

        await addPRPost(artist ? artist.token : "", postData);

        setSnackbarMessage(
          confirmAction === "schedule"
            ? "Post Scheduled Successfully!"
            : "Post Created Successfully!"
        );
        setSnackbarOpen(true);
        onClose();
        router.push("/artist/publicRelationCampaigns");
      } catch (error) {
        setSnackbarMessage("Failed to create post. Please try again.");
        setSnackbarOpen(true);
      }
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
        ArtistName: true,
        Description: true,
        Scheduled_Date: true,
        Scheduled_Time: true,
        SocialMedias: true,
        PostImage_URL: true,
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
        ArtistName: true,
        Description: true,
        Scheduled_Date: true,
        Scheduled_Time: true,
        SocialMedias: true,
        PostImage_URL: true,
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
            label="Artist Name"
            fullWidth
            variant="outlined"
            name="ArtistName"
            value={formik.values.ArtistName}
            onChange={formik.handleChange}
            error={
              formik.touched.ArtistName && Boolean(formik.errors.ArtistName)
            }
            helperText={formik.touched.ArtistName && formik.errors.ArtistName}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="Description"
            value={formik.values.Description}
            onChange={formik.handleChange}
            error={
              formik.touched.Description && Boolean(formik.errors.Description)
            }
            helperText={formik.touched.Description && formik.errors.Description}
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
                  label="Scheduled Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  label="Scheduled Time"
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
              fileTypes="Post Image"
              fileExtensions="JPEG,PNG,WEBP,SVG"
              isCircular={false}
              width="100%"
              height="200px"
              file={formik.values.PostImage_URL}
              setFile={(file) => formik.setFieldValue("PostImage_URL", file)}
              aspectX={1}
              aspectY={1}
              shape="rect"
              error={
                formik.touched.PostImage_URL &&
                Boolean(formik.errors.PostImage_URL)
              }
            />
            {formik.touched.PostImage_URL && formik.errors.PostImage_URL && (
              <Typography color="error" variant="caption">
                {formik.errors.PostImage_URL}
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
        <Button onClick={() => handleConfirmOpen("schedule")} type="submit" color="primary">
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
          <Typography variant="body1">{formik.values.Description}</Typography>
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
