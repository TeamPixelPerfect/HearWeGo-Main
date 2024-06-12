"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DropFile from "../../components/DropFile"; // Ensure the path is correct
import SaveIcon from "@mui/icons-material/Save"; 
// Ensure SaveIcon import

interface PressReleaseDetails {
  headline: string;
  subHeadline: string;
  date: Dayjs | null;
  venue: string;
  description: string;
  releaseDate: Dayjs | null;
  logo: string;
  signature: string;
}

export default function PressRelease() {
  const [value, setValue] = useState<string>("1");
  const [headline, setHeadline] = useState<string>("");
  const [subHeadline, setSubHeadline] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [venue, setVenue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<Dayjs | null>(null);
  const [logo, setLogo] = useState<string>("");
  const [signature, setSignature] = useState<string>("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pressReleaseDetails: PressReleaseDetails = {
      headline,
      subHeadline,
      date,
      venue,
      description,
      releaseDate,
      logo,
      signature,
    };
    // Add form submission logic here
    console.log(pressReleaseDetails);
  };

  return (
    <Box sx={{ minWidth: 375, py: 3 }}>
      <Card variant="outlined" sx={{ maxWidth: 1200, mx: "auto", p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "left" }}>
            Press Release
          </Typography>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TabList onChange={handleTabChange} aria-label="Press Release Tabs">
                  <Tab label="Scheduling" value="1" />
                  <Tab label="Saved Ones" value="2" />
                  <Tab label="Drafts" value="3" />
                  <Tab label="Already Shared" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Paper elevation={3} sx={{ p: 3 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        {/* <Typography variant="subtitle1" gutterBottom>
                          Upload Logo
                        </Typography> */}
                        <DropFile
                          fileTypes="logo"
                          fileExtensions=".jpg, .jpeg, .png"
                          isCircular={false}
                          width="300px"
                          height="300px"
                          file={logo}
                          setFile={setLogo}
                          aspectX={1}
                          aspectY={1}
                          shape="rect"
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Headline"
                              value={headline}
                              onChange={(e) => setHeadline(e.target.value)}
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Sub Headline"
                              value={subHeadline}
                              onChange={(e) => setSubHeadline(e.target.value)}
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Event Date"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                                renderInput={(params) => <TextField fullWidth {...params} required />}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              // fullWidth
                              label="Venue"
                              value={venue}
                              onChange={(e) => setVenue(e.target.value)}
                              required
                              sx={{width:"50%"}}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              // fullWidth
                              label="Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              multiline
                              rows={4}
                              required
                              sx={{width:"100%"}}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            {/* <Typography variant="subtitle1" gutterBottom>
                              Upload Signature
                            </Typography> */}
                            <DropFile
                              fileTypes="signature"
                              fileExtensions=".jpg, .jpeg, .png"
                              isCircular={false}
                              width="300px"
                              height="150px"
                              file={signature}
                              setFile={setSignature}
                              aspectX={1}
                              aspectY={1}
                              shape="rect"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Release Date"
                                value={releaseDate}
                                onChange={(newDate) => setReleaseDate(newDate)}
                                renderInput={(params) => <TextField fullWidth {...params} required />}
                                sx={{marginTop: "100px"}}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                             
                              fullWidth
                              sx={{ mt: 3 }}
                            >
                              Save Press Release
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </TabPanel>
              {/* Placeholder panels for other tabs */}
              <TabPanel value="2">
                <Typography>Saved Ones content goes here...</Typography>
              </TabPanel>
              <TabPanel value="3">
                <Typography>Drafts content goes here...</Typography>
              </TabPanel>
              <TabPanel value="4">
                <Typography>Already Shared content goes here...</Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
