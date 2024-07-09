"use client";

import { Box, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";

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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { setAlbum } from "@/lib/features/album.slice";
import { useRouter } from "next/navigation";

// Main functional component for adding album tracks
export default function AddAlbumTracks() {
  // Initialize necessary hooks and state variables
  const theme = useTheme();
  const router = useRouter();

  const matches = useMediaQuery("(max-width:960px)");

  const dispatch = useAppDispatch();

  const [imageFile, setImageFile] = React.useState(null);
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);

  const [songTracks, setSongTracks] = useState<Song[]>([]);

  const [imageErr, setImageErr] = useState(false);
  const [albumSongsErr, setAlbumSongsErr] = useState(false);

  const [uploading, setUploading] = useState(false);

  // Function to handle adding track to album
  const handleAddTrackToAlbum = () => {
    let errors = [false, false];

    // Check for errors in image file and album songs
    if (!imageFile) {
      setImageErr(true);
      errors[0] = true;
    }

    if (songTracks.length === 0) {
      setAlbumSongsErr(true);
      errors[1] = true;
    }

    // If there are errors, return without saving
    if (errors.includes(true)) {
      return;
    }

    // Dispatch action to set album and redirect to next step
    dispatch(
      setAlbum({
        song_tracks: songTracks,
        album_img: imageFile ? imageFile : "",
      })
    );
    router.push("/artist/albums/addAlbumData");
  };

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

            <Box sx={{ width: "100%", display: "flex", flexWrap: "wrap", flexDirection: matches?"column":"row", alignItems:matches?"center":"flex-start" }}>
              {/* Box for uploading album cover image */}
              <Box sx={{ width: "30%" }}>
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
                <Typography
                  variant="subtitle1"
                  color="error"
                  sx={{ width: "100%", textAlign: "center", padding: "1em" }}
                >
                  {imageErr ? "Please upload an image to continue!" : ""}
                </Typography>
              </Box>

              {/* Box for adding songs to the album */}
              <Box sx={{ width:matches?"90%": "70%" }}>
                <Typography
                  component="div"
                  sx={{ marginBottom: "1em", fontSize: 14 }}
                >
                  Add Song to the Album
                </Typography>

                <Box sx={{ width: "100%", display: "flex" }}>
                  <Box sx={{ width: "95%" }}>

                     {/* Component for selecting songs */}
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
                  
                   {/* Display selected album songs */}
                  {albumSongs.map((song, index) => (
                    <SongCard
                      key={index}
                      songData={song}
                      setAlbumSongs={setAlbumSongs}
                      setSongTracks={setSongTracks}
                    />
                  ))}
                  <Typography
                    variant="subtitle1"
                    color="error"
                    sx={{ width: "100%", textAlign: "center", padding: "1em" }}
                  >
                    {albumSongsErr ? "Please add songs to continue!" : ""}
                  </Typography>
                </Box>

                <Box sx={{ width: "100%", marginTop: "1em" }}>
                  <Button  variant="contained" startIcon={<AddCircleIcon />}>
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
                   
                    {/* Button to save album tracks */}
                    <LoadingButton
                      loading={uploading}
                      startIcon={<SaveIcon />}
                      variant="contained"
                      onClick={() => {
                        // Router.push("add2");
                        handleAddTrackToAlbum();
                      }}
                    >
                      Save
                    </LoadingButton>
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

// Interface for props of SongCard component
interface SongCardProps {
  songData: any;
  setAlbumSongs?: any;
  setSongTracks?: any;
}

// Component for displaying individual song card
function SongCard({ songData, setAlbumSongs, setSongTracks }: SongCardProps) {
  const [song, setSong] = useState<Song>();
  const token = useAppSelector((state) => state.artist.user?.token);

  useEffect(() => {
    getSong(token ? token : "", songData?.value ? songData.value : "").then(
      (song) => {
        setSongTracks((prev: any) => {
          if (prev) {
            if (prev.length > 0) {
              const newSongs = prev.filter(
                (s: any) => s.song_id !== song.song_id
              );
              return [...newSongs, song];
              5;
            }
            return [song];
          }
          return [song];
        });
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

// Component for handling play/pause button
function ClickPlay({ song_track }: { song_track: string }) {

  // Custom hook to manage audio playback
  const { playing, toggle } = useAudio({ url: song_track });

  return (
    <>
      {!playing ? (
        <IconButton sx={{ color: "primary.main" }}>
          <PlayCircleIcon
            sx={{ color: "primary.main", fontSize: 36 }}
           
            onClick={toggle}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "primary.main" }}>
          <PauseCircleIcon
            sx={{ color: "primary.main", fontSize: 36 }}
            
            onClick={toggle}
          />
        </IconButton>
       
      )}
    </>
  );
}

// Component for selecting songs
function SongSelectBox({ setAlbumSongs }: { setAlbumSongs: any }) {

  // Initialize state variables
  const [songs, setSongs] = useState<Song[]>([]);
  const artist = useAppSelector((state) => state.artist.user);

  // Fetch songs for the artist when component mounts
  useEffect(() => {
    if (artist?.user.artist_id && artist.token) {
      getSongsForArtist(artist.token, artist.user.artist_id).then((songs) => {
       
        // Map fetched songs to required format
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

        // Update selected songs
        setAlbumSongs((prev: any) => [...prev, newValue]);
      }}
      renderInput={(params) => (
        <TextField
          sx={{ width: "100%" }}
          variant="filled"
          {...params}
          label="Enter song title"
        />
      )}
    />
  );
}


