"use client";
import DropFile from "@/app/components/DropFile";
import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useRouter } from "next/navigation";

const page = () => {
    const Router = useRouter();
  const [songFile, setSongFile] = useState("");

  const dropContainerStyles: React.CSSProperties = {
    marginTop:'10px',
    width: "100%",
    height: "50px",
    borderRadius: "15px",
    border: "2px dashed purple",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        backgroundColor: "#E0E7FF",
        padding: "10px",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "Auto",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            maxWidth: "800px",
            background: "white",
            borderRadius: "15px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <h1 style={{ margin: 0 }}>Create New Album</h1>
        </div>
      </div>
      <Box sx={{ display: "flex" }}>
        <Box>
          <DropFile
            fileTypes="Image"
            fileExtensions="JPG,PNG,JPEG"
            isCircular={false}
            width="300px"
            height="300px"
            file={songFile}
            setFile={setSongFile}
            aspectX={1}
            aspectY={1}
            shape="rect"
          />
        </Box>

        <div style={{ marginLeft: "40px", width: "700px", flexDirection:'column' }}>
          <div
            style={{
              padding: "0 8px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              background: "#D8B4FE",
              borderRadius: "15px",

              marginTop: "20px",
            }}
          >
            <Stack
              marginLeft="20px"
              marginTop="10px"
              direction="row"
              spacing={2}
            >
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Stack>

            <p style={{ color: "black", marginLeft: "20px" }}>
              I’ll be There For You
            </p>
            <GraphicEqIcon
              style={{ marginTop: "15px", marginLeft: "50px", color: "purple" }}
            />
            <p style={{ marginLeft: "10px", color: "black" }}>3.08</p>
            <div style={{ justifyContent: "flex-end" }}>
              <PlayArrowIcon style={{ color: "purple", marginTop: "15px" }} />
            </div>
          </div>
          <div
            style={{
              padding: "0 8px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              background: "#D8B4FE",
              borderRadius: "15px",

              marginTop: "20px",
            }}
          >
            <Stack
              marginLeft="20px"
              marginTop="10px"
              direction="row"
              spacing={2}
            >
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Stack>

            <p style={{ color: "black", marginLeft: "20px" }}>
              I’ll be There For You
            </p>
            <GraphicEqIcon
              style={{ marginTop: "15px", marginLeft: "50px", color: "purple" }}
            />
            <p style={{ marginLeft: "10px", color: "black" }}>3.08</p>
            <div style={{ justifyContent: "flex-end" }}>
              <PlayArrowIcon style={{ color: "purple", marginTop: "15px" }} />
            </div>
          </div>
          <div
            style={{
              padding: "0 8px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              background: "#D8B4FE",
              borderRadius: "15px",

              marginTop: "20px",
            }}
          >
            <Stack
              marginLeft="20px"
              marginTop="10px"
              direction="row"
              spacing={2}
            >
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Stack>

            <p style={{ color: "black", marginLeft: "20px" }}>
              I’ll be There For You
            </p>
            <GraphicEqIcon
              style={{ marginTop: "15px", marginLeft: "50px", color: "purple" }}
            />
            <p style={{ marginLeft: "10px", color: "black" }}>3.08</p>
            <div style={{ justifyContent: "flex-end" }}>
              <PlayArrowIcon style={{ color: "purple", marginTop: "15px" }} />
            </div>
          </div>
          <div
            style={{
              padding: "0 8px",
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              background: "#D8B4FE",
              borderRadius: "15px",

              marginTop: "20px",
            }}
          >
            <Stack
              marginLeft="20px"
              marginTop="10px"
              direction="row"
              spacing={2}
            >
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </Stack>

            <p style={{ color: "black", marginLeft: "20px" }}>
              I’ll be There For You
            </p>
            <GraphicEqIcon
              style={{ marginTop: "15px", marginLeft: "50px", color: "purple" }}
            />
            <p style={{ marginLeft: "10px", color: "black" }}>3.08</p>
            <div style={{ justifyContent: "flex-end" }}>
              <PlayArrowIcon style={{ color: "purple", marginTop: "15px" }} />
            </div>
          </div>
          <Box sx={dropContainerStyles} marginRight="20px">
            <p style={{color:'purple'}}>Add New Song</p>
          <PlaylistAddIcon style={{color:'purple'}}/>
          </Box>
        
        </div>
      </Box>

      <div
        style={{
            marginRight:'30px',
            marginTop:'40px',
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => {
              Router.push("add");
            }}>Cansel</Button>
          <Button variant="contained" onClick={() => {
              Router.push("add3");
            }}>Add</Button>
        </Stack>
      </div>
    </div>
  );
};

export default page;
