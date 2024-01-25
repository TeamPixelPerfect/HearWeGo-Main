export interface menuItem {
  _id: string;
  name: string;
  url: string;
}

export interface serviceItem {
  _id: string;
  title: string;
  img_url: string;
  description: string;
}

export interface AppItem {
  logo_url: string;
  banner_imgs: string[];
  site_main_menu: menuItem[];
  service_items: serviceItem[];
}


