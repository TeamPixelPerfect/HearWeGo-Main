"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  Box,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import DropFile from "@/app/components/DropFile";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BorderColor, Visibility, VisibilityOff } from "@mui/icons-material";
import { countries } from "country-flag-icons";
import ReactCountryFlag from "react-country-flag";
import { AuthTextField } from "@/app/styles/auth.styles";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [userDetails, setUserDetails] = React.useState({
    country: "",
    mobileNumber: "",
  });
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState("LK");
  const [countryError, setCountryError] = React.useState(false);

  const [mobileNumberError, setMobileNumberError] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  // Handle country change
  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
    setUserDetails({ ...userDetails, country: event.target.value });
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box sx={{ backgroundColor: "#3B1956" , padding: "20px"}}>
          <DialogTitle
            sx={{ m: 0, color: "white", p: 2 }}
            id="customized-dialog-title"
          ></DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                id="filled-helperText"
                label="User Name"
                defaultValue="Default Value"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BorderColorIcon />
                    </InputAdornment>
                  ),
                }}
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
                id="filled-helperText"
                label="E-mail"
                defaultValue="Default Value"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BorderColorIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              margin: "20px",
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
                <Box sx={{ backgroundColor: "#3B1956", padding: "30px" }}>
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
                        endAdornment={
                          <InputAdornment position="end"></InputAdornment>
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
                      />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: "45ch" }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end"></InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>

                  <DialogActions>
                    <Button autoFocus onClick={handleClose1}>
                      Save changes
                    </Button>
                  </DialogActions>
                </Box>
              </BootstrapDialog>
            </React.Fragment>

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
                  <Box sx={{ backgroundColor: "#3B1956", padding: "20px" }}>
                    <DialogTitle
                      sx={{ m: 0, p: 3 }}
                      id="customized-dialog-title"
                    >
                      Change Mobile Number
                    </DialogTitle>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "46ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="filled-helperText"
                          label="Old Mobile Number"
                          defaultValue="* ** ** ** 564"
                          variant="filled"
                          
                        />
                      </div>
                    </Box>

                    <Stack
                      direction="row"
                      sx={{
                        width: "auto",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Country
                        </InputLabel>
                        <Select
                        variant="filled"
                          labelId="demo-simple-select-autowidth-label"
                          id="country"
                          value={userDetails.country}
                          onChange={handleCountryChange}
                          // autoWidth
                          label="Country"
                          color={countryError ? "error" : "primary"}
                         
                        
                          defaultValue={selectedCountry}
                          inputRef={(input) =>
                            input && countryError && input.focus()
                          }
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
                      <TextField
                        id="phone"
                        label="Mobile Number*"
                        variant="filled"
                        type="number"
                        color={mobileNumberError ? "error" : "primary"}
                        style={{ boxSizing: "initial", width: "73%" }}
                        defaultValue={userDetails.mobileNumber}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            mobileNumber: e.target.value,
                          });
                        }}
                        inputRef={(input) =>
                          input && mobileNumberError && input.focus()
                        }
                      />
                    </Stack>
                    <TextField
                        id="OTP"
                        label="OTP Number*"
                        variant="filled"
                        type="number"
                        color={mobileNumberError ? "error" : "primary"}
                        style={{ boxSizing: "initial", width: "97%",marginLeft:'9px'}}
                        defaultValue={userDetails.mobileNumber}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            mobileNumber: e.target.value,
                          });
                        }}
                        inputRef={(input) =>
                          input && mobileNumberError && input.focus()
                        }
                      />
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
                      <Button autoFocus onClick={handleClose2}>
                        Save changes
                      </Button>
                    </DialogActions>
                  </Box>
                </Box>
              </BootstrapDialog>
            </React.Fragment>
          </Box>

          <DialogActions>
            <Button variant="text" autoFocus onClick={handleClose}>
              <div style={{ color: "white" }}>Save changes</div>
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  );
}
