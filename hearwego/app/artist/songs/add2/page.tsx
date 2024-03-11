"use client";
import { relative } from "path";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import { DateField } from "@mui/x-date-pickers/DateField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Autocomplete, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DropFile from "@/app/components/DropFile";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Song } from "@/app/constants/models";
import { createFilterOptions } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import { addSong } from "@/app/services/SongServices";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const genres = [
  "Pop",
  "Rock",
  "Classical",
  "Reggae",
  "Country",
  "Electronic",
  "Hip Hop",
  "Jazz",
  "R&B (Rhythm and Blues)",
  "Metal",
];

const electronicSubgenres = [
  "Ambient",
  "Techno",
  "House",
  "Trance",
  "Drum and Bass (DnB)",
  "Dubstep",
  "Electro",
  "Breakbeat",
  "Acid House",
  "Hardcore",
  "Industrial",
  "Synthwave",
  "Chillwave",
  "IDM (Intelligent Dance Music)",
  "Future Bass",
  "Trap",
  "Progressive House",
  "Deep House",
  "Minimal Techno",
  "Garage",
  "Grime",
  "Jungle",
  "Psytrance",
  "Hardstyle",
  "UK Garage",
  "Vaporwave",
  "Glitch",
  "Ambient House",
  "Acid Techno",
  "Big Beat",
];

const Language = [
  "Sinhala",
  "English",
  "Tamil",
  "German",
  "Korean",
  "Italian",
  "Hindi",
];

