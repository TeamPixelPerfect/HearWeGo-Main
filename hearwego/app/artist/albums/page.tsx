"use client";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { Album } from "@/app/constants/models";
import {
  deleteAlbum,
  getAlbumForArtists,
  getAlbums,
} from "@/app/services/SongServices";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  AlbumCard,
  AlbumCardCoverArt,
  SongCardButtonGroup,
  SongCardItem,
} from "@/app/styles/songCard.styles";
import { useAppSelector } from "@/lib/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Pagination,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GiSoundWaves } from "react-icons/gi";
import { IoMdMore } from "react-icons/io";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { MdAlbum, MdDelete } from "react-icons/md";

// Component for displaying an individual album card
const MainAlbumCard = ({
  albumId,
  albumName,
  albumCoverArt,
  albumTracks,
  albumLength,
  impressions,
  listners,
  setIsDeleted,
}: any) => {
  const artist = useAppSelector((state) => state.artist.user);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState("to-delete");

  const handleDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    handleAlbumDelete();
    handleCloseDeleteModal();
  };

  const handleAlbumDelete = () => {
    setDeleting("deleting");
    deleteAlbum(artist?.token as string, albumId as string).then((res) => {
      setDeleting("deleted");
      if (setIsDeleted) setIsDeleted(true);
    });
  };

  // Function to toggle the open state
  const handleOpen = () => {
    setOpen((val) => !val);
  };

  return (
    // Album card with album details and action buttons
    <AlbumCard>
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
          <IconButton
            onClick={() => {
              router.push("/artist/albums/" + albumId);
            }}
          >
            <FaEye />
          </IconButton>
          <IconButton
            onClick={() => {
              router.push("/artist/albums/edit/" + albumId);
            }}
          >
            <FaEdit />
          </IconButton>
          <IconButton onClick={handleDeleteModal} color="error">
            <MdDelete />
          </IconButton>
        </SongCardButtonGroup>
      )}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ borderRadius: 20 }}
      >
        <DialogTitle id="alert-dialog-title" color="error">
          {"Delete Album"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleting === "deleting"
              ? "Deleting Album..."
              : deleting === "deleted"
              ? "Album Deleted Successfully!"
              : "Are you sure you want to delete this album?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="secondary">
            No
          </Button>
          <LoadingButton
            loading={deleting === "deleting"}
            onClick={handleConfirmDelete}
            color="error"
            autoFocus
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </AlbumCard>
  );
};

// Component for displaying artist albums
const ArtistAlbums = () => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);

  const [albums, setAlbums] = useState<Album[]>([]);
  const [publicAlbums, setPublicAlbums] = useState<Album[]>([]);
  const [privateAlbums, setPrivateAlbums] = useState<Album[]>([]);
  const [toReleaseAlbums, setToReleaseAlbums] = useState<Album[]>([]);

  const [isDeleted, setIsDeleted] = useState(false);

  // Function to handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [page, setPage] = useState(1);

  // Function to handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const fetchAlbums = () => {
    getAlbumForArtists(
      artist?.token as string,
      artist?.user?.artist_id as string
    ).then((albums) => {
      console.log("Albums:::", albums);
      setAlbums(albums.data);
      setPublicAlbums(getPublicAlbums(albums.data));
      setPrivateAlbums(getPrivateAlbums(albums.data));
      setToReleaseAlbums(getToReleaseAlbums(albums.data));
    });
  };

  const getPublicAlbums = (albums: Album[]) => {
    return albums.filter((album) => album?.privacy === "Public");
  };

  const getPrivateAlbums = (albums: Album[]) => {
    return albums.filter((album) => album?.privacy === "Private");
  };

  const getToReleaseAlbums = (albums: Album[]) => {
    return albums.filter((album) =>
      dayjs(album?.release_date).isAfter(dayjs())
    );
  };

  // Effect hook to fetch albums data
  useEffect(() => {
    if (artist?.token && artist?.user?.artist_id) {
      fetchAlbums();
    }
  }, [artist?.token, artist?.user?.artist_id, isDeleted]);

  return (
    // Grid container for layout
    <Grid container sx={{ width: "100%", margin: 0 }}>
      {/* Card for displaying albums */}
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
            padding: "1em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
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
            <Tab label="All" />
            <Tab label="Public" />
            <Tab label="Private" />
            <Tab label="Upcoming" />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0} fullWidth={true}>
            {/* Display albums or message if no albums available */}
            {albums.length > 0 ? (
              albums?.map((album) => {
                return (
                  <MainAlbumCard
                    albumId={album?.album_id}
                    albumName={album?.album_title}
                    albumCoverArt={album?.album_img}
                    albumTracks={album?.no_of_tracks}
                    albumLength={album?.album_length}
                    impressions={album?.no_of_impressions}
                    listners={album?.no_of_plays}
                    setIsDeleted={setIsDeleted}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No albums available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            {/* Display albums or message if no albums available */}
            {publicAlbums.length > 0 ? (
              publicAlbums?.map((album) => {
                return (
                  <MainAlbumCard
                    albumId={album?.album_id}
                    albumName={album?.album_title}
                    albumCoverArt={album?.album_img}
                    albumTracks={album?.no_of_tracks}
                    albumLength={album?.album_length}
                    impressions={album?.no_of_impressions}
                    listners={album?.no_of_plays}
                    setIsDeleted={setIsDeleted}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No albums available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2} fullWidth={true}>
            {/* Display albums or message if no albums available */}
            {privateAlbums.length > 0 ? (
              privateAlbums?.map((album) => {
                return (
                  <MainAlbumCard
                    albumId={album?.album_id}
                    albumName={album?.album_title}
                    albumCoverArt={album?.album_img}
                    albumTracks={album?.no_of_tracks}
                    albumLength={album?.album_length}
                    impressions={album?.no_of_impressions}
                    listners={album?.no_of_plays}
                    setIsDeleted={setIsDeleted}
                  />
                );
              })
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                <em>Sorry, No albums available yet!</em>
              </Typography>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={3} fullWidth={true}>
            {/* Display albums or message if no albums available */}
            {toReleaseAlbums.length > 0 ? (
              toReleaseAlbums?.map((album) => {
                return (
                  <MainAlbumCard
                    albumId={album?.album_id}
                    albumName={album?.album_title}
                    albumCoverArt={album?.album_img}
                    albumTracks={album?.no_of_tracks}
                    albumLength={album?.album_length}
                    impressions={album?.no_of_impressions}
                    listners={album?.no_of_plays}
                    setIsDeleted={setIsDeleted}
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
