"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import DropFile from "../../../components/DropFile";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";

const CreateStoreForm = () => {
  const validationSchema = Yup.object().shape({
    storeImages: Yup.array()
      .of(
        Yup.string()
          .required("Store image is required")
          .url("Invalid image URL")
      )
      .min(1, "At least one image is required"),
    storeDescription: Yup.string().required("Store description is required"),
    shippingDetails: Yup.object().shape({
      fees: Yup.string().required("Shipping fees are required"),
      services: Yup.string().required("Delivery services are required"),
    }),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleCancel = () => {
    console.log("Cancelled");
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
        <Card sx={{ padding: 3 }}>
          <Formik
            initialValues={{
              storeImages: ["", "", ""],
              storeDescription: "",
              shippingDetails: {
                fees: "",
                services: "",
              },
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  align="center"
                >
                  Create Your Store
                </Typography>
                <Grid container spacing={3}>
                  {[...Array(3)].map((_, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Field name={`storeImages[${index}]`}>
                        {({ field }) => (
                          <DropFile
                            fileTypes="image"
                            fileExtensions="jpg, jpeg, png"
                            isCircular={false}
                            width="100%"
                            height="200px"
                            file={field.value}
                            setFile={(file) => {
                              field.onChange({
                                target: { name: field.name, value: file },
                              });
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
                      {errors.storeImages &&
                        errors.storeImages[index] &&
                        touched.storeImages &&
                        touched.storeImages[index] && (
                          <Typography color="error" variant="caption">
                            {errors.storeImages[index]}
                          </Typography>
                        )}
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Field name="storeDescription">
                      {({ field }) => (
                        <TextField
                          label="Store Description"
                          variant="outlined"
                          {...field}
                          multiline
                          rows={4}
                          sx={{ width: "100%" }}
                        />
                      )}
                    </Field>
                    {errors.storeDescription && touched.storeDescription && (
                      <Typography color="error" variant="caption">
                        {errors.storeDescription}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="shippingDetails.fees">
                      {({ field }) => (
                        <TextField
                          label="Shipping Fees"
                          variant="outlined"
                          {...field}
                          multiline
                          sx={{ width: "100%" }}
                        />
                      )}
                    </Field>
                    {errors.shippingDetails &&
                      errors.shippingDetails.fees &&
                      touched.shippingDetails &&
                      touched.shippingDetails.fees && (
                        <Typography color="error" variant="caption">
                          {errors.shippingDetails.fees}
                        </Typography>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="shippingDetails.services">
                      {({ field }) => (
                        <TextField
                          label="Delivery Services"
                          variant="outlined"
                          {...field}
                          multiline
                          sx={{ width: "100%" }}
                        />
                      )}
                    </Field>
                    {errors.shippingDetails &&
                      errors.shippingDetails.services &&
                      touched.shippingDetails &&
                      touched.shippingDetails.services && (
                        <Typography color="error" variant="caption">
                          {errors.shippingDetails.services}
                        </Typography>
                      )}
                  </Grid>
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
                      <Button variant="outlined" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </Box>
  );
};

export default CreateStoreForm;

