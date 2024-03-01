"use client";
import { AuthContainer, AuthTextField } from "@/app/styles/auth.styles";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/services/AuthServices";
import { useAppDispatch } from "@/lib/hooks";
import { logInUser } from "@/lib/features/user.slice";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleSignIn = () => {
    if (userDetails.email === "") {
      setEmailError(true);
    } else if (userDetails.password === "") {
      setPasswordError(true);
    } else {
      handleLogin(userDetails).then((res) => {
        if (res) {
          dispatch(logInUser(res?.user));
          localStorage.setItem("hwg-user", JSON.stringify(res));
          router.replace("/");
        }
      });
    }
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
            }}
          >
            Sign into HearWeGo
          </Typography>
          <AuthTextField
            id="email"
            label="Email*"
            variant="outlined"
            type="email"
            color={emailError ? "error" : "primary"}
            style={{ boxSizing: "initial", marginTop: "30px" }}
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
            <Link href="/auth/signUp" style={{ color: "#C084FC" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthContainer>
  );
};

export default SignIn;
