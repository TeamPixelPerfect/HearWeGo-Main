"use client";
import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Check from "@mui/icons-material/Check";
import InputAdornment from "@mui/material/InputAdornment";
import PublishIcon from "@mui/icons-material/Publish";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormHelperText from "@mui/material/FormHelperText";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import FeedIcon from "@mui/icons-material/Feed";
import EditIcon from "@mui/icons-material/Edit";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Chip from "@mui/material/Chip";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, FilledInput, IconButton } from "@mui/material";
import { countries } from "country-flag-icons";
import { Event } from "@/app/constants/models";
import { addEvent } from "@/app/services/EventServices";
import LoadingButton from "@mui/lab/LoadingButton";
import { createFilterOptions } from "@mui/material";
import { getAllArtists } from "@/app/services/ArtistServices";

import { InputRow } from "../../../styles/artistDashboardCretaeEvent.styles";

import { IOSSwitch } from "../../../styles/switch.styles";

import DropFile from "../../../components/DropFile";
import { useAppSelector } from "@/lib/hooks";

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#3730a3 0%,#4338ca 50% 50%,#6366f1 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#3730a3 0%,#4338ca 50% 50%,#6366f1 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #3730a3 0%, #4338ca 50%, #6366f1 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, #3730a3 0%, #4338ca 50%, #6366f1 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <FeedIcon />,
    2: <LocalActivityIcon />,
    3: <AttachMoneyIcon />,
    4: <DoneAllIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Event Details",
  "Ticket Details",
  "Budget Details",
  "Finishing Touches",
];

