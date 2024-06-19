import { base_url } from "../constants/keys";
import { MerchStore } from "../constants/models";


export const addMerchStore = async (token: string, data: any) => {
    console.log("Sending store data :",data);
    const res = await fetch(`${base_url}/MerchsManager/merchStores`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",	
        },
        body: JSON.stringify(data),}

    );

    if (res.ok) {
        const store = await res.json();
        return store;
    }else{
        const error = await res.json();
        throw new Error(error.message);
    }
}