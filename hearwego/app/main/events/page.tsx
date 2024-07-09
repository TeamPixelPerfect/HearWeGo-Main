"use client";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SingleEvent from "@/app/components/SingleEvent";
import { Button } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { useAppSelector } from "@/lib/hooks";
import { getInterestedEventsByUser } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import { Artist } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import { getUpcomingEventsByInterest } from "@/app/services/EventServices";
import { getUpcomingEventsSortByDate } from "@/app/services/EventServices";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Maindiv,
  CoverCardMedia,
  CaptionBox,
  Caption01Box,
  Caption02Box,
  Caption03Box,
  SearchPaper,
} from "@/app/styles/eventsMW.styles";
import { CustomSelect } from "@/app/components/eventsDropDown";
import { get } from "http";
import { set } from "date-fns";

export const TypeOptions = [
  { value: "concerts", label: "Concerts" },
  { value: "festivals", label: "Festivals" },
  { value: "nightClubs", label: "Night Clubs" },
  { value: "other", label: "Other" },
];

export const LocationOptions = [
  { value: "none", label: "None" },
  { value: "singer", label: "Singer" },
  { value: "guitarist", label: "Guitarist" },
  { value: "drummer", label: "Drummer" },
  { value: "pianist", label: "Pianist" },
  { value: "bassist", label: "Bassist" },
];

