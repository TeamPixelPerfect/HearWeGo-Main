"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { RiImageAddFill } from "react-icons/ri";
import { Box, Typography } from "@mui/material";
import ImageCropper from "./ImageCropper";
import Modal from "@mui/material/Modal";
import { CropperModal } from "../styles/imageCropper.styles";
import { TbMusicPlus } from "react-icons/tb";

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

const DropSong = ({
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

  const handleSelectFile = (acceptedFiles: File[]) => {
    setFile(URL.createObjectURL(acceptedFiles[0]));
    handleOpen();
  };

  return (
    <>
     
      <Dropzone onDrop={(acceptedFiles) => handleSelectFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid #9333EA",
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
                borderColor: "rgba(147,51,234,0.4)",
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
                  <TbMusicPlus
                    style={{
                      fontSize: isCircular ? "40px" : "60px",
                      color: "#9333EA",
                    }}
                  />
                  <input {...getInputProps()} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: "center",
                      color: "#9333EA",
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

export default DropSong;
