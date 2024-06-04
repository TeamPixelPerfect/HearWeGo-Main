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
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();

  useEffect(() => {
    console.log("Artist:::", artist);
    if (!artist) {
      Router.replace("/auth/artistSignUp");
    }
  }, [artist]);

  return (
    <ArtistDashboardSideNavContainer>
      <Box
        sx={{ cursor: "pointer", p: "2em", pb: "2em" }}
        onClick={() => {
          Router.push("/artist");
        }}
      >
        {!matches ? (
          <Logo
            img_url={
              theme.palette.mode === "light"
                ? "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png"
                : "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(white).png"
            }
          />
        ) : (
          <IconButton color="primary" sx={{ fontSize: "40px" }}>
            <IoIosArrowDroprightCircle />
          </IconButton>
        )}
      </Box>
      <Box sx={{overflowY: "scroll"}}>
        <Box
          sx={
            matches
              ? { padding: "0", width: "inherit" }
              : { padding: "0", width: "inherit" }
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
          <ADNavItemBox sx={{ marginBottom: "2em" }}>
            <Link
              href="/artist"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SettingsIcon sx={{ marginRight: "10px", color: theme.palette.secondary.light }} />
              {!matches && (
                <Box style={{ color: theme.palette.secondary.main }}>
                  Settings
                </Box>
              )}
            </Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
      </Box>
    </ArtistDashboardSideNavContainer>
  );
};

export default ArtistDashboardSideNav;
