"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  duration,
  useTheme,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
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
import { MerchStore } from "../models/models";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateStoreModal from "../components/merchandise/AddStorePopup";

const storeData = [
  {
    store_id: "store_001",
    store_banner: "https://example.com/store_001_banner.jpg",
    promo_banner: [
      "https://example.com/store_001_promo1.jpg",
      "https://example.com/store_001_promo2.jpg",
    ],
    store_description: "Welcome to the official merch store of Artist A!",
    artist_id: "artist_001",
    artist_name: "Artist A",
    createdAt: "2024-06-01T12:34:56.789Z",
    updatedAt: "2024-06-01T12:34:56.789Z",
    store_status: "active",
  },
  {
    store_id: "store_002",
    store_banner: "https://example.com/store_002_banner.jpg",
    promo_banner: ["https://example.com/store_002_promo1.jpg"],
    store_description: "Exclusive merchandise from Artist B.",
    artist_id: "artist_002",
    artist_name: "Artist B",
    createdAt: "2024-06-02T14:22:11.123Z",
    updatedAt: "2024-06-02T14:22:11.123Z",
    store_status: "active",
  },
  {
    store_id: "store_003",
    store_banner: "https://example.com/store_003_banner.jpg",
    promo_banner: [],
    store_description: "Discover the latest items from Artist C.",
    artist_id: "artist_003",
    artist_name: "Artist C",
    createdAt: "2024-06-03T09:10:45.456Z",
    updatedAt: "2024-06-03T09:10:45.456Z",
    store_status: "waiting",
  },
  {
    store_id: "store_004",
    store_banner: "https://example.com/store_004_banner.jpg",
    promo_banner: [
      "https://example.com/store_004_promo1.jpg",
      "https://example.com/store_004_promo2.jpg",
      "https://example.com/store_004_promo3.jpg",
    ],
    store_description: "Artist D's limited edition collection.",
    artist_id: "artist_004",
    artist_name: "Artist D",
    createdAt: "2024-06-04T11:20:30.789Z",
    updatedAt: "2024-06-04T11:20:30.789Z",
    store_status: "active",
  },
  {
    store_id: "store_005",
    store_banner: "https://example.com/store_005_banner.jpg",
    promo_banner: ["https://example.com/store_005_promo1.jpg"],
    store_description: "Latest releases from Artist E.",
    artist_id: "artist_005",
    artist_name: "Artist E",
    createdAt: "2024-06-05T13:45:20.567Z",
    updatedAt: "2024-06-05T13:45:20.567Z",
    store_status: "blocked",
  },
];

const AdminMerchPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);

  const [filterOptions, setFilterOptions] = useState({
    all: true,
    active: false,
    waiting: false,
    blocked: false,
  });

  const [openStorePopup, setOpenStorePopup] = useState(false);

  const [storeList, setStoreList] = useState<MerchStore[]>([]);

  const columns: GridColDef[] = [
    { field: "store_id", headerName: "Store ID", flex: 1 },
    { field: "artist_name", headerName: "Artist Name", flex: 2 },
    { field: "store_description", headerName: "Description", flex: 3 },
    {
      field: "store_status",
      headerName: "Status",
      flex: 2,
      renderCell: (params) => (
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "14px",
            color:
              params.value === "active"
                ? "green"
                : params.value === "blocked"
                ? "red"
                : "",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    // { field: "createdAt", headerName: "Created At", width: 150 },
    // { field: "updatedAt", headerName: "Updated At", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <ButtonGroup>
          <IconButton color="primary" sx={{ fontSize: "16px" }}>
            <FaEdit />
          </IconButton>
          <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => {
              router.push(`/admin/merchandise/stores/${params.row.store_id}`);
            }}
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

  const handleStoreSearch = (
    event: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value === "All") return setStoreList(storeData);
    const filteredStores = storeData.filter(
      (store) => store.artist_name === value
    );
    setStoreList(filteredStores);
  };

  const handleFilterChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    setFilterOptions({ ...filterOptions, [event.target.name]: checked });
  };

  const handleStorePopup = () => {
    setOpenStorePopup(!openStorePopup);
  };

  useEffect(() => {
    setStoreList(storeData);
  }, []);

  useEffect(() => {
    let filteredStores = storeData;
    if (!filterOptions.all) {
      filteredStores = storeData.filter((store) => {
        if (filterOptions.active && store.store_status === "active") {
          return true;
        }
        if (filterOptions.waiting && store.store_status === "waiting") {
          return true;
        }
        if (filterOptions.blocked && store.store_status === "blocked") {
          return true;
        }
        return false;
      });
    }
    setStoreList(filteredStores);
  }, [filterOptions]);

  return (
    <>
      <CreateStoreModal open={openStorePopup} setOpen={setOpenStorePopup} />
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
              Merchandise
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<FaEye />}
                color="secondary"
                sx={{
                  textTransform: "capitalize",
                  // background: "#000",
                  // color: "#fff",
                }}
                onClick={() => {
                  router.push(`/admin/merchandise/orders`);
                }}
              >
                View Orders
              </Button>
              <Button
                variant="contained"
                startIcon={<FaEye />}
                color="primary"
                sx={{
                  textTransform: "capitalize",
                  // background: "#000",
                  // color: "#fff",
                }}
                onClick={() => {
                  router.push(`/admin/merchandise/reviews`);
                }}
              >
                View Reviews
              </Button>
              <Button
                variant="contained"
                startIcon={<IoAddOutline />}
                sx={{
                  textTransform: "capitalize",
                  background: "#000",
                  color: "#fff",
                }}
                onClick={handleStorePopup}
              >
                Create New Store
              </Button>
              <Button
                variant="contained"
                startIcon={<IoAddOutline />}
                sx={{
                  textTransform: "capitalize",
                  background: "#000",
                  color: "#fff",
                }}
                onClick={() => {
                  router.push("/admin/merchandise/products/add");
                }}
              >
                Add New Item
              </Button>
            </Stack>
          </Box>
          <ADTabBox>
            <Grid container>
              <Grid item xs={6}>
                <Autocomplete
                  freeSolo
                  id="admin-store-search"
                  disableClearable
                  options={[
                    "All",
                    ...storeData?.map((option) => option.artist_name),
                  ]}
                  sx={{ width: 300 }}
                  onChange={handleStoreSearch}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}
              >
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    name={"all"}
                    onChange={handleFilterChange}
                    label="All"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="active"
                    onChange={handleFilterChange}
                    label="Active"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="waiting"
                    onChange={handleFilterChange}
                    label="Waiting"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="blocked"
                    onChange={handleFilterChange}
                    label="Blocked"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sx={{ mb: 4 }}>
                <DataGrid
                  getRowId={(row) => row.store_id}
                  rows={storeList}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 25 },
                    },
                  }}
                  pageSizeOptions={[25, 50]}
                  checkboxSelection
                />
              </Grid>
            </Grid>
          </ADTabBox>
        </Card>
      </Grid>
    </>
  );
};

export default AdminMerchPage;
