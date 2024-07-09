import { base_url } from "../constants/keys";
import { getArtistV2 } from "./ArtistServices";

export const getAllArtistData = async () => {
  const res = await fetch(`${base_url}/Analyze/get-all-artist-data`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const artists = await res.json();
    return artists;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getSummaryReportForArtist = async (artistId: string) => {
  const res = await fetch(
    `${base_url}/Analyze/get-summary-report/${artistId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const report = await res.json();
    return report;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getTrendingArtistList = async () => {
  let trendingArtists = [];
  const res = await getAllArtistData();

  if (res?.data) {
    const artistPromises = res.data.map(async (artist: any) => {
      const details = await getArtistV2(artist.artist_id);
      const summary = await getSummaryReportForArtist(artist.artist_id);
      return {
        ...artist,
        ...details.user,
        ...summary?.data,
      };
    });

    trendingArtists = await Promise.all(artistPromises);
    trendingArtists.sort((a, b) => a.artist_rank - b.artist_rank);
  }

  return trendingArtists;
};

export const addSongPlay = async (songId: string) => {
  const res = await fetch(`${base_url}/Analyze/add-song-play`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ song_id: songId }),
  });
  if (res.ok) {
    return;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addSongImpression = async (songId: string) => {
  const res = await fetch(`${base_url}/Analyze/add-song-impression`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ song_id: songId }),
  });
  if (res.ok) {
    return;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addAlbumPlay = async (albumId: string) => {
  const res = await fetch(`${base_url}/Analyze/add-album-play`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ album_id: albumId }),
  });
  if (res.ok) {
    return;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addAlbumImpression = async (albumId: string) => {
  const res = await fetch(`${base_url}/Analyze/add-album-impression`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ album_id: albumId }),
  });
  if (res.ok) {
    return;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
