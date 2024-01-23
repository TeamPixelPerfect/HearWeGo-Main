"use client";
import React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/lib/hooks";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";
import {
  HomeBanner,
  HomeBannerButton,
  HomeBannerButtonContainer,
  HomeTagline,
  HomeTagline2,
  HomeTaglineContainer,
} from "./styles/home.styles";

const Home = () => {
  const app = useAppSelector((state) => state.app);
  const matches = useMediaQuery("(min-width:960px)");

  return (
    <>
      <HomeBanner imgs={app?.banner_imgs}>
        <HomeTaglineContainer>
          <HomeTagline>Music For Living,</HomeTagline>
          <HomeTagline2>Live For Music.</HomeTagline2>
        </HomeTaglineContainer>
        <HomeBannerButtonContainer>
          <HomeBannerButton>
            <span>Join as Artist</span>
          </HomeBannerButton>
          <HomeBannerButton
            style={{
              background: "transparent",
              border: "3px",
              borderStyle: "solid",
              borderColor: "#fff",
            }}
          >
            <span>Join as Fan</span>
          </HomeBannerButton>
        </HomeBannerButtonContainer>
      </HomeBanner>
    </>
  );
};

export default Home;
