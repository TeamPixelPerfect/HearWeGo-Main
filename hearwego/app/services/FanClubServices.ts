import { comment } from "postcss";
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


export const addComments = async (token: string, data: any) => {
  console.log("Sending comments data:", data);
  const res = await fetch(`${base_url}/FanClubManager/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const comments = await res.json();
    return comments;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getCommentsByPost = async (token: string, postId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/comments/Post/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const comments = await res.json();
    console.log("Club comments Services: ", comments);
    return comments;
  } else {
    const error = await res.json();
    console.log("Club comments Services Error: ", error);
    throw new Error(error.message);
  }
};

export const addReplies = async (token: string, data: any) => {
  console.log("Sending replies data:", data);
  const res = await fetch(`${base_url}/FanClubManager/replies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const replies = await res.json();
    return replies;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getRepliesByComment = async (token: string,  commentId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/replies/Comment/${commentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const replies = await res.json();
    console.log("Club replies Services: ", replies);
    return replies;
  } else {
    const error = await res.json();
    console.log("Club replies Services Error: ", error);
    throw new Error(error.message);
  }
};

export const deleteComment = async (token: string, commentId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const comments = await res.json();
    return comments;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deletePost = async (token: string, postId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/clubposts/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const clubposts = await res.json();
    return clubposts;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};


export const updatePost = async (token: string, postId: string, data: any) => {
  console.log("Sending post data:", data);
  const res = await fetch(`${base_url}/FanClubManager/clubposts/${postId}`, {
    method: "PATCH",
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
}

export const addReacts = async (token: string, data: any) => {
  console.log("Sending reacts data:", data);
  const res = await fetch(`${base_url}/FanClubManager/reacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const reacts = await res.json();
    return reacts;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getReactsByPost = async (token: string, postId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/reacts/Post/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const reacts = await res.json();
    console.log("Club reacts Services: ", reacts);
    return reacts;
  } else {
    const error = await res.json();
    console.log("Club reacts Services Error: ", error);
    throw new Error(error.message);
  }
};

export const getReactsByNews = async (token: string, newsId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/reacts/News/${newsId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const reacts = await res.json();
    console.log("Club reacts Services: ", reacts);
    return reacts;
  } else {
    const error = await res.json();
    console.log("Club reacts Services Error: ", error);
    throw new Error(error.message);
  }
};


export const addNewsComments = async (token: string, data: any) => {
  console.log("Sending newscomments data:", data);
  const res = await fetch(`${base_url}/FanClubManager/newscomments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const newscomments = await res.json();
    return newscomments;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getCommentsByNews = async (token: string, newsId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/newscomments/News/${newsId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const newscomments = await res.json();
    console.log("Club newscomments Services: ", newscomments);
    return newscomments;
  } else {
    const error = await res.json();
    console.log("Club newscomments Services Error: ", error);
    throw new Error(error.message);
  }
};

export const deleteNews = async (token: string, newsId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/clubNews/${newsId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const clubNews = await res.json();
    return clubNews;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteNewsComment = async (token: string, newscommentId: string) => {
  const res = await fetch(
    `${base_url}/FanClubManager/newscomments/${newscommentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    const newscomments = await res.json();
    return newscomments;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateNews = async (token: string, newsId: string, data: any) => {
  try {
    const res = await fetch(`${base_url}/FanClubManager/clubNews/${newsId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const clubNews = await res.json();
      return clubNews;
    } else {
      const error = await res.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

export const addVideos = async (token: string, data: any) => {
  console.log("Sending videos data:", data);
  const res = await fetch(`${base_url}/FanClubManager/clubVideos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const clubVideos = await res.json();
    return clubVideos;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};