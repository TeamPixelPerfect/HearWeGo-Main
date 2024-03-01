import { Box, Card, Grid } from "@mui/material";
import React from "react";

const ADHomePage = () => {
  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Grid item xs={12} md={12} sx={{ height: "50vh", margin: "0" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(-45deg, rgba(67, 56, 202, 0.3) 50%, rgba(126, 34, 206, 0.3) 50%),
              url('https://londonmumsmagazine.com/wp-content/uploads/2019/07/The-Rembrandts-Via-Satellite-2.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} md={8} sx={{ margin: 0 }}>
        <Card
          sx={{
            width: "100%",
            height: "300px",
            margin: "12px 0",
            // background: "#fff",
            boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
          }}
        ></Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{ margin: 0 }}>
        <Card
          sx={{
            width: "95%",
            height: "300px",
            margin: "12px auto",
            // background: "#fff",
            boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
          }}
        ></Card>
      </Grid>
    </Grid>
  );
};

export default ADHomePage;
