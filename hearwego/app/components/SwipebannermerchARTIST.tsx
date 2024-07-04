// SwipeableBanner.tsx
"use client";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import StoreImgEditForm from "./StoreImgEditForm";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface StoreImg {
  id: number;
  image: string | File;
  title: string;
}

interface SwipeableStoreImgProps {
  StoreImgs: StoreImg[];
  setStoreImgs: React.Dispatch<React.SetStateAction<StoreImg[]>>;
  autoPlay?: boolean;
  indicators?: boolean;
  height?: number | string;
}

const SwipeableStoreImg: React.FC<SwipeableStoreImgProps> = ({
  StoreImgs, 
  setStoreImgs,
  autoPlay = true,
  indicators = false,
  height = "600px",
}) => {
  const [editStoreImg, setEditStoreImg] = useState<StoreImg | null>(null);

  const handleEdit = (StoreImg: StoreImg) => {
    setEditStoreImg(StoreImg);
  };

  const handleSave = (updatedStoreImg: StoreImg) => {
    const updatedStoreImgs = StoreImgs.map((StoreImg) =>
      StoreImg.id === updatedStoreImg.id ? updatedStoreImg : StoreImg
    );
    setStoreImgs(updatedStoreImgs);
    setEditStoreImg(null);
  };

  const handleClose = () => {
    setEditStoreImg(null);
  };

  return (
    <>
      {editStoreImg && (
        <StoreImgEditForm
          open={!!editStoreImg}
          StoreImg={editStoreImg}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
      <Carousel autoPlay={autoPlay} indicators={false}>
        {StoreImgs.map((StoreImg) => (
          <Paper key={StoreImg.id} style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
            <img
              src={typeof StoreImg.image === "string" ? StoreImg.image : URL.createObjectURL(StoreImg.image)}
              alt={StoreImg.title}
              style={{ width: "100%", height: height, objectFit: "cover" }}
            />
            {StoreImg.title && (
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
                  onClick={() => handleEdit(StoreImg)}
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

export default SwipeableStoreImg;
