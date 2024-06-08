"use client";

import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box, Card, CardContent, Rating } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import { Add, Remove } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// import Rating from "@mui/material/Rating";

interface Comment {
  id: number;
  username: string;
  comment: string;
  rating: number;
  date: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  subcategory: string;
  comments: Comment[];
}

interface ProductCardProps {
  product: Product;
}

export const products: Product[] = [
  {
    id: 1,
    name: "CANON EOS R7",
    description: "This is a sample product description.",
    price: 25000.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4,
    category: "Camera",
    subcategory: "Camera",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great shirt, fits perfectly!",
        rating: 5,
        date: "2021-09-01",
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Love the quality of the fabric.",
        rating: 4,
        date: "2021-09-02",
      },
    ],
  },
];

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const product = products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const productImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxVUpd37ROVc_7LEW291Ql0HkBUUNUjEqjaA&s",
  ];

  const handleImageSwap = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const handleAddToCart = () => {
    // Handle add to cart functionality
    alert("Added to cart!");
  };
  const handleQuantityChange = (type: string) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) setQuantity(quantity - 1);
    }
  };

  return (
    <>
       <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "center", md: "right" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "40px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/main/artists/store/1">
                <Button>
                  <ArrowBackIosIcon />
                </Button>
              </Link>
              <Typography
                sx={{
                  textAlign: "left",
                  marginBottom: "0px",
                  fontSize: "32px",
                }}
              >
                Product Details
              </Typography>
            </div>
            <Box sx={{ height: { xs: "250px", md: "350px" },marginTop:'20px'}}>
              <Carousel autoPlay={true} indicators={false}>
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                ))}
              </Carousel>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginTop: { xs: "20px", md: "90px" },
              padding: "20px",
            }}
          >
            <Typography
              sx={{ marginBottom: "10px", fontSize: { xs: "32px", md: "40px",fontWeight:"bold" } }}
            >
              {product.name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              <Rating
                name="read-only-rating"
                value={product.rating}
                readOnly
                precision={0.5}
              />
            </Typography>
            <Typography
              sx={{
                marginBottom: "20px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              Rs.{product.price}
            </Typography>
            <Typography variant="body1">Quantity</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <IconButton onClick={() => handleQuantityChange("decrement")}>
                <Remove />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange("increment")}>
                <Add />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ textTransform: "none",width:"30%" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetail;
