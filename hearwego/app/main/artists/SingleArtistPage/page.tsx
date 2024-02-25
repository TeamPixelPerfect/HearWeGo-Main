"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleAlbum from "@/app/components/SingleAlbum";

import {
  Maindiv,
  CoverCardMedia,
  ProfilePicAvatar,
  ArtistNameBox,
  GenreBox,
  ArtistDetailBox,
  OptionBox,
  SocialMediaBox,
  AllMiddleBox,
  FlagBox,
  SearchPaper,
} from "../../../styles/SingleArtistPage.styles";
import { urPK } from "@mui/x-date-pickers";

const userNames = [
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },

]

export default function SingleArtistPage() {
  return (
    <Maindiv>
      <CoverCardMedia image="https://www.cincinnati.com/gcdn/authoring/authoring-images/2023/09/07/PCIN/70789109007-mj-1.jpg?width=660&height=441&fit=crop&format=pjpg&auto=webp">
        <div
          style={{
            background: "black",
            height: "500px",
            width: "100%",
            opacity: "0.8",
          }}
        ></div>

        <AllMiddleBox>
          <Stack direction="row" width="100%" spacing={"1px"}>
            <ProfilePicAvatar
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/170px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
              }
            ></ProfilePicAvatar>

            <ArtistDetailBox>
              <ArtistNameBox>
                Michael Jackson
                <FlagBox></FlagBox>
              </ArtistNameBox>
              <GenreBox>POP</GenreBox>
              <SocialMediaBox>
                <Button>
                  <FacebookRoundedIcon
                    style={{ color: "white", fontSize: "25px" }}
                  />
                </Button>
                <Button>
                  <InstagramIcon style={{ color: "white", fontSize: "25px" }} />
                </Button>
                <Button>
                  <XIcon style={{ color: "white", fontSize: "25px" }} />
                </Button>
                <Button>
                  <LanguageIcon style={{ color: "white", fontSize: "25px" }} />
                </Button>
              </SocialMediaBox>
              <p style={{ fontSize: "16px" }}>
                Michael Joseph Jackson was an American singer,
                songwriter,dancer, and philanthropist. Known as the "King of
                Pop", he is regarded as one of the most significant cultural
                figures ofthe 20th century.
              </p>
            </ArtistDetailBox>

            <OptionBox>
              <Button>
                <GroupAddIcon style={{ color: "white", fontSize: "35px" }} />
              </Button>
              <Button>
                <StorefrontIcon style={{ color: "white", fontSize: "35px" }} />
              </Button>
              <Button>
                <LocalActivityIcon
                  style={{ color: "white", fontSize: "35px" }}
                />
              </Button>
            </OptionBox>
          </Stack>
        </AllMiddleBox>
      </CoverCardMedia>

      <Box
        style={{
          display: "flex",
          padding: "15px",
        }}
      >
        <SearchPaper>
          <InputBase
            sx={{ ml: 5, flex: 1 }}
            placeholder="Michael J"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
            <SearchIcon />
          </IconButton>
            
        </SearchPaper>
      </Box>
      <Box style={{padding:'10px 0px 0px 20px',color:'black',fontSize: "20px",fontWeight:'bold'}}>
      Albums
      </Box>

      <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
        {userNames.map(({ name,year, img }) => (
          <Grid item xs={4} md={2} style={{ paddingLeft: 0 }}>
            <SingleAlbum userName={name} year={year} userImg={img}></SingleAlbum>
          </Grid>
        ))}
      </Grid>


      
    </Maindiv>
  );
}
