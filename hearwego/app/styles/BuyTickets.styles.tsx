"use client";
import { styled } from "@mui/material/styles";
import { Autocomplete, Box, Button, Stack, Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useEffect, useState } from "react";
import { url } from "inspector";
import CardActions from "@mui/material";
import { FaFilePdf } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

interface RenderedTicketprops {
  Event_img: string;
  Ref_No: string;
  Event_Name: string;
  session: string;
  date: Date;
  Time: string;
  Venue: string;
  Ticket_Type: string;
  Seat_Type: string;
  Seat_No: number;
  QR_Code: string;
  Ticket_Price: number;
}
interface TicketCoverProps {
  children?: React.ReactNode;
  event_name: string;
  img: string;
  artist_name: string;
}
interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
interface TicketDetailsProps {
  children?: React.ReactNode;
  Ticket_Data: {
    Ticket_Price: number;
    Ticket_Type: string;
    count: number;
  }[];
  setTicketDetails: React.Dispatch<
    React.SetStateAction<
      {
        Ticket_Price: number;
        Ticket_Type: string;
        count: number;
      }[]
    >
  >;
}

export const Maindiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  height: "100%",
}));

function TicketAddBtn({
  Ticket_Data,
  setTicketDetails,
}: {
  Ticket_Data: {
    Ticket_Price: number;
    Ticket_Type: string;
    count: number;
  };
  setTicketDetails: React.Dispatch<
    React.SetStateAction<{
      Ticket_Price: Number;
      Ticket_Type: string;
      count: number;
    }>
  >;
}) {
  // const [ticketCount, setTicketCount] = React.useState(0); // Initialize ticket count to 0
  const [totalExpense, setTotalExpense] = React.useState(0); // Initialize total expense to 0

  const handleAddTicket = () => {
    const ticketPrice = Number(Ticket_Data.Ticket_Price);
    setTicketDetails((prev) => {
      return prev.map((ticket: { Ticket_Type: string; count: number }) => {
        if (ticket.Ticket_Type === Ticket_Data.Ticket_Type) {
          return {
            ...ticket,
            count: ticket.count + 1,
          };
        }
        return ticket;
      });
    });
    setTotalExpense(totalExpense + ticketPrice);
  };
  return (
    <Button
      variant="contained"
      sx={{
        width: "95%",
        justifyContent: "space-between",
        padding: "10px",
        margin: "5px",
      }}
      onClick={handleAddTicket}
    >
      <AddCircleIcon />
      <Typography>{Ticket_Data.Ticket_Type}</Typography>
      <Typography>
        LKR {Ticket_Data.Ticket_Price.toFixed(2).toString()}
      </Typography>
    </Button>
  );
}

export const TicketCover: React.FC<TicketCoverProps> = ({
  event_name,
  img,
  artist_name,
}) => {
  return (
    <Box
      style={{
        width: "100%",
        height: "45vh",
        marginTop: "0px",
        position: "relative",
        backgroundImage: `url(${img})`,
        backgroundRepeat: "repeat-x",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          opacity: 0.7,
        }}
      ></div>
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: "65%",
          left: "20px",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "45px", color: "white" }}>
          {event_name}
        </div>
        <div style={{ fontSize: "30px", color: "#A5B4FC" }}>{artist_name}</div>
      </Box>
    </Box>
  );
};

