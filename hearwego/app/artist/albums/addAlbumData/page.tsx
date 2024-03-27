"use client";
import { relative } from "path";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Autocomplete } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DropFile from "@/app/components/DropFile";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useAppSelector } from "@/lib/hooks";
import { Album } from "@/app/constants/models";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { addAlbum, addSong } from "@/app/services/SongServices";

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
const Language = [
  "Sinhala",
  "English",
  "Tamil",
  "German",
  "Korean",
  "Italian",
  "Hindi",
];

const ErrorMessage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "red",
        paddingTop: 0,
      }}
    >
      <HelpOutlineIcon />
      <p style={{ marginLeft: "10px" }}>This field is required</p>
    </div>
  );
};

const AddAlbumData = () => {
  const Router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const albumDraft = useAppSelector((state) => state.album);

  const [imageFile, setImageFile] = useState("");
  const [value, setValue] = React.useState(0);

  const [albumData, setAlbumData] = useState<Album>({
    album_title: "",
    artist: [],
    album_img: imageFile,
    no_of_tracks: albumDraft.song_tracks.length,
    album_length: 0,
    album_genre: [],
    privacy: "Private",
    release_date: "",
    album_status: "To Release",
    additional_tags: [],
    description: "",
    song: albumDraft.song_tracks.map((song) => song.song_id),
  });

  const [titleError, setTitleError] = useState(false);
  const [trackError, setTrackError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [genreError, setGenreError] = useState(false);

  const [uploading, setUploading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddAlbumData = () => {
    const errors = [false, false, false, false, false];
    if (!albumData.album_title) {
      setTitleError(true);
      errors[0] = true;
    }
    if (!albumData.no_of_tracks) {
      setTrackError(true);
      errors[1] = true;
    }
    if (!albumData.release_date) {
      setDateError(true);
      errors[2] = true;
    }
    if (!albumData.album_genre || albumData.album_genre.length === 0) {
      setGenreError(true);
      errors[3] = true;
    }
    if (errors.includes(true)) {
      return;
    }

    console.log(albumData);
    setUploading(true);
    addAlbum(artist?.token ? artist.token : "", albumData).then((res) => {
      console.log(res);
      setUploading(false);
      Router.push("/artist/albums");
    });
  };

  useEffect(() => {
    console.log(albumDraft);
    setImageFile(albumDraft.album_img);
    setAlbumData({
      ...albumData,
      album_img: albumDraft.album_img,
      artist: [
        {
          artist_id: artist?.user.artist_id,
          artist_name: artist?.user.artistName,
        },
      ],
    });
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <div>
              <Typography
                variant="h4"
                color="secondary"
                sx={{
                  fontSize: "24px",
                  fontWeight: "700",
                  padding: "1em",
                }}
              >
                Add New Album
              </Typography>

              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Basic Info" {...a11yProps(0)} />
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
                        file={imageFile}
                        setFile={setImageFile}
                        aspectX={1}
                        aspectY={1}
                        shape="rect"
                      />
                      {!imageFile && <ErrorMessage />}
                    </Box>
                    <Box sx={{ width: "50%", marginLeft: "100px" }}>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <TextField
                          id="album-title"
                          label="Title"
                          variant="filled"
                          color={titleError ? "error" : "primary"}
                          onChange={(e) => {
                            setAlbumData({
                              ...albumData,
                              album_title: e.target.value,
                            });
                          }}
                        />
                        {titleError && <ErrorMessage />}
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <TextField
                          id="no_of_tracks"
                          label={
                            "No of Tracks (" +
                            albumDraft.song_tracks.length +
                            " added)"
                          }
                          type="number"
                          variant="filled"
                          color={trackError ? "error" : "primary"}
                          onChange={(e) => {
                            setAlbumData({
                              ...albumData,
                              no_of_tracks: parseInt(e.target.value),
                            });
                          }}
                        />
                        {trackError && <ErrorMessage />}
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={[" DatePicker"]}>
                            <DatePicker
                              label="Release Date"
                              onChange={(value) => {
                                const date = value
                                  .format("YYYY-MM-DD")
                                  .toString();
                                setAlbumData({
                                  ...albumData,
                                  release_date: date,
                                });
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        {dateError && <ErrorMessage />}
                      </Box>

                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "58ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <Autocomplete
                          multiple
                          disablePortal
                          id="album_genres"
                          options={genres}
                          style={{ boxSizing: "initial", width: "82%" }}
                          onChange={(e, value) => {
                            setAlbumData({ ...albumData, album_genre: value });
                          }}
                          renderInput={(params) => (
                            <TextField
                              variant="filled"
                              {...params}
                              label="Genre"
                            />
                          )}
                        />
                        {genreError && <ErrorMessage />}
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <TextField
                          id="additional_tags"
                          label="Additional Tags (Optional)"
                          variant="filled"
                        />
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <TextField
                          id="description"
                          label="Description"
                          multiline
                          rows={4}
                          defaultValue="Description of your Album"
                          variant="filled"
                          onChange={(e) => {
                            setAlbumData({
                              ...albumData,
                              description: e.target.value,
                            });
                          }}
                        />
                      </Box>
                      <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Privacy
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Public"
                            name="radio-buttons-group"
                            row
                            onChange={(e) => {
                              setAlbumData({
                                ...albumData,
                                privacy: e.target.value,
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
                    Cansel
                  </Button>
                  <LoadingButton
                    loading={uploading}
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={handleAddAlbumData}
                  >
                    Save
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

export default AddAlbumData;
