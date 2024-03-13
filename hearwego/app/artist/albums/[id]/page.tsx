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
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
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
import { getAlbum, getSong } from "@/app/services/SongServices";

interface Props {
  params: { id: string };
}

interface AlbumPreviewProps {
  albumData: Album;
}

function AlbumPreview({ albumData }: AlbumPreviewProps) {
  const artist = useAppSelector((state) => state.artist.user?.user);

  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
    >
      <SongPreviewSong>
        <CardMedia
          component="img"
          sx={{ width: "100%", borderRadius: 1 }}
          image={albumData.album_img}
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
          {albumData.album_title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
          {albumData?.artist?.map((artist) => artist.artist_name).join(",")}
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
          {albumData.album_status}
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
          <Stack direction="row" spacing={1} sx={{ color: "#fff" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              https://www.hearwego.com/wq23s
            </Box>
            <IconButton>
              <ContentCopyIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
        </Box>
      </SongPreviewShare>
    </Paper>
  );
}

const AlbumDetails = ({ params: { id } }: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);

  const [albumDetails, setAlbumDetails] = useState<Album>({});
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (id) {
      getAlbum(artist?.token, id).then((album) => {
        console.log("Album:::", album[0]);
        setAlbumDetails(album[0]);
        album[0].song.forEach((song_id) => {
          getSong(artist?.token, song_id).then((song) => {
            setAlbumSongs((prev) => [...prev, song]);
          });
        });
      });
    }
  }, []);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh" }}>
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
                fontSize: "20px",
                fontWeight: "500",
                color: theme.palette.secondary.main,
              }}
            >
              Albums <FaChevronRight style={{ fontSize: "12px" }} />{" "}
              {albumDetails?.albumName}
            </Typography>
          </Box>
          <ButtonGroup variant="outlined">
            <IconButton color="secondary">
              <FaEdit />
            </IconButton>
            <IconButton color="secondary">
              <MdDelete />
            </IconButton>
          </ButtonGroup>
        </Box>
        <AlbumPreview albumData={albumDetails} />
        <Paper elevation={2} sx={{ width: "100%", margin: 1 }}>
          {albumSongs &&
            albumSongs.map((song) => {
              return <MainSongCard songData={song} />;
            })}
        </Paper>
      </Card>
    </Grid>
  );
};

export default AlbumDetails;
