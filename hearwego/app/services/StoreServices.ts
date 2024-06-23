import { base_url } from "../constants/keys";
import { MerchStore } from "../constants/models";
import { MerchCategory } from "../constants/models";
import { MerchProduct } from "../constants/models";
import { MerchPromo } from "../constants/models";

export const addMerchStore = async (token: string, data: any) => {
  console.log("Sending store data :", data);
  const res = await fetch(`${base_url}/MerchsManager/merchStores`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const store = await res.json();
    return store;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
export const addMerchCategory = async (token: string, data: any) => {
  console.log("Sending category data :", data);
  const res = await fetch(`${base_url}/MerchsManager/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const category = await res.json();
    return category;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addMerchProduct = async (token: string, data: any) => {
  console.log("Sending product data :", data);
  const res = await fetch(`${base_url}/MerchsManager/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const prodcut = await res.json();
    return prodcut;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const addMerchPromo = async (token: string, data: any) => {
  console.log("Sending promo data :", data);
  const res = await fetch(`${base_url}/MerchsManager/promos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const promo = await res.json();
    return promo;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};
 

export const getProductsforStore = async (storeId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/products/store/${storeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const product = await res.json();
    return product;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
}