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
import React, { useEffect, useState } from "react";

import DropFile from "../../../components/DropFile";
import { useTheme } from "@emotion/react";
import { Song } from "@/app/constants/models";
import useAudio from "@/app/Hooks/useAudio";
import { getSong, getSongsForArtist } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";

export default function AddAlbumTracks() {
  const theme = useTheme();

  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", marginBottom: "1em" }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h4"
              color="secondary"
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                padding: "1em",
              }}
            >
              Add New Album
            </Typography>

            <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
              <Box
                sx={{ width: "30%", display: "flex", justifyContent: "center" }}
              >
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
                    <SongSelectBox setAlbumSongs={setAlbumSongs} />
                  </Box>
                  <Box
                    sx={{ width: "5%", display: "flex", justifyContent: "end" }}
                  >
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
                  {albumSongs.map((song, index) => (
                    <SongCard
                      key={index}
                      songData={song}
                      setAlbumSongs={setAlbumSongs}
                    />
                  ))}
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
                    <Button variant="outlined">Reset</Button>
                    <Button variant="contained">Save</Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
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

interface SongCardProps {
  songData: any;
  setAlbumSongs?: any;
}

function SongCard({ songData, setAlbumSongs }: SongCardProps) {
  const [song, setSong] = useState<Song>();
  const token = useAppSelector((state) => state.artist.user?.token);

  useEffect(() => {
    getSong(token ? token : "", songData?.value ? songData.value : "").then(
      (song) => {
        console.log("Song:::", song);
        setSong(song);
      }
    );
  }, []);

  const handleDelete = () => {
    console.log("Delete Song:::", song?.song_id, song?.song_title);
    setAlbumSongs((prev: any) => {
      const newSongs = prev.filter((s: any) => s.value !== song?.song_id);
      console.log(newSongs);
      return newSongs;
    });
  };

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
        <Avatar alt="SongCover" src={song && song.song_img} />

        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 16 }}>
          {song && song.song_title}
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
            {song && song.song_length}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ClickPlay song_track={song ? song.song_track : ""} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ color: "text.primary" }} onClick={handleDelete}>
              <CloseIcon sx={{ color: "text.secondary", fontSize: 24 }} />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}

function ClickPlay({ song_track }: { song_track: string }) {
  const { playing, toggle } = useAudio({ url: song_track });

  return (
    <>
      {!playing ? (
        <IconButton sx={{ color: "primary.main" }}>
          <PlayCircleIcon
            sx={{ color: "primary.main", fontSize: 36 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={toggle}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "primary.main" }}>
          <PauseCircleIcon
            sx={{ color: "primary.main", fontSize: 36 }}
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

function SongSelectBox({ setAlbumSongs }: { setAlbumSongs: any }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const artist = useAppSelector((state) => state.artist.user);

  useEffect(() => {
    if (artist?.user.artist_id && artist.token) {
      getSongsForArtist(artist.token, artist.user.artist_id).then((songs) => {
        const data = songs.data.map((song: any) => ({
          label: song.song_title,
          value: song.song_id,
        }));
        setSongs(data);
      });
    }
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={songs}
      sx={{ width: "90%" }}
      onChange={(event, newValue) => {
        setAlbumSongs((prev: any) => [...prev, newValue]);
      }}
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
  { label: "I'll be there for you", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
];
