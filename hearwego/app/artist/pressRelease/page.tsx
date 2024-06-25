"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import DropFile from "../../components/DropFile";
import {
  addPressRelease,
  getPressReleasesByArtist,
} from "../../services/PressReleaseServices";
import { PressReleaseData } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { jsPDF } from "jspdf";
import { formatDate } from "@/app/constants/functions";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function PressRelease() {
  const artist = useAppSelector((state) => state.artist.user);
  const [value, setValue] = useState<string>("1");
  const [logoImg, setLogoImg] = useState<File | null>(null);
  const [signatureImg, setSignatureImg] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [draftSavedDialogOpen, setDraftSavedDialogOpen] =
    useState<boolean>(false);
  const [savedPressReleases, setSavedPressReleases] = useState<
    PressReleaseData[]
  >([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    if (artist?.token) {
      getPressReleasesByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((response) => {
          setSavedPressReleases(response.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [artist?.token, artist?.user?.artist_id]);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDraftSavedDialogClose = () => {
    setDraftSavedDialogOpen(false);
  };

  const generatePDF = (data: PressReleaseData) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.text(data.Headline, 20, 20);

    // Subtitle
    doc.setFontSize(16);
    doc.text(data.SubHeadline, 20, 30);

    // Event Date
    doc.setFontSize(14);
    doc.text(formatDate(data.EventDate as string), 20, 40);

    // Venue
    doc.text(data.Venue, 20, 50);

    // Description
    doc.setFontSize(12);
    doc.text(data.Description, 20, 60);

    // Release Date
    doc.text(
      `Release Date: ${formatDate(data.ReleaseDate as string)}`,
      20,
      100
    );

    // Artist Logo
    if (data.ArtistLogo_URL) {
      const img = new Image();
      img.src = data.ArtistLogo_URL;
      img.onload = () => {
        doc.addImage(img, "JPEG", 20, 110, 50, 50);

        // Signature
        if (data.Siganature) {
          const sigImg = new Image();
          sigImg.src = data.Siganature;
          sigImg.onload = () => {
            doc.addImage(sigImg, "JPEG", 20, 170, 50, 50);
            doc.save("_press_release.pdf");
          };
        } else {
          doc.save("press_release.pdf");
        }
      };
    } else {
      // Signature only
      if (data.Siganature) {
        const sigImg = new Image();
        sigImg.src = data.Siganature;
        sigImg.onload = () => {
          doc.addImage(sigImg, "JPEG", 20, 110, 50, 50);
          doc.save("press_release.pdf");
        };
      } else {
        doc.save("press_release.pdf");
      }
    }
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
      Siganature: "",
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
      Siganature: Yup.string().required("Signature is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addPressRelease(artist ? artist.token : "", values);
        setOpenDialog(true);
        resetForm();
        setLogoImg(null);
        setSignatureImg(null);
        setIsEdit(false);
        generatePDF(values); // Generate PDF after successful submission
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
      formik.setFieldValue("Siganature", signatureImg);
    }
  }, [signatureImg]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSave = () => {
    formik.setFieldValue("Status", "Saved");
    formik.handleSubmit();
  };

  const handleCancel = async () => {
    try {
      const draftData = {
        ...formik.values,
        Status: "Draft",
      };
      await addPressRelease(artist ? artist.token : "", draftData);
      setDraftSavedDialogOpen(true);
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
      Siganature,
    } = formik.values;
    return (
      Headline ||
      SubHeadline ||
      EventDate ||
      Venue ||
      Description ||
      ReleaseDate ||
      ArtistLogo_URL ||
      Siganature
    );
  };

  return (
    <Container maxWidth="xl">
      <Card
        variant="outlined"
        sx={{ maxWidth: 1200, mx: "auto", p: 3, boxShadow: 3 }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            Press Release
          </Typography>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TabList
                  onChange={handleTabChange}
                  aria-label="Press Release Tabs"
                >
                  <Tab label="Scheduling" value="1" />
                  <Tab label="Saved Ones" value="2" />
                  <Tab label="Drafts" value="3" />
                  <Tab label="Already Shared" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Paper elevation={3} sx={{ p: 3 }}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Box>
                          {/* DropFile component for logo */}
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
                            sx={{ margin: "30px" }}
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
                            {/* Headline TextField */}
                            <TextField
                              fullWidth
                              value={formik.values.Headline}
                              onChange={formik.handleChange}
                              label="Headline"
                              name="Headline"
                              onBlur={formik.handleBlur}
                              sx={{ marginTop: "20px" }}
                            />
                            {formik.touched.Headline &&
                            formik.errors.Headline ? (
                              <Typography color="error">
                                {formik.errors.Headline}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            {/* SubHeadline TextField */}
                            <TextField
                              fullWidth
                              value={formik.values.SubHeadline}
                              onChange={formik.handleChange}
                              label="SubHeadline"
                              name="SubHeadline"
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.SubHeadline &&
                            formik.errors.SubHeadline ? (
                              <Typography color="error">
                                {formik.errors.SubHeadline}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            {/* Event Date DatePicker */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Event Date"
                                value={formik.values.EventDate}
                                onChange={(date) =>
                                  formik.setFieldValue("EventDate", date)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    fullWidth
                                    {...params}
                                    name="EventDate"
                                    onBlur={formik.handleBlur}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                            {formik.touched.EventDate &&
                            formik.errors.EventDate ? (
                              <Typography color="error">
                                {formik.errors.EventDate}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            {/* Venue TextField */}
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
                            {/* Description TextField */}
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
                            {formik.touched.Description &&
                            formik.errors.Description ? (
                              <Typography color="error">
                                {formik.errors.Description}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box>
                              {/* DropFile component for signature */}
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
                              {formik.touched.Siganature &&
                              formik.errors.Siganature ? (
                                <Typography color="error">
                                  {formik.errors.Siganature}
                                </Typography>
                              ) : null}
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ width: "100%" }}>
                              {/* Release Date DatePicker */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Release Date"
                                  value={formik.values.ReleaseDate}
                                  onChange={(date) =>
                                    formik.setFieldValue("ReleaseDate", date)
                                  }
                                  renderInput={(params) => (
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
                      {/* Save Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        sx={{ mr: 2 }}
                      >
                        Save
                      </Button>
                      {/* Cancel Button */}
                      {isFormFilled() && (
                        <Button variant="outlined" onClick={handleCancel}>
                          Cancel
                        </Button>
                      )}
                    </Box>
                  </form>
                </Paper>
              </TabPanel>
              {/* Saved Ones Tab */}
              <TabPanel value="2">
                {savedPressReleases.length > 0 ? (
                  savedPressReleases.map((item, index) => (
                    <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h5">{item.Headline}</Typography>
                      <Typography variant="body1">
                        {item.SubHeadline}
                      </Typography>
                      <Typography variant="body2">
                        Event Date:{" "}
                        {item.EventDate && formatDate(item.EventDate as string)}
                      </Typography>

                      <Typography variant="body2">
                        Release Date:{" "}
                        {item.ReleaseDate &&
                          formatDate(item.ReleaseDate as string)}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => generatePDF(item)}
                        sx={{ mt: 2 }}
                      >
                        Download PDF
                      </Button>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1">
                    No saved press releases.
                  </Typography>
                )}
              </TabPanel>
              {/* Drafts Tab */}
              <TabPanel value="3">
                <Typography variant="h6" sx={{ margin: "10px" }}>
                  Drafts
                </Typography>
              </TabPanel>
              {/* Already Shared Tab */}
              <TabPanel value="4">
                <Typography>Already Shared</Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
      {/* Success Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Press Release successfully created!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* Draft Saved Dialog */}
      <Dialog
        open={draftSavedDialogOpen}
        onClose={handleDraftSavedDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Draft Saved"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Press Release saved as draft.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDraftSavedDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
