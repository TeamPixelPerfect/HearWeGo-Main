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
