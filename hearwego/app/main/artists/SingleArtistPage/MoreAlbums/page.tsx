import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleAlbum from "@/app/components/SingleAlbum";

import { Maindiv, SearchPaper } from "@/app/styles/SingleArtistPage.styles";

const albumNames = [
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
];

export default function MoreAlbums() {
  return (
    <Maindiv>
      <Box
        style={{
          display: "flex",
          padding: "15px",
        }}
      >
        <SearchPaper>
          <InputBase
            sx={{ ml: 5, flex: 1 }}
            placeholder="Michael J"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
            <SearchIcon />
          </IconButton>
            
        </SearchPaper>
      </Box>
      <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
        {albumNames.map(({ name, year, img }) => (
          <Grid item xs={4} md={2} style={{ paddingLeft: 0 }}>
            <SingleAlbum
              albumName={name}
              year={year}
              albumImg={img}
            ></SingleAlbum>
          </Grid>
        ))}
      </Grid>
    </Maindiv>
  );
}
