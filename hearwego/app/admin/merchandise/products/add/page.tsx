"use client";

import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
} from "@mui/material";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  artist_id: Yup.string().required("Artist is required"),
  store_description: Yup.string().required("Description is required"),
  store_status: Yup.string().required("Status is required"),
});

const artists = [
  { id: 1, name: "Artist 1" },
  { id: 2, name: "Artist 2" },
  { id: 3, name: "Artist 3" },
];

const statuses = [
  { value: "active", label: "Active" },
  { value: "active", label: "Waiting" },
  { value: "inactive", label: "Blocked" },
];

const AddProductPage = () => {
  const theme = useTheme();
  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          >
            Products
          </Typography>
        </Box>
        <Box
          sx={{
            width:"95%",
            margin: "auto",
            bgcolor: "background.paper",
            border:
              theme.palette.mode === "light"
                ? "1px solid rgba(0, 0, 0, .125)"
                : "1px solid rgba(255, 255, 255, .125)",
            // boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add New Product</h2>
          <Formik
            initialValues={{
              artist_id: "",
              store_description: "",
              store_status: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form values:", values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched, handleChange }) => (
              <Form>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="artist-label">Artist</InputLabel>
                  <Select
                    labelId="artist-label"
                    id="artist"
                    name="artist_id"
                    onChange={handleChange}
                    error={touched.artist_id && Boolean(errors.artist_id)}
                  >
                    {artists.map((artist) => (
                      <MenuItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  id="description"
                  name="store_description"
                  label="Store Description"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                  error={
                    touched.store_description &&
                    Boolean(errors.store_description)
                  }
                  helperText={
                    touched.store_description && errors.store_description
                  }
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    name="store_status"
                    onChange={handleChange}
                    error={touched.store_status && Boolean(errors.store_status)}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Card>
    </Grid>
  );
};

export default AddProductPage;
