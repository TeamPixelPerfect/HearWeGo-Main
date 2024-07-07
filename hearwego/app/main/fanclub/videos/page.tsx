"use client";
import React, { useState } from 'react';
import { Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

// Example video data
const videoData = [
  { id: 1, description: 'Great Horned Owl Family', src: 'https://www.youtube.com/embed/q-9kPks0IfE', likes: 10 },
  { id: 2, description: 'Serenity - Relaxing Music and Waves', src: 'https://www.youtube.com/embed/q-9kPks0IfE?si=O9VmtZxAyDs0Gj_0', likes: 5 },
  { id: 3, description: 'Cute Kittens Playing', src: 'https://www.youtube.com/embed/q-9kPks0IfE?si=O9VmtZxAyDs0Gj_0', likes: 3 },

  // Add more videos as needed
];

const VideoPage: React.FC = () => {
  const [videos, setVideos] = useState(videoData);
  const [openModal, setOpenModal] = useState(false);
  const [modalVideoSrc, setModalVideoSrc] = useState<string | null>(null);

  const handleLike = (id: number) => {
    const updatedVideos = videos.map(video => {
      if (video.id === id) {
        return { ...video, likes: video.likes + 1 };
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  const openVideoModal = (src: string) => {
    setModalVideoSrc(src);
    setOpenModal(true);
  };

  const closeVideoModal = () => {
    setOpenModal(false);
    setModalVideoSrc(null);
  };

  return (

    
    <Container>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold"}}>
        Videos
      </Typography>
      <Grid container spacing={3}>
        {videos.map(video => (
          <Grid item key={video.id} xs={12} sm={6}>
            <Card style={{boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: '0.3s',margin:"10px" }}>
              <CardActionArea onClick={() => openVideoModal(video.src)}>
                {video.src.includes('youtube') ? (
                  <CardMedia
                    component="iframe"
                    src={video.src}
                    title={video.description}
                    style={{ height: 240 }}
                  />
                ) : (
                  <CardMedia
                    component="video"
                    src={video.src}
                    title={video.description}
                    controls
                    style={{ height: 240, objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {video.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" style={{ marginLeft: 'auto' }} onClick={() => handleLike(video.id)}>
                  <FavoriteIcon color="secondary" />
                </IconButton>
                <Typography variant="body2" color="textSecondary" component="p">
                  {video.likes} Likes
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Video Modal */}
      <Dialog open={openModal} onClose={closeVideoModal} maxWidth="xl" fullWidth>
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {modalVideoSrc && videos.find(video => video.src === modalVideoSrc)?.description}
          </Typography>
          <IconButton aria-label="close" onClick={closeVideoModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {modalVideoSrc && modalVideoSrc.includes('youtube') ? (
            <iframe
              title="YouTube Video"
              width="100%"
              height="500"
              src={modalVideoSrc}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls style={{ width: '100%' }} autoPlay>
              <source src={modalVideoSrc || ''} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </Container>
   
  );
};

export default VideoPage;
