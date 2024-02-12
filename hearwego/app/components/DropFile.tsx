"use client";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { RiImageAddFill } from "react-icons/ri";
import { Typography } from "@mui/material";

interface Props {
    fileTypes: string,
    fileExtensions: string,
    isCircular: boolean,
    width: string,
    height: string
}


const DropFile = ({fileTypes, fileExtensions, isCircular, width, height}: Props) => {
  const [file, setFile] = useState<any>(null);

  const handleSelectFile = (acceptedFiles: File[]) => {
    setFile(URL.createObjectURL(acceptedFiles[0]));
  };

  return (
    <Dropzone onDrop={(acceptedFiles) => handleSelectFile(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <section
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid #fff",
            borderRadius: isCircular?"50%":"10px",
            width: isCircular?"170px":width,
            minWidth: isCircular?"170px":width,
            height: isCircular?"170px":height,
            marginTop: isCircular?"0":"20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            {...getRootProps()}
            style={{
              width: isCircular?"80%":"85%",
              height: "80%",
              borderWidth: "3px",
              borderStyle: "dashed",
              borderColor: "rgba(255,255,255,0.4)",
              borderRadius: isCircular?"50%":"10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {file ? (
              <img src={file} style={{width:"100%", height:"100%", borderRadius:isCircular?"50%":"10px"}}/>
            ) : (
              <>
                <RiImageAddFill style={{ fontSize: isCircular?"40px":"60px", color: "#fff" }} />
                <input {...getInputProps()} />
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: "center", color: "#fff", fontSize:isCircular?"12px":"16px" }}
                >
                  Drop your {fileTypes} or{" "}
                  <span style={{ color: "#4338CA" }}>Browse</span>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    padding: "20px 0",
                    fontSize: isCircular?"10px":"12px",
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
  );
};

export default DropFile;
