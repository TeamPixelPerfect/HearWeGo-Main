"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import DropFile from "@/app/components/DropFile";
import {
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Modal,
  Divider,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  SwitchProps,
  FilledInput,
  FormHelperText,
} from "@mui/material";
import { GridColDef, GridRowSelectionModel, DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { green, red } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Event } from "@/app/constants/models";
import { getEvent } from "@/app/services/EventServices";
import { updateEvent } from "@/app/services/EventServices";
import { set } from "date-fns";

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

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#4338ca" : "#4338ca",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#39393D" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function EventDetails() {
  const { event_id } = useParams();
  const artist = useAppSelector((state) => state.artist.user);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isAgeEnabled, setIsAgeEnabled] = useState(false);
  const [imgFile, setImgFile] = React.useState(null);
  const [eventData, setEventData] = useState<Event>({});
  const [updatedEventData, setUpdatedEventData] = useState<Event>({
    event_img: "",
    event_name: "",
    event_type: "",
    age_from: 0,
    age_to: 0,
    sponsor: [],
    teams: [],
  });
  const [teamRows, setTeamRows] = useState<TeamRow[]>([]);
  const [sponsorRows, setSponsorRows] = useState<SponsorRow[]>([]);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
    ...(error && {
      bgcolor: red[500],
      "&:hover": {
        bgcolor: red[700],
      },
    }),
  };

  useEffect(() => {
    getEvent(event_id as string).then((response) => {
      setEventData(response);
      console.log("Event Data", response);
      setTeamRows(
        response.teams?.map((team, index) => ({
          id: index + 1,
          teamType: team.team_type,
          teamName: team.team_name,
          teamContact: team.contact,
          teamEmail: team.email,
        })) || []
      );

      setSponsorRows(
        response.sponsor?.map((sponsor, index) => ({
          id: index + 1,
          sponsorType: sponsor.sponsor_type,
          sponsorName: sponsor.sponsor_name,
          sponsorContact: sponsor.sponsor_contact,
          sponsorEmail: sponsor.sponsor_email,
        })) || []
      );
      //   setIsAgeEnabled(response.data.age_from !== null);
    });
  }, []);

  useEffect(() => {
    setImgFile(eventData.event_img as any);
  }, [eventData.event_img]);

  useEffect(() => {
    setEventData({
      ...eventData,
      teams: teamRows.map((team) => ({
        team_type: team.teamType,
        team_name: team.teamName,
        contact: team.teamContact,
        email: team.teamEmail,
      })),
    });
  }, [teamRows]);

  useEffect(() => {
    setEventData({
      ...eventData,
      sponsor: sponsorRows.map((sponsor) => ({
        sponsor_type: sponsor.sponsorType,
        sponsor_name: sponsor.sponsorName,
        sponsor_contact: sponsor.sponsorContact,
        sponsor_email: sponsor.sponsorEmail,
      })),
    });
  }, [sponsorRows]);

  useEffect(() => {
    if (imgFile) {
      setEventData({ ...eventData, event_img: imgFile });
    }
  }, [imgFile]);

  const sessionRows = eventData.sessions || [];

  //   useEffect(() => {
  //     if (eventData.event_img) {
  //       setEventData({ ...eventData, event_img: imgFile });
  //     }
  //   }, [imgFile]);

  const handleCheckboxChange = (event) => {
    setIsAgeEnabled(event.target.checked);
  };

  const handleSwitchChange = (event) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      event_status: event.target.checked ? "public" : "private",
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      updateEvent(artist?.token, event_id as string, eventData);
      setSuccess(true);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper
        sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
        elevation={3}
      >
        <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
          Basic Event Details
        </Typography>

        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DropFile
              fileTypes="Event Cover Image"
              fileExtensions="JPEG,PNG,WEBP,SVG"
              isCircular={false}
              width="250px"
              height="250px"
              file={imgFile}
              setFile={setImgFile}
              aspectX={1}
              aspectY={1}
              shape="rect"
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Stack spacing={2}>
              <FormControl variant="filled">
                <FormHelperText>Event Name</FormHelperText>
                {/* <InputLabel htmlFor="component-filled">Event Name</InputLabel> */}
                <FilledInput
                  id="event_name"
                  value={eventData.event_name}
                  sx={{ width: "100%" }}
                onChange={(e) =>
                  setEventData((data) => ({
                    ...data,
                    event_name: e.target.value,
                  }))
                }
                />
              </FormControl>

              <FormControl variant="filled">
              <FormHelperText>Event Type</FormHelperText>
                {/* <InputLabel htmlFor="component-filled">Event Name</InputLabel> */}
                <FilledInput
                  id="event_type"
                  value={eventData.event_type}
                  sx={{ width: "100%" }}
                onChange={(e) =>
                  setEventData((data) => ({
                    ...data,
                    event_type: e.target.value,
                  }))
                }
                />
              </FormControl>

              <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                <Box
                  sx={{
                    width: "66%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    id="age-from"
                    label="Age From"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    sx={{ width: "48%" }}
                    disabled={!isAgeEnabled}
                    value={eventData.age_from}
                    onChange={(e) =>
                      setEventData((data) => ({
                        ...data,
                        age_from: e.target.value,
                      }))
                    }
                  />

                  <TextField
                    id="age-to"
                    label="Age To"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    sx={{ width: "48%" }}
                    disabled={!isAgeEnabled}
                    value={eventData.age_to}
                    onChange={(e) =>
                      setEventData((data) => ({
                        ...data,
                        age_to: e.target.value,
                      }))
                    }
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAgeEnabled}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Age Limits"
                />
              </Stack>

              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    disabled={eventData.event_status == "blocked"}
                    checked={eventData.event_status == "public"}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  eventData.event_status == "public"
                    ? "Public"
                    : eventData.event_status == "private"
                    ? "Private"
                    : "Blocked"
                }
              />
            </Stack>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
        elevation={3}
      >
        <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
          Sessions
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {eventData.sessions?.map((session, index) => (
            <Paper
              elevation={2}
              sx={{ width: "25%", padding: 2, marginRight: 1, marginBottom: 1 }}
            >
              <Typography variant="h6" color="secondary">
                {session.session_name.charAt(0).toUpperCase() +
                  session.session_name.slice(1)}
              </Typography>

              <Divider sx={{ marginBottom: 1 }} />

              <Stack direction="row" spacing={2}>
                <Box>
                  <CalendarMonthIcon />
                </Box>
                <Typography>{session.session_date.substring(0, 10)}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Box>
                  <AccessTimeFilledIcon />
                </Box>
                <Typography>{session.session_time}</Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Box>
                  <LocationOnIcon />
                </Box>
                <Typography>{session.venue}</Typography>
              </Stack>
            </Paper>
          ))}
        </Box>
        {/* <SessionTable
            sessionRows={sessionRows}
            setSessionRows={setSessionRows}
          /> */}
      </Paper>

      <Paper
        sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
        elevation={3}
      >
        <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
          Sponsors
        </Typography>

        <Box sx={{ width: "100%" }}>
          <SponsorTable
            sponsorRows={sponsorRows}
            setSponsorRows={setSponsorRows}
          />
        </Box>
      </Paper>

      <Paper sx={{ width: "100%", padding: "2em" }} elevation={3}>
        <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
          Team Details
        </Typography>

        <Box sx={{ width: "100%" }}>
          <TeamTable teamRows={teamRows} setTeamRows={setTeamRows} />
        </Box>
      </Paper>

      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Fab
            aria-label="save"
            color="primary"
            sx={buttonSx}
            onClick={handleSave}
          >
            {success ? <CheckIcon /> : error ? <ErrorIcon /> : <SaveIcon />}
          </Fab>
          {loading && (
            <CircularProgress
              size={68}
              sx={{
                color: success ? green[500] : error ? red[500] : "inherit",
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

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

type SponsorRow = {
  id: number;
  sponsorType: string;
  sponsorName: string;
  sponsorContact: string;
  sponsorEmail: string;
};

const sponsorColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "sponsorType", headerName: "Sponsor Type", flex: 1 },
  { field: "sponsorName", headerName: "Sponsor Name", flex: 1 },
  { field: "sponsorContact", headerName: "Contact", flex: 1 },
  { field: "sponsorEmail", headerName: "E-mail", flex: 1 },
];

function SponsorTable({ sponsorRows, setSponsorRows }) {
  const [sponsorTypeError, setSponsorTypeError] = useState(false);
  const [sponsorNameError, setSponsorNameError] = useState(false);
  const [sponsorContactError, setSponsorContactError] = useState(false);
  const [sponsorEmailError, setSponsorEmailError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [sponsorType, setSponsorType] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorContact, setSponsorContact] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRowData, setSelectedRowData] = useState<SponsorRow | null>(
    null
  );
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSponsorTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSponsorType(event.target.value);
    setSponsorTypeError(event.target.value.trim() === "");
  };

  const handleSponsorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSponsorName(event.target.value);
    setSponsorNameError(event.target.value.trim() === "");
  };

  const handleSponsorContactChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSponsorContact(event.target.value);
    setSponsorContactError(event.target.value.trim() === "");
  };

  const handleSponsorEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSponsorEmail(event.target.value);
    setSponsorEmailError(!validateEmail(event.target.value));
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const validateFields = () => {
    return (
      sponsorType.trim() !== "" &&
      sponsorName.trim() !== "" &&
      sponsorContact.trim() !== "" &&
      sponsorEmail.trim() !== "" &&
      validateEmail(sponsorEmail)
    );
  };

  const updateRowData = () => {
    if (selectedRows.length === 1 && validateFields()) {
      setSponsorTypeError(false);
      setSponsorNameError(false);
      setSponsorContactError(false);
      setSponsorEmailError(false);

      const selectedRowId = selectedRows[0] as number;

      const rowIndex = sponsorRows.findIndex((row) => row.id === selectedRowId);

      if (rowIndex !== -1) {
        const updatedRow = {
          id: selectedRowId,
          sponsorType,
          sponsorName,
          sponsorContact,
          sponsorEmail,
        };

        const updatedRows = [
          ...sponsorRows.slice(0, rowIndex),
          updatedRow,
          ...sponsorRows.slice(rowIndex + 1),
        ];

        setSponsorRows(updatedRows);

        refreshTable();
        handleClose();
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = sponsorRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setSponsorRows(updatedRows);
    setSelectedRows([]);
    setSponsorTypeError(false);
    setSponsorNameError(false);
    setSponsorContactError(false);
    setSponsorEmailError(false);
    setErrorMessage("");
    refreshTable();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSponsorTypeError(false);
    setSponsorNameError(false);
    setSponsorContactError(false);
    setSponsorEmailError(false);
    setErrorMessage("");
    setOpen(false);
  };

  const handleOpenForAdd = () => {
    setSponsorType("");
    setSponsorName("");
    setSponsorContact("");
    setSponsorEmail("");
    setSelectedRowData(null);
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0] as number;
      const selectedRow = sponsorRows.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        setSponsorType(selectedRow.sponsorType);
        setSponsorName(selectedRow.sponsorName);
        setSponsorContact(selectedRow.sponsorContact);
        setSponsorEmail(selectedRow.sponsorEmail);
        setSelectedRowData(selectedRow);
        setOpen(true);
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const addNewSponsor = () => {
    if (validateFields()) {
      setErrorMessage("");
      setSponsorTypeError(false);
      setSponsorNameError(false);
      setSponsorContactError(false);
      setSponsorEmailError(false);

      const newId = sponsorRows.length
        ? Math.max(...sponsorRows.map((row) => row.id)) + 1
        : 1;
      const newSponsor: SponsorRow = {
        id: newId,
        sponsorType,
        sponsorName,
        sponsorContact,
        sponsorEmail,
      };

      setSponsorRows([...sponsorRows, newSponsor]);
      console.log(sponsorRows);
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
        rows={sponsorRows}
        columns={sponsorColumns}
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
          <Box sx={sponsorModalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1em" }}
            >
              {selectedRowData ? "Update Sponsor" : "Add Sponsor"}
            </Typography>

            <TextField
              id="sponsor_type"
              label="Sponsor Type"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={sponsorType}
              onChange={handleSponsorTypeChange}
              error={sponsorTypeError}
              helperText={sponsorTypeError ? "Sponsor Type is required" : ""}
            />

            <TextField
              id="sponsor_name"
              label="Sponsor Name"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={sponsorName}
              onChange={handleSponsorNameChange}
              error={sponsorNameError}
              helperText={sponsorNameError ? "Sponsor Name is required" : ""}
            />

            <TextField
              id="sponsor_contact"
              label="Contact No."
              variant="filled"
              type="number"
              sx={{ width: "100%", marginBottom: 2 }}
              value={sponsorContact}
              onChange={handleSponsorContactChange}
              error={sponsorContactError}
              helperText={sponsorContactError ? "Contact No. is required" : ""}
            />

            <TextField
              id="sponsor_email"
              label="Email"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={sponsorEmail}
              onChange={handleSponsorEmailChange}
              error={sponsorEmailError}
              helperText={sponsorEmailError ? "Invalid Email" : ""}
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
                onClick={selectedRowData ? updateRowData : addNewSponsor}
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

type TeamRow = {
  id: number;
  teamType: string;
  teamName: string;
  teamContact: string;
  teamEmail: string;
};

const teamColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "teamType", headerName: "Team Type", flex: 1 },
  { field: "teamName", headerName: "Team Name", flex: 1 },
  { field: "teamContact", headerName: "Contact", flex: 1 },
  { field: "teamEmail", headerName: "E-mail", flex: 1 },
];

function TeamTable({ teamRows, setTeamRows }) {
  const [teamTypeError, setTeamTypeError] = useState(false);
  const [teamNameError, setTeamNameError] = useState(false);
  const [teamContactError, setTeamContactError] = useState(false);
  const [teamEmailError, setTeamEmailError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [teamType, setTeamType] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamContact, setTeamContact] = useState("");
  const [teamEmail, setTeamEmail] = useState("");
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRowData, setSelectedRowData] = useState<TeamRow | null>(null);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTeamTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamType(event.target.value);
    setTeamTypeError(event.target.value.trim() === "");
  };

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
    setTeamNameError(event.target.value.trim() === "");
  };

  const handleTeamContactChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTeamContact(event.target.value);
    setTeamContactError(event.target.value.trim() === "");
  };

  const handleTeamEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTeamEmail(event.target.value);
    setTeamEmailError(!validateEmail(event.target.value));
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const validateFields = () => {
    return (
      teamType.trim() !== "" &&
      teamName.trim() !== "" &&
      teamContact.trim() !== "" &&
      teamEmail.trim() !== "" &&
      validateEmail(teamEmail)
    );
  };

  const updateRowData = () => {
    if (selectedRows.length === 1 && validateFields()) {
      setTeamTypeError(false);
      setTeamNameError(false);
      setTeamContactError(false);
      setTeamEmailError(false);

      const selectedRowId = selectedRows[0] as number;

      const rowIndex = teamRows.findIndex((row) => row.id === selectedRowId);

      if (rowIndex !== -1) {
        const updatedRow = {
          id: selectedRowId,
          teamType,
          teamName,
          teamContact,
          teamEmail,
        };

        const updatedRows = [
          ...teamRows.slice(0, rowIndex),
          updatedRow,
          ...teamRows.slice(rowIndex + 1),
        ];

        setTeamRows(updatedRows);

        refreshTable();
        handleClose();
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = teamRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setTeamRows(updatedRows);
    setSelectedRows([]);
    setTeamTypeError(false);
    setTeamNameError(false);
    setTeamContactError(false);
    setTeamEmailError(false);
    setErrorMessage("");
    refreshTable();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTeamTypeError(false);
    setTeamNameError(false);
    setTeamContactError(false);
    setTeamEmailError(false);
    setErrorMessage("");
    setOpen(false);
  };

  const handleOpenForAdd = () => {
    setTeamType("");
    setTeamName("");
    setTeamContact("");
    setTeamEmail("");
    setSelectedRowData(null);
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0] as number;
      const selectedRow = teamRows.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        setTeamType(selectedRow.teamType);
        setTeamName(selectedRow.teamName);
        setTeamContact(selectedRow.teamContact);
        setTeamEmail(selectedRow.teamEmail);
        setSelectedRowData(selectedRow);
        setOpen(true);
      }
    } else {
      console.log("Please select a single row to update.");
    }
  };

  const addNewTeam = () => {
    if (validateFields()) {
      setErrorMessage("");
      setTeamTypeError(false);
      setTeamNameError(false);
      setTeamContactError(false);
      setTeamEmailError(false);

      const newId = teamRows.length
        ? Math.max(...teamRows.map((row) => row.id)) + 1
        : 1;
      const newTeam: TeamRow = {
        id: newId,
        teamType,
        teamName,
        teamContact,
        teamEmail,
      };

      setTeamRows([...teamRows, newTeam]);
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
        rows={teamRows}
        columns={teamColumns}
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
          <Box sx={sponsorModalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1em" }}
            >
              {selectedRowData ? "Update Team" : "Add Team"}
            </Typography>

            <TextField
              id="team_type"
              label="Team Type"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={teamType}
              onChange={handleTeamTypeChange}
              error={teamTypeError}
              helperText={teamTypeError ? "Team Type is required" : ""}
            />

            <TextField
              id="team_name"
              label="Team Name"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={teamName}
              onChange={handleTeamNameChange}
              error={teamNameError}
              helperText={teamNameError ? "Team Name is required" : ""}
            />

            <TextField
              id="team_contact"
              label="Contact No."
              variant="filled"
              type="number"
              sx={{ width: "100%", marginBottom: 2 }}
              value={teamContact}
              onChange={handleTeamContactChange}
              error={teamContactError}
              helperText={teamContactError ? "Contact No. is required" : ""}
            />

            <TextField
              id="team_email"
              label="Email"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              value={teamEmail}
              onChange={handleTeamEmailChange}
              error={teamEmailError}
              helperText={teamEmailError ? "Invalid Email" : ""}
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
                onClick={selectedRowData ? updateRowData : addNewTeam}
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
