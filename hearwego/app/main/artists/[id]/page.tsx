//Single Artist Page

"use client";
import * as React from "react";
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
import { getArtist, getArtistV2 } from "@/app/services/ArtistServices";
import { Album, Artist, Song } from "@/app/constants/models";
import { getAlbumForArtists } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import { getSongsForArtist } from "@/app/services/SongServices";

interface Props {
  params: { id: string };
}

export default function SingleArtistPage({ params: { id } }: Props) {
  const [artistData, setArtistData] = React.useState<Artist>(); // This is the state for artist data
  const [albumByArtist, setAlbumByArtist] = React.useState<Album[]>([]); // This is the state for album by artist
  const artist = useAppSelector((state) => state.artist.user);
  const [songByArtist, setSongByArtist] = React.useState<Song[]>([]); // This is the state for song by artist

  // This is the useEffect for get artist
  React.useEffect(() => {
    console.log(id);
    getArtistV2(id).then((res) => {
      console.log("Res:::", res);
      if (res) {
        setArtistData(res);
      }
    });
  }, []);

  // This is the useEffect for get album by artist
  React.useEffect(() => {
    getAlbumForArtists(artist?.token, id).then((res) => {
      console.log("Albums:::", res);
      setAlbumByArtist(res.data);
    });
  }, []);

  // This is the useEffect for get song by artist
  React.useEffect(() => {
    getSongsForArtist(artist?.token, id).then((res) => {
      console.log("Songs:::", res);
      setSongByArtist(res.data);
    });
  }, []);

  return (
    <Maindiv>
      {artistData ? (
        <>
          {/* This is CardMedia component for backcover img */}
          <CoverCardMedia
            image={
              artistData.user.artistCovers.length > 0
                ? artistData.user.artistCovers[0]
                : "https://www.cincinnati.com/gcdn/authoring/authoring-images/2023/09/07/PCIN/70789109007-mj-1.jpg?width=660&height=441&fit=crop&format=pjpg&auto=webp"
            }
          >
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
                {/* This is the profilepictureavtar for artist profile pic*/}

                <ProfilePicAvatar
                  src={artistData.user.profilePicture}
                ></ProfilePicAvatar>

                {/* This is the artistdetailbox for artist details*/}
                <ArtistDetailBox>
                  <ArtistNameBox>
                    {artistData.user.artistName}
                    <FlagBox></FlagBox>
                  </ArtistNameBox>
                  <GenreBox>{artistData.user.musicGenres.join(", ")}</GenreBox>
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
                    {artistData.user.artistBio}
                  </Box>
                </ArtistDetailBox>

                {/* This is the optionbox for artist options*/}
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

          {/* This is the searchpaper for searchbar*/}
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

          {/* This is the box for album caption*/}
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

          {/* This is the grid for show albums*/}
          <Grid container spacing={5} sx={{ margin: "1em auto", width: "95%" }}>
            {albumByArtist.map((albums, index) => (
              <Grid item xs={2} md={2} style={{ paddingLeft: 3 }}>
                {/* This is the singlealbum component for show single album*/}
                <SingleAlbum
                  album_id={albums.album_id}
                  albumName={albums.album_title}
                  year={albums.release_date?.trimStart().slice(0, 4)}
                  albumImg={albums.album_img}
                ></SingleAlbum>
              </Grid>
            ))}
          </Grid>

          {/* This is the cardaction for discover more button*/}
          <CardActions style={{ justifyContent: "right", padding: "10px" }}>
            <Button
              href={"/main/artists/SingleArtistPage/" + id}
              //variant="contained"
              size="small"
            >
              Discover More
            </Button>
          </CardActions>
          {/* This is the box for song caption*/}
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

          {/* This is the stack for show songs*/}
          <Stack>
            {songByArtist.map((songs, index) => (
              <SingleSongRow
                song_id={songs.song_id}
                songImg={songs.song_img}
                songName={songs.song_title}
                noOfFollowers={songs.no_of_impressions}
              ></SingleSongRow>
            ))}
          </Stack>

          {/* This is the cardaction for discover more button*/}
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
