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
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import FeedIcon from "@mui/icons-material/Feed";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import Autocomplete from "@mui/material/Autocomplete";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Chip from "@mui/material/Chip";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Typography from '@mui/material/Typography';
import { CardActionArea } from "@mui/material";
import { countries } from "country-flag-icons";

import {
  CreateEventMainBox,
  EventFormBody,
  InputRow,
  SessionBox,
  SessionInputRow,
  SessionInput,
  CalendarArea,
  SessionInfo,
} from "../../../styles/artistDashboardCretaeEvent.styles";

import { IOSSwitch } from "../../../styles/switch.styles";

import DropFile from "../../../components/DropFile";
import ReactCountryFlag from "react-country-flag";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

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

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

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

const style = {
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

const steps = [
  "Event Details",
  "Ticket Details",
  "Budget Details",
  "Finishing Touches",
];

function CreateEvent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
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
              <div>{EventCreateShow(activeStep)}</div>
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

function SelectEventType() {
  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Event Type
        </InputLabel>
        <Select
          labelId="event_type"
          id="event_type"
          value={type}
          onChange={handleChange}
          label="Event Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Classical</MenuItem>
          <MenuItem value={20}>Club Party</MenuItem>
          <MenuItem value={30}>Other</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

let sessionCount = 0;

function EventDetails() {
  const [numberOfSessions, setNumberOfSessions] = useState(0);

  const handleNumberOfSessionsChange = (event) => {
    const value = parseInt(event.target.value);
    setNumberOfSessions(isNaN(value) ? 0 : value);
    sessionCount = value;
  };

  const generateDivs = () => {
    const divs = [];
    for (let i = 0; i < numberOfSessions; i++) {
      divs.push(
        <div key={i}>
          <SessionForm />
        </div>
      );
    }
    return divs;
  };

  const [isAgeEnabled, setIsAgeEnabled] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAgeEnabled(event.target.checked);
  };

  const [imgFile, setImgFile] = React.useState(null);
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
              />
              <SelectEventType />

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
                onChange={handleNumberOfSessionsChange}
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
        {generateDivs()}
      </Paper>

      <SponsorField />
      <TeamField />
    </>
  );
}

// function SessionArea() {
//   return (
//     <Paper
//       sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
//       elevation={3}
//     >
//       <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
//         Sessions
//       </Typography>
//       <SessionForm />
//     </Paper>
//   );
// }

function TicketDetails() {
  const [isChecked, setIsChecked] = useState(true); // Assuming default is checked

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const generateDivs = () => {
    const divs = [];
    for (let i = 0; i < sessionCount; i++) {
      divs.push(
        <div key={i}>
          <div>{TicketSwitchDisplay(isChecked ? 0 : 1, i+1)}</div>
        </div>
      );
    }
    return divs;
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
        {generateDivs()}
      </Paper>
    </div>
  );
}

