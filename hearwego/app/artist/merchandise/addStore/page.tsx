"use client";

import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Container,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropFile from "../../../components/DropFile";
import { useRouter } from "next/navigation";
import { addMerchStore } from "../../../services/StoreServices";
import { MerchStore } from "../../../constants/models";
import { useAppSelector } from "@/lib/hooks";

const CreateStoreForm = () => {
  const artist = useAppSelector((state) => state.artist.user);

  const router = useRouter();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [storeData, setStoreData] = useState<MerchStore>({
    store_banner: "",
    promo_banner: ["", "", ""],
    store_description: "",
    shipping_fees: "",
    delivery_services: "",
    artist_id: "ar4",
  });

  const [storeBanner, setStoreBanner] = useState<File | null>(null);
  const [promoBanners, setPromoBanners] = useState<(File | null)[]>([null, null, null]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const submitData = async (values: MerchStore) => {
    try {
      await addMerchStore(artist.token, values);
      setSnackbarOpen(true); // Show success message
      setTimeout(() => {
        router.push("/artist/merchandise");
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    router.push("/artist/merchandise");
  };

  const validationSchema = Yup.object().shape({
    store_banner: Yup.mixed().required("Store banner is required"),
    store_description: Yup.string()
      .required("Store description is required")
      .min(20, "Store description should be at least 20 characters"),
    shipping_fees: Yup.string().required("Shipping fees are required"),
    delivery_services: Yup.string().required("Delivery services are required"),
    promo_banner: Yup.array().of(
      Yup.mixed().required("Promo banner is required")
    ),
  });

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Card sx={{ padding: 3 }}>
          <Formik
            initialValues={storeData}
            validationSchema={validationSchema}
            onSubmit={submitData}
          >
            {({ setFieldValue, handleChange }) => (
              <Form>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  Create Your Store
                </Typography>

                <Grid item xs={12} sm={4}>
                  <Field name="store_banner">
                    {({ field }) => (
                      <DropFile
                        fileTypes="image"
                        fileExtensions="jpg, jpeg, png"
                        isCircular={false}
                        width="100%"
                        height="400px"
                        file={storeBanner}
                        setFile={(file) => {
                          setStoreBanner(file);
                          setFieldValue("store_banner", file);
                        }}
                        aspectX={16}
                        aspectY={9}
                        shape="rect"
                        style={{
                          borderRadius: 10,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="store_banner" component="div" style={{ color: 'red' }} />
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field name="store_description">
                      {({ field }) => (
                        <TextField
                          {...field}
                          onChange={handleChange}
                          label="Store Description"
                          variant="outlined"
                          multiline
                          rows={4}
                          sx={{ width: "100%", marginTop: "30px" }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="store_description" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="shipping_fees">
                      {({ field }) => (
                        <TextField
                          {...field}
                          onChange={handleChange}
                          label="Shipping Fees"
                          variant="outlined"
                          multiline
                          sx={{ width: "100%" }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="shipping_fees" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="delivery_services">
                      {({ field }) => (
                        <TextField
                          {...field}
                          onChange={handleChange}
                          label="Delivery Services"
                          variant="outlined"
                          multiline
                          sx={{ width: "100%" }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="delivery_services" component="div" style={{ color: 'red' }} />
                  </Grid>

                  
                  {promoBanners.map((promoBanner, index) => (
                    
                    <Grid item xs={4}  key={index}>
                      <Field name={`promo_banner.${index}`}>
                        {({ field }) => (
                          <DropFile
                            fileTypes="image"
                            fileExtensions="jpg, jpeg, png"
                            isCircular={false}
                            width="100%"
                            height="200px"
                            file={promoBanner}
                            setFile={(file) => {
                              const updatedPromoBanners = [...promoBanners];
                              updatedPromoBanners[index] = file;
                              setPromoBanners(updatedPromoBanners);
                              setFieldValue(`promo_banner.${index}`, file);
                            }}
                            aspectX={16}
                            aspectY={9}
                            shape="rect"
                            style={{
                              borderRadius: 10,
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          />
                        )}
                      </Field>
                      <ErrorMessage name={`promo_banner.${index}`} component="div" style={{ color: 'red' }} />
                      </Grid> 
                  ))}
                  
                  <Grid item xs={12}>
                    <Grid container justifyContent="flex-end">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        Create Store
                      </Button>
                      <Button variant="outlined" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Card>

        <Dialog
          open={confirmDialogOpen}
          onClose={handleConfirmClose}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Are you sure you want to cancel? Any unsaved changes will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
              No
            </Button>
            <Button onClick={handleCancel} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            Successfully Created!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CreateStoreForm;
