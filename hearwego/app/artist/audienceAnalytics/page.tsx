"use client";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { Card, Grid } from "@mui/material";
import React, { useState } from "react";
import { ADAnalyticBox, ADGraphTab } from "@/app/styles/artistAnalytics.styles";
import { LineChart } from "@mui/x-charts/LineChart";
import ADAdvancedAnalytics from "@/app/artist/audienceAnalytics/AdvancedAnalytics";
import ADGeneralAnalytics from "@/app/artist/audienceAnalytics/GeneralAnalytics";
import ADCompareAnalytics from "./CompareAnalytics";

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
          height: "100%",
          background: theme.palette.background.paper,
          scrollbarWidth: "none",
          scrollbarColor: "transparent transparent",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em 2em 0 2em",
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
            <ADGeneralAnalytics />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            <ADAdvancedAnalytics />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2} fullWidth={true}>
            <ADCompareAnalytics />
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
