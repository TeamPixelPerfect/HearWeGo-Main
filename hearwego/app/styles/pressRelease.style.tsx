import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";

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

  ;