export function FillDetails(this: any) {
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [nicError, setNicError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  return (
    <Box
      sx={{
        alignItems: "left",
        justifyContent: "left",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Your Details
      </Typography>
      <Stack direction="row" spacing={10}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Typography>First Name</Typography>
          <TextField
            id="firstName"
            error={
              typeof firstNameError === "string" && firstNameError.length > 0
                ? true
                : false
            }
            style={{
              width: "100%",
              boxSizing: "initial",
            }}
            placeholder="Enter your first name (Ex: Kamal)"
            variant="filled"
            helperText={firstNameError ? "First Name is required" : ""}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "35%",
            marginBottom: "10px",
          }}
        >
          <Typography>Last Name</Typography>
          <TextField
            id="lastName"
            style={{
              width: "100%",
              marginBottom: "20px",
              boxSizing: "initial",
            }}
            placeholder="Enter your last name (Ex: Perera)"
            variant="filled"
          />
        </Box>
      </Stack>

      <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
        <Typography>NIC/Passport</Typography>
        <TextField
          id="Nic"
          style={{
            width: "100%",
            marginBottom: "20px",
            boxSizing: "initial",
          }}
          placeholder="Enter your NIC/Passport number"
          variant="filled"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
        <Typography>Contact Number</Typography>
        <Stack direction="row" spacing={12}>
          <PhoneInput country={""} />
        </Stack>
      </Box>
      <Box>
        <Typography>Email</Typography>
        <TextField
          id="email"
          style={{
            width: "35%",
            marginBottom: "20px",
            boxSizing: "initial",
          }}
          placeholder="Enter your working mail address (Ex: hwg@exmaple.com)"
          variant="filled"
        />
      </Box>
      <FormControlLabel
        id="terms"
        control={<Checkbox />}
        label="Agree with the terms & conditions"
      />
    </Box>
  );
}

export const Ticketdetails = ({
  Ticket_Data,
  setTicketDetails,
}: TicketDetailsProps) => {
  return (
    <Box
      sx={{
        alignItems: "left",
        justifyContent: "left",
        height: "100%",
        width: "100%",
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Ticket Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
          {Ticket_Data.map((ticket, index) => (
            <TicketAddBtn
              Ticket_Data={ticket}
              setTicketDetails={setTicketDetails}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            backgroundColor: "primary.main",
            borderRadius: "20px",
          }}
        >
          <AddedTickets Ticket_Data={Ticket_Data} n={0} />
          <AddedTickets Ticket_Data={Ticket_Data} n={1} />
          <AddedTickets Ticket_Data={Ticket_Data} n={2} />
        </Box>
      </Box>
    </Box>
  );
};

function AddedTickets({
  Ticket_Data,
  n,
}: {
  Ticket_Data: {
    Ticket_Price: number;
    Ticket_Type: string;
    count: number;
  }[];
  n: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        color: "background.default",
        padding: "10px",
      }}
    >
      <Typography variant="h6">
        {Ticket_Data[n].Ticket_Type} Tickets <br />x {Ticket_Data[n].count}
      </Typography>
      <Typography variant="h6">
        LKR{" "}
        {(Ticket_Data[n].Ticket_Price * Ticket_Data[n].count)
          .toFixed(2)
          .toString()}
      </Typography>
    </Box>
  );
}

export const PaymentDetails: React.FC = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "background.default",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Checkout Details
        </Typography>
        <Typography variant="h5" sx={{ color: "primary.main" }}>
          Your Payment : LKR 5500.00
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "50%",
          backgroundColor: "background.default",
          paddingTop: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "35%",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ justifyContent: "center" }}>Card Number</Typography>
          <TextField
            id="filled-textarea"
            style={{
              width: "100%",
              marginBottom: "20px",
              boxSizing: "initial",
            }}
            placeholder="Enter your card number"
            variant="filled"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "35%" }}>
          <Typography>CardHolder Name</Typography>
          <TextField
            id="filled-textarea"
            style={{
              width: "100%",
              marginBottom: "20px",
              boxSizing: "initial",
            }}
            placeholder="Enter your Name"
            variant="filled"
          />
        </Box>
        <Stack direction="row" spacing={10} sx={{ width: "35%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
            <Typography>Expiry Date</Typography>
            <TextField
              style={{
                width: "100%",
                boxSizing: "initial",
              }}
              placeholder="MM/YY"
              variant="filled"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              marginBottom: "10px",
            }}
          >
            <Typography>CVV/CVC</Typography>
            <TextField
              id="filled-textarea"
              style={{
                width: "100%",
                marginBottom: "20px",
                boxSizing: "initial",
              }}
              placeholder="Enter CVV"
              variant="filled"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export const SuccessfulDetails: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SuccessfullPDF />
      <Box
        sx={{
          width: "80%",
          backgroundColor: "#581C87",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          padding: "30px 30px 20px 30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Your Tickets
          </Typography>
          <Button
            sx={{
              width: "15%",
              height: "5%",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              borderRadius: "5px",
            }}
            variant="contained"
            size="small"
          >
            PDF
            <FaFilePdf
              style={{
                margin: "10px",
              }}
            ></FaFilePdf>
          </Button>
        </Box>
        <RenderedTicket
          Ref_No="R0001"
          Event_Name="Beats"
          session="1"
          Event_img={
            "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png"
          }
          date={new Date()}
          Time={"19:00 PM"}
          Venue={"XYZ Hall"}
          Ticket_Type={"Gold"}
          Seat_Type={"Premium"}
          Seat_No={1}
          QR_Code={
            "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          }
          Ticket_Price={2500.0}
        />
        <RenderedTicket
          Ref_No="R0002"
          Event_Name="Beats"
          session="1"
          Event_img={
            "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png"
          }
          date={new Date()}
          Time={"19:00 PM"}
          Venue={"XYZ Hall"}
          Ticket_Type={"Silver"}
          Seat_Type={"Premium"}
          Seat_No={1}
          QR_Code={
            "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          }
          Ticket_Price={2000.0}
        />
        <RenderedTicket
          Ref_No="R0003"
          Event_Name="Beats"
          session="1"
          Event_img={
            "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png"
          }
          date={new Date()}
          Time={"19:00 PM"}
          Venue={"XYZ Hall"}
          Ticket_Type={"Bronze"}
          Seat_Type={"Premium"}
          Seat_No={1}
          QR_Code={
            "https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"
          }
          Ticket_Price={1000.0}
        />
      </Box>
    </Box>
  );
};

const SuccessfullPDF: React.FC = () => {
  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        backgroundColor: "#581C87",
        margin: "20px",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "10%",
          //backgroundColor: "white",
          margin: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          padding: "10px",
          color: "white",
        }}
      >
        Order Details
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "40%",
            //backgroundColor: "white",
            margin: "30px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              //backgroundColor: "blue",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                // backgroundColor: "purple",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  //backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "left",
                    //backgroundColor: "red",
                    //margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    padding: "0px 0px 0px 40px",
                  }}
                >
                  Order Id
                </Box>

                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    //backgroundColor: "yellow",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "right",
                    //padding: "10px",
                    fontSize: "16px",
                    padding: "5px 0px 0px 40px",
                  }}
                >
                  0001
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  //backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "left",
                    //backgroundColor: "orange",
                    //margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    padding: "0px 0px 0px 40px",
                  }}
                >
                  Name
                </Box>

                <Box
                  sx={{
                    width: "60%",
                    height: "100%",
                    //backgroundColor: "black",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "right",
                    //padding: "10px",
                    fontSize: "16px",
                    padding: "5px 0px 0px 40px",
                  }}
                >
                  Dasun Madusanka
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  //backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "left",
                    //backgroundColor: "orange",
                    //margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    padding: "0px 0px 0px 40px",
                  }}
                >
                  Contact No.
                </Box>

                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    //backgroundColor: "black",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "right",
                    //padding: "10px",
                    fontSize: "16px",
                    padding: "5px 0px 0px 40px",
                  }}
                >
                  +94779999999
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  //: "green",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "left",
                    //backgroundColor: "orange",
                    //margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    padding: "0px 0px 0px 40px",
                  }}
                >
                  E-mail
                </Box>

                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    //backgroundColor: "black",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "right",
                    //padding: "10px",
                    fontSize: "16px",
                    padding: "5px 0px 0px 0px",
                  }}
                >
                  hearwego@gmail.com
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "50%",
            //backgroundColor: "white",
            margin: "20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              //backgroundColor: "purple",
            }}
          >
            <Box
              sx={{
                width: "100%",
                // height: "100%",
                display: "flex",
                flexDirection: "row",
                ////backgroundColor: "green",
                padding: "5px",
                // margin: "10px",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "20px",
                  color: "white",
                  flexDirection: "column",
                }}
              >
                Gold Tickets
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    fontSize: "12px",
                    padding: "0px 0px 0px 0px",
                  }}
                >
                  x1
                </Box>
              </Box>

              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "right",
                  fontSize: "16px",
                }}
              >
                LKR 2500.00
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: "5px",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "20px",
                  color: "white",
                  flexDirection: "column",
                }}
              >
                Silver Tickets
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    fontSize: "12px",
                    padding: "0px 0px 0px 0px",
                  }}
                >
                  x1
                </Box>
              </Box>

              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "right",
                  fontSize: "16px",
                }}
              >
                LKR 2000.00
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                padding: "5px",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "left",
                  fontSize: "20px",
                  color: "white",
                  flexDirection: "column",
                }}
              >
                Bronze Tickets
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    fontSize: "12px",
                    padding: "0px 0px 0px 0px",
                  }}
                >
                  x1
                </Box>
              </Box>

              <Box
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "right",
                  fontSize: "16px",
                }}
              >
                LKR 1000.00
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{}}>
        <Button
          sx={{
            width: "15%",
            height: "5%",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "5px",
            margin: "60px",
          }}
          variant="contained"
          size="small"
        >
          PDF
          <FaFilePdf
            style={{
              margin: "10px",
            }}
          ></FaFilePdf>
        </Button>
      </Box>
    </Box>
  );
};

