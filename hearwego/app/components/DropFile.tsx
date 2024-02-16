"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { RiImageAddFill } from "react-icons/ri";
import { Box, Typography, useTheme } from "@mui/material";
import ImageCropper from "./ImageCropper";
import Modal from "@mui/material/Modal";
import { CropperModal } from "../styles/imageCropper.styles";

interface Props {
  fileTypes: string;
  fileExtensions: string;
  isCircular: boolean;
  width: string;
  height: string;
  file: any;
  setFile: (file: any) => void;
  aspectX: number,
  aspectY: number,
  shape: 'rect'|'round'
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
  shape
}: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  const handleSelectFile = (acceptedFiles: File[]) => {
    setFile(URL.createObjectURL(acceptedFiles[0]));
    handleOpen();
  };

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
      <Dropzone onDrop={(acceptedFiles) => handleSelectFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section
            style={{
              background: "rgba(255,255,255,0.1)",
              border: `1px solid ${theme.palette.text.primary}`,
              borderRadius: isCircular ? "50%" : "10px",
              width: isCircular ? "170px" : width,
              minWidth: isCircular ? "170px" : width,
              height: isCircular ? "170px" : height,
              marginTop: isCircular ? "0" : "20px",
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
                  <RiImageAddFill
                    style={{
                      fontSize: isCircular ? "40px" : "60px",
                      color: theme.palette.text.primary,
                    }}
                  />
                  <input {...getInputProps()} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: "center",
                      color: theme.palette.text.primary,
                      fontSize: isCircular ? "12px" : "16px",
                    }}
                  >
                    Drop your {fileTypes} or{" "}
                    <span style={{ color: "#4338CA" }}>Browse</span>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      padding: "20px 0",
                      fontSize: isCircular ? "10px" : "12px",
                    }}
                  >
                    <em>Supports {fileExtensions}</em>
                  </Typography>
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
