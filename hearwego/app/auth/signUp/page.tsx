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
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { countries } from "country-flag-icons";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();

  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    mobileNumber: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("LK");

  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [countryError, setCountryError] = React.useState(false);
  const [mobileNumberError, setMobileNumberError] = React.useState(false);
  const [passwordMismatchError, setPasswordMismatchError] =
    React.useState(false);

  // Handle country change
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

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
      <Box>
        <Box
          id="artist-sign-in"
          sx={{
            flex: "0 0 auto",
            width: "100%",
            height: "550px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // background: "magenta"
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "20px",
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
            inputRef={(input) => input && nameError && input.focus()}
          />
          <AuthTextField
            id="email"
            label="Email*"
            variant="outlined"
            type="email"
            color={emailError ? "error" : "primary"}
            style={{ boxSizing: "initial"}}
            defaultValue={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
            inputRef={(input) => input && emailError && input.focus()}
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
            inputRef={(input) => input && passwordError && input.focus()}
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
            inputRef={(input) =>
              input &&
              (confirmPasswordError || passwordMismatchError) &&
              input.focus()
            }
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
                value={userDetails.country}
                onChange={handleCountryChange}
                // autoWidth
                label="Country"
                color={countryError ? "error" : "primary"}
                sx={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
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
              style={{ boxSizing: "initial", width: "100%" }}
              defaultValue={userDetails.mobileNumber}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  mobileNumber: e.target.value,
                });
              }}
              inputRef={(input) => input && mobileNumberError && input.focus()}
            />
          </Stack>

          <Stack spacing={1} direction="row" sx={{ marginTop: "10px" }}>
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
              onClick={() => {router.replace("/")}}
            >
              Sign up
            </Button>
          </Stack>

          <Typography variant="body1" sx={{ color: "#fff", marginTop: "10px", paddingBottom:"20px" }}>
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
