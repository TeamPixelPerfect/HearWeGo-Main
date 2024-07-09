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
import { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import DropFile from "../../components/DropFile";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { PressRelease } from "../../constants/models";

// Define your backend API endpoint for uploading files
const UPLOAD_ENDPOINT = "https://your-backend-api.com/upload";
// Define your backend API endpoint for fetching signed URLs
const SIGN_URL_ENDPOINT = "https://your-backend-api.com/sign-url";
// Define your backend API endpoint for uploading images
const UPLOAD_IMAGE_ENDPOINT = "https://your-backend-api.com/upload-image";

// PDF Document Component
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
});

const PDFDocument = ({ formData, logoData, signatureData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {logoData && (
          <Image src={logoData} style={{ width: 100, height: 100 }} />
        )}
        <Text>Headline: {formData.headline}</Text>
        <Text>Sub Headline: {formData.subHeadline}</Text>
        <Text>
          Event Date: {formData.date && formData.date.format("YYYY-MM-DD")}
        </Text>
        <Text>Venue: {formData.venue}</Text>
        <Text>Description: {formData.description}</Text>
        <Text>
          Release Date:{" "}
          {formData.releaseDate && formData.releaseDate.format("YYYY-MM-DD")}
        </Text>

        {signatureData && (
          <Image src={signatureData} style={{ width: 100, height: 100 }} />
        )}
      </View>
    </Page>
  </Document>
);

export default function PressReleasePage() {
  const [value, setValue] = useState<string>("1");
  const [formData, setFormData] = useState(null);
  const [logoData, setLogoData] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [savedItems, setSavedItems] = useState<PressReleaseDetails[]>([]); // State to manage saved items
  const [draftItems, setDraftItems] = useState([]);
  // State to manage drafts
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [savedItemsshared, setSavedItemsshared] = useState<
    PressReleaseDetails[]
  >([]); // State to manage shared items
  const [email, setEmail] = useState("");
  const [pressReleaseShared, setPressReleaseShared] = useState(false);

  const validationSchema = Yup.object({
    headline: Yup.string().required("Headline is required"),
    subHeadline: Yup.string().required("Sub Headline is required"),
    date: Yup.date().nullable().required("Event Date is required"),
    venue: Yup.string().required("Venue is required"),
    description: Yup.string().required("Description is required"),
    releaseDate: Yup.date().nullable().required("Release Date is required"),
    logo: Yup.string().required("Logo is required"),
    signature: Yup.string().required("Signature is required"),
  });

  const formik = useFormik({
    initialValues: {
      headline: "",
      subHeadline: "",
      date: null,
      venue: "",
      description: "",
      releaseDate: null,
      logo: "",
      signature: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setFormData(values);
      setOpenModal(true);
    },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    handleCloseModal();
  };

  const handleCancel = () => {
    // Show the confirmation modal
    setConfirmCancelOpen(true);
  };

  const handleCancelConfirmed = () => {
    // Close the confirmation modal
    setConfirmCancelOpen(false);

    // Check if more than two fields are filled
    const filledFields = Object.values(formik.values).filter(
      (value) => value !== null && value !== ""
    ).length;

    if (filledFields > 2) {
      // Save the current form data as a draft
      setDraftItems([...draftItems, formik.values]);
    }

    // Reset form values
    formik.resetForm();
  };

  const handleEditDraft = (draft) => {
    // Set formik values to edit the draft
    formik.setValues(draft);
    setValue("1"); // Assuming you have a state value for controlling tabs
  };

  const handleCancelRejected = () => {
    // Close the confirmation modal
    setConfirmCancelOpen(false);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue(field, file.name); // Or URL.createObjectURL(file) if you need a URL
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenDeleteDialog = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
    setConfirmDeleteOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setItemToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setSavedItems((prevItems) =>
        prevItems.filter((i) => i.id !== itemToDelete.id)
      );
      const updatedDrafts = draftItems.filter(
        (draft) => draft !== itemToDelete
      );
      setDraftItems(updatedDrafts);
      setItemToDelete(null);
    }
    setDeleteDialogOpen(false);
    setConfirmDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
    setItemToDelete(null);
  };

  const handleOpenShareDialog = () => {
    setShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // const handleSendPressRelease = () => {
  //   // Logic for sending the press release to the provided email address
  //   console.log(`Sending press release to: ${email}`);
  //   handleCloseShareDialog();
  // };

  const handleSendPressRelease = () => {
    if (email) {
      const sharedPressRelease = {
        ...formData,
        email: email,
        sharedDateTime: new Date().toLocaleString(),
      };
      // Update state immutably using spread operator
      setSavedItemsshared([...savedItemsshared, sharedPressRelease]);
      setPressReleaseShared(true);
    }
    setOpenModal(false);
    handleCloseShareDialog();
  };

  const deleteSharedItem = (itemToDelete) => {
    const updatedItems = savedItemsshared.filter(
      (item) => item.headline !== itemToDelete.headline
    );
    setSavedItemsshared(updatedItems);
  };

  const preloadImages = async () => {
    const logoResponse = await fetch(formik.values.logo); // Assuming formik.values.logo contains the URL of the logo image
    const logoBlob = await logoResponse.blob();
    const logoBase64 = await blobToBase64(logoBlob);

    const signatureResponse = await fetch(formik.values.signature); // Assuming formik.values.signature contains the URL of the signature image
    const signatureBlob = await signatureResponse.blob();
    const signatureBase64 = await blobToBase64(signatureBlob);

    setLogoData(logoBase64);
    setSignatureData(signatureBase64);
  };

  useEffect(() => {
    preloadImages();
  }, [formik.values.logo, formik.values.signature]);

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const fetchSignedUrl = async (fileName) => {
    try {
      const response = await fetch(`${SIGN_URL_ENDPOINT}?filename=${fileName}`);
      if (response.ok) {
        const data = await response.json();
        return { success: true, url: data.url };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error fetching signed URL:", error);
      return { success: false };
    }
  };

  const handleFileUpload = async (file, field) => {
    try {
      // Create a FormData object to send the file to the backend
      const formData = new FormData();
      formData.append("image", file);

      // Send a POST request to your backend API to upload the image
      const response = await fetch(UPLOAD_IMAGE_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      // If the upload is successful, set the image URL in the formik values
      if (response.ok) {
        const data = await response.json();
        formik.setFieldValue(field, data.imageUrl);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSave = () => {
    // Add the current formData to the saved items list
    setSavedItems([...savedItems, formData]);
    setOpenModal(false);
  };
  return (
    <Box sx={{ minWidth: 375, py: 3 }}>
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
                          <DropFile
                            fileTypes="Logo"
                            fileExtensions=".jpg, .jpeg, .png"
                            isCircular={false}
                            width="100%"
                            height="250px"
                            file={formik.values.logo}
                            setFile={(file) =>
                              formik.setFieldValue("logo", file)
                            }
                            aspectX={1}
                            aspectY={1}
                            shape="rect"
                            sx={{ margin: "20px" }}
                          />
                          {formik.touched.logo && formik.errors.logo ? (
                            <Typography color="error">
                              {formik.errors.logo}
                            </Typography>
                          ) : null}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Headline"
                              name="headline"
                              value={formik.values.headline}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              sx={{ marginTop: "20px" }}
                            />
                            {formik.touched.headline &&
                            formik.errors.headline ? (
                              <Typography color="error">
                                {formik.errors.headline}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Sub Headline"
                              name="subHeadline"
                              value={formik.values.subHeadline}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.subHeadline &&
                            formik.errors.subHeadline ? (
                              <Typography color="error">
                                {formik.errors.subHeadline}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Event Date"
                                value={formik.values.date}
                                onChange={(newDate) =>
                                  formik.setFieldValue("date", newDate)
                                }
                                renderInput={(params) => (
                                  <TextField fullWidth {...params} required />
                                )}
                              />
                            </LocalizationProvider>
                            {formik.touched.date && formik.errors.date ? (
                              <Typography color="error">
                                {formik.errors.date}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Venue"
                              name="venue"
                              value={formik.values.venue}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              sx={{ width: "100%" }}
                            />
                            {formik.touched.venue && formik.errors.venue ? (
                              <Typography color="error">
                                {formik.errors.venue}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Description"
                              name="description"
                              value={formik.values.description}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              multiline
                              rows={4}
                              sx={{ width: "100%" }}
                            />
                            {formik.touched.description &&
                            formik.errors.description ? (
                              <Typography color="error">
                                {formik.errors.description}
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
                                file={formik.values.signature}
                                setFile={(file) =>
                                  formik.setFieldValue("signature", file)
                                }
                                aspectX={1}
                                aspectY={1}
                                shape="rect"
                              />
                              {formik.touched.signature &&
                              formik.errors.signature ? (
                                <Typography color="error">
                                  {formik.errors.signature}
                                </Typography>
                              ) : null}
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ width: "100%" }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Release Date"
                                  value={formik.values.releaseDate}
                                  onChange={(newDate) =>
                                    formik.setFieldValue("releaseDate", newDate)
                                  }
                                  renderInput={(params) => (
                                    <TextField fullWidth {...params} required />
                                  )}
                                />
                              </LocalizationProvider>
                              {formik.touched.releaseDate &&
                              formik.errors.releaseDate ? (
                                <Typography color="error">
                                  {formik.errors.releaseDate}
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
                        onClick={formik.handleSubmit}
                        sx={{ mr: 2 }}
                      >
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Box>
                  </form>
                </Paper>
              </TabPanel>
              <TabPanel value="2">
                {savedItems.length > 0 ? (
                  savedItems.map((item, index) => (
                    <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h5">{item.headline}</Typography>
                      <Typography variant="body1">
                        {item.subHeadline}
                      </Typography>
                      <Typography variant="body2">
                        Event Date:{" "}
                        {item.date && item.date.format("YYYY-MM-DD")}
                      </Typography>
                      {/* Uncomment below lines for Venue and Description if needed */}
                      {/* <Typography variant="body2">Venue: {item.venue}</Typography> */}
                      {/* <Typography variant="body2">Description: {item.description}</Typography> */}
                      <Typography variant="body2">
                        Release Date:{" "}
                        {item.releaseDate &&
                          item.releaseDate.format("YYYY-MM-DD")}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "row",
                          gap: "3px",
                          // backgroundColor: "red",
                          justifyContent: "space-between",
                        }}
                      >
                        <PDFDownloadLink
                          document={
                            <PDFDocument
                              logoData={logoData}
                              formData={item}
                              signatureData={signatureData}
                            />
                          }
                          fileName={`${item.headline}.pdf`}
                        >
                          {({ loading }) =>
                            loading ? (
                              "Loading document..."
                            ) : (
                              <Button
                                variant="contained"
                                startIcon={<PictureAsPdfIcon />}
                                sx={{ width: "100%" }}
                              >
                                Download PDF
                              </Button>
                            )
                          }
                        </PDFDownloadLink>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "right",
                            gap: "5px",

                            // backgroundColor: "green",
                          }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleOpenDeleteDialog(item)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={handleOpenShareDialog}
                          >
                            {pressReleaseShared ? (
                              "Shared"
                            ) : (
                              <>
                                <ShareIcon /> Share
                              </>
                            )}
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1">
                    No saved press releases.
                  </Typography>
                )}
              </TabPanel>

              <TabPanel value="3">
                <Typography variant="h6" sx={{ margin: "10px" }}>
                  Drafts
                </Typography>
                <Grid container spacing={2}>
                  {draftItems.length > 0 ? (
                    draftItems.map((draft, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Paper
                          style={{
                            position: "relative",
                            padding: 16,
                            marginBottom: 8,
                            width: "100%",
                            height: "100%",
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ flexGrow: 1 }}>
                            <Typography variant="body1">
                              <strong>Headline:</strong> {draft.headline}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Sub Headline:</strong> {draft.subHeadline}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Date:</strong>{" "}
                              {draft.date && draft.date.format("YYYY-MM-DD")}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Venue:</strong> {draft.venue}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Description:</strong> {draft.description}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Release Date:</strong>{" "}
                              {draft.releaseDate &&
                                draft.releaseDate.format("YYYY-MM-DD")}
                            </Typography>
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: 16,
                              right: 16,
                            }}
                          >
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEditDraft(draft)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleOpenDeleteDialog(draft)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </Paper>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No drafts available.</Typography>
                  )}
                </Grid>
              </TabPanel>

              <TabPanel value="4">
                {savedItemsshared.length > 0 ? (
                  savedItemsshared.map((item, index) => (
                    <Paper
                      key={index}
                      elevation={3}
                      sx={{ p: 2, mb: 2, position: "relative" }}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleOpenDeleteDialog(item)}
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Typography variant="h5">{item.headline}</Typography>
                      <Typography variant="body1">
                        {item.subHeadline}
                      </Typography>
                      <Typography variant="body2">
                        Event Date:{" "}
                        {item.date && item.date.format("YYYY-MM-DD")}
                      </Typography>
                      <Typography variant="body2">
                        Shared with: {item.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      >
                        {dayjs().format("YYYY-MM-DD  HH:mm:ss")}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1">
                    No shared press releases.
                  </Typography>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Save Press Release
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to save this press release?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseModal} color="secondary" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={shareDialogOpen}
        onClose={handleCloseShareDialog}
        aria-labelledby="share-dialog-title"
        aria-describedby="share-dialog-description"
      >
        <DialogTitle id="share-dialog-title">Share Press Release</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShareDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendPressRelease} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Shared Item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this shared item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmCancelOpen}>
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel? Unsaved changes will be saved as a
            draft.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConfirmed} color="primary">
            Yes, Cancel
          </Button>
          <Button onClick={handleCancelRejected} color="primary" autoFocus>
            No, Don't Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Shared Item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this draft item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
