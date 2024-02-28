"use client";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { MdHeadset } from "react-icons/md";
import React from "react";

import {
  SongPreviewSong,
  SongPreviewDetails,
  SongPreviewShare,
} from "../../../styles/artistAddSongs.styles";

export default function AddSongPreview() {
  return (
    <Box sx={{ width: "100%", height: "75vh" }}>
      <Box sx={{ width: "100%" }}>
        <Card variant="outlined">{NewSongPreviewCard}</Card>
      </Box>
    </Box>
  );
}

const NewSongPreviewCard = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
        Add New Song
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Preview
      </Typography>

      <SongPreview />
    </CardContent>
  </React.Fragment>
);

function SongPreview() {
  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
    >
      <SongPreviewSong>
        <CardMedia
          component="img"
          sx={{ width: "100%", borderRadius: 1 }}
          image="https://i.pinimg.com/originals/48/0a/db/480adb1a2b9491734ad23fd6a68f3d33.jpg"
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
          <PlayCircleIcon sx={{ width: "30%", height: "auto" }} />
        </Box>
      </SongPreviewSong>

      <SongPreviewDetails>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          ISRC: USEE10001295
        </Typography>
        <Typography component="div" sx={{ fontSize: 28, fontWeight: 600 }}>
          I'll be there for you
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
          The Rembrandts - L.P.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          <Chip label="Pop" color="primary" sx={{ fontSize: 12 }} />
          <Chip label="Rock" color="primary" />
          <Chip label="Classical" color="primary" />
        </Stack>

        <Chip
          icon={<LockIcon />}
          sx={{ marginBottom: "1em" }}
          label="Private"
        />

        <Alert variant="filled" severity="success" sx={{ width: "200px" }}>
          Upload Complete !
        </Alert>
      </SongPreviewDetails>

      <SongPreviewShare>
        <Box sx={{ width: "100%", display: 'flex', flexDirection:'column', alignItems: 'center', paddingTop:'1em'}}>
          <Typography variant="h6" component="div" sx={{ fontSize: 18, marginBottom:'1em' }}>
            Share your new Track
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginBottom: "1em", fontSize: 32 }}
          >
            <FaFacebook />
            <AiFillInstagram />
            <FaXTwitter />
            <MdHeadset />
          </Stack>
        </Box>
        <Box sx={{ width: "100%", backgroundColor: "primary.main" , padding: '5px', borderTopLeftRadius: '20px'}}>
          <Stack direction="row" spacing={1}>
            <Box>https://www.hearwego.com/wq23s</Box>
            <ContentCopyIcon />
          </Stack>
        </Box>
      </SongPreviewShare>
    </Paper>
  );
}
