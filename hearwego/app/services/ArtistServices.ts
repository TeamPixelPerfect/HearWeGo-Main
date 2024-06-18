import { base_url } from "../constants/keys";


// Get all artists
export const getAllArtists = async () => {
  const res = await fetch(`${base_url}/users/artists`, {
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

// get artist by id
export const getArtist = async (id: string) => {
  const res = await fetch(`${base_url}/users/artists/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const artist = await res.json();
    return artist;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

// get artist by artist_id
export const getArtistV2 = async (id: string) => {
  const res = await fetch(`${base_url}/users/artists/v2/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const artist = await res.json();
    return artist;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

// update artist details
export const updateArtist = async (token: string, id: string, data: any) => {
  const res = await fetch(`${base_url}/users/artists/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const artist = await res.json();
    return artist;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const createArtist = async (artist: any) => {
  const res = await fetch(`${base_url}/users/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(artist),
  });
  if (res.ok) {
    const artist = await res.json();
    return artist;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteArtist = async (token: string, id: string) => {
  const res = await fetch(`${base_url}/users/artists/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return "Artist deleted successfully";
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}; 

