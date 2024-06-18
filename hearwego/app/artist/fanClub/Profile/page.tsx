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

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f0f0f0",
  minHeight: "100vh",
}));

const Banner = styled("div")(({ theme }) => ({
  width: "100%",
  height: "300px",
  backgroundImage: `url(https://via.placeholder.com/800x250)`, // Use your actual banner picture URL here
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "8px 8px 0 0",
  position: "relative",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  border: "1.5px solid white",
  position: "absolute",
  bottom: "-320px",
  left: "50%",
  transform: "translateX(30%)",
}));

const AvatarWithEdit = ({
  profileSrc,
  coverSrc,
  alt,
  onProfilePictureChange,
  onCoverPhotoChange,
}) => (
  <div style={{ position: "relative", display: "inline-block" }}>
    <StyledAvatar src={profileSrc} alt={alt} />
    <Tooltip title="Change cover picture">
      <IconButton
        style={{
          position: "absolute",
          bottom: -300,
          left: 175,
          color: "primary",
        }}
        onClick={onProfilePictureChange}
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
}));

const ArtistInfo = ({ name, fansCount }) => (
  <ArtistInfoContainer>
    <Box
      sx={{
        display: "flex",
        width: "50%",
        flexDirection: "column",
        textAlign: "left",
        padding: "30px",
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

const FanCard = ({ name, picture }) => (
  <FanCardContainer>
    <Avatar
      src={picture}
      alt={name}
      style={{ marginRight: "16px", width: "120px", height: "120px" }}
    />
    <CardContent>
      <Typography variant="h6">{name}</Typography>
    </CardContent>
  </FanCardContainer>
);

const FansSection = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: "8px",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[1],
}));

const ArtistDetails = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: "8px",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[1],
  position: "relative",
  color: "black",
}));

const dummyData = {
  profilePicture: "https://via.placeholder.com/150", // Replace with actual profile picture URL
  bannerPicture: "https://via.placeholder.com/800x250", // Replace with actual banner picture URL
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
  ],
};

const FansModal = ({ fans, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 600,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          All Fans
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {fans.map((fan) => (
            <Grid item xs={6} sm={4} md={3} key={fan.id}>
              <Avatar
                alt={fan.name}
                src={fan.picture}
                sx={{ width: 80, height: 80, marginBottom: 1 }}
              />
              <Typography variant="body2" align="center">
                {fan.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

const ArtistProfile = () => {
  const [artistData, setArtistData] = useState({
    profilePicture: "https://via.placeholder.com/150", // Replace with actual profile picture URL
    bannerPicture: "https://via.placeholder.com/800x250", // Replace with actual banner picture URL
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
      {
        id: 2,
        name: "Sampath Yapa",
        picture: "https://via.placeholder.com/100",
      },
      { id: 3, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
      { id: 4, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
      { id: 5, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
      { id: 6, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
      { id: 7, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
      { id: 8, name: "fjhjhjdhdd", picture: "https://via.placeholder.com/100" },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempProfilePicture, setTempProfilePicture] = useState("");
  const [tempCoverPicture, setTempCoverPicture] = useState("");

  const handleChange = (e) => {
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

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Read selected file and update profile picture state
    const reader = new FileReader();
    reader.onloadend = () => {
      setArtistData((prevData) => ({
        ...prevData,
        profilePicture: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleBannerPhotoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Read selected file and update banner picture state
    const reader = new FileReader();
    reader.onloadend = () => {
      setArtistData((prevData) => ({
        ...prevData,
        bannerPicture: reader.result,
      }));
    };
    reader.readAsDataURL(file);
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
        <Banner style={{ backgroundImage: `url(${bannerPicture})` }}>
          <Tooltip title="Change cover photo">
            <IconButton
              style={{ position: "absolute", bottom: "10px", right: "10px" }}
              onClick={() => {
                document.getElementById("bannerPictureInput").click();
              }}
            >
              <CameraAlt sx={{ color: "primary.default" }} />
            </IconButton>
          </Tooltip>
          <AvatarWithEdit
            profileSrc={profilePicture}
            coverSrc={bannerPicture}
            alt={name}
            onProfilePictureChange={() => {
              document.getElementById("profilePictureInput").click();
            }}
          />
        </Banner>
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
        />
             <input
          id="bannerPictureInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleBannerPhotoChange}
        />

        <ArtistInfo name={name} fansCount={fansCount} />

        <ArtistDetails>
          <Typography variant="h6" gutterBottom>
            Biography
          </Typography>

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
            <Typography variant="body1" paragraph sx={{color:"black"}}>
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
        </ArtistDetails>

        <FansSection>
          <Typography variant="h6" gutterBottom sx={{ color: "black" }}>
            Fans
          </Typography>

          <Grid container spacing={2}>
            {fans.slice(0, 6).map((fan) => (
              <Grid item xs={12} sm={6} md={4} key={fan.id}>
                <FanCard name={fan.name} picture={fan.picture} />
              </Grid>
            ))}
          </Grid>

          {fans.length > 6 && (
            <Button
              onClick={handleOpenModal}
              variant="outlined"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
            >
              See All Fans
            </Button>
          )}

          <FansModal
            fans={fans}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </FansSection>
      </Root>
    </Container>
  );
};

export default ArtistProfile;
