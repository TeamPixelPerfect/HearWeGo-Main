import { base_url } from "../constants/keys";

export const handleRegister = async (data: any) => {
  const res = await fetch(`${base_url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleLogin = async (data: any) => {
  const res = await fetch(`${base_url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleArtistRegister = async (data: any) => {
  const res = await fetch(`${base_url}/auth/artist/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleArtistLogin = async (data: any) => {
  const res = await fetch(`${base_url}/auth/artist/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
