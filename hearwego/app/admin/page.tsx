"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
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
import {
  getAlbums,
  getSongs,
  getSongsForArtist,
} from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import { getAbsoluteValue } from "html2canvas/dist/types/css/types/length-percentage";
import { getAllArtists } from "../services/ArtistServices";
import { getAllUsers } from "../services/UserServices";
import { getAllEvents, getEvents } from "../services/EventServices";
import { getAllOrders, getOrdersForStore } from "../services/StoreServices";
import {
  getPressReleaseById,
  getPressReleases,
} from "../services/PressReleaseServices";
import {
  getAllPRCampaigns,
  getPRCampaignsByArtist,
} from "../services/PrServices";

const AdminPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const admin = useAppSelector((state) => state.admin.user);

  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);

  const [artists, setArtists] = useState<number>();
  const [users, setUsers] = useState<number>();
  const [sharedSongs, setSharedSongs] = useState<number>();
  const [createdAlbums, setCreatedAlbums] = useState<number>();
  const [hostedEvents, setHostedEvents] = useState<number>();
  const [merchandiseSold, setMerchandiseSold] = useState<number>();
  const [campaignsCreated, setCampaignsCreated] = useState<number>();
  const [pressReleases, setPressReleases] = useState<number>();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (admin?.token) {
      getAllArtists().then((res) => {
        setArtists(res.length);
      });

      getAllUsers().then((res) => {
        setUsers(res.length);
      });

      getSongs("test").then((res) => {
        setSharedSongs(res.length);
      });

      getAlbums("test").then((res) => {
        setCreatedAlbums(res.length);
      });

      getAllEvents().then((res) => {
        setHostedEvents(res.length);
      });

      getPressReleases(admin?.token).then((res) => {
        setPressReleases(res.length);
      });

      getAllOrders(admin?.token).then((res) => {
        setMerchandiseSold(res.length);
      });

      getAllPRCampaigns(admin?.token).then((res) => {
        setCampaignsCreated(res.length);
      });
    }
  }, [admin?.token]);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ padding: "1em", fontWeight: 700 }}
        >
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Artists
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {artists}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Users
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {users}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Shared Songs
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {sharedSongs}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Created Albums
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {createdAlbums}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Hosted Events
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {hostedEvents}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Merchandise Sold
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {merchandiseSold}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Campaigns Created
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {campaignsCreated}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                padding: "20px",
                textAlign: "center",
                background: theme.palette.secondary.dark,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: 300 }}
              >
                Press Releases
              </Typography>
              <Typography
                variant="h4"
                sx={{ padding: "8px", fontSize: "48px", fontWeight: 600 }}
              >
                {pressReleases}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AdminPage;
