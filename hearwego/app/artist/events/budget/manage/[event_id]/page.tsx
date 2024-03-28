"use client";

import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";

const types = ["Income", "Expense"];
const sessions = ["Session 01", "Session 02"];

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Props {
  params: { event_id: string };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  session: string,
  income: number,
  expense: number,
  currentProfit: number
) {
  return { session, income, expense, currentProfit };
}

function createBudgetData(
  budgetTitle: string,
  session: string,
  type: string,
  amount: number
) {
  return { budgetTitle, session, type, amount };
}

const rows = [
  createData("Session 01", 70000, 50000, 20000),
  createData("Session 02", 80000, 40000, 40000),
  createData("Session 03", 70000, 50000, 20000),
];

const budgetDataRows = [
  createBudgetData("Hall Rent", "Session 01", "Income", 7000),
  createBudgetData("Hall Rent", "Session 01", "Expense", 5000),
  createBudgetData("Hall Rent", "Session 02", "Income", 7000),
  createBudgetData("Hall Rent", "Session 01", "Income", 7000),
  createBudgetData("Hall Rent", "Session 01", "Income", 7000),
  createBudgetData("Hall Rent", "Session 02", "Income", 7000),
  createBudgetData("Hall Rent", "Session 02", "Income", 7000),
];

const BudgetManager = ({ params: { event_id } }: Props) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.secondary.main,
            }}
          >
            Budget Details
          </Typography>
        </Box>
        <Box
          sx={{ width: "100%", display: "flex", alignItems: "flex-end", p: 3 }}
        >
          <TableContainer sx={{ maxWidth: "90%" }} component={Paper}>
            <Table sx={{ borderRadius: "20px" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Budget Title</StyledTableCell>
                  <StyledTableCell align="center">Session</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgetDataRows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.budgetTitle}</StyledTableCell>
                    <StyledTableCell>{row.session}</StyledTableCell>
                    <StyledTableCell>{row.type}</StyledTableCell>
                    <StyledTableCell>{row.amount}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <IconButton color="secondary" onClick={handleClickOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                padding: "20px",
              }}
            >
              <DialogTitle
                color="secondary"
                sx={{ m: 0, p: 2, textAlign: "center" }}
                id="add-budget-title"
              >
                Add Budget Item
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
              <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
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
                    id="item title"
                    label="Budget Item Title"
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
                  id="item-type"
                  options={types}
                  style={{
                    boxSizing: "initial",
                    width: "85%",
                    maxWidth: "85%",
                  }}
                  renderInput={(params) => (
                    <TextField variant="filled" {...params} label="Item Type" />
                  )}
                />
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
                  id="item-type"
                  options={sessions}
                  style={{
                    boxSizing: "initial",
                    width: "85%",
                    maxWidth: "85%",
                  }}
                  renderInput={(params) => (
                    <TextField variant="filled" {...params} label="Session" />
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
                    id="item-amount"
                    label="Amount"
                    variant="filled"
                    type="number"
                  />
                </div>
              </Box>

              <DialogActions>
                <Button color="secondary" variant="outlined" autoFocus onClick={handleClose}>
                  Close
                </Button>
                <Button color="secondary" variant="contained" autoFocus onClick={handleClose}>
                  Add
                </Button>
              </DialogActions>
            </Box>
          </BootstrapDialog>
        </Box>

        <TableContainer sx={{ maxWidth: "90%", m: 3 }} component={Paper}>
          <Table sx={{ borderRadius: "20px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Session</StyledTableCell>
                <StyledTableCell align="right">Income</StyledTableCell>
                <StyledTableCell align="right">Expense</StyledTableCell>
                <StyledTableCell align="right">Current Profit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.session}>
                  <StyledTableCell component="th" scope="row">
                    {row.session}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.income}</StyledTableCell>
                  <StyledTableCell align="right">{row.expense}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.currentProfit}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer sx={{ maxWidth: "70%", m: 3 }} component={Paper}>
          <Table sx={{ borderRadius: "20px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Total Income</StyledTableCell>
                <StyledTableCell align="center">Total Expense</StyledTableCell>
                <StyledTableCell align="center">Total Profit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">1000000</StyledTableCell>
                <StyledTableCell align="center">500000</StyledTableCell>
                <StyledTableCell align="center">500000</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            margin: "3em",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ textTransform: "capitalize" }}
              onClick={() => {}}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                // Router.push("add2");
              }}
            >
              Open Budget Manager
            </Button>
          </Stack>
        </div>
      </Card>
    </Grid>
  );
};

export default BudgetManager;
