"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField, {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getPressReleasesByArtist,
  deletePressRelease,
  updatePressRelease,
} from "../../services/PressReleaseServices";
import { useAppSelector } from "@/lib/hooks";
import { formatDate } from "@/app/constants/functions";
import { PressReleaseData } from "@/app/constants/models";
import DropFile from "@/app/components/DropFile";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const DraftsTab = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [DraftedPressReleases, setDraftedPressReleases] = useState<
    PressReleaseData[]
  >([]);
  const [IsChanged, setIsChanged] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentPressRelease, setCurrentPressRelease] =
    useState<PressReleaseData | null>(null);

  const formik = useFormik({
    initialValues: {
      ArtistLogo_URL: "",
      Headline: "",
      SubHeadline: "",
      EventDate: null,
      Venue: "",
      Description: "",
      Signature: "",
      ReleaseDate: null,
    },
    validationSchema: Yup.object({
      ArtistLogo_URL: Yup.string().required("Artist logo is required"),
      Headline: Yup.string().required("Headline is required"),
      SubHeadline: Yup.string().required("SubHeadline is required"),
      EventDate: Yup.date().required("Event Date is required"),
      Venue: Yup.string().required("Venue is required"),
      Description: Yup.string().required("Description is required"),
      Signature: Yup.string().required("Signature is required"),
      ReleaseDate: Yup.date().required("Release Date is required"),
    }),
    onSubmit: async (values) => {
      try {
        const updatedPressRelease = {
          ...currentPressRelease,
          ...values,
          Status: "Saved",
        };
        await updatePressRelease(
          artist ? artist.token : "",
          updatedPressRelease.PressReleaseID as string,
          updatedPressRelease
        );
        setOpenDialog(false);
        setIsChanged(true);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  });

  useEffect(() => {
    if (artist?.token) {
      getPressReleasesByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((response) => {
          const draftedReleases = response.data.filter(
            (pr: any) => pr.Status === "Draft"
          );
          setDraftedPressReleases(draftedReleases);
          if (IsChanged) setIsChanged(false);
        })
        .catch((error) => console.error(error));
    }
  }, [artist?.token, artist?.user?.artist_id, IsChanged]);

  const handleDelete = (id: any) => {
    deletePressRelease(artist ? artist.token : "", id)
      .then((res) => {
        setIsChanged(true);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (pressRelease: PressReleaseData) => {
    setCurrentPressRelease(pressRelease);
    formik.setValues({
      ArtistLogo_URL: pressRelease.ArtistLogo_URL || "",
      Headline: pressRelease.Headline || "",
      SubHeadline: pressRelease.SubHeadline || "",
      EventDate: pressRelease.EventDate || null,
      Venue: pressRelease.Venue || "",
      Description: pressRelease.Description || "",
      Signature: pressRelease.Signature || "",
      ReleaseDate: pressRelease.ReleaseDate || null,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = async (values: any, isCancel = false) => {
    try {
      if (!isCancel) {
        const updatedPressRelease = {
          ...currentPressRelease,
          ...values,
          Status: "Draft",
        };
        await updatePressRelease(
          artist ? artist.token : "",
          updatedPressRelease.PressReleaseID as string,
          updatedPressRelease
        );
        setIsChanged(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setOpenDialog(false);
      setCurrentPressRelease(null);
      formik.resetForm();
    }
  };

  return (
    <>
      {DraftedPressReleases.length > 0 ? (
        <Grid container spacing={2}>
          {DraftedPressReleases.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  bgcolor: "background.default",
                  borderRadius: 2,
                  boxShadow: 3,
                  height: "auto",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.ArtistLogo_URL}
                  alt="logo"
                  sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    borderRadius: "50%",
                    border: "2px solid #1976d2",
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {item.Headline}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  {item.SubHeadline}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Event Date:{" "}
                  {item.EventDate && formatDate(item.EventDate.toString())}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Release Date:{" "}
                  {item.ReleaseDate && formatDate(item.ReleaseDate.toString())}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <IconButton color="primary" onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      handleDelete(item?.PressReleaseID);
                    }}
                    sx={{ textTransform: "none" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          No drafted press releases saved.
        </Typography>
      )}

      <Dialog
        open={openDialog}
        onClose={() => handleCloseDialog({ isCancel: true })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Press Release</DialogTitle>
        <DialogContent>
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
                    file={formik.values.ArtistLogo_URL}
                    setFile={(file) =>
                      formik.setFieldValue("ArtistLogo_URL", file)
                    }
                    aspectX={1}
                    aspectY={1}
                    shape="rect"
                  />
                  {formik.touched.ArtistLogo_URL &&
                  formik.errors.ArtistLogo_URL ? (
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
                        onChange={(date) =>
                          formik.setFieldValue("EventDate", date)
                        }
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
                      <Typography color="error">
                        {formik.errors.Venue}
                      </Typography>
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
                        file={formik.values.Signature}
                        setFile={(file) =>
                          formik.setFieldValue("Signature", file)
                        }
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
                              name="ReleaseDate"
                              onBlur={formik.handleBlur}
                            />
                          )}
                        />
                      </LocalizationProvider>
                      {formik.touched.ReleaseDate &&
                      formik.errors.ReleaseDate ? (
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
                type="submit"
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCloseDialog({ isCancel: true })}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DraftsTab;
