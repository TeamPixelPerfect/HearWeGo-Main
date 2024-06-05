"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../styles/ArtistStrore.styles";

export default function ArtistStore() {
  return (
    <>
       <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <IconButton type="button" sx={{ p: "10" }} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                padding: "70px",
              }}
              placeholder="Search here"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <WhiteArea>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
      <Box sx={{
      display: "flex",
      flexDirection: "row",
      
    

      }}>
     
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "10px",
            width: "100%",
            height: "auto",
            padding: { xs: "10px", sm: "20px" },
            border: "1px solid #E6ECF0",
            overflowY: "auto",
            maxHeight: "800px"
          }}
        >
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="main-panel-content"
              id="main-panel-header"
            >
              <Typography sx={{ fontSize: "20px" }}>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {[1, 2, 3, 4, 5].map((category) => (
                <Accordion
                  key={`category-${category}`}
                  sx={{ width: "100%", border: "none", boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${category}-content`}
                    id={`panel${category}-header`}
                    sx={{ flexDirection: "row-reverse" }}
                  >
                    <Typography sx={{ fontSize: "18px" }}>{`Category ${category}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: "15px", marginLeft: "20px" }}>{`Category ${category}`}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
          </Box>

          <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={2} lg={20}>
      <Box sx={{
      display: "flex",
      flexDirection: "row",
      }}>

      
    <Box sx={{
      width: "100%",
      height: "300px",
      backgroundColor: "red",
      margin: "10px",
    }}>
      </Box>
      <Box sx={{
      width: "100%",
      height: "100px",
      backgroundColor: "yellow",
      margin: "10px",
    }}>
      </Box>
      </Box>
    </Grid>
    </Grid>
      </Box>
  </Grid>
</Grid>
    
      </WhiteArea>
    </>
  );
}
