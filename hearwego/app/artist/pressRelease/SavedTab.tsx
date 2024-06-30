"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Grid,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/lib/hooks";
import { formatDate } from "@/app/constants/functions";
import { PressReleaseData } from "@/app/constants/models";
import {
  getPressReleasesByArtist,
  deletePressRelease,
  sendEmailWithPDF,
  DownloadPDF,
} from "../../services/PressReleaseServices";

const SavedOnesTab: React.FC = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [savedPressReleases, setSavedPressReleases] = useState<
    PressReleaseData[]
  >([]);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [selectedPressRelease, setSelectedPressRelease] =
    useState<PressReleaseData | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (artist?.token) {
      getPressReleasesByArtist(artist.token, artist?.user?.artist_id || "")
        .then((response) => {
          const savedPressReleases = response.data.filter(
            (pr: any) => pr.Status === "Saved"
          );
          setSavedPressReleases(savedPressReleases);
          if (isChanged) setIsChanged(false);
        })
        .catch((error) => console.error(error));
    }
  }, [artist?.token, artist?.user?.artist_id, isChanged]);

  const handleDelete = (id: string | undefined) => {
    deletePressRelease(artist ? artist.token : "", id as string)
      .then(() => {
        setIsChanged(true);
      })
      .catch((error) => console.error(error));
  };

  const handleShare = (data: PressReleaseData) => {
    setSelectedPressRelease(data);
    setShareDialogOpen(true);
  };

  const handleShareDialogClose = () => {
    setShareDialogOpen(false);
    setSelectedPressRelease(null);
    setEmailList([]);
    setEmail("");
    setError(null);
  };

  const handleShareDialogShare = (emails: string[]) => {
    if (selectedPressRelease) {
      sendEmailWithPDF(
        { ...selectedPressRelease, email: emails },
        artist?.token as string,
        selectedPressRelease.PressReleaseID as string
      )
        .then((result) => {
          console.log("Email sent successfully:", result);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
    handleShareDialogClose();
  };

  const handleAddEmail = () => {
    if (email && email.includes("@")) {
      setEmailList([...emailList, email]);
      setEmail("");
      setError(null);
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmailList(emailList.filter((e) => e !== emailToDelete));
  };

  return (
    <>
      {savedPressReleases.length > 0 ? (
        <Grid container spacing={2}>
          {savedPressReleases.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  bgcolor: "background.default",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  height: "auto",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.ArtistLogo_URL}
                  alt="logo"
                  sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    borderRadius: "50%",
                    border: "2px solid #3f51b5",
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {item.Headline}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  {item.SubHeadline}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Event Date:{" "}
                  {item.EventDate && formatDate(item.EventDate.toString())}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Release Date:{" "}
                  {item.ReleaseDate && formatDate(item.ReleaseDate.toString())}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() =>
                      DownloadPDF(
                        {...item, ...artist?.user},
                        artist.token,
                        item.PressReleaseID as string
                      )
                    }
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleShare(item)}
                  >
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item?.PressReleaseID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          No press releases saved.
        </Typography>
      )}

      <Dialog open={shareDialogOpen} onClose={handleShareDialogClose}>
        <DialogTitle>
          Share Press Release
          <IconButton
            aria-label="close"
            onClick={handleShareDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
          />
          <Button onClick={handleAddEmail} variant="contained" color="primary">
            Add Email
          </Button>
          <Box mt={2}>
            {emailList.map((email, index) => (
              <Chip
                key={index}
                label={email}
                onDelete={() => handleDeleteEmail(email)}
                color="primary"
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleShareDialogShare(emailList)}
            color="primary"
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SavedOnesTab;
