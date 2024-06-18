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
} from "@mui/material";

const SingleProductCard = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
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
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Saving edited product:", editedProduct);
        resolve();
      }, 1000);
    });
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        {!isEditing ? (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {product.description}
            </Typography>
            <Typography variant="body1" color="textPrimary" sx={{ mt: 1 }}>
              ${product.price}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Quantity: {product.quantity}
            </Typography>
          </>
        ) : (
          <Box>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={editedProduct.title}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              value={editedProduct.description}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              name="price"
              label="Price"
              fullWidth
              value={editedProduct.price}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
            <TextField
              name="quantity"
              label="Quantity"
              fullWidth
              value={editedProduct.quantity}
              onChange={handleInputChange}
              sx={{ marginBottom: 1 }}
            />
          </Box>
        )}
      </CardContent>
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
        {!isEditing ? (
          <Button variant="outlined" onClick={handleEditClick}>
            Edit
          </Button>
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