const AddSongData = () => {
  const songTrack = useAppSelector((state) => state.song.song_track);
  const artist = useAppSelector((state) => state.artist.user);
  const Router = useRouter();

  if(songTrack === ""){
    Router.push("add");
  }

  const theme = useTheme();

  const [songData, setSongData] = useState<Song>({
    song_title: "",
    song_genre: [],
    additional_tags: [],
    description: "",
    contain_music: "yes",
    isrc: "",
    artist: [{ artist_id: "", artist_name: "" }],
    composer: [],
    song_writers: [],
    release_date: "",
    album_title: "",
    language: [],
    record_label: "",
    primary_genre: [],
    electronic_sub_genre: [],
    lyrics: "",
    song_img: "",
    song_track: songTrack,
    privacy_status: "Public",
  });
  const [songFile, setSongFile] = useState("");
  const [value, setValue] = React.useState(0);

  const [titleError, setTitleError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const [artistsError, setArtistsError] = useState(false);
  const [composerError, setComposerError] = useState(false);
  const [songWriterError, setSongWriterError] = useState(false);
  const [releaseDateError, setReleaseDateError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState(false);

  const [checks, setChecks] = useState([false, false, false]);

  const [uploading, setUploading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSongAddData = () => {
    setTitleError(false);
    setGenreError(false);
    setCoverError(false);
    setArtistsError(false);
    setComposerError(false);
    setSongWriterError(false);
    setReleaseDateError(false);
    setLanguageError(false);
    setCheckBoxError(false);

    let errors = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    if (songData.song_title === "") {
      setTitleError(true);
      errors[0] = true;
    }
    if (
      songData.song_genre &&
      songData.song_genre.length === 1 &&
      songData.song_genre[0] === ""
    ) {
      setGenreError(true);
      errors[1] = true;
    }
    if (songData.song_genre && songData.song_genre?.length === 0) {
      setGenreError(true);
      errors[1] = true;
    }
    if (songFile === "") {
      setCoverError(true);
      errors[2] = true;
    } else {
      setSongData((data) => {
        return { ...data, song_img: songFile };
      });
    }

    if (errors.includes(true)) {
      setValue(0);
      return;
    }

    setTitleError(false);
    setGenreError(false);
    setCoverError(false);

    if (
      songData.artist &&
      songData.artist.length === 1 &&
      songData.artist[0].artist_name === ""
    ) {
      setArtistsError(true);
      setValue(1);
      return;
    }
    if (songData.composer && songData.composer.length === 0) {
      setComposerError(true);
      setValue(1);
      return;
    }
    if (songData.song_writers && songData.song_writers.length === 0) {
      setSongWriterError(true);
      setValue(1);
      return;
    }
    if (songData.release_date === "") {
      setReleaseDateError(true);
      setValue(1);
      return;
    }
    if (songData.language && songData.language?.length === 0) {
      setLanguageError(true);
      setValue(1);
      return;
    }

    if (checks && checks.includes(false)) {
      setCheckBoxError(true);
      return;
    }

    setArtistsError(false);
    setComposerError(false);
    setSongWriterError(false);
    setReleaseDateError(false);
    setLanguageError(false);

    setUploading(true);
    addSong(artist? artist.token : "", songData).then((res) => {
      console.log("Response:::", res);
      setUploading(false);
      Router.push("/artist/songs/addSongPreview");
    });
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <div>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: theme.palette.secondary.main,
                  padding: "1em",
                }}
              >
                Add New Song
              </Typography>

              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Basic Info" {...a11yProps(0)} />
                  <Tab label="Metadata" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <div>
                <CustomTabPanel value={value} index={0}>
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box>
                      {" "}
                      <DropFile
                        fileTypes="Image"
                        fileExtensions="JPG,PNG,JPEG"
                        isCircular={false}
                        width="300px"
                        height="300px"
                        file={songFile}
                        setFile={setSongFile}
                        aspectX={1}
                        aspectY={1}
                        shape="rect"
                      />
                      <Typography
                        sx={{ fontSize: "14px", padding: "1em" }}
                        variant="subtitle1"
                        color="error"
                      >
                        {coverError && "Cover Image is required!"}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "50%", marginLeft: "100px" }}>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            mb: 2,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <TextField
                          id="song-title"
                          label="Song Title"
                          variant="filled"
                          onChange={(e) => {
                            setSongData((data) => {
                              return { ...data, song_title: e.target.value };
                            });
                          }}
                          color={titleError ? "error" : "primary"}
                          helperText={
                            titleError ? "Song Title is required*" : ""
                          }
                          FormHelperTextProps={{ style: { color: "red" } }}
                        />
                      </Box>

                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            mb: 2,
                            width: "58ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <Autocomplete
                          multiple
                          disablePortal
                          id="genre"
                          options={genres}
                          style={{ boxSizing: "initial", maxWidth: "82%" }}
                          onChange={(e, value) => {
                            setSongData((data) => {
                              return { ...data, song_genre: value };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="filled"
                              {...params}
                              label="Genre(s)"
                              color={genreError ? "error" : "primary"}
                              helperText={
                                genreError ? "Song Genre is required*" : ""
                              }
                              FormHelperTextProps={{ style: { color: "red" } }}
                            />
                          )}
                        />
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            mb: 2,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <Autocomplete
                          multiple
                          disablePortal
                          id="additional-tags"
                          options={[]}
                          filterOptions={handleTagFilter}
                          style={{ boxSizing: "initial", maxWidth: "82%" }}
                          onChange={(e, value) => {
                            setSongData((data) => {
                              return { ...data, additional_tags: value };
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="filled"
                              {...params}
                              label="Additional Tags"
                            />
                          )}
                        />
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            mb: 2,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <TextField
                          id="song-description"
                          label="Description"
                          multiline
                          rows={4}
                          defaultValue="Description of your track"
                          variant="filled"
                          onChange={(e) => {
                            setSongData((data) => {
                              return { ...data, description: e.target.value };
                            });
                          }}
                        />
                      </Box>
                      <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                        <FormControl>
                          <FormLabel id="privacy-label">Privacy</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Public"
                            name="radio-buttons-group"
                            onChange={(e, value) => {
                              setSongData((data) => {
                                return { ...data, privacy_status: value };
                              });
                            }}
                          >
                            <FormControlLabel
                              value="Public"
                              control={<Radio />}
                              label="Public"
                            />
                            <FormControlLabel
                              value="Private"
                              control={<Radio />}
                              label="Private"
                            />
                            <FormControlLabel
                              value="Scheduled"
                              control={<Radio />}
                              label="Scheduled"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </Box>
                  </Box>
                </CustomTabPanel>
              </div>

              <CustomTabPanel value={value} index={1}>
                <SongMetaData
                  songData={songData}
                  setSongData={setSongData}
                  artistsError={artistsError}
                  composerError={composerError}
                  songWriterError={songWriterError}
                  releaseDateError={releaseDateError}
                  languageError={languageError}
                  checkBoxError={checkBoxError}
                  checks={checks}
                  setChecks={setChecks}
                />
              </CustomTabPanel>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      Router.push("add");
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={uploading}
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => {
                      // Router.push("add2");
                      handleSongAddData();
                    }}
                  >
                    Add
                  </LoadingButton>
                </Stack>
              </div>
            </div>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

interface songMetaDataProps {
  songData: Song;
  setSongData: React.Dispatch<React.SetStateAction<Song>>;
  artistsError: boolean;
  composerError: boolean;
  songWriterError: boolean;
  releaseDateError: boolean;
  languageError: boolean;
  checkBoxError: boolean;
  checks: boolean[];
  setChecks: React.Dispatch<React.SetStateAction<boolean[]>>;
}

function SongMetaData({
  songData,
  setSongData,
  artistsError,
  composerError,
  songWriterError,
  releaseDateError,
  languageError,
  checkBoxError,
  checks,
  setChecks,
}: songMetaDataProps) {
  const handleContainMusic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSongData((data) => {
        return { ...data, contain_music: "yes" };
      });
    } else {
      setSongData((data) => {
        return { ...data, contain_music: "no" };
      });
    }
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          padding: "2em",
          marginBottom: "1em",
        }}
        elevation={3}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          // sx={{ marginLeft: "1em" }}
        >
          <Grid xs={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onChange={(e) => {
                      handleContainMusic(e);
                    }}
                  />
                }
                label="Contain Music"
              />
            </FormGroup>
          </Grid>
          <Grid xs={6}>
            <TextField
              label="ISRC"
              id="filled-start-adornment"
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <HelpOutlineIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSongData((data) => {
                  return { ...data, isrc: e.target.value };
                });
              }}
              variant="filled"
            />
          </Grid>
          <Grid xs={6}></Grid>
          <Grid xs={6}></Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          padding: "2em",
          marginBottom: "1em",
        }}
        elevation={3}
      >
        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 18 }}>
          Artist, Composer and Songwriter Details
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 0 }}
        >
          <Grid xs={6}>
            <ArtistTags
              songData={songData}
              setSongData={setSongData}
              error={artistsError}
            />
          </Grid>
          <Grid xs={6}>
            <ComposerTags
              songData={songData}
              setSongData={setSongData}
              error={composerError}
            />
          </Grid>
          <Grid xs={6}>
            <SongWriterTags
              songData={songData}
              setSongData={setSongData}
              error={songWriterError}
            />
          </Grid>
          <Grid xs={6}></Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          padding: "2em",
          marginBottom: "1em",
        }}
        elevation={3}
      >
        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 18 }}>
          Release Date
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 0 }}
        >
          <Grid xs={6}>
            <ReleaseDate
              songData={songData}
              setSongData={setSongData}
              error={releaseDateError}
            />
          </Grid>
          <Grid xs={6}></Grid>
          <Grid xs={6}></Grid>
        </Grid>

        <Typography component="div" sx={{ fontSize: 14, marginTop: "1em" }}>
          Setting your release date to at least 1-week in the future increases
          your chances of getting added to playlists.
        </Typography>
        <Typography component="div" sx={{ fontSize: 14 }}>
          If it's important that your album goes live in all stores on the same
          day, click here for info.
        </Typography>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          padding: "2em",
          marginBottom: "1em",
        }}
        elevation={3}
      >
        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 18 }}>
          Album, Language and Record Label
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 0 }}
        >
          <Grid xs={6}>
            <TextField
              id="filled-basic"
              label="Album Title (Optional)"
              variant="filled"
              sx={{ width: "90%" }}
            />
          </Grid>
          <Grid xs={6}>
            <LanguageSelect
              songData={songData}
              setSongData={setSongData}
              error={languageError}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              id="filled-basic"
              label="Record Label (Optional)"
              variant="filled"
              sx={{ width: "90%" }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          padding: "2em",
          marginBottom: "1em",
        }}
        elevation={3}
      >
        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 18 }}>
          Genre Details
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 0 }}
        >
          <Grid xs={6}>
            <GenreSelect songData={songData} setSongData={setSongData} />
          </Grid>
          <Grid xs={6}>
            <ElectrinocGenreSelect
              songData={songData}
              setSongData={setSongData}
            />
          </Grid>
          {/* <Grid xs={6}>
            <OtherGenreSelect songData={songData} setSongData={setSongData} />
          </Grid> */}
        </Grid>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          padding: "2em",
          marginBottom: "1em",
        }}
        elevation={3}
      >
        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 18 }}>
          Lyrics
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 0 }}
        >
          <Grid xs={12}>
            <TextField
              id="filled-multiline-flexible"
              label="Type your lyrics here"
              multiline
              rows={10}
              // maxRows={20}
              variant="filled"
              sx={{ width: "95%" }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          padding: "2em",
          marginBottom: "1em",
        }}
        elevation={3}
      >
        <Typography component="div" sx={{ marginBottom: "1em", fontSize: 18 }}>
          Important checkboxes (mandatory)
        </Typography>

        <FormGroup>
          <FormControlLabel
            required
            control={
              <Checkbox
                onChange={(e) => {
                  setChecks((data) => {
                    data[0] = e.target.checked;
                    return data;
                  });
                }}
              />
            }
            label="I recorded this music, and am authorized to sell it in stores worldwide & collect all royalties."
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                onChange={(e) => {
                  setChecks((data) => {
                    data[1] = e.target.checked;
                    return data;
                  });
                }}
              />
            }
            label="I'm not using any other artist's name in my name, song titles, or album title, without their approval."
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                onChange={(e) => {
                  setChecks((data) => {
                    data[2] = e.target.checked;
                    return data;
                  });
                }}
              />
            }
            label="I have read and agree to the terms of the HearWeGo Distribution Agreement"
          />
          <Typography variant="subtitle1" color="error">
            {checkBoxError && "Please check all the checkboxes to continue!"}
          </Typography>
        </FormGroup>
      </Paper>
    </>
  );
}

