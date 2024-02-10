import React from 'react'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/system/Box';
import { SearchBar } from '../../styles/fanclub.style';


function FanClub() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        borderRadius: "1px",
        bgcolor: "primary.main",
      }}
    >
      <Box sx={{ position:'relative',width:'100%',color:'black'}}>
        <Paper
          component="form"
          sx={{ position:'absolute',top:'50%',left:'50%'}}
        >
          <IconButton sx={{ p: '10px' }} aria-label="menu">

          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>

          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">

          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}


export default FanClub