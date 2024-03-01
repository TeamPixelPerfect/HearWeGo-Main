"use client";
import { AuthContainer, AuthTextField } from "@/app/styles/auth.styles";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import { handleArtistLogin } from "@/app/services/AuthServices";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { logInArtist } from "@/lib/features/artist.slice";

const ArtistSignIn = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [artistDetails, setArtistDetails] = React.useState({
        email: "",
        password: "",
    });

    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const handleSignIn = () => {
        if (!artistDetails.email) {
            setEmailError(true);
            return;
        }
        if (!artistDetails.password) {
            setPasswordError(true);
            return;
        }
        handleArtistLogin(artistDetails).then((res) => {
          if (res) {
            dispatch(logInArtist(res));
            localStorage.setItem("hwg-artist", JSON.stringify(res));
            router.replace("/artist");
          }
        })
    }

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
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Sign into HearWeGo as an Artist
          </Typography>
          <AuthTextField
            id="email"
            label="Email*"
            variant="outlined"
            type="email"
            color={emailError ? "error" : "primary"}
            style={{ boxSizing: "initial", marginTop: "30px"}}
            defaultValue={artistDetails.email}
            onChange={(e) => {
              setArtistDetails({ ...artistDetails, email: e.target.value });
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
            defaultValue={artistDetails.password}
            onChange={(e) => {
              setArtistDetails({ ...artistDetails, password: e.target.value });
            }}
            inputRef={(input) => input && passwordError && input.focus()}
          />

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
                marginTop: "30px",
                textTransform: "capitalize",
                padding: "8px 32px",
              }}
              onClick={handleSignIn}
            >
              Login
            </Button>
          </Stack>

          <Typography variant="body1" sx={{ color: "#fff", marginTop: "40px" }}>
            Don't have an account?{" "}
            <Link href="/auth/artistSignUp" style={{ color: "#C084FC" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthContainer>
  );
};

export default ArtistSignIn;
