"use client";
import React, { use, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Maindiv, ArtistCard } from "./artistComponents.styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { SearchPaper } from "./artistComponents.styles";
import Link from "@mui/material/Link";
import { CustomSelect, TrendingRow } from "./artistComponents.styles";
import { Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Album, Artist, Song } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import { useAppSelector } from "@/lib/hooks";
import { getSongsForArtist } from "@/app/services/SongServices";

export const genreOptions = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hiphop", label: "Hip Hop" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
];

export const professionOptions = [
  { value: "singer", label: "Singer" },
  { value: "guitarist", label: "Guitarist" },
  { value: "drummer", label: "Drummer" },
  { value: "pianist", label: "Pianist" },
  { value: "bassist", label: "Bassist" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const countryOptions = [
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "japan", label: "Japan" },
];

export const typeOptions = [
  { value: "solo", label: "Solo" },
  { value: "band", label: "Band" },
];

interface props {
  params: { id: string };
}
export default function Artist({ params: { id } }: props) {
  const [genre, setGenre] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [type, setType] = React.useState("");

  const artist = useAppSelector((state) => state.artist.user);

  const [allArtistData, setAllArtistData] = useState<Artist[]>([]);
  const [page, setPage] = useState(1);
  const [per_page, setLimit] = useState(5);

  const [allArtistSongs, setAllArtistSongs] = useState<Song[]>([]);

  useEffect(() => {
    getAllArtists(page, per_page).then((res) => {
      console.log(res);
      setAllArtistData(res.data);
    });
  }, [page]);

  useEffect(() => {
    getSongsForArtist(artist?.token, id).then((Songs) => {
      console.log(Songs);
      setAllArtistSongs(Songs.data);
    });
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenre(event.target.value as string);
  };

  const handleProfessionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProfession(event.target.value as string);
  };

  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCountry(event.target.value as string);
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const [value, setValue] = React.useState(0);
  const handleScrollChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };
  return (
    //This is the Maindiv that contains all the components
    <Maindiv>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            alignItems: "baseline",
            width: "100%",
            flex: 1,
            position: "relative",
            marginTop: "30px",
          }}
        >
          {/* This is the SearchPaper that contains the search bar */}
          <SearchPaper>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for an Artist"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </SearchPaper>
        </Box>
        {/* This is the Stack that contains the CustomSelect components */}
        <Stack direction="row" spacing={5}>
          <CustomSelect
            labelId="genre-select-label"
            id="genre-select"
            value={genre}
            onChange={handleGenreChange}
            label="By Genre"
            options={genreOptions}
            placeholder="By Genre"
          />
          <CustomSelect
            labelId="profession-select-label"
            id="profession-select"
            value={profession}
            onChange={handleProfessionChange}
            label="By Profession"
            options={professionOptions}
            placeholder="By Profession"
          />
          <CustomSelect
            labelId="gender-select-label"
            id="gender-select"
            value={gender}
            onChange={handleGenderChange}
            label="By Gender"
            options={genderOptions}
            placeholder="By Gender"
          />
          <CustomSelect
            labelId="country-select-label"
            id="country-select"
            value={country}
            onChange={handleCountryChange}
            label="By Country"
            options={countryOptions}
            placeholder="By Country"
          />
          <CustomSelect
            labelId="type-select-label"
            id="type-select"
            value={type}
            onChange={handleTypeChange}
            label="By Type"
            options={typeOptions}
            placeholder="By Type"
          />
        </Stack>
      </Box>
      <Typography
        variant="h6"
        sx={{ marginTop: "20px", color: "text.primary" }}
      >
        Featured Artists
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {/* Map all the artists to the ArtistCard component */}
        {allArtistData.map((artists) => (
          <ArtistCard
            name={artists.artistName}
            Genre={artists.musicGenres.join(", ")}
            img_url={
              artists.artistCovers.length > 0
                ? artists.artistCovers[0]
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
            }
            id={artists.artist_id}
          />
        ))}
      </Stack>
      <Typography
        variant="h6"
        sx={{ marginTop: "20px", color: "text.primary" }}
      >
        Trending Artists
      </Typography>
      <TableContainer
        component={Paper}
        style={{ borderRadius: "30px", marginTop: "20px" }}
      >
        <Table
          sx={{
            width: "100%",
            backgroundColor: "primary.light",
          }}
        >
          <TableHead style={{ color: "primary.main" }}>
            <TableRow>
              <TableCell align="center">Rank</TableCell>
              <TableCell align="center">Artist Name</TableCell>
              <TableCell align="center">Latest Song</TableCell>
              <TableCell align="center">Latest Album</TableCell>
              <TableCell align="center">Fans</TableCell>
              <TableCell align="center">Popularity</TableCell>
              <TableCell align="center">Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allArtistData.map((artists) => (
              <TrendingRow
                Rank={{
                  rank: 1,
                  rank_img:
                    "https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Arrow_Up.svg",
                }}
                Artist={{
                  name: artists.artistName,
                  img_url:
                    artists.artistCovers.length > 0
                      ? artists.artistCovers[0]
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg",
                }}
                Latest_song={{
                  song_name: artist?.token ? allArtistSongs[0].song_title : "",
                  song_img:
                    "https://www.shopmichaeljackson.uk/images/michael_jackson_leave_me_alone_cd_single_654672_2_front.jpg",
                }}
                Latest_album={{
                  album_name: "Scream",
                  album_img:
                    "https://cdn.smehost.net/michaeljacksoncom-uslegacyprod/wp-content/uploads/2017/09/170906_mj_scream_cover-300x300.jpg",
                }}
                Fans={100000000}
                popularity={""}
                country_img={""}
                LinkPage={""}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          width: "100%",
          justifyContent: "right",
          position: "relative",
          display: "flex",
        }}
      >
        <Link href="/main/artists/TrendingArtistsSeeMore/">
          <Typography
            variant="body1"
            sx={{ color: "primary.main", padding: "20px", display: "flex" }}
          >
            <ArrowDropDownIcon />
            Show all Artists
          </Typography>
        </Link>
      </Box>
      <Typography
        variant="h6"
        sx={{ marginTop: "20px", color: "text.primary" }}
      >
        Recently Joined Artists
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {/* Map all the artists to the ArtistCard component on the reverse order */}
        {allArtistData
          .slice()
          .reverse()
          .map((artists) => (
            <ArtistCard
              name={artists.artistName}
              Genre={artists.musicGenres.join(", ")}
              img_url={
                artists.artistCovers.length > 0
                  ? artists.artistCovers[0]
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
              }
              id={artists.artist_id}
            />
          ))}
      </Stack>
    </Maindiv>
  );
}
