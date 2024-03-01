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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

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
                  <h1 style={{ margin: 0 }}>Add New Album</h1>
                </div>
              </div>

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
                            width: "60ch",
                            maxWidth: "90%",
                          },
                        }}
                      >
                        <TextField
                          id="filled-basic"
                          label="No of Tracks (2 added)"
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
                       
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={[" DatePicker"]}>
                            <DatePicker  label="Release Date" />
                          </DemoContainer>
                        </LocalizationProvider>
                        
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
                          id="filled-multiline-static"
                          label="Description"
                          multiline
                          rows={4}
                          defaultValue="Description of your Album"
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

              {/*<CustomTabPanel value={value} index={1}>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              marginLeft: "20px",
              width: "400px",

              marginBottom: "30px",
            }}
          >
            <TextField
              fullWidth
              label="Contains music"
              id="fullWidth"
              style={{ boxSizing: "initial" }}
            />
          </Box>
          <Box sx={{ display: "flex", width: "400px", marginLeft: "200px" }}>
            <TextField
              fullWidth
              label="ISRC"
              id="fullWidth"
              style={{ boxSizing: "initial" }}
            />
            <HelpOutlineIcon />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "white",

            width: "100%",
            height: "auto",
            borderRadius: "10px",
            padding: "50px",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",

              width: "300px",
              marginBottom: "20px",
            }}
          >
            <TextField
              fullWidth
              label="Contains music"
              id="fullWidth"
              style={{ boxSizing: "initial" }}
            />
          </Box>

          <Box sx={{ display: "flex", width: "300px", marginLeft: "20px" }}>
            <TextField
              fullWidth
              label="ISRC"
              id="fullWidth"
              style={{ boxSizing: "initial" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: "20px",
              width: "300px",
              marginBottom: "20px",
            }}
          >
            <TextField
              fullWidth
              label="Contains music"
              id="fullWidth"
              style={{ boxSizing: "initial" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "40px",

            display: "flex",
            backgroundColor: "white",
            flexDirection: "column",

            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        >
          <div style={{ marginLeft: "10px" }}>
            <h2>Release date</h2>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker />
           </LocalizationProvider>
            <p>
              Setting your release date to at least 1-week in the future
              increases your chances of getting added to playlists.
            </p>

            <p>
              If it's important that your album goes live in all stores on the
              same day, click here for info.
            </p>
          </div>
        </Box>

        <Box
          sx={{
            marginTop: "40px",

            display: "flex",
            backgroundColor: "white",
            flexDirection: "column",

            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ marginLeft: "10px" }}>Album title</h2>
          <Box
            sx={{
              marginLeft: "10px",
              display: "flex",
              width: "800px",
              maxWidth: "80%",
              marginBottom: "30px",
            }}
          >
            <TextField
              fullWidth
              label=" Album Title"
              id="fullWidth"
              style={{ boxSizing: "initial" }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              marginTop: "40px",

              display: "flex",
              backgroundColor: "white",
              flexDirection: "column",

              width: "50%",
              height: "auto",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ marginLeft: "10px" }}>Record label</h2>
            <Box
              sx={{
                display: "flex",
                marginLeft: "20px",
                width: "300px",
                maxWidth: "50%",
                marginBottom: "20px",
              }}
            >
              <TextField
                fullWidth
                label="Contains music"
                id="fullWidth"
                style={{ boxSizing: "initial" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "40px",
              marginLeft: "20px",
              display: "flex",
              backgroundColor: "white",
              flexDirection: "column",

              width: "50%",
              height: "auto",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ marginLeft: "10px" }}>Language</h2>
            <Box
              sx={{
                display: "flex",
                marginLeft: "10px",
                width: "400px",
                maxWidth: "50%",
                marginBottom: "30px",
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Language}
                style={{ boxSizing: "initial", width: "90%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Language" />
                )}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              marginTop: "40px",

              display: "flex",
              backgroundColor: "white",
              flexDirection: "column",

              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ marginLeft: "10px" }}>Primary Genre</h2>
            <Box
              sx={{
                marginLeft: "10px",
                display: "flex",
                width: "800px",
                maxWidth: "80%",
                marginBottom: "30px",
              }}
            >
              <TextField
                fullWidth
                label=" Language"
                id="fullWidth"
                style={{ boxSizing: "initial" }}
              />
            </Box>
            <Box
              sx={{
                marginLeft: "10px",
                display: "flex",
                width: "800px",
                maxWidth: "80%",
                marginBottom: "30px",
              }}
            >
              <TextField
                fullWidth
                label="Electronic subgenre "
                id="fullWidth"
                style={{ boxSizing: "initial" }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              marginTop: "40px",

              display: "flex",
              backgroundColor: "white",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              height: "auto",
              borderRadius: "20px",
            }}
          >
            <h2 style={{ marginLeft: "10px" }}>Add Lyrics</h2>
            <Box
              sx={{
                display: "flex",
                width: "90%",
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Add Lyrics"
                id="fullWidth"
                multiline
                rows={10}
                style={{ boxSizing: "initial", width: "100%" }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "40px",

            display: "flex",
            backgroundColor: "white",
            flexDirection: "column",

            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ marginLeft: "10px" }}>Important checkboxes (mandatory)</h2>
          <div style={{marginLeft:'20px'}}>
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="I recorded this music, and am authorized to sell it in stores worldwide & collect all royalties."
            />
             <FormControlLabel
              required
              control={<Checkbox />}
              label="I'm not using any other artist's name in my name, song titles, or album title, without their approval."
            />
             <FormControlLabel
              required
              control={<Checkbox />}
              label="I have read and agree to the terms of the HearWeGo Distribution Agreement"
            />
          </FormGroup>

          </div>
         
        </Box>
      </CustomTabPanel>*/}
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
