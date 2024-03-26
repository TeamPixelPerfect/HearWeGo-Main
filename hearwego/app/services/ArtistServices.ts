import { base_url } from "../constants/keys";

export const getAllArtists = async (page?: number, per_page?: number) => {
  const res = await fetch(
    `${base_url}/users/artists?page=${page}&limit=${per_page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const artists = await res.json();
    return artists;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

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
