//Albums More Page

"use client";
import React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import SingleAlbum from "@/app/components/SingleAlbum";
import {
  Maindiv,
  SearchPaper,
} from "../../../../styles/SingleArtistPage.styles";
import { getArtist, getArtistV2 } from "@/app/services/ArtistServices";
import { Album, Artist } from "@/app/constants/models";
import { getAlbumForArtists } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";

interface Props {
  params: { id: string };
}
export default function MoreAlbums({ params: { id } }: Props) {
  const [artistData, setArtistData] = React.useState<Artist>(); // This is the state for artist data
  const [albumByArtist, setAlbumByArtist] = React.useState<Album[]>([]); // This is the state for album by artist
  const artist = useAppSelector((state) => state.artist.user);

  // This is the useEffect for get artist
  React.useEffect(() => {
    console.log(id);
    getArtistV2(id).then((res) => {
      console.log("Res:::", res);
      if (res) {
        setArtistData(res);
      }
    });
  }, []);

  // This is the useEffect for get album by artist
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
          {/* This is the search bar */}
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

          {/* This is the grid for albums */}
          <Grid container spacing={5} sx={{ margin: "1em auto", width: "95%" }}>
            {albumByArtist.map((albums, index) => (
              <Grid item xs={2} md={2} style={{ paddingLeft: 3 }}>
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
