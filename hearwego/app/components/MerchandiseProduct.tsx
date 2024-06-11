"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import Box from "@mui/material/Box";

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
  image1: string;
  image2: string;
  rating: number;
  ratingCount: number;
  category: string;
  subcategory: string;
  comments: Comment[];
}

interface ProductCardProps {
  product: Product;
}

// Styled Card component with hover effect
const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: "auto",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href="/main/artists/store/1/product/1">
      <StyledCard>
        <CardMedia
          component="img"
          height="140"
          image={product.image1}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
          
           
            
            
          
          }}>
          <Rating
            name="read-only-rating"
            value={product.rating}
            readOnly
            precision={0.5}
           
          /> <Typography variant="body2" color="text.secondary" sx={{ marginLeft:"20px",marginTop:"2px"}}>{product.ratingCount}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
            Rs {product.price}
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default ProductCard;
