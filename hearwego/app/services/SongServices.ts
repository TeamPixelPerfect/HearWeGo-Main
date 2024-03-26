import { base_url } from "../constants/keys";

export const getSongs = async (
  token: string,
  page?: number,
  limit?: number,
  sort?: string,
) => {
  const res = await fetch(
    `${base_url}/DiscographyManager/songs?page=${page}&limit=${limit}&`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const songs = await res.json();
    return songs;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};


export const getSongsForArtist = async (
  token: string,
  artistId: string,
  page?: number,
  limit?: number
) => {
  const res = await fetch(
    `${base_url}/DiscographyManager/songs/artist/${artistId}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const songs = await res.json();
    return songs;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getSong = async (token: string, songId: string) => {
  const res = await fetch(`${base_url}/DiscographyManager/songs/${songId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const song = await res.json();
    return song;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addSong = async (token: string, data: any) => {
  const res = await fetch(`${base_url}/DiscographyManager/songs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const song = await res.json();
    return song;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateSong = async (token: string, songId: string, data: any) => {
  const res = await fetch(`${base_url}/DiscographyManager/songs/${songId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const song = await res.json();
    return song;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deletSong = async (token: string, songId: string) => {
  const res = await fetch(`${base_url}/DiscographyManager/songs/${songId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const song = await res.json();
    return song;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getAlbums = async (token: string) => {
  const res = await fetch(`${base_url}/DiscographyManager/albums`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const songs = await res.json();
    return songs;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getAlbumForArtists = async (
  token: string,
  artistId: string,
  page?: number,
  limit?: number
) => {
  const res = await fetch(
    `${base_url}/DiscographyManager/albums/artist/${artistId}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const albums = await res.json();
    return albums;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getAlbum = async (token: string, albumId: string) => {
  const res = await fetch(`${base_url}/DiscographyManager/albums/${albumId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const album = await res.json();
    return album;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addAlbum = async (token: string, data: any) => {
  const res = await fetch(`${base_url}/DiscographyManager/albums`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const album = await res.json();
    return album;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateAlbum = async (
  token: string,
  albumId: string,
  data: any
) => {
  const res = await fetch(`${base_url}/DiscographyManager/albums/${albumId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const album = await res.json();
    return album;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deletAlbum = async (token: string, albumId: string) => {
  const res = await fetch(`${base_url}/DiscographyManager/albums/${albumId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const album = await res.json();
    return album;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
