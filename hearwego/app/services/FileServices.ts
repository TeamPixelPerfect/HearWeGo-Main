import { base_url } from "../constants/keys";

// handle image upload (NOT USED!!!!)
export const handleImageUpload = async (file: string) => {
    const res = await fetch(`${base_url}/files/uploadImage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ img: file }),
    });
    if(res.ok) {
        console.log("Image uploaded successfully");
        const url = await res.json();
        return url;
    } else {
        const error = await res.json();
        throw new Error(error.message);
    }
}