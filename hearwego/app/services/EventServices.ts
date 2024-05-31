import { base_url } from "../constants/keys";

export const getEvents = async (
  token: String,
  page?: number,
  limit?: number,
  filter_by?: string,
  filter_value?: string
) => {
  const res = await fetch(
    `${base_url}/EventsManager/events?page=${page}&limit=${limit}&${filter_by}=${filter_value}`,
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

export const addEvent = async (token: string, data: any) => {
  console.log("Sending event data:", data); // Add this line for logging
  const res = await fetch(`${base_url}/EventsManager/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const event = await res.json();
    return event;
  } else {
    const error = await res.json();
    console.error("Error response:", error); // Add this line to log the error response
    throw new Error(error.message);
  }
};
