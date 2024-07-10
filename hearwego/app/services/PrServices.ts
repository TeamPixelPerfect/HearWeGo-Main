import exp from "constants";
import { base_url } from "../constants/keys";
import { PRCampaigns, PRPosts, PRtask } from "../constants/models";

//get all PR Campaigns
export const getPRCampaignsByArtist = async (
  token: string,
  artistId: string,
  page?: number,
  limit?: number
) => {
  const res = await fetch(
    `${base_url}/PRManager/PRCampaign/artist/${artistId}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const campaigns = await res.json();
    return campaigns;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};


export const getAllPRCampaigns = async (token: string) => {
  const res = await fetch(`${base_url}/PRManager/PRCampaign`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const campaigns = await res.json();
    return campaigns;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }

}

//add PR Campaign
export const addPRCampaign = async (token: string, data: any) => {
  console.log(" sending data", data);
  const res = await fetch(`${base_url}/PRManager/PRCampaign`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const Campaigns = await res.json();
    return Campaigns;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updatePRCampaign = async (
  token: string,
  data: any,
  id: string
) => {
  const res = await fetch(`${base_url}/PRManager/PRCampaign/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const Campaigns = await res.json();
    return Campaigns;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deletePRCampaign = async (token: string, id: string) => {
  const res = await fetch(`${base_url}/PRManager/PRCampaign/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return "Campaign Deleted";
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getallPRCampaigns = async (
  token: string
): Promise<PRCampaigns[]> => {
  const res = await fetch(`${base_url}/PRManager/PRCampaign`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const campaigns = await res.json();
    return campaigns;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getPRCampaignByID = async (token: string, id: string) => {
  const res = await fetch(`${base_url}/PRManager/PRCampaign/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const campaign = await res.json();
    return campaign;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addPRPost = async (token: string, data: any) => {
  console.log(" sending data", data);
  const res = await fetch(`${base_url}/PRManager/PRPosts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const PRPost = await res.json();
    return PRPost;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getPRPostsByArtist = async (token: string, artistId: string) => {
  const res = await fetch(`${base_url}/PRManager/PRPosts/artist/${artistId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const PRPosts = await res.json();
    return PRPosts;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deletePRPost = async (token: string, id: string) => {
  const res = await fetch(`${base_url}/PRManager/PRPosts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return "Post Deleted";
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getPrPostsByCampaign = async (
  token: string,
  campaignId: string
) => {
  const res = await fetch(
    `${base_url}/PRManager/PRPosts/campaign/${campaignId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const PRPosts = await res.json();
    return PRPosts;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteAllPostsForCampaign = async (
  token: string,
  campaignId: string
) => {
  try {
    const response = await getPrPostsByCampaign(token, campaignId);
    const posts = response.data;

    console.log("posts", posts);

    if (!posts) return;
    for (const post of posts) {
      await deletePRPost(token, post.PrPostID);
    }
  } catch (error) {
    console.error("Error deleting posts for campaign:", error);
  }
};
