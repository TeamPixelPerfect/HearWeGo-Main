"use client";
import { AuthContainer, AuthTextField } from "@/app/styles/auth.styles";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleArtistPasswordReset } from "@/app/services/AuthServices";
import Logo from "@/app/components/Logo";

interface Props {
  params: { token: string };
}

const PasswordReset = ({ params: { token } }: Props) => {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:960px)");

  // State to store passwords
  const [passwords, setPasswords] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [mismatchError, setMismatchError] = React.useState(false);

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

  // Function to handle password reset
  const handleReset = () => {
    const errors = [false, false, false];

    if (passwords.newPassword === "") {
      setPasswordError(true);
      errors[0] = true;
    }
    if (passwords.confirmPassword === "") {
      setConfirmPasswordError(true);
      errors[1] = true;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMismatchError(true);
      errors[2] = true;
    }

    if (errors.includes(true)) return;

    handleArtistPasswordReset(passwords.newPassword, token).then((res) => {
      if (res) {
        // Handle successful password reset (e.g., show notification, redirect)
        setSnackbarOpen(true);
        setSnackbarMessage("Password reset successsful!");
        setSnackbarSeverity("success");
        setTimeout(() => {
          router.replace("/auth/artistSignIn");
        }, 2000);
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage("Failed to reset password!");
        setSnackbarSeverity("error");
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
            backgroundImage: `url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>

        <Box
          id="password-reset"
          sx={{
            flex: "0 0 auto",
            width: matches ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            marginLeft: "2em",
            padding: "80px 0",
          }}
        >
          {/* Logo */}
          <Logo
            img_url={
              theme.palette.mode === "dark"
                ? "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo(white).png"
                : "https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png"
            }
          />

          {/* Reset password text */}
          <Typography
            variant="h4"
            sx={{
              mt: "8px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Reset Your Password
          </Typography>

          {/* New Password */}
          <AuthTextField
            id="newPassword"
            label="New Password*"
            variant="outlined"
            type="password"
            color={passwordError || mismatchError ? "error" : "primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={passwords.newPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, newPassword: e.target.value });
              setPasswordError(false);
              setMismatchError(false);
            }}
            helperText={
              passwordError
                ? "New password is required"
                : mismatchError
                ? "Passwords do not match"
                : ""
            }
            FormHelperTextProps={{ style: { color: "red" } }}
          />

          {/* Confirm Password */}
          <AuthTextField
            id="confirmPassword"
            label="Confirm Password*"
            variant="outlined"
            type="password"
            color={confirmPasswordError || mismatchError ? "error" : "primary"}
            style={{ boxSizing: "initial" }}
            defaultValue={passwords.confirmPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, confirmPassword: e.target.value });
              setConfirmPasswordError(false);
              setMismatchError(false);
            }}
            helperText={
              confirmPasswordError
                ? "Confirm password is required"
                : mismatchError
                ? "Passwords do not match"
                : ""
            }
            FormHelperTextProps={{ style: { color: "red" } }}
          />

          {/* Reset button */}
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
              onClick={handleReset}
            >
              Reset Password
            </Button>
          </Stack>

          {/* Back to sign in link */}
          <Typography variant="body1" sx={{ marginTop: "40px" }}>
            Remember your password?{" "}
            <Link href="/auth/artistSignIn" style={{ color: "#C084FC" }}>
              Sign In
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

export default PasswordReset;
