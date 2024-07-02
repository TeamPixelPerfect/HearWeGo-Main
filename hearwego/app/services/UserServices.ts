import { base_url } from "../constants/keys";

// get user service
export const getUser = async (id: string) => {
    const res = await fetch(`${base_url}/users/${id}`, {
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
  }