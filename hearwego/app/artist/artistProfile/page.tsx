"use client";
import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  Container,
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
  ListItemSecondaryAction,
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
import React, { SyntheticEvent, useEffect, useState } from "react";
import Link from "next/link";
import { FaCopy, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
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
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TikTokIcon from "@mui/icons-material/MusicNote";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import ReactCountryFlag from "react-country-flag";
import { countries } from "country-flag-icons";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOutArtist } from "@/lib/features/artist.slice";
import { Formik, Form, Field } from "formik";

import { Artistcover } from "@/app/constants/models";
import DropFile from "@/app/components/DropFile";
import { color } from "framer-motion";
import { ar } from "date-fns/locale";
import dayjs from "dayjs";
import { updateArtist } from "@/app/services/ArtistServices";
import LoadingButton from "@mui/lab/LoadingButton";

interface Platform {
  name: string;
  link: string;
}

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

const contributes = [
  {
    value: "Performer",
    label: "Performer",
  },
  {
    value: "Producer",
    label: "Producer",
  },
  {
    value: "Songwriter",
    label: "Songwriter",
  },
  {
    value: "Instrumentalist",
    label: "Instrumentalist",
  },
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
  const dispatch = useAppDispatch();

  const matches = useMediaQuery("(max-width:960px)");

  const [tabValue, setTabValue] = React.useState(0);

  const [loading, setLoading] = useState(false);

  const artist = useAppSelector((state) => state.artist.user);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const [profilePicture, setProfilePicture] = useState<any>(
    artist?.profilePicture || ""
  );
  // New state for cover photo editing
  const [coverPhoto, setCoverPhoto] = useState<any>(
    artist?.user?.artistCovers[0] || ""
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
  const [artistName, setArtistName] = useState(artist?.artistName || "");
  const [isEditingBio, setIsEditingBio] = useState(false); // State to control bio edit mode
  const [artistBio, setArtistBio] = useState(artist?.artistBio || "");

  // Placeholder function to simulate an API call to save the artist name
  const saveArtistName = (name: string) => {
    console.log("Saving artist name:", name);
    // Implement your API call here
  };

  // Placeholder function to simulate an API call to save the artist bio
  const saveArtistBio = (bio: string) => {
    console.log("Saving artist bio:", bio);
    // Implement your API call here
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    saveArtistName(artistName as string); // Call the save function when saving
  };

  const handleNameChange = (event: any) => {
    setArtistName(event.target.value);
  };

  const handleBioEdit = () => {
    setIsEditingBio(true);
  };

  const handleBioSave = () => {
    setIsEditingBio(false);
    saveArtistBio(artistBio as string); // Call the save function when saving
  };

  const handleBioChange = (event: any) => {
    setArtistBio(event.target.value);
  };

  const handleContributeChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setContribute(value);
  };

  const handleGenreChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setGenre(value);
  };

  const handleLogOut = () => {
    // Implement your log out logic here
    sessionStorage.removeItem("hwg-artist");
    dispatch(logOutArtist());
    location.reload();
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

  const [alias, setAlias] = useState(artist?.alias || "");
  const [email, setEmail] = useState(artist?. email || "");
  // const [address, setAddress] = useState("America");
  const [contribute, setContribute] = useState(artist?.artistProfession);
  const [birthDay, setBirthDay] = useState(artist?.birthDate);
  const [genre, setGenre] = useState(artist?.musicGenres);
  const [gender, setGender] = useState(artist?.gender?.toLowerCase());

  const [selectedCountry, setSelectedCountry] = useState(artist?.user?.country);
  const [artistBankDetails, setArtistBankDetails] = useState({
    bankDetails: {
      accountName: artist?.bankDetails?.accountName,
      accountNumber: artist?.bankDetails?.accountNumber,
      bankName: artist?.bankDetails?.bankName,
      bankBranch: artist?.bankDetails?.bankBranch,
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

  //cover photos
  const [coverphoto, setcoverphoto] = useState<Artistcover>({
    promo_banner: ["", "", ""],
  });

  const [promoBanners, setPromoBanners] = useState<any>([
    artist?.artistCovers?.length > 0 ? artist?.artistCovers[0] : "",
    artist?.artistCovers?.length > 0 ? artist?.artistCovers[1] : "",
    artist?.artistCovers?.length > 0 ? artist?.artistCovers[2] : "",
  ]);

  const submitData = async (values: Artistcover) => {};
  const handleDeletee = (index: number) => {
    const updatedPromoBanners = [...promoBanners];
    updatedPromoBanners[index] = null;
    setPromoBanners(updatedPromoBanners);
  };
  //end

  //social media platform
  const [platform, setPlatform] = useState("YouTube");
  const [link, setLink] = useState<string>();
  const [facebookLink, setFacebookLink] = useState<string>(
    artist?.socialMediaLinks?.facebook
  );
  const [twitterLink, setTwitterLink] = useState<string>(
    artist?.socialMediaLinks?.twitter
  );
  const [instagramLink, setInstagramLink] = useState<string>(
    artist?.socialMediaLinks?.instagram
  );

  const [platforms, setPlatforms] = useState(artist?.user?.socialMediaLinks);

  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform(event.target.value);
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const renderIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return <YouTubeIcon />;
      case "Facebook":
        return <FacebookIcon />;
      case "Twitter":
        return <TwitterIcon />;
      case "Instagram":
        return <InstagramIcon />;
      case "LinkedIn":
        return <LinkedInIcon />;
      case "TikTok":
        return <TikTokIcon />;
      default:
        return null;
    }
  };

  const handleUpdate = () => {
    const data = {
      artistName,
      artistBio,
      alias,
      email,
      artistProfession: contribute,
      birthDate: birthDay,
      musicGenres: genre,
      gender,
      country: selectedCountry,
      bankDetails: artistBankDetails.bankDetails,
      artistCovers: promoBanners,
      profilePicture,
      socialMediaLinks: {
        facebook: facebookLink,
        twitter: twitterLink,
        instagram: instagramLink,
      },
    };

    setLoading(true);
    updateArtist(
      artist?.token as string,
      artist?.user?._id as string,
      data
    ).then((response) => {
      console.log(response);
      setLoading(false);
      window.location.reload();
    });
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

      <Card
        sx={{
          border: "black",
          borderRadius: "5px",
          marginTop: "10px",
          padding: "10px",
        }}
      >
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
          <Typography
            sx={{ marginTop: "10px", marginLeft: "30px" }}
            variant="h5"
            gutterBottom
          >
            Basic Info
          </Typography>
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
              disabled
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
              id="artist-alias"
              label="Alias(other)"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
            />

            <Autocomplete
              freeSolo
              id="contribute"
              multiple
              disableClearable
              options={contributes.map((option) => option.label)}
              defaultValue={contribute}
              onChange={handleContributeChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Profession"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
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
              value={dayjs(birthDay as string).format("YYYY-MM-DD") || ""}
              onChange={(e) => setBirthDay(e.target.value)}
              variant="filled"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Autocomplete
              freeSolo
              id="contribute"
              multiple
              disableClearable
              options={genres.map((option) => option.label)}
              defaultValue={genre}
              onChange={handleGenreChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Genres"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
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
                defaultValue={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
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
                value={selectedCountry === "USA" ? "US" : selectedCountry}
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
        </Box>
      </Card>

      <Card
        sx={{
          border: "black",
          borderRadius: "5px",
          marginTop: "20px",
          padding: "10px",
        }}
      >
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
          <Typography
            sx={{ marginTop: "10px", marginLeft: "30px" }}
            variant="h5"
            gutterBottom
          >
            Bank Details
          </Typography>

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
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
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
            </Box>
          </Box>
        </Box>
      </Card>

      <Card
        sx={{
          border: "black",
          borderRadius: "5px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        <Typography
          sx={{ marginTop: "10px", marginLeft: "27px" }}
          variant="h5"
          gutterBottom
        >
          Cover Photos
        </Typography>
        <Formik initialValues={coverphoto} onSubmit={submitData}>
          <Form>
            <Grid container spacing={3}>
              {promoBanners.map((promoBanner: string, index: number) => (
                <Grid item xs={4} key={index} sx={{ position: "relative" }}>
                  <Field name={`promo_banner.${index}`}>
                    {({ field }: any) => (
                      <>
                        <DropFile
                          fileTypes="image"
                          fileExtensions="jpg, jpeg, png"
                          isCircular={false}
                          width="100%"
                          height="200px"
                          file={promoBanner}
                          setFile={(file) => {
                            const updatedPromoBanners = [...promoBanners];
                            updatedPromoBanners[index] = file;
                            setPromoBanners(updatedPromoBanners);
                          }}
                          aspectX={16}
                          aspectY={9}
                          shape="rect"
                          // style={{
                          //   borderRadius: 10,
                          //   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          // }}
                        />
                        <IconButton
                          aria-label="delete"
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            right: -7,
                          }}
                          onClick={() => handleDeletee(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </Field>
                </Grid>
              ))}
            </Grid>
          </Form>
        </Formik>
      </Card>

      <Card
        sx={{
          border: "black",
          borderRadius: "5px",
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            borderRadius: 2,
            width: "100%",
          }}
        >
          <Typography
            sx={{ marginTop: "10px", marginLeft: "18px" }}
            variant="h5"
            mb={2}
            gutterBottom
          >
            Social media Platforms
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <MenuItem value="Facebook" sx={{ width: "180px" }}>
              <FacebookIcon sx={{ marginRight: 1 }} /> Facebook
            </MenuItem>

            <TextField
              value={facebookLink}
              onChange={(e) => {
                setFacebookLink(e.target.value);
              }}
              variant="outlined"
              fullWidth
              sx={{ flex: 4, color: "white" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <MenuItem value="Twitter" sx={{ width: "180px" }}>
              <TwitterIcon sx={{ marginRight: 1 }} /> Twitter
            </MenuItem>

            <TextField
              value={twitterLink}
              onChange={(e) => {
                setTwitterLink(e.target.value);
              }}
              variant="outlined"
              fullWidth
              sx={{ flex: 4, color: "white" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <MenuItem value="Instagram" sx={{ width: "180px" }}>
              <InstagramIcon sx={{ marginRight: 1 }} /> Instagram
            </MenuItem>
            {/* Add more platforms here if needed */}

            <TextField
              value={instagramLink}
              onChange={(e) => {
                setInstagramLink(e.target.value);
              }}
              variant="outlined"
              fullWidth
              sx={{ flex: 4, color: "white" }}
            />
          </Box>
        </Box>

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
          <Button variant="outlined" color="error" onClick={handleLogOut}>
            Log Out
          </Button>
          <Button variant="outlined">Close</Button>
          <LoadingButton
            loading={loading}
            onClick={handleUpdate}
            variant="contained"
          >
            Save
          </LoadingButton>
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
