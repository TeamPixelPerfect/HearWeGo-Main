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
  Slider,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const productsData = [
  {
    pid: 1,
    title: "Apple iPhone 13",
    description:
      "Latest model of Apple iPhone with A15 Bionic chip and advanced camera system.",
    category: "Electronics",
    price: 999,
    quantity: 50,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-sierra-blue-select?wid=940&hei=1112&fmt=png-alpha&.v=1631831006000",
  },
  {
    pid: 2,
    title: "Samsung Galaxy S21",
    description:
      "High-end Android smartphone with dynamic AMOLED display and triple camera setup.",
    category: "Electronics",
    price: 799,
    quantity: 30,
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-g991bzvgmea/gallery/levant-galaxy-s21-5g-g991-sm-g991bzvgmea-thumb-368427963?$320_320_PNG$",
  },
  {
    pid: 3,
    title: "Sony WH-1000XM4",
    description:
      "Industry-leading noise-canceling headphones with superior sound quality.",
    category: "Electronics",
    price: 349,
    quantity: 20,
    image:
      "https://cdn.sony-asia.com/image/2020/03/1600x900/wh1000xm4_b_1200x1200.png",
  },
  {
    pid: 4,
    title: "Nike Air Max 270",
    description:
      "Comfortable and stylish sneakers with excellent cushioning and support.",
    category: "Footwear",
    price: 150,
    quantity: 100,
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ba4b2d64-bf23-4f7b-9499-8320bfc0148c/air-max-270-shoes-KkLcGR.png",
  },
  {
    pid: 5,
    title: "Adidas Ultraboost",
    description:
      "High-performance running shoes with responsive cushioning and lightweight design.",
    category: "Footwear",
    price: 180,
    quantity: 75,
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/4cd3dc2fa1d64b69a93fad26011026e4_9366/Ultraboost_21_Shoes_Black_FY0378_01_standard.jpg",
  },
  {
    pid: 6,
    title: "Levi's 501 Original Jeans",
    description:
      "Classic straight leg jeans with timeless style and durable construction.",
    category: "Apparel",
    price: 60,
    quantity: 200,
    image:
      "https://lsco.scene7.com/is/image/lsco/005010494-alt1-pdp?$qv_desktop_full$",
  },
  {
    pid: 7,
    title: "Patagonia Down Sweater",
    description:
      "Warm and lightweight down jacket, perfect for outdoor activities and casual wear.",
    category: "Apparel",
    price: 229,
    quantity: 40,
    image:
      "https://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw558b60b1/images/hi-res/84674_BLK.jpg?sw=750&sh=750&sm=fit&sfrm=png",
  },
  {
    pid: 8,
    title: "Apple MacBook Pro",
    description:
      "Powerful laptop with M1 chip, Retina display, and long battery life.",
    category: "Electronics",
    price: 1299,
    quantity: 25,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp13touch-silver-select-202011_GEO_EMEA_LANG_EN?wid=1808&hei=1686&fmt=jpeg&qlt=90&.v=1613672866000",
  },
  {
    pid: 9,
    title: "Dell XPS 13",
    description:
      "Compact and powerful ultrabook with InfinityEdge display and premium build quality.",
    category: "Electronics",
    price: 999,
    quantity: 15,
    image:
      "https://i.dell.com/sites/csimages/Merchandizing_Imagery/all/xps-13-9310-laptop_cdp_m1.jpg",
  },
  {
    pid: 10,
    title: "KitchenAid Stand Mixer",
    description:
      "Versatile stand mixer with powerful motor and multiple attachments for various kitchen tasks.",
    category: "Home Appliances",
    price: 379,
    quantity: 10,
    image:
      "https://cdn.shopify.com/s/files/1/2072/2461/products/1204_product_1_89e6bbd8-f65c-4428-b827-e057d6a15d49.png?v=1570135861",
  },
];

const ProductInventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [outOfStockFilter, setOutOfStockFilter] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleOutOfStockChange = (event) => {
    setOutOfStockFilter(event.target.checked);
  };

  const filteredProducts = productsData
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.pid.toString().includes(searchQuery)
    )
    .filter(
      (product) =>
        !categoryFilter ||
        product.category.toLowerCase() === categoryFilter.toLowerCase()
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter((product) => !outOfStockFilter || product.quantity === 0);

  const uniqueCategories = [
    ...new Set(productsData.map((product) => product.category)),
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
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
            <Typography id="price-range-slider" gutterBottom>
              Price Range
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
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
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.pid}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image} // Ensure that each product has an 'image' field
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Quantity: {product.quantity}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ p: 2 }}>
                  <Button variant="contained" fullWidth>
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductInventory;
