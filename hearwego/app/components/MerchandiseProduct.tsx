import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { styled } from '@mui/system';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number; 
  category:string;// Add rating property
}

interface ProductCardProps {
  product: Product;
}

// Styled Card component with hover effect
const StyledCard = styled(Card)({
  maxWidth: 345,
  margin: 'auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Rating
          name="read-only-rating"
          value={product.rating}
          readOnly
          precision={0.5}
        />
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
          {product.price}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
