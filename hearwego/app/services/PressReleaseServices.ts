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

export const sendEmailWithPDF = async (
  PressReleaseID: string,
  token: string,
  data?: any
) => {
  try {
    const response = await fetch(
      `${base_url}/PressRelease/PressRelease/sendEmailWithPDF/${PressReleaseID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (response.ok) {
      console.log("Email sent successfully:", result);
      return result;
    } else {
      throw new Error(result.message || "Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const DownloadPDF = (
  data: PressReleaseData,
  token?: string,
  PressReleaseID?: string
) => {
  fetch(
    `${base_url}/PressRelease/PressRelease/generateAndDownloadPDF/${PressReleaseID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${data.Headline}_press_release.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    })
    .catch((error) => console.error("Error downloading PDF:", error));
};

export const updatePressRelease = async (
  token: string,
  PressReleaseID: string,
  data: any
) => {
  const res = await fetch(
    `${base_url}/PressRelease/PressRelease/${PressReleaseID}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const getPressReleaseById = async (
  token: string,
  PressReleaseID: string
) => {
  const res = await fetch(
    `${base_url}/PressRelease/PressRelease/${PressReleaseID}`,
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
