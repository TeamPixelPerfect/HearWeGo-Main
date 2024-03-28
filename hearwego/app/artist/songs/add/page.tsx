"use client";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DropSong from "@/app/components/DropSong";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material";
import { uploadSong } from "@/app/handlers/uploadFiles";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSong } from "@/lib/features/song.slice";

const AddSong = () => {
  const Router = useRouter();
  const theme = useTheme();

  const [songFile, setSongFile] = useState<File|null>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleAddSong = () => {
    if (!songFile) {
      setError(true);
      return;
    }
    setUploading(true);
    uploadSong(songFile).then((res) => {
      console.log(res);
      dispatch(setSong({song_track: res}));
      setUploading(false);
      Router.push("add2");
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <>
              <div>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "700",
                    color: theme.palette.secondary.main,
                    padding: "1em",
                  }}
                >
                  Add New Song
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DropSong
                    fileTypes="Music Track"
                    fileExtensions="MP3,AAC,M4A"
                    isCircular={false}
                    width="800px"
                    height="300px"
                    file={songFile}
                    setFile={setSongFile}
                    aspectX={1}
                    aspectY={1}
                    shape="rect"
                  />
                </div>
              </div>

              <Typography
                variant="subtitle1"
                color="error"
                sx={{ width:"100%", textAlign: "center", padding: "1em" }}
              >
                {error ? "Please upload a song file to continue!" : ""}
              </Typography>

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
                      Router.replace("add");
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={uploading}
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => {
                      // Router.push("add2");
                      handleAddSong();
                    }}
                  >
                    Add
                  </LoadingButton>
                </Stack>
              </div>
            </>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default AddSong;
