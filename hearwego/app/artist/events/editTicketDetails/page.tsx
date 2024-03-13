"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, IconButton, Stack, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardMedia } from "@mui/material";
import { Router } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import {
  Autocomplete,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const genres = ["Gold", "Browns", "Silver",];
const seat = ["A", "B", "C", "D"];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {},
}));

function createData(
  name: string,
  calories: string,
  fat: number,
  carbs: string,
  protein: number,
  seatNoTo: number
) {
  return { name, calories, fat, carbs, protein, seatNoTo };
}

const rows = [
  createData("Gold", "LKR 2000", 100, "A", 1, 100),
  createData("Silver", "LKR 1000", 200, "B", 1, 200),
];
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const page = () => {
  const [userDetails, setUserDetails] = React.useState({
    country: "",
    mobileNumber: "",
  });
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <h1 style={{ color: "#4338CA" }}>Edit Ticket Details</h1>
      </div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ border: "solid", borderRadius: "20px", width: "1200px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 24 }} color="#4338CA" gutterBottom>
                Ticket Information
              </Typography>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ display: "flex", width: "35%" }}>
                  <Box
                    sx={{
                      width: "300px",
                      minWidth: "100px",
                      height: "200px",

                      background:
                        "url('https://ts-production.imgix.net/images/9a145076-c91d-4c5d-9c56-944c5e4c1cc8.jpg?auto=compress,format&w=800&h=450')",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      borderRadius: "10px",
                    }}
                  ></Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "65%",
                    margin: "10px",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Event Name:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      Night Club Party{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Session:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      Session 01
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Date:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      2024-01-19{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Time:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      8.00 P.M
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Venue:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      XYZ Hall
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", marginTop: "30px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Ticket Type</StyledTableCell>
                        <StyledTableCell align="right">
                          Ticket Price
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Tickets Count
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Seat Type(Optional)(g)
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Seat No. From(Optional)
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Seat No. To(Optional)
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.calories}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.fat}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.carbs}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.protein}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.seatNoTo}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction="row" spacing={1}>
                  <React.Fragment>
                    <IconButton
                      aria-label="add to shopping cart"
                      onClick={handleClickOpen}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <Box sx={{ backgroundColor: theme.palette.background.default, padding: "20px" }}>
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
                        <Box
                          sx={{ display: "flex", justifyContent: "center" }}
                        ></Box>
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
                              <TextField
                                variant="filled"
                                {...params}
                                label="Ticket Type"
                              />
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
                              <TextField
                                variant="filled"
                                {...params}
                                label="Seat Type(Optional)"
                              />
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
                          <Button
                            variant="text"
                            autoFocus
                            onClick={handleClose}
                          >
                            <div style={{ color: "white" }}>Close</div>
                          </Button>
                          <Button
                            variant="text"
                            autoFocus
                            onClick={handleClose}
                          >
                            <div style={{ color: "white" }}>Add</div>
                          </Button>
                        </DialogActions>
                      </Box>
                    </BootstrapDialog>
                  </React.Fragment>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Typography
          sx={{
            mb: 1.5,
            fontSize: "20px",
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          Special Notice:{" "}
        </Typography>

        <p style={{ marginLeft: "30px" }}>
          Lorem ipsum dolor sit amet consectetur. Dui porttitor eu id venenatis
          blandit lorem egestas. At adipiscing orci pulvinar sodales arcu.
          Ultricies et enim molestie felis amet facilisi nullam nunc
          consectetur. Sapien viverra magna a nunc aliquam odio{" "}
        </p>

        <Typography
          sx={{
            mb: 1.5,
            fontSize: "20px",
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          Message about the update
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "130ch" },
            marginLeft: "25px",
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="filled-multiline-flexible"
              label=""
              multiline
              maxRows={10}
              variant="filled"
            />
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginTop: "20px",
            marginRight: "40px",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button variant="outlined">Close</Button>
            <Button variant="contained">Save</Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default page;
