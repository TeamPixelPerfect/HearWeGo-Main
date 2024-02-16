"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DropFile from "@/app/components/DropFile";
import { Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from "next/navigation";

const AddSong = () => {
    const Router = useRouter();
  const [songFile, setSongFile] = useState("");
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
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
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "100%",
              maxWidth: "100%",
              minWidth: "100px",
              height: "80vh",
              background:
                "url('https://img.freepik.com/free-photo/guitarist-playing-dark-nightclub-illuminated-by-spotlight-generated-by-artificial-intelligence_24640-131059.jpg?t=st=1708051590~exp=1708055190~hmac=45891fb46ee40d3ec2042efa6fc526cd3f64d0a241ed3ca1e894401ed1630ddf&w=1060')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "rgba(255,255,255, 0.6)",
                flexDirection: "row",
                padding: "10px",
                width: "100%",
                height: "200px",

                borderRadius: "2px",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  width: "25%",

                  height: "100%",
                  background:
                    "url('https://marketplace.canva.com/EAFWz37wwl0/1/0/1600w/canva-black-minimalist-photocentric-rose-on-fire-hip-hop-album-cover-laJL2q01ZUU.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                  borderRadius: "20px",
                  transition:"width 0.3s",
                  "&:hover" :{
                    width:"35%"

                  }
                }}
              ></Box>
              <Box
                sx={{
                    marginLeft:'10px',
                  display: "flex",

                  width: "25%",

                  height: "100%",
                  background:
                    "url('https://pixelsao.com/wp-content/uploads/2020/03/bass-anthology-preview.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                  borderRadius: "20px",
                  transition:"width 0.3s",
                  "&:hover" :{
                    width:"35%"

                  }
                }}
              ></Box>
               <Box
                sx={{
                    marginLeft:'10px',
                  display: "flex",

                  width: "25%",

                  height: "100%",
                  background:
                    "url('https://d1csarkz8obe9u.cloudfront.net/posterpreviews/love-music-headphones-mixtape-cd-cover-design-template-cefb69d2c23d9f3945d1870dd4986f84_screen.jpg?ts=1608649991')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                  borderRadius: "20px",
                  transition:"width 0.3s",
                  "&:hover" :{
                    width:"35%"

                  }
                  
                }}
              ></Box>
               <Box
                sx={{
                    marginLeft:'10px',
                  display: "flex",

                  width: "25%",

                  height: "100%",
                  background:
                    "url('https://static-cse.canva.com/blob/1349821/1600w-YmFtIRl8-qo.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                  borderRadius: "20px",
                  transition:"width 0.3s",
                  "&:hover" :{
                    width:"35%"

                  }
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
      <Button  variant="contained" endIcon={<ExpandMoreIcon />}>
        View More
      </Button>

      </div>
     

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => {
              Router.push("add3");
            }}>Back</Button>
          <Button variant="outlined" onClick={() => {
              Router.push("add");
            }}>Add more</Button>
          <Button variant="contained" onClick={() => {
              Router.replace(" /artist/albums ");
            }}>Save</Button>
        </Stack>
      </div>
    </div>
  );
};

export default AddSong;
