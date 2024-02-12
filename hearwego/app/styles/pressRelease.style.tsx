import { styled as muiStyled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import styled from 'styled-components';


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

export const BorderBox = muiStyled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "30px",
  background: "#E0E7FF",
}));

export const TabsNav = muiStyled(Tabs)(({ theme }) => ({
  width: "100%",
  boxShadow: "inset 0 -1px 0 0 #E6ECF0",
  [`& .${tabsClasses.indicator}`]: {
    backgroundColor: "#1da1f2",
  },
  right: "0",
  position: "relative",
  display: "inline-block",
}));

export const SingleCampaign = muiStyled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "495px",
  borderRadius: theme.spacing(2),
  transition: "0.3s",
  position: "relative",
  overflow: "initial",
  marginLeft: "20px ",
  padding: "10px",
  marginBottom: "10px",
  backgroundColor: "#8D59CE",
}));

export const CampaignMedia = muiStyled(CardMedia)(({ theme }) => ({
  width: "60%", // Adjust this width as needed
  height: "300px",
  objectFit: "cover",
  borderRadius: theme.spacing(2),
  backgroundColor: "black",
}));

export const CampaignContent = muiStyled(CardContent)(({ theme }) => ({
  width: "50%",
  padding: "16px",
  textAlign: "center",
  backgroundColor: "#C084FC",
  borderRadius: theme.spacing(2),
}));

export const CreateCampaignPopup = styled("div")(({ }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
  backgroundColor: "white",
}));