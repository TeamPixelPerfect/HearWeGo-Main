import { Height } from "@mui/icons-material";
import { Box, Select, TextField, styled } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export const AuthContainer = styled("div")(({ theme }) => ({
  width: "70vw",
  minWidth: "400px",
  height: "fit-content",
  padding: "80px 40px",
  minHeight: "600px",
  background: "rgba(0,0,0,0.8)",
  margin: "100px auto",
  borderRadius: "10px",
  overflow: "hidden",
}));

export const AuthTextField = styled(TextField)(({ theme }) => ({
  background: "rgba(255,255,255,0.1)",
  margin: "10px 0",
  width: "40%",
  minWidth: "300px",
  boxSizing: "border-box",
  color: "#fff",
  borderRadius: "10px",
}));

export const AuthDatePicker = styled(DatePicker)(({ theme }) => ({
  background: "rgba(255,255,255,0.1)",
  margin: "10px 0",
  width: "40%",
  minWidth: "300px",
  boxSizing: "border-box",
  color: "#fff",
  borderRadius: "10px",
}));

export const AuthSocialTextField = styled(TextField)(({ theme }) => ({
  background: "rgba(255,255,255,0.1)",
  margin: "10px 0",
  width: "40%",
  minWidth: "300px",
  boxSizing: "border-box",
  color: "#fff",
  borderRadius: "0 10px 10px 0px",
}));

export const AuthBioField = styled(TextField)(({ theme }) => ({
  background: "rgba(255,255,255,0.1)",
  margin: "10px 0",
  width: "100%",
  minWidth: "300px",
  boxSizing: "border-box",
  color: "#fff",
  borderRadius: "10px",
  // height: "200px",
}));

export const AuthSelect = styled(Select)(({ theme }) => ({
  background: "rgba(255,255,255,0.1)",
  margin: "10px 0",
  boxSizing: "border-box",
  color: "#fff",
  borderRadius: "10px",
}));

export const AuthCheckBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "120px",
  height: "120px",
  border: "1px solid #fff",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.1)",
  cursor: "pointer",
  ":hover": {
    background: "rgba(255,255,255,0.3)",
  },
}));

export const AuthGenreBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100px",
  height: "100px",
  border: "1px solid #fff",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.1)",
  cursor: "pointer",
  ":hover": {
    background: "rgba(255,255,255,0.3)",
  },
}));

export const AuthOTPDigitBox = styled("input")(({ theme }) => ({
  width: "50px !important",
  height: "60px",
  textAlign: "center",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid #fff",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "24px",
}));

export const AuthSocialIcon = styled(Box)(({ theme }) => ({
  background: "rgba(255,255,255,0.1)",
  width: "56px",
  height: "56px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px 0 0 10px",
}));

export const AuthSocialInputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
}));
