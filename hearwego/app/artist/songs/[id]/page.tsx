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
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
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

interface Props {
  params: { id: string };
}

interface ClickPlayProps {
  songUrl: string;
}

interface SongPreviewProps {
  songData: Song;
}

function ClickPlay({ songUrl }: ClickPlayProps) {
  const { toggle, playing } = useAudio({ url: songUrl });

  return (
    <>
      {!playing ? (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PlayCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={toggle}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PauseCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={toggle}
          />
        </IconButton>
        // <PauseCircleIcon
        //   sx={{ width: "30%", height: "auto" }}
        //   onClick={togglePlay}
        // />
      )}
    </>
  );
}

function SongPreview({ songData }: SongPreviewProps) {
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
          image={songData.coverArt}
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
          <ClickPlay songUrl={songData.songUrl} />

          {/* <PlayCircleIcon sx={{ width: "30%", height: "auto" }} /> */}
        </Box>
      </SongPreviewSong>

      <SongPreviewDetails>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          ISRC: {songData?.isrc && songData?.isrc}
        </Typography>
        <Typography component="div" sx={{ fontSize: 28, fontWeight: 600 }}>
          {songData.songName}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
          {songData?.artists?.join(',')} - {songData.albumName}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          {songData?.genres?.map((genre) => {
            return <Chip label={genre} color="primary" sx={{ fontSize: 12 }} />;
          })}
        </Stack>

        <Chip
          icon={
            songData?.privacy === "private" ? <LockIcon /> : <FaGlobeAsia />
          }
          sx={{ marginBottom: "1em" }}
          label={songData?.privacy === "private" ? "Private" : "Public"}
        />

        <Alert
          variant="filled"
          severity={
            songData?.songStatus === "Released"
              ? "success"
              : songData?.songStatus === "To Release"
              ? "warning"
              : songData?.songStatus === "Draft"
              ? "info"
              : "info"
          }
          sx={{ width: "200px" }}
        >
          {songData.songStatus}
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

const SongDetails = ({ params: { id } }: Props) => {
  const theme = useTheme();

  const [songDetails, setSongDetails] = useState<Song>({
    songName: "I'll be there for you",
    artists: ["The Rembrandts"],
    albumName: "L.P.",
    duration: 3.08,
    songUrl:
      "https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3",
    coverArt:
      "https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg",
    impressions: "10.5M",
    listeners: "3.4M",
    genres: ["pop", "rock"],
    isrc: "USEE10001295",
    releaseData: "2024-03-01",
    songStatus: "Released",
    privacy: "private",
    langauge: "English",
    label: "Elektra",
    songWriters: ["David Crane", "Marta Kauffman", "Allee Willis"],
    producers: ["Gavin Mackillop", "David Crane"],
    lyrics: `
    So no one told you life was gonna be this way
    Your job's a joke, you're broke
    Your love life's DOA
    It's like you're always stuck in second gear
    When it hasn't been your day, your week, your month
    Or even your year, but

    I'll be there for you
    (When the rain starts to pour)
    I'll be there for you
    (Like I've been there before)
    I'll be there for you
    ('Cause you're there for me too)`,
  });

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
          <Box sx={{display:"flex", alignItems:"center"}}>
            <Link href="/artist/songs" color="secondary" style={{marginRight: "1em"}}>
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
              Songs <FaChevronRight style={{ fontSize: "12px" }} />{" "}
              {songDetails.songName}
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
        <SongPreview songData={songDetails} />
        <SongDetailTable container>
          <SongDetailTitle item xs={3} md={2}>
            Release Date
          </SongDetailTitle>
          <SongDetailData item xs={9} md={10}>
            {songDetails?.releaseData}
          </SongDetailData>

          <SongDetailTitleEven item xs={3} md={2}>
            Language
          </SongDetailTitleEven>
          <SongDetailDataEven item xs={9} md={10}>
            {songDetails?.langauge}
          </SongDetailDataEven>

          <SongDetailTitle item xs={3} md={2}>
            Length
          </SongDetailTitle>
          <SongDetailData item xs={9} md={10}>
            {songDetails?.duration}
          </SongDetailData>

          <SongDetailTitleEven item xs={3} md={2}>
            Label
          </SongDetailTitleEven>
          <SongDetailDataEven item xs={9} md={10}>
            {songDetails?.label}
          </SongDetailDataEven>

          <SongDetailTitle item xs={3} md={2}>
            Songwriter(s)
          </SongDetailTitle>
          <SongDetailData item xs={9} md={10}>
            {songDetails?.songWriters?.map((writer) => {
              return <Box>{writer}</Box>;
            })}
          </SongDetailData>

          <SongDetailTitleEven item xs={3} md={2}>
            Producer(s)
          </SongDetailTitleEven>
          <SongDetailDataEven item xs={9} md={10}>
            {songDetails?.producers?.map((producer) => {
              return <Box>{producer}</Box>;
            })}
          </SongDetailDataEven>

          <SongDetailTitle item xs={3} md={2}>
            Lyrics
          </SongDetailTitle>
          <SongDetailData item xs={9} md={10}>
            <Box sx={{ whiteSpace: "pre-wrap" }}>{songDetails?.lyrics}</Box>
          </SongDetailData>
        </SongDetailTable>
      </Card>
    </Grid>
  );
};

export default SongDetails;
