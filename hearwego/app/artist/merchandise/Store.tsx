"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import SwipeableStoreImg from "@/app/components/SwipebannermerchARTIST";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { motion } from "framer-motion";

const StoreImgs = [
  {
    id: 1,
    image:
      "https://blog.clover.com/wp-content/uploads/2022/11/couple-using-phone-while-holiday-shopping.jpg",
    title: "StoreImg 1",
  },
  {
    id: 2,
    image:
      "https://media.istockphoto.com/id/1368994091/photo/couple-shopping-using-phone-application-holding-shopper-bags-in-mall.jpg?s=612x612&w=0&k=20&c=AnmKCImJhAqQzFQXh1xUZ9M0oLGGbrxpbfYmlXoGrYE=",
    title: "StoreImg 2",
  },
  {
    id: 3,
    image:
      "https://www.shutterstock.com/image-photo/midsection-couple-shopping-bags-city-600nw-428604085.jpg",
    title: "StoreImg 3",
  },
];

const shippingInfo = {
  deliveryFees: "$5 for orders under $50, Free for orders over $50",
  deliveryServices: "Standard shipping, Expedited shipping",
};

const promotionalCampaigns = [
  {
    id: 1,
    image:
      "https://assets-static.invideo.io/images/large/Creative_Clothing_Advertisement_Ideas_To_Boost_Sales_revised_3_1_cefa9cda88.png",
    title: "Promotion 1",
    publishedDate: "2022-11-01", // Add the published date here
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmAfOtyFpYQpSps8V303hiiUHwuhLBJPNFyo3xw48HuZSnV4HqQqNGzAfOdJYauIq1I4U&usqp=CAU",
    title: "Promotion 2",
    publishedDate: "2022-11-02", // Add the published date here
  },
  {
    id: 3,
    image:
      "https://miro.medium.com/v2/resize:fit:1055/1*PhJxEjp-ls0g58KFmwLslA.png",
    title: "Promotion 3",
    publishedDate: "2022-11-03", // Add the published date here
  },
];

const InfoCard = ({
  icon,
  title,
  content,
  isEditing,
  onEdit,
  onSave,
  editedContent,
  setEditedContent,
}) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: "20px",
      textAlign: "center",
    }}
  >
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}>
      <IconButton>{icon}</IconButton>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {isEditing ? (
        <>
          <TextField
            multiline
            variant="outlined"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{ borderRadius: "4px", width: "100%" }}
          />
          <IconButton
            onClick={onSave}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <SaveIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="body1" sx={{ color: "grey" }}>
            {content}
          </Typography>
          <IconButton
            onClick={onEdit}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </motion.div>
  </Paper>
);

const PromotionCard = ({ id, image, title, publishedDate, onDelete }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={id}>
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        height: "250px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "10px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          <Typography variant="body2">{publishedDate}</Typography>
        </Box>
        <IconButton
          onClick={() => onDelete(id)}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  </motion.div>
);

const Store = () => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [storeDescription, setStoreDescription] = useState(
    "We offer a wide range of high-quality products to meet your needs. Explore our collections and find the perfect items for you."
  );
  const [editedDescription, setEditedDescription] = useState(storeDescription);

  const [isEditingDeliveryFees, setIsEditingDeliveryFees] = useState(false);
  const [deliveryFees, setDeliveryFees] = useState(shippingInfo.deliveryFees);
  const [editedDeliveryFees, setEditedDeliveryFees] = useState(deliveryFees);

  const [isEditingDeliveryServices, setIsEditingDeliveryServices] =
    useState(false);
  const [deliveryServices, setDeliveryServices] = useState(
    shippingInfo.deliveryServices
  );
  const [editedDeliveryServices, setEditedDeliveryServices] =
    useState(deliveryServices);

  const [campaigns, setCampaigns] = useState(promotionalCampaigns);

  const handleEditDescription = () => {
    setIsEditingDescription(true);
    setEditedDescription(storeDescription);
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    setStoreDescription(editedDescription);
  };

  const handleEditDeliveryFees = () => {
    setIsEditingDeliveryFees(true);
    setEditedDeliveryFees(deliveryFees);
  };

  const handleSaveDeliveryFees = () => {
    setIsEditingDeliveryFees(false);
    setDeliveryFees(editedDeliveryFees);
  };

  const handleEditDeliveryServices = () => {
    setIsEditingDeliveryServices(true);
    setEditedDeliveryServices(deliveryServices);
  };

  const handleSaveDeliveryServices = () => {
    setIsEditingDeliveryServices(false);
    setDeliveryServices(editedDeliveryServices);
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
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
        <SwipeableStoreImg
          StoreImgs={StoreImgs}
          autoPlay={false}
          indicators={false}
          height="500px"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "40px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          position: "relative",
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
                  sx={{ borderRadius: "4px" }}
                />
                <IconButton
                  onClick={handleSaveDescription}
                  sx={{ position: "absolute", bottom: 10, right: 10 }}
                >
                  <SaveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  Welcome to Our Store
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: "grey" }}>
                  {storeDescription}
                </Typography>
                <IconButton
                  onClick={handleEditDescription}
                  sx={{ position: "absolute", bottom: 10, right: 10 }}
                >
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
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={12} md={4}>
            <InfoCard
              icon={<LocalShippingIcon fontSize="large" />}
              title="Delivery Services"
              content={deliveryServices}
              isEditing={isEditingDeliveryServices}
              onEdit={handleEditDeliveryServices}
              onSave={handleSaveDeliveryServices}
              editedContent={editedDeliveryServices}
              setEditedContent={setEditedDeliveryServices}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard
              icon={<MonetizationOnIcon fontSize="large" />}
              title="Delivery Fees"
              content={deliveryFees}
              isEditing={isEditingDeliveryFees}
              onEdit={handleEditDeliveryFees}
              onSave={handleSaveDeliveryFees}
              editedContent={editedDeliveryFees}
              setEditedContent={setEditedDeliveryFees}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          padding: "40px 20px",
          textAlign: "left",
          marginTop: "10px",
          // marginBottom: "40px",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
          Latest Promos
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={0}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} md={12} key={campaign.id}>
              <PromotionCard
                id={campaign.id}
                image={campaign.image}
                title={campaign.title}
                publishedDate={campaign.publishedDate} // Pass the published date here
                onDelete={handleDeleteCampaign}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Store;
