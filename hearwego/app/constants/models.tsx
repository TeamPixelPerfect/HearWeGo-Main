import { Dayjs } from "dayjs";

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
  user_id?: string;
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
  token?: string;
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
    _id?: string;
    artist_id?: string;
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
  _id?: string;
  song_id?: string;
  song_title?: string;
  album_title?: string;
  song_length?: number;
  song_track?: string;
  song_img?: string;
  no_of_impressions?: number;
  no_of_plays?: number;
  no_of_shares?: number;
  primary_genre?: string[];
  song_genre?: string[];
  electronic_sub_genre?: string[];
  isrc?: string;
  release_date?: string;
  song_status?: string;
  privacy_status?: string;
  language?: string[];
  record_label?: string;
  song_writers?: { artist_id: string; artist_name: string }[];
  composer?: { artist_id: string; artist_name: string }[];
  lyrics?: string;
  artist?: { artist_id: string; artist_name: string }[];
  platform_links?: { platform_name: string; link: string }[];
  publisher?: string[];
  contain_music?: string;
  additional_tags?: string[];
  description?: string;
  added_by?: string;
}

export interface Album {
  _id?: string;
  album_id?: string;
  album_title?: string;
  artist?: { artist_id: string; artist_name: string }[];
  album_img?: string;
  no_of_tracks?: number;
  album_length?: number;
  no_of_impressions?: string;
  no_of_plays?: string;
  album_genre?: string[];
  privacy?: string;
  release_date?: string;
  album_status?: string;
  additional_tags?: string[];
  description?: string;
  song?: string[];
}

export interface Event {
  event_id?: string;
  event_img?: string;
  event_name?: string;
  event_type?: string;
  age_from?: number;
  age_to?: number;
  no_of_sessions?: number;
  sessions?: [
    {
      session_id: number;
      session_name: string;
      session_date: string;
      session_time: string;
      duration: string;
      venue: string;
      artists: string[];
      session_special_notice: string;
    }
  ];
  sponsor?: [
    {
      sponsor_type: string;
      sponsor_name: string;
      sponsor_contact: string;
      sponsor_email: string;
    }
  ];
  teams?: [
    {
      team_type: string;
      team_name: string;
      contact: string;
      email: string;
    }
  ];
  description?: string;
  event_status?: string;
  event_created_by?: string;
}

export interface PRPost {
  PrPostID: string;
  ArtistName: string;
  post_img: string;
  post_social_media?: string;
  schedule_date: string;
  Description: string;
  Scheduled_Date: string;
  Scheduled_Time: string;
  SocialMedias?: string[];
}

export interface Ticket {
  ticket_id?: string;
  ticket_catagory?: string;
  ticket_img?: string;
  auto_ticket_details?: [
    {
      ticket_currency: string;
      ticket_img: string;
      ticket_type: string;
      ticket_price: string;
      ticket_count: string;
      ticket_session: string;
    }
  ];
  manual_ticket_details?: [
    {
      ticket_location: string;
      ticket_session: string;
    }
  ];
  ticket_description?: string;
  event_id?: string;
}

export interface Budget {
  budget_id?: string;
  budget_currency?: string;
  budget_details?: [
    {
      budget_title: string;
      budget_type: string;
      budget_session: string;
      budget_amount: number;
    }
  ];
  event_id?: string;
}

export interface PRPost {
  PrPostID: string;
  ArtistName: string;
  post_img: string;
  post_social_media?: string;
  schedule_date: string;
  Description: string;
  Scheduled_Date: string;
  Scheduled_Time: string;
  SocialMedias?: string[];
}

export interface AutoTicket {
  auto_ticket_id?: string;
  ticket_type?: string;
  ticket_price?: number;
  ticket_count?: number;
  ticket_session?: string;
  event_id?: string;
}

export interface ManualTicket {
  manual_ticket_id?: string;
  ticket_location?: string;
  ticket_session?: string;
  event_id?: string;
}

export interface TicketType {
  ticket_type_id?: string;
  ticket_type?: string;
  ticket_description?: string;
  ticket_img?: string;
  event_id?: string;
}

export interface SoldTickets {
  sold_ticket_id?: string;
  ticket_id?: string;
  user_id?: string;
  bought_quantity?: number;
  total_price?: number;
  user_name?: string;
  user_email?: string;
  user_contact?: string;
}

export interface RemainingTickets {
  remaining_ticket_id?: string;
  ticket_id?: string;
  remaining_quantity?: number;
  SocialMedias?: string[];
}

