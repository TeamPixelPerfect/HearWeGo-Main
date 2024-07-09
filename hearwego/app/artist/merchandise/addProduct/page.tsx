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
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DropFile from "@/app/components/DropFile";
import { useRouter } from "next/navigation";
import { MerchProduct } from "../../../constants/models";
import {
  addMerchProduct,
  getCategories,
  getStoreForArtist,
} from "../../../services/StoreServices";
import { useAppSelector } from "@/lib/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isDraft } from "@reduxjs/toolkit";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ProductVariant {
  variation_name?: string;
  variation_value?: string;
  variation_price?: number;
  variation_quantity?: number;
}

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
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [variations, setVariations] = useState<ProductVariant[]>([]);

  const handleClose = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    handleSaveToDraft();
    router.push("../merchandise");
  };

  const handleSaveToDraft = async () => {
    try {
      await addMerchProduct(artist?.token ? artist?.token : "", {
        isDraft: true,
        ...formik.values,
        catagory_name: "test",
      });
      setSuccessMessage("Product saved to drafts successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Failed to save product to drafts");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const validationSchema = Yup.object({
    product_name: Yup.string().required("Product name is required"),
    product_description: Yup.string().required(
      "Product description is required"
    ),
    catagory_name: Yup.string().required("Category name is required"),
    product_price: Yup.number()
      .required("Product price is required")
      .min(0, "Price must be a positive number"),
    product_quantity: Yup.number()
      .required("Product quantity is required")
      .min(0, "Quantity must be a positive number"),
    product_rating: Yup.number()
      .required("Product rating is required")
      .min(0, "Rating must be between 0 and 5")
      .max(5, "Rating must be between 0 and 5"),
    product_Main_image: Yup.mixed().required("Main product image is required"),
    product_Additional_image: Yup.mixed().required(
      "Additional product image is required"
    ),
    variations: Yup.array()
      .of(
        Yup.object({
          variation_name: Yup.string().required("Variation name is required"),
          variation_value: Yup.string().required("Variation value is required"),
          variation_price: Yup.number()
            .required("Variation price is required")
            .min(0, "Price must be a positive number"),
          variation_quantity: Yup.number()
            .required("Variation quantity is required")
            .min(0, "Quantity must be a positive number"),
        })
      )
      .required("At least one variation is required"),
  });

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_description: "",
      product_Main_image: "",
      product_Additional_image: "",
      catagory_name: "",
      product_price: "",
      product_quantity: "",
      product_rating: "",
      store_id: "",
      variations: [] as ProductVariant[],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await addMerchProduct(
          artist?.token ? artist?.token : "",
          values
        );
        console.log(res);
        setSuccessMessage("Product added successfully!");
        setSnackbarSeverity("success");
        resetForm();
        router.push("../merchandise");
      } catch (error) {
        console.log(error);
        setSnackbarMessage("Failed to add product");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    },
  });

  const [productMainImage, setProductMainImage] = useState<File | null>(null);
  const [productAdditionalImage, setProductAdditionalImage] =
    useState<File | null>(null);

  useEffect(() => {
    if (productMainImage) {
      formik.setFieldValue("product_Main_image", productMainImage);
    }
  }, [productMainImage]);

  useEffect(() => {
    if (productAdditionalImage) {
      formik.setFieldValue("product_Additional_image", productAdditionalImage);
    }
  }, [productAdditionalImage]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });

    getStoreForArtist(artist?.user.artist_id ? artist.user.artist_id : "").then(
      (res) => {
        console.log(res);
        formik.setFieldValue("store_id", res.store_id);
      }
    );
  }, []);

  const handleAddVariation = () => {
    setVariations([
      ...variations,
      {
        variation_name: "",
        variation_value: "",
        variation_price: 0,
        variation_quantity: 0,
      },
    ]);
  };

  const handleRemoveVariation = (index: number) => {
    const newVariations = [...variations];
    newVariations.splice(index, 1);
    setVariations(newVariations);
    formik.setFieldValue("variations", newVariations);
  };

  const handleVariationChange = (
    index: number,
    field: keyof ProductVariant,
    value: string | number
  ) => {
    const newVariations = [...variations];
    newVariations[index][field] = value;
    setVariations(newVariations);
    formik.setFieldValue("variations", newVariations);
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
            <form onSubmit={formik.handleSubmit}>
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
                    />
                    {formik.touched.product_Main_image &&
                      formik.errors.product_Main_image && (
                        <Typography color="error" variant="body2">
                          {formik.errors.product_Main_image}
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
                    />
                    {formik.touched.product_Additional_image &&
                      formik.errors.product_Additional_image && (
                        <Typography color="error" variant="body2">
                          {formik.errors.product_Additional_image}
                        </Typography>
                      )}
                  </CardMedia>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        value={formik.values.product_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="product_name"
                        type="text"
                        label="Product Title"
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.product_name &&
                          Boolean(formik.errors.product_name)
                        }
                        helperText={
                          formik.touched.product_name &&
                          formik.errors.product_name
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={formik.values.product_description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="product_description"
                        type="text"
                        label="Product Description"
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.product_description &&
                          Boolean(formik.errors.product_description)
                        }
                        helperText={
                          formik.touched.product_description &&
                          formik.errors.product_description
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Product Category</InputLabel>
                        <Select
                          value={formik.values.catagory_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="catagory_name"
                          type="text"
                          label="Product Category"
                          variant="outlined"
                          fullWidth
                          error={
                            formik.touched.catagory_name &&
                            Boolean(formik.errors.catagory_name)
                          }
                        >
                          {categories &&
                            categories?.map((category: any) => (
                              <MenuItem
                                value={category?.category_name}
                                key={category}
                              >
                                {category?.category_name}
                              </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                          {formik.touched.catagory_name &&
                            formik.errors.catagory_name}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={formik.values.product_rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="product_rating"
                        type="number"
                        label="Product Rating"
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.product_rating &&
                          Boolean(formik.errors.product_rating)
                        }
                        helperText={
                          formik.touched.product_rating &&
                          formik.errors.product_rating
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={formik.values.product_price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="product_price"
                        type="number"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.product_price &&
                          Boolean(formik.errors.product_price)
                        }
                        helperText={
                          formik.touched.product_price &&
                          formik.errors.product_price
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={formik.values.product_quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="product_quantity"
                        type="number"
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.product_quantity &&
                          Boolean(formik.errors.product_quantity)
                        }
                        helperText={
                          formik.touched.product_quantity &&
                          formik.errors.product_quantity
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Variation Fields */}
                <Grid item xs={12}>
                  <Typography variant="h6">Product Variations</Typography>
                  {variations.map((variation, index) => (
                    <Card key={index} sx={{ my: 2, p: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <TextField
                            label="Variation Name"
                            value={variation.variation_name}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "variation_name",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            label="Variation Value"
                            value={variation.variation_value}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "variation_value",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        {/* <Grid item xs={12} md={3}>
                          <TextField
                            label="Variation Price"
                            type="number"
                            value={variation.variation_price}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "variation_price",
                                Number(e.target.value)
                              )
                            }
                            variant="outlined"
                            fullWidth
                          />
                        </Grid> */}
                        <Grid item xs={12} md={2}>
                          <TextField
                            label="Variation Quantity"
                            type="number"
                            value={variation.variation_quantity}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "variation_quantity",
                                Number(e.target.value)
                              )
                            }
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <IconButton
                            onClick={() => handleRemoveVariation(index)}
                            color="error"
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                  <Button
                    onClick={handleAddVariation}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ mt: 2 }}
                  >
                    Add Variation
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
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
          </CardContent>
        </Card>
      </Container>

      {/* Confirmation Dialog for Cancel */}
      <Dialog open={confirmDialogOpen} onClose={handleConfirmClose}>
        <DialogTitle>Cancel Adding Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel adding the product? Your changes
            will be saved to drafts.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Yes, Save to Drafts
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

      {/* Success Snackbar */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default AddProduct;
