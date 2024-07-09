"use client";
import {
  Alert,
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ADArtistInfo,
  ADArtistPageUrl,
  ADHomeCoverBox,
  ADHomeName,
  ADHomeNameArea,
  ADHomeProfilePicture,
  ADHomeSocialIcons,
  ADHomeTabBox,
  FeaturedAlbumCard,
  FeaturedSongCard,
} from "../styles/artistDashboard.styles";
import Link from "next/link";
import { FaCopy, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TabBar } from "../styles/artistDashboardEventsPage.styles";
import useAudio from "../Hooks/useAudio";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import {
  AlbumCard,
  AlbumCardCoverArt,
  SongCard,
  SongCardCoverArt,
  SongCardItem,
  SongCardPlayButton,
} from "../styles/songCard.styles";
import { MdAlbum } from "react-icons/md";
import { GiSoundWaves } from "react-icons/gi";
import CustomTabPanel from "../components/CustomeTabPanel";
import { useAppSelector } from "@/lib/hooks";
import { Album, Song } from "../constants/models";
import {
  getAlbumForArtists,
  getSongsForArtist,
} from "../services/SongServices";
import { Home } from "@mui/icons-material";
import { site_url } from "../constants/keys";
import dayjs from "dayjs";

interface HomeSongCardProps {
  songName: string;
  albumName: string;
  duration: number;
  songUrl: string;
  coverArt: string;
}

interface HomeAlbumCardProps {
  albumCoverArt: string;
  albumName: string;
  albumTracks: number;
  albumLength: number;
}

const HomeSongCard = ({
  songName,
  albumName,
  duration,
  songUrl,
  coverArt,
}: HomeSongCardProps) => {
  const artist = useAppSelector((state) => state.artist.user);

  const { playing, toggle } = useAudio({
    url: songUrl,
    songName,
    artist: artist?.artistName as string,
    coverArt,
  });
  const matches = useMediaQuery("(max-width:960px)");

  return (
    <SongCard>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: matches ? "60%" : "45%",
        }}
      >
        <SongCardCoverArt imgUrl={coverArt} />
        <Typography variant="h6">{songName}</Typography>
      </Box>
      <SongCardItem width={matches ? "30%" : "40%"}>
        <MdAlbum />
        <Typography variant="body1">{albumName}</Typography>
      </SongCardItem>
      {!matches && (
        <SongCardItem width="10%">
          <GiSoundWaves />
          <Typography variant="body2">{duration}</Typography>
        </SongCardItem>
      )}

      <Box sx={{ width: matches ? "10%" : "5%" }}>
        <SongCardPlayButton onClick={toggle}>
          {playing ? <IoIosPause /> : <IoIosPlay />}
        </SongCardPlayButton>
      </Box>
    </SongCard>
  );
};

const HomeAlbumCard = ({
  albumCoverArt,
  albumName,
  albumLength,
  albumTracks,
}: HomeAlbumCardProps) => {
  return (
    <AlbumCard>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AlbumCardCoverArt imgUrl={albumCoverArt} />
        <Box>
          <Typography variant="h6">{albumName}</Typography>
          <Typography variant="body1">Tracks: {albumTracks}</Typography>
          <Typography variant="body1">Length: {albumLength}</Typography>
        </Box>
      </Box>
    </AlbumCard>
  );
};

