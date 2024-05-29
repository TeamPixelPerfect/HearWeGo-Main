"use client";
import React, { useCallback, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
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

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }


//Array of available languages for albums.
const Language = [
  "Sinhala",
  "English",
  "Tamil",
  "German",
  "Korean",
  "Italian",
  "Hindi",
];

//Component for displaying error message.
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

//Component for adding album data.
const PressRelease = () => {
  const Router = useRouter();

  // Fetching user and album data from Redux store
  const artist = useAppSelector((state) => state.artist.user);
  const albumDraft = useAppSelector((state) => state.album);

  // State variables for managing form data and errors
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
  // const [trackError, setTrackError] = useState(false);
  const [dateError, setDateError] = useState(false);
  // const [genreError, setGenreError] = useState(false);

  const [uploading, setUploading] = useState(false);

  // Function to handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Function to add album data
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

    // Add album API call
    addAlbum(artist?.token ? artist.token : "", albumData).then((res) => {
      console.log(res);
      setUploading(false);
      Router.push("/artist/albums");
    });
  };

  // Effect to set initial album data
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
    <Box sx={{ minWidth: 375 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <div>
              <Typography variant="h4">Press Release</Typography>

              <Box sx={{ width: "100%", padding: "30px.0px" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Scheduling" {...a11yProps(0)} />
                  <Tab label="Saved Ones" {...a11yProps(1)} />
                  <Tab label="Drafts" {...a11yProps(2)} />
                  <Tab label="Already Shared" {...a11yProps(3)} />
                </Tabs>
              </Box>

              <div>
                <CustomTabPanel value={value} index={0}>
                  <Box sx={{ width: "100%", display: "flex" }}>
                    <Box>
                      {" "}
                      {/* Component for uploading album image */}
                      <DropFile
                        fileTypes="Logo Img"
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
                      {/* Form section for number of tracks */}
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
                          id="title"
                          label="Headline"
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
                          id="title"
                          label="Sub Headline"
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

                      {/* Form section for selecting release date */}
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
                              label="Date"
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
                      {/* Form section for selecting album genres */}
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
                          id="title"
                          label="Venue"
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

                      {/* Form section for album description */}
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
                          defaultValue="Add Description"
                          variant="filled"
                          // Handler for updating album description in state
                          onChange={(e) => {
                            setAlbumData({
                              ...albumData,
                              description: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    <Box sx={{display: "flex", flexDirection: "row"
                      
                    }}>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "200ch",
                            maxWidth: "90%",
                          },
                        }}
                      ><DropFile
                      fileTypes="Signature"
                      fileExtensions="JPG,PNG,JPEG"
                      isCircular={false}
                      width="320px"
                      height="160px"
                      file={imageFile}
                      setFile={setImageFile}
                      aspectX={1}
                      aspectY={1}
                      shape="rect"
                    />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                          "& > :not(style)": {
                            m: 1,
                            width: "60ch",
                            maxWidth: "90%",
                            padding: "80px"
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
                      </Box>



                      
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
                    Cancle
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

export default PressRelease;
