"use client";
import { Album, Song } from "@/app/constants/models";
import {
  SongPreviewDetails,
  SongPreviewShare,
  SongPreviewSong,
} from "@/app/styles/artistAddSongs.styles";
import { useAppSelector } from "@/lib/hooks";
import {
  Alert,
  Box,
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
  useTheme,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaFacebook,
  FaGlobeAsia,
} from "react-icons/fa";
import { MdDelete, MdHeadset } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainSongCard } from "../../songs/page";
import {
  deleteAlbum,
  getAlbum,
  getSong,
  getSongsForAlbum,
} from "@/app/services/SongServices";
import { site_url } from "@/app/constants/keys";
import { deleteAdmin } from "@/app/services/UserServices";
import LoadingButton from "@mui/lab/LoadingButton";

// Defining interface for props
interface Props {
  params: { id: string };
}

// Defining interface for album preview props
interface AlbumPreviewProps {
  albumData: Album;
}

// Album preview component
function AlbumPreview({ albumData }: AlbumPreviewProps) {
  const artist = useAppSelector((state) => state.artist.user?.user);

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
    navigator.clipboard.writeText(
      site_url + "main/albums/" + albumData?.album_id
    );
    setSnackbarOpen(true);
    setSnackbarMessage("Link Copied to Clipboard!");
    setSnackbarSeverity("success");
  };

  return (
    // Displaying album details
    <Paper
      elevation={3}
      sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
    >
      <SongPreviewSong>
        <CardMedia
          component="img"
          sx={{ width: "100%", borderRadius: 1 }}
          image={albumData?.album_img}
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
        ></Box>
      </SongPreviewSong>

      <SongPreviewDetails>
        <Typography component="div" sx={{ fontSize: 28, fontWeight: 600 }}>
          {albumData?.album_title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
          {albumData?.artist?.map((artist) => artist?.artist_name).join(",")}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          {albumData?.album_genre?.map((genre) => {
            return <Chip label={genre} color="primary" sx={{ fontSize: 12 }} />;
          })}
        </Stack>

        <Chip
          icon={
            albumData?.privacy === "private" ? <LockIcon /> : <FaGlobeAsia />
          }
          sx={{ marginBottom: "1em" }}
          label={albumData?.privacy === "private" ? "Private" : "Public"}
        />

        <Alert
          variant="filled"
          severity={
            albumData?.album_status === "Released"
              ? "success"
              : albumData?.album_status === "To Release"
              ? "warning"
              : albumData?.album_status === "Draft"
              ? "info"
              : "info"
          }
          sx={{ width: "200px" }}
        >
          {albumData?.album_status}
        </Alert>
      </SongPreviewDetails>

      {/* Share options */}
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
              width: "100%",
              justifyContent: "center",
              padding: "5px",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              {site_url + "main/albums/" + albumData?.album_id}
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

// Album details component
const AlbumDetails = ({ params: { id } }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);

  // State for album details and songs
  const [albumDetails, setAlbumDetails] = useState<Album>({});
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState("to-delete");

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    handleAlbumDelete();
    handleCloseDeleteModal();
  };

  const handleAlbumDelete = () => {
    setDeleting("deleting");
    deleteAlbum(artist?.token as string, albumDetails?.album_id as string).then(
      (res) => {
        setDeleting("deleted");
        router.push("/artist/albums");
      }
    );
  };

  useEffect(() => {
    // Fetching album details and songs
    if (id) {
      getAlbum(artist?.token as string, id).then((album) => {
        setAlbumDetails(album);
        getSongsForAlbum(id).then((songs) => {
          setAlbumSongs(songs);
        });
      });
    }
  }, []);

  return (
    // Displaying album details and songs
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
              href="/artist/albums"
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
              Albums <FaChevronRight style={{ fontSize: "12px" }} />{" "}
              {albumDetails?.album_title as string}
            </Typography>
          </Box>
          <ButtonGroup variant="outlined">
            <IconButton
              onClick={() => {
                router.push("/artist/albums/edit/" + albumDetails?.album_id);
              }}
              color="secondary"
            >
              <FaEdit />
            </IconButton>
            <IconButton onClick={handleDeleteModal} color="secondary">
              <MdDelete />
            </IconButton>
          </ButtonGroup>
        </Box>
        <AlbumPreview albumData={albumDetails} />
        <Paper elevation={2} sx={{ width: "100%", margin: 0 }}>
          {albumSongs &&
            albumSongs.map((song) => {
              return <MainSongCard songData={song} />;
            })}
        </Paper>
      </Card>
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ borderRadius: 20 }}
      >
        <DialogTitle id="alert-dialog-title" color="error">
          {"Delete Album"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleting === "deleting"
              ? "Deleting Album..."
              : deleting === "deleted"
              ? "Album Deleted Successfully!"
              : "Are you sure you want to delete this album?"}
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

export default AlbumDetails;
