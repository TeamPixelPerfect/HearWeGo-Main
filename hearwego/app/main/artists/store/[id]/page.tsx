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
import Avatar from "@mui/material/Avatar";
import SwipeableBanner from "../../../../components/MerchandiseBanner";
import ProductCard from "../../../../components/MerchandiseProduct";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CategoryComponent from "../../../../components/MerchandiseCategory";
import Link from "next/link";
import { useState } from "react";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../styles/ArtistStrore.styles";
import { Category } from "@mui/icons-material";

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
    ratingCount: 10,
    category: "Clothing",
    subcategory: "Shirt",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great shirt, fits perfectly!",
        rating: 5,
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
    id: 2,
    name: "Printed Mug",
    description: "This is a sample product description.",
    price: 450.99,
  
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhgAP-60PT1IOBAQddQodNfcFd5dbH4MsIqA&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4,
    ratingCount: 10,
    category: "Mug",
    subcategory: "Mug",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and print!",
        rating: 4,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice design and color.",
        rating: 3,
      },
    ],
  },
  {
    id: 3,
    name: "CANON EOS R7",
    description: "This is a sample product description.",
    price: 2500,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 3.5,
    ratingCount: 10,
    category: "Camera",
    subcategory: "Camera",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great camera for beginners!",
        rating: 4,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Easy to use and good quality.",
        rating: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Wrist Bands",
    description: "This is a sample product description.",
    price: 500.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Hvy958Oj2sGzhIWCv-QezqAAcqzsct3HdA&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4.5,
    ratingCount: 10,
    category: "Accessories",
    subcategory: "Wrist Bands",
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
    id: 5,
    name: "Cap",
    description: "This is a sample product description.",
    price: 290.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92vvUqXdziIP4FrxCPJo7G6oemT4TnpxUSg&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 2.5,
    ratingCount: 10,
    category: "Clothing",
    subcategory: "Cap",
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
    name: "Wrist Bands",
    description: "This is a sample product description.",
    price: 290.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TvBn8PhR6toQ_Tv2Z-4SUhCp2YesmO5caA&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4.5,
    ratingCount: 10,
    category: "Accessories",
    subcategory: "Wrist Bands",
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
    id: 11,
    name: "Mug",
    description: "This is a sample product description.",
    price: 829.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJIynAUBiePm7bn2ozvVZAgtItfWsOdYMoA&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 2.5,
    ratingCount: 10,
    category: "Mug",
    subcategory: "Mug",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great quality and print!",
        rating: 3,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Nice design and color.",
        rating: 2,
      },
    ],
  },
  {
    id: 12,
    name: "Camera",
    description: "This is a sample product description.",
    price: 9900.99,
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqV1tfB4BP5W-acPcRcTXG9cHzqOKPkirNw&s",
      image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 1.5,
    ratingCount: 10,
    category: "Camera",
    subcategory: "Camera",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great camera for beginners!",
        rating: 2,
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Easy to use and good quality.",
        rating: 1,
      },
    ],
  },
];

const categories = [
  {
    id: 1,
    name: "Clothing",
    image:
      "https://hulaglobal.com/wp-content/uploads/2022/08/Hula-global-fashion-summer-guide.jpg", // Provide the URL of the category image
  },
  {
    id: 2,
    name: "Accessories",
    image:
      "https://bournecrisp.com.au/wp-content/uploads/2019/07/accessories-make-or-break-1100x733.jpg", // Provide the URL of the category image
  },
  {
    id: 3,
    name: "Footwear",
    image:
      "https://www.thespruce.com/thmb/JOkEQZjfndNozM9C5fOXxvhoyOU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spr-tier-2-slippers-test-group-julia-fields-2-287418ff07c24849b0ef293adf4637f6.jpeg", // Provide the URL of the category image
  },
  {
    id: 4,
    name: "Home Accessories",
    image:
      "https://www.designersmk.com/wp-content/uploads/2023/08/home-accessories-1-1024x662.jpg", // Provide the URL of the category image
  },
  {
    id: 5,
    name: "Instruments",
    image:
      "https://musiclessonsincorona.com/wp-content/uploads/2016/10/Most-Popular-Musical-Instruments-That-Students-Learn.jpeg", // Provide the URL of the category image
  },
  {
    id: 6,
    name: "Jewellery",
    image: "https://static-01.daraz.lk/p/ba2ce801d17277faa688ff56b7c301dd.jpg", // Provide the URL of the category image
  },
  {
    id: 7,
    name: "watches",
    image:
      "https://m.media-amazon.com/images/S/aplus-media-library-service-media/e0b884c3-c7a3-4253-93d0-25cb0373f424.__CR158,0,2425,1500_PT0_SX970_V1___.jpg", // Provide the URL of the category image
  },
];
const ArtistStore = () => {
  const router = useRouter();
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle changes in the search input
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Filter categories based on the search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
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
         
         {/* <Link href ="/main/user/cart"> */}
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
          {/* </Link> */}
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

            {/* <Link href="/main/artists/store/1/productSeeMore"> */}
              <Button 
              variant="contained" 
              color="primary"
              onClick={() => {
                router.push("/main/artists/store/1/productSeeMore");
              }}
              >
                See More
              </Button>
            {/* </Link> */}
          </div>

          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              <Grid item xs={5} sm={4} md={2} lg={2} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>

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
                Category
              </Typography>
            </Button>
          </div>

          <Grid container spacing={2}>
            {filteredCategories.map((category) => (
              <Grid item xs={6} sm={8} md={8} lg={3} key={category.id}>
                <CategoryComponent category={category} />
              </Grid>
            ))}
          </Grid>
        </div>
      </WhiteArea>
    </>
  );
};
export default ArtistStore;
