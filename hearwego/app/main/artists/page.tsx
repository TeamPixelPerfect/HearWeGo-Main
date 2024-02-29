"use client";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { hearWeGoTheme } from "../../styles/theme";
import { Stack } from "@mui/material";
import { Maindiv, ArtistCard } from "./artistComponents.styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { SearchPaper } from "./artistComponents.styles";
import { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
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

const genreOptions = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "hiphop", label: "Hip Hop" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
];

const professionOptions = [
  { value: "singer", label: "Singer" },
  { value: "guitarist", label: "Guitarist" },
  { value: "drummer", label: "Drummer" },
  { value: "pianist", label: "Pianist" },
  { value: "bassist", label: "Bassist" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const countryOptions = [
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "japan", label: "Japan" },
];

const typeOptions = [
  { value: "solo", label: "Solo" },
  { value: "band", label: "Band" },
];

export default function Artist() {
  const [genre, setGenre] = React.useState("");
  const [profession, setProfession] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [type, setType] = React.useState("");

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

  return (
    <Maindiv>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ alignItems: "baseline" }}
      >
        <div
          style={{
            alignItems: "baseline",
            width: "100%",
            flex: 1,
            position: "relative",
          }}
        >
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
        </div>
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
      </Stack>
      <Typography
        variant="h4"
        sx={{ marginTop: "20px", color: "text.primary" }}
      >
        Featured Artists
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <ArtistCard
          name="Michale Jackson"
          Genre="Pop"
          img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
        />

        <ArtistCard
          name="Freddie Mercury"
          Genre="Rock"
          img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/800px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg"
        />

        <ArtistCard
          name="Eminem"
          Genre="Hip Hop"
          img_url="https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b"
        />
        <ArtistCard
          name="Eminem"
          Genre="Hip Hop"
          img_url="https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b"
        />
        <ArtistCard
          name="Freddie Mercury"
          Genre="Rock"
          img_url="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/800px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg"
        />
        
      </Stack>

      <TableContainer component={Paper}>
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
            <TrendingRow
              Rank={{
                rank: 1,
                rank_img:
                  "https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Arrow_Up.svg",
              }}
              Artist={{
                name: "Michale Jackson",
                img_url: "",
              }}
              Latest_song={{
                song_name: "Leave Me Alone",
                song_img:
                  "https://www.shopmichaeljackson.uk/images/michael_jackson_leave_me_alone_cd_single_654672_2_front.jpg",
              }}
              Latest_album={{
                album_name: "Scream",
                album_img:
                  "https://cdn.smehost.net/michaeljacksoncom-uslegacyprod/wp-content/uploads/2017/09/170906_mj_scream_cover-300x300.jpg",
              }}
              Fans={100_000_000}
              popularity={""}
              country_img={""}
            />
            <TrendingRow
              Rank={{
                rank: 1,
                rank_img:
                  "https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Arrow_Up.svg",
              }}
              Artist={{
                name: "Michale Jackson",
                img_url: "",
              }}
              Latest_song={{
                song_name: "Leave Me Alone",
                song_img:
                  "https://www.shopmichaeljackson.uk/images/michael_jackson_leave_me_alone_cd_single_654672_2_front.jpg",
              }}
              Latest_album={{
                album_name: "Scream",
                album_img:
                  "https://cdn.smehost.net/michaeljacksoncom-uslegacyprod/wp-content/uploads/2017/09/170906_mj_scream_cover-300x300.jpg",
              }}
              Fans={100_000_000}
              popularity={""}
              country_img={""}
            />
            <TrendingRow
              Rank={{
                rank: 1,
                rank_img:
                  "https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Arrow_Up.svg",
              }}
              Artist={{
                name: "Michale Jackson",
                img_url: "",
              }}
              Latest_song={{
                song_name: "Leave Me Alone",
                song_img:
                  "https://www.shopmichaeljackson.uk/images/michael_jackson_leave_me_alone_cd_single_654672_2_front.jpg",
              }}
              Latest_album={{
                album_name: "Scream",
                album_img:
                  "https://cdn.smehost.net/michaeljacksoncom-uslegacyprod/wp-content/uploads/2017/09/170906_mj_scream_cover-300x300.jpg",
              }}
              Fans={100_000_000}
              popularity={""}
              country_img={""}
            />
            <TrendingRow
              Rank={{
                rank: 1,
                rank_img:
                  "https://upload.wikimedia.org/wikipedia/commons/5/50/Green_Arrow_Up.svg",
              }}
              Artist={{
                name: "Michale Jackson",
                img_url: "",
              }}
              Latest_song={{
                song_name: "Leave Me Alone",
                song_img:
                  "https://www.shopmichaeljackson.uk/images/michael_jackson_leave_me_alone_cd_single_654672_2_front.jpg",
              }}
              Latest_album={{
                album_name: "Scream",
                album_img:
                  "https://cdn.smehost.net/michaeljacksoncom-uslegacyprod/wp-content/uploads/2017/09/170906_mj_scream_cover-300x300.jpg",
              }}
              Fans={100_000_000}
              popularity={""}
              country_img={""}
            />
           
          </TableBody>
        </Table>
      </TableContainer>
    </Maindiv>
  );
}