function CreateEvent() {
  const artist = useAppSelector((state) => state.artist.user);

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [sessionRows, setSessionRows] = useState([]);
  const [teamRows, setTeamRows] = useState([]);
  const [sponsorRows, setSponsorRows] = useState([]);
  const [eventData, setEventData] = useState<Event>({
    event_img: "",
    event_name: "",
    event_type: "",
    age_from: 0,
    age_to: 0,
    no_of_sessions: sessionCount,
    sessions: [],
    sponsor: [],
    teams: [],
    description: "",
    event_status: "private",
  });

  useEffect(() => {
    setEventData({
      ...eventData,
      sessions: sessionRows.map(
        ({
          id,
          sessionDate,
          sessionTime,
          duration,
          venue,
          artists,
          description,
        }) => ({
          session_id: id,
          session_name: `session${id}`,
          session_date: sessionDate,
          session_time: sessionTime,
          duration: duration,
          venue: venue,
          artists: artists.split(",").map((artist) => artist.trim()),
          session_special_notice: description,
        })
      ),
    });
  }, [sessionRows]);

  useEffect(() => {
    setEventData({
      ...eventData,
      teams: teamRows.map(
        ({ id, teamType, teamName, teamContact, teamEmail }) => ({
          team_type: teamType,
          team_name: teamName,
          contact: teamContact,
          email: teamEmail,
        })
      ),
    });
  }, [teamRows]);

  useEffect(() => {
    setEventData({
      ...eventData,
      sponsor: sponsorRows.map(
        ({ id, sponsorType, sponsorName, sponsorContact, sponsorEmail }) => ({
          team_type: sponsorType,
          team_name: sponsorName,
          sponsor_contact: sponsorContact,
          sponsor_email: sponsorEmail,
        })
      ),
    });
  }, [sponsorRows]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      const newCompleted = { ...completed }; // Changed to use spread operator
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      if (isLastStep()) {
      }
      console.log(eventData); // Add this line to log eventData before submission
      await submitData();
      handleNext();
    }
  };

  const validateCurrentStep = async () => {
    if (activeStep === 0) {
      return validateEventDetails();
    } else if (activeStep === 1) {
      // Add validation for the second step
      return true;
    } else if (activeStep === 2) {
      // Add validation for the third step
      return true;
    } else if (activeStep === 3) {
      // Add validation for the fourth step
      return true;
    }
    return true;
  };

  const validateEventDetails = () => {
    let isValid = true;
    // Add validation logic here
    // Update eventData state if necessary
    // setEventNameError, setEventTypeError, etc. based on validation results
    return isValid;
  };

  const submitData = async () => {
    setLoading(true);
    try {
      await addEvent(artist ? artist.token : "", eventData);
    } catch (error) {
      console.error("Error submitting event data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <Box sx={{ padding: "2em", paddingLeft: "7em", paddingRight: "7em" }}>
        {allStepsCompleted() ? (
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontSize: "8em", textAlign: "center" }}>
                <IoCheckmarkDoneCircle />
              </Box>
              <Box
                sx={{
                  fontSize: "2em",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={1} direction="row" sx={{ marginBottom: "1em" }}>
                  <Typography
                    color={"text.secondary"}
                    component={"div"}
                    sx={{ fontSize: "1em", fontWeight: 400 }}
                  >
                    Event Created
                  </Typography>
                  <Typography
                    color={"primary.main"}
                    component={"div"}
                    sx={{ fontSize: "1em", fontWeight: 500 }}
                  >
                    Successfully !
                  </Typography>
                </Stack>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined">Not Now</Button>
                <Button variant="contained" endIcon={<PublishIcon />}>
                  Publish to Fans
                </Button>
              </Stack>
            </Box>
          </Box>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              <div>
                {EventCreateShow(
                  activeStep,
                  sessionRows,
                  setSessionRows,
                  teamRows,
                  setTeamRows,
                  sponsorRows,
                  setSponsorRows,
                  eventData,
                  setEventData
                )}
              </div>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}

function EventDetails({
  sessionRows,
  setSessionRows,
  teamRows,
  setTeamRows,
  sponsorRows,
  setSponsorRows,
  eventData,
  setEventData
}) {
  const artist = useAppSelector((state) => state.artist.user);

  const [numberOfSessions, setNumberOfSessions] = useState(0);
  const [country, setCountry] = React.useState("");
  const [timeValue, setTimeValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [isAgeEnabled, setIsAgeEnabled] = useState(false);
  const [imgFile, setImgFile] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsAgeEnabled(event.target.checked);
  };

  const handleSessionChange = (index, field, value) => {
    const newSessions = [...eventData.sessions];
    newSessions[index][field] = value;
    setEventData({ ...eventData, sessions: newSessions });
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
              <TextField
                id="event_name"
                label="Event Name"
                variant="filled"
                sx={{ width: "100%" }}
                value={eventData.event_name}
                onChange={(e) =>
                  setEventData((data) => ({
                    ...data,
                    event_name: e.target.value,
                  }))
                }
              />

              <TextField
                id="event_type"
                label="Event Type"
                variant="filled"
                sx={{ width: "100%" }}
                value={eventData.event_type}
                onChange={(e) =>
                  setEventData((data) => ({
                    ...data,
                    event_type: e.target.value,
                  }))
                }
              />

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

              <TextField
                id="no_of_sessions"
                label="No. of Sessions"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                sx={{ width: "66%" }}
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

        <SessionTable
          sessionRows={sessionRows}
          setSessionRows={setSessionRows}
        />
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
        <TeamTable
          teamRows={teamRows}
          setTeamRows={setTeamRows}
        />
      </Box>
    </Paper>
    </>
  );
}

function TicketDetails() {
  const [isChecked, setIsChecked] = useState(true); // Assuming default is checked

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      Ticket Details
      <InputRow>
        <FormGroup>
          <FormControlLabel
            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
            label="Generate Tickets Here"
            onChange={handleSwitchChange}
          />
        </FormGroup>
      </InputRow>
      <Paper
        sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
        elevation={3}
      >
        <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
          Tickets Details
        </Typography>

        <div>
          <div>{TicketSwitchDisplay(isChecked ? 0 : 1)}</div>
        </div>
      </Paper>
    </div>
  );
}

const filter = createFilterOptions();

const handleFilter = (options, params) => {
  const filtered = filter(options, params);
  const { inputValue } = params;

  if (
    inputValue !== "" &&
    !options.some((option) => option.label === inputValue)
  ) {
    filtered.push({ label: inputValue, _id: "nar" });
  }

  return filtered;
};

let sessionCount = 0;

type SessionRow = {
  id: number;
  sessionDate: string;
  sessionTime: string;
  duration: string;
  venue: string;
  artists: string;
  description: string;
};

const sessionColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "sessionDate", headerName: "Date", width: 100 },
  { field: "sessionTime", headerName: "Time", width: 100 },
  { field: "duration", headerName: "Duration", width: 100 },
  { field: "venue", headerName: "Venue", width: 100 },
  { field: "artists", headerName: "Artists", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
];

function SessionTable({ sessionRows, setSessionRows }) {
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [duration, setDuration] = useState("");
  const [venue, setVenue] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [selectedRowData, setSelectedRowData] = useState<SessionRow | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const getArtists = () => {
    getAllArtists().then((res) => {
      const data = res?.data.map((opt: any) => ({
        label: opt.artistName,
        _id: opt.artist_id,
      }));
      setArtists(data);
    });
  };

  useEffect(() => {
    getArtists();
  }, []);

  const handleSessionDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionDate(event.target.value);
  };

  const handleSessionTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionTime(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleVenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVenue(event.target.value);
  };

  const handleArtistsChange = (event, newValue) => {
    setSelectedArtists(newValue);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);
  };

  const validateFields = () => {
    return (
      sessionDate &&
      sessionTime &&
      duration &&
      venue &&
      artists.length > 0 &&
      description
    );
  };

  const addNewSession = () => {
    if (validateFields()) {
      const newId = sessionRows.length
        ? Math.max(...sessionRows.map((row) => row.id)) + 1
        : 1;
      const newSession: SessionRow = {
        id: newId,
        sessionDate,
        sessionTime,
        duration,
        venue,
        artists: selectedArtists.map((artist) => artist.label).join(", "),
        description,
      };

      setSessionRows([...sessionRows, newSession]);
      sessionCount += 1;
      console.log(sessionRows);
      refreshTable();
      handleClose();
    } else {
      setErrorMessage(
        "Please fill in all required fields with correct format."
      );
    }
  };

  const updateRowData = () => {
    if (selectedRows.length === 1 && validateFields()) {
      const selectedRowId = selectedRows[0] as number;

      const rowIndex = sessionRows.findIndex((row) => row.id === selectedRowId);

      if (rowIndex !== -1) {
        const updatedRow: SessionRow = {
          id: selectedRowId,
          sessionDate,
          sessionTime,
          duration,
          venue,
          artists: selectedArtists.map((artist) => artist.label).join(", "),
          description,
        };

        const updatedRows = [
          ...sessionRows.slice(0, rowIndex),
          updatedRow,
          ...sessionRows.slice(rowIndex + 1),
        ];

        setSessionRows(updatedRows);

        refreshTable();
        handleClose();
      }
    } else {
      setErrorMessage("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = sessionRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setSessionRows(updatedRows);
    setSelectedRows([]);
    sessionCount -= 1;
    refreshTable();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  const handleOpenForAdd = () => {
    setSessionDate("");
    setSessionTime("");
    setDuration("");
    setVenue("");
    setSelectedArtists([]);
    setDescription("");
    setSelectedRowData(null);
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0] as number;
      const selectedRow = sessionRows.find((row) => row.id === selectedRowId);
      if (selectedRow) {
        setSessionDate(selectedRow.sessionDate);
        setSessionTime(selectedRow.sessionTime);
        setDuration(selectedRow.duration);
        setVenue(selectedRow.venue);
        setSelectedArtists(
          selectedRow.artists
            .split(", ")
            .map((name) => ({ label: name, _id: "" }))
        );
        setDescription(selectedRow.description);
        setSelectedRowData(selectedRow);
        setOpen(true);
      }
    } else {
      setErrorMessage("Please select a single row to update.");
    }
  };

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        key={refreshKey}
        rows={sessionRows}
        columns={sessionColumns}
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
          disabled={selectedRows.length === 0}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleOpenForUpdate}
          aria-label="update"
          disabled={selectedRows.length !== 1}
        >
          <EditIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1em" }}
            >
              {selectedRowData ? "Update Session" : "Add Session"}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Box sx={{ width: "50%", paddingRight: 2 }}>
                <FormControl
                  sx={{ width: "100%", marginBottom: "1em" }}
                  variant="filled"
                >
                  <FormHelperText id="session-date">Date</FormHelperText>
                  <FilledInput
                    id="session_date"
                    sx={{ width: "100%" }}
                    type="date"
                    value={sessionDate}
                    onChange={handleSessionDateChange}
                    defaultValue="2024-10-10"
                  />
                </FormControl>

                <TextField
                  id="duration"
                  label="Duration"
                  variant="filled"
                  sx={{ width: "100%", marginBottom: 2 }}
                  type="number"
                  value={duration}
                  onChange={handleDurationChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">Hours</InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ width: "50%" }}>
                <FormControl
                  sx={{ width: "100%", marginBottom: "1em" }}
                  variant="filled"
                >
                  <FormHelperText id="session-time">Time</FormHelperText>
                  <FilledInput
                    id="session_time"
                    sx={{ width: "100%" }}
                    type="time"
                    value={sessionTime}
                    onChange={handleSessionTimeChange}
                  />
                </FormControl>

                <TextField
                  id="venue"
                  label="Venue"
                  variant="filled"
                  sx={{ width: "100%", marginBottom: 2 }}
                  value={venue}
                  onChange={handleVenueChange}
                />
              </Box>
            </Box>

            <Autocomplete
              sx={{ width: "90%", marginBottom: 2 }}
              multiple
              id="artists"
              options={artists}
              getOptionLabel={(option) => option.label}
              filterOptions={handleFilter}
              filterSelectedOptions
              value={selectedArtists}
              onChange={handleArtistsChange}
              renderInput={(params) => (
                <TextField {...params} label="Artists" variant="filled" />
              )}
            />

            <TextField
              id="description"
              label="Description"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
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
                onClick={selectedRowData ? updateRowData : addNewSession}
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
  { field: "id", headerName: "ID", width: 70 },
  { field: "teamType", headerName: "Team Type", width: 150 },
  { field: "teamName", headerName: "Team Name", width: 150 },
  { field: "teamContact", headerName: "Contact", width: 250 },
  { field: "teamEmail", headerName: "E-mail", width: 250 },
];

function TeamTable({teamRows, setTeamRows}) {
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

  const handleTeamContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamContact(event.target.value);
    setTeamContactError(event.target.value.trim() === "");
  };

  const handleTeamEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const updatedRows = teamRows.filter((row) => !selectedRows.includes(row.id));
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

      const newId = teamRows.length ? Math.max(...teamRows.map((row) => row.id)) + 1 : 1;
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
      <DataGrid
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
};

