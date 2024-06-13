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

export const getAllEvents = async (): Promise<Event[]> => {
  const res = await fetch(`${base_url}/EventsManager/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const events = await res.json();
    return events;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};


export const addEvent = async (token: string, data: any) => {
  console.log("Sending event data:", data); 
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
    console.error("Error response:", error);
    throw new Error(error.message);
  }
};


export const addTicket = async (token: string, data: any) => {
  console.log("Sending ticket data:", data); 
  const res = await fetch(`${base_url}/EventsManager/ticket`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const ticket = await res.json();
    return ticket;
  } else {
    const error = await res.json();
    console.error("Error response:", error); 
    throw new Error(error.message);
  }
};

export const addBudget = async (token: string, data: any) => {
  console.log("Sending budget data:", data); 
  const res = await fetch(`${base_url}/EventsManager/budget`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const budget = await res.json();
    return budget;
  } else {
    const error = await res.json();
    console.error("Error response:", error); 
    throw new Error(error.message);
  }
};