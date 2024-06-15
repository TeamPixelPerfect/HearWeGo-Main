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
  minHeight: "100vh", // Adjusted to cover the full viewport height
  overflow: "hidden", // Ensure no overflow issues affect layout
});

  export const LeftSide = styled(Box)({
    backgroundColor: "#4338CA",
  width: "100%", // Take up full width of the container
  minWidth: "250px", // Fixed minimum width to prevent resizing
  maxWidth: "350px", // Set maximum width for larger screens
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});
export const ArtistInfo = styled(Box)({
  // marginBottom: "2rem",
  // marginTop: "1rem",
  textAlign: "center",
  color: "white",
  // backgroundColor: "red",
  // padding: "15px",
});

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: "100px",
  height: "100px",
  // marginTop: "10px",
  maxWidth: "20vw", // Maximum width based on viewport width
  maxHeight: "20vw", // Maximum height based on viewport width
  "@media (min-width: 600px)": {
    width: "150px",
    height: "150px",
    maxWidth: "15vw", // Adjusted maximum width for larger screens
    maxHeight: "15vw",
    border: "1.5px solid white",
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "15%", // Adjusted for horizontal centering
    top: "85%", // Adjusted for vertical centering
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    backgroundColor: "black",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "bold",
    // padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
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
  margin: "15px",
});

export const StatsRow = styled(Box)({
  display: "flex",
  justifyContent: "center",
  margin:"10px",
  flexWrap: "wrap",
  // backgroundColor: "yellow",
});

export const VerticalTabs = styled(Tabs)({
  width: "100%",
  display: "flex",
  // backgroundColor: "red",
});

export const CustomTab = styled(Tab)(({ theme }) => ({
  borderRadius: "10px",
  marginBottom: "15px",
  backgroundColor: "white",
  color: "black",
  "&.Mui-selected": {
    backgroundColor: "black",
    color: "white",
  },
  "@media (max-width: 600px)": {
    fontSize: "0.8rem",
  },
}));

export const RightSide = styled(Box)({
  backgroundColor: "#3B0764",
  width: "100%",
  // padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1, // Ensure RightSide takes remaining space
  "@media (min-width: 600px)": {
    maxWidth: "calc(100% - 350px)", // Adjusted to account for sidebar width
  },
});

export const TopFansContainer = styled(Box)({
  // padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "15px",
  color: "black",
});

export const FanItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  // marginBottom: "1rem",
  // marginTop: "1rem",
  backgroundColor: "#fff",
  // padding: "0.2rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
});

export const FanInfo = styled(Box)({
  // marginLeft: "1.5rem",
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
  // marginTop: "2rem",
  // padding: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "15px",
  color: "black",
});

export const RecommendedArtistItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  marginTop: "1rem",
  backgroundColor: "#fff",
  // padding: "0.2rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
});

export const RecommendedArtistInfo = styled(Box)({
  // marginLeft: "1.5rem",
  display: "flex",
  flexDirection: "column",
});

export const RecommendedArtistName = styled(Box)({
  fontWeight: "bold",
});

export const RecommendedArtistsFollowers = styled(Box)({
  color: "gray",
});
