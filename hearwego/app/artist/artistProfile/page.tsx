"use client";
import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCopy, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useAppSelector } from "@/lib/hooks";
import {
  ADArtistInfo,
  ADArtistPageUrl,
  ADHomeCoverBox,
  ADHomeName,
  ADHomeNameArea,
  ADHomeProfilePicture,
  ADHomeSocialIcons,
} from "@/app/styles/artistDashboard.styles";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DropArtistPP from "@/app/components/DropArtistPP";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import ReactCountryFlag from "react-country-flag";
import { countries } from "country-flag-icons";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";

interface SocialMediaType {
  label: string;
  logo: string;
}
const initialSocialMediaOptions = [
  {
    label: "Facebook",
    icon: <FacebookIcon />,
    url: "http://www.hearwego.com/wq23s",
  },
  {
    label: "Twitter",
    icon: <TwitterIcon />,
    url: "http://www.hearwego.com/wq23s",
  },
  {
    label: "LinkedIn",
    icon: <LinkedInIcon />,
    url: "http://www.hearwego.com/wq23s",
  },
  {
    label: "Instagram",
    icon: <InstagramIcon />,
    url: "http://www.hearwego.com/wq23s",
  },
];

const socialMediaOptions = [
  { label: "Facebook", icon: <FacebookIcon /> },
  { label: "Twitter", icon: <TwitterIcon /> },
  { label: "Instagram", icon: <InstagramIcon /> },
  { label: "LinkedIn", icon: <LinkedInIcon /> },
];

const genres = [
  {
    value: "Hip Pop",
    label: "Hip Pop",
  },
  {
    value: "Pop",
    label: "Pop",
  },
  {
    value: "Rock",
    label: "Rock",
  },
  {
    value: "Classical",
    label: "Classical",
  },
  {
    value: "Reggae",
    label: "Reggae",
  },
  {
    value: "Country",
    label: "Country",
  },
  {
    value: "Electronic",
    label: "Electronic",
  },
  {
    value: "Hip Hop",
    label: "Hip Hop",
  },
  {
    value: "Jazz",
    label: "Jazz",
  },
  {
    value: "R&B (Rhythm and Blues)",
    label: "R&B (Rhythm and Blues)",
  },
  {
    value: "Metal",
    label: "Metal",
  },
];

