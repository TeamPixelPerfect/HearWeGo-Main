import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryProps {
  category: Category;
}

const CategoryComponent: React.FC<CategoryProps> = ({ category }) => {
  return (
    <Card
      style={{
        maxWidth: 350,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        style={{
          width: '100%',
          height: 400,
          objectFit: 'cover',
        }}
      />
      <CardContent
        style={{
          position: 'absolute',
          bottom: 5,
          left: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '8px',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h6" component="div">
          {category.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryComponent;
