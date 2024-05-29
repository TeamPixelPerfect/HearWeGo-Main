import { styled as muiStyled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Box from "@mui/material/Box";


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