const ADHomePage = () => {
  const matches = useMediaQuery("(max-width:960px)");

  const [profilePic, setProfilePic] = useState<string>(
    // "https://placehold.co/600x600/png"
    "https://www.rollingstone.com/wp-content/uploads/2021/05/rembrandts-flashback.jpg"
  );
  const [coverPic, setCoverPic] = useState<string>(
    // "https://placehold.co/1280x720/png"
    "https://.com/wp-content/uploads/2019/07/The-Rembrandts-Via-Satellite-2.jpg"
  );

  const [tabValue, setTabValue] = React.useState(0);
  const artist = useAppSelector((state) => state.artist.user);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const [profilePicture, setProfilePicture] = useState<any>(null);
  // New state for cover photo editing
  const [coverPhoto, setCoverPhoto] = useState<string>(
    "https://www.profilerehab.com/facebook_covers/hearts/tree_heart_cover_1.jpg"
  );

  const handleCoverPhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setCoverPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCoverPhotoRemove = () => {
    setCoverPhoto("");
  };

  const [isEditingName, setIsEditingName] = useState(false); // State to control edit mode
  const [artistName, setArtistName] = useState(artist?.user.artistName || "");
  const [isEditingBio, setIsEditingBio] = useState(false); // State to control bio edit mode
  const [artistBio, setArtistBio] = useState(artist?.user.artistBio || "");

  // Placeholder function to simulate an API call to save the artist name
  const saveArtistName = (name) => {
    console.log("Saving artist name:", name);
    // Implement your API call here
  };

  // Placeholder function to simulate an API call to save the artist bio
  const saveArtistBio = (bio) => {
    console.log("Saving artist bio:", bio);
    // Implement your API call here
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    saveArtistName(artistName); // Call the save function when saving
  };

  const handleNameChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleBioEdit = () => {
    setIsEditingBio(true);
  };

  const handleBioSave = () => {
    setIsEditingBio(false);
    saveArtistBio(artistBio); // Call the save function when saving
  };

  const handleBioChange = (event) => {
    setArtistBio(event.target.value);
  };

  //social media profile
  const [profiles, setProfiles] = useState<
    { id: number; label: string; icon: React.ReactNode; url: string }[]
  >([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [webAddress, setWebAddress] = useState("");

  const handleAddProfile = () => {
    if (selectedProfile && webAddress) {
      const selectedOption = socialMediaOptions.find(
        (option) => option.label === selectedProfile
      );
      if (selectedOption) {
        const newProfile = {
          id: Date.now(),
          label: selectedOption.label,
          icon: selectedOption.icon,
          url: webAddress,
        };
        setProfiles([...profiles, newProfile]);
        setWebAddress("");
      }
    }
  };

  const handleDeleteProfile = (id: number) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
  };

  const [alias, setAlias] = useState("Jone");
  const [email, setEmail] = useState("maroon5@gmail.com");
  const [address, setAddress] = useState("America");
  const [contribute, setContribute] = useState("Writer");
  const [birthDay, setBirthDay] = useState("1999-03-12");
  const [genre, setGenre] = useState("Hip Pop");

  const [selectedCountry, setSelectedCountry] = useState<string>("LK");
  const [artistBankDetails, setArtistBankDetails] = useState({
    bankDetails: {
      accountName: "John Doe",
      accountNumber: "123456789",
      bankName: "Bank of Example",
      bankBranch: "Main Branch",
    },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [socialMediaOptions, setSocialMediaOptions] = useState(
    initialSocialMediaOptions
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleSelect = (label: string) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((item) => item !== label)
        : [...prevSelected, label]
    );
  };

  const handleDeleteSelected = () => {
    setSocialMediaOptions((prevOptions) =>
      prevOptions.filter((option) => !selectedOptions.includes(option.label))
    );
    setSelectedOptions([]);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
    setSelectedOptions([]);
  };

  
  const handleDelete = (label: string) => {
    setSocialMediaOptions((prevOptions) =>
      prevOptions.filter((option) => option.label !== label)
    );
  };

  return (
    <>
      <Grid container sx={{ width: "100%", margin: 0 }}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ height: matches ? "600px" : "400px", margin: "0" }}
        >
          <ADHomeCoverBox
            imgUrl={coverPhoto}
            sx={{ position: "relative" }} // Ensure the cover box is positioned relative
          >
            {/* New buttons for editing cover photo */}
            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="cover-photo-input"
                type="file"
                onChange={handleCoverPhotoChange}
              />
              <label htmlFor="cover-photo-input">
                <IconButton component="span">
                  <EditIcon sx={{ color: "white" }} />
                </IconButton>
              </label>
              <IconButton onClick={handleCoverPhotoRemove}>
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>

              <IconButton
                aria-label="more options"
                aria-controls="more-options-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon sx={{ color: "white" }} />
              </IconButton>
              <Menu
                id="more-options-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "more-options-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Settings & privacy" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <HelpIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Help & support" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Brightness4Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Display & accessibility" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <FeedbackIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Give feedback" />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </MenuItem>
              </Menu>
            </Box>
            <ADHomeNameArea>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DropArtistPP
                  fileTypes="Profile Picture"
                  fileExtensions="PNG,JPEG,WEBP"
                  isCircular={true}
                  width="200px"
                  height="200px"
                  file={profilePicture}
                  setFile={setProfilePicture}
                  aspectX={1}
                  aspectY={1}
                  shape="round"
                />
                <Box
                  sx={
                    !matches
                      ? { ml: 3 }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }
                  }
                >
                  {isEditingName ? ( // Render input field when editing
                    <TextField
                      id="artist-name"
                      value={artistName}
                      onChange={handleNameChange}
                      variant="standard"
                      size="medium"
                      color="secondary"
                      onBlur={handleNameSave} // Save the name when the input loses focus
                      InputProps={{
                        sx: {
                          color: "white", // Change text color to white
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "white", // Change underline color to white
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "white", // Change underline color to white after focus
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "white", // Change label color to white
                        },
                      }}
                    />
                  ) : (
                    <>
                      <Typography style={{ color: "white" }} variant="h3">
                        {artistName}
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={handleNameEdit}
                        >
                          <EditIcon />
                        </IconButton>
                      </Typography>
                    </>
                  )}

                  {isEditingBio ? (
                    <TextField
                      id="artist-bio"
                      value={artistBio}
                      onChange={handleBioChange}
                      variant="outlined"
                      size="small"
                      multiline
                      rows={3}
                      onBlur={handleBioSave} // Save the bio when the input loses focus
                      fullWidth
                      InputProps={{
                        sx: {
                          color: "white", // Change text color to white
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white", // Change border color to white
                            },
                            "&:hover fieldset": {
                              borderColor: "white", // Change border color to white on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white", // Change border color to white when focused
                            },
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "white", // Change label color to white
                        },
                      }}
                    />
                  ) : (
                    <>
                      <ADArtistInfo>
                        {artistBio.split(".")[0]}
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={handleBioEdit}
                        >
                          <EditIcon />
                        </IconButton>
                      </ADArtistInfo>
                    </>
                  )}
                  <ADArtistPageUrl>
                    <Link href="">http://www.hearwego.com/wq23s</Link>
                    <FaCopy />
                  </ADArtistPageUrl>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#fff",
                      fontWeight: "600",
                      mb: 0,
                      fontSize: "20px",
                    }}
                  >
                    22,522,155
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    Followers
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: matches ? "center" : "flex-end",
                  mr: matches ? 0 : 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: matches ? "center" : "flex-start",
                    justifyContent: matches ? "center" : "flex-start",
                  }}
                ></Box>
              </Box>
            </ADHomeNameArea>
          </ADHomeCoverBox>
        </Grid>
      </Grid>

      <Card sx={{ border: "black", borderRadius: "5px", marginTop: "10px" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "60ch" },
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-evenly",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              id="artist-alias"
              label="Alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
            />

            <TextField
              id="artist-email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              id="artist-address"
              label="Alias(other)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
            />

            <TextField
              id="artist-contribution"
              label="Contribution"
              value={contribute}
              onChange={(e) => setContribute(e.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              id="artist-birthday"
              label="Birthday"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              id="genre"
              select
              label="Genre"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
              sx={{ width: "60ch" }}
            >
              {genres.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <FormControl sx={{ m: 1 }}>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <FormControl
              sx={{
                m: 1,
                minWidth: 80,
                width: "20%",
              }}
            >
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                variant="outlined"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                sx={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    <ReactCountryFlag
                      countryCode={country}
                      svg
                      style={{
                        width: "1.0em",
                        height: "1.0em",
                        marginRight: "8px",
                      }}
                      title={country}
                    />
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60ch",
                marginLeft: "30px",
              }}
            >
              <Typography
                sx={{ marginTop: "10px", marginLeft: "10px" }}
                variant="h5"
                gutterBottom
              >
                Bank Details
              </Typography>
              <TextField
                id="bank-account-name"
                label="Bank Account Name"
                variant="filled"
                style={{ boxSizing: "initial" }}
                value={artistBankDetails.bankDetails.accountName}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      accountName: e.target.value,
                    },
                  });
                }}
              />

              <TextField
                id="bank-account-no"
                label="Bank Account Number"
                variant="filled"
                style={{ boxSizing: "initial" }}
                value={artistBankDetails.bankDetails.accountNumber}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      accountNumber: e.target.value,
                    },
                  });
                }}
              />

              <TextField
                id="bank"
                label="Bank"
                variant="filled"
                style={{ boxSizing: "initial" }}
                value={artistBankDetails.bankDetails.bankName}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      bankName: e.target.value,
                    },
                  });
                }}
              />

              <TextField
                id="bank-branch"
                label="Bank Branch"
                variant="filled"
                style={{ boxSizing: "initial" }}
                value={artistBankDetails.bankDetails.bankBranch}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      bankBranch: e.target.value,
                    },
                  });
                }}
              />
            </form>
          </Box>
        </Box>
      </Card>
      <Card sx={{ border: "black", borderRadius: "5px", marginTop: "10px" }}>
        <Typography
          sx={{ marginTop: "10px", marginLeft: "10px" }}
          variant="h5"
          gutterBottom
        >
          Cover Photos
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "20px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <img
              src="https://www.profilerehab.com/facebook_covers/hearts/tree_heart_cover_1.jpg"
              alt="Example"
              style={{ width: "300px" }}
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ display: "flex" }}>
            <img
              src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2022/08/making_album_create_cover.jpg"
              alt="Example"
              style={{ width: "300px" }}
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ display: "flex" }}>
            <img
              src="https://fiverr-res.cloudinary.com/videos/so_0.116681,t_main1,q_auto,f_auto/y5hg5qbfdyd8oquq7nom/create-unique-cover-art-for-your-music-album-ep-or-single.png"
              alt="Example"
              style={{ width: "300px" }}
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Card>
      <Card sx={{ border: "black", borderRadius: "5px", marginTop: "10px" }}>
        <Typography
          sx={{ marginTop: "10px", marginLeft: "10px" }}
          variant="h5"
          gutterBottom
        >
          Social media
          <IconButton onClick={toggleEditMode} aria-label="edit">
        <EditIcon />
      </IconButton>
        </Typography>
        <div>
         <div>
     
      <List>
        {socialMediaOptions.map((option) => (
          <div key={option.label}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <ListItemIcon sx={{ marginLeft: "20px" }}>
                  {option.icon}
                </ListItemIcon>
              </Grid>
              <Grid item xs>
                <ListItemText
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  primary={
                    <Typography variant="body1" component="span">
                      {option.label}
                    </Typography>
                  }
                  secondary={
                    <Link
                      style={{ marginLeft: "10px" }}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {option.url}
                    </Link>
                  }
                />
              </Grid>
              {isEditMode && (
                <Grid item>
                  <Checkbox
                    checked={selectedOptions.includes(option.label)}
                    onChange={() => handleSelect(option.label)}
                    inputProps={{ 'aria-label': option.label }}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        ))}
      </List>
      {isEditMode && selectedOptions.length > 0 && (
        <Button sx={{marginLeft:'10px'}}
          variant="contained"
          
          startIcon={<DeleteIcon />}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      )}
    </div>
          {profiles.map((profile) => (
            <div key={profile.id}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <ListItemIcon sx={{ marginLeft: "20px" }}>
                    {profile.icon}
                  </ListItemIcon>
                </Grid>
                <Grid item xs>
                  <ListItemText
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    primary={profile.label}
                    secondary={
                      <a
                        style={{ marginLeft: "10px" }}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profile.url}
                      </a>
                    }
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{ marginRight: "9px" }}
                    onClick={() => handleDeleteProfile(profile.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ))}
          <Typography
            sx={{ marginTop: "10px", marginLeft: "10px" }}
            variant="h5"
            gutterBottom
          >
            Add New Social media
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Autocomplete
              options={socialMediaOptions.map((option) => option.label)}
              value={selectedProfile}
              onChange={(event, newValue) => setSelectedProfile(newValue)}
              sx={{ width: 100, marginLeft: "20px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Social Media"
                  variant="outlined"
                />
              )}
            />
            <TextField
              label="Web Address"
              variant="outlined"
              value={webAddress}
              onChange={(e) => setWebAddress(e.target.value)}
              sx={{ marginLeft: "80px", width: "800px" }}
            />
          </Box>
          <Box></Box>
          <Button
            sx={{ marginTop: "20px", marginLeft: "20px" }}
            variant="contained"
            color="primary"
            onClick={handleAddProfile}
          >
            Add Social Profile
          </Button>
        </div>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            marginTop: "20px",
            marginRight: "30px",
          }}
        >
          <Button variant="outlined">Close</Button>
          <Button variant="contained">Save</Button>
        </Stack>
      </Card>
    </>
  );
};

export default ADHomePage;
function setSelectedDay(date: any) {
  throw new Error("Function not implemented.");
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
