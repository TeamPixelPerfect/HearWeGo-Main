"use client";
// ArtistProfilePage.tsx
import React, { useState } from 'react';
import { Grid, Card, CardContent, Avatar, Typography, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

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
  coverPhoto: string;
  profilePhoto: string;
  artistName: string;
  followersCount: number;
  biography: string;
  albums: string[];
  fans: Fan[];
}

const ArtistProfilePage: React.FC<ArtistProfileProps> = ({
  coverPhoto: initialCoverPhoto,
  profilePhoto,
  artistName,
  followersCount,
  biography,
  albums,
  fans = dummyFans,
}) => {
  const [coverPhoto, setCoverPhoto] = useState(initialCoverPhoto);
  const [showAllFansDialog, setShowAllFansDialog] = useState(false);
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);

  const toggleShowAllFansDialog = () => {
    setShowAllFansDialog(!showAllFansDialog);
  };

  const handleFanClick = (fan: Fan) => {
    setSelectedFan(fan);
  };

  const handleCloseDialog = () => {
    setSelectedFan(null);
  };

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newCoverPhoto = URL.createObjectURL(event.target.files[0]);
      setCoverPhoto(newCoverPhoto);
    }
  };

  return (
    <Container maxWidth="md">
      {/* Cover Photo */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <div style={{ backgroundImage: `url(${coverPhoto})`, height: '300px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="cover-photo-upload"
            type="file"
            onChange={handleCoverPhotoChange}
          />
          <label htmlFor="cover-photo-upload" style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        {/* Profile Photo and Artist Info */}
        <Container style={{ position: 'relative', paddingTop: '100px', textAlign: 'center', color: 'white' }}>
          <Avatar alt={artistName} src={profilePhoto} style={{ width: '150px', height: '150px', border: '4px solid white', borderRadius: '50%', position: 'absolute', bottom: '-75px', left: '50%', transform: 'translateX(-50%)' }} />
          <Typography variant="h4" gutterBottom>{artistName}</Typography>
          <Typography variant="subtitle1" gutterBottom>{followersCount} Followers</Typography>
        </Container>
      </div>

      {/* Artist Details */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography variant="h5" gutterBottom>Biography</Typography>
        <Typography variant="body1">{biography}</Typography>
      </section>

      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography variant="h5" gutterBottom>Albums</Typography>
        <ul>
          {albums.map((album, index) => (
            <li key={index}>{album}</li>
          ))}
        </ul>
      </section>

      {/* Fans Section */}
      <section style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography variant="h5" gutterBottom>Fans</Typography>
        <Grid container spacing={2}>
          {fans.slice(0, 10).map((fan) => (
            <Grid item key={fan.id} xs={6} sm={3} md={2}>
              <Card>
                <Avatar alt={fan.name} src={fan.profilePicture} style={{ width: '70px', height: '70px', margin: 'auto', marginTop: '10px' }} onClick={() => handleFanClick(fan)} />
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

        {/* Dialog for Selected Fan */}
        <Dialog open={!!selectedFan} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{selectedFan?.name}</DialogTitle>
          <DialogContent>
            <Avatar alt={selectedFan?.name} src={selectedFan?.profilePicture} style={{ width: '150px', height: '150px', margin: 'auto', marginBottom: '20px' }} />
            <Typography variant="body1" align="center">{selectedFan?.name}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </Container>
  );
};

// Example usage
const ExampleArtistProfile: React.FC = () => {
  const artistProfile = {
    coverPhoto: 'https://via.placeholder.com/1200x300',
    profilePhoto: 'https://via.placeholder.com/150',
    artistName: 'Sample Artist',
    followersCount: 1000,
    biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula leo quis magna iaculis convallis.',
    albums: ['Album 1', 'Album 2', 'Album 3'],
  };

  return (
    <ArtistProfilePage
      coverPhoto={artistProfile.coverPhoto}
      profilePhoto={artistProfile.profilePhoto}
      artistName={artistProfile.artistName}
      followersCount={artistProfile.followersCount}
      biography={artistProfile.biography}
      albums={artistProfile.albums}
      fans={dummyFans} // Replace with actual fan data
    />
  );
};

export default ExampleArtistProfile;







