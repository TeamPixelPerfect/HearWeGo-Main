"use client";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Container,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { use, useState } from "react";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import DropFile from "@/app/components/DropFile";
import { useRouter } from "next/navigation";
import { MerchProduct } from "../../../constants/models";
import { addMerchProduct } from "../../../services/StoreServices";
import { useAppSelector } from "@/lib/hooks";
import { set } from "date-fns";

const validationSchema = Yup.object({
  product_name: Yup.string().required("Product title is required"),
  product_description: Yup.string().required("Product description is required"),
  catagory_name: Yup.string().required("Product category is required"),
  product_rating: Yup.string().required("Product category is required"),
  product_price: Yup.string().required("Price is required"),
  product_quantity: Yup.string()
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),
  product_Main_image: Yup.mixed().required("Main product image is required"),
  product_Additional_image: Yup.mixed().required(
    "Additional product image is required"
  ),
});

const AddProduct = ({
  handleAddProduct,
}: {
  handleAddProduct: (values: any) => void;
}) => {
  const artist = useAppSelector((state) => state.artist.user);
  const router = useRouter();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleClose = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    router.push("../merchandise");
  };

  const [productData, setProductData] = useState<MerchProduct>({
    product_name: "",
    product_description: "",
    product_Main_image: "",
    product_Additional_image: "",
    catagory_name: "",
    product_price: "",
    product_quantity: "",
    product_rating: "",
    store_id: "st20",
  });

  const [productMainImage, setProductMainImage] = useState<File | null>(null);
  const [productAdditionalImage, setProductAdditionalImage] =
    useState<File | null>(null);

  useEffect(() => {
    if (productMainImage) {
      setProductData({ ...productData, product_Main_image: productMainImage });
    }
  }, [productMainImage]);

  useEffect(() => {
    if (productAdditionalImage) {
      setProductData({
        ...productData,
        product_Additional_image: productAdditionalImage,
      });
    }
  }, [productAdditionalImage]);

  const submitData = async () => {
    try {
      const res = await addMerchProduct(artist.token, productData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Card sx={{ display: "flex", flexDirection: "column", p: 3 }}>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Add New Product
            </Typography>
            <Formik
              initialValues={{
                product_name: "",
                product_description: "",
                catagory_name: "",
                product_rating: "",
                product_price: "",
                product_quantity: "",
                product_Main_image: "",
                product_Additional_image: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleConfirmClose();
                // handleAddProduct(values);
                setSubmitting(false);
                setSnackbarMessage("Product added successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
              }}
            >
              {({
                handleSubmit,
                isSubmitting,
                errors,
                touched,
                values,
                handleChange,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      container
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          width: "90%", // Adjust width here
                        }}
                      >
                        <DropFile
                          fileTypes="Main Product Image"
                          fileExtensions="JPEG,PNG,WEBP,SVG"
                          isCircular={false}
                          width="100%"
                          height="200px"
                          file={productMainImage}
                          setFile={setProductMainImage}
                          aspectX={1}
                          aspectY={1}
                          shape="rect"
                          error={
                            touched.product_Main_image &&
                            errors.product_Main_image
                          }
                        />
                        {touched.product_Main_image &&
                          errors.product_Main_image && (
                            <Typography variant="body2" color="error">
                              {errors.product_Main_image}
                            </Typography>
                          )}
                        <DropFile
                          fileTypes="Additional Product Image"
                          fileExtensions="JPEG,PNG,WEBP,SVG"
                          isCircular={false}
                          width="100%"
                          height="200px"
                          file={productAdditionalImage}
                          setFile={setProductAdditionalImage}
                          aspectX={1}
                          aspectY={1}
                          shape="rect"
                          error={
                            touched.product_Additional_image &&
                            errors.product_Additional_image
                          }
                        />
                        {touched.product_Additional_image &&
                          errors.product_Additional_image && (
                            <Typography variant="body2" color="error">
                              {errors.product_Additional_image}
                            </Typography>
                          )}
                      </CardMedia>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            value={productData.product_name}
                            onChange={(e) =>
                              setProductData({
                                ...productData,
                                product_name: e.target.value,
                              })
                            }
                            name="title"
                            type="text"
                            label="Product Title"
                            variant="outlined"
                            fullWidth
                            error={
                              touched.product_name && !!errors.product_name
                            }
                            helperText={
                              touched.product_name && errors.product_name
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={productData.product_description}
                            onChange={(e) =>
                              setProductData({
                                ...productData,
                                product_description: e.target.value,
                              })
                            }
                            name="description"
                            type="text"
                            label="Product Description"
                            variant="outlined"
                            fullWidth
                            error={
                              touched.product_description &&
                              !!errors.product_description
                            }
                            helperText={
                              touched.product_description &&
                              errors.product_description
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={productData.catagory_name}
                            onChange={(e) =>
                              setProductData({
                                ...productData,
                                catagory_name: e.target.value,
                              })
                            }
                            name="category"
                            type="text"
                            label="Product Category"
                            variant="outlined"
                            fullWidth
                            error={
                              touched.catagory_name && !!errors.catagory_name
                            }
                            helperText={
                              touched.catagory_name && errors.catagory_name
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            value={productData.product_rating}
                            onChange={(e) =>
                              setProductData({
                                ...productData,
                                product_rating: e.target.value,
                              })
                            }
                            name="rate"
                            type="text"
                            label="Product rate"
                            variant="outlined"
                            fullWidth
                            error={
                              touched.product_rating && !!errors.product_rating
                            }
                            helperText={
                              touched.product_rating && errors.product_rating
                            }
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextField
                            value={productData.product_price}
                            onChange={(e) =>
                              setProductData({
                                ...productData,
                                product_price: e.target.value,
                              })
                            }
                            name="price"
                            type="number"
                            label="Price"
                            variant="outlined"
                            fullWidth
                            error={
                              touched.product_price && !!errors.product_price
                            }
                            helperText={
                              touched.product_price && errors.product_price
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            value={productData.product_quantity}
                            onChange={(e) =>
                              setProductData({
                                ...productData,
                                product_quantity: e.target.value,
                              })
                            }
                            name="quantity"
                            type="number"
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            error={
                              touched.product_quantity &&
                              !!errors.product_quantity
                            }
                            helperText={
                              touched.product_quantity &&
                              errors.product_quantity
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={submitData}
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        Add Product
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>

      {/* Confirmation Dialog for Cancel */}
      <Dialog open={confirmDialogOpen} onClose={handleConfirmClose}>
        <DialogTitle>Cancel Adding Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel adding the product? Your changes
            will not be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Yes, Cancel
          </Button>
          <Button onClick={handleConfirmClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default AddProduct;
