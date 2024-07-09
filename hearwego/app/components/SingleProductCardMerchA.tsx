import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress,
  Stack,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Product } from "../constants/models";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/lib/hooks";
import { deleteProduct, editProduct } from "../services/StoreServices";

const SingleProductCard = ({
  product,
  setEditComplete,
  handleSnackbarOpen,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const artist = useAppSelector((state) => state.artist.user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
    handleDelete();
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    // Simulate API call
    try {
      await saveEditedProduct(editedProduct);
      setIsEditing(false);
      setIsDirty(false);
    } catch (error) {
      console.error("Error saving product:", error);
      // Handle error gracefully, e.g., show error message
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    if (isDirty) {
      if (window.confirm("Are you sure you want to discard changes?")) {
        setEditedProduct(product);
        setIsEditing(false);
        setIsDirty(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
    setIsDirty(true);
  };

  const saveEditedProduct = async (editedProduct: any) => {
    await editProduct(
      artist?.token ? artist.token : "",
      product?.product_id,
      editedProduct
    );
    setEditComplete(true);
    console.log("Saved edited product:", editedProduct);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(
        artist?.token ? artist.token : "",
        product?.product_id
      );
      setEditComplete(true);
      handleSnackbarOpen("Product deleted successfully");
    }
    setIsDeleting(false);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.product_Main_image}
        alt={product.product_name}
      />
      <CardContent>
        {!isEditing ? (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {product.product_name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {product.product_description}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ mt: 1 }}>
              ${product.product_price}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Quantity: {product.product_quantity}
            </Typography>
          </>
        ) : (
          <Box>
            <TextField
              name="product_name"
              label="Title"
              fullWidth
              defaultValue={editedProduct.product_name}
              placeholder={product.product_name}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              name="product_description"
              label="Description"
              fullWidth
              defaultValue={editedProduct.product_description}
              placeholder={product.product_description}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              name="product_price"
              label="Price"
              fullWidth
              defaultValue={editedProduct.product_price}
              placeholder={product.product_price}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              name="product_quantity"
              label="Quantity"
              fullWidth
              defaultValue={editedProduct.product_quantity}
              placeholder={product.product_quantity}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
          </Box>
        )}
      </CardContent>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
        {!isEditing ? (
          <Stack direction="row">
            <IconButton color="primary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ) : (
          <>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
              disabled={!isDirty || isSaving}
            >
              {isSaving ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
};

export default SingleProductCard;
