"use client";
import { Song } from "@/app/constants/models";
import {
  SongPreviewDetails,
  SongPreviewShare,
  SongPreviewSong,
} from "@/app/styles/artistAddSongs.styles";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaFacebook,
  FaGlobeAsia,
} from "react-icons/fa";
import { MdDelete, MdHeadset } from "react-icons/md";
import LockIcon from "@mui/icons-material/Lock";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import useAudio from "@/app/Hooks/useAudio";
import { useAppSelector } from "@/lib/hooks";
import {
  SongDetailData,
  SongDetailDataEven,
  SongDetailTable,
  SongDetailTitle,
  SongDetailTitleEven,
} from "@/app/styles/artistSongDetails.styles";
import Link from "next/link";
import { deleteSong, getSong } from "@/app/services/SongServices";
import { useRouter } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import { site_url } from "@/app/constants/keys";

interface Props {
  params: { id: string };
}

interface ClickPlayProps {
  songData: Song;
}

interface SongPreviewProps {
  songData: Song;
}

//function to play the song
function ClickPlay({ songData }: ClickPlayProps) {
  const { toggle, playing } = useAudio({
    url: songData.song_track as string,
    songName: songData.song_title as string,
    artist: songData?.artist[0]?.artist_name as string,
    coverArt: songData.song_img as string,
  });

  return (
    <>
      {/* change the play icon and play the song*/}
      {!playing ? (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PlayCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            onClick={toggle}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PauseCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            onClick={toggle}
          />
        </IconButton>
      )}
    </>
  );
}

//single song preview
function SongPreview({ songData }: SongPreviewProps) {
  const artist = useAppSelector((state) => state.artist.user?.user);

  const matches = useMediaQuery("(min-width:540px)");

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(site_url + "main/songs/" + songData?.song_id);
    setSnackbarOpen(true);
    setSnackbarMessage("Link Copied to Clipboard!");
    setSnackbarSeverity("success");
  };

  return (
    //song details
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: matches ? "row" : "column",
      }}
    >
      <SongPreviewSong>
        <CardMedia
          component="img"
          sx={{ width: "100%", borderRadius: 1 }}
          image={songData.song_img}
          height="100%"
          alt="Live from space album cover"
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 1,
          }}
        >
          <ClickPlay songData={songData} />
        </Box>
      </SongPreviewSong>

      <SongPreviewDetails>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          ISRC: {songData?.isrc && songData?.isrc}
        </Typography>
        <Typography component="div" sx={{ fontSize: 28, fontWeight: 600 }}>
          {songData.song_title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
          {songData?.artist?.map((artist) => artist.artist_name).join(",")} -{" "}
          {songData.album_title ? songData.album_title : "Single"}
        </Typography>

        {/* genre display */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          {songData?.primary_genre?.map((genre) => {
            return (
              <Chip
                key={genre}
                label={genre}
                color="primary"
                sx={{ fontSize: 12 }}
              />
            );
          })}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          {songData?.electronic_sub_genre?.map((genre) => {
            return (
              <Chip
                key={genre}
                label={genre}
                color="secondary"
                sx={{ fontSize: 12 }}
              />
            );
          })}
        </Stack>

        {/* privacy chip */}
        <Chip
          icon={
            songData?.privacy_status === "private" ? (
              <LockIcon />
            ) : (
              <FaGlobeAsia />
            )
          }
          sx={{ marginBottom: "1em" }}
          label={songData?.privacy_status}
        />

        <Alert
          variant="filled"
          severity={
            songData?.song_status === "Released"
              ? "success"
              : songData?.song_status === "To Release"
              ? "warning"
              : songData?.song_status === "Draft"
              ? "info"
              : "info"
          }
          sx={{ width: "200px", marginBottom: "1em" }}
        >
          {songData.song_status}
        </Alert>
      </SongPreviewDetails>

      <SongPreviewShare>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "1em",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, marginBottom: "1em" }}
          >
            Share your Track
          </Typography>

          {/* social media buttons */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ marginBottom: "1em", fontSize: 32 }}
          >
            <IconButton>
              <FaFacebook />
            </IconButton>

            <IconButton>
              <AiFillInstagram />
            </IconButton>

            <IconButton>
              <FaXTwitter />
            </IconButton>

            <IconButton>
              <MdHeadset />
            </IconButton>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "primary.main",
            padding: "5px",
            borderTopLeftRadius: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              color: "#fff",
              fontSize: "12px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {/* link copy area */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {site_url + "main/songs/" + songData?.song_id}
            </Box>
            <IconButton onClick={handleCopyLink}>
              <ContentCopyIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </SongPreviewShare>
    </Paper>
  );
}

