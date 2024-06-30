import { base_url } from "../constants/keys";
import { ClubMember, ClubPost, FanClub } from "../constants/models";
// import { FanClub } from "../constants/models";

export const getAllFanClubs = async (): Promise<FanClub[]> => {
  const res = await fetch(`${base_url}/FanClubManager/fanclubs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const fc = await res.json();
    return fc;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getFanClubs = async (token: string): Promise<FanClub[]> => {
  const res = await fetch(`${base_url}/FanClubManager/fanclubs`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const fc = await res.json();
    return fc;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getClubMembers = async (token: string): Promise<ClubMember[]> => {
  const res = await fetch(`${base_url}/FanClubManager/clubMembers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const cm = await res.json();
    return cm;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getClubPosts = async (token: string): Promise<ClubPost[]> => {
  const res = await fetch(`${base_url}/FanClubManager/clubposts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const post = await res.json();
    return post;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getComments = async (token: string): Promise<Comment[]> => {
  const res = await fetch(`${base_url}/FanClubManager/comments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const com = await res.json();
    return com;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addPost = async (token: string, data: any) => {
  console.log("Sending post data:", data);
  const res = await fetch(`${base_url}/FanClubManager/clubposts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const post = await res.json();
    return post;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addNews = async (token: string, data: any) => {
  console.log("Sending news data:", data);
  const res = await fetch(`${base_url}/FanClubManager/clubNews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const news = await res.json();
    return news;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
export const getClubPostsByArtist = async (token: string, artistId: string) => {
  const res = await fetch(`${base_url}/FanClubManager/clubposts/Artist/${artistId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const post = await res.json();
    console.log("Club Posts Services: ", post);
    return post;
  } else {
    const error = await res.json();
    console.log("Club Posts Services Error: ", error);
    throw new Error(error.message);
  }
};

export const getClubNewsByArtist = async (token: string, artistId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/clubNews/Artist/${artistId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const news = await res.json();
    console.log("Club News Services: ", news);
    return news;
  } else {
    const error = await res.json();
    console.log("Club News Services Error: ", error);
    throw new Error(error.message);
  }
};
