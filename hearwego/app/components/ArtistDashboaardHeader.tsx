"use client";
import Link from "next/link";
import react, { useContext } from "react";
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
import { useMediaQuery } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";

const ArtistDashboardHeader = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const artist = useAppSelector((state) => state.artist.user);

  const matches = useMediaQuery("(max-width:960px)");

  return (
    <HeaderBox>
      {matches ? (
        <HitPredictorIco>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <HitPredictorBtn
              color="primary"
              aria-label="add"
              onClick={() => console.log("clicked")}
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

      <HitPredictorIco>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <HitPredictorBtn color="secondary" aria-label="add">
            <CellTowerIcon />
          </HitPredictorBtn>
        </Box>
      </HitPredictorIco>

      <ProfileArea>
        <ProfileDetailArea elevation={0}>
          <Avatar
            src={artist?.user.profilePicture}
          />
          <ArtistDetail>
            <ArtistName>{artist?.user.artistName}</ArtistName>
            <ArtistGenre>{artist?.user.musicGenres[0]} | {artist?.user.artistType}</ArtistGenre>
          </ArtistDetail>
        </ProfileDetailArea>
      </ProfileArea>
    </HeaderBox>
  );
};

export default ArtistDashboardHeader;
