import * as React from "react";
import { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { menuItem } from "../constants/models";
import { useRouter } from "next/navigation";
import CellTowerIcon from "@mui/icons-material/CellTower";
import { sideMenuOpts } from "../constants/lists";
import { useMediaQuery } from "@mui/material";
import { ColorModeContext } from "../styles/CustomeTheme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Logo from "./Logo";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ADPersistentDrawerLeft({ open, setOpen }: Props) {
  const theme = useTheme();
  const router = useRouter();

  const colorMode = useContext(ColorModeContext);
  const matches = useMediaQuery("(max-width:960px)");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: matches ? drawerWidth : 0,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: "2em 0",
            }}
          >
            <Logo
              img_url={
                theme.palette.mode === "light"
                  ? "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png"
                  : "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(white).png"
              }
            />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideMenuOpts?.map((item, index) => (
            <>
              {item.items.map((_item) => {
                return (
                  <ListItem key={item.groupLabel} disablePadding>
                    <ListItemButton onClick={() => router.push(_item.link)}>
                      <ListItemIcon>
                        <_item.icon />
                      </ListItemIcon>
                      <ListItemText primary={_item.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push("/")}>
              <ListItemIcon>
                <CellTowerIcon />
              </ListItemIcon>
              <ListItemText primary="Hit Predictor" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={colorMode.toggleColorMode}>
              <ListItemIcon>
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={theme.palette.mode === "dark" ? "Light" : "Dark"}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
