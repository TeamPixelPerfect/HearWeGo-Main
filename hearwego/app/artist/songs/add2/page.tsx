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
import { Autocomplete } from "@mui/material";
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

const page = () => {
  const Router = useRouter();
  const [songFile, setSongFile] = useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <div>
              <div style={{}}>
                <div style={{}}>
                  <h1 style={{ margin: 0 }}>Add New Song</h1>
                </div>
              </div>

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
                          id="filled-basic"
                          label="Title"
                          variant="filled"
                        />
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
                          disablePortal
                          id="combo-box-demo"
                          options={genres}
                          style={{ boxSizing: "initial", width: "82%" }}
                          renderInput={(params) => (
                            <TextField
                              variant="filled"
                              {...params}
                              label="Genre"
                            />
                          )}
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
                          id="filled-basic"
                          label="Title"
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
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={4}
                          defaultValue="Description of your track"
                          variant="filled"
                        />
                      </Box>
                      <div style={{ marginTop: "30px", marginLeft: "20px" }}>
                        <FormControl>
                          <FormLabel id="demo-radio-buttons-group-label">
                            privacy
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Public"
                            name="radio-buttons-group"
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
                <SongMetaData />
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
                    Cansel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      Router.push("add3");
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </div>
            </div>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

function SongMetaData() {
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
                control={<Checkbox defaultChecked />}
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
            <ArtistTags />
          </Grid>
          <Grid xs={6}>
            <ComposerTags />
          </Grid>
          <Grid xs={6}>
            <SongWriterTags />
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
            <ReleaseDate />
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
            <LanguageSelect />
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
            <GenreSelect />
          </Grid>
          <Grid xs={6}>
            <ElectrinocGenreSelect />
          </Grid>
          <Grid xs={6}>
            <OtherGenreSelect />
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
              label="Multiline"
              multiline
              // maxRows={20}
              variant="filled"
              sx={{width: "95%"}}
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
        <FormControlLabel required control={<Checkbox />} label="I recorded this music, and am authorized to sell it in stores worldwide & collect all royalties." />
      <FormControlLabel required control={<Checkbox />} label="I'm not using any other artist's name in my name, song titles, or album title, without their approval." />
      <FormControlLabel required control={<Checkbox />} label="I have read and agree to the terms of the HearWeGo Distribution Agreement" />
    </FormGroup>
        </Paper>
    </>
  );
}

function GenreSelect() {
  const [genre, setGenre] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "90%" }}>
        <InputLabel id="demo-simple-select-label">Primary Genre</InputLabel>
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

function ElectrinocGenreSelect() {
  const [genre, setGenre] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "90%" }}>
        <InputLabel id="demo-simple-select-label">
          Electronic Sub Genre
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

function OtherGenreSelect() {
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

function LanguageSelect() {
  return (
    <Autocomplete
      multiple
      id="languageTag"
      options={languages.map((option) => option.title)}
      // defaultValue={[top100Films[12].title, top100Films[13].title]}
      // readOnly
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
  );
}

const languages = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

function ReleaseDate() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField"]}>
        <DateField
          label="Release Date"
          defaultValue={dayjs("2022-04-17")}
          format="LL"
          variant="filled"
          sx={{ width: "90%" }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function ArtistTags() {
  return (
    <Autocomplete
      multiple
      id="artistTag"
      options={artists.map((option) => option.title)}
      // defaultValue={[top100Films[12].title, top100Films[13].title]}
      // readOnly
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
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const artists = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

function ComposerTags() {
  return (
    <Autocomplete
      multiple
      id="composerTag"
      options={composers.map((option) => option.title)}
      // defaultValue={[top100Films[12].title, top100Films[13].title]}
      // readOnly
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
  );
}

const composers = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

function SongWriterTags() {
  return (
    <Autocomplete
      multiple
      id="artistTag"
      options={songWriters.map((option) => option.title)}
      // defaultValue={[top100Films[12].title, top100Films[13].title]}
      // readOnly
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
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const songWriters = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];

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

export default page;
