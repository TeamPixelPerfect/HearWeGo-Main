"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { useMediaQuery } from "@mui/material";
import {
  HomeBanner,
  HomeBannerButton,
  HomeBannerButtonContainer,
  HomeTagline,
  HomeTagline2,
  HomeTaglineContainer,
  HomeServicesContainer,
  HomeServiceItemOdd,
  HomeServiceItemEven,
} from "./styles/home.styles";
import { serviceItem } from "./constants/models";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";

const Home = () => {
  const app = useAppSelector((state) => state.app);
  const matches = useMediaQuery("(max-width:960px)");

  const Router = useRouter();

  return (
    <>
      <Header app={app} />
      <HomeBanner
        imgs={[
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ]}
      >
        <HomeTaglineContainer>
          <HomeTagline>Music For Living,</HomeTagline>
          <HomeTagline2>Live For Music.</HomeTagline2>
        </HomeTaglineContainer>
        <HomeBannerButtonContainer>
          <HomeBannerButton
            onClick={() => {
              Router.push("/auth/artistSignUp");
            }}
          >
            <span>Join as Artist</span>
          </HomeBannerButton>
          <HomeBannerButton
            onClick={() => Router.push("/auth/signUp")}
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
      
      <HomeServicesContainer>
        {app.service_items
          ? app.service_items.map((item: serviceItem, index: number) => {
              if (index % 2 === 0) {
                return (
                  <HomeServiceItemOdd key={item._id} service={item}>
                    <div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      {!matches && (
                        <HomeBannerButton sx={{ backgroundColor: "#6B21A8" }}>
                          <span>Explore</span>
                        </HomeBannerButton>
                      )}
                    </div>
                    <div
                      style={{
                        backgroundImage: `url(${item.img_url})`,
                      }}
                    ></div>
                    {matches && (
                      <HomeBannerButton
                        sx={{
                          backgroundColor: "#6B21A8",
                          order: 2,
                          marginLeft: 0,
                        }}
                      >
                        <span>Explore</span>
                      </HomeBannerButton>
                    )}
                  </HomeServiceItemOdd>
                );
              } else {
                return (
                  <HomeServiceItemEven key={item._id} service={item}>
                    <div
                      style={{
                        backgroundImage: `url(${item.img_url})`,
                      }}
                    ></div>
                    <div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      {!matches && (
                        <HomeBannerButton sx={{ backgroundColor: "#6B21A8" }}>
                          <span>Explore</span>
                        </HomeBannerButton>
                      )}
                    </div>
                    {matches && (
                      <HomeBannerButton
                        sx={{
                          backgroundColor: "#6B21A8",
                          order: 2,
                          marginLeft: 0,
                        }}
                      >
                        <span>Explore</span>
                      </HomeBannerButton>
                    )}
                  </HomeServiceItemEven>
                );
              }
            })
          : "Loading..."}
      </HomeServicesContainer>
      
      <Footer />
    </>
  );
};

export default Home;
