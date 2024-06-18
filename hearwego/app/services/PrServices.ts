import { base_url } from "../constants/keys";
import { PRCampaigns, PRPosts, PRtask } from "../constants/models";
//get all PR Campaigns
export const getPRCampaigns = async (
  token: string,
  page?: number,
  limit?: number,
  sort?: string
) => {
  const res = await fetch(
    `${base_url}/PRManager/PRCampaign?page=${page}&limit=${limit}&`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const songs = await res.json();
    return songs;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

//add PR Campaign
export const addPRCampaign = async (token: string, data: any) => {
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