function SelectCountry() {
  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
        <Select
          labelId="event_country"
          id="event_country"
          value={type}
          onChange={handleChange}
          label="Country"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Sri Lanka</MenuItem>
          <MenuItem value={20}>USA</MenuItem>
          <MenuItem value={30}>Japan</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function SessionForm() {
  const [timeValue, setTimeValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  return (
    <Paper
      sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
      elevation={3}
    >
      <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
        Session 01
      </Typography>

      <Box sx={{ width: "100%", display: "flex" }}>
        <Box sx={{ width: "65%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              marginBottom={2}
            >
              <Grid xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateField"]}>
                    <DateField
                      label="Date"
                      defaultValue={dayjs("2022-04-17")}
                      format="LL"
                      variant="filled"
                      sx={{ width: "100%" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimeField"]}>
                    <TimeField
                      label="Time"
                      value={timeValue}
                      onChange={(newValue) => setTimeValue(newValue)}
                      variant="filled"
                      sx={{ width: "100%" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid xs={6}>
                <TextField
                  id="duration"
                  label="Duration"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  sx={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">Hours</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={6}>
                <SelectCountry />
              </Grid>
            </Grid>
            <TextField
              id="event_venue"
              label="Venue"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
            />
            <Autocomplete
              sx={{ maxWidth: "90%" }}
              multiple
              id="artists"
              options={sessionArtist}
              getOptionLabel={(option) => option.name}
              // defaultValue={[top100Films[13]]}
              filterSelectedOptions
              // style={{boxSizing: "initial"}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Artits"
                  // placeholder="Favorites"
                  variant="filled"
                  sx={{ maxWidth: "100%" }}
                  style={{ boxSizing: "initial" }}
                />
              )}
            />
          </Box>
        </Box>

        <Box sx={{ width: "35%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateCalendar"]} sx={{ width: "100%" }}>
              <DemoItem>
                <DateCalendar defaultValue={dayjs("2022-04-17")} disabled />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <TextField
          id="session-des"
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

const sessionArtist = [
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
  { name: "Michael Jackson" },
];

function TeamField() {
  return (
    <Paper sx={{ width: "100%", padding: "2em" }} elevation={3}>
      <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
        Team Details
      </Typography>

      <Box sx={{ width: "100%" }}>
        <TeamTable />
      </Box>
    </Paper>
  );
}

const teamModalStyle = {
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

function TeamModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Add New Team</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={teamModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "1em" }}
          >
            Team Details
          </Typography>

          <TextField
            id="team_type"
            label="Team Type"
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
          />

          <TextField
            id="team_name"
            label="Team Name"
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
          />

          <TextField
            id="team_contact"
            label="Contact No."
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
          />

          <TextField
            id="team_email"
            label="Email"
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
          />
        </Box>

        {/* <Stack direction="row" spacing={2}>
          <Button variant="outlined">Close</Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Stack> */}
      </Modal>
    </div>
  );
}

const teamColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "teamType", headerName: "Team Type", width: 150 },
  { field: "teamName", headerName: "Team Name", width: 150 },
  { field: "teamContact", headerName: "Contact", width: 250 },
  { field: "teamEmail", headerName: "E-mail", width: 250 },
];

let teamRows = [];

function TeamTable() {
  const [teamType, setTeamType] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamContact, setTeamContact] = useState("");
  const [teamEmail, setTeamEmail] = useState("");

  const handleTeamTypeChange = (event) => {
    setTeamType(event.target.value);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleTeamContactChange = (event) => {
    setTeamContact(event.target.value);
  };

  const handleTeamEmailChange = (event) => {
    setTeamEmail(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewTeam = () => {
    const newId = teamRows.length + 1;
    const newTeam = {
      id: newId,
      teamType: teamType,
      teamName: teamName,
      teamContact: teamContact,
      teamEmail: teamEmail,
    };

    const newTeamRows = [...teamRows, newTeam];

    teamRows = newTeamRows;

    refreshTable();
    handleClose();
  };
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={teamRows}
        columns={teamColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />

      <div>
        <Button onClick={handleOpen}>Add New Team</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={teamModalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1em" }}
            >
              Team Details
            </Typography>

            <TextField
              id="team_type"
              label="Team Type"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleTeamTypeChange}
            />

            <TextField
              id="team_name"
              label="Team Name"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleTeamNameChange}
            />

            <TextField
              id="team_contact"
              label="Contact No."
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleTeamContactChange}
            />

            <TextField
              id="team_email"
              label="Email"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleTeamEmailChange}
            />

            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" onClick={addNewTeam}>
                Add
              </Button>
            </Stack>
          </Box>

          {/* <Stack direction="row" spacing={2}>
          <Button variant="outlined">Close</Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Stack> */}
        </Modal>
      </div>
    </div>
  );
}

function SponsorField() {
  return (
    <Paper
      sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
      elevation={3}
    >
      <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
        Sponsors
      </Typography>

      <Box sx={{ width: "100%" }}>
        <SponsorTable />
      </Box>
    </Paper>
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

let sponsorRows = [];

function SponsorModal() {
  const [sponsorType, setSponsorType] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorContact, setSponsorContact] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");

  const handleSponsorTypeChange = (event) => {
    setSponsorType(event.target.value);
  };

  const handleSponsorNameChange = (event) => {
    setSponsorName(event.target.value);
  };

  const handleSponsorContactChange = (event) => {
    setSponsorContact(event.target.value);
  };

  const handleSponsorEmailChange = (event) => {
    setSponsorEmail(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewSponsor = () => {
    const newId = sponsorRows.length + 1;
    const newSponsor = {
      id: newId,
      sponsorType: sponsorType,
      sponsorName: sponsorName,
      sponsorContact: sponsorContact,
      sponsorEmail: sponsorEmail,
    };

    const newSponsorRows = [...sponsorRows, newSponsor];

    sponsorRows = newSponsorRows;

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add New Sponsor</Button>
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
            Sponsor Details
          </Typography>

          <TextField
            id="sponsor_type"
            label="Sponsor Type"
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleSponsorTypeChange}
          />

          <TextField
            id="sponsor_name"
            label="Sponsor Name"
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleSponsorNameChange}
          />

          <TextField
            id="sponsor_contact"
            label="Contact No."
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleSponsorContactChange}
          />

          <TextField
            id="sponsor_email"
            label="Email"
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
            onChange={handleSponsorEmailChange}
          />
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" onClick={addNewSponsor}>
              Add
            </Button>
          </Stack>
        </Box>

        {/* <Stack direction="row" spacing={2}>
          <Button variant="outlined">Close</Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Stack> */}
      </Modal>
    </div>
  );
}

const sponsorColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "sponsorType", headerName: "Sponsor Type", width: 150 },
  { field: "sponsorName", headerName: "Sponsor Name", width: 150 },
  { field: "sponsorContact", headerName: "Contact", width: 250 },
  { field: "sponsorEmail", headerName: "E-mail", width: 250 },
];

function SponsorTable() {
  const [sponsorType, setSponsorType] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorContact, setSponsorContact] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");

  const handleSponsorTypeChange = (event) => {
    setSponsorType(event.target.value);
  };

  const handleSponsorNameChange = (event) => {
    setSponsorName(event.target.value);
  };

  const handleSponsorContactChange = (event) => {
    setSponsorContact(event.target.value);
  };

  const handleSponsorEmailChange = (event) => {
    setSponsorEmail(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewSponsor = () => {
    const newId = sponsorRows.length + 1;
    const newSponsor = {
      id: newId,
      sponsorType: sponsorType,
      sponsorName: sponsorName,
      sponsorContact: sponsorContact,
      sponsorEmail: sponsorEmail,
    };

    const newSponsorRows = [...sponsorRows, newSponsor];

    sponsorRows = newSponsorRows;

    refreshTable();
    handleClose();
  };
  const [refreshKey, setRefreshKey] = useState(0);

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
      />

      <div>
        <Button onClick={handleOpen}>Add New Sponsor</Button>
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
              Sponsor Details
            </Typography>

            <TextField
              id="sponsor_type"
              label="Sponsor Type"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleSponsorTypeChange}
            />

            <TextField
              id="sponsor_name"
              label="Sponsor Name"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleSponsorNameChange}
            />

            <TextField
              id="sponsor_contact"
              label="Contact No."
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleSponsorContactChange}
            />

            <TextField
              id="sponsor_email"
              label="Email"
              variant="filled"
              sx={{ width: "100%", marginBottom: 2 }}
              onChange={handleSponsorEmailChange}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
              <Button variant="contained" onClick={addNewSponsor}>
                Add
              </Button>
            </Stack>
          </Box>

          {/* <Stack direction="row" spacing={2}>
          <Button variant="outlined">Close</Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Stack> */}
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

      <InputRow>
        <BudgetModal />
      </InputRow>
    </div>
  );
}

