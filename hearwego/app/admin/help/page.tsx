"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  Grid,
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
import { HelpComplaints } from "../../constants/models";
import { getComplaints, updateComplaint } from "../../services/HelpServices";
import { HelpDialog, AddCategoryDialog } from "./HelpForm/HelpForm";

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

const AdminHelpPage: React.FC = () => {
  const theme = useTheme();

  const [tabValue, setTabValue] = useState<number>(-1);
  const [page, setPage] = useState<number>(1);
  const [Complaints, setComplaints] = useState<HelpComplaints[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<HelpComplaints | null>(
    null
  );
  const [solutionDialogOpen, setSolutionDialogOpen] = useState<boolean>(false);
  const [solutionText, setSolutionText] = useState("");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [setChanged, setSetChanged] = useState<boolean>(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState<boolean>(false); // State for category dialog

  useEffect(() => {
    getComplaints().then((complaints) => {
      setComplaints(complaints.data);
    });
    if (setChanged) setSetChanged(false);
  }, [setChanged]);

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

  const handleHelpDialogClose = () => {
    setHelpDialogOpen(false);
  };

  const handleHelpDialogOpen = () => {
    setHelpDialogOpen(true);
  };

  const handleCategoryDialogClose = () => {
    setCategoryDialogOpen(false);
  };

  const handleCategoryDialogOpen = () => {
    setCategoryDialogOpen(true);
  };

  const handleRowClick = (params: { row: HelpComplaints }) => {
    console.log("Row clicked:", params.row);
    setSelectedTicket({
      ComplaintFormId: params.row.id,
      ComplaintTitle: params.row.title,
      userName: params.row.senderName,
      userId: params.row.senderId,
      ProblemInBrief: params.row.description,
      status: params.row.status,
      solution: params.row.solution, // Ensure the solution is assigned
    });
    setSolutionDialogOpen(true);
  };

  useEffect(() => {
    console.log("Selected Ticket:", selectedTicket);
  }, [selectedTicket]);

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

  const handleAddSolution = async () => {
    if (selectedTicket) {
      try {
        const updatedTicket = {
          ...selectedTicket,
          status: "solved",
          solution: solutionText,
        };

        await updateComplaint(
          updatedTicket.ComplaintFormId as string,
          updatedTicket
        );
        setSetChanged(true);
        const updatedTickets = Complaints.map((ticket) =>
          ticket.ComplaintFormId === selectedTicket.ComplaintFormId
            ? updatedTicket
            : ticket
        );

        setComplaints(updatedTickets);
        setSolutionText("");
        setSolutionDialogOpen(false);
        setSelectedTicket(null);
        setShowDetails(false);
      } catch (error) {
        console.error("Failed to update complaint:", error);
      }
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

  const rows = useMemo(
    () => 
      Complaints.map((ticket) => ({
        id: ticket.ComplaintFormId || 0,
        title: ticket.ComplaintTitle || "",
        senderName: ticket.userName || "",
        senderId: ticket.userId || "",
        description: ticket.ProblemInBrief,
        status: ticket.status,
        solution: ticket.solution, // Ensure the solution is included
      })),
    [Complaints]
  );

  const filteredRows = useMemo(() => {
    switch (tabValue) {
      case -1:
        return rows;
      case 0:
        return rows.filter((row) => row.status === "to_solve");
      case 2:
        return rows.filter((row) => row.status === "solved");
      default:
        return rows;
    }
  }, [rows, tabValue]);

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
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Help Center
            </Typography>
          </Box>
          <TabsContainer value={tabValue} onChange={handleChange}>
            <Tab label="All" value={-1} />
            <Tab label="To Solve" value={0} />
            <Tab label="Solved" value={2} />
          </TabsContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleHelpDialogOpen}
              sx={{ padding: "8px 16px" }}
            >
              Add Q&A
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCategoryDialogOpen}
              sx={{ padding: "8px 16px" }}
            >
              Add Help Category
            </Button>
          </Box>
          <DataGridContainer
            sx={{
              height: "100%",
            }}
          >
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[25, 50]}
              pagination
              autoHeight
              onRowClick={(params) => handleRowClick(params)}
            />
          </DataGridContainer>
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
                <Typography>{selectedTicket?.ComplaintTitle}</Typography>

                <LabelTypography>Sender Name:</LabelTypography>
                <Typography>{selectedTicket?.userName}</Typography>

                <LabelTypography>Sender ID:</LabelTypography>
                <Typography>{selectedTicket?.userId}</Typography>

                <LabelTypography>Description:</LabelTypography>
                <Typography>{selectedTicket?.ProblemInBrief}</Typography>

                {selectedTicket.status === "to_solve" && (
                  <>
                    <LabelTypography>Solution:</LabelTypography>
                    <SolutionTextField
                      focused
                      value={solutionText}
                      onChange={handleSolutionChange}
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  </>
                )}

                {selectedTicket.status === "solved" && (
                  <>
                    <LabelTypography>Solution:</LabelTypography>
                    <Typography>{selectedTicket.solution}</Typography>
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
        <HelpDialog open={helpDialogOpen} onClose={handleHelpDialogClose} />
        <AddCategoryDialog
          open={categoryDialogOpen}
          onClose={handleCategoryDialogClose}
        />

        {selectedTicket &&
          showDetails &&
          selectedTicket.status !== "to_solve" && (
            <CardContainer sx={{ marginTop: "16px" }}>
              <Typography variant="h5">Ticket Details</Typography>
              <Box sx={{ marginBottom: "8px" }}>
                <Typography>ID: {selectedTicket.ComplaintFormId}</Typography>
                <Typography>Title: {selectedTicket.ComplaintTitle}</Typography>
                <Typography>Sender Name: {selectedTicket.userName}</Typography>
                <Typography>Sender ID: {selectedTicket.userId}</Typography>
                <Typography>
                  Description: {selectedTicket.ProblemInBrief}
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
export default AdminHelpPage;
