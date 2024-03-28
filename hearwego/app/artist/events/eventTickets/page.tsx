"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardMedia, Stack } from "@mui/material";

// Function to create data for the table
function createData1(name1: string, calories1: number) {
  return { name1, calories1 };
}
// Data for the table
const rows1 = [createData1("Gold", 159), createData1("Silver", 237)];

//Styling for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styling for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {},
}));

// Function to create data for the main table
function createData(
  name: string,
  calories: string,
  fat: number,
  carbs: string,
  protein: number,
  seatNoTo: number
) {
  return { name, calories, fat, carbs, protein, seatNoTo };
}

// Data for the main table
const rows = [
  createData("Gold", "LKR 2000", 100, "A", 1, 100),
  createData("Silver", "LKR 1000", 200, "B", 1, 200),
];

// Bull JSX element for visual separation
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

// Functional component for the page
const page = () => {
  return (
    <div>
      <h1 style={{ marginLeft: "20px", color: "#4338CA" }}>Tickets</h1>

      {/* Main content */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ border: "solid", borderRadius: "20px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 24 }} color="#4338CA" gutterBottom>
                Ticket Information
              </Typography>

              {/* Ticket Details */}
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ display: "flex", width: "35%" }}>
                  <Box
                    sx={{
                      width: "300px",
                      minWidth: "100px",
                      height: "200px",

                      background:
                        "url('https://ts-production.imgix.net/images/9a145076-c91d-4c5d-9c56-944c5e4c1cc8.jpg?auto=compress,format&w=800&h=450')",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      borderRadius: "10px",
                    }}
                  ></Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "65%",
                    margin: "10px",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Event Name:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      Night Club Party{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Session:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      Session 01
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Date:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      2024-01-19{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Time:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      8.00 P.M
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Venue:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      XYZ Hall
                    </Typography>
                  </Box>
                </Box>
              </Box>
             
              {/* Table for Tickets */}
              <Box sx={{ marginTop: "30px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Ticket Type</StyledTableCell>
                        <StyledTableCell align="right">
                          Ticket Price
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Tickets Count
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Seat Type(Optional)(g)
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Seat No. From(Optional)
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Seat No. To(Optional)
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                       {/* Mapping through data to create table rows */}
                      {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.calories}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.fat}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.carbs}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.protein}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.seatNoTo}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{}}>
                <h3>Special Notice: </h3>

                <p>
                  Lorem ipsum dolor sit amet consectetur. Dui porttitor eu id
                  venenatis blandit lorem egestas. At adipiscing orci pulvinar
                  sodales arcu. Ultricies et enim molestie felis amet facilisi
                  nullam nunc consectetur. Sapien viverra magna a nunc aliquam
                  odio{" "}
                </p>
              </Box>


              {/*Ticket Preview*/}
              <Typography sx={{ fontSize: 24 }} color="#4338CA" gutterBottom>
                Ticket Preview
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Card sx={{ backgroundColor: "GrayText", width: "950px" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 24 }}
                      color="#4338CA"
                      gutterBottom
                    >
                      Ticket Information
                    </Typography>
                    <Box sx={{ display: "flex", width: "100%" }}>
                      <Box sx={{ display: "flex", width: "70%" }}>
                        <Box sx={{ display: "flex", width: "30%" }}>
                          <Box
                            sx={{
                              width: "200px",
                              minWidth: "200px",
                              height: "200px",

                              background:
                                "url('https://ts-production.imgix.net/images/9a145076-c91d-4c5d-9c56-944c5e4c1cc8.jpg?auto=compress,format&w=800&h=450')",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              borderRadius: "10px",
                            }}
                          ></Box>
                        </Box>

                        <Box sx={{ display: "flex", width: "70%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              color:'white',
                              width: "50%",
                              justifyContent: "space-evenly",
                              marginLeft: "20px",
                            }}
                          >
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ mb: 1.5 }}>Ref. No:</Typography>
                              <Typography
                                sx={{
                                  fontFamily: "serif",
                                  fontStyle: "italic",
                                  marginLeft: "20px",
                                }}
                              >
                                {" "}
                                T0001{" "}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ mb: 1.5 }}>
                                Event Name:
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: "serif",
                                  fontStyle: "italic",
                                  marginLeft: "20px",
                                }}
                              >
                                {" "}
                                Night Club Party{" "}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ mb: 1.5 }}>Session:</Typography>
                              <Typography
                                sx={{
                                  fontFamily: "serif",
                                  fontStyle: "italic",
                                  marginLeft: "20px",
                                }}
                              >
                                Session 01
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ mb: 1.5 }}>Date:</Typography>
                              <Typography
                                sx={{
                                  fontFamily: "serif",
                                  fontStyle: "italic",
                                  marginLeft: "20px",
                                }}
                              >
                                {" "}
                                2024-01-19{" "}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ mb: 1.5 }}>Time:</Typography>
                              <Typography
                                sx={{
                                  fontFamily: "serif",
                                  fontStyle: "italic",
                                  marginLeft: "20px",
                                }}
                              >
                                {" "}
                                8.00 P.M
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography sx={{ mb: 1.5 }}>Venue:</Typography>
                              <Typography
                                sx={{
                                  fontFamily: "serif",
                                  fontStyle: "italic",
                                  marginLeft: "20px",
                                }}
                              >
                                {" "}
                                XYZ Hall
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", width: "30%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            color:'white',
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Typography>Ticket Type: </Typography>
                            <Typography
                              sx={{
                                fontFamily: "serif",
                                fontStyle: "italic",
                                marginLeft: "20px",
                              }}
                            >
                              {" "}
                              Gold
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex" }}>
                            <Typography>Seat Type: </Typography>
                            <Typography
                              sx={{
                                fontFamily: "serif",
                                fontStyle: "italic",
                                marginLeft: "20px",
                              }}
                            >
                              {" "}
                              A
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography>Seat No: </Typography>
                            <Typography
                              sx={{
                                fontFamily: "serif",
                                fontStyle: "italic",
                                marginLeft: "20px",
                              }}
                            >
                              {" "}
                              0001
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex" }}>
                            <Box
                              sx={{
                                width: "60px",
                                minWidth: "60px",
                                height: "60px",

                                background:
                                  "url(https://www.techopedia.com/wp-content/uploads/2023/03/aee977ce-f946-4451-8b9e-bba278ba5f13.png)",
                                backgroundPosition: "flex end",
                                backgroundSize: "cover",
                                borderRadius: "10px",
                              }}
                            ></Box>

                            <Typography
                              sx={{
                                fontSize: "30px",
                                marginLeft: "10px",
                                marginTop: "10px",
                              }}
                            >
                              2000 LKR
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Box>

        
         {/*Ticket Preview*/}
        <Card
          sx={{
            minWidth: 275,
            border: "solid",
            marginTop: "30px",
            borderRadius: "20px",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: 24 }} color="#4338CA" gutterBottom>
                Ticket Preview
              </Typography>
              <Table sx={{ maxWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Ticket Type</StyledTableCell>
                    <StyledTableCell align="right">Sales</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows1.map((row1) => (
                    <StyledTableRow key={row1.name1}>
                      <StyledTableCell component="th" scope="row1">
                        {row1.name1}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row1.calories1}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop:'20px'
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Edit Ticket Info</Button>
          <Button variant="contained">Close</Button>
        </Stack>
      </div>
    </div>
  );
};

export default page;
