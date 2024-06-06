"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import SwipeableBanner from "../../../../components/MerchandiseBanner";
import ProductCard from "../../../../components/MerchandiseProduct";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CategoryComponent from "../../../../components/MerchandiseCategory";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../styles/ArtistStrore.styles";

const banners = [
  {
    id: 1,
    image: "https://blog.daraz.lk/wp-content/uploads/2022/11/Banner.jpg",
    title: "Banner 1",
  },
  {
    id: 2,
    image:
      "https://blog.daraz.lk/wp-content/uploads/2022/11/Amazing-Black-Friday-Deals-On-Fashion-Up-To-30-Off-Banner.jpg",
    title: "Banner 2",
  },
  {
    id: 3,
    image:
      "https://blog.daraz.lk/wp-content/uploads/2023/03/Avurudu-Wasi-English-Banner-02.jpg",
    title: "Banner 3",
  },
];

const products = [
  {
    id: 1,
    name: "SampleProduct1",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
  },
  {
    id: 2,
    name: "SampleProduct2",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhgAP-60PT1IOBAQddQodNfcFd5dbH4MsIqA&s",
  },
  {
    id: 3,
    name: "SampleProduct3",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
  },
  {
    id: 4,
    name: "SampleProduct4",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Hvy958Oj2sGzhIWCv-QezqAAcqzsct3HdA&s",
  },
  {
    id: 5,
    name: "SampleProduct5",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92vvUqXdziIP4FrxCPJo7G6oemT4TnpxUSg&s",
  },
  {
    id: 6,
    name: "SampleProduct6",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oBDb1RPCPRI9YcsN461xLBsPSixy1hf_Gw&s",
  },
  {
    id: 7,
    name: "SampleProduct7",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGtLvPukCF2z-9ruBGJgfK1ufoqI63244lw&s",
  },
  {
    id: 8,
    name: "SampleProduct8",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://estudio.lk/wp-content/uploads/2021/09/WhatsApp-Image-2021-08-30-at-9.36.34-PM-300x300.jpeg",
  },
  {
    id: 9,
    name: "Sample roduct9",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TvBn8PhR6toQ_Tv2Z-4SUhCp2YesmO5caA&s",
  },
  {
    id: 10,
    name: "SampleProduct10",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUPbylf85GIvt4JPKd6w3lgObJhEj9_jWIQ&s",
  },
  {
    id: 11,
    name: "SampleProduct11",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJIynAUBiePm7bn2ozvVZAgtItfWsOdYMoA&s",
  },
  {
    id: 12,
    name: "SampleProduct12",
    description: "This is a sample product description.",
    price: 29.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqV1tfB4BP5W-acPcRcTXG9cHzqOKPkirNw&s",
  },
];


const category = {
  id: 1,
  name: 'Category Name',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqV1tfB4BP5W-acPcRcTXG9cHzqOKPkirNw&s', // Provide the URL of the category image
};

export default function ArtistStore() {
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
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          >
            <SwipeableBanner banners={banners} />
          </Box>
        </Box>

        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Products
              </Typography>
            </Button>
            <Button variant="contained" color="primary">
              See More
            </Button>
          </div>

          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={4} sm={4} md={2} lg={2} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div>
      <CategoryComponent category={category} />
    </div>
      </WhiteArea>
    </>
  );
}
