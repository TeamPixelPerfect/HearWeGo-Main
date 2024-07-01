"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Stack,
  Button,
} from "@mui/material";
import { ProductModel } from "@/app/admin/models/models";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import DeleteIcon from '@mui/icons-material/Delete';

// Sample data
const product = {
  product_id: "prod_001",
  product_name: "Sample Product",
  product_description: "This is a sample product.",
  product_images: [
    "https://teefoxstore.com/wp-content/uploads/2022/03/Maroon-5-Friends-TV-Show-Signatures-T-Shirt-Merch.jpg",
    "https://teefoxstore.com/wp-content/uploads/2022/03/Maroon-5-Friends-TV-Show-Signatures-T-Shirt-Merch.jpg",
  ],
  category_id: "cat_001",
  product_price: 99.99,
  product_quantity: 20,
  product_variations: [
    {
      variation_name: "Color",
      variation_value: "Red",
      variation_price: 99.99,
      variation_quantity: 10,
    },
    {
      variation_name: "Size",
      variation_value: "Large",
      variation_price: 109.99,
      variation_quantity: 5,
    },
  ],
  product_rating: 4.5,
  store_id: "store_001",
};

const category = {
  category_id: "cat_001",
  category_name: "Electronics",
  category_description: "Category for electronic products.",
};

const ProductDetail = () => {
  const theme = useTheme();

  const [productData, setProductData] = useState<ProductModel>();
  const [categoryData, setCategoryData] = useState<any>();

  useEffect(() => {
    setProductData(product);
    setCategoryData(category);
  }, []);

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
            Merchandise
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<FaEdit />}
              sx={{
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
              }}
              // onClick={() => {
              //   router.push(`/admin/merchandise/stores/${id}/products/`);
              // }}
            >
              Edit Product
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              sx={{
                textTransform: "capitalize",
                // background: "#000",
                // color: "#fff",
              }}
              // onClick={() => {
              //   router.push(`/admin/merchandise/stores/${id}/products/`);
              // }}
            >
              Delete Product
            </Button>
          </Stack>
        </Box>
        <Box sx={{ p: 3 }}>
          {/* Product Information */}
          <Card
            sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
          >
            <CardContent sx={{ p: "3em" }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {productData?.product_name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {productData?.product_description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Category: {categoryData?.category_name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Price: ${productData?.product_price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantity: {productData?.product_quantity}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Rating: {productData?.product_rating} stars
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Store ID: {productData?.store_id}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 400, height: 400 }}
              image={productData?.product_images[0]}
              alt="Product Image"
            />
          </Card>

          {/* Product Images */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Product Images
            </Typography>
            <Grid container spacing={2}>
              {productData?.product_images.map((url, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      width={300}
                      height={400}
                      image={url}
                      alt={`Product Image ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Product Variations */}
          <Box>
            <Typography variant="h5" gutterBottom>
              Product Variations
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Variation Name</TableCell>
                    <TableCell>Variation Value</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productData?.product_variations.map((variation, index) => (
                    <TableRow key={index}>
                      <TableCell>{variation.variation_name}</TableCell>
                      <TableCell>{variation.variation_value}</TableCell>
                      <TableCell>
                        ${variation.variation_price.toFixed(2)}
                      </TableCell>
                      <TableCell>{variation.variation_quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default ProductDetail;
