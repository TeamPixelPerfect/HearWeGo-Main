//Single Album Page

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Stack, useMediaQuery } from "@mui/material";
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
import { getAlbum, getSongsForAlbum } from "@/app/services/SongServices";
import { addAlbumImpression } from "@/app/services/AnalyticServices";

interface Props {
  params: { album_id: string };
}

export default function SingleAlbumPage({ params: { album_id } }: Props) {
  const [albumData, setAlbumData] = React.useState<Album>(); // This is the state for album data
  const [albumSongs, setAlbumSongs] = React.useState<Song[]>(); // This is the state for album songs

  const matches = useMediaQuery("(max-width:960px)");

  const incrementAlbumImpression = () => {
    addAlbumImpression(album_id).then((res) => {
      // console.log(res);
    });
  };

  // This is the useEffect for get album
  React.useEffect(() => {
    console.log(album_id);
    getAlbum("test", album_id).then((album) => {
      setAlbumData(album);
    });

    getSongsForAlbum(album_id).then((songs) => {
      setAlbumSongs(songs);
    });

    incrementAlbumImpression();
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
                height: matches ? "1000px" : "500px",
                width: "100%",
                opacity: "0.7",
              }}
            ></div>

            <AllMiddleBox>
              <Stack
                direction={matches ? "column" : "row"}
                width="100%"
                spacing={"1px"}
              >
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
              padding: "1em",
              color: "primary.default",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Songs
          </Box>

          {/* This is the stack for songs */}
          {albumSongs &&
            albumSongs.map((song, index) => (
              // This is the single song row component
              <SingleSongRow
                key={index}
                song_id={song?.song_id as string}
                songImg={song?.song_img as string}
                songName={song?.song_title as string}
                noOfFollowers={song?.no_of_plays as number}
                songUrl={song?.song_track as string}
                artist={
                  song?.artist
                    ?.map((artist) => artist?.artist_name)
                    .join(", ") as string
                }
              ></SingleSongRow>
            ))}

          <CardActions style={{ justifyContent: "right", padding: "10px" }}>
            {/* <Button
              href="/main/artists/SingleArtistPage/MoreSongs"
              //variant="contained"
              size="small"
            >
              Discover More
            </Button> */}
          </CardActions>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Maindiv>
  );
}
