"use client";
import React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/lib/hooks";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";

const Home = () => {
  const app = useAppSelector((state) => state.app);
  const matches = useMediaQuery("(min-width:960px)");

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
      <Box
        sx={
          matches
            ? { padding: 4, marginTop: 30 }
            : { padding: 0, marginTop: 10 }
        }
      >
        <Box
          sx={
            matches
              ? {
                  zIndex: 100,
                  color: "#fff",
                  fontSize: 80,
                  fontWeight: "bold",
                  marginBottom: 0,
                  paddingBottom: 0,
                  height: 80,
                }
              : {
                  zIndex: 100,
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: "bold",
                  marginBottom: 0,
                  paddingBottom: 0,
                  height: "fit-content",
                  width: "50vw",
                  textAlign:"right"
                }
          }
        >
          Music For Living,
        </Box>
        <Box
          sx={matches ?{
            zIndex: 100,
            color: "#A5B4FC",
            fontSize: 80,
            fontWeight: "bold",
          } : {
            zIndex: 100,
            color: "#A5B4FC",
            fontSize: 30,
            fontWeight: "bold",
            width: "50vw",
            textAlign:"left",
            left: "50%",
            transform: "translateX(100%)"
          }}
        >
          Live For Music.
        </Box>
      </Box>
      <Stack spacing={2} direction="row" sx={matches ? { zIndex: 100, marginLeft: 4 } : {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 20
      }}>
        <button id="joinArtistBtn" className="button">
          <span>Join as Artist</span>
        </button>
        <button id="joinFanBtn" className="button">
          <span>Join as Fan</span>
        </button>
      </Stack>
    </>
  );
};

export default Home;
