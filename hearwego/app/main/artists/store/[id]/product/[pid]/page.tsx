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
    name: "Shirt",
    description: "This is a sample product description.",
    price: 999.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4.5,
    category: "Clothing",
    subcategory: "Shirt",
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
  const [comments, setComments] = useState<Comment[]>(products[0].comments);
  const [newComment, setNewComment] = useState("");
  const product = products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const productImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oBDb1RPCPRI9YcsN461xLBsPSixy1hf_Gw&s",
  ];

  const handleImageSwap = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          marginTop: "20px",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            backgroundColor: "red",
            // margin: "20px",
          }}
        >
          <Box
            sx={{
              width: "60%",
              // height: "20%",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              margin: "40px",
              borderRadius: "10px",
              backgroundColor: "green",
              barder: "1px solid black",
            }}
          >
            <Box
              sx={{
                width: "100%",
                // marginTop: "20px",
                borderRadius: "10px",
                backgroundColor: "blue",
                barder: "1px solid black",
              }}
            >
              <Carousel autoPlay={true} indicators={false}>
                {productImages.map((image, index) => (
                  <Paper key={index} style={{ position: "relative" }}>
                    <img
                      src={image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "350px",
                        borderRadius: "10px",
                        barder: "1px solid black",
                      }}
                    />
                  </Paper>
                ))}
              </Carousel>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            backgroundColor: "yellow",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "50%",
              height: "50%",
              flexDirection: "column",
              alignItems: "left",
              backgroundColor: "pink",
              marginTop: "40px",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "purple",
                fontSize: "48px",
                fontWeight: "bold",
              }}
            >
              {product.name}
            </Box>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "red",
              }}
            >
              <Rating value={product.rating} readOnly />
            </Box>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "purple",
                fontSize: "32px",
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              Rs.{product.price}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        display:"flex",
        height:"200px",
        flexDirection:"row",
        alignItems:"center",
    
        backgroundColor:"blue",
      }}>
        <Box sx={{
           width: "50%",
           height: "100%",
           display: "flex",
           flexDirection: "row",
           justifyContent: "right",
           backgroundColor: "pink",
           // margin: "20px",

        }}>
          <Box sx={{
            display: "flex",  
            height:"100px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "40px",
            borderRadius: "10px",
            backgroundColor: "green",
          }}>

          </Box>

        </Box>

      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          // backgroundColor: "yellow",
          marginTop: "20px",
        }}
      >
        <Typography variant="body1">{product.description}</Typography>
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
        <Box marginTop={4} width="100%">
          <Typography variant="h5" marginBottom={2}>
            Comments
          </Typography>
          <List>
            {comments.map((comment, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={comment.username}
                  secondary={comment.comment}
                />
              </ListItem>
            ))}
          </List>
          <Box marginTop={2}>
            <Typography variant="h6">Leave a comment</Typography>
            <TextField
              label="Your Comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setComments([
                  ...comments,
                  {
                    id: comments.length + 1,
                    username: "JohnDoe",
                    comment: newComment,
                    rating: 5,
                    date: new Date().toISOString().split("T")[0],
                  },
                ]);
                setNewComment("");
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box> */}
    </>
  );
};

export default ProductDetail;
