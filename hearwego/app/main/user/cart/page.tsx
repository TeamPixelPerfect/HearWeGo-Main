"use client";
import React, { useState } from 'react';
import { Button, Select, MenuItem, IconButton, Box, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Margarine } from 'next/font/google';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  availableColors: string[];
  image: string;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: 'Black music T-shirt',
    price: 120,
    quantity: 1,
    color: 'Black',
    availableColors: ['Black', 'Gray', 'White'],
    image:'https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png',
  },
  {
    id: 2,
    name: 'music Premium T-Shirt',
    price: 120,
    quantity: 1,
    color: 'Orange',
    availableColors: ['Orange', 'Red', 'Yellow'],
    image: 'https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png',
  },
];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(cart.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleColorChange = (id: number, color: string) => {
    setCart(cart.map(item => (item.id === id ? { ...item, color } : item)));
  };

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
 
    <Box sx={{ padding: '20px' }}>
      <Box sx={{display:'flex',flexDirection:'row'}}>

     <h1 >  <ArrowBackIosNewIcon sx={{marginRight:'10px'}}/>Shopping Cart</h1>
      </Box>
     
      <Table sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
          <TableCell sx={{fontSize:"17px"}}>Product</TableCell>
            <TableCell sx={{fontSize:'17px'}}>Quantity</TableCell>
            <TableCell sx={{fontSize:'17px'}}>Color</TableCell>
            <TableCell sx={{fontSize:'17px'}}>Price</TableCell>
            <TableCell sx={{fontSize:'17px'}}>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map(item => (
            <TableRow key={item.id}>
              <TableCell sx={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                <img src={item.image} alt ={item.name} style={{ maxWidth: '50px', marginRight: '10px' }} />
                {item.name}
              </TableCell>
              <TableCell sx={{justifyContent:'center'}}>
                <Button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                {item.quantity}
                <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
              </TableCell>
              <TableCell>
                <Select value={item.color} onChange={(e) => handleColorChange(item.id, e.target.value as string)}>
                  {item.availableColors.map(color => (
                    <MenuItem key={color} value={color}>{color}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>${item.price * item.quantity}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemoveItem(item.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))} 
        </TableBody>
      </Table>
      <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
  <Typography variant="h6" component="span" sx={{marginRight:'70px'}}>Total:</Typography>
  <Box component="span" sx={{ marginRight:'300px', fontWeight: 'bold' }}>${total}</Box>
  <br></br>
  <Button variant="contained" color="primary" sx={{ marginRight:'50px',marginTop:'30px' }}>Checkout</Button>
</Box>

    </Box>
  );
};

export default App;