interface InputProps {
  songData: Song;
  setSongData: React.Dispatch<React.SetStateAction<Song>>;
  error?: boolean;
}

function GenreSelect({ songData, setSongData, error }: InputProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setSongData((data) => {
      return { ...data, primary_genre: [event.target.value as string] };
    });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "90%" }}>
        <InputLabel id="demo-simple-select-label">Primary Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={songData.primary_genre && songData.primary_genre[0]}
          label="Primary Genre"
          onChange={handleChange}
          variant="filled"
          color={error ? "error" : "primary"}
        >
          {genres.map((genre) => {
            return <MenuItem value={genre}>{genre}</MenuItem>;
          })}
        </Select>
        <Box color="error">{error && "Primary genre is required!"}</Box>
      </FormControl>
    </Box>
  );
}

function ElectrinocGenreSelect({ songData, setSongData }: InputProps) {
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSongData((data) => {
      return { ...data, electronic_sub_genre: event.target.value };
    });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "90%" }}>
        <InputLabel id="demo-simple-select-label">
          Electronic Sub Genre
        </InputLabel>
        <Select
          multiple
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={songData.electronic_sub_genre}
          label="Primary Genre"
          onChange={handleChange}
          variant="filled"
        >
          {electronicSubgenres.map((genre) => {
            return <MenuItem value={genre}>{genre}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

function OtherGenreSelect({ songData, setSongData }: InputProps) {
  const [genre, setGenre] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "90%" }}>
        <InputLabel id="demo-simple-select-label">
          Other Genres (Optional)
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          label="Primary Genre"
          onChange={handleChange}
          variant="filled"
        >
          <MenuItem value={10}>Genre 01</MenuItem>
          <MenuItem value={20}>Genre 02</MenuItem>
          <MenuItem value={30}>Genre 03</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function LanguageSelect({ songData, setSongData, error }: InputProps) {
  return (
    <>
      <Autocomplete
        multiple
        id="languageTag"
        options={Language.map((option) => option)}
        // defaultValue={[top100Films[12].title, top100Films[13].title]}
        // readOnly
        onChange={(e, value) => {
          setSongData((data) => {
            return { ...data, language: value };
          });
        }}
        color={error ? "error" : "primary"}
        renderInput={(params) => (
          <TextField
            variant="filled"
            {...params}
            sx={{ width: "100%", margin: 0 }}
            label="Language(s)"
          />
        )}
        sx={{ width: "80%", margin: 0 }}
      />
      <Typography variant="subtitle1" color="error">
        {error && "Language is required!"}
      </Typography>
    </>
  );
}

function ReleaseDate({ songData, setSongData, error }: InputProps) {
  const handleChange = (value: Dayjs | null) => {
    const date = value?.format("YYYY-MM-DD").toString();
    setSongData((data) => {
      return { ...data, release_date: date };
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField"]}>
        <DateField
          label="Release Date"
          defaultValue={dayjs("2022-04-17")}
          format="LL"
          variant="filled"
          sx={{ width: "90%" }}
          onChange={handleChange}
          color={error ? "error" : "primary"}
          helperText={error ? "Release Date is required*" : ""}
          FormHelperTextProps={{ style: { color: "red" } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function ArtistTags({ songData, setSongData, error }: InputProps) {
  const [artists, setArtists] = useState([
    { label: "Michael Jackson", _id: "ar1" },
    { label: "Guns N' Roses", _id: "ar2" },
    { label: "Backstreet Boys", _id: "ar3" },
    { label: "Shawn Mendes", _id: "ar4" },
  ]);

  const handleChange = (
    event: React.SyntheticEvent<Element>,
    value: { label: string; _id: string }[]
  ) => {
    const artists = value.map((artist) => ({
      artist_name: artist.label,
      artist_id: artist._id,
    }));
    setSongData((data) => {
      return { ...data, artist: artists };
    });
  };

  return (
    <>
      <Autocomplete
        multiple
        id="artistTag"
        options={artists}
        filterOptions={handleFilter}
        // defaultValue={[top100Films[12].title, top100Films[13].title]}
        // readOnly
        onChange={handleChange}
        color={error ? "error" : "primary"}
        renderInput={(params) => (
          <TextField
            variant="filled"
            {...params}
            sx={{ width: "100%", margin: 0 }}
            label="Artist(s)"
          />
        )}
        sx={{ width: "80%", margin: 0 }}
      />
      <Typography variant="subtitle1" color="error">
        {error && "At least one artist is required!"}
      </Typography>
    </>
  );
}

function ComposerTags({ songData, setSongData, error }: InputProps) {
  const [composers, setComposers] = useState([
    { label: "Michael Jackson", _id: "ar1" },
    { label: "Guns N' Roses", _id: "ar2" },
    { label: "Backstreet Boys", _id: "ar3" },
    { label: "Shawn Mendes", _id: "ar4" },
  ]);

  const handleChange = (
    event: React.SyntheticEvent<Element>,
    value:{ label: string; _id?: string }[]
  ) => {
    const composers = value.map((artist) => ({
      artist_name: artist.label,
    }));
    setSongData((data) => {
      return { ...data, composer: composers };
    });
  };

  return (
    <>
      <Autocomplete
        multiple
        id="composerTag"
        options={composers}
        filterOptions={handleFilter}
        // defaultValue={[top100Films[12].title, top100Films[13].title]}
        // readOnly
        onChange={handleChange}
        color={error ? "error" : "primary"}
        renderInput={(params) => (
          <TextField
            variant="filled"
            {...params}
            sx={{ width: "100%", margin: 0 }}
            label="Composer(s)"
          />
        )}
        sx={{ width: "80%", margin: 0 }}
      />
      <Typography variant="subtitle1" color="error">
        {error && "At least one composer is required!"}
      </Typography>
    </>
  );
}

function SongWriterTags({ songData, setSongData, error }: InputProps) {
  const [writers, setWriters] = useState([
    { label: "Michael Jackson", _id: "ar1" },
    { label: "Guns N' Roses", _id: "ar2" },
    { label: "Backstreet Boys", _id: "ar3" },
    { label: "Shawn Mendes", _id: "ar4" },
  ]);

  const handleChange = (
    event: React.SyntheticEvent<Element>,
    value: { label: string; _id?: string }[]
  ) => {
    const writers = value.map((artist) => ({
      artist_name: artist.label,
    }));
    setSongData((data) => {
      return { ...data, song_writers: writers };
    });
  };

  return (
    <>
      <Autocomplete
        multiple
        id="artistTag"
        options={writers}
        filterOptions={handleFilter}
        // defaultValue={[top100Films[12].title, top100Films[13].title]}
        // readOnly
        onChange={handleChange}
        color={error ? "error" : "primary"}
        renderInput={(params) => (
          <TextField
            variant="filled"
            {...params}
            sx={{ width: "100%", margin: 0 }}
            label="Song Writer(s)"
          />
        )}
        sx={{ width: "80%", margin: 0 }}
      />
      <Typography variant="subtitle1" color="error">
        {error && "At least one songwriter is required!"}
      </Typography>
    </>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const filter = createFilterOptions();

const handleFilter = (options, params) => {
  const filtered = filter(options, params);
  const { inputValue } = params;

  if (
    inputValue !== "" &&
    !options.some((option) => option.label === inputValue)
  ) {
    filtered.push({ label: inputValue, _id: "" });
  }

  return filtered;
};

const handleTagFilter = (options, params) => {
  const filtered = filter(options, params);
  const { inputValue } = params;

  if (
    inputValue !== "" &&
    !options.some((option) => option === inputValue)
  ) {
    filtered.push(inputValue);
  }

  return filtered;
};

export default AddSongData;