type SponsorRow = {
  id: number;
  sponsorType: string;
  sponsorName: string;
  sponsorContact: string;
  sponsorEmail: string;
};

const sponsorColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "sponsorType", headerName: "Sponsor Type", width: 150 },
  { field: "sponsorName", headerName: "Sponsor Name", width: 150 },
  { field: "sponsorContact", headerName: "Contact", width: 250 },
  { field: "sponsorEmail", headerName: "E-mail", width: 250 },
];

function SponsorTable({sponsorRows, setSponsorRows}) {
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
  const [selectedRowData, setSelectedRowData] = useState<SponsorRow | null>(null);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSponsorTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSponsorType(event.target.value);
    setSponsorTypeError(event.target.value.trim() === "");
  };

  const handleSponsorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSponsorName(event.target.value);
    setSponsorNameError(event.target.value.trim() === "");
  };

  const handleSponsorContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSponsorContact(event.target.value);
    setSponsorContactError(event.target.value.trim() === "");
  };

  const handleSponsorEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const updatedRows = sponsorRows.filter((row) => !selectedRows.includes(row.id));
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

      const newId = sponsorRows.length ? Math.max(...sponsorRows.map((row) => row.id)) + 1 : 1;
      const newSponsor: SponsorRow = {
        id: newId,
        sponsorType,
        sponsorName,
        sponsorContact,
        sponsorEmail,
      };

      setSponsorRows([...sponsorRows, newSponsor]);
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
      <DataGrid
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


