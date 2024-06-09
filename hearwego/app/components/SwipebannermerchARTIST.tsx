// SwipeableBanner.tsx
"use client";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import BannerEditForm from "./BannerEditForm";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface Banner {
  id: number;
  image: string | File;
  title: string;
}

interface SwipeableBannerProps {
  banners: Banner[];
  autoPlay?: boolean;
  indicators?: boolean;
  height?: number | string;
}

const SwipeableBanner: React.FC<SwipeableBannerProps> = ({
  banners: initialBanners,
  autoPlay = true,
  indicators = false,
  height = "600px",
}) => {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);

  const handleEdit = (banner: Banner) => {
    setEditBanner(banner);
  };

  const handleSave = (updatedBanner: Banner) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === updatedBanner.id ? updatedBanner : banner
    );
    setBanners(updatedBanners);
    setEditBanner(null);
  };

  const handleClose = () => {
    setEditBanner(null);
  };

  return (
    <>
      {editBanner && (
        <BannerEditForm
          open={!!editBanner}
          banner={editBanner}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
      <Carousel autoPlay={autoPlay} indicators={false}>
        {banners.map((banner) => (
          <Paper key={banner.id} style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
            <img
              src={typeof banner.image === "string" ? banner.image : URL.createObjectURL(banner.image)}
              alt={banner.title}
              style={{ width: "100%", height: height, objectFit: "cover" }}
            />
            {banner.title && (
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  // color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {/* <h2>{banner.title}</h2> */}
                <IconButton
                  onClick={() => handleEdit(banner)}
                  style={{  marginLeft: "10px" }}
                >
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </Paper>
        ))}
      </Carousel>
    </>
  );
};

export default SwipeableBanner;
