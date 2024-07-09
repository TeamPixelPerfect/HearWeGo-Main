import { base_url } from "../constants/keys";

//create Press Release
export const createPressRelease = async (token: string, data: any) => {
  const res = await fetch(`${base_url}/PressRelease/PressRelease`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    if (res.ok) {
      const PressRelease = await res.json();
      return PressRelease;
    } else {
      const error = await res.json();
      throw new Error(error.message);
    }
}