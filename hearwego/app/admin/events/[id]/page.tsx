"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correct hook for dynamic parameters
import { useTheme, Grid, Card, Box, Typography, Pagination } from "@mui/material";
import { getEvent } from "@/app/services/EventServices";
import { Event } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getEvents } from "@/app/services/EventServices";
import { getEventById } from "@/app/services/EventServices";

const AdminSingleEventPage = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState("event_id");
  const { id } = useParams(); // Use useParams to get the dynamic id
  const eventId = Array.isArray(id) ? id[0] : id;


  const [singleEvent, setSingleEvent] = useState<Event[]>([]);

  useEffect(() => {
    getEventById(id as string).then((events)=>{
        console.log("Event.....", events)
        setSingleEvent(events.data)
    })
    },[]);


  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2em 2em 0 2em" }}>
          <Typography variant="h4" sx={{ fontSize: "24px", fontWeight: "700", color: theme.palette.mode === "dark" ? "#fff" : "#000" }}>
            {singleEvent.map((event) =>
                <Box>{event.event_name}</Box>
            )}
          </Typography>
        </Box>
        <Box sx={{ padding: "2em" }}>
          {/* Event details go here */}
          {/* {singleEvent?.event_name} */}
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2em 0" }}>
          <Pagination count={10} page={page} onChange={handlePageChange} color="secondary" />
        </Box>
      </Card>
    </Grid>
  );
};

export default AdminSingleEventPage;
