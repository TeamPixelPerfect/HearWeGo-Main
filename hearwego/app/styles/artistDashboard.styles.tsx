"use client";
import { Box, Card, styled } from "@mui/material";
import Link from "next/link";

export const ArtistDashboardLayout = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  background: theme.palette.mode === "light" ? "#EEF2FF" : "#0F172A",
  ".ad-left": {
    width: "215px",
    minWidth: "60px",
    height: "100vh",
  },
  ".ad-right": {
    width: "calc(100% - 215px)",
    maxWidth: "100%",
    minWidth: "350px",
    padding: "1em 1em 1em 0",
    marginLeft: "1em",
  },
  "@media (max-width:960px)": {
    ".ad-left": {
      width: "0",
      minWidth: "0",
    },
    ".ad-right": {
      width: "100%",
      padding: "1em",
      margin: "0",
    },
  },
}));

export const ArtistDashboardSideNavContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  alignItems: "flex-start",
  padding: "0.5em 0",
  background: theme.palette.background.paper,
  minHeight: "100%",
  minWidth: "60px",
  width: "inherit",
  // height: "fit-content",
  position: "fixed",
  zIndex: "10",
  // borderRadius: "0 30px 0 0",
  // boxShadow: "1px 1px 1px rgba(0,0,0,0.1)",
  transition: "width 1s",
  // transform: "translateX(-100%)",
  a: {
    textDecoration: "none",
    display: "flex",
    div: {
      fontWeight: "500",
      fontSize: "14px",
    },
  },
  "@media (max-width:960px)": {
    display: "none",
    width: "0",
  },
}));

export const ADNavItemGroupBox = styled("div")(({ theme }) => ({
  marginBottom: "1em",
  width: "215px",
  // background: "rgba(0,0,0,.2)",
  "a": {
    color: theme.palette.text.secondary,
  },
  ".active": {
    borderRight: `2px solid ${theme.palette.secondary.light}`,
    background: "rgba(99,102,242,0.2)",
  },
  ".active a": {
    color: theme.palette.secondary.light,
  },
  "& .label": {
    color: "#6366F1",
    fontSize: "13px",
    // fontStyle: "italic",
    // marginBottom: "1em",
    // padding: "0 16px",
    fontFamily: "Dancing Script",
    padding: "0.5em 1.5em",
    fontWeight: 400,
    // textDecoration: "underline",
  },
}));

export const ADNavItemBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px 16px",
  marginBottom: "0.2em",
  width: "100%",
  cursor: "Pointer",
  "&:hover": {
    background: "rgba(99,102,242,0.1)",
  },
  "@media (max-width:960px)": {
    padding: "4px",
    width: "fit-content",
  },
}));

export const ADHomeCoverBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imgUrl",
})<{ imgUrl: string }>(({ theme, imgUrl }) => ({
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  backgroundColor: "#787878",
  backgroundImage: `url(${imgUrl})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  display: "flex",
  flexDirecrion: "column",
  // justifyContent: "flex-end",
  alignItems: "flex-end",
  // borderWidth: "10px",
  // borderStyle: "solid",
  // borderColor: theme.palette.background.default,
  borderRadius: "10px",
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
  borderRadius: "10px",
  "@media (max-width:960px)": {
    flexDirection: "column",
    maxHeight: "350px",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

export const ADHomeName = styled(Box)(({ theme }) => ({
  color: "#fff",
  fontSize: "32px",
  fontWeight: "700",
  // marginBottom: "0.5em",
  "@media (max-width:960px)": {
    // textAlign: "center",
  },
}));

export const ADArtistInfo = styled(Box)(({ theme }) => ({
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
  marginBottom: "0.5em",
  "@media (max-width:960px)": {
    textAlign: "center",
  },
}));

export const ADArtistPageUrl = styled(Box)(({ theme }) => ({
  background: "#4338ca",
  color: "#fff",
  width: "fit-content",
  padding: "8px 16px",
  marginBottom: "0.5em",
  display: "flex",
  alignItems: "center",
  borderRadius: "10px 0 0 0",

  a: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "12px",
    marginRight: "8px",
  },
}));

export const ADHomeProfilePicture = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imgUrl",
})<{ imgUrl: String | undefined }>(({ theme, imgUrl }) => ({
  minWidth: "200px",
  minHeight: "200px",
  borderRadius: "50%",
  backgroundColor: "#787878",
  backgroundImage: `url('${imgUrl}')`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderWidth: "5px",
  borderStyle: "solid",
  borderColor: theme.palette.background.default,
}));

export const ADHomeSocialIcons = styled(Box)(({ theme }) => ({
  color: "#fff",
  display: "flex",
  marginBottom: "0.5em",
  fontSize: "32px",

  "& svg": {
    marginRight: "8px",
  },
}));

export const FeaturedSongCard = styled(Card)(({ theme }) => ({
  width: "100%",
  minHeight: "300px",
  margin: "16px 0",
  boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",

  "& h5": {
    fontSize: "20px",
    fontWeight: "500",
    color: theme.palette.secondary.main,
    padding: "1em",
    paddingBottom: 0,
  },
}));

export const FeaturedAlbumCard = styled(Card)(({ theme }) => ({
  width: "96%",
  minHeight: "300px",
  margin: "16px auto",
  boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)",

  "& h5": {
    fontSize: "20px",
    fontWeight: "500",
    color: theme.palette.secondary.main,
    padding: "1em",
    paddingBottom: 0,
  },

  "@media (max-width:960px)": {
    width: "100%",
  },
}));

export const ADHomeTabBox = styled(Box)(({ theme }) => ({
  padding: "1em",
  // height: "90vh",
  // background: "red",
  "& .MuiTab-root": {
    textTransform: "capitalize",
  },
}));

export const ADTabBox = styled(Box)(({ theme }) => ({
  padding: "1em",
  height: "90vh",
  // background: "red",
  "& .MuiTab-root": {
    textTransform: "capitalize",
  },
}));
