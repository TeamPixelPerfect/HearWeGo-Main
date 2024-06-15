"use client";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";

export const Root = styled(Box)({
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  overflow: "hidden",
  "@media (max-width: 960px)": {
    flexDirection: "column",
  },
});

export const LeftSide = styled(Box)({
  backgroundColor: "#4338CA",
  width: "100%",
  minWidth: "250px",
  maxWidth: "350px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "@media (max-width: 960px)": {
    minWidth: "100px",
    maxWidth: "100%",
  },
});

export const ArtistInfo = styled(Box)({
  // marginBottom: "2rem",
marginTop: "20px",
  textAlign: "center",
  color: "white",
  // backgroundColor: "red",
  // padding: "15px",
});
export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: "150px",
  height: "150px",
  maxWidth: "20vw",
  maxHeight: "20vw",
  "@media (min-width: 600px)": {
    maxWidth: "15vw",
    maxHeight: "15vw",
  },
  "@media (max-width: 600px)": {
    width: "100px",
    height: "100px",
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "15%",
    top: "85%",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    backgroundColor: "black",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "@media (max-width: 600px)": {
    "& .MuiBadge-badge": {
      right: "5%",
      top: "5%",
      width: "2rem",
      height: "2rem",
    },
  },
}));


export const StatBox = styled(Box)({
  textAlign: "center",
  // paddingLeft: "1.5rem",
  // paddingRight: "1.5rem",
  // paddingBottom: "0rem",
  // paddingTop: "0rem",
  color: "white",
  // backgroundColor: "black",
  margin: "12px",
});

export const StatsRow = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin:"20px",
  flexWrap: "wrap",
  // backgroundColor: "yellow",
});

export const VerticalTabs = styled(Tabs)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  textAlign: "center",
  alignItems: "center",
  marginTop: "10px",
  // backgroundColor: "yellow",
});

export const CustomTab = styled(Tab)(({ theme }) => ({
  borderRadius: "10px",
  marginBottom: "15px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  alignItems: "center",
  color: "black",
  "&.Mui-selected": {
    backgroundColor: "black",
    color: "white",
  },
  "@media (max-width: 600px)": {
    fontSize: "0.8rem",
    padding: "10px",
  },
}));


export const RightSide = styled(Box)({
  backgroundColor: "#3B0764",
  minWidth: "450px",
  maxWidth: "550px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "@media (max-width: 960px)": {
    minWidth: "250px",
    maxWidth: "100%",
  },
});


export const TopFansContainer = styled(Box)({
  marginTop: "20px",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "15px",
  color: "black",
  marginBottom: "1rem",
  "@media (max-width: 600px)": {
    padding: "0.5rem",
    marginTop: "10px",
  },
});
export const FanItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  marginTop: "1rem",
  backgroundColor: "#fff",
  padding: "0.5rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  "@media (max-width: 600px)": {
    padding: "0.3rem",
    fontSize: "0.8rem",
  },
});


export const FanInfo = styled(Box)({
  marginLeft: "1.5rem",
  display: "flex",
  flexDirection: "column",
});

export const FanName = styled(Box)({
  fontWeight: "bold",
});

export const FanCountry = styled(Box)({
  color: "gray",
});

export const RecommendedArtistsContainer = styled(Box)({
  marginTop: "2rem",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "15px",
  color: "black",
  marginBottom: "1rem",
  "@media (max-width: 600px)": {
    padding: "0.5rem",
    marginTop: "10px",
  },
});

export const RecommendedArtistItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  marginTop: "1rem",
  backgroundColor: "#fff",
  padding: "0.5rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  "@media (max-width: 600px)": {
    padding: "0.3rem",
    fontSize: "0.8rem",
  },
});

export const RecommendedArtistInfo = styled(Box)({
  marginLeft: "1.5rem",
  display: "flex",
  flexDirection: "column",
});

export const RecommendedArtistName = styled(Box)({
  fontWeight: "bold",
});

export const RecommendedArtistsFollowers = styled(Box)({
  color: "gray",
});