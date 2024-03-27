"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleAlbum from "@/app/components/SingleAlbum";

import { Maindiv, SearchPaper } from "../../../../styles/SingleArtistPage.styles";
import { urPK } from "@mui/x-date-pickers";
import { getArtist, getArtistV2 } from "@/app/services/ArtistServices";
import { Album, Artist } from "@/app/constants/models";
import { getAlbumForArtists } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";

// const albumNames = [
//   {
//     name: "Thriller",
//     year: "1982",
//     img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
//   },
//   {
//     name: "Off the Wall",
//     year: "1979",
//     img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Off_the_wall.jpg/220px-Off_the_wall.jpg",
//   },
//   {
//     name: "Bad",
//     year: "1987",
//     img: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
//   },
//   {
//     name: "Ben",
//     year: "1972",
//     img: "https://upload.wikimedia.org/wikipedia/en/1/17/BenMichaelJackson.jpg",
//   },
//   {
//     name: "Invincible",
//     year: "2001",
//     img: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
//   },
//   {
//     name: "Manila",
//     year: "1996",
//     img: "https://i.scdn.co/image/ab67616d0000b273655f0aa6bcd03fb68905c38e",
//   },
//     {
//       name: "Thriller",
//       year: "1982",
//       img: "https://static.tvtropes.org/pmwiki/pub/images/thriller_e1448027599226_7.jpg",
//     },
//     {
//       name: "Off the Wall",
//       year: "1979",
//       img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Off_the_wall.jpg/220px-Off_the_wall.jpg",
//     },
//     {
//       name: "Bad",
//       year: "1987",
//       img: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
//     },
//     {
//       name: "Ben",
//       year: "1972",
//       img: "https://upload.wikimedia.org/wikipedia/en/1/17/BenMichaelJackson.jpg",
//     },
//     {
//       name: "Invincible",
//       year: "2001",
//       img: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
//     },
//     {
//       name: "Manila",
//       year: "1996",
//       img: "https://i.scdn.co/image/ab67616d0000b273655f0aa6bcd03fb68905c38e",
//     },
//     {
//       name: "Ben",
//       year: "1972",
//       img: "https://upload.wikimedia.org/wikipedia/en/1/17/BenMichaelJackson.jpg",
//     },
//     {
//       name: "Invincible",
//       year: "2001",
//       img: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
//     },
//     {
//       name: "Manila",
//       year: "1996",
//       img: "https://i.scdn.co/image/ab67616d0000b273655f0aa6bcd03fb68905c38e",
//     },
//   ];


  interface Props {
    params: { id: string };
  }
export default function MoreAlbums({ params: { id } }: Props) {
  const [artistData, setArtistData] = React.useState<Artist>();
  const [albumByArtist, setAlbumByArtist] = React.useState<Album[]>([]);
  const artist = useAppSelector((state) => state.artist.user);

  React.useEffect(() => {
    console.log(id);
    getArtistV2(id).then((res) => {
      console.log("Res:::", res);
      if (res) {
        setArtistData(res);
      }
    });
  }, []);

  React.useEffect(() => {
    getAlbumForArtists(artist?.token, id).then((res) => {
      console.log("Albums:::", res);
      setAlbumByArtist(res.data);
    });
  }, []);
  return (
    
    <Maindiv>
       {artistData ? (
        <>
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
      <Grid container spacing={5} sx={{ margin: "1em auto", width: "95%" }}>
            {albumByArtist.map((albums, index) => (
              <Grid item xs={2} md={2} style={{ paddingLeft: 3}}>
                <SingleAlbum
                  album_id={albums.album_id}
                  albumName={albums.album_title}
                  year={albums.release_date?.trimStart().slice(0, 4)}
                  albumImg={albums.album_img}
                ></SingleAlbum>
              </Grid>
            ))}
          </Grid>
          </>
      ) : (
        <div>Loading...</div>
      )}
    </Maindiv>
  );
}
