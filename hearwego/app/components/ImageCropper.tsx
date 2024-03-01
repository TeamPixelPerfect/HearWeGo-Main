import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Box, Button, Typography, Slider, Stack } from "@mui/material";
import {
    CropSlider,
  CropperActions,
  CropperContainer,
  SliderContainer,
  SliderLabel,
} from "../styles/imageCropper.styles";
import getCroppedImg from "../handlers/cropImage";
import { PixelCropArea } from "../constants/models";
import { Pixelify_Sans } from "next/font/google";
import { handleImageUpload } from "../services/FileServices";
import { uploadImage } from "../handlers/uploadFiles";

interface Props {
  image: string;
  setImage: (image: string | null) => void;
  handleClose: () => void;
  aspectX: number;
  aspectY: number;
  shape: "rect" | "round";
}

const ImageCropper = ({
  image,
  setImage,
  handleClose,
  aspectX,
  aspectY,
  shape,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number|number[]>(0);
  const [zoom, setZoom] = useState<number|number[]>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (
    croppedArea: PixelCropArea,
    croppedAreaPixels: PixelCropArea
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        Number(rotation)
      );
      setCroppedImage(croppedImage);
      setImage(croppedImage);
      uploadImage("test", croppedImage as string);
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CropperContainer>
      <Cropper
        image={image}
        crop={crop}
        rotation={Number(rotation)}
        zoom={Number(zoom)}
        aspect={aspectX / aspectY}
        cropShape={shape}
        onCropChange={setCrop}
        onRotationChange={setRotation}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <CropperActions direction="row" spacing={2}>
        <SliderContainer>
          <SliderLabel
            variant="overline"
          >
            Zoom
          </SliderLabel>
          <CropSlider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </SliderContainer>
        <SliderContainer>
          <SliderLabel
            variant="overline"
          >
            Rotation
          </SliderLabel>
          <CropSlider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </SliderContainer>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={showCroppedImage}>
          Crop
        </Button>
      </CropperActions>
    </CropperContainer>
  );
};

export default ImageCropper;
