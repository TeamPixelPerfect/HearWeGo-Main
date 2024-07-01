import { Stack, Typography } from '@mui/material'
import React from 'react'
import { ArtistCard } from './artistComponents.styles'
import { Artist } from '@/app/constants/models'

interface Props {
    searchTerm: string,
    searchedArtists: Artist[]
}

const ArtistSearch = ({searchTerm, searchedArtists}: Props) => {
  return (
    <div>
        <Typography
        variant="h6"
        sx={{ marginTop: "20px", color: "text.primary" }}
      >
        Search results for "{searchTerm}"
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
        {searchedArtists.length > 0 && searchedArtists.map((artists) => (
          <ArtistCard
            name={artists?.artistName}
            Genre={artists?.musicGenres.join(", ")}
            img_url={
              artists?.artistCovers.length > 0
                ? artists?.artistCovers[0]
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Michael_Jackson_Dangerous_World_Tour_1993.jpg/640px-Michael_Jackson_Dangerous_World_Tour_1993.jpg"
            }
            id={artists?.artist_id}
          />
        ))}
      </Stack>
    </div>
  )
}

export default ArtistSearch
