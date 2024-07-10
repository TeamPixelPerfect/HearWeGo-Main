"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Modal,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { use, useState } from "react";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "@/lib/hooks";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EditIcon from "@mui/icons-material/Edit";
import { getEvent, updateBudget } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import { getBudgetByEventId } from "@/app/services/EventServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Budget } from "@/app/constants/models";
import { useRouter } from "next/navigation";

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
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbar,
} from "@mui/x-data-grid";

interface Props {
  params: { event_id: string };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: theme.palette.primary.main, // Change to darker shade if needed
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-row": {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiCheckbox-root": {
    color: `${theme.palette.primary.main} !important`,
  },
  "& .MuiDataGrid-toolbarContainer": {
    "& .MuiButton-text": {
      color: theme.palette.primary.main,
    },
  },
}));

let sessionCount: number = 0;

const BudgetManager = ({ params: { event_id } }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);

  const [event, setEvent] = useState<Event | null>(null);
  const [budgets, setBudgets] = useState<Budget | null>({
    budget_currency: "LKR",
    budget_details: [],
    event_id: event_id,
  });
  const [budgetRows, setBudgetRows] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  React.useEffect(() => {
    getEvent(event_id).then((event) => {
      console.log("Event......", event);
      setEvent(event);
    });

    getBudgetByEventId(event_id).then((budgets) => {
      setBudgets(budgets);
      setBudgetRows(
        budgets?.budget_details?.map((detail, index) => ({
          id: index + 1,
          budgetTitle: detail.budget_title,
          budgetSession: detail.budget_session,
          budgetType: detail.budget_type,
          budgetAmount: detail.budget_amount,
        })) || []
      );
      console.log("Budgets......", budgets);
    });
  }, []);

  React.useEffect(() => {
    sessionCount = event?.sessions?.length;
  }, [event]);

  React.useEffect(() => {
    setBudgets({
      ...budgets,
      budget_details: budgetRows.map(
        ({ id, budgetTitle, budgetSession, budgetType, budgetAmount }) => ({
          budget_title: budgetTitle,
          budget_session: budgetSession,
          budget_type: budgetType,
          budget_amount: budgetAmount,
        })
      ),
    });
  }, [budgetRows]);

  const handleBudgetUpdate = async () => {
    try {
      await updateBudget(artist.token, event_id, budgets);
      setSnackbarSeverity("success");
      setSnackbarMessage("Budget updated successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to update budget.");
      setSnackbarOpen(true);
    }
  };

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
          padding: 3,
          // background: theme.palette.background.default,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Budget Manager for{" "}
          <Typography color="secondary" fontWeight={700}>
            {" "}
            {event?.event_name}{" "}
          </Typography>
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <BudgetTable
          budgetRows={budgetRows}
          setBudgetRows={setBudgetRows}
          event={event}
        />

        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            color="secondary"
            variant="contained"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<RestartAltIcon />}
              variant="outlined"
              color="error"
            >
              Reset
            </Button>
            <Button
              endIcon={<SaveIcon />}
              variant="contained"
              onClick={handleBudgetUpdate}
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          variant="filled"
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

const sponsorModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const budgetColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "budgetTitle", headerName: "Title", flex: 1, editable: true },
  { field: "budgetSession", headerName: "Session", flex: 1, editable: true },
  {
    field: "budgetType",
    headerName: "Type",
    type: "singleSelect",
    valueOptions: ["Income", "Expense"],
    flex: 1,
    editable: true,
  },
  {
    field: "budgetAmount",
    headerName: "Amount",
    type: "number",
    flex: 1,
    editable: true,
  },
];

let budgetRows = [];

type BudgetRow = {
  id: number;
  budgetTitle: string;
  budgetSession: string;
  budgetType: string;
  budgetAmount: string;
};

