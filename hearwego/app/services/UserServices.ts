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
  };

export const getUserById = async (id: string) => {
  const res = await fetch(`${base_url}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const createUser = async (user: any) => {
  const res = await fetch(`${base_url}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateUser = async (user: any) => {
  const res = await fetch(`${base_url}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${base_url}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return "User deleted successfully";
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getAdmin = async (id: string) => {
  const res = await fetch(`${base_url}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getAdmins = async () => {
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
};

export const createAdmin = async (user: any) => {
  const res = await fetch(`${base_url}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateAdmin = async (user: any) => {
  const res = await fetch(`${base_url}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteAdmin = async (id: string) => {
  const res = await fetch(`${base_url}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return "Admin deleted successfully";
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

