"use client";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box, Typography, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SwipeableBanner from "@/app/components/SwipebannermerchARTIST";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import styled from "@emotion/styled";



const AnimatedIcon = styled(motion.span)({
  display: "inline-block",
  marginRight: "8px",
  "&:last-child": {
    marginRight: "0",
  },
});
const banners = [
  {
    id: 1,
    image: "https://blog.daraz.lk/wp-content/uploads/2022/11/Banner.jpg",
    title: "Banner 1",
  },
  {
    id: 2,
    image:
      "https://blog.daraz.lk/wp-content/uploads/2022/11/Amazing-Black-Friday-Deals-On-Fashion-Up-To-30-Off-Banner.jpg",
    title: "Banner 2",
  },
  {
    id: 3,
    image:
      "https://blog.daraz.lk/wp-content/uploads/2023/03/Avurudu-Wasi-English-Banner-02.jpg",
    title: "Banner 3",
  },
];

const initialPromoBanners = [
  {
    id: 1,
    image: "https://example.com/promo1.jpg",
    title: "Promo 1",
  },
  {
    id: 2,
    image: "https://example.com/promo2.jpg",
    title: "Promo 2",
  },
  {
    id: 3,
    image: "https://example.com/promo3.jpg",
    title: "Promo 3",
  },
];

const shippingInfo = {
  deliveryFees: "$5 for orders under $50, Free for orders over $50",
  deliveryServices: "Standard shipping, Expedited shipping",
};

const Store = () => {
  const [promoBanners, setPromoBanners] = useState(initialPromoBanners);
  const [editingPromoId, setEditingPromoId] = useState(null);
  const [newImage, setNewImage] = useState("");

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [storeDescription, setStoreDescription] = useState(
    "We offer a wide range of high-quality products to meet your needs. Explore our collections and find the perfect items for you."
  );
  const [editedDescription, setEditedDescription] = useState(storeDescription);

  const handleEditDescription = () => {
    setIsEditingDescription(true);
    setEditedDescription(storeDescription);
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    setStoreDescription(editedDescription);
  };

  const handleEditPromo = (id) => {
    setEditingPromoId(id);
    // Assuming you want to start editing with the existing image
    const promo = promoBanners.find((banner) => banner.id === id);
    setNewImage(promo.image);
  };

  const handleSavePromo = (id) => {
    // Save the edited image to the promoBanners state
    setPromoBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id ? { ...banner, image: newImage } : banner
      )
    );
    // Clear the editing state
    setEditingPromoId(null);
    setNewImage("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box sx={{ width: "100%" }}>
      <SwipeableBanner banners={banners} autoPlay={false} indicators={false} height="500px" />
       
      </Box>
      <Box
        sx={{
          width: "100%",
          // backgroundColor: "#f9f9f9",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "40px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            {isEditingDescription ? (
              <>
                <TextField
                  multiline
                  fullWidth
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <IconButton onClick={handleSaveDescription}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom sx={{fontWeight:"bold",marginBottom:"10px"}}>
                  Welcome to Our Store
                </Typography>
                <Typography variant="body1" gutterBottom sx={{color:"grey"}}>
                  {storeDescription}
                </Typography>
                <IconButton onClick={handleEditDescription}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#f0f0f0",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Shipping Information
            </Typography>
            <Paper elevation={3} sx={{ p: 3, maxWidth: 400, margin: 'auto', borderRadius: '10px' }}>
              <AnimatedIcon whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <EditIcon />
              </AnimatedIcon>
              <Typography variant="body1" gutterBottom>
                <strong>Delivery Fees:</strong> {shippingInfo.deliveryFees}
              </Typography>
              <AnimatedIcon whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <EditIcon />
              </AnimatedIcon>
              <Typography variant="body1">
                <strong>Delivery Services:</strong> {shippingInfo.deliveryServices}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

   
      {/* <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "40px" }}
      >
        {promoBanners.map((banner) => (
          <Grid item xs={12} md={4} key={banner.id}>
            <Typography variant="h5" gutterBottom>
              Promo Banner {banner.id}
            </Typography>
            {editingPromoId === banner.id ? (
              <>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
                <IconButton onClick={() => handleSavePromo(banner.id)}>
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Carousel>
                  <Paper>
                    <img
                      src={banner.image}
                      alt={banner.title}
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </Paper>
                </Carousel>
                <IconButton onClick={() => handleEditPromo(banner.id)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Grid>
        ))} */}
        {/* <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Shipping Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Delivery Fees: {shippingInfo.deliveryFees}
          </Typography>
          <Typography variant="body1">
            Delivery Services: {shippingInfo.deliveryServices}
          </Typography>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default Store;
