"use client";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

interface Banner {
  id: number;
  image: string;
  title: string;
}

interface SwipeableBannerProps {
  banners: Banner[];
}

const SwipeableBanner: React.FC<SwipeableBannerProps> = ({ banners }) => {
  return (
    <Carousel autoPlay={true} indicators={false}>
      {banners.map((banner) => (
        <Paper key={banner.id} style={{ position: "relative", margin: 0, padding: 0 }}>
          <img
            src={banner.image}
            alt={banner.title}
            style={{ width: "100%", height: "600px", objectFit: "cover" }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default SwipeableBanner;
