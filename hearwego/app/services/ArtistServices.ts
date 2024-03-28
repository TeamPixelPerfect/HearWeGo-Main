import { base_url } from "../constants/keys";

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
