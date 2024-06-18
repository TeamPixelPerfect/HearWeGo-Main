"use client";
import React, { useState } from "react";

import {
  Container,
  Box,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import { CameraAlt, Edit, Save } from "@mui/icons-material";

const dummyData = {
  profilePicture: "https://via.placeholder.com/150",
  bannerPicture: "https://via.placeholder.com/800x250",
  name: "John Doe",
  fansCount: 2500,
  biography:
    "This is a short biography about the artist. It gives a brief overview of their career, achievements, and notable works.",
  socialMedia: {
    twitter: "https://twitter.com/artist",
    instagram: "https://instagram.com/artist",
    facebook: "https://facebook.com/artist",
  },
  fans: [
    {
      id: 1,
      name: "Pramudi Chapa",
      picture: "https://via.placeholder.com/100",
    },
    { id: 2, name: "Sampath Yapa", picture: "https://via.placeholder.com/100" },
    { id: 3, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    { id: 4, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    { id: 5, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    { id: 6, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    { id: 7, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    { id: 8, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    { id: 9, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    { id: 10, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100"}
  ],
};


const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f0f0f0",
  minHeight: "100vh",
}));

const Banner = styled("div")(({ theme }) => ({
  width: "100%",
  height: "300px",
  backgroundImage: `url(${dummyData.bannerPicture})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px 8px 0 0",
  position: "relative",
  cursor: "pointer", // Add cursor pointer to indicate clickability
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  border: "1.5px solid white",
  position: "absolute",
  bottom: "-320px",
  left: "50%",
  transform: "translateX(30%)",
  cursor: "pointer", // Add cursor pointer to indicate clickability
}));

const AvatarWithEdit: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <StyledAvatar src={src} alt={alt} />
    <Tooltip title="Change profile picture">
      <IconButton
        style={{
          position: "absolute",
          bottom: -300,
          left: 175,
          color: "primary",
        }}
      >
        <CameraAlt sx={{ color: "primary.default" }} />
      </IconButton>
    </Tooltip>
  </div>
);

const ArtistInfoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "0 0 8px 8px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: theme.shadows[1],
  cursor: "pointer", // Add cursor pointer to indicate clickability
}));

interface ArtistInfoProps {
  name: string;
  fansCount: number;
}

const ArtistInfo: React.FC<ArtistInfoProps> = ({ name, fansCount }) => (
  <ArtistInfoContainer>
    <Box
      sx={{
        display: "flex",
        width: "50%",
        flexDirection: "column",
        textAlign: "left",
        padding: "5px",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ fontWeight: "bold", color: "black" }}
      >
        {name}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ color: "grey" }}>
        {fansCount} Fans
      </Typography>
    </Box>
  </ArtistInfoContainer>
);

const FanCardContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: "#f0f0f0",
  color: "black",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[1],
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

interface FanCardProps {
  name: string;
  picture: string;
}

const FanCard: React.FC<FanCardProps> = ({ name, picture }) => (
  <FanCardContainer>
    <Avatar src={picture} alt={name} style={{ marginRight: "16px", width: "120px", height: "120px" }} />
    <CardContent>
      <Typography variant="h6">{name}</Typography>
    </CardContent>
  </FanCardContainer>
);

const FansModal = ({ fans, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          All Fans
        </Typography>
        <Grid container spacing={2}>
            {fans.map((fan) => (
              <Grid item xs={12} sm={6} md={6} key={fan.id}>
                <FanCard name={fan.name} picture={fan.picture} />
              </Grid>
            ))}
          </Grid>
          
      </Box>
    </Modal>
  );
};

const ArtistProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [artistData, setArtistData] = useState(dummyData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtistData({
      ...artistData,
      [name]: value,
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    profilePicture,
    bannerPicture,
    name,
    fansCount,
    biography,
    socialMedia,
    fans,
  } = artistData;

  return (
    <Container maxWidth="md">
      <Root>
        <Banner onClick={handleOpenModal}>
          <Tooltip title="Change cover photo">
            <IconButton
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
            >
              <CameraAlt />
            </IconButton>
          </Tooltip>
          <AvatarWithEdit src={profilePicture} alt={name} />
        </Banner>

        <ArtistInfo onClick={handleOpenModal} name={name} fansCount={fansCount} />

        <Box mt={3}>
          <Typography variant="h6">Biography</Typography>
          {isEditing ? (
            <TextField
              name="biography"
              label="Biography"
              multiline
              rows={4}
              value={biography}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          ) : (
            <Typography variant="body1" paragraph>
              {biography}
            </Typography>
          )}
          <IconButton
            onClick={() => setIsEditing(!isEditing)}
            style={{ marginLeft: "90%" }}
          >
            {isEditing ? (
              <Save sx={{ color: "primary.main" }} />
            ) : (
              <Edit sx={{ color: "primary.main" }} />
            )}
          </IconButton>
        </Box>

        <Box mt={3}>
          <Typography variant="h6">Fans</Typography>
          <Grid container spacing={2}>
            {fans.map((fan) => (
              <Grid item xs={12} sm={6} md={4} key={fan.id}>
                <FanCard name={fan.name} picture={fan.picture} />
              </Grid>
            ))}
          </Grid>
          <Button onClick={handleOpenModal} variant="outlined" color="primary">
            See All Fans
          </Button>
        </Box>

        {/* Modal for all fans */}
        <FansModal 
        fans={fans} isOpen={isModalOpen} onClose={handleCloseModal} />
      </Root>
    </Container>
  );
};

export default ArtistProfile;
