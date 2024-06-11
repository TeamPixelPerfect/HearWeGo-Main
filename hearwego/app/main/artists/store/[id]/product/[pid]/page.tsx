"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Rating,
  TextField,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from "@mui/material";
import { Add, Remove, ShoppingCart, ArrowBackIos } from "@mui/icons-material";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Link from "next/link";
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';


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
  ratingCount?: number;
  category: string;
  subcategory: string;
  comments: Comment[];
  productCount: number;
  sold: number;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "CANON EOS R7",
    description:
      "The Canon EOS R7 is a compact yet powerful mirrorless camera, boasting high-resolution imaging and rapid autofocus. Its ergonomic design and intuitive controls make it a versatile choice for photographers of all levels.",
    price: 25000.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4,
    ratingCount: 10,
    category: "Camera",
    subcategory: "Camera",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great camera, high-quality images!",
        rating: 5,
        date: "2021-09-01",
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Love the autofocus feature.",
        rating: 4,
        date: "2021-09-02",
      },
    ],
    productCount: 50,
    sold: 40,
    sizes: ["Small", "Medium", "Large"],
    colors: ["Black", "Silver", "Red"],
  },
];

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [commentInput, setCommentInput] = useState("");
  const [previousComments, setPreviousComments] = useState<Comment[]>(products[0].comments);
  const [commentRating, setCommentRating] = useState<number | null>(null);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(products[0].sizes[0]);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0]);

  const product = products[0];
  const productImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxVUpd37ROVc_7LEW291Ql0HkBUUNUjEqjaA&s",
  ];

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  const handleQuantityChange = (type: string) => {
    setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  };

  const handleCommentRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setCommentRating(newValue);
  };

  const handleAddComment = () => {
    if (commentInput.trim() && commentRating !== null) {
      const newComment: Comment = {
        id: previousComments.length + 1,
        username: "Guest",
        comment: commentInput,
        rating: commentRating,
        date: new Date().toLocaleDateString(),
      };
      setPreviousComments([...previousComments, newComment]);
      setCommentInput("");
      setCommentRating(null);
    }
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
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
                  <ArrowBackIos />
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
            <ImageGallery
  items={productImages.map(image => ({ original: image, thumbnail: image }))}
  showNav={false}
  showBullets={true}
  showThumbnails={true}
  showFullscreenButton={true}
  showPlayButton={true}

  // showIndex={false}
  // renderLeftNav={(onClick, disabled) => (
  //   <IconButton
  //     onClick={onClick}
  //     disabled={disabled}
  //     style={{ width: '24px', height: '24px' }} // Adjust the width and height as needed
  //   >
  //     <ArrowBackIos />
  //   </IconButton>
  // )}
  // renderRightNav={(onClick, disabled) => (
  //   <IconButton
  //     onClick={onClick}
  //     disabled={disabled}
  //     style={{ width: '24px', height: '24px' }} // Adjust the width and height as needed
  //   >
  //     <ArrowForwardIos />
  //   </IconButton>
  // )}
/>

            <Typography
              variant="body1"
              sx={{
                marginTop: "2px",
                color: "gray",
                textAlign: "left",
              }}
            >
              {product.description}
            </Typography>
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
              sx={{
                marginBottom: "10px",
                fontSize: { xs: "32px", md: "40px", fontWeight: "bold" },
              }}
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
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              Size
            </Typography>
            <Box sx={{ display: "flex", marginBottom: "20px" }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => handleSizeChange(size)}
                  sx={{ margin: "0 5px",textTransform: 'none'}}
                >
                  {size}
                </Button>
              ))}
            </Box>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              Color
            </Typography>
            <Box sx={{ display: "flex", marginBottom: "20px" }}>
              {product.colors.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  onClick={() => handleColorChange(color)}
                  sx={{
                    margin: "0 5px",
                    backgroundColor:
                      selectedColor === color ? color.toLowerCase() : "gray",
                    color: "white",
                  }}
                />
              ))}
            </Box>
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
              sx={{ textTransform: "none", width: "30%" }}
            >
              Add to Cart
            </Button>
            <Box sx={{ width: '20%', marginTop: '20px', position: 'relative' }}>
              <Box sx={{ position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={(product.sold / product.productCount) * 100}
                  sx={{ height: '15px', borderRadius: '15px' }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    position: 'relative',
                    top: '50%',
                    fontSize: '12px',
                    left: `${(product.sold / product.productCount) * 100}%`,
                    transform: 'translate(-70%, -90%)',
                    color: 'white',
                  }}
                >
                  {product.sold} sold
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggleCommentsVisibility}
          sx={{ textTransform: "none" }}
        >
          {commentsVisible ? "Hide Comments" : "View Comments"}
        </Button>
      </Box>

      {commentsVisible && (
        <>
          <Box sx={{ padding: "20px" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Rating and Reviews
            </Typography>
            {previousComments.map((comment) => (
              <Card key={comment.id} sx={{ marginBottom: "10px" }}>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {comment.date}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {comment.username}
                  </Typography>
                  <Rating value={comment.rating} readOnly precision={0.5} />
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    {comment.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ padding: "20px" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Add a Comment
            </Typography>
            <TextField
              label="Your Comment"
              multiline
              rows={4}
              value={commentInput}
              onChange={handleCommentInputChange}
              variant="outlined"
              sx={{ marginBottom: "20px", width: "100%" }}
            />
            <Rating
              name="comment-rating"
              value={commentRating}
              onChange={handleCommentRatingChange}
              precision={0.5}
              sx={{ margin: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginBottom: "15px" }}
            >
              Submit
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductDetail;
