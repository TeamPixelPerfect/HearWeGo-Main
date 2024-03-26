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
import CardActions from "@mui/material/CardActions";
import Link from "next/link";
import SingleSongRow from "@/app/components/SingleSongRow";

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
import { getArtist, getArtistV2 } from "@/app/services/ArtistServices";
import { Artist } from "@/app/constants/models";

const albumNames = [
  {
    album_id: "al1",
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    album_id: "al2",
    name: "Off the Wall",
    year: "1979",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Off_the_wall.jpg/220px-Off_the_wall.jpg",
  },
  {
    album_id: "al3",
    name: "Bad",
    year: "1987",
    img: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
  },
  {
    album_id: "al4",
    name: "Ben",
    year: "1972",
    img: "https://upload.wikimedia.org/wikipedia/en/1/17/BenMichaelJackson.jpg",
  },
  {
    album_id: "al5",
    name: "Invincible",
    year: "2001",
    img: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
  },
  {
    album_id: "al6",
    name: "Manila",
    year: "1996",
    img: "https://i.scdn.co/image/ab67616d0000b273655f0aa6bcd03fb68905c38e",
  },
];

const songNames = [
  {
    index: 1,
    songImg: "https://i1.sndcdn.com/artworks-000003321270-60t2ec-t500x500.jpg",
    songName: "Billy Jean",
    noOfFollowers: "1,234,450,000",
  },
  {
    index: 2,
    songImg: "https://miro.medium.com/v2/resize:fit:500/0*U2KdecQg1CLUbMZc.jpg",
    songName: "Beat It",
    noOfFollowers: "2,234,450,800",
  },
  {
    index: 3,
    songImg:
      "https://i1.sndcdn.com/artworks-1OHOA4uZkbc36Prf-ht3dkw-t500x500.jpg",
    songName: "Smooth Criminal",
    noOfFollowers: "1,034,450,090",
  },
  {
    index: 4,
    songImg:
      "https://upload.wikimedia.org/wikipedia/en/3/3e/Earth_Song_cover.jpg",
    songName: "Earth Song",
    noOfFollowers: "4,234,989,000",
  },
  {
    index: 5,
    songImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGwiHncfzBj2eBDZJ2huqgU27ESCyRXgf4wA&usqp=CAU",
    songName: "You Are Not Alone",
    noOfFollowers: "3,234,490,600",
  },
  {
    index: 6,
    songImg: "https://i.ytimg.com/vi/B87SGx0OADY/maxresdefault.jpg",
    songName: "Billy Jean",
    noOfFollowers: "1,234,450,000",
  },
];

interface Props {
  params: { id: string };
}

export default function SingleArtistPage({ params: { id } }: Props) {
  const [artistData, setArtistData] = React.useState<Artist>();

  React.useEffect(() => {
    console.log(id);
    getArtistV2(id).then((res) => {
      console.log("Res:::", res);
      if (res) {
        setArtistData(res);
      }
    });
  }, []);

  return (
    <Maindiv>
      {artistData ? (
        <>
          <CoverCardMedia image={artistData.user.artistCovers.length > 0 ? artistData.user.artistCovers[0] : "https://www.cincinnati.com/gcdn/authoring/authoring-images/2023/09/07/PCIN/70789109007-mj-1.jpg?width=660&height=441&fit=crop&format=pjpg&auto=webp"}>
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
                    {artistData.user.artistName}
                    <FlagBox></FlagBox>
                  </ArtistNameBox>
                  <GenreBox>
                    {artistData.user.musicGenres.join(", ")}
                  </GenreBox>
                  <SocialMediaBox>
                    <Button>
                      <FacebookRoundedIcon
                        style={{ color: "white", fontSize: "25px" }}
                      />
                    </Button>
                    <Button>
                      <InstagramIcon
                        style={{ color: "white", fontSize: "25px" }}
                      />
                    </Button>
                    <Button>
                      <XIcon style={{ color: "white", fontSize: "25px" }} />
                    </Button>
                    <Button>
                      <LanguageIcon
                        style={{ color: "white", fontSize: "25px" }}
                      />
                    </Button>
                  </SocialMediaBox>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50%",
                      display: "flex",
                      padding: "30px 0px",
                    }}
                  >
                    Michael Joseph Jackson was an American singer,
                    songwriter,dancer, and philanthropist. Known as the "King of
                    Pop", he is regarded as one of the most significant cultural
                    figures ofthe 20th century.
                  </Box>
                </ArtistDetailBox>

                <OptionBox>
                  <Stack direction="row" width="100%" spacing={"1px"}>
                    <Button>
                      <GroupAddIcon
                        style={{ color: "white", fontSize: "35px" }}
                      />
                    </Button>
                    <Button>
                      <StorefrontIcon
                        style={{ color: "white", fontSize: "35px" }}
                      />
                    </Button>
                    <Button>
                      <LocalActivityIcon
                        style={{ color: "white", fontSize: "35px" }}
                      />
                    </Button>
                  </Stack>
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
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
                <SearchIcon />
              </IconButton>
                
            </SearchPaper>
          </Box>
          <Box
            style={{
              padding: "10px 0px 0px 20px",
              color: "primary.default",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Albums
          </Box>

          <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
            {albumNames.map(({ album_id, name, year, img }) => (
              <Grid item xs={4} md={2} style={{ paddingLeft: 0 }}>
                <SingleAlbum
                  album_id={album_id}
                  albumName={name}
                  year={year}
                  albumImg={img}
                ></SingleAlbum>
              </Grid>
            ))}
          </Grid>

          <CardActions style={{ justifyContent: "right", padding: "10px" }}>
            <Button
              href="/main/artists/SingleArtistPage/MoreAlbums"
              //variant="contained"
              size="small"
            >
              Discover More
            </Button>
          </CardActions>

          <Box
            style={{
              padding: "0px 0px 0px 20px",
              color: "prmary.default",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Songs
          </Box>

          <Stack>
            {songNames.map(({ index, songImg, songName, noOfFollowers }) => (
              <SingleSongRow
                index={index}
                songImg={songImg}
                songName={songName}
                noOfFollowers={noOfFollowers}
              ></SingleSongRow>
            ))}
          </Stack>

          <CardActions style={{ justifyContent: "right", padding: "10px" }}>
            <Button
              href="/main/artists/SingleArtistPage/MoreSongs"
              size="small"
            >
              Discover More
            </Button>
          </CardActions>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Maindiv>
  );
}
