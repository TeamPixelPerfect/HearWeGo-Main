"use client";
import {useRouter} from 'next/navigation';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';  
import Link from 'next/link';


interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryProps {
  category: Category;
}


const CategoryComponent: React.FC<CategoryProps> = ({ category }) => {
  const router = useRouter();
  return (
    <Card
      style={{
        maxWidth: 450,
        position: 'relative',
        overflow: 'hidden',
        
      }}
    >
      <div
        style={{
          position: 'relative',
        }}
      >
        <img
          src={category.image}
          alt={category.name}
          style={{
            width: '100%',
            height: 300,
            objectFit: 'cover',
            filter: 'brightness(50%)', // Darkening the image
          }}
        />
        <CardContent
          style={{
            position: 'absolute',
            bottom: "20%",
            left: "0%",
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* <Link href="/main/artists/store/1/category/1"> */}
            <Button 
               onClick={() => {
                router.push("/main/artists/store/1/category/1");
              }}
              >
           
          <Typography variant="h4" component="div" style={{ color: 'white', fontWeight: 'bold',textTransform:"none", textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {category.name}
          </Typography>
          </Button>
          {/* </Link> */}
        </CardContent>
      </div>
    </Card>
  );
};

export default CategoryComponent;
