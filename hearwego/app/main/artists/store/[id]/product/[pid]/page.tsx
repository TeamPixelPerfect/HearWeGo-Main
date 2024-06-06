"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ProductCard from "../../../../../../components/MerchandiseProduct";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SelectChangeEvent } from '@mui/material/Select';



import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../../../styles/ArtistStrore.styles";

const products = [
  {
    id: 1,
    name: "Shirt",
    description: "This is a sample product description.",
    price: 999.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4.5, 
    Category: "Clothing"

 
  },
  {
    id: 2,
    name: "Printed Mug",
    description: "This is a sample product description.",
    price: 450.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhgAP-60PT1IOBAQddQodNfcFd5dbH4MsIqA&s",
    rating: 4,
    Category: "Mug"
  },
  {
    id: 3,
    name: "Canon EOS Rebel T7i DSLR Camera",
    description: "This is a sample product description.",
    price: 13325.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
    rating: 3.5,
    Category: "Camera"
  },
  {
    id: 4,
    name: "Wrist Bands",
    description: "This is a sample product description.",
    price: 500.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Hvy958Oj2sGzhIWCv-QezqAAcqzsct3HdA&s",
    rating: 4.5,
    Category: "Accessories"
  },
  {
    id: 5,
    name: "Cap",
    description: "This is a sample product description.",
    price: 290.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92vvUqXdziIP4FrxCPJo7G6oemT4TnpxUSg&s",
    rating: 2.5,
    Category: "Clothing"
  },
  {
    id: 6,
    name: "Trvelling Bag",
    description: "This is a sample product description.",
    price: 2900.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oBDb1RPCPRI9YcsN461xLBsPSixy1hf_Gw&s",
    rating: 3.5,
    Category: "Bag"
  },
  {
    id: 7,
    name: "Men Cap",
    description: "This is a sample product description.",
    price: 699.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGtLvPukCF2z-9ruBGJgfK1ufoqI63244lw&s",
    rating: 1.5,
    Category: "Clothing"
  },
  {
    id: 8,
    name: "Couple Shirts",
    description: "This is a sample product description.",
    price: 2900.99,
    image:
      "https://estudio.lk/wp-content/uploads/2021/09/WhatsApp-Image-2021-08-30-at-9.36.34-PM-300x300.jpeg",
    rating: 2,
    Category: "Clothing"
  },
  {
    id: 9,
    name: "Wrist Bands",
    description: "This is a sample product description.",
    price: 290.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TvBn8PhR6toQ_Tv2Z-4SUhCp2YesmO5caA&s",
    rating: 4.5,
    Category: "Accessories"
  },
  {
    id: 10,
    name: "Shirt",
    description: "This is a sample product description.",
    price: 3909.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUPbylf85GIvt4JPKd6w3lgObJhEj9_jWIQ&s",
    rating: 3.5,
    Category: "Clothing"
  },
  {
    id: 11,
    name: "Mug",
    description: "This is a sample product description.",
    price: 829.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJIynAUBiePm7bn2ozvVZAgtItfWsOdYMoA&s",
    rating: 2.5,
    Category: "Mug"
  },
  {
    id: 12,
    name: "Camera",
    description: "This is a sample product description.",
    price: 9900.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqV1tfB4BP5W-acPcRcTXG9cHzqOKPkirNw&s",
    rating: 1.5,
    Category: "Camera"

  },
];


interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
}

// Sample product data
const productsC: Product[] = [
  { id: 1, 
    name: "Product 1", 
    category: "Electronics", 
    subcategory: "Laptops" 
  },
  {
    id: 2,
    name: "Product 2",
    category: "Accessories",
    subcategory: "Smartphones",
  },
  { id: 3, 
    name: "Product 3", 
    category: "Clothing", 
    subcategory: "T-Shirts" 
  },
  { id: 4, 
    name: "Product 4", 
    category: "Clothing", 
    subcategory: "Jeans" 
  },
  {
    id: 5,
    name: "Product 5",
    category: "Electronics",
    subcategory: "Smartwatches",
  },
  {
    id: 6,
    name: "Product 6",
    category: "Electronics",
    subcategory: "Headphones",
  },
  { 
    id: 7, 
    name: "Product 7", 
    category: "Clothing", 
    subcategory: "Shoes" 
  },
  { 
    id: 8, 
    name: "Product 8", 
    category: "Clothing", 
    subcategory: "Sweaters" 
  },
  { 
    id: 9, 
    name: "Product 9", 
    category: "Electronics", 
    subcategory: "Tablets" },
  {
    id: 10,
    name: "Product 10",
    category: "Electronics",
    subcategory: "Cameras",
  },
  { 
    id: 11, 
    name: "Product 11", 
    category: "Clothing", 
    subcategory: "Dresses" 
  },
  { 
    id: 12, 
    name: "Product 12",
    category: "Clothing", 
    subcategory: "Jackets" },
 
];

export default function ArtistStoreProduct() {
  const [category, setCategory] = useState<string>("All");
  const [subcategory, setSubcategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setSubcategory("All");
  };
  
  const handleChangeSubcategory = (event: SelectChangeEvent<string>) => {
    setSubcategory(event.target.value);
  };
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <>
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
          {/* <Grid container spacing={2} sx={{width:"50%",justifyContent:'left'}}>
          <Grid item xs={12} sm={6} md={2} lg={10}> */}
          <Box
            sx={{
              display: "flex",
              width: "40%",
              flexDirection: "row",
              // backgroundColor: "yellow",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "30px",
                // backgroundColor: "red",
              }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Filter Products</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      // backgroundColor: "blue",
                    }}
                  >
                    <FormControl>
                      <InputLabel>Category</InputLabel>
                      <Select value={category} onChange={handleChangeCategory}>
                        <MenuItem value="All">All</MenuItem>
                        {/* Assuming you have a list of categories */}
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Clothing">Clothing</MenuItem>
                        {/* Add more categories as needed */}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel>Subcategory</InputLabel>
                      <Select
                        value={subcategory}
                        onChange={handleChangeSubcategory}
                      >
                        <MenuItem value="All">All</MenuItem>
                        {/* Assuming you have a list of subcategories */}
                        {/* Render subcategories based on selected category */}
                        {category !== "All" &&
                          productsC
                            .filter((product) => product.category === category)
                            .map((product) => (
                              <MenuItem
                                key={product.subcategory}
                                value={product.subcategory}
                              >
                                {product.subcategory}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
          {/* </Grid>
        </Grid> */}

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
                  
alignItems: "center",
                  marginBottom: "20px",
                }}
              >
       
        <Typography variant="h5" gutterBottom>
          Products
        </Typography>
              </div>

              <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                  <Grid item xs={6} sm={4} md={2} lg={3} key={product.id}>
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
