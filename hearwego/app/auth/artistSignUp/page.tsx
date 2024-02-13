"use client";
import {
  AuthBioField,
  AuthCheckBox,
  AuthContainer,
  AuthGenreBox,
  AuthOTPDigitBox,
  AuthSocialIcon,
  AuthSocialInputBox,
  AuthSocialTextField,
  AuthTextField,
} from "@/app/styles/auth.styles";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
import { MdOutlineGroup } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { IoMdMicrophone } from "react-icons/io";
import { FaCompactDisc } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { GiGuitar } from "react-icons/gi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { countries } from "country-flag-icons";
import ReactCountryFlag from "react-country-flag";
import DropFile from "@/app/components/DropFile";
import OtpInput from "react-otp-input";
import { IoPlaySkipForwardCircle } from "react-icons/io5";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import PublicIcon from "@mui/icons-material/Public";
import { GiPartyPopper } from "react-icons/gi";
import { TypeSpecimenOutlined } from "@mui/icons-material";

const ArtistSignUp = () => {
  // Sign up stage
  const [step, setStep] = useState<number>(0);

  // Artist type
  const [type, setType] = useState<string>("");

  // Genres
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Professions
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);

  // Country
  const [selectedCountry, setSelectedCountry] = useState<string>("LK");

  // Verification Documents
  const [verDoc, setVerDoc] = useState<any>(null);

  // Profile Picture
  const [profilePicture, setProfilePicture] = useState<any>(null);

  // Cover Photos
  const [coverPhoto1, setCoverPhoto1] = useState<any>(null);
  const [coverPhoto2, setCoverPhoto2] = useState<any>(null);
  const [coverPhoto3, setCoverPhoto3] = useState<any>(null);

  // OTP
  const [otp, setOtp] = useState("");

  // Genres list TODO: Fetch from API
  const [genres, setGenres] = React.useState<string[]>([
    "Pop",
    "Rock",
    "Hip-Hop",
    "R&B",
    "Country",
    "Electronic",
    "Jazz",
    "Classical",
    "World Music",
  ]);

  // Artist details
  const [artistDetails, setArtistDetails] = React.useState({
    artistName: "",
    alias: "",
    otherAliases: [""],
    artistType: "",
    musicGenres: [""],
    artistProfession: [""],
    mobileNumber: "",
    country: "",
    birthDate: "",
    verificationDocuments: [""],
    artistCovers: [""],
    artistBio: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
    webUrl: "",
    bankDetails: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      bankBranch: "",
      country: "",
    },
  });

  // Error Handling for Inputs
  const [artistNameError, setArtistNameError] = useState(false);
  const [artistTypeError, setArtistTypeError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [verificationDocumentError, setVerificationDocumentError] = useState(false);

  // Increment Sign up stage (Next button)
  const incrementStep = (step: number) => {
    setStep((current) => current + step);
  };

  // Decrement Sign up stage (Back button)
  const decrementStep = (step: number) => {
    setStep((current) => current - step);
  };

  // Check if the selected type is the current type
  const checkType = (selectedType: string) => {
    if (selectedType === type) return true;
    return;
  };

  // Handle artist type select
  const handleArtistTypeSelect = (selectedType: string) => {
    setArtistTypeError(false);
    setType(selectedType);
  }

  // Check if the selected genre is in the selected genres list
  const checkGenre = (selectedGenre: string) => {
    if (selectedGenres.includes(selectedGenre)) {
      return true;
    }
    return;
  };

  // Check if the selected profession is in the selected professions list
  const checkProfession = (selectedProfession: string) => {
    if (selectedProfessions.includes(selectedProfession)) {
      return true;
    }
    return;
  };

  // If genre is selected, add to the list, else remove from the list
  const handleGenreSelect = (selectedGenre: string) => {
    if (selectedGenres.includes(selectedGenre)) {
      setSelectedGenres(
        selectedGenres.filter((genre) => genre !== selectedGenre)
      );
    } else {
      setGenreError(false);
      setSelectedGenres([...selectedGenres, selectedGenre]);
    }
  };

  // If profession is selected, add to the list, else remove from the list
  const handleProfessionSelect = (selectedProfession: string) => {
    if (selectedProfessions.includes(selectedProfession)) {
      setSelectedProfessions(
        selectedProfessions.filter((prof) => prof !== selectedProfession)
      );
    } else {
      setProfessionError(false);
      setSelectedProfessions([...selectedProfessions, selectedProfession]);
    }
  };

  // Handle country change
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

  // Handle Sign up stage by stage
  const handleStageOne = () => {
    if (artistDetails.artistName === "") {
      setArtistNameError(true);
      return;
    }
    setArtistNameError(false);
    incrementStep(1);
  }

  const handleStageTwo = () => {
    if (type === "") {
      setArtistTypeError(true);
      return;
    }
    setArtistDetails({ ...artistDetails, artistType: type });
    setArtistTypeError(false);
    incrementStep(1);
  }

  const handleStageThree = () => {
    if (selectedGenres.length === 0) {
      setGenreError(true);
      return;
    }
    setArtistDetails({ ...artistDetails, musicGenres: selectedGenres });
    setGenreError(false);
    incrementStep(1);
  }

  const handleStageFive = () => {
    if (selectedProfessions.length === 0) {
      setProfessionError(true);
      return;
    }
    setArtistDetails({ ...artistDetails, artistProfession: selectedProfessions });
    setProfessionError(false);
    incrementStep(1);
  }

  const handleStageSix = () => {
    if(artistDetails.email === ""){
      setEmailError(true);
      return;
    }
    if(artistDetails.password === ""){
      setPasswordError(true);
      return;
    }
    if(artistDetails.confirmPassword === ""){
      setConfirmPasswordError(true);
      return;
    }
    if(artistDetails.mobileNumber === ""){
      setMobileNumberError(true);
      return;
    }
    if(selectedCountry === ""){
      setArtistDetails({ ...artistDetails, country: selectedCountry });
      setCountryError(true);
      return;
    }
    if (artistDetails.password !== artistDetails.confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setMobileNumberError(false);
    setCountryError(false);
    setPasswordMismatchError(false);
    incrementStep(1);
  }

  return (
    <AuthContainer>
      <Stack sx={{ width: "100%", padding: "12px" }}>
        <CloseIcon
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "2rem",
            cursor: "pointer",
            alignSelf: "flex-end",
          }}
        />
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "nowrap",
          transform: `translateX(-${step * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        <Box
          id="as-step-1"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // background: "magenta",
          }}
        >
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: "700" }}>
            Welcome
          </Typography>
          <Typography variant="h5" sx={{ color: "#A5B4FC" }}>
            You’re going to join HearWeGo as an Artist!
          </Typography>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            endIcon={<ArrowCircleRightIcon />}
            sx={{
              marginTop: "30px",
              textTransform: "capitalize",
              padding: "16px 48px",
            }}
            onClick={() => incrementStep(1)}
          >
            Get Started
          </Button>
          <Typography variant="body1" sx={{ color: "#fff", marginTop: "40px" }}>
            Already have an account?{" "}
            <Link href="#" style={{ color: "#C084FC" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
        <Box
          id="as-step-2"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Let's begin by introducing <br></br> yourself!
          </Typography>
          <AuthTextField
            id="artist-name"
            label="Artist Name*"
            variant="outlined"
            color={artistNameError?"error":"primary"}
            defaultValue={artistDetails.artistName}
            onChange={(e) => {setArtistDetails({ ...artistDetails, artistName: e.target.value })}}
            inputRef={input => input && artistNameError && input.focus()}
            style={{ boxSizing: "initial" }}
          />
          <AuthTextField
            id="alias"
            label="Alias*"
            variant="outlined"
            style={{ boxSizing: "initial" }}
          />
          <AuthTextField
            id="alias"
            label="Other Alias(es)"
            variant="outlined"
            style={{ boxSizing: "initial" }}
          />
          <Stack spacing={1} direction="row" width="40%">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                fontSize: "12px",
                color: "#000",
                fontWeight: "600",
                padding: "4px 8px",
                borderRadius: "8px",
              }}
            >
              Alias 1
              <CloseIcon
                sx={{
                  color: "#000",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginLeft: "8px",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                fontSize: "12px",
                color: "#000",
                fontWeight: "600",
                padding: "4px 8px",
                borderRadius: "8px",
              }}
            >
              Alias 2
              <CloseIcon
                sx={{
                  color: "#000",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginLeft: "8px",
                }}
              />
            </Box>
          </Stack>
          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={handleStageOne}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-3"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Which describes you best?
          </Typography>

          <Box
            sx={{
              display: "flex",
              margin: "30px 0",
              width: "70%",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <AuthCheckBox
              id="solo"
              style={
                checkType("solo") && { background: "rgba(255,255,255,0.4" }
              }
              onClick={() => handleArtistTypeSelect("solo")}
            >
              <Stack
                width={"100%"}
                style={
                  checkType("solo") ? { display: "block" } : { display: "none" }
                }
              >
                <CheckCircleIcon
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                />
              </Stack>
              <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                Solo
              </Typography>
              <FaPerson style={{ fontSize: "40px", color: "#fff" }} />
            </AuthCheckBox>
            <AuthCheckBox
              id="duo"
              style={checkType("duo") && { background: "rgba(255,255,255,0.4" }}
              onClick={() => handleArtistTypeSelect("duo")}
            >
              <Stack
                width={"100%"}
                style={
                  checkType("duo") ? { display: "block" } : { display: "none" }
                }
              >
                <CheckCircleIcon
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                />
              </Stack>
              <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                Duo
              </Typography>
              <MdOutlineGroup style={{ fontSize: "40px", color: "#fff" }} />
            </AuthCheckBox>
            <AuthCheckBox
              id="group"
              style={
                checkType("group") && { background: "rgba(255,255,255,0.4" }
              }
              onClick={() => handleArtistTypeSelect("group")}
            >
              <Stack
                width={"100%"}
                style={
                  checkType("group")
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <CheckCircleIcon
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                />
              </Stack>
              <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                Group
              </Typography>
              <MdGroups style={{ fontSize: "40px", color: "#fff" }} />
            </AuthCheckBox>
          </Box>

          <Typography color="error">
            {artistTypeError && ("Please select an artist type!")}
          </Typography>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={handleStageTwo}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-4"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              // marginBottom: "10px",
            }}
          >
            What is your music genre?
          </Typography>

          <Typography variant="subtitle1" sx={{ color: "#fff", marginTop: 0 }}>
            Choose up to 3*
          </Typography>

          <Box
            sx={{
              display: "flex",
              margin: "30px 0",
              width: "70%",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {genres.length > 0 &&
              genres.map((genre) => {
                return (
                  <AuthGenreBox
                    style={
                      checkGenre(genre) && {
                        background: "rgba(255,255,255,0.4",
                      }
                    }
                    onClick={() => {
                      handleGenreSelect(genre);
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                      {genre}
                    </Typography>
                  </AuthGenreBox>
                );
              })}
          </Box>

          <Typography color="error">
            {genreError && ("Please select at lease one genre!")}
          </Typography>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={handleStageThree}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-5"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            How do you contribute to Music?
          </Typography>

          <Box
            sx={{
              display: "flex",
              margin: "30px 0",
              width: "70%",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <AuthCheckBox
              id="performer"
              style={
                checkProfession("performer") && {
                  background: "rgba(255,255,255,0.4",
                }
              }
              onClick={() => handleProfessionSelect("performer")}
            >
              <Stack
                width={"100%"}
                style={
                  checkProfession("performer")
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <CheckCircleIcon
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                />
              </Stack>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", marginBottom: "10px" }}
              >
                Performer
              </Typography>
              <IoMdMicrophone style={{ fontSize: "40px", color: "#fff" }} />
            </AuthCheckBox>
            <AuthCheckBox
              id="producer"
              style={
                checkProfession("producer") && {
                  background: "rgba(255,255,255,0.4",
                }
              }
              onClick={() => handleProfessionSelect("producer")}
            >
              <Stack
                width={"100%"}
                style={
                  checkProfession("producer")
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <CheckCircleIcon
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                />
              </Stack>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", marginBottom: "10px" }}
              >
                Producer
              </Typography>
              <FaCompactDisc style={{ fontSize: "40px", color: "#fff" }} />
            </AuthCheckBox>
            <AuthCheckBox
              id="songwriter"
              style={
                checkProfession("songwriter") && {
                  background: "rgba(255,255,255,0.4",
                }
              }
              onClick={() => handleProfessionSelect("songwriter")}
            >
              <Stack
                width={"100%"}
                style={
                  checkProfession("songwriter")
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <CheckCircleIcon
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                />
              </Stack>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", marginBottom: "10px" }}
              >
                Songwriter
              </Typography>
              <FaPenNib style={{ fontSize: "40px", color: "#fff" }} />
            </AuthCheckBox>
            <AuthCheckBox
              id="instrumentalist"
              style={
                checkProfession("instrumentalist") && {
                  background: "rgba(255,255,255,0.4",
                }
              }
              onClick={() => handleProfessionSelect("instrumentalist")}
            >
              <Stack
                width={"100%"}
                style={
                  checkProfession("instrumentalist")
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                <CheckCircleIcon
                  style={{
                    fontSize: "25px",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                />
              </Stack>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", marginBottom: "10px" }}
              >
                Instrumentalist
              </Typography>
              <GiGuitar style={{ fontSize: "40px", color: "#fff" }} />
            </AuthCheckBox>
          </Box>

          <Typography color="error">
            {professionError && ("Please select at lease one profession!")}
          </Typography>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={handleStageFive}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-6"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Create the Account
          </Typography>
          <AuthTextField
            id="email"
            label="Email*"
            variant="outlined"
            type="email"
            color={emailError?"error":"primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={artistDetails.email}
            onChange={(e) => {setArtistDetails({ ...artistDetails, email: e.target.value })}}
            inputRef={input => input && emailError && input.focus()}
          />
          <AuthTextField
            id="password"
            label="Password*"
            variant="outlined"
            type="password"
            color={passwordError?"error":"primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={artistDetails.password}
            onChange={(e) => {setArtistDetails({ ...artistDetails, password: e.target.value })}}
            inputRef={input => input && passwordError && input.focus()}
          />
          <AuthTextField
            id="confirm-password"
            label="Confirm Password*"
            variant="outlined"
            type="password"
            color={confirmPasswordError?"error":"primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={artistDetails.confirmPassword}
            onChange={(e) => {setArtistDetails({ ...artistDetails, confirmPassword: e.target.value })}}
            inputRef={input => input && (confirmPasswordError||passwordMismatchError) && input.focus()}
          />

          <Stack
            direction="row"
            sx={{
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                <ReactCountryFlag
                  countryCode={selectedCountry}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "8px",
                  }}
                  title={selectedCountry}
                />
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="country"
                value={artistDetails.country}
                onChange={handleCountryChange}
                // autoWidth
                label="Country"
                color={countryError?"error":"primary"}
                sx={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  margin: "0",
                }}
                defaultValue={selectedCountry}
                inputRef={input => input && countryError && input.focus()}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map((country) => {
                  return (
                    <MenuItem value={country}>
                      <ReactCountryFlag
                        countryCode={country}
                        svg
                        style={{
                          width: "1.5em",
                          height: "1.5em",
                          marginRight: "8px",
                        }}
                        title={country}
                      />
                      {country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <AuthTextField
              id="phone"
              label="Mobile Number*"
              variant="outlined"
              type="number"
              color={mobileNumberError?"error":"primary"}
              style={{ boxSizing: "initial", width: "100%" }}
              defaultValue={artistDetails.mobileNumber}
              onChange={(e) => {setArtistDetails({ ...artistDetails, mobileNumber: e.target.value })}}
              inputRef={input => input && mobileNumberError && input.focus()}
            />
          </Stack>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={handleStageSix}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-7"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              // marginBottom: "0px",
            }}
          >
            Are you real?
          </Typography>

          <Typography
            variant="body1"
            sx={{ textAlign: "center", width: "80%" }}
          >
            <em>
              Please submit your NIC, Passport, Driving License or another
              document which can be used prove your identity*{" "}
            </em>
          </Typography>

          <DropFile
            fileTypes="NIC,Passport,Driving License,"
            fileExtensions="PDF,PNG,JPEG"
            isCircular={false}
            width="60%"
            height="300px"
            file={verDoc}
            setFile={setVerDoc}
          />

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-8"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            We are really excited to have <br></br> you onboard!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              width: "80%",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            <em>
              Our team is currently processing your request, we will notify your
              approval through an Email
            </em>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "100px 0 70px 0",
              width: "70%",
            }}
          >
            <CheckCircleIcon
              sx={{ fontSize: "4rem", color: "#6366F1", marginRight: "10px" }}
            />
            <Stack>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "600" }}
              >
                Successfully Submitted Request!
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                Current Status:{" "}
                <span style={{ fontWeight: "300" }}>
                  <em>Pending</em>
                </span>
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-9"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            We are really excited to have <br></br> you onboard!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              width: "80%",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            <em>
              Our team is currently processing your request, we will notify your
              approval through an Email
            </em>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "100px 0 70px 0",
              width: "70%",
            }}
          >
            <CheckCircleIcon
              sx={{ fontSize: "4rem", color: "#6366F1", marginRight: "10px" }}
            />
            <Stack>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "600" }}
              >
                Successfully Submitted Request!
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                Current Status:{" "}
                <span style={{ fontWeight: "300" }}>
                  <em>Verified</em>
                </span>
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-10"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            Mobile Number Verification
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              width: "80%",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            <em>
              We have sent a 4-digit verification code to your mobile<br></br>{" "}
              number ends with XX99
            </em>
          </Typography>

          <Box sx={{ margin: "60px 0" }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span style={{ width: "12px" }}></span>}
              renderInput={(props) => <AuthOTPDigitBox {...props} />}
            />
          </Box>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-11"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            Let’s customize your profile
          </Typography>

          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                // background: "magenta",
                width: "100%",
              }}
            >
              <AuthBioField
                id="artist-bio"
                label="Add a bio*"
                variant="outlined"
                multiline
                rows={6}
                style={{ boxSizing: "initial" }}
              />
              <Box>
                <DropFile
                  fileTypes="Profile Picture"
                  fileExtensions="PNG,JPEG,WEBP"
                  isCircular={true}
                  width="200px"
                  height="200px"
                  file={profilePicture}
                  setFile={setProfilePicture}
                />
              </Box>
            </Stack>
            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <DropFile
                fileTypes="Cover Photo"
                fileExtensions="PNG,JPEG,WEBP"
                isCircular={false}
                width="32.5%"
                height="170px"
                file={coverPhoto1}
                setFile={setCoverPhoto1}
              />
              <DropFile
                fileTypes="Cover Photo"
                fileExtensions="PNG,JPEG,WEBP"
                isCircular={false}
                width="32.5%"
                height="170px"
                file={coverPhoto2}
                setFile={setCoverPhoto2}
              />
              <DropFile
                fileTypes="Cover Photo"
                fileExtensions="PNG,JPEG,WEBP"
                isCircular={false}
                width="32.5%"
                height="170px"
                file={coverPhoto3}
                setFile={setCoverPhoto3}
              />
            </Stack>
          </Box>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-12"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            We need some details to boost your promoting and<br></br> marketing
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              width: "80%",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            <em>
              NOTE: You can add these details later in the profile as well
            </em>
          </Typography>

          <AuthSocialInputBox sx={{ marginTop: "30px" }}>
            <AuthSocialIcon>
              <FacebookIcon sx={{ color: "#fff" }} />
            </AuthSocialIcon>
            <AuthSocialTextField
              id="fb-url"
              label="Facebook Profile URL"
              variant="outlined"
              style={{ boxSizing: "initial" }}
            />
          </AuthSocialInputBox>

          <AuthSocialInputBox>
            <AuthSocialIcon>
              <InstagramIcon sx={{ color: "#fff" }} />
            </AuthSocialIcon>
            <AuthSocialTextField
              id="insta-url"
              label="Instagram Profile URL"
              variant="outlined"
              style={{ boxSizing: "initial" }}
            />
          </AuthSocialInputBox>

          <AuthSocialInputBox>
            <AuthSocialIcon>
              <XIcon sx={{ color: "#fff" }} />
            </AuthSocialIcon>
            <AuthSocialTextField
              id="twitter-url"
              label="X(Twitter) Profile URL"
              variant="outlined"
              style={{ boxSizing: "initial" }}
            />
          </AuthSocialInputBox>

          <AuthSocialInputBox sx={{ marginBottom: "30px" }}>
            <AuthSocialIcon>
              <PublicIcon sx={{ color: "#fff" }} />
            </AuthSocialIcon>
            <AuthSocialTextField
              id="website-url"
              label="Website URL"
              variant="outlined"
              style={{ boxSizing: "initial" }}
            />
          </AuthSocialInputBox>

          <Stack spacing={1} direction="row">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              endIcon={<IoPlaySkipForwardCircle />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Skip
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-13"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            We need some payment information<br></br> to pay you on time{" "}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              width: "80%",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            <em>
              NOTE: You can add these details later in the profile as well
            </em>
          </Typography>

          <AuthTextField
            id="bank-account-name"
            label="Bank Account Name"
            variant="outlined"
            style={{ boxSizing: "initial" }}
          />

          <AuthTextField
            id="bank-account-no"
            label="Bank Account Number"
            variant="outlined"
            style={{ boxSizing: "initial" }}
          />

          <AuthTextField
            id="bank"
            label="Bank"
            variant="outlined"
            style={{ boxSizing: "initial" }}
          />

          <AuthTextField
            id="bank-branch"
            label="Bank Branch"
            variant="outlined"
            style={{ boxSizing: "initial" }}
          />

          <FormControl
            sx={{ m: 1, minWidth: 80, marginBottom: "30px", width: "40%" }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              <ReactCountryFlag
                countryCode={selectedCountry}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "8px",
                }}
                title={selectedCountry}
              />
              {selectedCountry}
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="country"
              value={artistDetails.country}
              onChange={handleCountryChange}
              // autoWidth
              label="Country"
              sx={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "10px",
                margin: "0",
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country}>
                    <ReactCountryFlag
                      countryCode={country}
                      svg
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        marginRight: "8px",
                      }}
                      title={country}
                    />
                    {country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Stack spacing={1} direction="row">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              startIcon={<ArrowCircleLeftIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
                background: "#787878",
              }}
              onClick={() => decrementStep(1)}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              endIcon={<IoPlaySkipForwardCircle />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Skip
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={() => incrementStep(1)}
            >
              Next
            </Button>
          </Stack>
        </Box>
        <Box
          id="as-step-14"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "100px 0 70px 0",
              width: "70%",
            }}
          >
            <GiPartyPopper
              style={{ fontSize: "100px", color: "#6366F1", marginRight: "30px" }}
            />
            <Stack
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#fff", fontWeight: "600" }}
              >
                Congratulations!
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                Now You Can Enjoy Our Exclusive Artist Services
              </Typography>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                endIcon={<ArrowCircleRightIcon />}
                sx={{
                  textTransform: "capitalize",
                  padding: "8px 32px",
                  marginTop: "20px",
                  fontSize: "20px"
                }}
                onClick={() => incrementStep(0)}
              >
                HearWeGo
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </AuthContainer>
  );
};

export default ArtistSignUp;
