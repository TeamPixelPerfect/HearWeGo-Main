"use client";
import React from "react";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DropFile from "../../components/DropFile";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { TabsNav, TabItem } from "../../styles/PressReleaseOriginal.styles";

export default function PressRelease() {
  const [songFile, setSongFile] = React.useState(null);

  const [value, setValue] = React.useState("1");
  const handle01Change = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minWidth: 375 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <div>
              <h1>Press Release</h1>

              <TabsNav sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box
                    sx={{
                      borderBottom: "2px solid",
                      borderColor: "divider",
                      display: "flex",
                      position: "relative",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <TabList
                      onChange={handle01Change}
                      aria-label="lab API tabs example"
                    >
                      <TabItem label="Scheduling" value="1" />
                      <TabItem label="Saved Ones" value="2" />
                      <TabItem label="Drafts" value="3" />
                      <TabItem label="Already Shared" value="4" />
                    </TabList>
                  </Box>
                </TabContext>
              </TabsNav>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  // backgroundColor:"red"
                }}
              >
                <Box>
                  <Box
                    sx={{
                      padding: "30px",
                      // backgroundColor: "white",
                    }}
                  >
                    {" "}
                    {/* Component for uploading album image */}
                    <DropFile
                      fileTypes="Logo Image"
                      fileExtensions="JPEG,PNG,WEBP,SVG"
                      isCircular={false}
                      width="350px"
                      height="300px"
                      file={songFile}
                      setFile={setSongFile}
                      aspectX={1}
                      aspectY={1}
                      shape="rect"
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "60%",
                    marginLeft: "50px",
                    padding: "30px",
                    //  backgroundColor:"blue"
                  }}
                >
                  {/* Headline and Subheadline */}
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": {
                        m: 1,
                        width: "60ch",
                        marginTop: "20px",
                        maxWidth: "90%",
                        //backgroundColor: "red",
                      },
                    }}
                  >
                    <TextField
                      id="Press_Headline"
                      label="Headline"
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
                        marginTop: "20px",
                      },
                    }}
                  >
                    <TextField
                      id="Press_SubHeadline"
                      label="Sub Headline"
                      variant="filled"
                    />
                  </Box>
                  {/* Date Picker */}

                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": {
                        m: 1,
                        width: "60ch",
                        maxWidth: "90%",
                        marginTop: "20px",
                      },
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={[" DatePicker"]}>
                        <DatePicker
                          label="Date"
                          onChange={(value) => {
                            const date = value.format("YYYY-MM-DD").toString();
                            console.log(date);
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>

                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": {
                        m: 1,
                        width: "60ch",
                        maxWidth: "90%",
                        //backgroundColor: "red",
                        marginTop: "20px",
                      },
                    }}
                  >
                    <TextField
                      id="PressRelease_Venue"
                      label="Venue"
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
                        marginTop: "20px",
                      },
                    }}
                  >
                    <TextField
                      id="description"
                      label="Description"
                      multiline
                      rows={4}
                      //defaultValue="Description of the Press Release"
                      variant="filled"
                      // Handler for updating album description in state
                      onChange={(e) => {}}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      //backgroundColor:"yellow"
                    }}
                  >
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": {
                          m: 1,
                          width: "40ch",
                          maxWidth: "90%",
                          marginTop: "20px",
                        },
                      }}
                    >
                      <Box
                        sx={
                          {
                            // padding: "30px",
                            //backgroundColor: "blue",
                          }
                        }
                      >
                        {" "}
                        {/* Component for uploading album image */}
                        <DropFile
                          fileTypes="Signature"
                          fileExtensions="JPEG,PNG,WEBP,SVG"
                          isCircular={false}
                          width="320px"
                          height="160px"
                          file={songFile}
                          setFile={setSongFile}
                          aspectX={1}
                          aspectY={1}
                          shape="rect"
                        />
                      </Box>
                    </Box>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": {
                          m: 1,
                          width: "60ch",
                          maxWidth: "90%",
                          marginTop: "100px",
                          //backgroundColor: "red",
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
                              console.log(date);
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={() => {}}>
                    Cancal
                  </Button>
                  <LoadingButton startIcon={<SaveIcon />} variant="contained">
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
}
