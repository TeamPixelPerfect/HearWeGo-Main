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
    return error;
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
  const res = await fetch(
    `${base_url}/MerchsManager/products/store/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const product = await res.json();
    return product;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getDraftProductsforStore = async (storeId: string) => {
  const res = await fetch(
    `${base_url}/MerchsManager/products/store/drafts/${storeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const product = await res.json();
    return product;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getStoreForArtist = async (artistId: string) => {
  const res = await fetch(
    `${base_url}/MerchsManager/merchStores/artist/${artistId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const store = await res.json();
    return store;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getCategories = async () => {
  const res = await fetch(`${base_url}/MerchsManager/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const category = await res.json();
    return category;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getPromosForStore = async (storeId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/promos/store/${storeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const promo = await res.json();
    return promo;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getOrdersForStore = async (storeId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/orders/store/${storeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const order = await res.json();
    return order;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const editProduct = async (
  token: string,
  productId: string,
  data: any
) => {
  console.log("Sending product data :", data);
  const res = await fetch(`${base_url}/MerchsManager/products/${productId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const product = await res.json();
    return product;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteProduct = async (token: string, productId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const editCategory = async (
  token: string,
  categoryId: string,
  data: any
) => {
  console.log("Sending category data :", data);
  const res = await fetch(
    `${base_url}/MerchsManager/categories/${categoryId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    const category = await res.json();
    return category;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteCategory = async (token: string, categoryId: string) => {
  const res = await fetch(
    `${base_url}/MerchsManager/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    return;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deletePromo = async (token: string, promoId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/promos/${promoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getMerchStore = async (storeId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/merchStores/${storeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const store = await res.json();
    return store;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getCartByUser = async (userId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/carts/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const cart = await res.json();
    return cart;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getCartItems = async (cartId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/cartItems/${cartId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const cartItems = await res.json();
    return cartItems;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const getProduct = async (productId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/products/${productId}`, {
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
};

export const addItemToCart = async (token: string, data: any) => {
  const res = await fetch(`${base_url}/MerchsManager/cartItems/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const product = await res.json();
    return product;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const updateCartItem = async (
  token: string,
  cartItemId: string,
  data: any
) => {
  const res = await fetch(`${base_url}/MerchsManager/cartItems/${cartItemId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const product = await res.json();
    return product;
  } else {
    const error = await res.json();
    throw new Error(error.message);
  }
};

export const deleteCartItem = async (token: string, cartItemId: string) => {
  const res = await fetch(`${base_url}/MerchsManager/cartItems/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
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
};
