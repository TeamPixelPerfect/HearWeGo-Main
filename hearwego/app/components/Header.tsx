"use client";
import React, { use, useEffect } from "react";
import Box from "@mui/material/Box";
import { AppItem } from "../constants/models";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { base_url } from "../constants/keys";
import { IconButton, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CellTowerIcon from "@mui/icons-material/CellTower";
import { useAppDispatch } from "@/lib/hooks";
import { setApp } from "@/lib/features/app.slice";
import { usePathname } from "next/navigation";

interface Props {
  app: AppItem;
}

const Header = ({ app }: Props) => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  useEffect(() => {
    dispatch(setApp(app));
  },[])
  
  return (
    <Box
      sx={{
        bgcolor: `${pathName==='/'? 'transparent' : '#000'}`,
        color: "#fff",
        height: "100px",
        display: "flex",
        alignItems: "center",
        padding: 4,
        zIndex: 100,
      }}
    >
      <Logo img_url={app.logo_url} />
      <Navigation menuItems={app.site_main_menu}/>
      <IconButton aria-label="user-profile" size="large" style={{padding: 16, paddingRight: 24}}>
        <AccountCircleIcon sx={{ color: "#fff" }} fontSize="large" />
      </IconButton>
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
  );
};

export default Header;
