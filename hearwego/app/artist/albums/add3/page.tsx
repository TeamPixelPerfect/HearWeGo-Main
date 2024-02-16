"use client";
import { Box } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Margin, Router } from "@mui/icons-material";

import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useRouter } from "next/navigation";


const page = () => {
  const Router = useRouter();
  const dropContainerStyles: React.CSSProperties = {
    marginTop: "10px",
    marginLeft: "30px",
    width: "60%",
    height: "35px",
    borderRadius: "5px",
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
          <h1 style={{ margin: 0 }}>Add New Album</h1>
        </div>
      </div>

      <Box
        sx={{
          marginTop: "40px",

          display: "flex",
          backgroundColor: "#D5C2F5",
          flexDirection: "column",

          width: "100%",
          height: "auto",
          borderRadius: "20px",
          padding: "8px",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ display: "flex", width: "50%" }}>
            <Box
              sx={{
                width: "300px",
                minWidth:'200px',
                height: "300px",
                background:
                  "url('https://ichef.bbci.co.uk/images/ic/1920xn/p0d4q92r.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "20px",
              }}
            ></Box>
            <Box sx={{ marginLeft: "20px" }}>
              <h2 style={{ color: "black" }}>*Artist</h2>
              <h2 style={{ color: "black" }}>*Title</h2>
              <p
                style={{
                  color: "purple",
                  backgroundColor: "white",
                  borderRadius: "7px",
                }}
              >
                #rock #dj #hiphop #HipHopBeats #ReggaeVibes #ExperimentalMusic
              </p>
              <p
                style={{
                  color: "white",
                  width: "70px",
                  backgroundColor: "purple",
                  borderRadius: "7px",
                  alignItems: "center",
                  padding: "3px",
                }}
              >
                Private
              </p>
              <p style={{ color: "black" }}>Upload Complete</p>
              <p style={{ color: "blue" }}>Go to your track</p>
            </Box>
          </Box>
          <Box sx={{display:'flex',width:"50%",justifyContent:"center",alignItems:"center",flexDirection:'column'}}>
            <p style={{color:'purple'}}>Share your new track</p>
            <Box
          sx={{
            width: "200px",
            height: "100px",
            background:
              "url('https://cdn.pixabay.com/photo/2020/06/30/14/37/facebook-5356593_1280.png')",
            backgroundPosition: "center",
            backgroundSize:'contain',
            borderRadius: "20px"
          }}
        ></Box>
           <p style={{ backgroundColor:"white",borderRadius:"5px",padding:"5px",marginTop:"120px",color:'#6366F1'}}>https://www.Hearwego.song.com</p>
          </Box>
        </Box>
      </Box>
      <p>
        By uploading, you confirm that your sounds comply with our Terms of Use
        and you don't infringe anyone else's rights.
      </p>
      <h2> Platform Link</h2>
      <p style={{ marginLeft: "30px", color: "#6366F1" }}>
        https://open.spotify.com/playlist/37i9dQZF1DWWY64wDtewQt?si=8e46f716cca54567
      </p>
      <Box sx={{ display: "flex" }}>
        <Box sx={dropContainerStyles} marginRight="20px">
          <p style={{ color: "purple", opacity: "0.6", marginRight: "30px" }}>
            Add Link
          </p>

          <ContentPasteIcon style={{ color: "purple" }} />
        </Box>
        <ControlPointIcon style={{ color: "purple", marginTop: "15px" }} />
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => {
              Router.push("add2");
            }}
          >
            Cansel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              Router.replace("add4");
            }}
          >
            Save
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default page;
