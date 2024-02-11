"use client";
import * as React from "react";
import {
  SingleCampaign,
  CampaignMedia,
  CampaignContent,
} from "../styles/pressRelease.style";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
export default function SinglePRCampaign() {
  const [progress, setProgress] = React.useState(10);
  return (
    <Box>
      <SingleCampaign>
        <CampaignMedia
          image={
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/classic-song-mixtape-album-cover-template-design-3ba3255137894fac49ae81b1346b289e_screen.jpg?ts=1635384548"
          }
        />
        <CampaignContent>
          <h2> Classic Song Mixtape</h2>
          <p> Classic Song Mixtape Album Cover Template Design</p>
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
          <Button variant="contained" sx={{ width: "140px" }}>
            See More
          </Button>
        </CampaignContent>
      </SingleCampaign>
    </Box>
  );
}
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
