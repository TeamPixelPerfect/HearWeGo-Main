"use client";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export default function CustomizedInputBase() {
  return (
     <div style={{backgroundColor: '#F3E8FF',minHeight: '100vh',minWidth:'100%',position:'fixed'}}>
<Paper
      component="form"
      sx={{ 
        p: '2px 4px', 
        display: 'flex', 
        alignItems: 'center', 
        width: 800,
        height: 40,
        position: 'fixed',
        top:'20%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
      
    }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        
      </IconButton>
      <InputBase
        sx={{ 
          marginLeft: 1, 
          flex: 1,
          textAlign: 'center',
          color: '9A9A9A',

        }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
  
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        
      </IconButton>
    </Paper>
    <Box
        sx={{
          width:'100%',
          height:100,
          borderRadius: 1,
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: 9,
        
          bgcolor: 'primary.main',
        
        }}
      />
  </div>

  );
}
