"use client";
import React, { use, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { AppItem } from "../constants/models";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { base_url } from "../constants/keys";
import { IconButton, Button, Stack, PaletteMode } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CellTowerIcon from "@mui/icons-material/CellTower";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setApp } from "@/lib/features/app.slice";
import { usePathname } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import PersistentDrawerLeft from "./MobileDrawer";
import { HeaderContainer } from "../styles/header.styles";
import { ColorModeContext } from "../styles/CustomeTheme";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import DropFile from "@/app/components/DropFile";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BorderColor, Visibility, VisibilityOff } from "@mui/icons-material";
import { countries } from "country-flag-icons";
import ReactCountryFlag from "react-country-flag";
import { AuthTextField } from "@/app/styles/auth.styles";
import UserProfilePopup from "./UserProfilePopup";

interface Props {
  app: AppItem;
}

const Header = ({ app }: Props) => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const matches = useMediaQuery("(min-width:960px)");

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(setApp(app));
  }, []);

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <HeaderContainer pathName={pathName}>
      <Box>
        {!matches ? (
          <PersistentDrawerLeft
            open={open}
            setOpen={setOpen}
            menuItems={app.site_main_menu}
          />
        ) : null}
        <Logo img_url={app.logo_url} />
      </Box>
      {matches ? <Navigation menuItems={app.site_main_menu} /> : null}
      <Box>
        {matches ? (
          <Box>
            <IconButton
              sx={{ ml: 1, mr: 2 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {user ? (
              <React.Fragment>
                <IconButton
                  onClick={handleClickOpen}
                  aria-label="user-profile"
                  size="large"
                  style={{ marginRight: "16px" }}
                >
                  <AccountCircleIcon sx={{ color: "#fff" }} fontSize="large" />
                </IconButton>
                <UserProfilePopup
                  open={open}
                  open1={open1}
                  open2={open2}
                  setOpen={setOpen}
                  setOpen1={setOpen1}
                  setOpen2={setOpen2}
                />
              </React.Fragment>
            ) : null}
            <Button
              component="label"
              color="secondary"
              variant="contained"
              startIcon={<CellTowerIcon />}
              style={{ textTransform: "capitalize" }}
            >
              Hit Predictor
            </Button>
          </Box>
        ) : (
          <>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <IconButton
              aria-label="main-menu"
              size="large"
              sx={{ padding: "0", margin: "0", marginRight: "8px" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon sx={{ color: "#fff" }} fontSize="large" />
            </IconButton>
          </>
        )}
      </Box>
    </HeaderContainer>
  );
};

export default Header;
