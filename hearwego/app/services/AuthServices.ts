import { base_url } from "../constants/keys";

// user signup service
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

// user login service
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

// artist signup service
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

// artist login service
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

export const handlePasswordReset = async (password: string, token: string) => {
  const res = await fetch(`${base_url}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleArtistPasswordReset = async (
  password: string,
  token: string
) => {
  const res = await fetch(`${base_url}/auth/artist/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleForgotPassword = async (email: string) => {
  const res = await fetch(`${base_url}/auth/send-password-reset-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleArtistForgotPassword = async (email: string) => {
  const res = await fetch(`${base_url}/auth/artist/send-password-reset-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
