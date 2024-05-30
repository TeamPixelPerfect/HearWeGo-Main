import { styled as muiStyled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

//created the styled component for a single tab item
export const TabItem = muiStyled(Tab)(({ theme }) => ({
  minHeight: 53,
  minWidth: 80,
  textTransform: "none",
  fontSize: 15,
  fontWeight: 700,
  color: "#657786",
  opacity: 1,
  "&:hover": {
    backgroundColor: "rgba(29, 161, 242, 0.1)",
    color: "#1da1f2",
  },
  [theme.breakpoints.up("md")]: {
    minWidth: 120,
  },
  [`&.${tabClasses.selected}`]: {
    color: "#1da1f2",
  },
}));

//created the styled component for the tab container
export const BorderBox = muiStyled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "30px",
  backgroundColor: "#E0E7FF",
}));

//created the styled component for the tab container
export const TabsNav = muiStyled(Box)(({ theme }) => ({
  width: "100%",
  boxShadow: "inset 0 -1px 0 0 #E6ECF0",
  [`& .${tabsClasses.indicator}`]: {
    backgroundColor: "#1da1f2",
  },
  right: "0",
  position: "relative",
  display: "inline-block",
}));

//created the styled component for the single campaign
export const SingleCampaign = muiStyled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "450px",
  transition: "0.3s",
  position: "relative",
  overflow: "initial",
  marginLeft: "20px ",
  padding: "2px",
  marginBottom: "10px",
  backgroundColor: theme.palette.primary.main,
}));

//created the styled component for the campaign media
export const CampaignMedia = muiStyled(CardMedia)(({ theme }) => ({
  width: "60%", // Adjust this width as needed
  height: "300px",
  objectFit: "cover",
  backgroundColor: "black",
}));

//Created the styled component for the campaign content
export const CampaignContent = muiStyled(CardContent)(({ theme }) => ({
  width: "50%",
  padding: "16px",
  textAlign: "center",
  backgroundColor: theme.palette.background.default,
}));

//Created the styled component for the 
export const CreateCampaignPopup = muiStyled("div")(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "20%",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
  backgroundColor: theme.palette.background.default,
  borderRadius: "10px",
}));

export const NameBox = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#7e22ce",
  textAlign: "center",
  color: "white",
  borderRadius: "10px",
  padding: "5px",
}));

//created the styled component for the Post schedule 
export const PostSchedulePopup = muiStyled(Box)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  minHeight: "70%",
  maxHeight: "70%",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
  padding: "1em",
  borderRadius: "10px",
  background: theme.palette.background.default,
}));


export const ArtistDetail = muiStyled(Box)(({ theme }) => ({
  width: "100%",
  height: "10%",
  padding: "5px",
  marginTop: "10px",
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const PostTextField = muiStyled(TextField)(({ theme }) => ({
  boxSizing: "initial",
  minWidth: "95%",
  border: "2px solid",
  padding: "8px",
  borderRadius: "4px",
  color: "black",
}));

export const PostContextBox = muiStyled(Box)(({ theme }) => ({
  backgroundColor: "#B2B1FF",
  padding: "10px",
  marginTop: "10px",
  width: "100%",
  textAlign: "center",
  borderRadius: "10px",
  height: "40%",
}));

//Created the styled component for the linear progress bar
export const BorderLinearProgress = muiStyled(LinearProgress)(({ theme }) => ({
  height: "20px",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.main
        : theme.palette.secondary.main,
  },
}));

export const PostForPopup = muiStyled(Box)(({ theme }) => ({
  width: "50%",
  height: "200px",
  backgroundImage: "url('https://source.unsplash.com/random')",
  backgroundRepeat:"no-repeat",
  backgroundSize:"cover",
  display: "flex",
  alignItems: "flex-end",
  borderRadius: "10px",
}));