const ADHomePage = () => {
  const matches = useMediaQuery("(max-width:960px)");

  const [tabValue, setTabValue] = React.useState(0);

  const artist = useAppSelector((state) => state.artist.user);

  const [popularSongs, setPopularSongs] = useState<Song[]>();
  const [recentSongs, setRecentSongs] = useState<Song[]>();
  const [upcomingSongs, setUpcomingSongs] = useState<Song[]>();

  const [albums, setAlbums] = useState<Album[]>();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      site_url + "main/artists/" + artist?.artist_id
    );
    setSnackbarOpen(true);
    setSnackbarMessage("Link copied to clipboard!");
    setSnackbarSeverity("success");
  };

  const getUpcomingSongs = (songs: Song[]) => {
    const upcoming = songs.filter((song) =>
      dayjs(song.release_date).isAfter(dayjs())
    );
    return upcoming;
  };

  useEffect(() => {
    getSongsForArtist(
      artist?.token as string,
      artist?.artist_id as string
    ).then((songs) => {
      console.log(songs);
      setPopularSongs(songs.data);
      setUpcomingSongs(getUpcomingSongs(songs.data));
    });

    getAlbumForArtists(
      artist?.token as string,
      artist?.artist_id as string
    ).then((albums) => {
      console.log(albums);
      setAlbums(albums.data);
    });
  }, []);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ height: matches ? "600px" : "400px", margin: "0" }}
      >
        <ADHomeCoverBox imgUrl={artist?.artistCovers[0] as string}>
          <ADHomeNameArea>
            <Box
              sx={{
                display: "flex",
                alignItems: matches ? "center" : "flex-end",
                flexDirection: matches ? "column" : "row",
                justifyContent: matches ? "flex-end" : "center",
                mb: matches ? "2em" : 0,
              }}
            >
              <ADHomeProfilePicture imgUrl={artist?.profilePicture} />
              <Box
                sx={
                  !matches
                    ? { ml: 3 }
                    : {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }
                }
              >
                <ADHomeName>{artist?.artistName}</ADHomeName>
                {artist?.artistBio && (
                  <ADArtistInfo>{artist?.artistBio.split(".")[0]}</ADArtistInfo>
                )}

                <ADArtistPageUrl>
                  <Link href="">
                    {site_url + "main/artists/" + artist?.artist_id}
                  </Link>
                  <IconButton onClick={handleCopyLink}>
                    <FaCopy style={{ fontSize: "12px" }} />
                  </IconButton>
                </ADArtistPageUrl>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: matches ? "center" : "flex-end",
                mr: matches ? 0 : 2,
              }}
            >
              <ADHomeSocialIcons>
                <IconButton>
                  <FaFacebook style={{ fontSize: "32px" }} />
                </IconButton>
                <IconButton>
                  <AiFillInstagram style={{ fontSize: "32px" }} />
                </IconButton>
                <IconButton>
                  <FaSquareXTwitter style={{ fontSize: "32px" }} />
                </IconButton>
              </ADHomeSocialIcons>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: matches ? "center" : "flex-start",
                  justifyContent: matches ? "center" : "flex-start",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: "600", mb: 0 }}
                >
                  22,522,155
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  Followers
                </Typography>
              </Box>
            </Box>
          </ADHomeNameArea>
        </ADHomeCoverBox>
      </Grid>
      <Grid item xs={12} md={8} sx={{ margin: 0 }}>
        <FeaturedSongCard>
          <Typography variant="h5" sx={{ fontWeight: "700", mb: 0 }}>
            Featured Songs
          </Typography>
          <ADHomeTabBox>
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              value={tabValue}
              onChange={handleChange}
            >
              <Tab label="Popular" />
              <Tab label="Recent" />
              <Tab label="Upcoming" />
            </Tabs>
          </ADHomeTabBox>
          <CustomTabPanel value={tabValue} index={0} fullWidth={false}>
            {popularSongs && popularSongs?.length > 0 ? (
              popularSongs.map((song) => (
                <HomeSongCard
                  songName={song.song_title as string}
                  albumName={song.album_title as string}
                  duration={song.song_length as number}
                  songUrl={song.song_track as string}
                  coverArt={song.song_img as string}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1} fullWidth={false}>
            {popularSongs && popularSongs?.length > 0 ? (
              popularSongs.map((song) => (
                <HomeSongCard
                  songName={song.song_title as string}
                  albumName={song.album_title as string}
                  duration={song.song_length as number}
                  songUrl={song.song_track as string}
                  coverArt={song.song_img as string}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2} fullWidth={false}>
            {upcomingSongs && upcomingSongs?.length > 0 ? (
              upcomingSongs.map((song) => (
                <HomeSongCard
                  songName={song.song_title as string}
                  albumName={song.album_title as string}
                  duration={song.song_length as number}
                  songUrl={song.song_track as string}
                  coverArt={song.song_img as string}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
        </FeaturedSongCard>
      </Grid>
      <Grid item xs={12} md={4} sx={{ margin: 0 }}>
        <FeaturedAlbumCard>
          <Typography variant="h5" sx={{ fontWeight: "700", mb: 2 }}>
            Featured Albums
          </Typography>

          <Box sx={{ m: 3 }}>
            {albums && albums?.length > 0 ? (
              albums.map((album) => (
                <HomeAlbumCard
                  albumCoverArt={album.album_img as string}
                  albumName={album.album_title as string}
                  albumTracks={album.no_of_tracks as number}
                  albumLength={album.album_length as number}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No albums available yet!</em>
              </Typography>
            )}
          </Box>
        </FeaturedAlbumCard>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ADHomePage;
