import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleAlbum from "@/app/components/SingleAlbum";

import { Maindiv, SearchPaper } from "../../../../styles/SingleArtistPage.styles";

const albumNames = [
  {
    name: "Thriller",
    year: "1982",
    img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
  },
  {
    name: "Off the Wall",
    year: "1979",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Off_the_wall.jpg/220px-Off_the_wall.jpg",
  },
  {
    name: "Bad",
    year: "1987",
    img: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
  },
  {
    name: "Ben",
    year: "1972",
    img: "https://upload.wikimedia.org/wikipedia/en/1/17/BenMichaelJackson.jpg",
  },
  {
    name: "Invincible",
    year: "2001",
    img: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
  },
  {
    name: "Manila",
    year: "1996",
    img: "https://i.scdn.co/image/ab67616d0000b273655f0aa6bcd03fb68905c38e",
  },
    {
      name: "Thriller",
      year: "1982",
      img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
    },
    {
      name: "Off the Wall",
      year: "1979",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Off_the_wall.jpg/220px-Off_the_wall.jpg",
    },
    {
      name: "Bad",
      year: "1987",
      img: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
    },
    {
      name: "Ben",
      year: "1972",
      img: "https://upload.wikimedia.org/wikipedia/en/1/17/BenMichaelJackson.jpg",
    },
    {
      name: "Invincible",
      year: "2001",
      img: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
    },
    {
      name: "Manila",
      year: "1996",
      img: "https://i.scdn.co/image/ab67616d0000b273655f0aa6bcd03fb68905c38e",
    },
    {
      name: "Ben",
      year: "1972",
      img: "https://upload.wikimedia.org/wikipedia/en/1/17/BenMichaelJackson.jpg",
    },
    {
      name: "Invincible",
      year: "2001",
      img: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
    },
    {
      name: "Manila",
      year: "1996",
      img: "https://i.scdn.co/image/ab67616d0000b273655f0aa6bcd03fb68905c38e",
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
      <Box
        style={{
          padding: "10px 0px 0px 20px",
          color: "primary.default",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Albums
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