function BudgetTable({ budgetRows, setBudgetRows, event }) {
  const [budgetTitleError, setBudgetTitleError] = useState(false);
  const [budgetSessionError, setBudgetSessionError] = useState(false);
  const [budgetTypeError, setBudgetTypeError] = useState(false);
  const [budgetAmountError, setBudgetAmountError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [budgetTitle, setBudgetTitle] = useState("");
  const [budgetSession, setBudgetSession] = useState("");
  const [budgetType, setBudgetType] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRowData, setSelectedRowData] = useState<BudgetRow | null>(
    null
  );
  const handleBudgetTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudgetTitle(event.target.value);
    setBudgetTitleError(event.target.value.trim() === "");
  };

  const handleBudgetSessionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudgetSession(event.target.value);
    setBudgetSessionError(event.target.value.trim() === "");
  };

  const handleBudgetTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudgetType(event.target.value);
    setBudgetTypeError(event.target.value.trim() === "");
  };

  const handleBudgetAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBudgetAmount(event.target.value);
    setBudgetAmountError(!validateEmail(event.target.value));
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const validateFields = () => {
    console.log(budgetTitle, budgetSession, budgetType, budgetAmount)
 
    return (
      budgetTitle?.trim() !== "" &&
      budgetSession?.trim() !== "" &&
      budgetType?.trim() !== "" &&
      Number(budgetAmount) >= 0
    );
  };

  const updateRowData = () => {
    if (selectedRows.length === 1 && validateFields()) {
      setBudgetTitleError(false);
      setBudgetSessionError(false);
      setBudgetTypeError(false);
      setBudgetAmountError(false);

      const selectedRowId = selectedRows[0] as number;

      const rowIndex = budgetRows.findIndex((row) => row.id === selectedRowId);

      if (rowIndex !== -1) {
        const updatedRow = {
          id: selectedRowId,
          budgetTitle,
          budgetSession,
          budgetType,
          budgetAmount,
        };

        const updatedRows = [
          ...budgetRows.slice(0, rowIndex),
          updatedRow,
          ...budgetRows.slice(rowIndex + 1),
        ];

        setBudgetRows(updatedRows);

        refreshTable();
        handleClose();
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = budgetRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    const reindexedRows = updatedRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));

    setBudgetRows(reindexedRows);
    setSelectedRows([]);
    setBudgetTitleError(false);
    setBudgetSessionError(false);
    setBudgetTypeError(false);
    setBudgetAmountError(false);
    setErrorMessage("");
    refreshTable();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setBudgetTitleError(false);
    setBudgetSessionError(false);
    setBudgetTypeError(false);
    setBudgetAmountError(false);
    setErrorMessage("");
    setOpen(false);
  };

  const handleOpenForAdd = () => {
    setBudgetTitle("");
    setBudgetSession("");
    setBudgetType("");
    setBudgetAmount("");
    setSelectedRowData(null);
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0] as number;
      const selectedRow = budgetRows.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        setBudgetTitle(selectedRow.budgetTitle);
        setBudgetSession(selectedRow.budgetSession);
        setBudgetType(selectedRow.budgetType);
        setBudgetAmount(selectedRow.budgetAmount);
        setSelectedRowData(selectedRow);
        setOpen(true);
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const addNewBudget = () => {
    if (validateFields()) {
      setErrorMessage("");
      setBudgetTitleError(false);
      setBudgetSessionError(false);
      setBudgetTypeError(false);
      setBudgetAmountError(false);

      //----
      const newId = budgetRows.length
        ? Math.max(...budgetRows.map((row) => row.id)) + 1
        : 1;
      const newBudget: BudgetRow = {
        id: newId,
        budgetTitle,
        budgetSession,
        budgetType,
        budgetAmount,
      };

      setBudgetRows([...budgetRows, newBudget]);
      refreshTable();
      handleClose();
    } else {
      console.log("Please fill in all required fields with correct format.");
      setErrorMessage(
        "Please fill in all required fields with correct format."
      );
    }
  };
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div style={{ width: "100%" }}>
      <StyledDataGrid
        key={refreshKey}
        rows={budgetRows}
        columns={budgetColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{ marginBottom: "1em" }}
        pageSizeOptions={[5, 10, 20, 30]}
        components={{ Toolbar: GridToolbar }}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
        rowSelectionModel={selectedRows}
      />

      <div>
        <IconButton
          onClick={handleOpenForAdd}
          aria-label="add"
          color="secondary"
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          onClick={handleDelete}
          aria-label="delete"
          disabled={selectedRows.length == 0}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleOpenForUpdate}
          aria-label="update"
          disabled={selectedRows.length != 1}
        >
          <EditIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={sponsorModalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1em" }}
            >
              {selectedRowData ? "Update Budget Details" : "Add Budget Details"}
            </Typography>

            <TextField
              id="budget_title"
              label="Budget Title"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={budgetTitle}
              onChange={handleBudgetTitleChange}
              error={budgetTitleError}
              helperText={budgetTitleError ? "Budget Title is required" : ""}
            />

            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="budget_session">Session</InputLabel>
                <Select
                  labelId="budget_session_select"
                  id="demo-simple-select"
                  value={budgetSession}
                  label="Session"
                  onChange={handleBudgetSessionChange}
                  defaultValue=""
                  error={budgetSessionError}
                  variant="filled"
                >
                  {Array.from(Array(sessionCount)).map((_, index) => (
                    <MenuItem value={"session" + (index + 1)}>
                      Session {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="budget_type">Type</InputLabel>
                <Select
                  labelId="budget_type_select"
                  id="demo-simple-select"
                  value={budgetType}
                  label="Type"
                  onChange={handleBudgetTypeChange}
                  error={budgetTypeError}
                  defaultValue=""
                  variant="filled"
                >
                  <MenuItem value={"Income"}>Income</MenuItem>
                  <MenuItem value={"Expense"}>Expense</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              id="budget_amount"
              label="Amount"
              variant="filled"
              type="number"
              sx={{ width: "100%", marginBottom: 2 }}
              value={budgetAmount}
              onChange={handleBudgetAmountChange}
              error={budgetAmountError}
              helperText={budgetAmountError ? "Amount is required" : ""}
            />

            {errorMessage && (
              <div
                style={{
                  color: "red",
                  marginBottom: "2em",
                  fontSize: "14px",
                  textDecoration: "italic",
                }}
              >
                {errorMessage}
              </div>
            )}

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="contained"
                onClick={selectedRowData ? updateRowData : addNewBudget}
              >
                {selectedRowData ? "Update" : "Add"}
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default BudgetManager;
