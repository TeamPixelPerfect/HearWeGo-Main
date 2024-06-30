"use client";

import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { use } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useAppSelector } from "@/lib/hooks";
import TableContainer from "@mui/material/TableContainer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { getEventById } from "@/app/services/EventServices";
import { useEffect, useState } from "react";
import { Event } from "@/app/constants/models";
import { Budget } from "@/app/constants/models";
import { getBudgetByEventId } from "@/app/services/EventServices";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TicketType } from "@/app/constants/models";
import { AutoTicket } from "@/app/constants/models";
import { ManualTicket } from "@/app/constants/models";
import { RemainingTickets } from "@/app/constants/models";
import { getEvent } from "@/app/services/EventServices";
import { getAutoTicketByEventId } from "@/app/services/EventServices";
import { getManualTicketByEventId } from "@/app/services/EventServices";
import { getTicketTypeByEventId } from "@/app/services/EventServices";
import { WidthFull } from "@mui/icons-material";
import { GridColDef, GridRowSelectionModel, DataGrid } from "@mui/x-data-grid";
import { get } from "http";
import { set } from "date-fns";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: theme.palette.primary.light,
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

let sessionCount = 0;

interface Props {
  params: { event_id: string };
}

function switchStatus(status: string) {
  switch (status) {
    case "public":
      return <Chip color="success" icon={<PublicIcon />} label="Public" />;
    case "private":
      return <Chip color="secondary" icon={<LockIcon />} label="Private" />;
    default:
      return <Chip icon={<LockIcon />} label="Private" />;
  }
}

const manulTicketColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, editable: true },
  { field: "ticketSession", headerName: "Session", flex: 1, editable: true },
  {
    field: "ticketLocation",
    headerName: "Where to Buy Tickets",
    flex: 1,
    editable: true,
  },
];

type ManualTicketRow = {
  id: number;
  ticketSession: string;
  ticketLocation: string;
};

// let manualTicketRows = [];

