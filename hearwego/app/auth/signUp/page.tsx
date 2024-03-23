"use client";
import { AuthContainer, AuthTextField } from "@/app/styles/auth.styles";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { countries } from "country-flag-icons";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/app/services/AuthServices";
import { useAppDispatch } from "@/lib/hooks";
import { logInUser } from "@/lib/features/user.slice";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Logo from "@/app/components/Logo";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const theme = useTheme();
  const matches = useMediaQuery("(max-width:960px)");

  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    mobileNumber: "",
    gender: "",
    birthDate: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("LK");
  const [selectedDay, setSelectedDay] = React.useState<Dayjs | null>();

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);
  const [mobileNumberError, setMobileNumberError] = React.useState(false);
  const [passwordMismatchError, setPasswordMismatchError] =
    React.useState(false);
  const [genderError, setGenderError] = React.useState(false);
  const [birthDateError, setBirthDateError] = React.useState(false);

  // Handle country change
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
    setUserDetails({ ...userDetails, country: event.target.value });
  };

  // Handle bday change
  const handleBirthDateChange = (date: Dayjs | null) => {
    setSelectedDay(date);
    if (date)
      setUserDetails({
        ...userDetails,
        birthDate: date.format("YYYY-MM-DD").toString(),
      });
  };

  // Handle Sign up process
  const handleSignUp = () => {
    const errors = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    if (userDetails.name === "") {
      setNameError(true);
      errors[0] = true;
    }
    if (userDetails.email === "") {
      setEmailError(true);
      errors[1] = true;
    }
    if (userDetails.password === "") {
      setPasswordError(true);
      errors[2] = true;
    }
    if (userDetails.confirmPassword === "") {
      setConfirmPasswordError(true);
      errors[3] = true;
    }
    if (userDetails.country === "") {
      setCountryError(true);
      errors[4] = true;
    }
    if (userDetails.mobileNumber === "") {
      setMobileNumberError(true);
      errors[5] = true;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      setPasswordMismatchError(true);
      errors[6] = true;
    }
    if (userDetails.gender === "") {
      setGenderError(true);
      errors[7] = true;
    }
    if (userDetails.birthDate === "") {
      setBirthDateError(true);
      errors[8] = true;
    }

    if (errors.includes(true)) return;

    console.log(userDetails);
    handleRegister(userDetails).then((res) => {
      if (res) {
        dispatch(logInUser(res?.user));
        sessionStorage.setItem("hwg-user", JSON.stringify(res));
        router.replace("/");
      }
    });
  };

  return (
    <AuthContainer>
      {/* <Stack sx={{ width: "100%", padding: "12px" }}>
        <CloseIcon
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "2rem",
            cursor: "pointer",
            alignSelf: "flex-end",
          }}
        />
      </Stack> */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: matches ? "1250px" : "100%",
          maxHeight: matches ? "1250px" : "1000px",
          flexDirection: matches ? "column" : "row",
        }}
      >
        <Box
          sx={{
            width: matches ? "100%" : "50%",
            minHeight: matches ? "20%" : "100%",
            backgroundColor: "#000",
            backgroundImage: `url("https://plus.unsplash.com/premium_photo-1682096467444-8861e1dc3bc2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>

        <Box
          id="artist-sign-in"
          sx={{
            flex: "0 0 auto",
            width: matches ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: "2em",
            padding: "80px 0",
            // background: "magenta"
          }}
        >
          <Logo
            img_url={
              theme.palette.mode === "dark"
                ? "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(white).png"
                : "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png"
            }
          />
          <Typography
            variant="h4"
            sx={{
              mt: "8px",
              fontWeight: "600",
              marginBottom: "30px",
              paddingTop: "0px",
            }}
          >
            Join with HearWeGo
          </Typography>
          <AuthTextField
            id="name"
            label="Username*"
            variant="outlined"
            type="text"
            color={nameError ? "error" : "primary"}
            style={{ boxSizing: "initial", marginTop: "0px" }}
            defaultValue={userDetails.name}
            onChange={(e) => {
              setUserDetails({ ...userDetails, name: e.target.value });
            }}
            helperText={nameError ? "Name is required" : ""}
            FormHelperTextProps={{ style: { color: "red" } }}
          />
          <AuthTextField
            id="email"
            label="Email*"
            variant="outlined"
            type="email"
            color={emailError ? "error" : "primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
            helperText={emailError ? "Email is required" : ""}
            FormHelperTextProps={{ style: { color: "red" } }}
          />
          <AuthTextField
            id="password"
            label="Password*"
            variant="outlined"
            type="password"
            color={passwordError ? "error" : "primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={userDetails.password}
            onChange={(e) => {
              setUserDetails({ ...userDetails, password: e.target.value });
            }}
            helperText={passwordError ? "Password is required" : ""}
            FormHelperTextProps={{ style: { color: "red" } }}
          />
          <AuthTextField
            id="confirm-password"
            label="Confirm Password*"
            variant="outlined"
            type="password"
            color={confirmPasswordError ? "error" : "primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={userDetails.confirmPassword}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                confirmPassword: e.target.value,
              });
            }}
            helperText={
              confirmPasswordError
                ? "Confirm Password is required"
                : passwordMismatchError
                ? "Passwords do not match"
                : ""
            }
            FormHelperTextProps={{ style: { color: "red" } }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                background: "rgba(255,255,255,0.1)",
                margin: "10px 0",
                width: "40%",
                minWidth: "300px",
                color: "#fff",
                borderRadius: "10px",
                boxSizing: "initial",
              }}
              label="Birth Date*"
              value={selectedDay}
              onChange={handleBirthDateChange}
            />
            <Box>
              {birthDateError ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: "red",
                    marginLeft: "12px",
                    fontSize: "12px",
                  }}
                >
                  Birth Date is required
                </Typography>
              ) : (
                ""
              )}
            </Box>
          </LocalizationProvider>

          <AuthTextField
            id="gender"
            label="Gender*"
            variant="outlined"
            select
            color={genderError ? "error" : "primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={userDetails.gender}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                gender: e.target.value,
              });
            }}
            helperText={genderError ? "Gender is required" : ""}
            FormHelperTextProps={{ style: { color: "red" } }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </AuthTextField>

          <Stack
            direction="row"
            sx={{
              // width: "40%",
              alignItems: "center",
              justifyContent: "center",
              // background: "magenta"
            }}
          >
            <FormControl sx={{ width: "30%", mr: 1 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Code
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="country"
                value={userDetails.country}
                onChange={handleCountryChange}
                // autoWidth
                label="Country"
                color={countryError ? "error" : "primary"}
                sx={{
                  background: "rgba(255,255,255,0.1)",
                  // borderRadius: "10px",
                  margin: "0",
                }}
                defaultValue={selectedCountry}
                inputRef={(input) => input && countryError && input.focus()}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countries.map((country) => {
                  return (
                    <MenuItem value={country}>
                      <ReactCountryFlag
                        key={country}
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
              color={mobileNumberError ? "error" : "primary"}
              style={{ boxSizing: "initial" }}
              defaultValue={userDetails.mobileNumber}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  mobileNumber: e.target.value,
                });
              }}
              helperText={mobileNumberError ? "Mobile Number is required" : ""}
              FormHelperTextProps={{ style: { color: "red" } }}
            />
          </Stack>

          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
            {/* <Button
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
            </Button> */}
            <Button
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                marginTop: "0px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={handleSignUp}
            >
              Sign up
            </Button>
          </Stack>

          <Typography
            variant="body1"
            sx={{ marginTop: "40px", paddingBottom: "20px" }}
          >
            Already have an account?{" "}
            <Link href="/auth/signIn" style={{ color: "#C084FC" }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthContainer>
  );
};

export default SignUp;