function BudgetDetails() {
  return (
    <div>
      <InputRow>
        <BudgetCurrencySelect />
      </InputRow>

      <InputRow>
        <BudgetTable />
      </InputRow>
    </div>
  );
}

const budgetColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "budgetTitle", headerName: "Title", width: 150 },
  { field: "budgetSession", headerName: "Session", width: 150 },
  { field: "budgetType", headerName: "Type", width: 250 },
  { field: "budgetAmount", headerName: "Amount", width: 250 },
];

let budgetRows = [];

function BudgetTable() {
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleBudgetTitleChange = (event) => {
    setBudgetTitle(event.target.value);
    setBudgetTitleError(event.target.value.trim() === "");
  };

  const handleBudgetSessionChange = (event) => {
    setBudgetSession(event.target.value);
    setBudgetSessionError(event.target.value.trim() === "");
  };

  const handleBudgetTypeChange = (event) => {
    setBudgetType(event.target.value);
    setBudgetTypeError(event.target.value.trim() === "");
  };

  const handleBudgetAmountChange = (event) => {
    setBudgetAmount(event.target.value);
    setBudgetAmountError(!validateEmail(event.target.value));
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const validateFields = () => {
    return (
      budgetTitle.trim() !== "" &&
      budgetSession.trim() !== "" &&
      budgetType.trim() !== "" &&
      budgetAmount.trim() !== ""
    );
  };

  const updateRowData = () => {
    // Check if a row is selected for update
    if (selectedRows.length === 1 && validateFields()) {
      setBudgetTitleError(false);
      setBudgetSessionError(false);
      setBudgetTypeError(false);
      setBudgetAmountError(false);

      // Get the selected row ID
      const selectedRowId = selectedRows[0];

      // Find the index of the selected row in the sponsorRows array
      const rowIndex = budgetRows.findIndex((row) => row.id === selectedRowId);

      if (rowIndex !== -1) {
        // Update the row data with user inputs
        const updatedRow = {
          id: selectedRowId,
          budgetTitle: budgetTitle,
          budgetSession: budgetSession,
          budgetType: budgetType,
          budgetAmount: budgetAmount,
        };

        // Replace the old row with the updated row
        const updatedRows = [...budgetRows];
        updatedRows[rowIndex] = updatedRow;

        // Update sponsorRows with the updated rows
        budgetRows = updatedRows;

        // Refresh the table
        refreshTable();
        handleClose(); // Close the modal or any other UI element used for input
      }
    } else {
      // Inform the user to select a single row for update
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = budgetRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    budgetRows = updatedRows;
    setSelectedRows([]);
    console.log("Rows", budgetRows);
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
    setSelectedRowData(null); // Clear selected row data
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
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
      // Reset error states
      setBudgetTitleError(false);
      setBudgetSessionError(false);
      setBudgetTypeError(false);
      setBudgetAmountError(false);

      //----
      const newId = budgetRows.length + 1;
      const newBudget = {
        id: newId,
        budgetTitle: budgetTitle,
        budgetSession: budgetSession,
        budgetType: budgetType,
        budgetAmount: budgetAmount,
      };

      const handleButtonClick = selectedRowData ? updateRowData : addNewBudget;

      const newBudgetRows = [...budgetRows, newBudget];

      budgetRows = newBudgetRows;

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
      <DataGrid
        key={refreshKey}
        rows={budgetRows}
        columns={budgetColumns}
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

function TicketSwitchDisplay(switchStatus: number) {
  const autoTicketForm = AutoTicketForm();
  const manualTicketForm = ManualTicketForm();
  if (switchStatus == 0) {
    return <div>{autoTicketForm}</div>;
  } else if (switchStatus == 1) {
    return <div>{manualTicketForm}</div>;
  }
}

const manulTicketColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "ticketSession", headerName: "Session", width: 150 },
  { field: "ticketLocation", headerName: "Where to Buy Tickets", width: 150 },
];

let manualTicketRows = [];

function ManualTicketTable() {
  const [ticketLocationError, setTicketLocationError] = useState(false);
  const [ticketSessionError, setTicketSessionError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [ticketSession, setTicketSession] = useState("");
  const [ticketLocation, setTicketLocation] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleTicketLocationChange = (event) => {
    setTicketLocation(event.target.value);
    setTicketLocationError(event.target.value.trim() === "");
  };

  const handleTicketSessionChange = (event) => {
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
    // Check if a row is selected for update
    if (selectedRows.length === 1 && validateFields()) {
      setTicketLocationError(false);
      setTicketSessionError(false);

      // Get the selected row ID
      const selectedRowId = selectedRows[0];

      // Find the index of the selected row in the sponsorRows array
      const rowIndex = manualTicketRows.findIndex(
        (row) => row.id === selectedRowId
      );

      if (rowIndex !== -1) {
        // Update the row data with user inputs
        const updatedRow = {
          id: selectedRowId,
          ticketSession: ticketSession,
          ticketLocation: ticketLocation,
        };

        // Replace the old row with the updated row
        const updatedRows = [...manualTicketRows];
        updatedRows[rowIndex] = updatedRow;

        // Update sponsorRows with the updated rows
        manualTicketRows = updatedRows;

        // Refresh the table
        refreshTable();
        handleClose(); // Close the modal or any other UI element used for input
      }
    } else {
      // Inform the user to select a single row for update
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = manualTicketRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    manualTicketRows = updatedRows;
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
    setSelectedRowData(null); // Clear selected row data
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
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
      // Reset error states
      setTicketLocationError(false);
      setTicketSessionError(false);

      //----
      const newId = manualTicketRows.length + 1;
      const newTicket = {
        id: newId,
        ticketLocation: ticketLocation,
        ticketSession: ticketSession,
      };

      const handleButtonClick = selectedRowData ? updateRowData : addNewTicket;

      const newTicketRows = [...manualTicketRows, newTicket];

      manualTicketRows = newTicketRows;

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
      <DataGrid
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
          <Box sx={sponsorModalStyle}>
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

function ManualTicketForm() {
  return (
    <Paper
      sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
      elevation={3}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "3em",
        }}
      >
        <ManualTicketTable />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1em",
        }}
      >
        <TextField
          id="ticket-des"
          label="Description"
          multiline
          rows={4}
          variant="filled"
          sx={{ width: "100%" }}
        />
      </Box>
    </Paper>
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
  { field: "id", headerName: "ID", width: 70 },
  { field: "ticketType", headerName: "Ticket Type", width: 150 },
  { field: "ticketPrice", headerName: "Price", width: 150 },
  { field: "ticketCount", headerName: "Count", width: 250 },
  { field: "ticketSession", headerName: "Session", width: 250 },
];

let autoTicketRows = [];

//new
function AutoTicketTable() {
  const [ticketTypeError, setTicketTypeError] = useState(false);
  const [ticketPriceError, setTicketPriceError] = useState(false);
  const [ticketCountError, setTicketCountError] = useState(false);
  const [ticketSessionError, setTicketSessionError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticketCount, setTicketCount] = useState("");
  const [ticketSession, setTicketSession] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
    setTicketTypeError(event.target.value.trim() === "");
  };

  const handleTicketPriceChange = (event) => {
    setTicketPrice(event.target.value);
    setTicketPriceError(event.target.value.trim() === "");
  };

  const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
    setTicketCountError(event.target.value.trim() === "");
  };

  const handleTicketSessionChange = (event) => {
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
    // Check if a row is selected for update
    if (selectedRows.length === 1 && validateFields()) {
      setTicketTypeError(false);
      setTicketPriceError(false);
      setTicketCountError(false);
      setTicketSessionError(false);

      // Get the selected row ID
      const selectedRowId = selectedRows[0];

      // Find the index of the selected row in the sponsorRows array
      const rowIndex = autoTicketRows.findIndex(
        (row) => row.id === selectedRowId
      );

      if (rowIndex !== -1) {
        // Update the row data with user inputs
        const updatedRow = {
          id: selectedRowId,
          ticketType: ticketType,
          ticketPrice: ticketPrice,
          ticketCount: ticketCount,
          ticketSession: ticketSession,
        };

        // Replace the old row with the updated row
        const updatedRows = [...autoTicketRows];
        updatedRows[rowIndex] = updatedRow;

        // Update sponsorRows with the updated rows
        autoTicketRows = updatedRows;

        // Refresh the table
        refreshTable();
        handleClose(); // Close the modal or any other UI element used for input
      }
    } else {
      // Inform the user to select a single row for update
      console.log("Please select a single row to update.");
    }
  };

  const handleDelete = () => {
    const updatedRows = autoTicketRows.filter(
      (row) => !selectedRows.includes(row.id)
    );
    autoTicketRows = updatedRows;
    setSelectedRows([]);
    console.log("Rows", autoTicketRows);
    setTicketTypeError(false);
    setTicketPriceError(false);
    setTicketCountError(false);
    setTicketSessionError(false);
    setErrorMessage("");
    refreshTable();
  };

  const [open, setOpen] = React.useState(false);
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
    setSelectedRowData(null); // Clear selected row data
    setOpen(true);
  };

  const handleOpenForUpdate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
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
      // Reset error states
      setTicketTypeError(false);
      setTicketPriceError(false);
      setTicketCountError(false);
      setTicketSessionError(false);

      //----
      const newId = autoTicketRows.length + 1;
      const newTicket = {
        id: newId,
        ticketType: ticketType,
        ticketPrice: ticketPrice,
        ticketCount: ticketCount,
        ticketSession: ticketSession,
      };

      const handleButtonClick = selectedRowData ? updateRowData : addNewTicket;

      const newTicketRows = [...autoTicketRows, newTicket];

      autoTicketRows = newTicketRows;

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
      <DataGrid
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
          <Box sx={sponsorModalStyle}>
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

function AutoTicketForm() {
  const [imgFile, setImgFile] = React.useState(null);
  return (
    <Paper
      sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
      elevation={3}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1em",
        }}
      >
        <DropFile
          fileTypes="Ticket Cover Image"
          fileExtensions="JPEG,PNG,WEBP,SVG"
          isCircular={false}
          width="100%"
          height="250px"
          file={imgFile}
          setFile={setImgFile}
          aspectX={1}
          aspectY={1}
          shape="rect"
        />
      </Box>

      <Box sx={{ width: "100%", marginBottom: "1em" }}>
        <TicketCurrencySelect />
      </Box>

      <Box sx={{ width: "100%", marginBottom: "1em" }}>
        <AutoTicketTable />
      </Box>

      <Box sx={{ width: "100%", marginBottom: "1em" }}>
        <TextField
          id="ticket-des"
          label="Description"
          multiline
          rows={4}
          variant="filled"
          sx={{ width: "100%" }}
        />
      </Box>
    </Paper>
  );
}

