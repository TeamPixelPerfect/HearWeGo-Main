"use client";
import React from "react";
import { Container, Typography, Box, Button, styled } from "@mui/material";
import Image from "next/image";

const CustomBox = styled(Box)(({ theme }) => ({
  //   backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  //   boxShadow: theme.shadows[3],
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const NotFound = () => {
  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomBox>
        {/* <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography> */}
        <Image
          src="/imgs/thinking.png"
          alt="Thinking Dolphin"
          width={200}
          height={200}
          style={{ marginRight: "2em" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h2"
            component="p"
            paragraph
            sx={{ textAlign: "left", fontSize: "100px", fontWeight: 600 }}
          >
            404
          </Typography>
          <Typography
            variant="h6"
            paragraph
            sx={{ textAlign: "left" }}
          >
            Hmm... it seems like the page you are looking for doesn't exist?
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Go to Home
          </Button>
        </Box>
      </CustomBox>
    </Container>
  );
};

export default NotFound;