export const ArtistOptions = [
  { value: "none", label: "None" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function EventsPage() {
  const user = useAppSelector((state) => state.user.user);
  const [Type, setType] = React.useState("");
  const [Location, setLocation] = React.useState("");
  const [Artist, setArtist] = React.useState("");
  const [interestEvents, setInterestEvents] = React.useState<Event[]>([]);
  const [trendingEvents, setTrendingEvents] = React.useState<Event[]>([]);
  const [allEvents, setAllEvents] = React.useState<Event[]>([]);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [loadingInterestEvents, setLoadingInterestEvents] =
    React.useState(true);
  const [loadingTrendingEvents, setLoadingTrendingEvents] =
    React.useState(true);
  const [loadingAllEvents, setLoadingAllEvents] = React.useState(true);

  React.useEffect(() => {
    if (user?.user_id) {
      setLoadingInterestEvents(true);
      getInterestedEventsByUser(1, 4, user?.user_id).then((events) => {
        console.log("Events......", events);
        setInterestEvents(events);
        setLoadingInterestEvents(false);
      });
    }
  }, [user?.user_id]);

  React.useEffect(() => {
    setLoadingTrendingEvents(true);
    getUpcomingEventsByInterest().then((events) => {
      console.log("Events Trending......", events);
      setTrendingEvents(events);
      setLoadingTrendingEvents(false);
    });
  }, [user]);

  React.useEffect(() => {
    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  React.useEffect(() => {
    setLoadingAllEvents(true);
    getUpcomingEventsSortByDate(1, 8).then((events) => {
      console.log("Events......", events);
      setAllEvents(events.data);
      setLoadingAllEvents(false);
    });
  }, [user]);

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLocation(event.target.value as string);
  };

  const handleArtistChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setArtist(event.target.value as string);
  };

  return (
    <Maindiv>
      <CoverCardMedia image="https://hwgbucket.s3.ap-south-1.amazonaws.com/images/eventCover.jpeg">
        <div
          style={{
            background: "black",
            height: "500px",
            width: "100%",
            opacity: "0.8",
          }}
        ></div>

        <CaptionBox>
          <Caption01Box>Book your Ticket</Caption01Box>
          <Box
            sx={{
              height: "100%",
              position: "relative",
              display: "flex",
              // backgroundColor: "blue",
            }}
          >
            <Caption02Box>for your Favorite Event </Caption02Box>
            <Caption03Box>Now</Caption03Box>
          </Box>
        </CaptionBox>
      </CoverCardMedia>

      {user ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "95%",
              height: "100%",
              margin: "auto",
              justifyContent: "space-between",
              //alignItems: "right",
              //backgroundColor: "blue",
              //padding: "20px",
            }}
          >
            <Box
              style={{
                padding: "10px 0px 0px 0px",
                color: "primary.default",
                fontSize: "32px",
                fontWeight: "bold",
                //backgroundColor: "yellow",
              }}
            >
              My Interest
            </Box>
            <CardActions style={{ padding: "20px", paddingRight: 0 }}>
              <Button
                href="/main/events/MoreInterestEvents"
                //variant="contained"
                size="small"
              >
                Show All
              </Button>
            </CardActions>
          </Box>

          {loadingInterestEvents ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "1em auto",
                height: "40vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid
              container
              spacing={2}
              sx={{ margin: "1em auto", width: "95%" }}
            >
              {interestEvents.map(
                ({
                  event_id,
                  event_name,
                  event_img,
                  sessions,
                  event_created_by,
                }) => (
                  <Grid item xs={6} md={3}>
                    <SingleEvent
                      eventID={event_id}
                      eventName={event_name}
                      eventImg={event_img}
                      artistName={getArtistName(event_created_by)}
                      noOfSessions={sessions?.length}
                    ></SingleEvent>
                  </Grid>
                )
              )}
            </Grid>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "95%",
              height: "100%",
              margin: "auto",
              justifyContent: "space-between",
              //alignItems: "right",
              //backgroundColor: "blue",
              //padding: "20px",
            }}
          >
            <Box
              style={{
                padding: "10px 0px 0px 0px",
                color: "primary.default",
                fontSize: "32px",
                fontWeight: "bold",
                //backgroundColor: "yellow",
              }}
            >
              Trending Events
            </Box>
            <CardActions style={{ padding: "20px", paddingRight: "0" }}>
              <Button
                href="/main/events/MoreTrendingEvents"
                //variant="contained"
                size="small"
              >
                Show All
              </Button>
            </CardActions>
          </Box>

          {loadingTrendingEvents ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "1em auto",
                height: "40vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid
              container
              spacing={2}
              sx={{ margin: "1em auto", width: "95%" }}
            >
              {trendingEvents.map(
                ({
                  event_id,
                  event_name,
                  event_img,
                  sessions,
                  event_created_by,
                }) => (
                  <Grid item xs={6} md={3}>
                    <SingleEvent
                      eventID={event_id}
                      eventName={event_name}
                      eventImg={event_img}
                      artistName={getArtistName(event_created_by)}
                      noOfSessions={sessions?.length}
                    ></SingleEvent>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </>
      ) : (
        <></>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "95%",
          margin: "auto",
          height: "100%",
          justifyContent: "space-between",
          //alignItems: "right",
          //backgroundColor: "blue",
          //padding: "20px",
        }}
      >
        <Box
          style={{
            padding: "10px 0px 0px 0px",
            color: "primary.default",
            fontSize: "32px",
            fontWeight: "bold",
            //backgroundColor: "yellow",
          }}
        >
          All Events
        </Box>
        <CardActions style={{ padding: "20px", paddingRight: 0 }}>
          <Button
            href="/main/events/allEvents"
            //variant="contained"
            size="small"
          >
            Show All
          </Button>
        </CardActions>
      </Box>

      {loadingAllEvents ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "1em auto",
            height: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ margin: "1em auto", width: "95%" }}>
          {allEvents.map(
            ({
              event_id,
              event_name,
              event_img,
              sessions,
              event_created_by,
            }) => (
              <Grid item xs={6} md={3}>
                <SingleEvent
                  eventID={event_id}
                  eventName={event_name}
                  eventImg={event_img}
                  artistName={getArtistName(event_created_by)}
                  noOfSessions={sessions?.length}
                ></SingleEvent>
              </Grid>
            )
          )}
        </Grid>
      )}
    </Maindiv>
  );
}
