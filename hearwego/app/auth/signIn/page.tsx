"use client";
import { AuthContainer, AuthTextField } from "@/app/styles/auth.styles";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/services/AuthServices";
import { useAppDispatch } from "@/lib/hooks";
import { logInUser } from "@/lib/features/user.slice";
import Logo from "@/app/components/Logo";

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const matches = useMediaQuery("(max-width:960px)");

  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleSignIn = () => {
    const errors = [false, false];

    if (userDetails.email === "") {
      setEmailError(true);
      errors[0] = true;
    }
    if (userDetails.password === "") {
      setPasswordError(true);
      errors[1] = true;
    }

    if (errors.includes(true)) return;

    handleLogin(userDetails).then((res) => {
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
            style={{ boxSizing: "initial" }}
            defaultValue={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
            helperText={emailError ? "Email is required" : ""}
            FormHelperTextProps={{ style: { color: "red" } }}
            // inputRef={(input) => input && emailError && input.focus()}
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

          <Typography variant="body1" sx={{ marginTop: "40px" }}>
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
