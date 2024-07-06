"use client";
import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ClubVideos } from "@/app/constants/models";
import { addVideos } from "@/app/services/FanClubServices";
import { useAppSelector } from "@/lib/hooks";

// Example video data
// const initialVideoData = [
//   {
//     id: "1",
//     title: "Sample Video 1",
//     description: "This is a sample video 1 description.",
//     videoUrl: "https://www.example.com/sample_video_1.mp4",
//     thumbnailUrl: "https://www.example.com/sample_video_1_thumbnail.jpg",
//     uploader: {
//       id: "1",
//       name: "John Doe",
//       profilePicture: "https://www.example.com/john_doe_profile.jpg",
//     },
//     createdAt: "2024-07-05T12:00:00Z",
//   },
//   {
//     id: "2",
//     title: "Sample Video 2",
//     description: "This is a sample video 2 description.",
//     videoUrl: "https://www.example.com/sample_video_2.mp4",
//     thumbnailUrl: "https://www.example.com/sample_video_2_thumbnail.jpg",
//     uploader: {
//       id: "2",
//       name: "Jane Smith",
//       profilePicture: "https://www.example.com/jane_smith_profile.jpg",
//     },
//     createdAt: "2024-07-04T09:30:00Z",
//   },
//   // Add more video objects as needed
// ];

const VideosTab = () => {
  const [video, setVideo] = useState<ClubVideos[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const { register, handleSubmit, reset } = useForm();

  const artist = useAppSelector((state) => state.artist.user);

  const initialValues: ClubVideos = {
    videoTitle: "",
    videoDescription: "",
    videoURL: "",
    videoThumbnail: "",
    clubId: "fc0",
    artistId: artist ? artist.user.artist_id : "",
    timestamps: "",
  };

  


  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    videoId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedVideoId(videoId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVideoId(null);
  };

  const handlePlayVideo = (videoUrl: string) => {
    console.log("Playing video:", videoUrl);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  const onSubmit = async (data: ClubVideos) => {
    try {
      const formData = new FormData();
      formData.append("videoTitle", data.videoTitle);
      formData.append("videoDescription", data.videoDescription);
      formData.append("videoURL", videoFile as Blob);
      formData.append("videoThumbnail", thumbnail as Blob);
      formData.append("clubId", data.clubId);
      formData.append("artistId", data.artistId);
      formData.append("timestamps", new Date().toISOString());

      const response = await addVideos(artist?.token as string, formData);
      console.log("Video added successfully:", response.data);
      setVideo((prevVideos) => [...prevVideos, response.data]);
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };
   

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Video Page
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
        sx={{ mb: 3 }}
      >
        Add Video
      </Button>
      <Grid container spacing={3}>
        {video.map((video) => (
          <Grid item key={video.videoId} xs={12}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      sx={{ bgcolor: deepPurple[500] }}
                      src={video.uploader.profilePicture}
                      alt={video.uploader.name}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {video.uploader.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(video.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {video.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: grey[800] }}>
                  {video.description}
                </Typography>
                <Box
                  onClick={() => handlePlayVideo(video.videoUrl)}
                  sx={{
                    backgroundImage: `url(${video.thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: 350,
                    position: "relative",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  <IconButton
                    aria-label="play"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: 64,
                    }}
                  >
                    <PlayCircleOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
              >
                <IconButton
                  aria-label="more"
                  aria-controls={`video-menu-${video.id}`}
                  aria-haspopup="true"
                  onClick={(event) => handleMenuOpen(event, video.id)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`video-menu-${video.id}`}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedVideoId === video.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Report</MenuItem>
                </Menu>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Video</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("title", { required: true })}
              label="Title"
              fullWidth
              margin="dense"
              value={video[0].videoTitle}
              onChange={(e)=> setVideo([{...video[0], videoTitle: e.target.value}])}
            />
            <TextField
              {...register("description", { required: true })}
              label="Description"
              fullWidth
              margin="dense"
              value={video[0].videoDescription}
              onChange={(e)=> setVideo([{...video[0], videoDescription: e.target.value}])}

            />
            <TextField
              {...register("video", { required: true })}
              type="file"
              label="Video File"
              fullWidth
              margin="dense"
              value={video[0].videoURL}
              onChange={(e)=> setVideo([{...video[0], videoURL: e.target.value}])}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register("thumbnail", { required: true })}
              type="file"
              label="Thumbnail Image"
              fullWidth
              margin="dense"
              value={video[0].videoThumbnail}
              onChange={(e)=> setVideo([{...video[0], videoThumbnail: e.target.value}])}
              InputLabelProps={{ shrink: true }}
            />
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" onClick={onSubmit}>
                Upload
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default VideosTab;
