"use client";

import React, { useEffect, useState } from "react";
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
import {
  addPRPost,
  getPRCampaignsByArtist,
} from "../../../services/PrServices";
import { PRPosts, PRCampaigns } from "../../../constants/models";
import { useAppSelector } from "@/lib/hooks";

interface CreatePostProps {
  open: boolean;
  onClose: () => void;
  setIsChanged: (value: boolean) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({
  open,
  onClose,
  setIsChanged,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<"postNow" | "schedule">();
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);
  const [prPostImage, setPrPostImage] = useState<File | null>(null);
  const [campaignNames, setCampaignNames] = useState<PRCampaigns[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (artist?.token) {
      getPRCampaignsByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((response) => {
          const filteredCampaigns = response.data.filter(
            (campaign: { CampaignStatus: string }) =>
              campaign.CampaignStatus !== "completed"
          );
          setCampaignNames(filteredCampaigns);
        })
        .catch((error) => setError(error));
    }
  }, [artist?.token, artist?.user?.artist_id]);

  const formik = useFormik({
    initialValues: {
      artist_id: artist?.user.artist_id || "",
      ArtistName: artist?.user.artistName || "",
      Description: "",
      Campaigns: "",
      Scheduled_Date: "",
      Scheduled_Time: "",
      SocialMedias: [],
      PostImage_URL: "",
      CampaignID: "",
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
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Form Values: ", values);
        await addPRPost(artist?.token ? artist.token : "", values);
        setSnackbarMessage(
          confirmAction === "postNow"
            ? "Post Created Successfully!"
            : "Post Scheduled Successfully!"
        );
        setPrPostImage(null);
        setSnackbarOpen(true);
        onClose();
        resetForm();
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedSocialMedia([]);
      } catch (error) {
        setErrorMessage("Error submitting post: " + error.message);
        setErrorOpen(true);
      }
    },
  });

  useEffect(() => {
    if (prPostImage) {
      formik.setFieldValue("PostImage_URL", prPostImage);
    }
  }, [prPostImage]);

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
    if (confirmed) {
      formik.submitForm().then(() => setIsChanged(true));
      setConfirmOpen(false);
    }
    setConfirmOpen(false);
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleCancel = () => {
    onClose();
    formik.resetForm();
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedSocialMedia([]);
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="What's On Your Mind?"
                multiline
                rows={4}
                variant="outlined"
                name="Description"
                value={formik.values.Description}
                onChange={formik.handleChange}
                error={
                  formik.touched.Description &&
                  Boolean(formik.errors.Description)
                }
                helperText={
                  formik.touched.Description && formik.errors.Description
                }
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="campaign-label">Select the Campaign</InputLabel>
                <Select
                  labelId="campaign-label"
                  id="campaign-select"
                  name="Campaigns"
                  value={formik.values.Campaigns}
                  onChange={(event) => {
                    const selectedCampaign = campaignNames.find(
                      (campaign) =>
                        campaign.Campaign_Name === event.target.value
                    );
                    formik.setFieldValue("Campaigns", event.target.value);
                    formik.setFieldValue(
                      "CampaignID",
                      selectedCampaign?.CampaignID
                    );
                  }}
                  error={
                    formik.touched.Campaigns && Boolean(formik.errors.Campaigns)
                  }
                >
                  {campaignNames
                    .filter(
                      (campaign) => campaign.CampaignStatus !== "completed"
                    )
                    .map((campaign) => (
                      <MenuItem
                        key={campaign.CampaignID}
                        value={campaign.Campaign_Name}
                      >
                        {campaign.Campaign_Name}
                      </MenuItem>
                    ))}
                </Select>
                {formik.touched.Campaigns && formik.errors.Campaigns && (
                  <Typography color="error" variant="caption">
                    {formik.errors.Campaigns}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <Typography variant="subtitle1">
                  Select Social Media Platforms
                </Typography>
                {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
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
                      label={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    />
                  )
                )}
                {formik.touched.SocialMedias && formik.errors.SocialMedias && (
                  <Typography color="error" variant="caption">
                    {formik.errors.SocialMedias}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Input The Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          error={
                            formik.touched.Scheduled_Date &&
                            Boolean(formik.errors.Scheduled_Date)
                          }
                          helperText={
                            formik.touched.Scheduled_Date &&
                            formik.errors.Scheduled_Date
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TimePicker
                      label="Input The Time"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          error={
                            formik.touched.Scheduled_Time &&
                            Boolean(formik.errors.Scheduled_Time)
                          }
                          helperText={
                            formik.touched.Scheduled_Time &&
                            formik.errors.Scheduled_Time
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DropFile
                  fileTypes="Post Image"
                  fileExtensions="JPEG,PNG,WEBP,SVG"
                  isCircular={false}
                  width="80%"
                  height="220px"
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
                {formik.touched.PostImage_URL &&
                  formik.errors.PostImage_URL && (
                    <Typography color="error" variant="caption">
                      {formik.errors.PostImage_URL}
                    </Typography>
                  )}
              </Box>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handlePreviewOpen} color="primary">
              Preview
            </Button>
            <Button
              onClick={() => handleConfirmOpen("postNow")}
              color="primary"
            >
              Post Now
            </Button>
            <Button
              onClick={() => handleConfirmOpen("schedule")}
              color="primary"
              disabled={!selectedDate || !selectedTime}
            >
              Schedule
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
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
            {confirmAction === "postNow" ? "post" : "schedule"} this post?
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
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {formik.values.Description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                {formik.values.Campaigns}
              </Typography>
            </Grid>
            {prPostImage && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <img
                    src={prPostImage as unknown as string}
                    alt="Post Preview"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Social Media Platforms:
              </Typography>
              <Box
                component="ul"
                sx={{ listStyleType: "disc", paddingLeft: 2 }}
              >
                {selectedSocialMedia.map((platform) => (
                  <Typography component="li" key={platform}>
                    {platform}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Date:
              </Typography>
              <Typography variant="body2">
                {selectedDate?.toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Time:
              </Typography>
              <Typography variant="body2">
                {selectedTime?.toLocaleTimeString()}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default CreatePost;
