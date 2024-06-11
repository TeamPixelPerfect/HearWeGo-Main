"use client";
import { useRouter } from "next/navigation";
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
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";  
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



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
import ProductCard from "../../../../../../components/MerchandiseProduct";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../../../styles/ArtistStrore.styles";

// Example products array


export const products = [
  {
    id: 1,
    name: "Shirt",
    description: "This is a sample product description.",
    price: 999.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    image2:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4.5,
    ratingCount: 20,
    category: "Clothing",
    subcategory: "Shirt",
    size: ["M"],
    color: ["Blue"],
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great shirt, fits perfectly!",
        rating: 5,
        ratingCount: 20,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Love the quality of the fabric.",
        rating: 4,
      },
    ],
  },
 
  {
    id: 5,
    name: "Cap",
    description: "This is a sample product description.",
    price: 290.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92vvUqXdziIP4FrxCPJo7G6oemT4TnpxUSg&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 2.5,
    ratingCount: 15,
    category: "Clothing",
    subcategory: "Cap",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green"],
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and fit!",
        rating: 3,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice color and design.",
        rating: 2,
      },
    ],
  },
  {
    id: 6,
    name: "Trvelling Bag",
    description: "This is a sample product description.",
    price: 2900.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oBDb1RPCPRI9YcsN461xLBsPSixy1hf_Gw&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 3.5,
    ratingCount: 10,

    category: "Bag",
    subcategory: "Bag",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green"],
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and design!",
        rating: 4,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice color and fit.",
        rating: 3,
      },
    ],
  },
  {
    id: 7,
    name: "Men Cap",
    description: "This is a sample product description.",
    price: 699.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGtLvPukCF2z-9ruBGJgfK1ufoqI63244lw&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 1.5,
    ratingCount: 10,
    category: "Clothing",
    subcategory: "Cap",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green"],
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and fit!",
        rating: 2,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice color and design.",
        rating: 1,
      },
    ],
  },
  {
    id: 8,
    name: "Couple Shirts",
    description: "This is a sample product description.",
    price: 2900.99,
    image1:
      "https://estudio.lk/wp-content/uploads/2021/09/WhatsApp-Image-2021-08-30-at-9.36.34-PM-300x300.jpeg",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 2,
    ratingCount: 10,
    category: "Clothing",
    subcategory: "Shirt",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green"],
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and design!",
        rating: 3,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice color and fit.",
        rating: 2,
      },
    ],
  },
  {
    id: 9,
    name: "Shirt",
    description: "This is a sample product description.",
    price: 290.99,
    image1:
      "https://www.originswear.lk/wp-content/uploads/2023/06/Pine-Green-1.webp",
      image2:
      "https://www.originswear.lk/wp-content/uploads/2023/06/Pine-Green-1.webp",
    rating: 4.5,
    ratingCount: 10,
    category: "clothing",
    subcategory: "Shirt",
    size: ["L"],
    color: ["Green"],
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and design!",
        rating: 5,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice color and fit.",
        rating: 4,
      },
    ],
  },
  {
    id: 10,
    name: "Shirt",
    description: "This is a sample product description.",
    price: 3909.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUPbylf85GIvt4JPKd6w3lgObJhEj9_jWIQ&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 3.5,
    ratingCount: 10,
    category: "Clothing",
    subcategory: "Shirt",
    size: ["S", "M", "L", "XL"],
    color: ["Red", "Blue", "Green"],
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and design!",
        rating: 4,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice color and fit.",
        rating: 3,
      },
    ],
  },

];


export default function ArtistStoreProduct() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategory, setSubcategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubcategory(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const subcategories = Array.from(
    new Set(products.map((product) => product.subcategory))
  );
  const sizes = Array.from(
    new Set(products.flatMap((product) => product.size || []))
  );
  const colors = Array.from(
    new Set(products.flatMap((product) => product.color || []))
  );

  const filteredProducts = products.filter((product) => {
    return (
      (subcategory === "All" || product.subcategory === subcategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minPrice === "" || product.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || product.price <= parseFloat(maxPrice)) &&
      (size === "All" || product.size?.includes(size)) &&
      (color === "All" || product.color?.includes(color))
    );
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
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
              sx={{ padding: "10px" }}
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
            onClick={() => {
              router.push("/main/user/cart");
            }}
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <WhiteArea>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, padding: "20px" }}>
          <Box sx={{ width: { xs: "100%", md: "30%" }, paddingRight: { md: "20px" } }}>
            <Typography variant="h6" gutterBottom >
              Filters
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ marginBottom: 2, width: "50%",marginTop:"20px"}}>
              <InputLabel>Subcategory</InputLabel>
              <Select value={subcategory} onChange={handleSubcategoryChange} label="Subcategory">
                <MenuItem value="All">All</MenuItem>
                {subcategories.map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} sx={{ marginBottom: 2 }}>
              <TextField
                label="Min Price"
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                variant="outlined"
                size="small"
                sx={{ width: { xs: "100%", sm: "50%" } }}
              />
              <TextField
                label="Max Price"
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                variant="outlined"
                size="small"
                sx={{ width: { xs: "100%", sm: "50%" } }}
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              Size
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" sx={{ marginBottom: 2 }}>
              <Button
                variant={size === "All" ? "contained" : "outlined"}
                onClick={() => setSize("All")}
                size="small"
              >
                All
              </Button>
              {sizes.map((sizeOption) => (
                <Button
                  key={sizeOption}
                  variant={size === sizeOption ? "contained" : "outlined"}
                  onClick={() => setSize(sizeOption)}
                  size="small"
                >
                  {sizeOption}
                </Button>
              ))}
            </Box>
            <Typography variant="h6" gutterBottom>
              Color
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant={color === "All" ? "contained" : "outlined"}
                onClick={() => setColor("All")}
                size="small"
              >
                All
              </Button>
              {colors.map((colorOption) => (
                <Button
                  key={colorOption}
                  variant={color === colorOption ? "contained" : "outlined"}
                  onClick={() => setColor(colorOption)}
                  size="small"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: colorOption.toLowerCase(),
                      borderRadius: "50%",
                    }}
                  />
                  {colorOption}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "70%" } }}>
            <Box display="flex" alignItems="center" marginBottom="20px">
              <Link href="/main/artists/store/1">
                <Button>
                  <ArrowBackIosIcon />
                </Button>
              </Link>
              <Typography variant="h5" gutterBottom sx={{ marginTop: "10px" }}>
                Clothing
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </WhiteArea>
    </>
  );
}