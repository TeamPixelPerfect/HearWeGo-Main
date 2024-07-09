"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField, {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SaveIcon from "@mui/icons-material/Save";
import DropFile from "../../components/DropFile";
import { useAppSelector } from "@/lib/hooks";
import { addPressRelease } from "../../services/PressReleaseServices";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const SchedulingTab = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [logoImg, setLogoImg] = useState<File | null>(null);
  const [signatureImg, setSignatureImg] = useState<File | null>(null);
  const [draftSavedSnackbarOpen, setDraftSavedSnackbarOpen] =
    useState<boolean>(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] =
    useState<boolean>(false);
  const [IsChanged, setIsChanged] = useState<boolean>(false);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);

  const handleSnackbarClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setDraftSavedSnackbarOpen(false);
    setSuccessSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      Headline: "",
      SubHeadline: "",
      EventDate: null,
      Venue: "",
      Description: "",
      ReleaseDate: null,
      ArtistLogo_URL: "",
      Signature: "",
      ArtistID: artist ? artist.user.artist_id : "",
      Status: "",
    },
    validationSchema: Yup.object({
      Headline: Yup.string().required("Headline is required"),
      SubHeadline: Yup.string().required("Sub Headline is required"),
      EventDate: Yup.date().nullable().required("Event Date is required"),
      Venue: Yup.string().required("Venue is required"),
      Description: Yup.string().required("Description is required"),
      ReleaseDate: Yup.date().nullable().required("Release Date is required"),
      ArtistLogo_URL: Yup.string().required("Logo is required"),
      Signature: Yup.string().required("Signature is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addPressRelease(artist ? artist.token : "", values);
        setSuccessSnackbarOpen(true);
        resetForm();
        setLogoImg(null);
        setSignatureImg(null);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (logoImg) {
      formik.setFieldValue("ArtistLogo_URL", logoImg);
    }
  }, [logoImg]);

  useEffect(() => {
    if (signatureImg) {
      formik.setFieldValue("Signature", signatureImg);
    }
  }, [signatureImg]);

  const handleSave = () => {
    formik
      .setFieldValue("Status", "Saved")
      .then(() => {
        formik.handleSubmit();
      })
      .finally(() => {
        setIsChanged(true);
      });
  };

  const handleCancel = async () => {
    setShowCancelDialog(false); // close dialog
    try {
      const draftData = {
        ...formik.values,
        Status: "Draft",
      };
      await addPressRelease(artist ? artist.token : "", draftData);
      setIsChanged(true);
      setDraftSavedSnackbarOpen(true);
      formik.resetForm();
      setLogoImg(null);
      setSignatureImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  const isFormFilled = () => {
    const {
      Headline,
      SubHeadline,
      EventDate,
      Venue,
      Description,
      ReleaseDate,
      ArtistLogo_URL,
      Signature,
    } = formik.values;
    return (
      Headline ||
      SubHeadline ||
      EventDate ||
      Venue ||
      Description ||
      ReleaseDate ||
      ArtistLogo_URL ||
      Signature
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box>
              <DropFile
                fileTypes="Logo"
                fileExtensions=".jpg, .jpeg, .png"
                isCircular={false}
                width="100%"
                height="250px"
                file={logoImg}
                setFile={setLogoImg}
                aspectX={1}
                aspectY={1}
                shape="rect"
              />
              {formik.touched.ArtistLogo_URL && formik.errors.ArtistLogo_URL ? (
                <Typography color="error">
                  {formik.errors.ArtistLogo_URL}
                </Typography>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={formik.values.Headline}
                  onChange={formik.handleChange}
                  label="Headline"
                  name="Headline"
                  onBlur={formik.handleBlur}
                  sx={{ marginTop: "20px" }}
                />
                {formik.touched.Headline && formik.errors.Headline ? (
                  <Typography color="error">
                    {formik.errors.Headline}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={formik.values.SubHeadline}
                  onChange={formik.handleChange}
                  label="SubHeadline"
                  name="SubHeadline"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.SubHeadline && formik.errors.SubHeadline ? (
                  <Typography color="error">
                    {formik.errors.SubHeadline}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Event Date"
                    value={formik.values.EventDate}
                    onChange={(date) => formik.setFieldValue("EventDate", date)}
                    renderInput={(
                      params: React.JSX.IntrinsicAttributes & {
                        variant?: TextFieldVariants | undefined;
                      } & Omit<
                          | OutlinedTextFieldProps
                          | FilledTextFieldProps
                          | StandardTextFieldProps,
                          "variant"
                        >
                    ) => (
                      <TextField
                        fullWidth
                        {...params}
                        name="EventDate"
                        onBlur={formik.handleBlur}
                      />
                    )}
                  />
                </LocalizationProvider>
                {formik.touched.EventDate && formik.errors.EventDate ? (
                  <Typography color="error">
                    {formik.errors.EventDate}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formik.values.Venue}
                  onChange={formik.handleChange}
                  label="Venue"
                  name="Venue"
                  sx={{ width: "100%" }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Venue && formik.errors.Venue ? (
                  <Typography color="error">{formik.errors.Venue}</Typography>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={formik.values.Description}
                  onChange={formik.handleChange}
                  label="Description"
                  name="Description"
                  onBlur={formik.handleBlur}
                  multiline
                  rows={4}
                  sx={{ width: "100%" }}
                />
                {formik.touched.Description && formik.errors.Description ? (
                  <Typography color="error">
                    {formik.errors.Description}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <DropFile
                    fileTypes="Signature"
                    fileExtensions=".jpg, .jpeg, .png"
                    isCircular={false}
                    width="100%"
                    height="160px"
                    file={signatureImg}
                    setFile={setSignatureImg}
                    aspectX={1}
                    aspectY={1}
                    shape="rect"
                  />
                  {formik.touched.Signature && formik.errors.Signature ? (
                    <Typography color="error">
                      {formik.errors.Signature}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Release Date"
                      value={formik.values.ReleaseDate}
                      onChange={(date) =>
                        formik.setFieldValue("ReleaseDate", date)
                      }
                      renderInput={(params: any) => (
                        <TextField
                          fullWidth
                          {...params}
                          name="ReleaseDate"
                          onBlur={formik.handleBlur}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {formik.touched.ReleaseDate && formik.errors.ReleaseDate ? (
                    <Typography color="error">
                      {formik.errors.ReleaseDate}
                    </Typography>
                  ) : null}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          {isFormFilled() && (
            <Button
              variant="outlined"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel
            </Button>
          )}
        </Box>
      </form>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Press Release successfully created!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={draftSavedSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="info"
        >
          Press Release saved as draft.
        </MuiAlert>
      </Snackbar>

      <Dialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel? Any unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCancelDialog(false)} color="primary">
            No, keep editing
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Yes, cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SchedulingTab;
