import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuItem } from "../constants/models";
import { useRouter } from "next/navigation";
import CellTowerIcon from "@mui/icons-material/CellTower";
import Logo from "./Logo";
import { useAppSelector } from "@/lib/hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
  menuItems: menuItem[];
}

export default function PersistentDrawerLeft({
  open,
  setOpen,
  menuItems,
}: Props) {
  const theme = useTheme();
  const router = useRouter();

  const user = useAppSelector((state) => state.user);

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
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
          {menuItems?.map((item, index) => (
            <ListItem key={item._id} disablePadding>
              <ListItemButton onClick={() => router.push(item.url)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {!user ? (
            <>
              {" "}
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push("/auth/signIn")}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push("/auth/signUp")}>
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/")}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          )}
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
        </List>
      </Drawer>
    </Box>
  );
}
