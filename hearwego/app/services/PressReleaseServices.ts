import { base_url } from "../constants/keys";
import { PressReleaseData } from "../constants/models";

export const addPressRelease = async (token: string, data: any) => {
  console.log("Sending press data:", data);
  const res = await fetch(`${base_url}/PressRelease/PressRelease`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const press = await res.json();
    return press;
  } else {
    const error = await res.json();
    console.error("Error response:", error);
    throw new Error(error.message);
  }
};

export const getPressReleasesByArtist = async (
  token: string,
  ArtistID: string
) => {
  const res = await fetch(
    `${base_url}/PressRelease/PressRelease/Artist/${ArtistID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const press = await res.json();
    return press;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deletePressRelease = async (
  token: string,
  PressReleaseID: string
) => {
  const res = await fetch(
    `${base_url}/PressRelease/PressRelease/${PressReleaseID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (res.ok) {
    return true;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
