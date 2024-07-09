"use client";

import DropSong from "@/app/components/DropSong";
import Logo from "@/app/components/Logo";
import { uploadSong } from "@/app/handlers/uploadFiles";
import { predictPopularity } from "@/app/services/PredictorServices";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Stack,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const getCheerfulMessage = (value: number) => {
  if (value >= 90) {
    return "Fantastic! You're a superstar!";
  } else if (value >= 70) {
    return "Great job! You're doing amazing!";
  } else if (value >= 50) {
    return "Good effort! Keep up the good work!";
  } else if (value >= 30) {
    return "Not bad! There's room for improvement.";
  } else {
    return "Don't give up! Keep trying!";
  }
};

const AnalysisCompleteDialog = ({ open, onClose, value }: any) => {
  const message = getCheerfulMessage(value);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="analysis-complete-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="analysis-complete-dialog-title">
        Analysis Complete
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={2}
        >
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={value}
              size={120}
              thickness={4}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" component="div" color="textPrimary">
                {`${Math.round(value)}%`}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h6"
            component="div"
            color="textSecondary"
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const HitPredictor = () => {
  const theme = useTheme();

  const [song, setSong] = useState<File>();
  const [songError, setSongError] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [predictedValue, setPredictedValue] = useState(0);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSOngAnalyze = () => {
    if (!song) {
      setSongError(true);
      return;
    }
    setUploading(true);

    uploadSong(song).then((url) => {
      console.log(url);

      if (url) {
        const resource = url.split("/")[4];
        console.log(resource);
        const song_name = resource.split(".")[0];
        const song_ex = resource.split(".")[1];

        predictPopularity(song_name, song_ex).then((data) => {
          console.log(data);
          setPredictedValue(data.data.popularity_score);
          handleOpenDialog();
          setUploading(false);
        });
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
        pt: 8,
        // background: "#000",
        width: "100%",
        height: "100%",
      }}
    >
      <Logo
        img_url={
          theme.palette.mode === "dark"
            ? "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(white).png"
            : "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png"
        }
      />
      <Typography
        variant="h3"
        color="primary"
        sx={{ fontSize: "32px", fontWeight: 700, mb: 2 }}
      >
        Welcome to the HearWeGo Predictor!
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Upload a song and we'll predict its hit potential
      </Typography>
      <Card
        sx={{
          width: "60%",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DropSong
          fileTypes="Music Track"
          fileExtensions="MP3,AAC,M4A"
          isCircular={false}
          width="95%"
          height="80%"
          file={song}
          setFile={setSong}
          aspectX={1}
          aspectY={1}
          shape="rect"
        />
      </Card>
      <Typography variant="subtitle1" color="error">
        {songError && "Please upload a song file to continue!"}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          loading={uploading}
          variant="contained"
          color="primary"
          onClick={handleSOngAnalyze}
          sx={{ textTransform: "capitalize" }}
        >
          Start Analyzing
        </LoadingButton>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => console.log("Predicting...")}
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </Button>
      </Stack>
      <AnalysisCompleteDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        value={predictedValue}
      />
    </Box>
  );
};

export default HitPredictor;
