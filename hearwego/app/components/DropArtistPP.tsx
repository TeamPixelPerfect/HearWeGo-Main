"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Box, Typography, useTheme } from "@mui/material";
import ImageCropper from "./ImageCropper";
import Modal from "@mui/material/Modal";
import { CropperModal } from "../styles/imageCropper.styles";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface Props {
  fileTypes: string;
  fileExtensions: string;
  isCircular: boolean;
  width: string;
  height: string;
  file: any;
  setFile: (file: any) => void;
  aspectX: number;
  aspectY: number;
  shape: "rect" | "round";
}

const DropFile = ({
  fileTypes,
  fileExtensions,
  isCircular,
  width,
  height,
  file,
  setFile,
  aspectX,
  aspectY,
  shape,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  // Function to handle the file selection
  const handleSelectFile = (acceptedFiles: File[]) => {
    setFileName(acceptedFiles[0].name);
    setFile(URL.createObjectURL(acceptedFiles[0]));
    handleOpen();
  };

  const defaultImageUrl = "https://i.pinimg.com/originals/63/f9/d5/63f9d5fd5f34c8544a31c22c3e909cec.jpg";

  return (
    <>
      <CropperModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {file ? (
          <ImageCropper
            name={fileName}
            image={file}
            setImage={setFile}
            handleClose={handleClose}
            aspectX={aspectX}
            aspectY={aspectY}
            shape={shape}
          />
        ) : (
          <Box>No image file selected</Box>
        )}
      </CropperModal>
      <Dropzone
        accept={{ "image/*": [] }}
        onDrop={(acceptedFiles) => handleSelectFile(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section
            style={{
              background: "rgba(255,255,255,0.1)",
              border: `1px solid ${theme.palette.text.primary}`,
              borderRadius: isCircular ? "50%" : "10px",
              width: isCircular ? "250px" : width,
              minWidth: isCircular ? "250px" : width,
              height: isCircular ? "250px" : height,
              marginTop: isCircular ? "0" : "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              {...getRootProps()}
              style={{
                width: isCircular ? "80%" : "85%",
                height: "80%",
                borderWidth: "3px",
                borderStyle: "dashed",
                borderColor: theme.palette.text.primary,
                borderRadius: isCircular ? "50%" : "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                objectFit: "cover",
              }}
            >
              {file ? (
                <img
                  src={file}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: isCircular ? "50%" : "10px",
                  }}
                />
              ) : (
                <>
                  <input {...getInputProps()} />
                  <img
                    src={defaultImageUrl}
                    alt="Default"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: isCircular ? "50%" : "10px",
                    }}
                  />
                </>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default DropFile;
