import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";

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
});

const AddProduct = ({
  open,
  onClose,
  handleAddProduct,
}: {
  open: boolean;
  onClose: () => void;
  handleAddProduct: (values: any) => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
    >
      <Box
        sx={{
          width: "50%",
          height: "60%",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          boxShadow: 24,
          padding: "16px",
          overflow: "auto",
        }}
      >
        <Typography variant="h4" component="h2">
          Add New Product
        </Typography>

        <Formik
          initialValues={{
            title: "",
            description: "",
            category: "",
            price: "",
            quantity: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleAddProduct(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ handleSubmit, isSubmitting, errors, touched,values,handleChange }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  value={values.title}
                  onChange={handleChange}
                  name="title"
                  type="text"
                  label="Product Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.title && !!errors.title}
                />
                {touched.title && errors.title && (
                  <div className="error-message">{errors.title}</div>
                )}
              </div>

              <div>
                <TextField
                  name="description"
                  type="text"
                  label="Product Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.description && !!errors.description}
                />
                {touched.description && errors.description && (
                  <div className="error-message">{errors.description}</div>
                )}
              </div>

              <div>
                <TextField
                  name="category"
                  type="text"
                  label="Product Category"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.category && !!errors.category}
                />
                {touched.category && errors.category && (
                  <div className="error-message">{errors.category}</div>
                )}
              </div>

              <div>
                <TextField
                  name="price"
                  type="number"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.price && !!errors.price}
                />
                {touched.price && errors.price && (
                  <div className="error-message">{errors.price}</div>
                )}
              </div>

              <div>
                <TextField
                  name="quantity"
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.quantity && !!errors.quantity}
                />
                {touched.quantity && errors.quantity && (
                  <div className="error-message">{errors.quantity}</div>
                )}
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                Add Product
              </Button>
            </form>
          )}
        </Formik>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginTop: "16px", justifyContent: "flex-end" }}
        >
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddProduct;
