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
import { MerchProduct } from "../constants/models";

interface Comment {
  id: number;
  username: string;
  comment: string;
  rating: number;
}

interface ProductCardProps {
  product: MerchProduct;
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
    <Link href={"/main/artists/store/1/product/" + product?.product_id}>
      <StyledCard>
        <CardMedia 
          component="img"
          height="140"
          image={product.product_Main_image}
          alt={product.product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.product_name}
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
          
           
            
            
          
          }}>
          <Rating
            name="read-only-rating"
            value={Number(product.product_rating)}
            readOnly
            precision={0.5}
           
          /> <Typography variant="body2" color="text.secondary" sx={{ marginLeft:"20px",marginTop:"2px"}}>{product?.rating_count}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {product.product_description}
          </Typography>
          <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
            Rs {product.product_price}
          </Typography>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default ProductCard;
