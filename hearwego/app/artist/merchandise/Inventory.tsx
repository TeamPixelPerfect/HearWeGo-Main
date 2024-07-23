import {
  Box,
  Typography,
  TextField,
  Container,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  Snackbar,
  FormControlLabel,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProductCard from "../../components/SingleProductCardMerchA";
import { MerchProduct } from "../../constants/models";
import { getProductsforStore } from "@/app/services/StoreServices";

interface Props {
  store_id: string;
}

const Inventory = ({ store_id }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [productsData, setProductsData] = useState<MerchProduct[]>([]);
  const [outOfStockFilter, setOutOfStockFilter] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editComplete, setEditComplete] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  // Function to handle closing snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }

  useEffect(() => {
    getProductsforStore(store_id).then((data) => {
      setProductsData(data);
      setEditComplete(false);
    });
  
  }, [store_id, editComplete]);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategoryFilter(event.target.value);
  };

  const handleMinPriceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMaxPrice(event.target.value);
  };

  const handleOutOfStockChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setOutOfStockFilter(event.target.checked);
  };

  const filteredProducts = productsData
    .filter(
      (product: any) =>
        product.product_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.product_description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.product_id.toString().includes(searchQuery)
    )
    .filter(
      (product: any) =>
        !categoryFilter ||
        product.category.toLowerCase() === categoryFilter.toLowerCase()
    )
    .filter(
      (product: any) =>
        (minPrice === "" || product.product_price >= parseFloat(minPrice)) &&
        (maxPrice === "" || product.product_price <= parseFloat(maxPrice))
    )
    .filter((product: any) => !outOfStockFilter || product.quantity === 0);

  const uniqueCategories = [
    ...new Set(productsData.map((product: any) => product.category)),
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.paper",
        p: 3,
        borderRadius: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 3, mt: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by PID, Title, Description"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
          />
        </Box>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {uniqueCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={outOfStockFilter}
                  onChange={handleOutOfStockChange}
                />
              }
              label="Out of Stock"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {filteredProducts.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product?.pid}>
              <SingleProductCard
                product={product}
                setEditComplete={setEditComplete}
                handleSnackbarOpen={handleSnackbarOpen}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
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

export default Inventory;
