"use client";
import React, { use, useEffect, useRef, useState } from "react";
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
import {
  getAllArtists,
  getArtist,
  getArtistV2,
} from "@/app/services/ArtistServices";
import { useAppSelector } from "@/lib/hooks";
import { getSongsForArtist } from "@/app/services/SongServices";
import ArtistSearch from "./ArtistSearch";
import {
  getAllArtistData,
  getTrendingArtistList,
} from "@/app/services/AnalyticServices";

export const genreOptions = [
  { value: "", label: "All" },
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "reggae", label: "Reggae" },
  { value: "hip-hop", label: "Hip-Hop" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "electronic", label: "Electronic" },
  { value: "r&b", label: "R&B" },
  { value: "metal", label: "Metal" },
];

export const professionOptions = [
  { value: "", label: "All" },
  { value: "performer", label: "Performer" },
  { value: "producer", label: "Producer" },
  { value: "songwriter", label: "Songwriter" },
  { value: "instrumentalist", label: "Instrumentalist" },
];

export const genderOptions = [
  { value: "", label: "All" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const countryOptions = [
  { value: "", label: "All" },
  { value: "USA", label: "USA" },
  { value: "UK", label: "UK" },
  { value: "LK", label: "Sri Lanka" },
];

export const typeOptions = [
  { value: "", label: "All" },
  { value: "solo", label: "Solo" },
  { value: "duo", label: "Duo" },
  { value: "band", label: "Band" },
];

interface props {
  params: { id: string };
}
export default function ArtistsPage({ params: { id } }: props) {
  const [searchText, setSearchText] = useState("");

  //State variables for the filters
  const [genre, setGenre] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [type, setType] = React.useState("");

  //Redux state variables
  const artist = useAppSelector((state) => state.artist.user);

  //State variables for the artist data
  const [allArtistData, setAllArtistData] = useState<Artist[]>([]);
  const [searchedArtists, setSearchedArtists] = useState<any[]>([]);

  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);
  const [trendingArtists, setTrendingArtists] = useState<any>([]);
  const [recentArtists, setRecentArtists] = useState<Artist[]>([]);

  const [page, setPage] = useState(1);
  const [per_page, setLimit] = useState(5);

  const isMounted = useRef(true);

  //State variables for the artist songs
  const [allArtistSongs, setAllArtistSongs] = useState<Song[]>([]);

  //Handle the change of the genre filter
  const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenre(event.target.value as string);
  };

  //Handle the change of the profession filter
  const handleProfessionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProfession(event.target.value as string);
  };

  //Handle the change of the Gender filter
  const handleGenderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGender(event.target.value as string);
  };

  //Handle the change of the Country filter
  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCountry(event.target.value as string);
  };

  //Handle the change of the Type filter
  const handleTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  //State variable for the value of the scroll
  const [value, setValue] = React.useState(0);
  const handleScrollChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  //Get all the artists
  useEffect(() => {
    getAllArtists({ page: 1, per_page: 10, isApproved: true }).then((res) => {
      setFeaturedArtists(res.data);
    });

    getAllArtists({ page: 1, per_page: 10, sort: "newest", isApproved: true }).then((res) => {
      setRecentArtists(res.data);
    });
  }, []);

  useEffect(() => {
    getTrendingArtistList().then((res) => {
      setTrendingArtists(res);
    });
  }, []);

  // //Get all the songs for the artist
  // useEffect(() => {
  //   getSongsForArtist(artist?.token as string, id).then((Songs) => {
  //     console.log(Songs);
  //     setAllArtistSongs(Songs.data);
  //   });
  // }, []);

  useEffect(() => {
    if (searchText !== "") {
      getAllArtists({
        search: searchText,
        genres: genre,
        profession: profession,
        gender: gender,
        artistType: type,
        country: country,
        isApproved: true,
      }).then((res) => {
        setSearchedArtists(res.data);
      });
    }
  }, [searchText, genre, profession, gender, country, type]);

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
            // alignItems: "baseline",
            width: "100%",
            // flex: 1,
            // position: "relative",
            marginTop: "20px",
          }}
        >
          {/* This is the SearchPaper that contains the search bar */}
          <SearchPaper>
            <InputBase
              sx={{ ml: 1, flex: 1, p: "10px" }}
              placeholder="Search for an Artist"
              inputProps={{ "aria-label": "search artists" }}
              onChange={handleSearch}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
              <SearchIcon />
            </IconButton>
          </SearchPaper>
        </Box>
        {/* This is the Stack that contains the CustomSelect components */}
        {searchText !== "" && (
          <Stack direction="row" spacing={1}>
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
        )}
      </Box>
      {searchText !== "" ? (
        <ArtistSearch
          searchTerm={searchText}
          searchedArtists={searchedArtists}
        />
      ) : (
        <>
          {/* This is the Typography that contains the text "Featured Artists" */}
          <Typography
            variant="h6"
            sx={{ marginTop: "20px", color: "text.primary" }}
          >
            Featured Artists
          </Typography>
          {/* This is the Stack that contains the ArtistCard components */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              flexWrap: "nowrap",
              maxWidth: "100%",
              overflow: "scroll",
            }}
          >
            {/* Map all the artists to the ArtistCard component */}
            {featuredArtists.map((artists: any) => (
              <ArtistCard
                name={artists?.artistName as string}
                Genre={artists?.musicGenres.join(", ")}
                img_url={
                  artists?.artistCovers.length > 0
                    ? (artists?.artistCovers[0] as string)
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
                }
                id={artists.artist_id}
              />
            ))}
          </Stack>
          {/* This is the Typography that contains the text "Trending Artists" */}
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
            {/* This is the Table that contains the TrendingRow components */}
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
                {/* Map all the artists to the TrendingRow component */}
                {trendingArtists.length > 0 &&
                  trendingArtists.map((artists: any) => (
                    <TrendingRow
                      Rank={{
                        rank: artists?.artist_rank,
                        previous_rank: artists?.previous_rank,
                      }}
                      Artist={{
                        name: artists?.artistName,
                        img_url:
                          artists?.artistCovers.length > 0
                            ? artists?.artistCovers[0]
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg",
                      }}
                      Latest_song={{
                        song_name: artists?.latestSong?.song_title,
                        song_img: artists?.latestSong?.song_img,
                      }}
                      Latest_album={{
                        album_name: artists?.latestAlbum?.song_title,
                        album_img: artists?.latestAlbum?.song_img,
                      }}
                      Fans={0}
                      popularity={artists?.popularity_score}
                      country_code={artists?.country}
                      LinkPage={"/main/artists/" + artists?.artist_id}
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
            {/* Link to the TrendingArtistsSeeMore page */}
            {/* <Link href="/main/artists/TrendingArtistsSeeMore/">
              <Typography
                variant="body1"
                sx={{ color: "primary.main", padding: "20px", display: "flex" }}
              >
                <ArrowDropDownIcon />
                Show all Artists
              </Typography>
            </Link> */}
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
            sx={{
              marginTop: "20px",
              width: "100%",
              overflow: "scroll",
            }}
          >
            {/* Map all the artists to the ArtistCard component on the reverse order */}
            {recentArtists.map((artists: any) => (
              <ArtistCard
                name={artists?.artistName}
                Genre={artists?.musicGenres.join(", ")}
                img_url={
                  artists?.artistCovers.length > 0
                    ? artists.artistCovers[0]
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
                }
                id={artists?.artist_id}
              />
            ))}
          </Stack>
        </>
      )}
    </Maindiv>
  );
}
