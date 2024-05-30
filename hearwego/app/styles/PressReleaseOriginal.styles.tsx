import { styled as muiStyled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import { Box } from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material";

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

export const PressReleaseSaved = styled(Stack)(({ theme }) => ({
    marginBottom: '1em'  
}));
  