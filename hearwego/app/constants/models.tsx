export interface menuItem {
  _id: string;
  name: string;
  url: string;
}

export interface AppItem {
  logo_url: string;
  banner_imgs: string[];
  site_main_menu: menuItem[];
}
