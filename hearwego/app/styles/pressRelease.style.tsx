import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export const TabItem = styled(Tab)(({ theme }) => ({
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

export const BorderBox = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "30px",
  background: "#E0E7FF",
}));

export const TabsNav = styled(Tabs)(({ theme }) => ({
  width: "100%",
  boxShadow: "inset 0 -1px 0 0 #E6ECF0",
  [`& .${tabsClasses.indicator}`]: {
    backgroundColor: "#1da1f2",
  },
  right: "0",
  position: "relative",
  display: "inline-block",
}));

export const SingleCampaign = styled(Card)(({ theme }) => ({
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

export const CampaignMedia = styled(CardMedia)(({ theme }) => ({
  width: "60%", // Adjust this width as needed
  height: "300px",
  objectFit: "cover",
  borderRadius: theme.spacing(2),
  backgroundColor: "black",
}));

export const CampaignContent = styled(CardContent)(({ theme }) => ({
  width: "50%",
  padding: "16px",
  textAlign: "center",
  backgroundColor: "#C084FC",
  borderRadius: theme.spacing(2),
}));
