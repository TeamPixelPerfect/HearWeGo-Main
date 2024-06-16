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

// get all users service
export const getAllUsers = async () => {
    const res = await fetch(`${base_url}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const users = await res.json();
      return users;
    } else {
      const error = await res.json();
      throw new Error(error.message);
    }
  }