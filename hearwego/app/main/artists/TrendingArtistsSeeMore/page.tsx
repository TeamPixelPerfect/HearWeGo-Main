"use client";
import * as React from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Stack } from "@mui/material";
import {
  SearchPaper,
  CustomSelect,
  TrendingRow,
} from "../artistComponents.styles";
import SearchIcon from "@mui/icons-material/Search";
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
