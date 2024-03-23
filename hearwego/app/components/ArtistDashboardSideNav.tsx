"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ADNavItemBox,
  ADNavItemGroupBox,
  ArtistDashboardSideNavContainer,
} from "../styles/artistDashboard.styles";
import Logo from "../components/Logo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import ADNavItemGroup from "./ADNavItemGroup";
import { useRouter } from "next/navigation";
import { sideMenuOpts } from "../constants/lists";

const ArtistDashboardSideNav = () => {
  const Router = useRouter();

  const app = useAppSelector((state) => state.app);
  const artist = useAppSelector((state) => state.artist.user);

  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const matches = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    console.log("Artist:::", artist);
    if (!artist) {
      Router.replace("/auth/artistSignUp");
    }
  }, [artist]);

  return (
    <ArtistDashboardSideNavContainer>
      <Box sx={{ marginBottom: "1em" }}></Box>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() => {
          Router.push("/artist");
        }}
      >
        {!matches ? (
          <Logo img_url="https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png" />
        ) : (
          <IconButton color="primary" sx={{ fontSize: "40px" }}>
            <IoIosArrowDroprightCircle />
          </IconButton>
        )}
      </Box>
      <Box>
        <Box
          sx={
            matches
              ? { padding: "1em 0", width: "auto" }
              : { padding: "1em 0", width: "100%" }
          }
        >
          {sideMenuOpts.map((opt) => {
            return (
              <ADNavItemGroup
                groupLabel={opt.groupLabel}
                items={opt.items}
              ></ADNavItemGroup>
            );
          })}
        </Box>
        <ADNavItemGroupBox>
          <ADNavItemBox>
            <Link href="/artist">
              <SettingsIcon sx={{ color: "#3730A3", marginRight: "10px" }} />
              {!matches && <div style={{ color: "#3730A3" }}>Settings</div>}
            </Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
      </Box>
    </ArtistDashboardSideNavContainer>
  );
};

export default ArtistDashboardSideNav;
