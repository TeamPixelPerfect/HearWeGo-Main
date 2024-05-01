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
import ADNavItemGroup from "./AdminNavItemGroup";
import { useRouter } from "next/navigation";
import { adminSideMenuOpts, sideMenuOpts } from "../constants/lists";

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
    // console.log("Artist:::", artist);
    // if (!artist) {
    //   Router.replace("/auth/artistSignUp");
    // }
  }, [artist]);

  return (
    <ArtistDashboardSideNavContainer>
      <Box sx={{ marginBottom: "3em" }}></Box>
      <Box
        sx={{ cursor: "pointer", marginBottom: "1em" }}
        onClick={() => {
          Router.push("/artist");
        }}
      >
        {!matches ? (
          <Logo
            img_url={
              theme.palette.mode === "light"
                ? "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(black).png"
                : "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(white).png"
            }
          />
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
          {adminSideMenuOpts.map((opt) => {
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
              href="/admin/settings"
              style={{ display: "flex", alignItems: "center" }}
            >
              <SettingsIcon
                color="secondary"
                sx={{
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  marginRight: "10px",
                }}
              />
              {!matches && (
                <Box style={{ color: theme.palette.text.primary }}>
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
