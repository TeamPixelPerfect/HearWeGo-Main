"use client";
import React, { useState } from "react";

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
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "next/link";
import TabPanel from "@mui/lab/TabPanel";
import PressReleaseSavedRow from "@/app/components/PressReleaseSavedRow";
import Grid from "@mui/material/Grid";

import { TabsNav, TabItem } from "../../styles/PressReleaseOriginal.styles";

const PressReleaseDetails = [
  {
    id: "1",
    title: "Press Release 1",
    releaseDate: "2021-09-01",
    handleDelete: () => {},
    handleShare: () => {},
  },
];
export default function PressRelease() {
  const [headline, setHeadline] = useState("");
  const [subHeadline, setSubHeadline] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  // const [songFile, setSongFile] = useState(null);
  // const [value, setValue] = useState("1");
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [openSavedItemsDialog, setOpenSavedItemsDialog] = useState(false);
  const [openSuccessfullySharedDialog, setOpenSuccessfullySharedDialog] =
    useState(false);

  const [logoFile, setLogoFile] = React.useState(null);
  const [signatureFile, setSignatureFile] = React.useState(null);

  const [value, setValue] = React.useState("1");
  const handle01Change = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleCancelOpen = () => {
    setOpenCancelDialog(true);
  };

  const handleCancelClose = () => {
    setOpenCancelDialog(false);
  };

  const handleSaveOpen = () => {
    if (validateFields()) {
      setOpenSaveDialog(true);
    }
  };

  const handleSaveClose = () => {
    setOpenSaveDialog(false);
  };

  const handleShareOpen = () => {
    setOpenShareDialog(true);
    setOpenSaveDialog(false);
  };

  const handleShareClose = () => {
    setOpenShareDialog(false);
  };

  const handleSavedItemsOpen = () => {
    setOpenSavedItemsDialog(true);
  };

  const handleSavedItemsClose = () => {
    setOpenSavedItemsDialog(false);
  };

  const handleSuccessfullySharedOpen = () => {
    setOpenSuccessfullySharedDialog(true);
  };

  const handleSuccessfullySharedClose = () => {
    setOpenSuccessfullySharedDialog(false);
  };

  const handleSaveAsDraft = () => {
    console.log("Saved in drafts");
    handleCancelClose();
  };

  const handleSaveItem = () => {
    console.log("The press release is saved in saved items");
    handleSavedItemsOpen();
    handleSaveClose();
  };

  const handleShare = () => {
    console.log("Successfully Shared");
    handleSuccessfullySharedOpen();
    handleShareClose();
  };

  const validateFields = () => {
    if (!headline || !subHeadline || !venue || !description || !releaseDate) {
      alert("All fields are required!");
      return false;
    }
    return true;
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
                  <TabPanel
                    value="1"
                    style={{
                      width: "100%",
                      padding: "1em 0",
                    }}
                  >
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
                            file={logoFile}
                            setFile={setLogoFile}
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
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            required
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
                            value={subHeadline}
                            onChange={(e) => setSubHeadline(e.target.value)}
                            required
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
                                value={date}
                                onChange={(value) => setDate(value)}
                                required
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
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            required
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
                            variant="filled"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
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
                                file={signatureFile}
                                setFile={setSignatureFile}
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
                                  value={releaseDate}
                                  onChange={(value) => setReleaseDate(value)}
                                  required
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
                        <Button variant="outlined" onClick={handleCancelOpen}>
                          Cancel
                        </Button>
                        <LoadingButton
                          startIcon={<SaveIcon />}
                          variant="contained"
                          onClick={handleSaveOpen}
                        >
                          Save
                        </LoadingButton>
                      </Stack>
                    </div>

                    <Dialog
                      open={openCancelDialog}
                      onClose={handleCancelClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Save as Draft?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Do you want to save this press release as a draft?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancelClose}>No</Button>
                        <Button onClick={handleSaveAsDraft} autoFocus>
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={openSaveDialog}
                      onClose={handleSaveClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Share Press Release?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Do you want to share this press release now?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleSaveItem}>No</Button>
                        <Button onClick={handleShareOpen} autoFocus>
                          Yes
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={openShareDialog}
                      onClose={handleShareClose}
                      aria-labelledby="share-dialog-title"
                      aria-describedby="share-dialog-description"
                    >
                      <DialogTitle id="share-dialog-title">
                        {"Share Options"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="share-dialog-description">
                          Choose your sharing options here.
                        </DialogContentText>
                        {/* Add your share options here */}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleShareClose}>Cancel</Button>
                        <Button
                          onClick={() => {
                            handleShare();
                            handleShareClose();
                          }}
                          autoFocus
                        >
                          Share
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={openSavedItemsDialog}
                      onClose={handleSavedItemsClose}
                      aria-labelledby="saved-items-dialog-title"
                      aria-describedby="saved-items-dialog-description"
                    >
                      <DialogTitle id="saved-items-dialog-title">
                        {"Saved"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="saved-items-dialog-description">
                          The press release is saved in saved items.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleSavedItemsClose} autoFocus>
                          OK
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={openSuccessfullySharedDialog}
                      onClose={handleSuccessfullySharedClose}
                      aria-labelledby="successfully-shared-dialog-title"
                      aria-describedby="successfully-shared-dialog-description"
                    >
                      <DialogTitle id="successfully-shared-dialog-title">
                        {"Success"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="successfully-shared-dialog-description">
                          Successfully Shared.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleSuccessfullySharedClose}
                          autoFocus
                        >
                          OK
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TabPanel>
                  <TabPanel
                    value="2"
                    style={{
                      width: "100%",
                      padding: "0",
                    }}
                  >
                 
                    {PressReleaseDetails.map(
                      ({
                        id,
                        title,
                        releaseDate,
                        handleDelete,
                        handleShare,
                      }) => (
                        <PressReleaseSavedRow
                          id={id}
                          title={title}
                          releaseDate={releaseDate}
                          handleDelete={handleDelete}
                          handelShare={handleShare}
                        ></PressReleaseSavedRow>
                      )
                    )}
                    
           
                  </TabPanel>
                  <TabPanel value="3">Item Three</TabPanel>
                  <TabPanel value="4">Item Four</TabPanel>
                </TabContext>
              </TabsNav>
            </div>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
