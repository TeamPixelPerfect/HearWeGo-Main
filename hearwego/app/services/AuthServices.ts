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
    return error?.message;
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
    return error?.message;
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

export const handleUserPasswordChange = async (
  email: string,
  password: string,
  newPassword: string
) => {
  const res = await fetch(`${base_url}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, newPassword }),
  });
  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleUserMobileChange = async (email: string, mobile: string) => {
  const res = await fetch(`${base_url}/auth/change-mobile-number`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, mobileNumber: mobile }),
  });
  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const handleAdminSignIn = async (data: any) => {
  const res = await fetch(`${base_url}/auth/admin/login`, {
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
    return error?.message;
  }
};