function TicketCurrencySelect() {
  return (
    <Autocomplete
      id="ticket-currency-select-demo"
      sx={{ width: 300 }}
      options={eventCurrencies}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a currency"
          variant="filled"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

function BudgetCurrencySelect() {
  return (
    <Autocomplete
      id="budget-currency-select-demo"
      sx={{ width: 300 }}
      options={eventCurrencies}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Currency"
          variant="filled"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

function EventCreateShow(
  n: number,
  sessionRows,
  setSessionRows,
  teamRows,
  setTeamRows,
  sponsorRows,
  setSponsorRows,
  eventData,
  setEventData
) {
  if (n == 0) {
    return (
      <EventDetails
        sessionRows={sessionRows}
        setSessionRows={setSessionRows}
        teamRows={teamRows}
        setTeamRows={setTeamRows}
        sponsorRows={sponsorRows}
        setSponsorRows={setSponsorRows}
        eventData={eventData}
        setEventData={setEventData}
      />
    );
  } else if (n == 1) {
    return <TicketDetails />;
  } else if (n == 2) {
    return <BudgetDetails />;
  } else if (n == 3) {
    return <EventFormFinish />;
  }
}

function EventFormFinish() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50%" }}>
        <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
          <EventInfoCard />
          <BudgetInfoCard />
        </Stack>
      </Box>
      <Box sx={{ width: "50%" }}>
        <SessionInfoCard />
      </Box>
    </Box>
  );
}

function SessionInfoCard() {
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Box sx={{ fontWeight: 700, marginBottom: "1em" }}>Session 01</Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Date</Box>
              <Box sx={{ width: "60%" }}>2024-02-19</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Time</Box>
              <Box sx={{ width: "60%" }}>8.00 P.M.</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Duration</Box>
              <Box sx={{ width: "60%" }}>3 Hours</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Venue</Box>
              <Box sx={{ width: "60%" }}>Location</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="column"
              spacing={1}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Other Artists</Box>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ width: "100%", marginBottom: "1em" }}
            >
              <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
              <Chip
                avatar={
                  <Avatar alt="Natacha" src="https://shorturl.at/bhKS9" />
                }
                label="Avatar"
                variant="outlined"
              />
            </Stack>

            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="column"
              spacing={1}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Ticket Details</Box>
            </Stack>
            <Box sx={{ marginBottom: "1em" }}>
              <AutoTicketTable />
            </Box>

            <Stack sx={{ width: "100%" }} direction="column" spacing={1}>
              <Box sx={{ fontWeight: 600, width: "40%" }}>Special Notice</Box>
              <Box sx={{ width: "100%", textAlign: "justify" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                itaque aliquid, maxime quia ab doloribus tenetur dolor,
                similique molestiae modi nobis, porro eius vero animi ratione
                odio laboriosam est asperiores!
              </Box>
            </Stack>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function BudgetInfoCard() {
  return (
    <Card sx={{ width: "90%" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Box sx={{ fontWeight: 700, marginBottom: "1em" }}>
              Budget Details
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <BudgetTable />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function EventInfoCard() {
  return (
    <Card sx={{ width: "90%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://shorturl.at/kotTU"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Box sx={{ fontWeight: 700, marginBottom: "1em" }}>
              Event Infomation
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Event Name</Box>
              <Box sx={{ width: "60%" }}>Naadagama</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Event Type</Box>
              <Box sx={{ width: "60%" }}>Modern</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Age Limit</Box>
              <Box sx={{ width: "60%" }}>None</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>No. of Sessions</Box>
              <Box sx={{ width: "60%" }}>1</Box>
            </Stack>
            <Stack
              sx={{ width: "100%", marginBottom: "1em" }}
              direction="row"
              spacing={4}
            >
              <Box sx={{ fontWeight: 600, width: "40%" }}>Sponsors</Box>
              <Box sx={{ width: "60%" }}>Sponsor01, Sponsor02</Box>
            </Stack>

            <Stack sx={{ width: "100%" }} direction="column" spacing={1}>
              <Box sx={{ fontWeight: 600, width: "40%" }}>Description</Box>
              <Box sx={{ width: "100%", textAlign: "justify" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                itaque aliquid, maxime quia ab doloribus tenetur dolor,
                similique molestiae modi nobis, porro eius vero animi ratione
                odio laboriosam est asperiores!
              </Box>
            </Stack>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function ArtistEvents() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Card variant="outlined">{EventsDisplay}</Card>
      </Box>
    </>
  );
}

const EventsDisplay = (
  <React.Fragment>
    <CardContent>
      <Box sx={{ width: "100%" }}>
        <CreateEvent />
      </Box>
    </CardContent>
  </React.Fragment>
);

const eventCurrencies: readonly CountryType[] = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242",
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" },
  { code: "CZ", label: "Czech Republic", phone: "420" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    phone: "1-809",
  },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { code: "IQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    phone: "373",
  },
  { code: "ME", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  {
    code: "PS",
    label: "Palestine, State of",
    phone: "970",
  },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    phone: "239",
  },
  { code: "SV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    phone: "963",
  },
  { code: "SZ", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { code: "TD", label: "Chad", phone: "235" },
  {
    code: "TF",
    label: "French Southern Territories",
    phone: "262",
  },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    phone: "1-868",
  },
  { code: "TV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    label: "Taiwan",
    phone: "886",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];
