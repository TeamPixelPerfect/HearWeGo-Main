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


import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

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

interface PressReleaseDetails {
  headline: string;
  subHeadline: string;
  date: Dayjs | null;
  venue: string;
  description: string;
  releaseDate: Dayjs | null;
  logo: string;
  signature: string;
}

export default function PressRelease() {
  const [value, setValue] = useState<string>("1");
  const [formData, setFormData] = useState(null);
  const [logoData, setLogoData] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [savedItems, setSavedItems] = useState<PressReleaseDetails[]>([]); // State to manage saved items
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
  const [itemToDelete, setItemToDelete] = useState(null); 
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [savedItemsshared, setSavedItemsshared] = useState<PressReleaseDetails[]>([]); // State to manage shared items
const [email, setEmail] = useState("");

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
    // Reset form values or navigate away
    formik.resetForm();
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
  };

  const handleCloseDeleteDialog = () => {
    setItemToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setSavedItems((prevItems) => prevItems.filter((i) => i.id !== itemToDelete.id));
    }
    setDeleteDialogOpen(false);
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
    // Logic for sending the press release to the provided email address
    console.log(`Sending press release to: ${email}`);
    
    // Only save to "Already Shared" if the email is provided
    if (email) {
      const sharedPressRelease = { ...formData, email: email };
      setSavedItemsshared([sharedPressRelease]); // Set the new state directly without concatenation
    }
  
    setOpenModal(false);
    handleCloseShareDialog();
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
                            file={formik.values.logo} // Pass the logo value from formik
                            setFile={(file) =>
                              formik.setFieldValue("logo", file)
                            } // Set the logo value in formik
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
                              sx={{ width: "50%" }}
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
                              {/* Include DropFile component for Signature */}
                              <DropFile
                                fileTypes="Signature"
                                fileExtensions=".jpg, .jpeg, .png"
                                isCircular={false}
                                width="100%"
                                height="160px"
                                file={formik.values.signature} // Pass the signature value from formik
                                setFile={(file) =>
                                  formik.setFieldValue("signature", file)
                                } // Set the signature value in formik
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
                          <Grid item xs={10}>
                            <Box
                              sx={{
                                width: "100%",
                                marginTop: "5px",
                              }}
                            >
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
              {/* Placeholder panels for other tabs */}
              <TabPanel value="2">
                {savedItems.length > 0 ? (
                  savedItems.map((item, index) => (
                    <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="h5">{item.headline}</Typography>
                      <Typography variant="body1">{item.subHeadline}</Typography>
                      <Typography variant="body2">
                        Event Date: {item.date && item.date.format("YYYY-MM-DD")}
                      </Typography>
                      {/* <Typography variant="body2">Venue: {item.venue}</Typography> */}
                      {/* <Typography variant="body2">Description: {item.description}</Typography> */}
                      <Typography variant="body2">
                        Release Date: {item.releaseDate && item.releaseDate.format("YYYY-MM-DD")}
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                       
                        <PDFDownloadLink
                          document={<PDFDocument  logoData={logoData} formData={item} signatureData={signatureData} />}
                          fileName={`${item.headline}.pdf`}
                        >
                          {({ loading }) =>
                            loading ? "Loading document..." : <Button variant="contained" startIcon={<PictureAsPdfIcon />}>Download PDF</Button>
                          }
                        </PDFDownloadLink>
                        <Box sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // backgroundColor: "red",
                        
                        }}>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleOpenDeleteDialog(item)}
                          sx={{margin: "3px"}}
                        >
                          Delete
                        </Button>
                        <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleOpenShareDialog}  sx={{margin: "3px"}}>
                          Share
                        </Button>
                        </Box>
                      </Box>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1">No saved press releases.</Typography>
                )}
              </TabPanel>

              <TabPanel value="3">
                <Typography>Drafts content goes here...</Typography>
              </TabPanel>
              <TabPanel value="4">
  {savedItemsshared.length > 0 ? (
    savedItemsshared.map((item, index) => (
      <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5">{item.headline}</Typography>
        <Typography variant="body1">{item.subHeadline}</Typography>
        <Typography variant="body2">
          Event Date: {item.date && item.date.format("YYYY-MM-DD")}
        </Typography>
        {/* Include rendering of other press release details */}
        <Typography variant="body2">Shared with: {item.email}</Typography>
        {/* Include rendering of other press release details */}
      </Paper>
    ))
  ) : (
    <Typography variant="body1">No shared press releases.</Typography>
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
            <Button
              onClick={handleCloseModal}
              color="secondary"
              sx={{ mr: 2 }}
            >
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
    </Box>
  );
}