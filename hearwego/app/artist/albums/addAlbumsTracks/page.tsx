"use client";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CloseIcon from "@mui/icons-material/Close";
import { GiSoundWaves } from "react-icons/gi";
import React, { useState } from "react";

import DropFile from "../../../components/DropFile";

export default function AddAlbumTracks() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", marginBottom: "1em" }}>
        <Card variant="outlined">{AddAlbumTrackCard}</Card>
      </Box>
    </Box>
  );
}

function DropAlbumImage() {
  const [imageFile, setImageFile] = React.useState(null);
  return (
    <DropFile
      fileTypes="Album Cover Image"
      fileExtensions="JPEG,PNG,WEBP,SVG"
      isCircular={false}
      width="250px"
      height={"250px"}
      file={imageFile}
      setFile={setImageFile}
      aspectX={1}
      aspectY={1}
      shape="rect"
    />
  );
}

const AddAlbumTrackCard = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
        Add New Album
      </Typography>

      <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ width: "30%", display: "flex", justifyContent: "center" }}>
          <DropAlbumImage />
        </Box>

        <Box sx={{ width: "70%" }}>
          <Typography
            component="div"
            sx={{ marginBottom: "1em", fontSize: 14 }}
          >
            Add Song to the Album
          </Typography>

          <Box sx={{ width: "100%", display: "flex" }}>
            <Box sx={{ width: "95%" }}>
              <SongSelectBox />
            </Box>
            <Box sx={{ width: "5%", display: "flex", justifyContent: "end" }}>
              <IconButton
                aria-label="delete"
                size="large"
                sx={{ color: "primary.main" }}
              >
                <AddCircleIcon
                  sx={{ color: "primary.main" }}
                  fontSize="inherit"
                />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ width: "100%", marginTop: "1em" }}>
            <SongCard />
            <SongCard />
            <SongCard />
          </Box>

          <Box sx={{ width: "100%", marginTop: "1em" }}>
            <Button variant="contained" startIcon={<AddCircleIcon />}>
              Add New Song
            </Button>
          </Box>

          <Box
            sx={{
              width: "100%",
              marginTop: "1em",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Button variant="outlined">
                Reset
              </Button>
              <Button variant="contained">
                Save
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </React.Fragment>
);

function SongCard() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "1em",
        marginBottom: "0.5em",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          alt="SongCover"
          src="https://i.pinimg.com/originals/48/0a/db/480adb1a2b9491734ad23fd6a68f3d33.jpg"
        />

        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 16 }}>
          I’ll be There For You
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={3}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ fontSize: 36, display: "flex", alignItems: "center" }}>
            <GiSoundWaves />
          </Box>

          <Typography
            component="div"
            sx={{ marginBottom: "1em", fontSize: 14 }}
          >
            3.08
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ClickPlay />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ color: "text.primary" }}>
              <CloseIcon sx={{ color: "text.secondary", fontSize: 24 }} />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Paper>
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
        <IconButton sx={{ color: "primary.main" }}>
          <PlayCircleIcon
            sx={{ color: "primary.main", fontSize: 36 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={togglePlay}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "primary.main" }}>
          <PauseCircleIcon
            sx={{ color: "primary.main", fontSize: 36 }}
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

function SongSelectBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={songSet}
      sx={{ width: "90%" }}
      renderInput={(params) => (
        <TextField
          sx={{ width: "100%" }}
          variant="filled"
          {...params}
          label="Enter Song Title"
        />
      )}
    />
  );
}

const songSet = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
];
