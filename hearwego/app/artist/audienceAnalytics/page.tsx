"use client";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { ADTabBox } from "@/app/styles/artistDashboard.styles";
import { Box, Button, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { Card, Grid } from "@mui/material";
import React, { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ADAnalyticBox } from "@/app/styles/artistAnalytics.styles";

interface DataRowProps {
  title: string;
  value: string;
  change?: string;
  up?: boolean;
  top?: boolean;
}

const DataRow = ({ title, value, change, up, top }: DataRowProps) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={8} item>
        <Typography variant="body1" fontWeight={top ? "600" : "400"}>{title}</Typography>
      </Grid>
      <Grid xs={2} item>
        <Typography fontWeight="800" textAlign="right" variant="body1">
          {value}
        </Typography>
      </Grid>
      <Grid xs={2} item sx={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
        {!top && up ? (
          <ArrowDropUpIcon color="success" sx={{ fontSize: "32px" }} />
        ) : !top ? (
          <ArrowDropDownIcon color="error" sx={{ fontSize: "32px" }} />
        ) : null}
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            // minWidth: "30px",
          }}
        >
          {up === true || up === false ? change: ""}
        </Typography>
      </Grid>
    </Grid>
  );
};

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
            <Typography variant="body1" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid xs={12} md={5} item>
                  <ADAnalyticBox>
                    <Typography variant="h6" sx={{ marginBottom: "1em" }}>
                      Your Latest Song
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        background: "#fff",
                        marginBottom: "1em",
                      }}
                    >
                      <img
                        src="https://via.placeholder.com/150"
                        alt="song cover"
                        width="100%"
                        height={200}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                      I'll be there for you
                    </Typography>
                    <DataRow
                      title="Ranking"
                      value="1 of 20"
                      change="04"
                      up={true}
                    />
                    <DataRow
                      title="Streams"
                      value="128K"
                      change="48K"
                      up={false}
                    />
                    <Typography
                      variant="body1"
                      sx={{ mt: "1em", mb: "8px", fontSize: "13px" }}
                    >
                      Impressions
                    </Typography>
                    <DataRow
                      title="Last Hour"
                      value="245"
                      change="05"
                      up={true}
                    />
                    <DataRow
                      title="Last Day"
                      value="7400"
                      change="200"
                      up={true}
                    />
                    <DataRow
                      title="Total"
                      value="1.2M"
                      change="400K"
                      up={true}
                    />
                  </ADAnalyticBox>
                </Grid>
                <Grid xs={12} md={7} item>
                  <ADAnalyticBox>
                    <Grid xs={12} md={12} container sx={{ mb: 2 }}>
                      <Grid xs={8} md={8} item>
                        <Typography
                          fontWeight="600"
                          variant="h5"
                          sx={{ marginBottom: "1em" }}
                        >
                          Overall
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "14px" }}>
                          Fans
                        </Typography>
                        <Typography variant="h4" fontWeight={600}>
                          3,244,890
                        </Typography>
                      </Grid>
                      <Grid
                        xs={4}
                        md={4}
                        item
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src="https://c4.wallpaperflare.com/wallpaper/10/309/175/maroon-5-band-members-look-wallpaper-preview.jpg"
                          width={100}
                          height={100}
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                      </Grid>
                    </Grid>
                    <DataRow
                      title="Artist Rank"
                      value="137"
                      change="04"
                      up={true}
                    />
                    <DataRow
                      title="Fan Club Posts"
                      value="95"
                      change="04"
                      up={false}
                    />
                    <DataRow
                      title="Merchandise Sales"
                      value="$3.4M"
                      change="04"
                      up={true}
                    />
                    <DataRow
                      title="Total Impressions"
                      value="70.4M"
                      change="100K"
                      up={false}
                    />
                    <DataRow
                      title="Total Streams"
                      value="1.2B"
                      change="400M"
                      up={true}
                    />
                    <DataRow
                      title="Events Organized"
                      value="14"
                      change="01"
                      up={true}
                    />
                    <Typography
                      variant="body1"
                      sx={{ mt: "1em", mb: "8px", fontSize: "13px" }}
                    >
                      Top Songs
                    </Typography>
                    <DataRow
                      title="01. I'll be there for you"
                      value="12M"
                      top={true}
                    />
                    <DataRow
                      title="02. I'll be there for you"
                      value="12M"
                      top={true}
                    />
                    <Typography
                      variant="body1"
                      sx={{ mt: "1em", mb: "8px", fontSize: "13px" }}
                    >
                      Top Albums
                    </Typography>
                    <DataRow
                      title="01. L.P."
                      value="26M"
                      top={true}
                    />
                  </ADAnalyticBox>
                </Grid>
                <Grid xs={12} md={4} item></Grid>
                <Grid xs={12} md={4} item></Grid>
                <Grid xs={12} md={4} item></Grid>
                <Grid xs={12} md={12} item></Grid>
              </Grid>
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
