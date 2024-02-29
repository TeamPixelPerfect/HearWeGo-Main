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
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Grid from "@mui/material/Unstable_Grid2";
import { MdHeadset } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { FaSpotify } from "react-icons/fa";
import React, { useState } from "react";

import {
  SongPreviewSong,
  SongPreviewDetails,
  SongPreviewShare,
} from "../../../styles/artistAddSongs.styles";

export default function AddSongPreview() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", marginBottom: "1em" }}>
        <Card variant="outlined">{NewSongPreviewCard}</Card>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Card variant="outlined">{NewSongPlatformLinkCard}</Card>
      </Box>
    </Box>
  );
}

function PlatformLinkClips() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  return (
    <>
      <Stack
        sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}
        direction="row"
        spacing={1}
      >
        <Box
          sx={{
            width: 32,
            fontSize: 32,
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaSpotify />
        </Box>

        <Chip
          label="https://open.spotify.com/playlist/37i9dQZF1DWWY64wDtewQt?si=8e46f716cca54567"
          variant="outlined"
          onClick={handleClick}
          onDelete={handleDelete}
        />
      </Stack>

      <Stack
        sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}
        direction="row"
        spacing={1}
      >
        <Box
          sx={{
            width: 32,
            fontSize: 32,
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaSpotify />
        </Box>

        <Chip
          label="https://open.spotify.com/playlist/37i9dQZF1DWWY64wDtewQt?si=8e46f716cca54567"
          variant="outlined"
          onClick={handleClick}
          onDelete={handleDelete}
        />
      </Stack>
    </>
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

      <Typography
        sx={{ fontSize: 14, marginTop: "1em" }}
        color="text.secondary"
        gutterBottom
      >
        By uploading, you confirm that your sounds comply with our Terms of Use
        and you don't infringe anyone else's rights.
      </Typography>
    </CardContent>
  </React.Fragment>
);

const NewSongPlatformLinkCard = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
        Streaming Platform Links
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3} sx={{}}>
            <SelectPlatform />
          </Grid>
          <Grid xs={7}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
              style={{ boxSizing: "initial" }}
            >
              <TextField
                id="filled-basic"
                label="Platform Link"
                variant="filled"
              />
            </Box>
          </Grid>

          <Grid xs={2}>
            <IconButton aria-label="delete" size="large">
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <PlatformLinkClips />
    </CardContent>
  </React.Fragment>
);

function SelectPlatform() {
  const [platform, setPlatform] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ minWidth: "100%" }}>
        <InputLabel id="demo-simple-select-filled-label">Platform</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={platform}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>
            {" "}
            <FaSpotify /> Spotify
          </MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function ClickPlay() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <>
      {isPlaying ? (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PlayCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={togglePlay}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PauseCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={togglePlay}
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
          <ClickPlay />

          {/* <PlayCircleIcon sx={{ width: "30%", height: "auto" }} /> */}
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
            Share your new Track
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
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Stack direction="row" spacing={1} sx={{color: '#fff'}}>
            <Box sx={{display: 'flex', alignItems:'center'}}>https://www.hearwego.com/wq23s</Box>
            <IconButton>
              <ContentCopyIcon sx={{color: '#fff'}}/>
            </IconButton>
          </Stack>
        </Box>
      </SongPreviewShare>
    </Paper>
  );
}
