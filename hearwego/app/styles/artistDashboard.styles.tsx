"use client";
import { Box, Card, styled } from "@mui/material";
import Link from "next/link";

export const ArtistDashboardLayout = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  background: theme.palette.background.default,
  ".ad-left": {
    width: "16%",
    minWidth: "60px",
    height: "100vh",
  },
  ".ad-right": {
    width: "84%",
    maxWidth: "100%",
    minWidth: "800px",
    padding: "1em 1em 1em 0",
    marginLeft: "1em",
  },
  "@media (max-width:960px)": {
    ".ad-left": {
      width: "60px",
    },
  },
}));

export const ArtistDashboardSideNavContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5em 0",
  background: "#F3E8FF",
  minHeight: "100%",
  minWidth: "60px",
  width: "inherit",
  // height: "fit-content",
  position: "fixed",
  zIndex: "10",
  borderRadius: "0 30px 0 0",
  boxShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  // transition: "width 1s",
  // transform: "translateX(-100%)",
  a: {
    textDecoration: "none",
    display: "flex",
    div: {
      color: "#4B4B4B",
      fontWeight: "500",
      fontSize: "14px",
    },
  },
}));

export const ADNavItemGroupBox = styled("div")(({ theme }) => ({
  margin: "0.5em 1em",
  // background: "rgba(0,0,0,.2)",
  "& label": {
    color: "#6366F1",
    fontSize: "16px",
    fontStyle: "italic",
    marginBottom: "1em",
    // padding: "0 16px",
    fontFamily: "Dancing Script",
    // textDecoration: "underline",
  },
}));

export const ADNavItemBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "2px 16px 2px 0",
  marginBottom: "0.2em",
  width: "100%",
  cursor: "Pointer",
  "&:hover": {
    background: "rgba(99,102,242,.2)",
  },
  "@media (max-width:960px)": {
    padding: "4px",
    width: "fit-content",
  },
}));

export const ADHomeCoverBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imgUrl",
})<{imgUrl : string}>(({ theme, imgUrl }) => ({
  width: "100%",
  height: "100%",
  background: `url(${imgUrl}) no-repeat`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: "flex",
  flexDirecrion: "column",
  // justifyContent: "flex-end",
  alignItems: "flex-end",
}));

export const ADHomeNameArea = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "150px",
  padding: "1em",
  // paddingBottom: "0",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
}));

export const ADHomeName = styled(Box)(({ theme }) => ({
  color: "#fff",
  fontSize: "32px",
  fontWeight: "500",
  // marginBottom: "0.5em",
}));

export const ADArtistInfo = styled(Box)(({ theme }) => ({
  color: "#fff",
  fontSize: "16px",
  fontWeight: "400",
  marginBottom: "0.5em",
}));

export const ADArtistPageUrl = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "#fff",
  width: "fit-content",
  padding: "8px 16px",
  marginBottom: "0.5em",
  display: "flex",
  alignItems: "center",
  borderRadius: "10px 0 0 0",

  "a": {
    textDecoration: "none",
    color: "#fff",
    fontSize: "12px",
    marginRight: "8px",
  }
}));

export const ADHomeProfilePicture = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imgUrl",
})<{imgUrl : string}>(({ theme, imgUrl }) => ({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: `url(${imgUrl}) no-repeat`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: theme.palette.background.default
}));

export const ADHomeSocialIcons = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.main,
  display: "flex",
  marginBottom: "0.5em",
  fontSize: "32px",

  "& svg": {
    marginRight: "8px",
  }
}));

export const FeaturedSongCard = styled(Card)(({ theme }) => ({
  width: "100%",
  minHeight: "300px",
  margin: "12px 0",
  boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",

  "& h5": {
    fontSize: "20px",
    fontWeight: "500",
    color: theme.palette.secondary.main,
    padding:"1em",
    paddingBottom: 0
  }
}));

export const FeaturedAlbumCard = styled(Card)(({ theme }) => ({
  width: "96%",
  minHeight: "300px",
  margin: "12px auto",
  boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",

  "& h5": {
    fontSize: "20px",
    fontWeight: "500",
    color: theme.palette.secondary.main,
    padding:"1em",
    paddingBottom: 0
  },

  "@media (max-width:960px)": {
    width: "100%",
  }
}));

export const ADHomeTabBox = styled(Box)(({ theme }) => ({
  padding: "1em",
  "& .MuiTab-root": {
   textTransform: "capitalize"
  },
}));
