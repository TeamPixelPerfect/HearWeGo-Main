import { base_url } from "../constants/keys";
import { FanClub } from "../constants/models";
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
