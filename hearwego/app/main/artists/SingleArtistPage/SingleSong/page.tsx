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
import { BsSpotify } from "react-icons/bs";
import { SiApplemusic } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";


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
} from "../../../../styles/SingleArtistPage.styles";



export default function SingleSongPage() {
  return (
    <Maindiv>
      <CoverCardMedia image="https://www.billboard.com/wp-content/uploads/media/Michael-Jackson-1986-concert-billboard-1548.jpg">
        <div
          style={{
            background: "black",
            height: "500px",
            width: "100%",
            opacity: "0.7",
          }}
        ></div>

        <AllMiddleBox>
          <Stack direction="row" width="100%" spacing={"1px"}>
            <ProfilePicAvatar
              src={
                "https://i1.sndcdn.com/artworks-000003321270-60t2ec-t500x500.jpg"
              }
            ></ProfilePicAvatar>

            <ArtistDetailBox>
              <ArtistNameBox>Billie Jean</ArtistNameBox>
              <GenreBox>Michael Jackson</GenreBox>
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

              <Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    padding: "50px 0px 0px 0px",
                    //backgroundColor:'white'
                  }}
                >Album : Thriller 
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    padding: "5px 0px 0px 0px",
                    //backgroundColor:'white'
                  }}
                >Genre(s) : Rhythm and blues, Dance-pop, Pop, Disco, Classic, Rock 
                </Box>

              </Box>
            </ArtistDetailBox>
            <OptionBox>
              <Stack direction="row" width="100%" spacing={"1px"}>
                <Button>
                  <BsSpotify style={{ color: "white", fontSize: "35px" }} />
                </Button>
                <Button>
                  <SiYoutubemusic
                    style={{ color: "white", fontSize: "35px" }}
                  />
                </Button>
                <Button>
                  <SiApplemusic style={{ color: "white", fontSize: "35px" }} />
                </Button>
              </Stack>
            </OptionBox>
          </Stack>
        </AllMiddleBox>
      </CoverCardMedia>

    

      

    </Maindiv>
  );
}
