"use client";
import * as React from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
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
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
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

function EventDetails() {
  const [songFile, setSongFile] = React.useState(null);

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>

    </>
  );
}

function TicketDetails() {
  return (
    <div>
      Ticket Details
      <InputRow>
        <AutoGenerateSwitch />
      </InputRow>
      <InputRow>
        <Box
          sx={{
            width: "100%",
            padding: "3em",
            border: 1,
            borderRadius: 10,
            borderColor: "primary.main",
          }}
        >
          <AutoTicketForm />
        </Box>
      </InputRow>
    </div>
  );
}

function SessionForm() {
  return (
    <SessionBox>
      <Box
        sx={{
          fontSize: "1.5em",
          fontWeight: "600",
          color: "primary.main",
          marginBottom: "1em",
        }}
      >
        Session 01
      </Box>
      <SessionInputRow>
        <Box sx={{ width: "50%" }}>
          <InputRow>
            <div style={{ boxSizing: "initial", width: "100%" }}>
              <DatePickerValue />
            </div>
          </InputRow>

          <InputRow>
            <EventCalendar />
          </InputRow>
        </Box>

        <SessionInfo>
          <InputRow>
            <Box sx={{ width: "50%" }}>
              <TimeFieldValue />
            </Box>
          </InputRow>

          <InputRow>
            <Box sx={{ width: "50%" }}>
              <TextField
                id="outlined-number"
                label="Duration (Hours)"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Duration"
                style={{ boxSizing: "initial" }}
                sx={{ width: "100%" }}
              />
            </Box>
          </InputRow>

          <InputRow>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "25ch" },
                width: "50%",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Venue"
                variant="outlined"
                style={{ boxSizing: "initial" }}
                sx={{ minWidth: "100%" }}
              />
            </Box>
          </InputRow>

          <InputRow>
            <Box sx={{ width: "100%" }}>
              <Stack spacing={3} sx={{ width: "100%" }}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={artists}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[artists[1]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Other Artists"
                      placeholder="Artists"
                    />
                  )}
                />
              </Stack>
            </Box>
          </InputRow>

          <InputRow>
            <Box sx={{ width: "100%" }}>
              <TextField
                id="outlined-multiline-static"
                label="Special Notice"
                multiline
                rows={4}
                placeholder="If any special notice"
                sx={{ width: "100%" }}
              />
            </Box>
          </InputRow>
        </SessionInfo>
      </SessionInputRow>
    </SessionBox>
  );
}

function TimeFieldValue() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimeField", "TimeField"]}>
          <TimeField
            label="Time"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            style={{ boxSizing: "initial" }}
            sx={{ width: "100%" }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}

