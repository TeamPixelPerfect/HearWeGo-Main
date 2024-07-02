"use client";
import {
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
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
  const { playing, toggle } = useAudio({ url: songUrl });
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
      {!matches && <SongCardItem width="10%">
        <GiSoundWaves />
        <Typography variant="body2">{duration}</Typography>
      </SongCardItem>}

      <Box sx={{ width:matches? "10%" :"5%" }}>
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

  const [profilePic, setProfilePic] = useState<string>(
    // "https://placehold.co/600x600/png"
    "https://www.rollingstone.com/wp-content/uploads/2021/05/rembrandts-flashback.jpg"
  );
  const [coverPic, setCoverPic] = useState<string>(
    // "https://placehold.co/1280x720/png"
    "https://londonmumsmagazine.com/wp-content/uploads/2019/07/The-Rembrandts-Via-Satellite-2.jpg"
  );

  const [tabValue, setTabValue] = React.useState(0);

  const artist = useAppSelector((state) => state.artist.user);

  const [popularSongs, setPopularSongs] = useState<Song[]>();
  const [recentSongs, setRecentSongs] = useState<Song[]>();
  const [upcomingSongs, setUpcomingSongs] = useState<Song[]>();

  const [albums, setAlbums] = useState<Album[]>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getSongsForArtist(artist?.token, artist?.user.artist_id).then((songs) => {
      console.log(songs);
      setPopularSongs(songs.data);
    });

    getAlbumForArtists(artist?.token, artist?.user.artist_id).then((albums) => {
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
        <ADHomeCoverBox imgUrl={artist?.user.artistCovers[0]}>
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
              <ADHomeProfilePicture imgUrl={artist?.user.profilePicture} />
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
                <ADHomeName>{artist?.user.artistName}</ADHomeName>
                {artist.user.artistBio && <ADArtistInfo>{artist?.user.artistBio.split(".")[0]}</ADArtistInfo>}

                <ADArtistPageUrl>
                  <Link href="">http://www.hearwego.com/wq23s</Link>
                  <FaCopy />
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
                <FaFacebook />
                <AiFillInstagram />
                <FaSquareXTwitter />
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
            {popularSongs?.length > 0 ? (
              popularSongs.map((song) => (
                <HomeSongCard
                  songName={song.song_title}
                  albumName={song.album_title}
                  duration={song.song_length}
                  songUrl={song.song_track}
                  coverArt={song.song_img}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1} fullWidth={false}>
            {recentSongs?.length > 0 ? (
              recentSongs.map((song) => (
                <HomeSongCard
                  songName={song.song_title}
                  albumName={song.album_title}
                  duration={song.song_length}
                  songUrl={song.song_track}
                  coverArt={song.song_img}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2} fullWidth={false}>
            {upcomingSongs?.length > 0 ? (
              upcomingSongs.map((song) => (
                <HomeSongCard
                  songName={song.song_title}
                  albumName={song.album_title}
                  duration={song.song_length}
                  songUrl={song.song_track}
                  coverArt={song.song_img}
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
            {albums?.length > 0 ? (
              albums.map((album) => (
                <HomeAlbumCard
                  albumCoverArt={album.album_img}
                  albumName={album.album_title}
                  albumTracks={album.album_tracks}
                  albumLength={album.album_length}
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
    </Grid>
  );
};

export default ADHomePage;
