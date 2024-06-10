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
} from "@mui/material";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import DropFile from "@/app/components/DropFile";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  title: Yup.string().required("Product title is required"),
  description: Yup.string().required("Product description is required"),
  category: Yup.string().required("Product category is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),
  logoFile: Yup.mixed().required("Main product image is required"),
  additionalImageFile: Yup.mixed().required(
    "Additional product image is required"
  ),
});

const AddProduct = ({
  handleAddProduct,
}: {
  handleAddProduct: (values: any) => void;
}) => {
  const router = useRouter();
  const handleClose = () => {
    router.push("/artist/merchandise");
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
                title: "",
                description: "",
                category: "",
                price: "",
                quantity: "",
                sku: "",
                brand: "",
                tags: "",
                logoFile: null,
                additionalImageFile: null,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleAddProduct(values);
                setSubmitting(false);
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
                          file={values.logoFile}
                          setFile={(file) => setFieldValue("logoFile", file)}
                          aspectX={1}
                          aspectY={1}
                          shape="rect"
                          error={touched.logoFile && errors.logoFile}
                        />
                        {touched.logoFile && errors.logoFile && (
                          <Typography variant="body2" color="error">
                            {errors.logoFile}
                          </Typography>
                        )}
                        <DropFile
                          fileTypes="Additional Product Image"
                          fileExtensions="JPEG,PNG,WEBP,SVG"
                          isCircular={false}
                          width="100%"
                          height="200px"
                          file={values.additionalImageFile}
                          setFile={(file) =>
                            setFieldValue("additionalImageFile", file)
                          }
                          aspectX={1}
                          aspectY={1}
                          shape="rect"
                          error={
                            touched.additionalImageFile &&
                            errors.additionalImageFile
                          }
                        />
                        {touched.additionalImageFile &&
                          errors.additionalImageFile && (
                            <Typography variant="body2" color="error">
                              {errors.additionalImageFile}
                            </Typography>
                          )}
                      </CardMedia>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            value={values.title}
                            onChange={handleChange}
                            name="title"
                            type="text"
                            label="Product Title"
                            variant="outlined"
                            fullWidth
                            error={touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={values.description}
                            onChange={handleChange}
                            name="description"
                            type="text"
                            label="Product Description"
                            variant="outlined"
                            fullWidth
                            error={touched.description && !!errors.description}
                            helperText={
                              touched.description && errors.description
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={values.category}
                            onChange={handleChange}
                            name="category"
                            type="text"
                            label="Product Category"
                            variant="outlined"
                            fullWidth
                            error={touched.category && !!errors.category}
                            helperText={touched.category && errors.category}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            value={values.price}
                            onChange={handleChange}
                            name="price"
                            type="number"
                            label="Price"
                            variant="outlined"
                            fullWidth
                            error={touched.price && !!errors.price}
                            helperText={touched.price && errors.price}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            value={values.quantity}
                            onChange={handleChange}
                            name="quantity"
                            type="number"
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            error={touched.quantity && !!errors.quantity}
                            helperText={touched.quantity && errors.quantity}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
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
    </Box>
  );
};

export default AddProduct;
