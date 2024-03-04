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

export interface PixelCropArea {
  x: number; // x/y are the coordinates of the top/left corner of the cropped area
  y: number;
  width: number; // width of the cropped area
  height: number; // height of the cropped area
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  province: string;
  country: string;
  postalCode: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
  mobileNumber: string;
  country: string;
  gender: string;
  birthDate: string;
  profilePicture: string;
  shippingAddress: Address;
  billingAddress: Address;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  role: string;
  joinedDate: string;
}

export interface SocialMediaLink {
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: String;
  bankBranch: String;
  country: String;
}

export interface Artist {
  user: {
    email: String;
    password: String;
    artistName: String;
    alias: String;
    otherAliases: [String];
    profilePicture: String;
    artistType: String;
    musicGenres: [String];
    artistProfession: [String];
    mobileNumber: String;
    country: String;
    gender: String;
    birthDate: String;
    isEmailVerified: Boolean;
    isMobileVerified: Boolean;
    isAdminApproved: Boolean;
    artistBio: String;
    artistCovers: [String];
    socialMediaLinks: SocialMediaLink;
    webUrl: String;
    bankDetails: BankDetails;
    role: String;
  };
  token: string;
}

export interface Song {
  song_id: string;
  song_title: string;
  album_title: string;
  song_length: number;
  song_track: string;
  song_img: string;
  no_of_impressions?: number;
  no_of_plays?: number;
  no_of_shares?: number;
  primary_genre?: string[];
  song_genre?: string[];
  electronic_sub_genre?: string[];
  isrc?: string;
  release_date?: string;
  songStatus?: string;
  privacy_status?: string;
  langauge?: string;
  record_label?: string;
  song_writers?: string[],
  composer?: string[],
  lyrics?: string,
  artists?: string[]
  platform_links?: [
    {platform_name: string, link: string,}
  ],
  publisher?: string[],
  contain_music?: string,
}

export interface Album {
  albumName?: string;
  artists?: string[];
  albumCoverArt?: string;
  albumTracks?: number;
  albumLength?: number;
  impressions?: string;
  listners?: string;
  genres?: string[];
  privacy?: string;
  releaseDate?: string;
  albumStatus?: string;
}