const RenderedTicket: React.FC<RenderedTicketprops> = ({
  Event_img,
  Ref_No,
  Event_Name,
  session,
  date,
  Time,
  Venue,
  Ticket_Type,
  Seat_Type,
  Seat_No,
  QR_Code,
  Ticket_Price,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        backgroundColor: "#D8B4FE",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Box sx={{ width: "95%", height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "30%",
              backgroundImage: `url(${Event_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            <Stack
              spacing={2.5}
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "20px",
                width: "40%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Ref. No :
                </Typography>
                <Typography color="black">{Ref_No}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Event Name :
                </Typography>
                <Typography color="black">{Event_Name}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Session :
                </Typography>
                <Typography color="black">{session}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Date :
                </Typography>
                <Typography color="black">{date.toDateString()}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Time :
                </Typography>
                <Typography color="black">{Time}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Venue :
                </Typography>
                <Typography color="black">{Venue}</Typography>
              </Box>
            </Stack>
            <Stack
              spacing={2.5}
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "20px",
                width: "40%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Ticket Type :
                </Typography>
                <Typography color="black">{Ticket_Type}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Seat Type :
                </Typography>
                <Typography color="black">{Seat_Type}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight="bold" color="black">
                  Seat No :
                </Typography>
                <Typography color="black">{Seat_No}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    height: "110px",
                    backgroundImage: `url(${QR_Code})`,
                    width: "50%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Box>
                <Typography variant="h6" fontWeight="bold" color="black">
                  {Ticket_Price} LKR
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
