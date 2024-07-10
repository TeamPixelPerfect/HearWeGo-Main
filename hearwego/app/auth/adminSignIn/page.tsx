"use client";
import { AuthContainer, AuthTextField } from "@/app/styles/auth.styles";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import {
  handleAdminSignIn,
  handleArtistLogin,
} from "@/app/services/AuthServices";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { logInArtist } from "@/lib/features/artist.slice";
import Logo from "@/app/components/Logo";
import { error } from "console";
import { logInAdmin } from "@/lib/features/admin.slice";

const ArtistSignIn = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const matches = useMediaQuery("(max-width:960px)");
  const theme = useTheme();

  // State to store artist details
  const [artistDetails, setArtistDetails] = React.useState({
    email: "",
    password: "",
  });

  // State to store error status of email and password fields
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Function to handle sign in
  const handleSignIn = () => {
    const errors = [false, false];

    if (!artistDetails.email) {
      setEmailError(true);
      errors[0] = true;
    }
    if (!artistDetails.password) {
      setPasswordError(true);
      errors[1] = true;
    }

    if (errors.includes(true)) return;

    handleAdminSignIn(artistDetails).then((res) => {
      if (res?.user) {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Login successful");

        dispatch(logInAdmin({ ...res, ...res?.user }));
        sessionStorage.setItem(
          "hwg-admin",
          JSON.stringify({ ...res, ...res?.user })
        );
        router.replace("/admin");
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(res || "An error occurred");
      }
    });
  };

  return (
    <AuthContainer>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: matches ? "800px" : "100%",
          maxHeight: matches ? "1000px" : "600px",
          flexDirection: matches ? "column" : "row",
        }}
      >
        <Box
          sx={{
            width: matches ? "100%" : "50%",
            minHeight: matches ? "20%" : "100%",
            backgroundColor: "#000",
            backgroundImage: `url("https://images.pexels.com/photos/860707/pexels-photo-860707.jpeg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>

        <Box
          id="admin-sign-in"
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
          {/** Logo */}
          <Logo
            img_url={
              theme.palette.mode === "dark"
                ? "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(white).png"
                : "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png"
            }
          />

          {/* Sign in text*/}
          <Typography
            variant="h5"
            sx={{
              mt: "8px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Sign into HearWeGo as an Admin
          </Typography>

          {/* Email */}
          <AuthTextField
            id="email"
            label="Email*"
            variant="outlined"
            type="email"
            color={emailError ? "error" : "primary"}
            style={{ boxSizing: "initial", marginTop: "30px" }}
            defaultValue={artistDetails.email}
            onChange={(e) => {
              setArtistDetails({ ...artistDetails, email: e.target.value });
            }}
            helperText={emailError ? "Email is required" : ""}
            FormHelperTextProps={{ style: { color: "red" } }}
          />

          {/* Password */}
          <AuthTextField
            id="password"
            label="Password*"
            variant="outlined"
            type="password"
            color={passwordError ? "error" : "primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={artistDetails.password}
            onChange={(e) => {
              setArtistDetails({ ...artistDetails, password: e.target.value });
            }}
            helperText={passwordError ? "Password is required" : ""}
            FormHelperTextProps={{ style: { color: "red" } }}
          />

          {/* Sign in button */}
          <Stack spacing={1} direction="row" sx={{ marginTop: "50px" }}>
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
              onClick={handleSignIn}
            >
              Login
            </Button>
          </Stack>

          {/* Sign up link */}
          {/* <Typography variant="body1" sx={{ marginTop: "40px" }}>
            <Link href="/auth/forgotArtist" style={{ color: "#C084FC" }}>
              Forgot Password?
            </Link>
          </Typography> */}
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link href="/auth/artistSignUp" style={{ color: "#C084FC" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AuthContainer>
  );
};

export default ArtistSignIn;
