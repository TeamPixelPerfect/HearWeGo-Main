"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  useTheme,
  Stack,
  Button,
} from "@mui/material";
import { ADTabBox } from "@/app/styles/artistDashboard.styles";
import { IoAddOutline } from "react-icons/io5";
import { FaEdit, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MerchStore } from "@/app/admin/models/models";

interface Props {
  params: { id: string };
}

const store = {
  store_id: "store_001",
  store_banner:
    "https://dynamicmedia.livenationinternational.com/q/f/d/cab9ef2a-08fb-4b1c-9f2c-4048fc18b801.jpg",
  promo_banner: [
    "https://img.tourbandtees.com/uploads/Maroon-5-World-Tour-2023-Shirt-The-Residency-Graphic-Merch-Hoodie-T-Shirt-1688891749242.jpg",
    "https://pbs.twimg.com/media/E0PDHeQVIAMnBZN.jpg",
  ],
  store_description: "Welcome to the official merch store of Artist A!",
  artist_id: "artist_001",
  artist_name: "Artist A",
  createdAt: "2024-06-01T12:34:56.789Z",
  updatedAt: "2024-06-01T12:34:56.789Z",
  store_status: "active",
};

export default function StorePage({ params: { id } }: Props) {
  const theme = useTheme();
  const router = useRouter();

  const [storeData, setStoreData] = useState<MerchStore>();

  useEffect(() => {
    setStoreData(store);
    console.log(id);
  }, []);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          >
            Merchandise
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<FaEye />}
              sx={{
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
              }}
              onClick={() => {
                router.push(`/admin/merchandise/stores/${id}/products/`);
              }}
            >
              View Products
            </Button>
          </Stack>
        </Box>
        {/* <ADTabBox> */}
          <Box sx={{ p: 3 }}>
            {/* Store Banner */}
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="300"
                image={storeData?.store_banner}
                alt="Store Banner"
              />
            </Card>

            {/* Store Information */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {storeData?.artist_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {storeData?.store_description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Store ID: {storeData?.store_id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Artist ID: {storeData?.artist_id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created At: {storeData?.createdAt ? new Date(storeData.createdAt).toLocaleString() : ""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Updated At: {storeData?.updatedAt ? new Date(storeData?.updatedAt).toLocaleString() : ""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {storeData?.store_status}
                </Typography>
              </CardContent>
            </Card>

            {/* Promo Banners */}
            <Typography variant="h5" gutterBottom>
              Promo Banners
            </Typography>
            <Grid container spacing={2}>
              {storeData?.promo_banner.map((url, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={url}
                      alt={`Promo Banner ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        {/* </ADTabBox> */}
      </Card>
    </Grid>
  );
}