function SelectAgeFrom() {
  return (
    <Box sx={{ width: "45%" }}>
      <TextField
        id="outlined-number"
        label="Age"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="From"
        style={{ boxSizing: "initial" }}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}

function SelectAgeTo() {
  return (
    <Box sx={{ width: "45%" }}>
      <TextField
        id="outlined-number"
        label="Age"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="To"
        style={{ boxSizing: "initial" }}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}

function SelectSession() {
  const [sessionNo, SelectSessionNo] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    SelectSessionNo(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        id="outlined-number"
        label="No. of Sessions"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Sessions"
        style={{ boxSizing: "initial" }}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}

function EventCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <Box
      sx={{
        borderRadius: 5,
        border: 2,
        borderBlockColor: "primary.main",
        marginRight: 15,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar"]}>
          <DemoItem label="Event Calendar">
            <DateCalendar
              value={value}
              onChange={(newValue) => setValue(newValue)}
              readOnly
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}

function createData(
  Team: string,
  Name: string,
  Contact: string,
  Email: string
) {
  return { Team, Name, Contact, Email };
}

const rows = [
  createData("Team Type", "Team Name", "+94779184997", "hwg@gmail.com"),
];

function TeamTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">Team Name</TableCell>
            <TableCell align="right">Contact No.</TableCell>
            <TableCell align="right">E-mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Team}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Team}
              </TableCell>
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">{row.Contact}</TableCell>
              <TableCell align="right">{row.Email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function DatePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function BudgetDetails() {
  return (
    <div>
      <InputRow>
        <CurrencySelect />
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

function createBudgetData(
  title: string,
  session: string,
  type: string,
  amount: number
) {
  return { title, session, type, amount };
}

const budgetRows = [createBudgetData("Hall Rent", "Session 01", "Expense", 20000)];

function BudgetTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Session</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetRows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.session}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CurrencySelect() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Currency"
          defaultValue="EUR"
          helperText="Please select your currency"
          placeholder="Currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

function AutoGenerateSwitch() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        label="Generate Tickets Here"
      />
    </FormGroup>
  );
}

function AutoTicketForm() {
  return (
    <Box>
      <InputRow>
        <Box
          sx={{
            fontSize: "1.5em",
            fontWeight: "600",
            color: "primary.main",
            marginBottom: "1em",
          }}
        >
          Tickets for the Session on 2024-01-19 at 8.00 P.M
        </Box>
      </InputRow>

      <InputRow>
        <TicketTable />
      </InputRow>

      <InputRow>
        <TicketModal />
      </InputRow>

      <InputRow>
        <Box sx={{ width: "100%" }}>
          <TextField
            id="outlined-multiline-static"
            label="Special Notice"
            multiline
            rows={4}
            placeholder="If any special notice"
            sx={{ width: "100%" }}
          />
        </Box>
      </InputRow>
    </Box>
  );
}

function createTicketData(
  type: string,
  price: number,
  count: number,
  seatType: string,
  seatFrom: number,
  seatTo: number
) {
  return { type, price, count, seatType, seatFrom, seatTo };
}

const ticketRows = [createTicketData("Gold", 2000, 100, "none", 0, 0)];

function TicketTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Seat Type</TableCell>
            <TableCell align="right">Seat No. From</TableCell>
            <TableCell align="right">Seat No. To</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ticketRows.map((row) => (
            <TableRow
              key={row.type}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.seatType}</TableCell>
              <TableCell align="right">{row.seatFrom}</TableCell>
              <TableCell align="right">{row.seatTo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function BudgetModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [session, setSession] = React.useState("");

  const handleSessionChange = (event: SelectChangeEvent) => {
    setSession(event.target.value as string);
  };

  const [type, setType] = React.useState("");

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add New Budget</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Budget Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ marginTop: "2em" }}>
              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Budget Title"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                    placeholder="Hall Rent"
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Session
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={session}
                      label="Session"
                      onChange={handleSessionChange}
                    >
                      <MenuItem value={10}>Session 01</MenuItem>
                      <MenuItem value={20}>Session 02</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </InputRow>

              <InputRow>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Type"
                      onChange={handleTypeChange}
                    >
                      <MenuItem value={10}>Expense</MenuItem>
                      <MenuItem value={20}>Income</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </InputRow>

              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" endIcon={<AddIcon />}>
                    Add
                  </Button>
                </Stack>
              </InputRow>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

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
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Team Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ marginTop: "2em" }}>
              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Team Type"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                    placeholder="Organizing"
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Team Name"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>
              </InputRow>

              <InputRow
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <SelectCountryCode />

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "60%" },
                    width: "60%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Phone Numner"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="E-mail"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                    placeholder="hwg@gmail.com"
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" endIcon={<AddIcon />}>
                    Add
                  </Button>
                </Stack>
              </InputRow>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

function TicketModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Add New Ticket</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ticket Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ marginTop: "2em" }}>
              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Ticket Type"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                    placeholder="Organizing"
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Ticket Price"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>
              </InputRow>

              <InputRow
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-number"
                    label="Ticket Count"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "25ch" },
                    width: "100%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Seat Type"
                    variant="outlined"
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>
              </InputRow>

              <InputRow
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "45%" },
                    width: "45%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-number"
                    label="Seat No. From"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "45%" },
                    width: "45%",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-number"
                    label="Seat No. To"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ boxSizing: "initial" }}
                    sx={{ minWidth: "100%" }}
                  />
                </Box>
              </InputRow>

              <InputRow>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" endIcon={<AddIcon />}>
                    Add
                  </Button>
                </Stack>
              </InputRow>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

function SelectCountryCode() {
  return (
    <Box sx={{ width: "30%" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="Country Code"
            defaultValue="EUR"
          >
            {countries.map((option) => (
              <MenuItem key={option} value={option}>
                <ReactCountryFlag
                  key={option}
                  countryCode={option}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "8px",
                  }}
                  title={option}
                />
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
    </Box>
  );
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

const artists = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

const countryCode = [
  {
    value: "SL",
    label: "+94",
  },
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

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
              <TicketTable />
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
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div"></Typography>
    </CardContent>
  </React.Fragment>
);
