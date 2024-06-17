"use client";
// ArtistProfilePage.tsx
import React, { useState } from 'react';
import { Grid, Card, CardContent, Avatar, Typography, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Dummy data
const dummyFans = [
  { id: 1, name: 'Fan 1', profilePicture: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Fan 2', profilePicture: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Fan 3', profilePicture: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Fan 4', profilePicture: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Fan 5', profilePicture: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Fan 6', profilePicture: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Fan 7', profilePicture: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Fan 8', profilePicture: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Fan 9', profilePicture: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Fan 10', profilePicture: 'https://via.placeholder.com/150' },
  { id: 11, name: 'Fan 11', profilePicture: 'https://via.placeholder.com/150' },
  { id: 12, name: 'Fan 12', profilePicture: 'https://via.placeholder.com/150' },
];

interface Fan {
  id: number;
  name: string;
  profilePicture: string;
}

interface ArtistProfileProps {
  initialCoverPhoto: string;
  initialProfilePhoto: string;
  initialArtistName: string;
  initialFollowersCount: number;
  initialBiography: string;
  initialAlbums: string[];
  fans: Fan[];
}

const ArtistProfilePage: React.FC<ArtistProfileProps> = ({
  initialCoverPhoto,
  initialProfilePhoto,
  initialArtistName,
  initialFollowersCount,
  initialBiography,
  initialAlbums,
  fans = dummyFans,
}) => {
  const [coverPhoto, setCoverPhoto] = useState(initialCoverPhoto);
  const [profilePhoto, setProfilePhoto] = useState(initialProfilePhoto);
  const [artistName, setArtistName] = useState(initialArtistName);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);
  const [biography, setBiography] = useState(initialBiography);
  const [albums, setAlbums] = useState(initialAlbums);
  const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoverPhoto(event.target.value);
  };

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(event.target.value);
  };

  const handleArtistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(event.target.value);
  };

  const handleFollowersCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFollowersCount(Number(event.target.value));
  };

  const handleBiographyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBiography(event.target.value);
  };

  const handleAlbumsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAlbums = event.target.value.split(',');
    setAlbums(updatedAlbums);
  };

  const handleSaveChanges = () => {
    // Here you can implement logic to save changes, e.g., send API request
    console.log({
      coverPhoto,
      profilePhoto,
      artistName,
      followersCount,
      biography,
      albums,
    });
    // Replace the console.log with your actual save logic

    setIsEditing(false); // Exit editing mode after saving
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Container maxWidth="md">
      {/* Cover Photo */}
      <div style={{ backgroundImage: `url(${coverPhoto})`, height: '300px', backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '20px' }}>
        {/* Profile Photo and Artist Info */}
        <Container style={{ position: 'relative', paddingTop: '100px', textAlign: 'center', color: 'white' }}>
          <Avatar alt={artistName} src={profilePhoto} style={{ width: '150px', height: '150px', border: '4px solid white', borderRadius: '50%', position: 'absolute', bottom: '-75px', left: '50%', transform: 'translateX(-50%)' }} />
          <Typography variant="h4" gutterBottom>
            {isEditing ? (
              <TextField
                fullWidth
                value={artistName}
                onChange={handleArtistNameChange}
                variant="outlined"
              />
            ) : (
              artistName
            )}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>{followersCount} Followers</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              type="number"
              value={followersCount}
              onChange={handleFollowersCountChange}
              variant="outlined"
            />
          ) : null}
        </Container>
        {!isEditing && (
          <IconButton aria-label="Edit artist details" onClick={handleEditClick} style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}>
            <EditIcon />
          </IconButton>
        )}
      </div>

      {/* Artist Details */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography variant="h5" gutterBottom>Biography</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={biography}
            onChange={handleBiographyChange}
            variant="outlined"
          />
        ) : (
          <Typography variant="body1">{biography}</Typography>
        )}
      </section>

      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography variant="h5" gutterBottom>Albums</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={albums.join(',')}
            onChange={handleAlbumsChange}
            variant="outlined"
          />
        ) : (
          <ul>
            {albums.map((album, index) => (
              <li key={index}>{album}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Fans Section */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography variant="h5" gutterBottom>Fans</Typography>
        <Grid container spacing={2}>
          {fans.slice(0, 10).map((fan, index) => (
            <Grid item key={fan.id} xs={6} sm={3} md={2}>
              <Card>
                <Avatar alt={fan.name} src={fan.profilePicture} style={{ width: '70px', height: '70px', margin: 'auto', marginTop: '10px' }} />
                <CardContent>
                  <Typography variant="body2" align="center">{fan.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {fans.length > 10 && (
          <Button variant="outlined" color="primary" onClick={toggleShowAllFansDialog} style={{ marginTop: '20px' }}>
            See More Fans
          </Button>
        )}

        {/* Dialog for All Fans */}
        <Dialog open={showAllFansDialog} onClose={toggleShowAllFansDialog} fullWidth maxWidth="sm">
          <DialogTitle>All Fans</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {fans.map((fan, index) => (
                <Grid item key={fan.id} xs={6} sm={3} md={2}>
                  <Card>
                    <Avatar alt={fan.name} src={fan.profilePicture} style={{ width: '70px', height: '70px', margin: 'auto', marginTop: '10px' }} />
                    <CardContent>
                      <Typography variant="body2" align="center">{fan.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleShowAllFansDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </section>

      {/* Edit Section */}
      {isEditing && (
        <section style={{ marginTop: '40px', marginBottom: '40px' }}>
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </section>
      )}
    </Container>
  );
};

export default ArtistProfilePage;











