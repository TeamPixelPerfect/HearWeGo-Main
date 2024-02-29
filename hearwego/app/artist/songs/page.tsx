"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import { EventMainBox } from "@/app/styles/artistDashboardEventsPage.styles";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
  duration,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { IoIosPause, IoIosPlay, IoMdMore } from "react-icons/io";
import { MdAlbum, MdDelete } from "react-icons/md";
import { GiSoundWaves } from "react-icons/gi";
import {
  SongCard,
  SongCardButtonGroup,
  SongCardCoverArt,
  SongCardItem,
  SongCardPlayButton,
} from "@/app/styles/songCard.styles";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { bool } from "aws-sdk/clients/signer";
import { Song } from "@/app/constants/models";

interface HomeSongCardProps {
  songName: string;
  albumName: string;
  duration: number;
  songUrl: string;
  coverArt: string;
  impressions: string;
  listners: string;
}

const MainSongCard = ({
  songName,
  albumName,
  duration,
  songUrl,
  coverArt,
  impressions,
  listners,
}: HomeSongCardProps) => {
  const { playing, toggle } = useAudio({ url: songUrl });
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((val) => !val);
  };

  return (
    <SongCard>
      <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
        <SongCardCoverArt imgUrl={coverArt} />
        <Typography variant="h6">{songName}</Typography>
      </Box>
      <SongCardItem width="20%">
        <MdAlbum />
        <Typography variant="body1">{albumName}</Typography>
      </SongCardItem>
      <SongCardItem width="15%">
        <FaEye />
        <Typography variant="body1">{impressions}</Typography>
      </SongCardItem>
      <SongCardItem width="15%">
        <FaHeadphonesSimple />
        <Typography variant="body1">{listners}</Typography>
      </SongCardItem>
      <SongCardItem width="15%">
        <GiSoundWaves />
        <Typography variant="body2">{duration}</Typography>
      </SongCardItem>

      <Box sx={{ width: "10%", display: "flex", justifyContent: "flex-end" }}>
        <SongCardPlayButton onClick={toggle}>
          {playing ? <IoIosPause /> : <IoIosPlay />}
        </SongCardPlayButton>
      </Box>
      <IconButton onClick={handleOpen}>
        {open ? <IoClose /> : <IoMdMore />}
      </IconButton>
      {open && (
        <SongCardButtonGroup
          variant="outlined"
          aria-label="song action group"
          // orientation="vertical"
        >
          <Button startIcon={<FaEdit />}>Edit</Button>
          <Button startIcon={<MdDelete />} color="error">
            Delete
          </Button>
        </SongCardButtonGroup>
      )}
    </SongCard>
  );
};

const ArtistSongs = () => {
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);

  const [popularSongs, setPopularSongs] = useState<Song[]>([
    {
      songName: "I'll be there for you",
      albumName: "L.P.",
      duration: 3.08,
      songUrl:
        "https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3",
      coverArt:
        "https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg",
      impressions: "10.5M",
      listeners: "3.4M",
    },
    {
      songName: "I'll be there for you",
      albumName: "L.P.",
      duration: 3.08,
      songUrl:
        "https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3",
      coverArt:
        "https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg",
      impressions: "10.5M",
      listeners: "3.4M",
    },
    {
      songName: "I'll be there for you",
      albumName: "L.P.",
      duration: 3.08,
      songUrl:
        "https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3",
      coverArt:
        "https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg",
      impressions: "10.5M",
      listeners: "3.4M",
    },
    {
      songName: "I'll be there for you",
      albumName: "L.P.",
      duration: 3.08,
      songUrl:
        "https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3",
      coverArt:
        "https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg",
      impressions: "10.5M",
      listeners: "3.4M",
    },
    {
      songName: "I'll be there for you",
      albumName: "L.P.",
      duration: 3.08,
      songUrl:
        "https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3",
      coverArt:
        "https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg",
      impressions: "10.5M",
      listeners: "3.4M",
    },
  ]);

  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [upcomingSongs, setUpcomingSongs] = useState<Song[]>([]);
  const [draftSongs, setDraftSongs] = useState<Song[]>([]);

  const [page, setPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh"}}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: theme.palette.secondary.main,
            }}
          >
            Songs
          </Typography>
          <Button
            variant="contained"
            startIcon={<IoAddOutline />}
            sx={{ textTransform: "capitalize" }}
          >
            Add New Song
          </Button>
        </Box>
        <ADTabBox>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Popular" />
            <Tab label="Recent" />
            <Tab label="Upcoming" />
            <Tab label="Drafts" />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0} fullWidth={true}>
            {popularSongs.length > 0 ? (
              popularSongs.map((song) => {
                return (
                  <MainSongCard
                    songName={song.songName}
                    albumName={song.albumName}
                    songUrl={song.songUrl}
                    coverArt={song.coverArt}
                    impressions={song.impressions}
                    listners={song.listeners}
                    duration={song.duration}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            {recentSongs.length > 0 ? (
              recentSongs.map((song) => {
                return (
                  <MainSongCard
                    songName={song.songName}
                    albumName={song.albumName}
                    songUrl={song.songUrl}
                    coverArt={song.coverArt}
                    impressions={song.impressions}
                    listners={song.listeners}
                    duration={song.duration}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2} fullWidth={true}>
            {upcomingSongs.length > 0 ? (
              upcomingSongs.map((song) => {
                return (
                  <MainSongCard
                    songName={song.songName}
                    albumName={song.albumName}
                    songUrl={song.songUrl}
                    coverArt={song.coverArt}
                    impressions={song.impressions}
                    listners={song.listeners}
                    duration={song.duration}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3} fullWidth={true}>
            {draftSongs.length > 0 ? (
              draftSongs.map((song) => {
                return (
                  <MainSongCard
                    songName={song.songName}
                    albumName={song.albumName}
                    songUrl={song.songUrl}
                    coverArt={song.coverArt}
                    impressions={song.impressions}
                    listners={song.listeners}
                    duration={song.duration}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No songs available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
        </ADTabBox>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2em 0"
          }}
        >
          <Pagination count={10} page={page} onChange={handlePageChange} color="secondary"/>
        </Box>
      </Card>
    </Grid>
  );
};

export default ArtistSongs;
