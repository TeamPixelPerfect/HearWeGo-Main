export interface MerchStore {
  store_id: string;
  store_banner: string;
  promo_banner: string[];
  store_description: string;
  artist_id: string;
  artist_name: string;
  createdAt?: string;
  updatedAt?: string;
  store_status?: string;
}

export interface ProductModel {
  product_id: string;
  product_name: string;
  product_description: string;
  product_images: string[];
  category_id: string;
  product_price: number;
  product_quantity: number;
  product_variations: {
    variation_name: string;
    variation_value: string;
    variation_price: number;
    variation_quantity: number;
  }[];
  product_rating: number;
  store_id?: string;
}
