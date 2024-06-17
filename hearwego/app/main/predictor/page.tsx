"use client";

import DropSong from "@/app/components/DropSong";
import Logo from "@/app/components/Logo";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const HitPredictor = () => {
  const theme = useTheme();

  const [song, setSong] = useState<File>();
  const [songError, setSongError] = useState(false);

  const [uploading, setUploading] = useState(false);

  const handleSOngAnalyze = () => {
    if (!song) {
      setSongError(true);
      return;
    }
    setUploading(true);

    setTimeout(() => {
      console.log("Analyzing...");
    }, 2000);

    setUploading(false);
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
          onClick={() => console.log("Predicting...")}
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
    </Box>
  );
};

export default HitPredictor;
