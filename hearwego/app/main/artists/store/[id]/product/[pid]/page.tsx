"use client"; 

import React, { useState } from 'react';
import { Container, Grid, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

interface Comment {
  id: number;
  username: string;
  comment: string;
  rating: number;
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhgAP-60PT1IOBAQddQodNfcFd5dbH4MsIqA&s",
      rating: 4,
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
      name: "Canon EOS Rebel T7i DSLR Camera",
      description: "This is a sample product description.",
      price: 13325.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
      rating: 3.5,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Hvy958Oj2sGzhIWCv-QezqAAcqzsct3HdA&s",
      rating: 4.5,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92vvUqXdziIP4FrxCPJo7G6oemT4TnpxUSg&s",
      rating: 2.5,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5oBDb1RPCPRI9YcsN461xLBsPSixy1hf_Gw&s",
      rating: 3.5,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeGtLvPukCF2z-9ruBGJgfK1ufoqI63244lw&s",
      rating: 1.5,
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
      image:
        "https://estudio.lk/wp-content/uploads/2021/09/WhatsApp-Image-2021-08-30-at-9.36.34-PM-300x300.jpeg",
      rating: 2,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TvBn8PhR6toQ_Tv2Z-4SUhCp2YesmO5caA&s",
      rating: 4.5,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUPbylf85GIvt4JPKd6w3lgObJhEj9_jWIQ&s",
      rating: 3.5,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJIynAUBiePm7bn2ozvVZAgtItfWsOdYMoA&s",
      rating: 2.5,
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqV1tfB4BP5W-acPcRcTXG9cHzqOKPkirNw&s",
      rating: 1.5,
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

import { Search, SearchIconWrapper, StyledInputBase, WhiteArea, ProductContainer, ProductImageContainer, CommentsContainer } from '../../../../../../styles/ArtistStrore.styles';

const ProductDetail: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(products[0].comments);
  const [newComment, setNewComment] = useState('');
  const product = products[0];

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, { id: Date.now(), username: 'NewUser', comment: newComment, rating: 5 }];
      setComments(updatedComments);
      setNewComment('');
    }
  };

  return (
    <Container sx={{
      backgroundColor: 'red',
    }}>

      <ProductContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="h6">${product.price.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Add to Cart
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProductImageContainer>
              <img src={product.image} alt={product.name} />
            </ProductImageContainer>
          </Grid>
          <Grid item xs={12}>
            <CommentsContainer>
              <Typography variant="h5">Comments</Typography>
              <List>
                {comments.map(comment => (
                  <ListItem key={comment.id}>
                    <ListItemText primary={`${comment.username}: ${comment.comment}`} />
                  </ListItem>
                ))}
              </List>
              <TextField
                label="Add a comment"
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{ marginTop: '1rem' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                style={{ marginTop: '1rem' }}
              >
                Add Comment
              </Button>
            </CommentsContainer>
          </Grid>
        </Grid>
      </ProductContainer>
    </Container>
  );
};

export default ProductDetail;
