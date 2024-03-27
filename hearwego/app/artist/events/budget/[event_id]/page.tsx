"use client";

import {
  Box,
  Button,
  Card,
  Grid,
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
import { useRouter } from "next/navigation";

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

const rows = [
  createData("Session 01", 70000, 50000, 20000),
  createData("Session 02", 80000, 40000, 40000),
  createData("Session 03", 70000, 50000, 20000),
];

interface Props {
  params: { event_id: string };
}

const BudgetDetails = ({ params: { event_id } }: Props) => {
  const theme = useTheme();
  const Router = useRouter();

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
        <Box sx={{ m: 3 }}>
          <Box sx={{ display: "flex" }}>
            <Card
              sx={{
                width: "250px",
                height: "250px",
                backgroundImage: `url("https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-glossy-music-event-poster-design-template-84d38a706368baec17981e71a5e5810d_screen.jpg?ts=1636991393")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                mr: 2,
                borderRadius: "10px",
              }}
            ></Card>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Event Name:{" "}
                </Typography>
                <Typography variant="subtitle1">Night Club Party</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Session:{" "}
                </Typography>
                <Typography variant="subtitle1">Session 01</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Date:{" "}
                </Typography>
                <Typography variant="subtitle1">2024-01-29</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Time:{" "}
                </Typography>
                <Typography variant="subtitle1">8.00PM</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Venue:{" "}
                </Typography>
                <Typography variant="subtitle1">XYZ Hall</Typography>
              </Box>
            </Box>
          </Box>
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
                Router.push("manage/b1");
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

export default BudgetDetails;
