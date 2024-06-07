"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";


import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputBase,
  Button,
  TextField,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ProductCard from "../../../../../components/MerchandiseProduct";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../../styles/ArtistStrore.styles";

// Example products array
const products = [
  {
    id: 1,
    name: "Shirt",
    description: "This is a sample product description.",
    price: 999.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4.5, 
    category: "Clothing",
    categoryId: 1,
    subcategory: "Shirt"

 
  },
  {
    id: 2,
    name: "Printed Mug",
    description: "This is a sample product description.",
    price: 450.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhgAP-60PT1IOBAQddQodNfcFd5dbH4MsIqA&s",
    rating: 4,
    category: "Mug",
    categoryId: 8,
    subcategory: "Mug"
    
  },
  {
    id: 3,
    name: "Canon EOS Rebel T7i DSLR Camera",
    description: "This is a sample product description.",
    price: 13325.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
    rating: 3.5,
    category: "Camera",
    categoryId: 9,
    subcategory: "Camera"
  },
  {
    id: 4,
    name: "Wrist Bands",
    description: "This is a sample product description.",
    price: 500.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Hvy958Oj2sGzhIWCv-QezqAAcqzsct3HdA&s",
    rating: 4.5,
    category: "Accessories",
    categoryId: 2,
    subcategory: "Wrist Bands"
  },
  {
    id: 5,
    name: "Cap",
    description: "This is a sample product description.",
    price: 290.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92vvUqXdziIP4FrxCPJo7G6oemT4TnpxUSg&s",
    rating: 2.5,
    category: "Clothing",
    categoryId: 1,
    subcategory: "Cap"
  },
  {
    id: 6,
    name: "Trvelling Bag",
    description: "This is a sample product description.",
    price: 2900.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oBDb1RPCPRI9YcsN461xLBsPSixy1hf_Gw&s",
    rating: 3.5,
    category: "Bag",
    categoryId: 10,
    subcategory: "Bag"
  },
  {
    id: 7,
    name: "Men Cap",
    description: "This is a sample product description.",
    price: 699.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGtLvPukCF2z-9ruBGJgfK1ufoqI63244lw&s",
    rating: 1.5,
    category: "Clothing",
    categoryId: 1,
    subcategory: "Cap"
  },
  {
    id: 8,
    name: "Couple Shirts",
    description: "This is a sample product description.",
    price: 2900.99,
    image:
      "https://estudio.lk/wp-content/uploads/2021/09/WhatsApp-Image-2021-08-30-at-9.36.34-PM-300x300.jpeg",
    rating: 2,
    category: "Clothing",
    categoryId: 1,
    subcategory: "Shirt"
  },
  {
    id: 9,
    name: "Wrist Bands",
    description: "This is a sample product description.",
    price: 290.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TvBn8PhR6toQ_Tv2Z-4SUhCp2YesmO5caA&s",
    rating: 4.5,
    category: "Accessories",
    categoryId: 2,
    subcategory: "Wrist Bands"
  },
  {
    id: 10,
    name: "Shirt",
    description: "This is a sample product description.",
    price: 3909.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUPbylf85GIvt4JPKd6w3lgObJhEj9_jWIQ&s",
    rating: 3.5,
    category: "Clothing",
    categoryId: 1,
    subcategory: "Shirt"
  },
  {
    id: 11,
    name: "Mug",
    description: "This is a sample product description.",
    price: 829.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJIynAUBiePm7bn2ozvVZAgtItfWsOdYMoA&s",
    rating: 2.5,
    category: "Mug",
    categoryId: 8,
    subcategory: "Mug"
  },
  {
    id: 12,
    name: "Camera",
    description: "This is a sample product description.",
    price: 9900.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqV1tfB4BP5W-acPcRcTXG9cHzqOKPkirNw&s",
    rating: 1.5,
    category: "Camera",
    categoryId: 9,
    subcategory: "Camera"

  },
];

export default function ArtistStoreProduct() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    setSubcategory("All");
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubcategory(event.target.value);
  };
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const subcategories =
    category === "All"
      ? []
      : Array.from(
          new Set(
            products
              .filter((product) => product.category === category)
              .map((product) => product.subcategory)
          )
        );

  const filteredProducts = products.filter((product) => {
    return (
      (category === "All" || product.category === category) &&
      (subcategory === "All" || product.subcategory === subcategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minPrice === "" || product.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || product.price <= parseFloat(maxPrice))
    );
  });

  return (
    <>
      {/* Search bar */}
      {/* Search bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MqiW7aEQD6l9uy0Icz9mn48gFLO5eahaMw&s"
            />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <IconButton type="button" sx={{ p: "10" }} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                padding: "70px",
              }}
              placeholder="Search here"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </Search>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <WhiteArea>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "green",
          }}
        >
          {/* <Grid container spacing={3}>
          <Grid item xs={12} md={3}> */}
          <Box
            sx={{
              display: "flex",
              width: "40%",
              flexDirection: "row",

              // backgroundColor: "red",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                width: "100%",
                height: "auto",
                padding: { xs: "10px" },
                overflowY: "auto",
                maxHeight: "800px",
                gap: "20px",
              }}
            >
              <FormControl
                variant="outlined"
                size="small"
                sx={{
                  width: "100%",
                }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="All">All</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Subcategory filter */}
              <FormControl variant="outlined" size="small">
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={subcategory}
                  onChange={handleSubcategoryChange}
                  label="Subcategory"
                >
                  <MenuItem value="All">All</MenuItem>
                  {subcategories.map((sub) => (
                    <MenuItem key={sub} value={sub}>
                      {sub}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                marginTop: '30px',
                justifyContent: 'space-between'
              
              }}>
              <TextField
                label="Minimum Price"
                type="number"
                variant="outlined"
                size="small"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <TextField
                label="Maximum Price"
                type="number"
                variant="outlined"
                size="small"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              // height: "800px",
              // backgroundColor: "red",
              margin: "30px",
              border: "1px solid #E6ECF0",
            }}
          >
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Link href="/main/artists/store/1">
                  <Button>
                    <ArrowBackIosIcon />
                  </Button>
                </Link>

                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ marginTop: "10px" }}
                >
                  Products
                </Typography>
              </div>

              <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                  <Grid item xs={5} sm={4} md={2} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Box>
        </Box>
      </WhiteArea>
    </>
  );
}