const budgetModalStyle = {
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

function BudgetModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Add New Budget</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={budgetModalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "1em" }}
          >
            Budget Details
          </Typography>

          <TextField
            id="budget-title"
            label="Title"
            variant="filled"
            sx={{ width: "100%", marginBottom: 2 }}
          />

          <BudgetSessionSelect />

          <BudgetTypeSelect />

          <TextField
            id="budget-amount"
            label="Amount"
            type="number"
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            // placeholder="Sessions"
            style={{ boxSizing: "initial" }}
            sx={{ width: "100%" }}
          />
        </Box>
      </Modal>
    </div>
  );
}

function BudgetTypeSelect() {
  const [type, setType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "1em" }}>
      <FormControl fullWidth>
        <InputLabel id="budget_type">Type</InputLabel>
        <Select
          labelId="budget_type_select"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
          variant="filled"
        >
          <MenuItem value={"income"}>Income</MenuItem>
          <MenuItem value={"expense"}>Expense</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function BudgetSessionSelect() {
  const [session, setSession] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSession(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "1em" }}>
      <FormControl fullWidth>
        <InputLabel id="budget_type">Session</InputLabel>
        <Select
          labelId="budget_type_select"
          id="demo-simple-select"
          value={session}
          label="Session"
          onChange={handleChange}
          variant="filled"
        >
          <MenuItem value={"session01"}>Session 01</MenuItem>
          <MenuItem value={"session02"}>Expense</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const budgetColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "budgetTitle", headerName: "Title", width: 150 },
  { field: "budgetSession", headerName: "Session", width: 150 },
  { field: "budgetType", headerName: "Type", width: 250 },
  { field: "budgetAmount", headerName: "Amount", width: 250 },
];

