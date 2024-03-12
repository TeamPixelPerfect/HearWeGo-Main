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
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { getSongs, getSongsForArtist } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";

interface HomeSongCardProps {
  songData: Song;
}

export const MainSongCard = ({ songData }: HomeSongCardProps) => {
  const router = useRouter();
  const { playing, toggle } = useAudio({ url: songData.song_track? songData.song_track: "" });
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((val) => !val);
  };

  return (
    <SongCard
      onClick={() => {
        router.push(`/artist/songs/${songData.song_id}`);
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
        <SongCardCoverArt imgUrl={songData.song_img ? songData.song_img: ""} />
        <Typography variant="h6">{songData.song_title}</Typography>
      </Box>
      <SongCardItem width="20%">
        <MdAlbum />
        <Typography variant="body1">{songData.album_title}</Typography>
      </SongCardItem>
      <SongCardItem width="15%">
        <FaEye />
        <Typography variant="body1">{songData.no_of_impressions}</Typography>
      </SongCardItem>
      <SongCardItem width="15%">
        <FaHeadphonesSimple />
        <Typography variant="body1">{songData.no_of_plays}</Typography>
      </SongCardItem>
      <SongCardItem width="15%">
        <GiSoundWaves />
        <Typography variant="body2">{songData.song_length}</Typography>
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
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);

  const [popularSongs, setPopularSongs] = useState<Song[]>([]);

  const [recentSongs, setRecentSongs] = useState<Song[]>([]);
  const [upcomingSongs, setUpcomingSongs] = useState<Song[]>([]);
  const [draftSongs, setDraftSongs] = useState<Song[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (artist?.token && artist?.user?.artist_id) {
      // fetch popular songs
      getSongsForArtist(artist?.token, artist?.user?.artist_id, page, limit).then((songs) => {
        console.log("Songs:::", songs);
        setPopularSongs(songs.data);
      });

      // fetch recent songs
      getSongsForArtist(artist?.token, artist?.user?.artist_id, page, limit).then((songs) => {
        console.log("Songs:::", songs);
        setRecentSongs(songs.data);
      });

      // fetch upcoming songs
      getSongsForArtist(artist?.token, artist?.user?.artist_id, page, limit).then((songs) => {
        console.log("Songs:::", songs);
        setUpcomingSongs(songs.data);
      });

      // fetch draft songs
    }
  }, [page]);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh" }}>
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
            onClick={() => {
              router.push("/artist/songs/add");
            }}
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
            {popularSongs?.length > 0 ? (
              popularSongs?.map((song) => {
                return <MainSongCard key={song.song_id} songData={song} />;
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
                return <MainSongCard key={song.song_id} songData={song} />;
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
                return <MainSongCard key={song.song_id} songData={song} />;
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
                return <MainSongCard key={song.song_id} songData={song} />;
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
            padding: "2em 0",
          }}
        >
          <Pagination
            count={10}
            page={page}
            onChange={handlePageChange}
            color="secondary"
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default ArtistSongs;
