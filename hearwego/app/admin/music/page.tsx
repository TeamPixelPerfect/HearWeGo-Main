"use client";

import { useState } from "react";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { IoIosPlay } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { SongCard, SongCardButtonGroup, SongCardCoverArt, SongCardItem } from "@/app/styles/songCard.styles";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { useAppSelector } from "@/lib/hooks";

const sampleSongs = [
  { title: "Song 1", album: "Album 1", artist: "Artist 1", listens: 100, created: "9 days ago", image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sphere-glass-the-mixtape-cd-cover-design-template-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts=1602178819" },
  { title: "Song 2", album: "Album 2", artist: "Artist 2", listens: 87, created: "9 days ago", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrvl5GJfleFJD52tcjHndJKm4ipw5U7fZQA&s" },
  { title: "Song 3", album: "Album 3", artist: "Artist 3", listens: 0, created: "9 days ago", image: "https://cdn.venngage.com/template/thumbnail/small/bf008bfe-9bf6-4511-b795-e86f070bfff5.webp" },
  { title: "Song 4", album: "Album 4", artist: "Artist 4", listens: 58, created: "58 seconds ago", image: "https://cdn.venngage.com/template/thumbnail/small/79879260-0211-46bb-abcd-968fb4e2c0ea.webp" },
  { title: "Song 5", album: "Album 5", artist: "Artist 5", listens: 0, created: "9 days ago", image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fe529a64193929.5aca8500ba9ab.jpg" },
  { title: "Song 6", album: "Album 6", artist: "Artist 6", listens: 0, created: "9 days ago", image: "https://cdn.venngage.com/template/thumbnail/small/0171dbfd-9cba-446d-8920-990754182d11.webp" },
  { title: "Song 7", album: "Album 7", artist: "Artist 7", listens: 0, created: "9 days ago", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mwKit62iT_Mp99YkgAyiql0CtsyJec0IEglCMlHhrvTPbdgvLO_b4wTFnffXBJ1MwII&usqp=CAU" },
  { title: "Song 8", album: "Album 8", artist: "Artist 8", listens: 0, created: "15 days ago", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTteWYBcmv-0sf_7OUmlt7yfanngJ8AQ3A0245_3K6oRSm8vX0ZDzSJlRiQqwkcl52uPdg&usqp=CAU" },
];

const sampleAlbums = [
  { title: "Album 1", artist: "Artist 1", numberOfSongs: 10, created: "1 month ago", image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sphere-glass-the-mixtape-cd-cover-design-template-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts=1602178819" },
  { title: "Album 2", artist: "Artist 2", numberOfSongs: 8, created: "2 months ago", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfrvl5GJfleFJD52tcjHndJKm4ipw5U7fZQA&s" },
  { title: "Album 3", artist: "Artist 3", numberOfSongs: 15, created: "3 months ago", image: "https://cdn.venngage.com/template/thumbnail/small/bf008bfe-9bf6-4511-b795-e86f070bfff5.webp" },
  { title: "Album 4", artist: "Artist 4", numberOfSongs: 12, created: "4 months ago", image: "https://cdn.venngage.com/template/thumbnail/small/79879260-0211-46bb-abcd-968fb4e2c0ea.webp" },
  { title: "Album 5", artist: "Artist 5", numberOfSongs: 11, created: "5 months ago", image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fe529a64193929.5aca8500ba9ab.jpg" },
  { title: "Album 6", artist: "Artist 6", numberOfSongs: 9, created: "6 months ago", image: "https://cdn.venngage.com/template/thumbnail/small/0171dbfd-9cba-446d-8920-990754182d11.webp" },
  { title: "Album 7", artist: "Artist 7", numberOfSongs: 13, created: "7 months ago", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2mwKit62iT_Mp99YkgAyiql0CtsyJec0IEglCMlHhrvTPbdgvLO_b4wTFnffXBJ1MwII&usqp=CAU" },
];

const AdminMusicPage = () => {
  const theme = useTheme();
  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("A-Z");

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOrder(event.target.value as string);
  };

  const filteredSongs = sampleSongs.sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "Z-A") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "newest") {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    } else {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    }
  });

  const filteredAlbums = sampleAlbums.sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "Z-A") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "newest") {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    } else {
      return new Date(a.created).getTime() - new Date(b.created).getTime();
    }
  });

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2em 2em 0 2em" }}>
          <Typography variant="h4" sx={{ fontSize: "24px", fontWeight: "700", color: theme.palette.mode === "dark" ? "#fff" : "#000" }}>
            Music
          </Typography>
          <Select value={sortOrder} onChange={handleSortChange} sx={{ width:'200px', marginLeft: "1em" }}>
            <MenuItem value="A-Z">A-Z</MenuItem>
            <MenuItem value="Z-A">Z-A</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </Box>
        <ADTabBox>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Songs" />
            <Tab label="Albums" />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0} fullWidth={true}>
            <Grid container spacing={2} sx={{ padding: "2em" }}>
              {filteredSongs.map((song, index) => (
                <Grid item xs={12} key={index}>
                  <SongCard>
                    <SongCardCoverArt>
                      <img src={song.image} alt={song.title} width="85" height="60" />
                    </SongCardCoverArt>
                    <SongCardItem sx={{ display: 'flex', justifyContent: 'space-evenly', width: "100%" }}>
                      <Typography variant="body1">{song.title}</Typography>
                      <Typography variant="body2">{song.album}</Typography>
                      <Typography variant="body2">{song.artist}</Typography>
                      <Typography variant="body2">{song.listens} listens</Typography>
                      <Typography variant="body2">{song.created}</Typography>
                    </SongCardItem>
                    <SongCardButtonGroup>
                      <IconButton><IoIosPlay /></IconButton>
                      <IconButton><MdDelete /></IconButton>
                      <IconButton><FaEdit /></IconButton>
                    </SongCardButtonGroup>
                  </SongCard>
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            <Grid container spacing={2} sx={{ padding: "2em" }}>
              {filteredAlbums.map((album, index) => (
                <Grid item xs={12} key={index}>
                  <SongCard>
                    <SongCardCoverArt>
                      <img src={album.image} alt={album.title} width="85" height="60" />
                    </SongCardCoverArt>
                    <SongCardItem sx={{ display: 'flex', justifyContent: 'space-evenly', width: "100%" }}>
                      <Typography variant="body1">{album.title}</Typography>
                      <Typography variant="body2">{album.artist}</Typography>
                      <Typography variant="body2">{album.numberOfSongs} songs</Typography>
                      <Typography variant="body2">{album.created}</Typography>
                    </SongCardItem>
                    <SongCardButtonGroup>
                      <IconButton><IoIosPlay /></IconButton>
                      <IconButton><MdDelete /></IconButton>
                      <IconButton><FaEdit /></IconButton>
                    </SongCardButtonGroup>
                  </SongCard>
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
        </ADTabBox>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "2em 0" }}>
          <Pagination count={10} page={page} onChange={handlePageChange} color="secondary" />
        </Box>
      </Card>
    </Grid>
  );
};

export default AdminMusicPage;