const budgetRows = [
  {
    id: 1,
    budgetTitle: "Hall Rent",
    budgetSession: "Session 01",
    budgetType: "Expense",
    budgetAmount: 10000,
  },
];

function BudgetTable() {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={budgetRows}
        columns={budgetColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

function TicketSwitchDisplay(switchStatus: number, sessionNo: number) {
  if (switchStatus == 0) {
    return 
    <div>
      {AutoTicketForm(sessionNo)};
    </div>
  } else {
    return 
    <>
      {ManualTicketForm(sessionNo)};
    </> 
  }
}

function ManualTicketForm(sessionNo: number) {
  return (
    <Paper
        sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
        elevation={3}
      >
        <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
          Tickets for the Session {sessionNo}
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        >
          <TextField
            id="ticket-location"
            label="Where to Buy Tickets"
            variant="filled"
            sx={{ width: "100%" }}
          />
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

function AutoTicketForm(sessionNo: number) {
  const [imgFile, setImgFile] = React.useState(null);
  return (
    
      <Paper
        sx={{ width: "100%", padding: "2em", marginBottom: "1em" }}
        elevation={3}
      >
        <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
          Tickets for the Session {sessionNo}
        </Typography>

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

        <Box sx={{ width: "100%" }}>
          <AutoTicketTable />
        </Box>
        <Box sx={{ width: "100%", marginBottom: "1em" }}>
          <SponsorModal />
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

const autoTicketColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "ticketType", headerName: "Ticket Type", width: 100 },
  { field: "ticketPrice", headerName: "Price", width: 100 },
  { field: "ticketCount", headerName: "Count", width: 100 },
  { field: "seatNoFrom", headerName: "Seat No. From", width: 150 },
  { field: "seatNoTo", headerName: "Seat No. To", width: 100 },
];

const autoTicketRows = [
  {
    id: 1,
    ticketType: "Gold",
    ticketPrice: 1000,
    ticketCount: 100,
    seatNoFrom: 0,
    seatNoTo: 0,
  },
  {
    id: 2,
    ticketType: "Silver",
    ticketPrice: 500,
    ticketCount: 100,
    seatNoFrom: 0,
    seatNoTo: 0,
  },
];

function AutoTicketTable() {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={autoTicketRows}
        columns={autoTicketColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
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
          label="Choose a country"
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

function EventCreateShow(n: number) {
  if (n == 0) {
    return <EventDetails />;
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
