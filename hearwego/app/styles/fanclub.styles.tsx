"use client";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

export const SearchBarPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  width: "60%",
  backgroundColor: theme.palette.background.default,
  position: "relative",
}));

export const CoverBackgroundCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxHeight: "80vh",
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
}));

export const CoverCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "250px",
}));

export const ProfilePicAvatar = styled(Avatar)(({ theme }) => ({
  width: "180px",
  height: "180px",
  border: "4px solid #D8B4FE",
  borderColor: theme.palette.background.default,
}));

export const ProfilePicDiv = styled("div")(({ theme }) => ({
  position: "relative",
  bottom: "100px",
  left: "20px",
}));

export const ArtistDetailBox = styled(Box)(({ theme }) => ({
  position: "relative",
  bottom: "100px",
  width: "100%",
  padding: "0 2em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
}));

export const ArtistNameBox = styled(Box)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.primary,
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "0.5px",
  marginTop: "5px",
  justifyContent: "left",
  display: "flex",
  //   marginBottom: "1em !important"
}));

export const NoOfFollowersBox = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.text.primary,
  fontWeight: "500px",
}));

export const JoinClubButton = styled(Button)(({ theme }) => ({
  width: "120px",
  fontSize: "16px",
  color: "#fff",
  backgroundColor: theme.palette.primary.main,
  textTransform: "capitalize",
}));

export const ChatButton = styled(Button)(({ theme }) => ({
  width: "120px",
  fontSize: "16px",
  color: "#fff",
  backgroundColor: theme.palette.secondary.main,
  textTransform: "capitalize",
}));

export const NavigationBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundcolor: "#E0C6FB",
  marginTop: 2,
  click
}));

export const PostCard = styled(Card)(({ theme }) => ({
  maxWidth: 1000,
  height: 800,
  width: 800,
  padding: "1em",
  boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
  transition: "0.3s",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const PostPublishAvatar = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  border: "4px solid #D8B4FE",
  borderColor: theme.palette.background.default,
}));

export const PublisherNameBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: "bold",
  letterSpacing: "0.5px",
  //   marginTop: -5,
  marginLeft: 18,
  marginBottom: "0 !important",
  marginTop: "0 !important",
}));

export const PublishedDateBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 12,
  fontWeight: 300,
  //   fontWeight: "bold",
  //   letterSpacing: "0.5px",
  marginLeft: 18,
}));

export const DescriptionBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 16,
  margin: "0 1em",
  marginTop: "0 !important",
}));

export const PostImageCard = styled(CardMedia)(({ theme }) => ({
  width: 700,
  height: 700,
  margin: "2em 0 1em 0",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.08)",
}));

export const NoOfLikesBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: "0.5px",
}));

export const NoOfCommentsBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: "0.5px",
}));

export const PostFeed = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1em 0",
}));

export const PostReactionBar = styled(Stack)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  color: theme.palette.text.primary,
  background: "magenta",
}));

export const FindMorebutton = styled(Button)(({ theme }) => ({
  alignItems: "center",
  color: theme.palette.text.primary,
  textTransform: "initial",
}));
