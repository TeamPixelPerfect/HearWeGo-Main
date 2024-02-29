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
}

export interface Song {
  songName: string;
  albumName: string;
  duration: number;
  songUrl: string;
  coverArt: string;
  impressions: string;
  listeners: string;
}

export interface Album {
  albumName: string;
  albumCoverArt: string;
  albumTracks: number;
  albumLength: number;
  impressions: string;
  listners: string;
}