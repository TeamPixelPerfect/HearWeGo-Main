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
  Autocomplete,
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
const genres = ["Pop", "Rock", "Classical", "Reggae"];
const seat = ["A", "B", "C", "D"];

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
        <Box sx={{ backgroundColor: "#3B1956", padding: "20px" }}>
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
          <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "58ch",
                maxWidth: "90%",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={genres}
              style={{ boxSizing: "initial", width: "85%" }}
              renderInput={(params) => (
                <TextField variant="filled" {...params} label="Ticket Type" />
              )}
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
                label="Ticket Price"
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
                id="filled-helperText"
                label="Tickets Count"
                variant="filled"
              />
            </div>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "58ch",
                maxWidth: "90%",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={seat}
              style={{ boxSizing: "initial", width: "85%" }}
              renderInput={(params) => (
                <TextField variant="filled" {...params} label="Seat Type(Optional)" />
              )}
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
                label="Seat No. From(Optional)"
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
                id="filled-helperText"
                label="Seat No. to(Optional)"
                variant="filled"
              />
            </div>
          </Box>

          <DialogActions>
          <Button variant="text" autoFocus onClick={handleClose}>
              <div style={{ color: "white" }}>Close</div>
            </Button>
            <Button variant="text" autoFocus onClick={handleClose}>
              <div style={{ color: "white" }}>Add</div>
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </React.Fragment>
  );
}
