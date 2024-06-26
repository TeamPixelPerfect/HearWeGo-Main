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
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
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
  IconButton,
} from "@mui/material";
import { jsPDF } from "jspdf";
import { formatDate } from "@/app/constants/functions";
import { deletePressRelease } from "@/app/services/PressReleaseServices";

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
  const [DraftedPressReleases, setDraftedPressReleases] = useState<
    PressReleaseData[]
  >([]);
  const [error, setError] = useState<Error | null>(null);
  const [IsSavedDelete, setIsSavedDelete] = useState<boolean>(false);
  const [IsSaved, setIsSaved] = useState<boolean>(false);
  const [IsDraftedDelete, setIsDraftedDelete] = useState<boolean>(false);

  useEffect(() => {
    if (artist?.token) {
      getPressReleasesByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((response) => {
          const savedReleases = response.data.filter(
            (pr) => pr.Status === "Saved"
          );
          const draftedReleases = response.data.filter(
            (pr) => pr.Status === "Draft"
          );
          setSavedPressReleases(savedReleases);
          setDraftedPressReleases(draftedReleases);
        })
        .catch((error) => setError(error));
    }
  }, [
    artist?.token,
    artist?.user?.artist_id,
    IsSavedDelete,
    IsSaved,
    IsDraftedDelete,
  ]);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDraftSavedDialogClose = () => {
    setDraftSavedDialogOpen(false);
  };

  const generatePDF = async (data: PressReleaseData) => {
    const doc = new jsPDF();

    // Adding Artist Logo (Top Left)
    if (data.ArtistLogo_URL) {
      try {
        const imgLogo = await loadImage(data.ArtistLogo_URL);
        doc.addImage(imgLogo, 20, 10, 30, 30); // Adjust positioning as needed
      } catch (error) {
        console.error("Error loading artist logo:", error);
      }
    }

    // Header Section
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text("FOR IMMEDIATE RELEASE", 20, 70); // Left aligned

    // Title Section
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text(data.Headline, 20, 80); // Left aligned

    // Subtitle Section
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(16);
    doc.text(data.SubHeadline, 20, 90); // Left aligned

    // Date and Location Section
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`${formatDate(data.EventDate)} | ${data.Venue}`, 20, 100); // Left aligned

    // Line Separator
    doc.setLineWidth(0.5);
    doc.line(20, 110, 190, 110);

    // Body Section
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    const descriptionLines = doc.splitTextToSize(data.Description, 170);
    doc.text(descriptionLines, 20, 120);

    // Release Date
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Release Date: ${formatDate(data.ReleaseDate)}`, 20, 180);

    // Adding Signature
    if (data.Signature) {
      try {
        const imgSignature = await loadImage(data.Signature);
        doc.addImage(imgSignature, 20, 190, 30, 30);
      } catch (error) {
        console.error("Error loading signature:", error);
      }
    }

    // Contact Information Section
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    const contactY = data.Signature ? 230 : 200;
    doc.text("Contact Information", 20, contactY);
    doc.setFont("Helvetica", "bold");
    doc.text(artist?.user.artistName, 20, contactY + 10);
    doc.setFont("Helvetica", "normal");
    doc.text(`Phone: ${artist?.user.mobileNumber}`, 20, contactY + 20);
    doc.text(`Email: ${artist?.user.email}`, 20, contactY + 30);

    // Footer Section
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text(
      `Press Release generated on ${new Date().toLocaleDateString()}`,
      105,
      pageHeight - 10,
      { align: "center" }
    );

    // Save the PDF
    doc.save(`${data.Headline}_press_release.pdf`);
  };

  // Helper function to load image
  const loadImage = (url: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // This enables cross-origin image loading
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
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
        setOpenDialog(true);
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSave = () => {
    formik.setFieldValue("Status", "Saved");
    setIsSaved(true);
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
                              {formik.touched.Signature &&
                              formik.errors.Signature ? (
                                <Typography color="error">
                                  {formik.errors.Signature}
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
                    <Paper
                      key={index}
                      elevation={3}
                      sx={{
                        p: 2,
                        mb: 2,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "center", md: "flex-start" },
                        textAlign: { xs: "center", md: "left" },
                        bgcolor: "background.default",
                        borderRadius: 2,
                        boxShadow: 3,
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
                          width: 170,
                          height: 170,
                          mb: { xs: 2, md: 0 },
                          mr: { md: 2 },
                          borderRadius: "50%",
                          border: "2px solid #1976d2",
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
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
                          {item.EventDate &&
                            formatDate(item.EventDate.toString())}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Release Date:{" "}
                          {item.ReleaseDate &&
                            formatDate(item.ReleaseDate.toString())}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: { xs: "center", md: "flex-start" },
                            gap: 2,
                            mt: 2,
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => generatePDF(item)}
                            startIcon={<DownloadIcon />}
                            sx={{ textTransform: "none" }}
                          >
                            Download PDF
                          </Button>
                          <IconButton
                            color="secondary"
                            onClick={() => sharePressRelease(item)}
                            sx={{ textTransform: "none" }}
                          >
                            <ShareIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              deletePressRelease(
                                artist ? artist.token : "",
                                item.PressReleaseID as string
                              ).then(() => {
                                setIsSavedDelete(true);
                              });
                            }}
                            sx={{ textTransform: "none" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    No press releases saved.
                  </Typography>
                )}
              </TabPanel>
              {/* Drafts Tab */}
              <TabPanel value="3">
                {DraftedPressReleases.length > 0 ? (
                  DraftedPressReleases.map((item, index) => (
                    <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                      <img
                        src={item.ArtistLogo_URL}
                        alt="logo"
                        style={{ width: 50, height: 50, marginBottom: 10 }}
                      />
                      <Typography variant="h5">{item.Headline}</Typography>
                      <Typography variant="body1">
                        {item.SubHeadline}
                      </Typography>
                      <Typography variant="body2">
                        Event Date:{" "}
                        {item.EventDate &&
                          formatDate(item.EventDate.toString())}
                      </Typography>
                      <Typography variant="body2">
                        Release Date:{" "}
                        {item.ReleaseDate &&
                          formatDate(item.ReleaseDate.toString())}
                      </Typography>

                      <Button
                        variant="outlined"
                        onClick={() => {
                          deletePressRelease(
                            artist ? artist.token : "",
                            item.PressReleaseID as string
                          ).then(() => {
                            setIsDraftedDelete(true);
                          });
                        }}
                        sx={{ mt: 2 }}
                      >
                        Delete
                      </Button>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="h6">
                    No drafted press releases saved.
                  </Typography>
                )}
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
