"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { getAllBudgets } from "@/app/services/EventServices";
import { getAllEvents } from "@/app/services/EventServices";
import { getAllArtists } from "@/app/services/ArtistServices";
import { useAppSelector } from "@/lib/hooks";
import { Budget, Event, Artist } from "@/app/constants/models";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function EventDataGrid() {
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);

  const [events, setEvents] = useState<Event[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [eventId, setEventId] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllBudgets().then((budgets) => {
      console.log("Budgets......", budgets);
      setBudgets(budgets);
    });

    getAllEvents().then((events) => {
      console.log("Events......", events);
      setEvents(events.data);
    });

    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  function createBudgetData(
    budget_id: string,
    budget_currency: string,
    budget_title: string,
    budget_type: string,
    budget_session: string,
    budget_amount: number,
    event_id: string,
    createdAt: string,
    updatedAt: string
  ) {
    return { budget_id, budget_currency, budget_title, budget_type, budget_session, budget_amount, event_id, createdAt, updatedAt };
  }

  const budgetRows = budgets?.flatMap(budget =>
    budget.budget_details?.map(detail =>
      createBudgetData(
        budget.budget_id,
        budget.currency,  // Adjusted to match your provided data structure
        detail.budget_title,
        detail.budget_type,
        detail.session,  // Adjusted to match your provided data structure
        detail.amount,   // Adjusted to match your provided data structure
        budget.event_id,
        budget.createdAt,
        budget.updatedAt
      )
    )
  ) || [];

  const getEventName = (eventId) => {
    const event = events.find(event => event.event_id === eventId);
    return event ? event.event_name : 'Unknown';
  };

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.artistName : 'Unknown';
  };

  const getCreatedArtist = (eventId) => {
    const event = events.find(event => event.event_id === eventId);
    return event ? events.event_created_by : 'Unknown';
  }    

  console.log("Budget Rows: ", budgetRows);

  const columns = [
    { field: 'budget_id', headerName: 'Budget ID', width: 80 },
    { field: 'budget_currency', headerName: 'Currency', width: 80 },
    { field: 'budget_title', headerName: 'Title', width: 150 },
    { field: 'budget_type', headerName: 'Type', width: 80 },
    { field: 'budget_session', headerName: 'Session', width: 90 },
    { field: 'budget_amount', headerName: 'Amount', width: 80 },
    { field: 'event_id', headerName: 'Event ID', width: 80 },
    { field: 'event_name', headerName: 'Event Name', width: 130, valueGetter: (params) => getEventName(params.row.event_id), },
    { field: 'created_by', headerName: 'Artist ID', width: 70, valueGetter: (params) => getCreatedArtist(params.row.event_id), },
    { field: 'created_by_name', headerName: 'Artist Name', width: 100, valueGetter: (params) => getArtistName(params.row.created_by), },
    { field: 'createdAt', headerName: 'Created At', width: 100 },
    { field: 'updatedAt', headerName: 'Updated At', width: 100 },
    {
        field: "action",
        headerName: "Action",
        flex: 2,
        renderCell: (params) => (
          <ButtonGroup>
            <IconButton color="primary" sx={{ fontSize: "16px" }}>
              <FaEdit />
            </IconButton>
            {/* <Link href={`/app/admin/events/${params.row.event_id}`}> */}
            <IconButton
              color="secondary"
              sx={{ fontSize: "16px" }}
              onClick= {()=> {router.push(`/admin/events/${params.row.event_id}`)}}
            >
              <FaEye />
            </IconButton>
            {/* </Link> */}
            <IconButton color="error" sx={{ fontSize: "16px" }}>
              <MdDelete />
            </IconButton>
          </ButtonGroup>
        ),
      },
  ];

  const handleView = (id) => {
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    // Logic to edit an event
    alert(`Edit event with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to delete an event
    setEvents((prevRows) => prevRows.filter((row) => row.event_id !== id));
    alert(`Delete event with ID: ${id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={budgetRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => uuidv4()}  // Specify the custom id field
      />
    </div>
  );
}

const AdminUserPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
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
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          >
            Events
          </Typography>
          <Button
            variant="contained"
            startIcon={<IoAddOutline />}
            sx={{
              textTransform: "capitalize",
              background: "#000",
              color: "#fff",
            }}
            onClick={() => {}}
          >
            Add New Event
          </Button>
        </Box>
        <Box sx={{ width: "100%", padding: "2em" }}>
          <EventDataGrid />
        </Box>
      </Card>
    </Grid>
  );
};

export default AdminUserPage;



