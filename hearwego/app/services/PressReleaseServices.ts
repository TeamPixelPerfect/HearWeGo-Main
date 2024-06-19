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
