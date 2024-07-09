"use client";
import Link from "next/link";
import react, { useContext, useState } from "react";
import {
  HeaderBox,
  SearchArea,
  HitPredictorIco,
  HitPredictorBtn,
  ProfileArea,
  ProfileDetailArea,
  ArtistDetail,
  ArtistName,
  ArtistGenre,
} from "../styles/artistDashboardHeader.styles";

import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import CellTowerIcon from "@mui/icons-material/CellTower";
import Avatar from "@mui/material/Avatar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../styles/CustomeTheme";
import { FaBars } from "react-icons/fa";
import { Stack, useMediaQuery } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import ADPersistentDrawerLeft from "./ADMobileDrawer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation";

const ArtistDashboardHeader = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);

  const matches = useMediaQuery("(max-width:960px)");
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <HeaderBox>
      {matches ? (
        <ADPersistentDrawerLeft open={open} setOpen={setOpen} />
      ) : null}

      {matches ? (
        <HitPredictorIco>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <HitPredictorBtn
              color="primary"
              aria-label="add"
              onClick={handleDrawerOpen}
            >
              <FaBars />
            </HitPredictorBtn>
          </Box>
        </HitPredictorIco>
      ) : null}

      {!matches ? (
        <HitPredictorIco>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <HitPredictorBtn
              color="primary"
              aria-label="add"
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </HitPredictorBtn>
          </Box>
        </HitPredictorIco>
      ) : null}

      <SearchArea>
        <Paper
          component="form"
          sx={{
            p: "5px 10px",
            display: "flex",
            alignItems: "center",
            width: "50%",
            // height: "50%",
            // border: "1px solid #969696",
            borderRadius: "50px",
            border:
              theme.palette.mode === "light"
                ? "1px solid rgba(0, 0, 0, 0.12)"
                : "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "none",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </SearchArea>

      <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
        <HitPredictorIco>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <HitPredictorBtn
              color="secondary"
              aria-label="add"
              onClick={() => {
                router.push("/main/predictor");
              }}
            >
              <CellTowerIcon />
            </HitPredictorBtn>
          </Box>
        </HitPredictorIco>

        <ProfileArea>
          {/* {!matches && (
          <ProfileDetailArea elevation={0}>
            {/* <IconButton>
              <ArrowDropDownIcon sx={{ fontSize: "32px" }} />
            </IconButton> */}
          {/* <Stack direction="row" sx={{ alignItems: "center" }}>
              <ArtistName>{artist?.user.artistName}</ArtistName>
              <Avatar src={artist?.user.profilePicture} />
            </Stack> */}
          {/* <ArtistDetail> */}

          {/* <ArtistGenre>
              {artist?.user.musicGenres[0]} | {artist?.user.artistType}
            </ArtistGenre> */}
          {/* </ArtistDetail> */}
          {/* </ProfileDetailArea> */}
          {/* )} */}
          <Link href="/artist/artistProfile">
            <Avatar
              src={artist?.profilePicture as string}
              style={{ height: "50px", width: "50px" }}
            />
          </Link>
        </ProfileArea>
      </Stack>
    </HeaderBox>
  );
};

export default ArtistDashboardHeader;
