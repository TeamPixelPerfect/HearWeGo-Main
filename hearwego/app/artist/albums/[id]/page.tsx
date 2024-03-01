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
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainSongCard } from "../../songs/page";

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
          image={albumData.albumCoverArt}
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
          {albumData.albumName}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
          {albumData?.artists?.join(',')}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          {albumData?.genres?.map((genre) => {
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
            albumData?.albumStatus === "Released"
              ? "success"
              : albumData?.albumStatus === "To Release"
              ? "warning"
              : albumData?.albumStatus === "Draft"
              ? "info"
              : "info"
          }
          sx={{ width: "200px" }}
        >
          {albumData.albumStatus}
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

  const [albumDetails, setAlbumDetails] = useState<Album>({
    albumName: "L.P.",
    artists: ["The Rembrandts"],
    albumCoverArt:
      "https://i.discogs.com/UvK4JbCFNk0ewmfYkSUjscACrZgJyMdSLRwJrI6al2o/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0Njk4/MTMwLTE1Nzk5MTA2/ODgtMjg5OC5qcGVn.jpeg",
    albumLength: 67.15,
    albumTracks: 15,
    impressions: "12.7M",
    listners: "7.0M",
    genres: ["pop", "rock", "classic"],
    privacy: "public",
    releaseDate: "2024-03-01",
    albumStatus: "To Release",
  });
  const [albumSongs, setAlbumSongs] = useState<Song[]>([
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
