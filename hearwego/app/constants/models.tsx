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
  song_id?: string;
  song_title?: string;
  album_title?: string;
  song_length?: number;
  song_track: string;
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

export interface replies {
  replyId?: string;
  replier?: string;
  replyBody?: string;
  postId?: string;
  replier_ProfilePic?: string;
  commenter_ProfilePic?: string;
  commentId?: string;
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

export interface ClubVideos{
  videoId?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoURL?: string;
  videoThumbnail?: string;
  clubId?: string;
  artistId?: string;
  timestamps?: string;
}