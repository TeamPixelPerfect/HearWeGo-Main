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
import { useTheme } from "@mui/material/styles";
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
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);
  const theme = useTheme();

  const [prPostImage, setPrPostImage] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      ArtistName: artist?.user.artistName || "",
      Description: "",
      Campaigns: "",
      Scheduled_Date: new Date(),
      Scheduled_Time: "",
      SocialMedias: [],
      PostImage_URL: "",
      CampaignID: "PRCamp33",
    },
    validationSchema: Yup.object({
      ArtistName: Yup.string().required("Artist Name is required"),
      Description: Yup.string().required("Description is required"),
      Campaigns: Yup.string().required("Campaign is required"),
      Scheduled_Date: Yup.date().required("Scheduled Date is required"),
      Scheduled_Time: Yup.string().required("Scheduled Time is required"),
      SocialMedias: Yup.array()
        .of(Yup.string())
        .min(1, "Select at least one social media platform"),
      PostImage_URL: Yup.string().required("Post Image is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const prPostData: PRPosts = {
        ...values,
        Scheduled_Date: selectedDate,
        Scheduled_Time: selectedTime?.toLocaleTimeString() || "",
        SocialMedias: selectedSocialMedia,
        PostImage_URL: prPostImage ? URL.createObjectURL(prPostImage) : "",
      };

      try {
        await addPRPost(artist?.token ? artist.token : "", prPostData);
        setSnackbarMessage(
          confirmAction === "postNow"
            ? "Post Created Successfully!"
            : "Post Scheduled Successfully!"
        );
        setSnackbarOpen(true);
        onClose();
        router.push("/artist/publicRelationCampaigns");
        resetForm(); // Optionally reset form after successful submission
      } catch (error) {
        console.error("Error submitting post:", error);
        // Handle error state or display error message
      }
    },
  });

  const handlePostSubmit = async () => {
    try {
      await formik.handleSubmit();
    } catch (error) {
      console.error("Error submitting post:", error);
      // Handle error state or display error message
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    formik.setFieldValue("Scheduled_Date", date);
  };

  const handleTimeChange = (time: Date | null) => {
    setSelectedTime(time);
    formik.setFieldValue("Scheduled_Time", time?.toLocaleTimeString() || "");
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
    formik.setFieldValue(
      "SocialMedias",
      selectedSocialMedia.includes(value)
        ? selectedSocialMedia.filter((item) => item !== value)
        : [...selectedSocialMedia, value]
    );
  };

  const handleConfirmOpen = (action: "postNow" | "schedule") => {
    setConfirmAction(action);
    setConfirmOpen(true);
  };

  const handleConfirmClose = (confirmed: boolean) => {
    // setConfirmOpen(false);
    console.log(confirmed, "confirmed");
    if (confirmed) {
      console.log("confirmed");
      formik.handleSubmit();
    } else {
      setConfirmOpen(false);
    }
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
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
            <InputLabel id="campaign-label">Select the Campaign</InputLabel>
            <Select
              labelId="campaign-label"
              id="campaign-select"
              name="Campaigns"
              value={formik.values.Campaigns}
              onChange={formik.handleChange}
              error={
                formik.touched.Campaigns && Boolean(formik.errors.Campaigns)
              }
            >
              <MenuItem value="Campaign_01">Campaign_01</MenuItem>
              <MenuItem value="Campaign_02">Campaign_02</MenuItem>
              <MenuItem value="Campaign_03">Campaign_03</MenuItem>
            </Select>
            {formik.touched.Campaigns && formik.errors.Campaigns && (
              <Typography color="error" variant="caption">
                {formik.errors.Campaigns}
              </Typography>
            )}
          </FormControl>
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Select Social Media Platforms
            </Typography>
            {["facebook", "twitter", "linkedin", "instagram"].map(
              (platform) => (
                <FormControlLabel
                  key={platform}
                  control={
                    <Checkbox
                      checked={selectedSocialMedia.includes(platform)}
                      onChange={handleSocialMediaChange}
                      name={platform}
                    />
                  }
                  label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                />
              )
            )}
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
              file={prPostImage}
              setFile={setPrPostImage}
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
          <Typography variant="h6">{formik.values.Campaigns}</Typography>
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
