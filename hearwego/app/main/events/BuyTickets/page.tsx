"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  stepConnectorClasses,
} from "@mui/material";
import {
  PaymentDetails,
  SuccessfulDetails,
  TicketCover,
  Ticketdetails,
} from "../../../styles/BuyTickets.styles";
import { Maindiv } from "../../../styles/SingleArtistPage.styles";
import { styled } from "@mui/material/styles";
import { Step, StepLabel, Stepper, StepConnector } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";
import FeedIcon from "@mui/icons-material/Feed";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Check } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FillDetails } from "../../../styles/BuyTickets.styles";

const tickets = [
  {
    Ticket_Type: "Bronze",
    Ticket_Price: 1000.0,
    count: 0,
  },
  {
    Ticket_Type: "Silver",
    Ticket_Price: 2000.0,
    count: 0,
  },
  {
    Ticket_Type: "Gold",
    Ticket_Price: 2500.0,
    count: 0,
  },
];


function EventCreateShow(n: number) {
  const [ticketData, setTicketData] = useState(tickets);

  if (n == 0) {
    return <FillDetails />;
  } else if (n == 1) {
    return (
      <Ticketdetails
        Ticket_Data={ticketData}
        setTicketDetails={setTicketData}
      />
    );
  } else if (n == 2) {
    return <PaymentDetails />;
  } else if (n == 3) {
    return <SuccessfulDetails />;
  } else {
    return null;
  }
}

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

//where the icons are defined and assigned to the steps
function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <FeedIcon />,
    2: <LocalActivityIcon />,
    3: <AttachMoneyIcon />,
    4: <Check />,
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

const steps = ["Your Details", "Ticket Details", "Payment", "Successful"];

export default function Page() {
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
    <Maindiv>
      <TicketCover
        event_name="Beats"
        artist_name="Kaizer Kaize"
        img="https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png"
      />

      <Stack sx={{ width: "100%", paddingTop: "20px" }} spacing={4}>
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
      <Box
        sx={{
          padding: "2em",
          paddingLeft: "7em",
          paddingRight: "7em",
          overflow: "hidden",
        }}
      >
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
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
              <Button onClick={handleComplete} variant="contained">
                {completedSteps() === 1
                  ? "Checkout"
                  : completedSteps() === totalSteps() - 1
                  ? "Finish"
                  : "Next"}
                {/* {completedSteps() === totalSteps() - 1 ? "Finish" : "Next"} */}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Maindiv>
  );
}