//song details area
const SongDetails = ({ params: { id } }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);

  const [songDetails, setSongDetails] = useState<Song | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState("to-delete");

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
    deleteSong(artist?.token as string, songDetails?._id as string).then(
      (res) => {
        setDeleting("deleted");
        router.push("/artist/songs");
      }
    );
  };

  useEffect(() => {
    if (artist) {
      getSong(artist.token, id).then((song) => {
        console.log("Song:::", song);
        setSongDetails(song);
      });
    }
  }, []);

  if (!songDetails) return <div>Loading...</div>;

  return (
    //song details
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 2em 1em 2em",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/artist/songs"
              color="secondary"
              style={{ marginRight: "1em" }}
            >
              <FaChevronLeft />
            </Link>
            <Typography
              variant="h4"
              sx={{
                fontSize: "24px",
                fontWeight: "700",
                color: theme.palette.secondary.main,
              }}
            >
              Songs <FaChevronRight style={{ fontSize: "12px" }} />{" "}
              {songDetails.song_title}
            </Typography>
          </Box>
          <ButtonGroup variant="outlined">
            <IconButton color="secondary">
              <FaEdit
                onClick={() => {
                  router.push(`/artist/songs/edit/${id}`);
                }}
              />
            </IconButton>
            <IconButton onClick={handleDeleteModal} color="error">
              <MdDelete />
            </IconButton>
          </ButtonGroup>
        </Box>
        <SongPreview songData={songDetails} />
        <SongDetailTable container>
          <SongDetailTitle item xs={4} md={2}>
            Release Date
          </SongDetailTitle>
          <SongDetailData item xs={8} md={10}>
            {dayjs(songDetails?.release_date).format("YYYY MMMM DD")}
          </SongDetailData>

          <SongDetailTitleEven item xs={4} md={2}>
            Language
          </SongDetailTitleEven>
          <SongDetailDataEven item xs={8} md={10}>
            {songDetails.language &&
              songDetails?.language.map((lang) => <Box>{lang}</Box>)}
          </SongDetailDataEven>

          <SongDetailTitle item xs={4} md={2}>
            Length
          </SongDetailTitle>
          <SongDetailData item xs={8} md={10}>
            {songDetails?.song_length}
          </SongDetailData>

          <SongDetailTitleEven item xs={4} md={2}>
            Label
          </SongDetailTitleEven>
          <SongDetailDataEven item xs={8} md={10}>
            {songDetails?.record_label}
          </SongDetailDataEven>

          <SongDetailTitle item xs={4} md={2}>
            Songwriter(s)
          </SongDetailTitle>
          <SongDetailData item xs={8} md={10}>
            {songDetails?.song_writers?.map((writer) => {
              return <Box>{writer.artist_name}</Box>;
            })}
          </SongDetailData>

          <SongDetailTitleEven item xs={4} md={2}>
            Producer(s)
          </SongDetailTitleEven>
          <SongDetailDataEven item xs={8} md={10}>
            {songDetails?.composer?.map((producer) => {
              return <Box>{producer.artist_name}</Box>;
            })}
          </SongDetailDataEven>

          <SongDetailTitle item xs={4} md={2}>
            Publisher(s)
          </SongDetailTitle>
          <SongDetailData item xs={8} md={10}>
            {songDetails?.publisher?.map((publisher) => {
              return <Box>{publisher}</Box>;
            })}
          </SongDetailData>

          <SongDetailTitleEven item xs={4} md={2}>
            Lyrics
          </SongDetailTitleEven>
          <SongDetailDataEven item xs={8} md={10}>
            <Box sx={{ whiteSpace: "pre-wrap" }}>{songDetails?.lyrics}</Box>
          </SongDetailDataEven>
        </SongDetailTable>
      </Card>
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
    </Grid>
  );
};

export default SongDetails;
