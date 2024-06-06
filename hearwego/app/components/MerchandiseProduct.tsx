import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;

}

const StyledCard = styled(Card)({
    maxWidth: 345,
    margin: 'auto',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  });

const ProductCard: React.FC<ProductCardProps> = ({ product}) => {
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
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
          ${product.price}
        </Typography>
    
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
