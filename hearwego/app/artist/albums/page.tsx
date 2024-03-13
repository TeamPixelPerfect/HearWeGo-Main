"use client";

import useAudio from "@/app/Hooks/useAudio";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { Album } from "@/app/constants/models";
import { getAlbumForArtists, getAlbums } from "@/app/services/SongServices";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import { EventMainBox } from "@/app/styles/artistDashboardEventsPage.styles";
import {
  AlbumCard,
  AlbumCardCoverArt,
  SongCardButtonGroup,
  SongCardItem,
} from "@/app/styles/songCard.styles";
import { useAppSelector } from "@/lib/hooks";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Pagination,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GiSoundWaves } from "react-icons/gi";
import { IoMdMore } from "react-icons/io";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { MdAlbum, MdDelete } from "react-icons/md";

const MainAlbumCard = ({
  albumId,
  albumName,
  albumCoverArt,
  albumTracks,
  albumLength,
  impressions,
  listners,
}: any) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((val) => !val);
  };

  return (
    <AlbumCard
      onClick={() => {
        router.push("/artist/albums/"+albumId);
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
        <AlbumCardCoverArt imgUrl={albumCoverArt ? albumCoverArt : ""} />
        <Typography variant="h6">{albumName}</Typography>
      </Box>
      <SongCardItem width="12%">
        <MdAlbum />
        <Typography variant="body1">{albumTracks}</Typography>
      </SongCardItem>
      <SongCardItem width="12%">
        <FaEye />
        <Typography variant="body1">{impressions}</Typography>
      </SongCardItem>
      <SongCardItem width="12%">
        <FaHeadphonesSimple />
        <Typography variant="body1">{listners}</Typography>
      </SongCardItem>
      <SongCardItem width="12%">
        <GiSoundWaves />
        <Typography variant="body2">{albumLength}</Typography>
      </SongCardItem>
      {/* 
      <Box sx={{ width: "10%", display: "flex", justifyContent: "flex-end" }}>
        <SongCardPlayButton onClick={toggle}>
          {playing ? <IoIosPause /> : <IoIosPlay />}
        </SongCardPlayButton>
      </Box> */}
      <IconButton onClick={handleOpen}>
        {open ? <IoClose /> : <IoMdMore />}
      </IconButton>
      {open && (
        <SongCardButtonGroup
          variant="outlined"
          aria-label="song action group"
          style={{ marginRight: "1em" }}
          // orientation="vertical"
        >
          <Button startIcon={<FaEdit />}>Edit</Button>
          <Button startIcon={<MdDelete />} color="error">
            Delete
          </Button>
        </SongCardButtonGroup>
      )}
    </AlbumCard>
  );
};

const ArtistAlbums = () => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);

  const [albums, setAlbums] = useState<Album[]>([
    {
      albumName: "L.P.",
      albumCoverArt:
        "https://i.discogs.com/UvK4JbCFNk0ewmfYkSUjscACrZgJyMdSLRwJrI6al2o/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0Njk4/MTMwLTE1Nzk5MTA2/ODgtMjg5OC5qcGVn.jpeg",
      albumLength: 67.15,
      albumTracks: 15,
      impressions: "12.7M",
      listners: "7.0M",
    },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [page, setPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (artist?.token && artist?.user?.artist_id) {
      getAlbumForArtists(artist?.token, artist?.user?.artist_id).then((albums) => {
        console.log("Albums:::", albums);
        setAlbums(albums.data);
      });
    }
  }, []);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: theme.palette.secondary.main,
            }}
          >
            Albums
          </Typography>
          <Button
            variant="contained"
            startIcon={<IoAddOutline />}
            sx={{ textTransform: "capitalize" }}
            onClick={() => {
              router.push("/artist/albums/addAlbumsTracks");
            }}
          >
            Add New Album
          </Button>
        </Box>
        <ADTabBox>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Popular" />
            <Tab label="Recent" />
            <Tab label="Upcoming" />
            <Tab label="Drafts" />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0} fullWidth={true}>
            {albums.length > 0 ? (
              albums.map((album) => {
                return (
                  <MainAlbumCard
                    albumId={album.album_id}
                    albumName={album.album_title}
                    albumCoverArt={album.album_img}
                    albumTracks={album.no_of_tracks}
                    albumLength={album.album_length}
                    impressions={album.no_of_impressions}
                    listners={album.no_of_plays}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No albums available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
        </ADTabBox>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2em 0",
          }}
        >
          <Pagination
            count={10}
            page={page}
            onChange={handlePageChange}
            color="secondary"
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default ArtistAlbums;