function ManualTicketTable({ manualTicketRows, setManualTicketRows }) {
  const [ticketLocationError, setTicketLocationError] = useState(false);
  const [ticketSessionError, setTicketSessionError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [ticketSession, setTicketSession] = useState("");
  const [ticketLocation, setTicketLocation] = useState("");
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRowData, setSelectedRowData] =
    useState<ManualTicketRow | null>(null);

  const handleTicketLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketLocation(event.target.value);
    setTicketLocationError(event.target.value.trim() === "");
  };

  const handleTicketSessionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketSession(event.target.value);
    setTicketSessionError(event.target.value.trim() === "");
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const validateFields = () => {
    return ticketLocation.trim() !== "" && ticketSession.trim() !== "";
  };

  const updateRowData = () => {
    if (selectedRows.length === 1 && validateFields()) {
      setTicketLocationError(false);
      setTicketSessionError(false);

      const selectedRowId = selectedRows[0] as number;

      const rowIndex = manualTicketRows.findIndex(
        (row) => row.id === selectedRowId
      );

      if (rowIndex !== -1) {
        const updatedRow = {
          id: selectedRowId,
          ticketSession,
          ticketLocation,
        };

        const updatedRows = [
          ...manualTicketRows.slice(0, rowIndex),
          updatedRow,
          ...manualTicketRows.slice(rowIndex + 1),
        ];

        setManualTicketRows(updatedRows);

        refreshTable();
        handleClose();
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = manualTicketRows.filter(
      (row) => !selectedRows.includes(row.id)
    );

    const reindexedRows = updatedRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));

    setManualTicketRows(reindexedRows);
    setSelectedRows([]);
    setTicketLocationError(false);
    setTicketSessionError(false);
    setErrorMessage("");
    refreshTable();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTicketLocationError(false);
    setTicketSessionError(false);
    setErrorMessage("");
    setOpen(false);
  };

  const handleOpenForAdd = () => {
    setTicketLocation("");
    setTicketSession("");
    setSelectedRowData(null);
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0] as number;
      const selectedRow = manualTicketRows.find(
        (row) => row.id === selectedRowId
      );
      if (selectedRow) {
        setTicketLocation(selectedRow.ticketLocation);
        setTicketSession(selectedRow.ticketSession);
        setSelectedRowData(selectedRow);
        setOpen(true);
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const addNewTicket = () => {
    if (validateFields()) {
      setErrorMessage("");
      setTicketLocationError(false);
      setTicketSessionError(false);

      const newId = manualTicketRows.length
        ? Math.max(...manualTicketRows.map((row) => row.id)) + 1
        : 1;
      const newTicket = {
        id: newId,
        ticketLocation,
        ticketSession,
      };

      setManualTicketRows([...manualTicketRows, newTicket]);
      refreshTable();
      handleClose();
    } else {
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
        rows={manualTicketRows}
        columns={manulTicketColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
          <Box sx={autoTicketModalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1em" }}
            >
              {selectedRowData ? "Update Ticket Details" : "Add Ticket Details"}
            </Typography>

            <TextField
              id="ticket_location"
              label="Whare to Buy Tickets"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={ticketLocation}
              onChange={handleTicketLocationChange}
              error={ticketLocationError}
              helperText={
                ticketLocationError ? "Ticket Location is required" : ""
              }
            />

            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="ticket_session_a">Session</InputLabel>
                <Select
                  labelId="ticket_session_select_a"
                  id="ticket_session_select_a"
                  value={ticketSession}
                  label="Session"
                  onChange={handleTicketSessionChange}
                  defaultValue=""
                  error={ticketSessionError}
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
                onClick={selectedRowData ? updateRowData : addNewTicket}
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

const autoTicketModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const autoTicketColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, editable: true },
  { field: "ticketType", headerName: "Ticket Type", flex: 1, editable: true },
  { field: "ticketPrice", headerName: "Price", flex: 1, editable: true },
  { field: "ticketCount", headerName: "Count", flex: 1, editable: true },
  { field: "ticketSession", headerName: "Session", flex: 1, editable: true },
];

let autoTicketRows = [];

type AutoTicketRow = {
  id: number;
  ticketType: string;
  ticketPrice: string;
  ticketCount: string;
  ticketSession: string;
};

function AutoTicketTable({ autoTicketRows, setAutoTicketRows }) {
  const [ticketTypeError, setTicketTypeError] = useState(false);
  const [ticketPriceError, setTicketPriceError] = useState(false);
  const [ticketCountError, setTicketCountError] = useState(false);
  const [ticketSessionError, setTicketSessionError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [ticketSession, setTicketSession] = useState("");
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRowData, setSelectedRowData] = useState<AutoTicketRow | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTicketTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketType(event.target.value);
    setTicketTypeError(event.target.value.trim() === "");
  };

  const handleTicketPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketPrice(event.target.value);
    setTicketPriceError(event.target.value.trim() === "");
  };

  const handleTicketCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketCount(event.target.value);
    setTicketCountError(event.target.value.trim() === "");
  };

  const handleTicketSessionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTicketSession(event.target.value);
    setTicketSessionError(event.target.value.trim() === "");
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const validateFields = () => {
    return (
      ticketType.trim() !== "" &&
      ticketPrice.trim() !== "" &&
      ticketCount.trim() !== "" &&
      ticketSession.trim() !== ""
    );
  };

  const updateRowData = () => {
    if (selectedRows.length === 1 && validateFields()) {
      setTicketTypeError(false);
      setTicketPriceError(false);
      setTicketCountError(false);
      setTicketSessionError(false);

      const selectedRowId = selectedRows[0] as number;

      const rowIndex = autoTicketRows.findIndex(
        (row) => row.id === selectedRowId
      );

      if (rowIndex !== -1) {
        const updatedRow = {
          id: selectedRowId,
          ticketType,
          ticketPrice,
          ticketCount,
          ticketSession,
        };

        const updatedRows = [
          ...autoTicketRows.slice(0, rowIndex),
          updatedRow,
          ...autoTicketRows.slice(rowIndex + 1),
        ];

        setAutoTicketRows(updatedRows);

        refreshTable();
        handleClose();
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = autoTicketRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    const reindexedRows = updatedRows.map((row, index) => ({
      ...row,
      id: index + 1,
    }));

    setAutoTicketRows(reindexedRows);
    setSelectedRows([]);
    setTicketTypeError(false);
    setTicketPriceError(false);
    setTicketCountError(false);
    setTicketSessionError(false);
    setErrorMessage("");
    refreshTable();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTicketTypeError(false);
    setTicketPriceError(false);
    setTicketCountError(false);
    setTicketSessionError(false);
    setErrorMessage("");
    setOpen(false);
  };

  const handleOpenForAdd = () => {
    setTicketType("");
    setTicketPrice("");
    setTicketCount("");
    setTicketSession("");
    setSelectedRowData(null);
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0] as number;
      const selectedRow = autoTicketRows.find(
        (row) => row.id === selectedRowId
      );
      if (selectedRow) {
        setTicketType(selectedRow.ticketType);
        setTicketPrice(selectedRow.ticketPrice);
        setTicketCount(selectedRow.ticketCount);
        setTicketSession(selectedRow.ticketSession);
        setSelectedRowData(selectedRow);
        setOpen(true);
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const addNewTicket = () => {
    if (validateFields()) {
      setErrorMessage("");
      setTicketTypeError(false);
      setTicketPriceError(false);
      setTicketCountError(false);
      setTicketSessionError(false);

      const newId = autoTicketRows.length
        ? Math.max(...autoTicketRows.map((row) => row.id)) + 1
        : 1;
      const newTicket: AutoTicketRow = {
        id: newId,
        ticketType: ticketType,
        ticketPrice,
        ticketCount,
        ticketSession,
      };

      setAutoTicketRows([...autoTicketRows, newTicket]);
      refreshTable();
      handleClose();
    } else {
      setErrorMessage(
        "Please fill in all required fields with correct format."
      );
    }
  };

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div style={{ width: "100%" }}>
      <StyledDataGrid
        key={refreshKey}
        rows={autoTicketRows}
        columns={autoTicketColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
          <Box sx={autoTicketModalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1em" }}
            >
              {selectedRowData ? "Update Ticket Details" : "Add Ticket Details"}
            </Typography>

            <TextField
              id="ticket_type"
              label="Ticket Type"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={ticketType}
              onChange={handleTicketTypeChange}
              error={ticketTypeError}
              helperText={ticketTypeError ? "Ticket Type is required" : ""}
            />

            <TextField
              id="ticket_price"
              label="Price"
              variant="filled"
              type="number"
              sx={{ width: "100%", marginBottom: 2 }}
              value={ticketPrice}
              onChange={handleTicketPriceChange}
              error={ticketPriceError}
              helperText={ticketPriceError ? "Price is required" : ""}
            />

            <TextField
              id="ticket_count"
              label="Count"
              variant="filled"
              type="number"
              sx={{ width: "100%", marginBottom: 2 }}
              value={ticketCount}
              onChange={handleTicketCountChange}
              error={ticketCountError}
              helperText={ticketCountError ? "Count is required" : ""}
            />

            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="ticket_session_a">Session</InputLabel>
                <Select
                  labelId="ticket_session_select_a"
                  id="ticket_session_select_a"
                  value={ticketSession}
                  label="Session"
                  onChange={handleTicketSessionChange}
                  defaultValue=""
                  error={ticketSessionError}
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
                onClick={selectedRowData ? updateRowData : addNewTicket}
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

function ShowTicketDetails(
  ticketType: string,
  setAutoTicketRows,
  autoTicketRows
) {
  switch (ticketType) {
    case "Auto":
      return (
        <AutoTicketTable
          autoTicketRows={autoTicketRows}
          setAutoTicketRows={setAutoTicketRows}
        />
      );
    case "Manual":
      return <Chip color="secondary" label="Paid" />;
    default:
      return <Chip label="Free" />;
  }
}
const TicketDetails = ({ params: { event_id } }: Props) => {
  const theme = useTheme();
  const artist = useAppSelector((state) => state.artist.user);
  const Router = useRouter();

  const [ticketType, setTicketType] = useState<TicketType>();
  const [autoTicket, setAutoTicket] = useState<AutoTicket[]>([]);
  const [manualTicket, setManualTicket] = useState<ManualTicket[]>([]);
  const [budget, setBudget] = useState<Budget>();
  const [event, setEvent] = useState<Event>();
  const [autoTicketRows, setAutoTicketRows] = useState<AutoTicketRow[]>([]);
  const [manualTicketRows, setManualTicketRows] = useState<ManualTicket[]>([]);

  useEffect(() => {
    getTicketTypeByEventId(event_id).then((ticketType) => {
      setTicketType(ticketType);
      console.log("Ticket Type", ticketType);
    });

    getAutoTicketByEventId(event_id).then((autoTicket) => {
      try {
        setAutoTicketRows(
          autoTicket.data.map((ticket, index) => ({
            id: index + 1,
            ticketType: ticket.ticket_type,
            ticketPrice: ticket.ticket_price,
            ticketCount: ticket.ticket_count,
            ticketSession: ticket.ticket_session,
          }))
        );
      } catch (error) {
        setAutoTicketRows([]);
      }
    });

    getManualTicketByEventId(event_id).then((manualTicket) => {
      try {
        setManualTicketRows(
          manualTicket.data.map((ticket, index) => ({
            id: index + 1,
            ticketSession: ticket.ticket_session,
            ticketLocation: ticket.ticket_location,
          }))
        );
      } catch (error) {
        setManualTicketRows([]);
      }
    });

    getEvent(event_id).then((event) => {
      setEvent(event);
      console.log("Event", event);
    });
  }, []);

    useEffect(() => {
        if (event) {
        sessionCount = event.sessions?.length;
        }
    }, [event]);

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
            Ticket Details
          </Typography>
        </Box>
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
                  m: 1,
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
                  m: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mr: 1 }}>
                  Sessions:{" "}
                </Typography>
                <Typography variant="subtitle1">
                  {event?.sessions?.length}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                  m: 1,
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

        <Box sx={{ m: 3 }}>
          {ticketType?.ticket_type === "Auto" ? (
            <Box sx={{width: "100%"}}>
                <Paper sx={{width: "100%", display: "flex"}}>
                    <Box sx={{width: "20%"}}>
                        <CardMedia
                            component="img"
                            sx={{width: "150px", height: "150px"}}
                            image={ticketType?.ticket_img? ticketType?.ticket_img : "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/defaultEvent.jpeg"}
                        />
                    </Box>
                    <Box sx={{width: "40%"}}>
                        <Typography variant="h6" sx={{ fontSize: "20px" }}>
                            Ticket ID: -
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: "20px" }}>
                            Ticket Type: Gold
                        </Typography>
                    </Box>
                </Paper>
                <AutoTicketTable
              autoTicketRows={autoTicketRows}
              setAutoTicketRows={setAutoTicketRows}
            />
            </Box>
            
          ) : ticketType?.ticket_type === "Manual" ? (
            <ManualTicketTable
              manualTicketRows={manualTicketRows}
              setManualTicketRows={setManualTicketRows}
            />
          ) : (
            <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 700 }}>
              Ticket details are not provided
            </Typography>
          )}
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

export default TicketDetails;
