

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { IconButton, Modal, Stack, Typography } from "@mui/material";
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
import { Event } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Props {
  params: { id: string };
}

const SingleEventDetails = [
  {
    eventName: "Beats",
    artistName: "Kaizer Kaize",
  },
];

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

const recommendEvents = [
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },
  {
    event_id: "e1",
    name: "Beats",
    img: "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/Pink+And+Blue+Club+DJ+Party+Night+Flyer.png ",
    date: "Jan 12",
    day: "Wed",
    time: "8:00 PM",
    artist: "Kaizer Kaize",
  },

]
export default function SingleEvent({ params: { id } }: Props) {
  const user = useAppSelector((state) => state.user.user);
  const [event, setEvent] = React.useState<Event | null>(null);
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [openShareModal, setOpenShareModal] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");

  React.useEffect(() => {
    getEvent(id).then((event) => {
      setEvent(event);
    });
  }, [id]);

  React.useEffect(() => {
    getAllArtists().then((artists) => {
      console.log("Artists......",artists);
      setArtists(artists.data);
    });
  }
  , []);

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.artistName : 'Unknown';
  };

  const handleOpenShareModal = () => {
    setCurrentUrl(window.location.href);
    setOpenShareModal(true);
  };
  const handleCloseShareModal = () => setOpenShareModal(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("URL copied to clipboard!");
    }, (err) => {
      alert("Failed to copy URL: ", err);
    });
  };

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
          <ArtistNameBox>{getArtistName(event?.event_created_by)}</ArtistNameBox>
        </EventBox>

        {/* This is the OptionBox component for event options */}
        <OptionBox>
          <Stack direction="row" width="100%" spacing={"1px"}>
            <Button onClick={handleOpenShareModal}>
              <ShareIcon style={{ color: "white", fontSize: "35px" }} />
            </Button>
            <Button>
              <FavoriteBorderIcon
                style={{ color: "white", fontSize: "35px" }}
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

      <Box
        sx={{
          width: "100%",
          height: "400px",
          display: "flex",
          position: "relative",
          flexDirection: "row",
          //backgroundColor: "yellow",
          alignItems: "center",
          padding: "10px",
          //margin: "10px",
        }}
      >
        <MiddleEventImageBox></MiddleEventImageBox>
      
      {/* This is the LeftBox component for event details */}
        <LeftBox>
          <Box
            sx={{
              width: "100%",
              height: "95%",
              //backgroundColor: "yellow",
              display: "flex",
              position: "relative",
              flexDirection: "column",
              // justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0px 0px 40px",
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
              <IoLocationSharp style={{ color: "white", fontSize: "35px" }} />
              <LocationDescriptionBox>XYZ Hall</LocationDescriptionBox>
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
              <SlCalender style={{ color: "white", fontSize: "35px" }} />

              <DateDescriptionBox>2024-01-19</DateDescriptionBox>
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
              <FaClock style={{ color: "white", fontSize: "30px" }} />

              <TimeDescriptionBox>8.00 - 11.00.P.M</TimeDescriptionBox>
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
              <BsPersonStanding style={{ color: "white", fontSize: "35px" }} />

              <YearDescriptionBox>18 years above</YearDescriptionBox>
            </Box>

            <Box
              sx={{
                width: "90%",
                height: "20%",
                margin: "0px",
                //backgroundColor: "black",
                //alignItems: "center",
                display: "flex",
                position: "relative",
                justifyContent: "left",
                //padding: "20px 0px 0px 50px",
              }}
            >
              <SpatialTrackingIcon
                style={{ color: "white", fontSize: "35px" }}
              />

              <NoOfArtistDescriptionBox> - </NoOfArtistDescriptionBox>
            </Box>
          </Box>
        </LeftBox>

        <RightBox>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              //backgroundColor: "white",
              position: "relative",
              display: "flex",
              borderRadius: "14px",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

           {/* This is the Box component for event description */}
            <Box
              sx={{
                width: "100%",
                height: "20%",
                // backgroundColor:'black',
                display: "flex",
                position: "relative",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
                padding: "10px 0px 0px 25px",
              }}
            >
              Description :
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "80%",
                // backgroundColor: "black",
                display: "flex",
                position: "relative",
                fontSize: "12px",
                padding: "10px 0px 0px 25px",
                //fontWeight: "bold",
                //color: "white",
                //padding: "15px 0px 0px 25px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Dui porttitor eu id
              venenatis blandit lorem egestas. At adipiscing orci pulvinar
              sodales arcu. Ultricies et enim molestie felis amet facilisi
              nullam nunc consectetur. Sapien viverra magna a nunc aliquam odio
              :
            </Box>
          </Box>
        </RightBox>
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
        {recommendEvents.map(
          ({ name, img, date, day, time, artist, event_id }) => (
            <Grid item xs={4} md={2} style={{ paddingLeft: 30 }}>
              <SingleEventComponent
                eventID={event_id}
                eventName={name}
                eventImg={img}
                eventDate={date}
                eventDay={day}
                eventTime={time}
                artistName={artist}
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
    <Box sx={{width: "100%", display: "flex", alignItems: "center"}}>
    <Typography sx={{ mt: 2 }}>
      {currentUrl}
    </Typography>
    <IconButton onClick={handleCopyUrl} color="primary" sx={{ mt: 2, ml: 2 }} aria-label="copy">
      <ContentCopyIcon />
    </IconButton>
    </Box>
    
  </Box>
</Modal>
    </Maindiv>
  );
}
