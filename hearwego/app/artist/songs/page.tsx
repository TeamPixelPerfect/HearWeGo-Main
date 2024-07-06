"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import { EventMainBox } from "@/app/styles/artistDashboardEventsPage.styles";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import {
  deleteSong,
  getSongs,
  getSongsForArtist,
} from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import { set } from "date-fns";
import { setSong } from "@/lib/features/song.slice";
import LoadingButton from "@mui/lab/LoadingButton";

interface HomeSongCardProps {
  songData: Song;
  isDeleted?: boolean;
  setIsDeleted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainSongCard = ({ songData, setIsDeleted }: HomeSongCardProps) => {
  const artist = useAppSelector((state) => state.artist.user);
  const router = useRouter();
  const { playing, toggle } = useAudio({
    url: songData?.song_track as string,
    songName: songData?.song_title as string,
    artist: artist?.user?.artistName as string,
    coverArt: songData?.song_img as string,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState("to-delete");

  const handleOpen = () => {
    setOpen((val) => !val);
  };

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    handleSongDelete();
    handleCloseDeleteModal();
  };

  const handleSongDelete = () => {
    setDeleting("deleting");
    deleteSong(artist?.token as string, songData?._id as string).then((res) => {
      setDeleting("deleted");
      if (setIsDeleted) setIsDeleted(true);
    });
  };

  return (
    <SongCard>
      <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
        <SongCardCoverArt imgUrl={songData.song_img ? songData.song_img : ""} />
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
          <IconButton
            onClick={() => {
              router.push(`/artist/songs/${songData.song_id}`);
            }}
          >
            <FaEye />
          </IconButton>
          <IconButton
            onClick={() => {
              router.push(`/artist/songs/edit/${songData.song_id}`);
            }}
            color="secondary"
          >
            <FaEdit />
          </IconButton>
          <IconButton onClick={handleDeleteModal} color="error">
            <MdDelete />
          </IconButton>
        </SongCardButtonGroup>
      )}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ borderRadius: 20 }}
      >
        <DialogTitle id="alert-dialog-title" color="error">
          {"Delete Song"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleting === "deleting"
              ? "Deleting Song..."
              : deleting === "deleted"
              ? "Song Deleted Successfully!"
              : "Are you sure you want to delete this song?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="secondary">
            No
          </Button>
          <LoadingButton
            loading={deleting === "deleting"}
            onClick={handleConfirmDelete}
            color="error"
            autoFocus
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
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

  const [isDeleted, setIsDeleted] = useState(false);

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
    console.log("Artist:::", artist);
    if (artist?.token && artist?.user?.artist_id) {
      // fetch popular songs
      getSongsForArtist(
        artist?.token,
        artist?.user?.artist_id,
        page,
        limit
      ).then((songs) => {
        console.log("Songs:::", songs);
        setPopularSongs(songs.data);
      });

      // fetch recent songs
      getSongsForArtist(
        artist?.token,
        artist?.user?.artist_id,
        page,
        limit
      ).then((songs) => {
        console.log("Songs:::", songs);
        setRecentSongs(songs.data);
      });

      // fetch upcoming songs
      getSongsForArtist(
        artist?.token,
        artist?.user?.artist_id,
        page,
        limit
      ).then((songs) => {
        console.log("Songs:::", songs);
        setUpcomingSongs(songs.data);
      });

      // fetch draft songs
    }
  }, [page]);

  useEffect(() => {
    if (isDeleted) {
      // fetch popular songs
      getSongsForArtist(
        artist?.token as string,
        artist?.user?.artist_id as string,
        page,
        limit
      ).then((songs) => {
        console.log("Songs:::", songs);
        setPopularSongs(songs.data);
      });

      // fetch recent songs
      getSongsForArtist(
        artist?.token as string,
        artist?.user?.artist_id as string,
        page,
        limit
      ).then((songs) => {
        console.log("Songs:::", songs);
        setRecentSongs(songs.data);
      });

      // fetch upcoming songs
      getSongsForArtist(
        artist?.token as string,
        artist?.user?.artist_id as string,
        page,
        limit
      ).then((songs) => {
        console.log("Songs:::", songs);
        setUpcomingSongs(songs.data);
      });

      setIsDeleted(false);
      // fetch draft songs
    }
  }, [isDeleted]);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
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
              fontSize: "24px",
              fontWeight: "700",
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
                return (
                  <MainSongCard
                    key={song.song_id}
                    songData={song}
                    setIsDeleted={setIsDeleted}
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
                    key={song.song_id}
                    songData={song}
                    setIsDeleted={setIsDeleted}
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
                    key={song.song_id}
                    songData={song}
                    setIsDeleted={setIsDeleted}
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
                    key={song.song_id}
                    songData={song}
                    setIsDeleted={setIsDeleted}
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
