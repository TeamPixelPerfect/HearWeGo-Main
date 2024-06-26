import { base_url } from "../constants/keys";
import { Budget } from "../constants/models";

export const getEvents = async (
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

export const getEventById = async (id: string) => {
  try {
    const res = await fetch(`${base_url}/EventsManager/events?event_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const getEvent = async (id: string) => {
  try {
    const res = await fetch(`${base_url}/EventsManager/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    throw error; // Rethrow the error to handle it in the calling function
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

export const updateBudget = async (token: string, id: string, data: any) => {
  console.log("Sending updated budget data:", data);
  const res = await fetch(`${base_url}/EventsManager/budget/${id}`, {
    method: "PATCH",
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
}

export const addAutoTicket = async (token: string, data: any) => {
  console.log("Sending auto ticket data:", data); 
  const res = await fetch(`${base_url}/EventsManager/autoTickets`, {
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

export const addManualTicket = async (token: string, data: any) => {
  console.log("Sending manual ticket data:", data); 
  const res = await fetch(`${base_url}/EventsManager/manualTickets`, {
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

export const addTicketType = async (token: string, data: any) => {
  console.log("Sending ticket type data:", data); 
  const res = await fetch(`${base_url}/EventsManager/ticketTypes`, {
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

export const addSoldTicket = async (token: string, data: any) => {
  console.log("Sending ticket sold data:", data); 
  const res = await fetch(`${base_url}/EventsManager/soldTickets`, {
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


export const addRemainTicket = async (token: string, data: any) => {
  console.log("Sending ticket remain data:", data); 
  const res = await fetch(`${base_url}/EventsManager/remainTickets`, {
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

export const updateEvent = async (token: string, id: string, data: any) => {
  console.log("Sending updated event data:", data);
  const res = await fetch(`${base_url}/EventsManager/events/${id}`, {
    method: "PATCH",
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
}

export const deleteEvent = async (token: string, id: string) => {
  const res = await fetch(`${base_url}/EventsManager/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
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

export const getAllBudgets = async (): Promise<Budget[]> => {
  const res = await fetch(`${base_url}/EventsManager/budget`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const budgets = await res.json();
    return budgets;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getBudgetByEventId = async (id: string) => {
  try {
    const res = await fetch(`${base_url}/EventsManager/budget/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch budget:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}