export interface FanClub {
  clubId?: string;
  artistId?: string;
  coverImage_URL?: string;
  visibility?: boolean;
}

export interface ClubMember {
  memberId?: string;
  userId?: string;
  topMember?: boolean;
  clubId?: string;
}

export interface ClubPost {
  postId?: string;
  postType?: string;
  postDescription?: string;
  postpublisher?: string;
  postImage_URL?: string;
  clubId?: string;
  artistId?: string;
  reacts?: string;
  comments?: string;
  timestamps?: string;
  createdAt?: string;
}

export interface ClubNews {
  newsId?: string;
  newsTitle?: string;
  newsBody?: string;
  newsImage_URL?: string;
  newsPublisher?: string;
  clubId?: string;
  artistId?: string;
  timestamps?: string;
}
export interface comments {
  commentId?: string;
  commenter?: string;
  commentBody?: string;
  commenter_ProfilePic?: string;
  postId?: string;
  timestamps?: string;
  parentCommentId?: string;
}

export interface MerchStore {
  store_id?: string;
  store_banner?: string;
  promo_banner?: string[];
  store_description?: string;
  shipping_fees?: string;
  delivery_services?: string;
  artist_id?: string;
}

export interface MerchCategory {
  store_id?: string;
  category_id?: string;
  category_name?: string;
  category_description?: string;
  subCategories?: string[];
  image?: string;
}

export interface MerchProduct {
  product_id?: string;
  product_name?: string;
  product_description?: string;
  product_Main_image?: string;
  product_Additional_image?: string;
  catagory_name?: string;
  product_price?: string;
  product_quantity?: string;
  product_rating?: string;
  store_id?: string;
  rating_count?: number;
  product_variations?: ProductVariant[];
  review_count?: number;
  product_sold?: number;
}

export interface MerchPromo {
  promo_id?: string;
  promo_code?: string;
  promo_description?: string;
  promo_image?: string;
  promo_start?: string;
  promo_end?: string;
  promo_status?: string;
  store_id?: string;
}

export interface Product {
  product_id?: string;
  product_name?: string;
  product_description?: string;
  product_Main_image?: string;
  product_Additional_image?: string;
  category_name?: string;
  product_price?: string;
  product_quantity?: string;
  product_rating?: string;
  store_id?: string;
}

export interface Cart {
  cart_id?: string;
  user_id?: string;
  cart_total?: number;
}

export interface CartItem {
  cart_item_id?: string;
  product_id?: string;
  product_variation?: string;
  product_quantity?: number;
  product_price?: number;
  cart_id?: string;
  cart_item_image?: string;
  cart_item_name?: string;
}

export interface ProductVariant {
  variation_name?: string;
  variation_value?: string;
  variation_price?: Number;
  variation_quantity?: Number;
}

export interface replies {
  replyId?: string;
  replier?: string;
  replyBody?: string;
  postId?: string;
  replier_ProfilePic?: string;
  commenter_ProfilePic?: string;
  commentId?: string;
}

export interface PRCampaigns {
  ArtistID: string;
  CampaignID?: string;
  Campaign_Name?: string;
  Campaign_Description?: string;
  CampaignImage_URL?: string;
  CampaignStatus?: string;
  completedProgress?: number;
  PRPosts?: PRPosts[];
  PRtask?: PRtask[];
}

export interface PRPosts {
  artist_id?: string;
  PrPostID?: string;
  ArtistName?: string;
  Campaign?: string;
  Description?: string;
  Scheduled_Date?: Date;
  Scheduled_Time?: string;
  SocialMedias?: string[];
  PostImage_URL?: string;
  CampaignID?: string;
}


export interface PRtask {
  TaskID?: string;
  TaskName?: string;
  TaskDescription?: string;
  TaskStatus?: string;
  CampaignID?: string;
  isEdit?: boolean; 
  timestamps?: string;
}

export interface reacts {
  reactId?: string;
  reacter?: string;
  postId?: string;
  timestamps?: string;
}

export interface Newscomments {
  newscommentId?: string;
  newscommenter?: string;
  newscommentBody?: string;
  newscommenter_ProfilePic?: string;
  newsId?: string;
  timestamps?: string;
  parentCommentId?: string;
}

export interface ClubVideos {
  videoId?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoURL?: string;
  videoThumbnail?: string;
  clubId?: string;
  artistId?: string;
  timestamps?: string;
}
