"use client";
import React, { use, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";

import {
  Alert,
  IconButton,
  Button,
  Stack,
  PaletteMode,
  Dialog,
  styled,
  Snackbar,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import DialogTitle from "@mui/material/DialogTitle";

import DialogActions from "@mui/material/DialogActions";

import CloseIcon from "@mui/icons-material/Close";

import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import DropFile from "@/app/components/DropFile";

import { countries } from "country-flag-icons";
import ReactCountryFlag from "react-country-flag";

import "react-phone-input-2/lib/bootstrap.css";
import { logOutUser } from "@/lib/features/user.slice";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  handleUserMobileChange,
  handleUserPasswordChange,
} from "../services/AuthServices";
import PhoneInput from "react-phone-input-2";
import { updateUser } from "../services/UserServices";
import { set } from "date-fns";

// Styled dialog component
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Props interface for UserProfilePopup component
interface Props {
  open: boolean;
  open1: boolean;
  open2: boolean;
  setOpen: (open: boolean) => void;
  setOpen1: (open: boolean) => void;
  setOpen2: (open: boolean) => void;
}

// UserProfilePopup component definition
const UserProfilePopup = ({
  open,
  open1,
  open2,
  setOpen,
  setOpen1,
  setOpen2,
}: Props) => {
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState("LK");
  const [countryError, setCountryError] = React.useState(false);
  const [mobileNumberError, setMobileNumberError] = React.useState(false);

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

  // Accessing user from the redux store
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  // Close dialog function
  const handleClose = () => {
    setOpen(false);
  };

  // Functions to handle opening and closing of dialogs
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  // Handle country change
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
    setUserDetails({ ...userDetails, country: event.target.value });
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("hwg-user");
    dispatch(logOutUser());
  };

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldNumber, setOldNumber] = useState(user?.mobileNumber);
  const [newNumber, setNewNumber] = useState("");

  // State for user details
  const [userDetails, setUserDetails] = React.useState({
    country: "",
    mobileNumber: "",
  });

  // State for password visibility
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUpdateUser = () => {
    updateUser({ id: user?._id, name, profilePicture }).then((res) => {
      if (res) {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("User details updated successfully");
        sessionStorage.setItem("hwg-user", JSON.stringify({...user, name, profilePicture}));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to update user details");
      }
    });
  };

  const handleChangePassword = () => {
    if (!email) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to fetchh Email");
      return;
    }
    if (!oldPassword || !newPassword || !confirmPassword) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Passwords do not match");
      return;
    }
    // Call the handleUserPasswordChange function from AuthServices.ts
    handleUserPasswordChange(email, oldPassword, newPassword)
      .then(() => {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Password changed successfully");
        handleClose1();
        handleLogOut();
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(error.message);
      });
  };

  const handleChangeMobileNumber = () => {
    console.log(oldNumber, newNumber);
    if (!email) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to fetch Email");
      return;
    }
    if (!oldNumber || !newNumber) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("All fields are required");
      return;
    }
    if (oldNumber !== user?.mobileNumber) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Old number is incorrect");
      return;
    }
    if (newNumber === user?.mobileNumber) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("New number cannot be the same as the old number");
      return;
    }

    // Call the handleUserMobileChange function from AuthServices.ts
    handleUserMobileChange(email, newNumber)
      .then(() => {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Mobile number changed successfully");
        handleClose2();
      })
      .catch((error) => {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(error.message);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Get profile photo and country
  useEffect(() => {
    setProfilePicture(user?.profilePicture);
    setSelectedCountry(user?.country ? user.country : "");
  }, [user]);

  // Return JSX for UserProfilePopup component
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Box sx={{ padding: "20px" }}>
        <DialogTitle
          sx={{ mb: 2, p: 2, fontWeight: 700, fontSize: "32px" }}
          id="user-greeting"
        >
          Hello, {user?.name?.split(" ")[0]}!
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Profile picture section */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <DropFile
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
        </Box>
        {/* Form for user Details*/}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="user-name"
              label="User Name"
              defaultValue={name}
              onChange={handleChangeName}
              variant="filled"
            />
          </div>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="user-email"
              label="E-mail"
              defaultValue={user?.email}
              variant="filled"
              disabled
            />
          </div>
        </Box>

        {/*Change Password*/}
        <Box
          sx={{
            display: "flex",
            margin: "20px",
            marginTop: 5,
            justifyContent: "space-evenly",
          }}
        >
          <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen1}>
              Change Password
            </Button>

            <BootstrapDialog
              onClose={handleClose1}
              aria-labelledby="customized-dialog-title"
              open={open1}
            >
              <Box sx={{ padding: "30px" }}>
                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
                  Change Password
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose1}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <FormControl sx={{ m: 1, width: "45ch" }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">
                      Old Password
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setOldPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "45ch" }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">
                      New Password
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setNewPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl sx={{ m: 1, width: "45ch" }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>

                <DialogActions>
                  <Button autoFocus onClick={handleChangePassword}>
                    Save changes
                  </Button>
                </DialogActions>
              </Box>
            </BootstrapDialog>
          </React.Fragment>

          {/*Change mobile Number*/}
          <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen2}>
              Change mobile NO
            </Button>
            <BootstrapDialog
              onClose={handleClose2}
              aria-labelledby="customized-dialog-title"
              open={open2}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    padding: "20px",
                  }}
                >
                  <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
                    Change Mobile Number
                  </DialogTitle>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: 1,
                        width: "46ch",
                      },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Box sx={{ p: "1em" }}>
                      <label style={{ marginBottom: "4px" }}>
                        Old Number{" "}
                        {"*** ** ***" + user?.mobileNumber?.substring(9, 12)}
                      </label>
                      <PhoneInput
                        enableSearch={true}
                        country={"lk"}
                        onChange={(phone: any) => {
                          setOldNumber(phone);
                        }}
                        placeholder={
                          "*** ** ***" + user?.mobileNumber?.substring(9, 12)
                        }
                        specialLabel="Old Number"
                      />
                    </Box>
                  </Box>

                  <Stack
                    direction="row"
                    sx={{
                      width: "auto",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ p: "1em" }}>
                      <label style={{ marginBottom: "4px" }}>New Number</label>
                      <PhoneInput
                        enableSearch={true}
                        country={"lk"}
                        onChange={(phone: any) => {
                          setNewNumber(phone);
                        }}
                        specialLabel="New Number"
                      />
                    </Box>
                  </Stack>

                  <IconButton
                    aria-label="close"
                    onClick={handleClose2}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <DialogActions>
                    <Button autoFocus onClick={handleChangeMobileNumber}>
                      Save Changes
                    </Button>
                  </DialogActions>
                </Box>
              </Box>
            </BootstrapDialog>
          </React.Fragment>
        </Box>

        <DialogActions>
          <Button variant="text" autoFocus onClick={handleUpdateUser}>
            Save Changes
          </Button>
          <Button variant="text" color="error" autoFocus onClick={handleLogOut}>
            Log Out
          </Button>
        </DialogActions>
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
    </BootstrapDialog>
  );
};

export default UserProfilePopup;
