"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, Stack, Typography } from "@mui/material";


// Functional component for the page
const page = () => {
  return (
    <div>
      <h1 style={{ marginLeft: "20px", color: "#4338CA" }}>Tickets</h1>

      {/* Main content */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ border: "solid", borderRadius: "20px" ,width:'1200px'}}>
            <CardContent>
              <Typography sx={{ fontSize: 24 }} color="#4338CA" gutterBottom>
                Ticket Information
              </Typography>
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

                 {/* Ticket Details Text */}
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
              <Box sx={{ display: "flex" ,marginTop:'20px'}}>
                    <Typography sx={{ mb: 1.5 }}>Where to buy tickets:</Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      https://tickets.com {" "}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ mb: 1.5 }}>Special Notice:   </Typography>
                    <Typography
                      sx={{
                        fontFamily: "serif",
                        fontStyle: "italic",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      Lorem ipsum dolor sit amet consectetur. Dui porttitor eu id venenatis blandit lorem egestas. At adipiscing orci pulvinar sodales arcu. Ultricies et enim molestie felis amet facilisi nullam nunc consectetur. Sapien viverra magna a nunc aliquam odio {" "}
                    </Typography>
                  </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* Button section */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop:'20px',
          marginRight:'40px'
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
