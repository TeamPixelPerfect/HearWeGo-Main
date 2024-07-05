"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  Alert,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CardActions from "@mui/material/CardActions";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { FaClock } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";
import SpatialTrackingIcon from "@mui/icons-material/SpatialTracking";
import SingleEventComponent from "@/app/components/SingleEvent";
import Grid from "@mui/material/Grid";
import { getEvent } from "@/app/services/EventServices";
import { Artist } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Event } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { getUserInterestForEvent } from "@/app/services/EventServices";
import { getUpcomingEventsForGivenArtistByFan } from "@/app/services/EventServices";
import { createInterest, deleteInterest } from "@/app/services/EventServices";

interface Props {
  params: { id: string };
}

import {
  Maindiv,
  CoverEventCardMedia,
  EventBox,
  EventNameBox,
  ArtistNameBox,
  OptionBox,
  MiddleEventImageBox,
  LeftBox,
  LocationDescriptionBox,
  DateDescriptionBox,
  TimeDescriptionBox,
  YearDescriptionBox,
  NoOfArtistDescriptionBox,
  RightBox,
} from "../../../styles/eventsMW.styles";

export default function SingleEvent({ params: { id } }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const [event, setEvent] = React.useState<Event | null>(null);
  const [artistEvents, setArtistEvents] = React.useState<Event[]>([]);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [openShareModal, setOpenShareModal] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarStatus, setSnackbarStatus] = React.useState<
    "success" | "error" | "info" | "warning" | undefined
  >("success");
  const [currentSessionIndex, setCurrentSessionIndex] = React.useState(0);
  const [isInterested, setIsInterested] = React.useState(false);
  const [interestId, setInterestId] = React.useState<string | null>(null);

  React.useEffect(() => {
    getEvent(id).then((event) => {
      setEvent(event);
    });
  }, [id]);

  React.useEffect(() => {
    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  React.useEffect(() => {
    if (event) {
      getUpcomingEventsForGivenArtistByFan(1, 4, event.event_created_by).then(
        (events) => {
          setArtistEvents(events.data);
        }
      );
    }
  }, [event, user]);

  React.useEffect(() => {
    if (event && user) {
      getUserInterestForEvent(user.token, user.user_id, id).then((interest) => {
        if (interest) {
          setIsInterested(true);
          setInterestId(interest.interest_id);
        }
      });
    }
  }, [event, user]);

  const handleInterestClick = async () => {
    if (isInterested) {
      // Remove interest
      try {
        await deleteInterest(user.token, interestId as string);
        setIsInterested(false);
        setInterestId(null);
        setSnackbarMessage("Interest removed successfully!");
        setSnackbarStatus("success");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage("Failed to remove interest!");
        setSnackbarStatus("error");
        setSnackbarOpen(true);
      }
    } else {
      // Add interest
      try {
        const interestData = {
          event_id: event?.event_id,
          user_id: user.user_id,
        };
        const interest = await createInterest(user.token, interestData);
        setIsInterested(true);
        setInterestId(interest.interest_id);
        setSnackbarMessage("Interest added successfully!");
        setSnackbarStatus("success");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage("Failed to add interest!");
        setSnackbarStatus("error");
        setSnackbarOpen(true);
      }
    }
  };
  

  const getArtistName = (artistId) => {
    const artist = artists.find((artist) => artist.artist_id === artistId);
    return artist ? artist.artistName : "Unknown";
  };

  const handleOpenShareModal = () => {
    setCurrentUrl(window.location.href);
    setOpenShareModal(true);
  };
  const handleCloseShareModal = () => setOpenShareModal(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl).then(
      () => {
        // alert("URL copied to clipboard!");
        setSnackbarMessage("URL copied to clipboard!");
        setSnackbarStatus("success");
        setSnackbarOpen(true);
      },
      (err) => {
        // alert("Failed to copy URL: ", err);
        setSnackbarMessage("Failed to copy URL!");
        setSnackbarStatus("error");
        setSnackbarOpen(true);
      }
    );
  };

  const handleSnackbarClose = (event) => {
    setSnackbarOpen(false);
  };

  const handlePrevSession = () => {
    setCurrentSessionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : event.sessions.length - 1
    );
  };

  const handleNextSession = () => {
    setCurrentSessionIndex((prevIndex) =>
      prevIndex < event.sessions.length - 1 ? prevIndex + 1 : 0
    );
  };

  function formatSessionName(session) {
    const match = session.match(/session(\d+)/i);
    if (!match) return session;

    let number = parseInt(match[1], 10);
    let formattedNumber = number < 10 ? `0${number}` : `${number}`;

    return `Session ${formattedNumber}`;
  }

  return (
    <Maindiv>
      {/* This is the CoverEventCardMedia component for backcover img */}
      <CoverEventCardMedia image={event?.event_img}>
        <div
          style={{
            background: "black",
            height: "400px",
            width: "100%",
            opacity: "0.7",
          }}
        ></div>

        {/* This is the EventBox component for event details */}
        <EventBox>
          <EventNameBox>{event?.event_name}</EventNameBox>
          <ArtistNameBox>
            {getArtistName(event?.event_created_by)}
          </ArtistNameBox>
        </EventBox>

        {/* This is the OptionBox component for event options */}
        <OptionBox>
          <Stack direction="row" width="100%" spacing={"1px"}>
            <Button onClick={handleOpenShareModal}>
              <ShareIcon style={{ color: "white", fontSize: "35px" }} />
            </Button>
            <Button onClick={handleInterestClick}>
              <FavoriteBorderIcon
                style={{ color: isInterested ? "red" : "white", fontSize: "35px" }}
              />
            </Button>
            <CardActions style={{ justifyContent: "right" }}>
              <Button
                sx={{
                  borderRadius: "40px",
                  width: "100%",
                }}
                href="/main/events/TicketDetails"
                variant="contained"
                //size="small"
              >
                Find Tickets
              </Button>
            </CardActions>
          </Stack>
        </OptionBox>
      </CoverEventCardMedia>

      <Box sx={{ width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handlePrevSession}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {event && event.sessions.length > 0 && (
            <>
              <Box
                sx={{
                  width: "100%",
                  height: "400px",
                  display: "flex",
                  position: "relative",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "20%",
                    height: "90%",
                    //backgroundColor: "red",
                    padding: "10px",
                    //margin: "10px",
                    display: "flex",
                    position: "relative",
                    left: "40%",
                    borderRadius: "10px",
                    backgroundImage: `url(${event.event_img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Box>

                <LeftBox>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "20px 0px 0px 40px",
                      bgcolor: "primary.main",
                    }}
                  >
                    <Box
                      sx={{
                        width: "90%",
                        height: "20%",
                        margin: "0px",
                        display: "flex",
                        position: "relative",
                        justifyContent: "left",
                      }}
                    >
                      <IoLocationSharp style={{ fontSize: "35px" }} />
                      <LocationDescriptionBox>
                        {event.sessions[currentSessionIndex].venue}
                      </LocationDescriptionBox>
                    </Box>
                    <Box
                      sx={{
                        width: "90%",
                        height: "20%",
                        margin: "0px",
                        display: "flex",
                        position: "relative",
                        justifyContent: "left",
                      }}
                    >
                      <SlCalender style={{ fontSize: "35px" }} />
                      <DateDescriptionBox>
                        {
                          event.sessions[
                            currentSessionIndex
                          ].session_date.split("T")[0]
                        }
                      </DateDescriptionBox>
                    </Box>
                    <Box
                      sx={{
                        width: "90%",
                        height: "20%",
                        margin: "0px",
                        display: "flex",
                        position: "relative",
                        justifyContent: "left",
                      }}
                    >
                      <FaClock style={{ fontSize: "30px" }} />
                      <TimeDescriptionBox>
                        {event.sessions[currentSessionIndex].session_time}
                      </TimeDescriptionBox>
                    </Box>
                    <Box
                      sx={{
                        width: "90%",
                        height: "20%",
                        margin: "0px",
                        display: "flex",
                        position: "relative",
                        justifyContent: "left",
                      }}
                    >
                      <HourglassTopIcon style={{ fontSize: "35px" }} />
                      <YearDescriptionBox>
                        {event.sessions[currentSessionIndex].duration} Hours
                      </YearDescriptionBox>
                    </Box>
                  </Box>
                </LeftBox>
                <RightBox>
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: "14px",
                        padding: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ marginBottom: 1 }}
                      >
                        Artists
                      </Typography>
                      <Divider />
                      <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{ marginTop: 1 }}
                      >
                        {event.sessions[currentSessionIndex].artists
                          .map((artistName) => artistName)
                          .join(", ")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: "14px",
                        padding: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ marginBottom: 1 }}
                      >
                        Description
                      </Typography>
                      <Divider />
                      <Typography
                        variant="subtitle1"
                        component="h2"
                        sx={{ marginTop: 1 }}
                      >
                        {event.sessions[currentSessionIndex]
                          .session_special_notice == "" ||
                        event.sessions[currentSessionIndex]
                          .session_special_notice == "-"
                          ? "No description available"
                          : event.sessions[currentSessionIndex]
                              .session_special_notice}
                      </Typography>
                    </Box>
                  </Box>
                </RightBox>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" component="h2">
                  {formatSessionName(
                    event.sessions[currentSessionIndex].session_name
                  )}
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            width: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handleNextSession}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          //alignItems: "right",
          //backgroundColor: "blue",
          //padding: "20px",
        }}
      >
        <Box
          style={{
            padding: "10px 0px 0px 60px",
            color: "primary.default",
            fontSize: "32px",
            fontWeight: "bold",
            //backgroundColor: "yellow",
          }}
        >
          Recommend by Artist
        </Box>
        <CardActions style={{ padding: "20px" }}>
          <Button
            href="/main/events/MoreInterestEvents"
            //variant="contained"
            size="small"
          >
            Show All
          </Button>
        </CardActions>
      </Box>

      {/* This is the grid for recommend events */}
      <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
        {artistEvents.map(
          ({ event_id, event_name, event_img, sessions, event_created_by }) => (
            <Grid item xs={4} md={3} style={{ paddingLeft: 30 }}>
              <SingleEventComponent
                eventID={event_id}
                eventName={event_name}
                eventImg={event_img}
                artistName={getArtistName(event_created_by)}
                noOfSessions={sessions?.length}
              ></SingleEventComponent>
            </Grid>
          )
        )}
      </Grid>

      <Modal open={openShareModal} onClose={handleCloseShareModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" component="h2">
            Share this Event
          </Typography>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <Typography sx={{ mt: 2 }}>{currentUrl}</Typography>
            <IconButton
              onClick={handleCopyUrl}
              color="primary"
              sx={{ mt: 2, ml: 2 }}
              aria-label="copy"
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarStatus}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Maindiv>
  );
}
