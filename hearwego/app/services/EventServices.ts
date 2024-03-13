import { base_url } from "../constants/keys";

export const getEvents = async (
  token: String,
  page?: number,
  limit?: number
) => {
  const res = await fetch(
    `${base_url}/EventsManager/events?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (res.ok) {
    const events = await res.json();
    return events;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
