"use client";
import React, { useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Define the photo data structure
interface Photo {
  id: number;
  imageUrl: string;
  artistName: string;
  uploadDate: string;
  likes: number;
}

// Sample photo data
const photos: Photo[] = [
  {
    id: 1,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tdedQP9dpCU6QEytN3ORZT9ayULlOl8XRw&s",
    artistName: "Artist One",
    uploadDate: "June 1, 2024",
    likes: 10,
  },
  {
    id: 2,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBxrPuw3DNMapIeylq5oPXHbQVczeBRfwa_vZcForopRp3xzG2vHria0lrHlLo8wThGSc&usqp=CAU",
    artistName: "Artist Two",
    uploadDate: "June 5, 2024",
    likes: 7,
  },
  {
    id: 3,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiNarhLD1XCOOSLnyGeudCdyAx44fCdS_3cvXF0Mahhy1Zv9h_YUNPgFzSKY3avv5o6HI&usqp=CAU",
    artistName: "Artist Three",
    uploadDate: "June 10, 2024",
    likes: 5,
  },
];

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f7f7f7",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "2.5rem",
      marginBottom: "1.5rem",
    },
    h6: {
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.9rem",
    },
  },
});

const PhotoPage: React.FC = () => {
  const [photoList, setPhotoList] = useState<Photo[]>(photos);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Function to handle like button click
  const handleLike = (id: number) => {
    const updatedPhotos = photoList.map((photo) =>
      photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
    );
    setPhotoList(updatedPhotos);
  };

  // Function to open dialog and display selected photo
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setDialogOpen(true);
  };

  // Function to close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Photos
        </Typography>
        <Grid container spacing={3}>
          {photoList.map((photo) => (
            <Grid key={photo.id} item xs={12} sm={6} md={4}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  },
                }}
                elevation={3}
              >
                <CardMedia
                  style={{
                    height: 0,
                    paddingTop: "56.25%", // 16:9
                    position: "relative",
                  }}
                  image={photo.imageUrl}
                  title={`Photo by ${photo.artistName}`}
                  onClick={() => handlePhotoClick(photo)}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", textAlign: "center", padding: "8px" }}
                    >
                      {photo.artistName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#fff", textAlign: "center" }}
                    >
                      Uploaded on {photo.uploadDate}
                    </Typography>
                  </div>
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {photo.artistName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Uploaded on {photo.uploadDate}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 16px",
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <IconButton onClick={() => handleLike(photo.id)}>
                    <FavoriteIcon color="primary" />
                  </IconButton>
                  <Typography variant="body2" color="textSecondary">
                    {photo.likes} Likes
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Dialog for displaying selected photo */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg">
          {selectedPhoto && (
            <>
              <DialogTitle>{selectedPhoto.artistName}</DialogTitle>
              <DialogContent sx={{width:"600px",height:"600px"}}>
                <img
                  src={selectedPhoto.imageUrl}
                  alt={`Photo by ${selectedPhoto.artistName}`}
                  style={{ width: "100%", height: "auto", maxWidth: "100%" }}
                />
                <Typography variant="body2" color="textSecondary">
                   {selectedPhoto.uploadDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedPhoto.likes} Likes
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default PhotoPage;


