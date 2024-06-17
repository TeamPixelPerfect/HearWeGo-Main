"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
  duration,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { IoIosPause, IoIosPlay, IoMdMore } from "react-icons/io";
import { MdAlbum, MdDelete } from "react-icons/md";
import { GiSoundWaves } from "react-icons/gi";
import {
  SongCard,
  SongCardButtonGroup,
  SongCardCoverArt,
  SongCardItem,
  SongCardPlayButton,
} from "@/app/styles/songCard.styles";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { bool } from "aws-sdk/clients/signer";
import { Song } from "@/app/constants/models";
import { useRouter } from "next/navigation";
import { getSongs, getSongsForArtist } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import { getAllFanClubs } from "@/app/services/FanClubServices";
import { FanClub } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import { Artist } from "@/app/constants/models";
import { getFanClubs } from "@/app/services/FanClubServices";
// import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem, DataGrid, GridToolbar } from "@mui/x-data-grid";

function FanClubsDataGrid() {
  const router = useRouter();
  const [fanClubs, setFanClubs] = useState<FanClub[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    getFanClubs("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjFiMTNiYTg1MDg2ZjY1MDc4NzMwMCIsInJvbGUiOiJhcnRpc3QiLCJpYXQiOjE3MTg1MTAxNjAsImV4cCI6MTcxODc2OTM2MH0.bKV_fcbrHdDRtLS9kmyC4ubDLH4nKYTLPLQbndLRL5w").then((fanClubs) => {
      console.log("Fan Clubs......",fanClubs);
      setFanClubs(fanClubs.data);
    });

    getAllArtists().then((artists) => {
      console.log("Artists......",artists);
      setArtists(artists.data);
    });
  }
  , []);

  function createFanClubData(
    clubId: string,
    artistId: string,
    coverImage_URL: string,
    visibility: boolean,
    createdAt: string,
    updatedAt: string
  ){return {clubId, artistId, coverImage_URL, visibility, createdAt, updatedAt};}

  const fcRows = fanClubs.map((fc) => {
    return createFanClubData(fc.clubId, fc.artistId, fc.coverImage_URL, fc.visibility, fc.createdAt, fc.updatedAt);
  });

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.artistName : 'Unknown';
  };

  const columns = [
    { field: "clubId", headerName: "Club ID", flex: 1 },
    { field: "coverImage_URL", headerName: "Cover Image", flex: 1, renderCell: (params) => (<img src={params.row.coverImage_URL} style={{ width: 50, height: 50 }} />)},
    { field: "artistId", headerName: "Artist ID", flex: 2 },
    { field: "artist_name", headerName: "Artist Name", flex: 1, valueGetter: (params) => getArtistName(params.row.artistId), },
    {
      field: "visibility",
      headerName: "Visibility",
      flex: 1,
      renderCell: (params) => {
        const status = params.row.visibility;
        let chipColor;
        switch (status) {
          case true:
            chipColor = "success";
            break;
          case false:
            chipColor = "error";
            break;
          default:
            chipColor = "default";
        }
        return <Chip label={status.toString().charAt(0).toUpperCase() + status.toString().slice(1)} color={chipColor} />;
      }
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
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
          <IconButton color="error" sx={{ fontSize: "16px" }}>
            <MdDelete />
          </IconButton>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={fcRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row.clubId}
        // checkboxSelection
        // disableSelectionOnClick
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
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em",
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
            Artist Fan Clubs
          </Typography>
          <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              // background: "#000",
              border: "1px solid #000",
              color: "#000",
            }}
            onClick={() => {router.push(`/admin/fanClubs/clubMembers`)}}
          >
            Club Members
            </Button>
            <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              // background: "#000",
              border: "1px solid #000",
              color: "#000",
            }}
            onClick={() => {router.push(`/admin/fanClubs/clubPosts`)}}
          >
            Posts
            </Button>
            <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              // background: "#000",
              border: "1px solid #000",
              color: "#000",
            }}
            onClick={() => {}}
          >
            Reacts
            </Button>

            <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              // background: "#000",
              border: "1px solid #000",
              color: "#000",
            }}
            onClick={() => {router.push(`/admin/fanClubs/clubComments`)}}
          >
            Comments
            </Button>
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
            Create fan club
          </Button>

          </Stack>
          
        </Box>
        <ADTabBox>
            <FanClubsDataGrid />
        </ADTabBox>
      </Card>
    </Grid>
  );
};

export default AdminUserPage;
