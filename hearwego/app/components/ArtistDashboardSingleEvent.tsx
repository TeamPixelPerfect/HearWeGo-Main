"use client";

import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import DraftsIcon from "@mui/icons-material/Drafts";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PaidIcon from "@mui/icons-material/Paid";


import {
  EventMainBox,
  TopBar,
  TabBar,
  BtnSec,
  EventSec,
  EventDetailRow,
} from "../styles/artistDashboardEventsPage.styles";

export default function ArtistSingleEvent(){
    return(
        <Card sx={{ width: 220, marginRight:'1em' ,marginBottom:'1em'}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://shorturl.at/qxDV8"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Nadagama
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <EventDetailRow direction="row" spacing={10}>
                  <CalendarMonthIcon />
                  2024 - 03 - 01
                </EventDetailRow>
                <EventDetailRow direction="row" spacing={10}>
                  <AccessTimeFilledIcon />
                  7.00 P.M.
                </EventDetailRow>
                <EventDetailRow direction="row" spacing={10}>
                  <FavoriteIcon />
                  1.2K
                </EventDetailRow>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="ticket">
                <LocalActivityIcon />
              </IconButton>
              <IconButton aria-label="budget">
                <PaidIcon />
              </IconButton>
              <IconButton aria-label="add to shopping cart">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardActions>
        </Card>
    )
}