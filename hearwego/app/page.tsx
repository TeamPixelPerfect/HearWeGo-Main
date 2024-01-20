"use client";
import React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/lib/hooks";
import Stack  from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Home = () => {
  const app = useAppSelector((state) => state.app);

  return (
    <>
      <Box
        style={{
          width: "100%",
          height: "100vh",
          background: "#000",
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
            app.banner_imgs ? app.banner_imgs[0] : ""
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          position: "absolute",
          top: 0,
          zIndex: -1,
        }}
      ></Box>
      <Box sx={{padding: 4, marginTop: 30}}>
        <Box
          sx={{
            zIndex: 100,
            color: "#fff",
            fontSize: 80,
            fontWeight: "bold",
            marginBottom:0,
            paddingBottom:0,
            height: 80
          }}
        >
          Music For Living,
        </Box>
        <Box
          sx={{
            zIndex: 100,
            color: "#A5B4FC",
            fontSize: 80,
            fontWeight: "bold",
          }}
        >
          Live For Music.
        </Box>
      </Box>
      {/* <Stack spacing={2} direction="row" style={{zIndex: 100}}> 
          <Button variant="contained" color="primary">Join as Artist</Button>
          <Button variant="outlined" color="secondary">Join as Fan</Button>
      </Stack> */}
    </>
  );
};

export default Home;
