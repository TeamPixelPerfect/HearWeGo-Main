"use client";
import * as React from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import { Stack } from "@mui/material";
import { SearchPaper, CustomSelect } from "../artistComponents.styles";
import SearchIcon from "@mui/icons-material/Search";
import { ArtistCard } from "../artistComponents.styles";
import {
  genreOptions,
  professionOptions,
  genderOptions,
  countryOptions,
  typeOptions,
} from "../page";
import { Maindiv } from "../artistComponents.styles";
import { Typography } from "@mui/material";

export default function TrendingArtistsMore() {
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
        Trending Artists
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "auto",
        }}
        style={{ boxSizing: "initial" }}
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
      </Box>
    </Maindiv>
  );
}
