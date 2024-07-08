//Single Album Page

"use client";
import * as React from "react";
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
import SingleSongRow from "@/app/components/SingleSongRow";
import CardActions from "@mui/material/CardActions";

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
import { Album, Song } from "@/app/constants/models";
import { getAlbum } from "@/app/services/SongServices";

const songNames = [
  {
    index: 1,
    songImg:
      "https://i.discogs.com/RTFGo4KUqbx8PhupphvPjzv5hdijnj5ks_gaEzyEexY/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQzMTc3/Ni0xNjY5OTcyOTcx/LTI3NjIuanBlZw.jpeg",
    songName: "Wanna Be Startin’ Somethin’",
    noOfFollowers: "2,234,450,000",
  },
  {
    index: 2,
    songImg: "https://i1.sndcdn.com/artworks-000003321270-60t2ec-t500x500.jpg",
    songName: "Billy Jean",
    noOfFollowers: "1,234,450,000",
  },
  {
    index: 3,
    songImg: "https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97",
    songName: "Baby Be Mine",
    noOfFollowers: "1,284,453,300",
  },
  {
    index: 4,
    songImg: "https://f4.bcbits.com/img/a2068708402_10.jpg",
    songName: "The Lady in My Life",
    noOfFollowers: "1,234,450,000",
  },
  {
    index: 5,
    songImg: "https://miro.medium.com/v2/resize:fit:500/0*U2KdecQg1CLUbMZc.jpg",
    songName: "Beat It",
    noOfFollowers: "1,034,450,900",
  },
  {
    index: 6,
    songImg: "https://i1.sndcdn.com/artworks-000003321270-60t2ec-t500x500.jpg",
    songName: "Billy Jean",
    noOfFollowers: "1,234,450,000",
  },
];

interface Props {
  params: { album_id: string };
}

export default function SingleAlbumPage({ params: { album_id } }: Props) {
  const [albumData, setAlbumData] = React.useState<Album>(); // This is the state for album data
  const [albumSongs, setAlbumSongs] = React.useState<Song[]>(); // This is the state for album songs

  // This is the useEffect for get album
  React.useEffect(() => {
    console.log(album_id);
    getAlbum("test", album_id).then((album) => {
      console.log("Album:::", album[0]);
      setAlbumData(album[0]);
    });
  }, []);

  return (
    <Maindiv>
      {albumData ? (
        <>
          {/* This is CardMedia component for backcover img */}
          <CoverCardMedia image={albumData?.album_img}>
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
                {/* This is the profilepictureavtar for artist profile pic*/}
                <ProfilePicAvatar src={albumData?.album_img}></ProfilePicAvatar>

                {/* This is the album detail box */}
                <ArtistDetailBox>
                  <ArtistNameBox
                    sx={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "white",
                      textTransform: "capitalize",
                    }}
                  >
                    {albumData?.album_title}
                  </ArtistNameBox>
                  <GenreBox>
                    {albumData?.release_date?.trimStart().slice(0, 4)}
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
                    {albumData?.description}
                  </Box>
                </ArtistDetailBox>

                {/* This is the optionbox for artist options*/}
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
                      <SiApplemusic
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
              padding: "40px 0px 0px 20px",
              color: "primary.default",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Songs
          </Box>

          {/* This is the stack for songs */}
          {songNames.map(({ index, songImg, songName, noOfFollowers }) => (
            // This is the single song row component
            <SingleSongRow
              index={index}
              songImg={songImg}
              songName={songName}
              noOfFollowers={noOfFollowers}
            ></SingleSongRow>
          ))}

          <CardActions style={{ justifyContent: "right", padding: "10px" }}>
            <Button
              href="/main/artists/SingleArtistPage/MoreSongs"
              //variant="contained"
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
