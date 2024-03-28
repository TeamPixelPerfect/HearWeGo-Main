"use client";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { ADTabBox } from "@/app/styles/artistDashboard.styles";
import { Box, Button, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { Card, Grid } from "@mui/material";
import React, { useState } from "react";

const ArtistAudienceAnalytics = () => {
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
      
  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.secondary.main,
            }}
          >
            Analytics
          </Typography>
          {/* add select field */}
        </Box>
        <ADTabBox>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="General" />
            <Tab label="Advanced" />
            <Tab label="Compare" />
            <Tab label="Fan Club" />
            <Tab label="Merchandise" />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0} fullWidth={true}>
            <Typography variant="body1" sx={{ p: 2 }}>
              <em>General</em>
            </Typography>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            <Typography variant="body1" sx={{ p: 2 }}>
              <em>Advanced</em>
            </Typography>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2} fullWidth={true}>
            <Typography variant="body1" sx={{ p: 2 }}>
              <em>Compare</em>
            </Typography>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3} fullWidth={true}>
            <Typography variant="body1" sx={{ p: 2 }}>
              <em>Fan Club</em>
            </Typography>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={4} fullWidth={true}>
            <Typography variant="body1" sx={{ p: 2 }}>
              <em>Merchandise</em>
            </Typography>
          </CustomTabPanel>
        </ADTabBox>
      </Card>
    </Grid>
  );
};

export default ArtistAudienceAnalytics;
