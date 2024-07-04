"use client";

import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { use } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { getEventById } from "@/app/services/EventServices";
import { useEffect, useState } from "react";
import { Event } from "@/app/constants/models";
import { Budget } from "@/app/constants/models";
import { getBudgetByEventId } from "@/app/services/EventServices";
import { useRouter } from "next/navigation";
import { WidthFull } from "@mui/icons-material";

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

interface Props {
  params: { event_id: string };
}

interface GroupedSessions {
  [key: string]: {
    session_name: string;
    income: number;
    expense: number;
  };
}

interface BudgetItem {
  budget_amount: string;
  budget_session: string;
  budget_title: string;
  budget_type: string;
}


interface SessionSummary {
  session_name: string;
  income: number;
  expense: number;
  total_profit: number;
}

function switchStatus (status: string) {
  switch(status) {
    case "public":
      return <Chip color="success" icon={<PublicIcon />} label="Public" />;
    case "private":
      return <Chip color="secondary" icon={<LockIcon />} label="Private" />;
    default:
      return <Chip icon={<LockIcon />} label="Private" />;
  }
}

const BudgetDetails = ({ params: { event_id } }: Props) => {
  const theme = useTheme();
  const Router = useRouter();
  const [budget, setBudget] = useState<Budget>();
  const [event, setEvent] = useState<Event[]>([]);

  useEffect(() => {
    getBudgetByEventId(event_id).then((budget) => {
      setBudget(budget);
      console.log("Budget", budget);
      console.log("Budget", budget.budget_details);
    });

    getEventById(event_id).then((event) => {
      setEvent(event.data);
      console.log("Event", event.data);
    });
  }, []);

  const budgetData: BudgetItem[] = budget?.budget_details || [];

  const groupedSessions: GroupedSessions = budgetData.reduce((acc: GroupedSessions, item: BudgetItem) => {
    const session = item.budget_session;
    const amount = parseFloat(item.budget_amount);
  
    if (!acc[session]) {
      acc[session] = { session_name: session, income: 0, expense: 0 };
    }
  
    if (item.budget_type === "Income") {
      acc[session].income += amount;
    } else if (item.budget_type === "Expense") {
      acc[session].expense += amount;
    }
  
    return acc;
  }, {});
  
  const result: SessionSummary[] = Object.values(groupedSessions).map(session => ({
    session_name: session.session_name,
    income: session.income,
    expense: session.expense,
    total_profit: session.income - session.expense
  }));
  
  console.log(result);
  
  const totalIncome = result.reduce((sum, session) => sum += session.income, 0);
  const totalExpense = result.reduce((sum, session) => sum += session.expense, 0);
  const totalProfit = totalIncome - totalExpense;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Session', 'Income', 'Expense', 'Current Profit']],
      body: result.map(row => [row.session_name, row.income, row.expense, row.total_profit])
    });
    doc.save(`budget_${event_id}.pdf`);
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
        {event.map((event) => (
          <Box sx={{ m: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Card
              sx={{
                width: "150px",
                height: "150px",
                backgroundImage: `url(${event?.event_img})`,
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
                  m: 1
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Event Name:{" "}
                </Typography>
                <Typography variant="subtitle1">{event?.event_name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                  m: 1
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Sessions:{" "}
                </Typography>
                <Typography variant="subtitle1">{event?.sessions?.length}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                  m: 1
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Status:{" "}
                </Typography>
                <span>{switchStatus(event?.event_status)}</span>
              </Box>
            </Box>
          </Box>
        </Box>  
        ))}
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
              {result.map((row) => (
                <StyledTableRow key={row.session_name}>
                  <StyledTableCell component="th" scope="row">
                    {row.session_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.income}</StyledTableCell>
                  <StyledTableCell align="right">{row.expense}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total_profit}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button endIcon={<PictureAsPdfIcon />} sx={{marginLeft: 4}} color="secondary" variant="contained" onClick={downloadPDF}>Download PDF</Button>

        <Box sx={{width: "100%", display: "flex", m: 2, flexWrap: "wrap", alignItems: "center"}}>
          <Paper elevation={2} sx={{width: "200px", padding: 2, m: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h6" color="secondary">Total Income</Typography>
            <Divider sx={{width: "100%", marginBottom: 2}} />
            <Typography variant="h5">{totalIncome}</Typography>
          </Paper>
              <Typography variant="h5">-</Typography>
          <Paper elevation={2} sx={{width: "200px", padding: 2, m: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h6" color="secondary">Total Expense</Typography>
            <Divider sx={{width: "100%", marginBottom: 2}} />
            <Typography variant="h5">{totalExpense}</Typography>
          </Paper>
          <Typography variant="h5">=</Typography>
          <Paper elevation={2} sx={{width: "200px", padding: 2, m: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h6" color="primary" fontWeight={600}>Current Profit</Typography>
            <Divider sx={{width: "100%", marginBottom: 2}} />
            <Typography variant="h5" fontWeight={700} color={(totalProfit>0)? "success": "error"}>{totalProfit}</Typography>
          </Paper>
        </Box>
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
                Router.push(`manage/${event_id}`);
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
