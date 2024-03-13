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
const countries: readonly CountryType[] = [
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

export function FillDetails() {
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
            style={{
              width: "100%",
              boxSizing: "initial",
            }}
            placeholder="Enter your first name (Ex: Kamal)"
            variant="filled"
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
            id="filled-textarea"
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
          id="filled-textarea"
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
          <Box sx={{ width: "20%" }}>
            <Autocomplete
              id="country-select-demo"
              sx={{}}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.phone.toString()}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                  />
                  ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Box>
          <TextField
            id="filled-textarea"
            style={{
              width: "100%",
              marginBottom: "20px",
              boxSizing: "initial",
            }}
            placeholder="Enter your contact number"
            variant="filled"
          />
        </Stack>
      </Box>
      <Box>
        <Typography>Email</Typography>
        <TextField
          id="filled-textarea"
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
        <Typography variant="h4" gutterBottom>
          Your Tickets
        </Typography>
        <RenderedTicket
          Ref_No="123456"
          Event_Name="Beats"
          session="1"
          Event_img={
            "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png"
          }
          date={new Date()}
          Time={"19:00 PM"}
          Venue={"XYZ Hall"}
          Ticket_Type={"General"}
          Seat_Type={"Premium"}
          Seat_No={1}
          QR_Code={""}
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
        height: "400px",
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
          fontSize: "20px",
          fontWeight: "bold",
          padding: "10px",
        }}
      >
        Oreder Details
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
            height: "50%",
            backgroundColor: "white",
            margin: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "blue",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "35%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "purple",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "red",
                    margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    //padding: "10px",
                  }}
                >
                  Order Id
                </Box>

                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: "yellow",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "center",
                    //padding: "10px",
                    fontSize: "20px",
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
                  backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "orange",
                    //margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    //padding: "10px",
                  }}
                >
                  Order Id
                </Box>

                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: "black",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "center",
                    //padding: "10px",
                    fontSize: "20px",
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
                  backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "orange",
                    //margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    //padding: "10px",
                  }}
                >
                  Order Id
                </Box>

                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: "black",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "center",
                    //padding: "10px",
                    fontSize: "20px",
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
                  backgroundColor: "green",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "orange",
                    //margin: "10px 0px 0px 10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    //padding: "10px",
                  }}
                >
                  Order Id
                </Box>

                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: "black",
                    //margin: "10px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "center",
                    //padding: "10px",
                    fontSize: "20px",
                  }}
                >
                  0001
                </Box>
              </Box>

              
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "50%",
            backgroundColor: "white",
            margin: "10px",
          }}
        ></Box>
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
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Box sx={{ width: "95%", backgroundColor: "white", height: "100%" }}>
        <Box
          sx={{
            height: "100%",
            width: "25%",
            backgroundImage: `url(${Event_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
