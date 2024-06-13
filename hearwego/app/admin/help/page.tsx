"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  Grid,
  Pagination,
  Tab,
  Tabs,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface HelpTicket {
  id: number;
  title: string;
  senderName: string;
  senderId: string | number;
  description: string;
  status: "to_solve" | "in_progress" | "solved";
  solution?: string;
}

const AdminHelpPage: React.FC = () => {
  const theme = useTheme();
  
  const [tabValue, setTabValue] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [helpTickets, setHelpTickets] = useState<HelpTicket[]>([
    {
      id: 1,
      title: "Issue with merchandise purchase",
      senderName: "Sender Name 1",
      senderId: 101,
      description: "Description of the issue...",
      status: "to_solve",
    },
    {
      id: 2,
      title: "Issue with account login",
      senderName: "Sender Name 2",
      senderId: 102,
      description: "Description of the issue...",
      status: "in_progress",
    },
    {
      id: 3,
      title: "Issue with payment",
      senderName: "Sender Name 3",
      senderId: 103,
      description: "Description of the issue...",
      status: "solved",
      solution: "Payment issue resolved.",
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState<HelpTicket | null>(null);
  const [solutionDialogOpen, setSolutionDialogOpen] = useState<boolean>(false);
  const [solutionText, setSolutionText] = useState<string>("");

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSelectedTicket(null);
    setShowDetails(false);
  };

  const handleRowClick = (params: { row: HelpTicket }) => {
    setSelectedTicket(params.row);
    setSolutionDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedTicket(null);
    setShowDetails(false);
  };

  const handleOpenSolutionDialog = () => {
    setSolutionDialogOpen(true);
  };

  const handleCloseSolutionDialog = () => {
    setSolutionDialogOpen(false);
  };

  const handleSolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSolutionText(event.target.value);
  };

  const handleAddSolution = () => {
    if (selectedTicket) {
      const updatedTickets = helpTickets.map((ticket) =>
        ticket.id === selectedTicket.id
          ? { ...ticket, status: "solved", solution: solutionText }
          : ticket
      );
      setHelpTickets(updatedTickets);
      setSolutionText("");
      setSolutionDialogOpen(false);
      setSelectedTicket(null);
      setShowDetails(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "senderName", headerName: "Sender Name", width: 200 },
    { field: "senderId", headerName: "Sender ID", width: 150 },
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        let statusColor = "";
        switch (params.value) {
          case "to_solve":
            statusColor = "#f44336"; // Red
            break;
          case "in_progress":
            statusColor = "#ff9800"; // Orange
            break;
          case "solved":
            statusColor = "#4caf50"; // Green
            break;
          default:
            break;
        }

        const StatusTypography = styled(Typography)({
          color: statusColor,
          fontWeight: "bold",
        });

        return <StatusTypography>{params.value}</StatusTypography>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.status === "to_solve" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSelectedTicket(params.row);
                handleOpenSolutionDialog();
              }}
            >
              Add Solution
            </Button>
          )}
        </>
      ),
    },
  ];

  const rows = helpTickets.map((ticket) => ({
    id: ticket.id,
    title: ticket.title,
    senderName: ticket.senderName || "",
    senderId: ticket.senderId || "",
    description: ticket.description,
    status: ticket.status,
  }));

  const CardContainer = styled(Card)(({ theme }) => ({
    width: "100%",
    minHeight: "100vh",
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
  }));

  const TabsContainer = styled(Tabs)(({ theme }) => ({
    marginTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }));

  const DataGridContainer = styled(Box)(({ theme }) => ({
    height: 400,
    width: "100%",
    marginTop: theme.spacing(2),
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(1),
  }));

  const PaginationContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2, 0),
  }));

  const DialogContentStyled = styled(DialogContent)({
    display: "grid",
    gridTemplateColumns: "120px auto",
    gap: "16px",
  });

  const LabelTypography = styled(Typography)({
    fontWeight: "bold",
    color: "#3f51b5",
    marginBottom: "4px",
  });

  const SolutionTextField = styled(TextField)({
    gridColumn: "span 2",
    marginBottom: "16px",
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardContainer>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Typography variant="h4">Help Center</Typography>
          </Box>
          <TabsContainer value={tabValue} onChange={handleChange}>
            <Tab label="All" value={-1} />
            <Tab label="To Solve" value={0} />
            <Tab label="In Progress" value={1} />
            <Tab label="Solved" value={2} />
          </TabsContainer>

          <DataGridContainer>
            <DataGrid
              rows={
                tabValue === -1
                  ? rows
                  : rows.filter((row) =>
                      tabValue === 0
                        ? row.status === "to_solve"
                        : tabValue === 1
                        ? row.status === "in_progress"
                        : row.status === "solved"
                    )
              }
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              autoHeight
              onRowClick={handleRowClick}
            />
          </DataGridContainer>

          <PaginationContainer>
            <Pagination
              count={Math.ceil(helpTickets.length / 5)}
              page={page}
              onChange={handlePageChange}
              color="secondary"
            />
          </PaginationContainer>
        </CardContainer>

        <Dialog open={solutionDialogOpen} onClose={handleCloseSolutionDialog}>
          <DialogTitle>
            {selectedTicket?.status === "to_solve"
              ? "Add Solution"
              : "Ticket Details"}
          </DialogTitle>
          <DialogContentStyled>
            {selectedTicket && (
              <>
                <LabelTypography>Title:</LabelTypography>
                <Typography>{selectedTicket.title}</Typography>

                <LabelTypography>Sender Name:</LabelTypography>
                <Typography>{selectedTicket.senderName}</Typography>

                <LabelTypography>Sender ID:</LabelTypography>
                <Typography>{selectedTicket.senderId}</Typography>

                <LabelTypography>Description:</LabelTypography>
                <Typography>{selectedTicket.description}</Typography>

                {selectedTicket.status === "to_solve" && (
                  <>
                    <LabelTypography>Solution:</LabelTypography>
                    <SolutionTextField
                      value={solutionText}
                      onChange={handleSolutionChange}
                      multiline
                      rows={3}
                      variant="outlined"
                      autoFocus
                    />
                  </>
                )}

                {selectedTicket.status === "solved" && (
                  <>
                    <LabelTypography>Solution:</Label>
                    <Typography>
{selectedTicket.solution}
</Typography>
</>
)}
</>
)}
</DialogContentStyled>
<DialogActions>
<Button onClick={handleCloseSolutionDialog}>Cancel</Button>
{selectedTicket?.status === "to_solve" && (
<Button
             onClick={handleAddSolution}
             variant="contained"
             color="primary"
           >
Submit Solution
</Button>
)}
</DialogActions>
</Dialog>
{selectedTicket &&
      showDetails &&
      selectedTicket.status !== "to_solve" && (
        <CardContainer sx={{ marginTop: "16px" }}>
          <Typography variant="h5">Ticket Details</Typography>
          <Box sx={{ marginBottom: "8px" }}>
            <Typography>ID: {selectedTicket.id}</Typography>
            <Typography>Title: {selectedTicket.title}</Typography>
            <Typography>
              Sender Name: {selectedTicket.senderName}
            </Typography>
            <Typography>Sender ID: {selectedTicket.senderId}</Typography>
            <Typography>
              Description: {selectedTicket.description}
            </Typography>
          </Box>
          {selectedTicket.status === "solved" && (
            <Typography>Solution: {selectedTicket.solution}</Typography>
          )}
          <Button
            onClick={handleCloseDetails}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </CardContainer>
      )}
  </Grid>
</Grid>
);
};