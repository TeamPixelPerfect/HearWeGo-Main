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
  minHeight: "100hv",
  
});

export const LeftSide  = styled(Box)({
  backgroundColor: "#4338CA",
  width: "100%", // Take up full width of the container
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "100vh", // Ensure right side stretches to full height
  "@media (min-width: 600px)": {
    maxWidth: "350px", // Set maximum width for right side, subtracting sidebar width
  },
});

export const ArtistInfo = styled(Box)({
  marginBottom: "2rem",
  marginTop: "1rem",
  textAlign: "center",
  color:"white" // Center align text
});

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: "100px", // Initial size, adjust as needed
  height: "100px", // Initial size, adjust as needed
  marginTop: "10px", // Center the avatar horizontally
  maxWidth: "20vw", // Maximum width based on viewport width
  maxHeight: "20vw", // Maximum height based on viewport width
  "@media (min-width: 600px)": {
    width: "150px", // Increase size for larger screens if needed
    height: "150px",
    maxWidth: "15vw", // Adjusted maximum width for larger screens
    maxHeight: "15vw",
    border: "1.5px solid white", // Add border around avatar	
  },
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "15%", // Adjust this value to horizontally center the badge
    top: "85%", // Adjust this value to vertically center the badge
    width: "3rem",
    height: "3rem",
    borderRadius: "50%", // This makes the badge circular
    backgroundColor: "black", // Customize with your desired color
    color: "white", // Text color of the badge
    fontSize: "0.75rem", // Adjust font size as needed
    fontWeight: "bold", // Adjust font weight as needed
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const StatBox = styled(Box)({
  textAlign: "center",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  paddingBottom: "0rem",
  paddingTop: "0rem",
  color: "white",
});

export const StatsRow = styled(Box)({
  display: "flex",
  justifyContent: "center", // Center items horizontally
  flexWrap: "wrap", // Allow items to wrap on smaller screens
  // margin: "1rem 0",
});

export const VerticalTabs = styled(Tabs)({
  width: "100%",
});

export const CustomTab = styled(Tab)(({ theme }) => ({
  borderRadius: "10px",
  marginBottom: "1rem",
  backgroundColor: "white",
  color: "black",
  "&.Mui-selected": {
    backgroundColor: "black",
    color: "white",
  },
  "@media (max-width: 600px)": {
    fontSize: "0.8rem", // Adjust font size for smaller screens
    // padding: "0.5rem", // Reduce padding for smaller screens
  },
}));

export const RightSide = styled(Box)({
  backgroundColor: "#3B0764", // Adjust background color for the right side
  width: "100%", // Take up full width of the container
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "100vh", // Ensure right side stretches to full height
  "@media (min-width: 600px)": {
    maxWidth: "350px", // Set maximum width for right side, subtracting sidebar width
  },
});

export const TopFansContainer = styled(Box)({
  // marginTop: '2rem',
  padding: '1rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  color: 'black',
});

export const FanItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  marginTop: '1rem',
  backgroundColor: '#fff',
  padding: '0.2rem',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
 
});

export const FanInfo = styled(Box)({
  marginLeft: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
});

export const FanName = styled(Box)({
  fontWeight: "bold",
});

export const FanCountry = styled(Box)({
  color: "gray",
});


export const RecommendedArtistsContainer = styled(Box)({
marginTop: '2rem',
  padding: '1rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  color: 'black',
});

export const RecommendedArtistItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  marginTop: '1rem',
  backgroundColor: '#fff',
  padding: '0.2rem',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
 
});

export const RecommendedArtistInfo = styled(Box)({
  marginLeft: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
});

export const RecommendedArtistName = styled(Box)({
  fontWeight: "bold",
});

export const RecommendedArtistsFollowers = styled(Box)({
  color: "gray",
});

