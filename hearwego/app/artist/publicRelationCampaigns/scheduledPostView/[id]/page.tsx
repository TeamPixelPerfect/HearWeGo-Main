"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Collapse,
  Box,
  Chip,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePRPost } from "@/app/services/PrServices";

interface ScheduledPostProps {
  description: string;
  assignedCampaign: string;
  image: string;
  socialMedias: string[];
  date: string;
  time: string;
  id: string;
  token: string;
}

const ScheduledPostCard: React.FC<ScheduledPostProps> = ({
  description,
  assignedCampaign,
  image,
  socialMedias,
  date,
  time,
  token,
  id,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onDelete = async () => {
    try {
      await deletePRPost(token, id);
    } catch (error) {
      console.error(error);
    }
  };
  const formattedDate = new Date(date).toLocaleDateString("en-CA"); // Format date as YYYY/MM/DD
  const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  ); // Format time as HH:MM

  return (
    <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="Scheduled post image"
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            Scheduled Post
          </Typography>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <DateRangeIcon sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <AccessTimeIcon sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {formattedTime}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleExpandClick}
          endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {expanded ? "Show Less" : "See More"}
        </Button>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box mt={2}>
            <Typography variant="h6">Details</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Campaign: {assignedCampaign}
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {socialMedias.map((media) => (
                <Chip key={media} label={media} color="primary" />
              ))}
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default ScheduledPostCard;
