import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AlbumIcon from "@mui/icons-material/Album";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from '@mui/icons-material/Person';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

// Artist Side Menu Options
export const sideMenuOpts = [
  {
    groupLabel: "Discography",
    items: [
      {
        icon: LibraryMusicIcon,
        label: "Songs",
        link: "/artist/songs",
      },
      {
        icon: AlbumIcon,
        label: "Albums",
        link: "/artist/albums",
      },
    ],
  },
  {
    groupLabel: "Analytics",
    items: [
      {
        icon: AutoGraphIcon,
        label: "Audience Analytics",
        link: "/artist/audienceAnalytics",
      },
    ],
  },
  {
    groupLabel: "Fans",
    items: [
      {
        icon: GroupsIcon,
        label: "Fan Club",
        link: "/artist/fanClub",
      },
      {
        icon: StorefrontIcon,
        label: "Merchandise",
        link: "/artist/merchandise",
      },
    ],
  },
  {
    groupLabel: "Events",
    items: [
      {
        icon: LocalActivityIcon,
        label: "Events",
        link: "/artist/events",
      },
      {
        icon: EventIcon,
        label: "Calendar",
        link: "/artist/eventCalendar",
      },
    ],
  },
  {
    groupLabel: "Public",
    items: [
      {
        icon: NewspaperIcon,
        label: "Press Releases",
        link: "/artist/pressRelease",
      },
      {
        icon: PublicIcon,
        label: "PR Campaigns",
        link: "/artist/publicRelationCampaigns",
      },
    ],
  },
];

export const adminSideMenuOpts = [
  {
    groupLabel: "",
    items: [
      {
        icon: LibraryMusicIcon,
        label: "Music",
        link: "/admin/music",
      },
      // {
      //   icon: AlbumIcon,
      //   label: "Albums",
      //   link: "/artist/albums",
      // },
    ],
  },
  {
    groupLabel: "",
    items: [
      {
        icon: PersonIcon,
        label: "Users",
        link: "/admin/users",
      },
    ],
  },
  {
    groupLabel: "",
    items: [
      {
        icon: EventIcon,
        label: "Events",
        link: "/admin/events",
      },
    ],
  },
  {
    groupLabel: "",
    items: [
      {
        icon: GroupsIcon,
        label: "Fan Club",
        link: "/admin/fanClubs",
      },
      // {
      //   icon: StorefrontIcon,
      //   label: "Merchandise",
      //   link: "/artist/merchandise",
      // },
    ],
  },
  {
    groupLabel: "",
    items: [
      {
          icon: StorefrontIcon,
          label: "Merchandise",
          link: "/admin/merchandise",
        },
    ],
  },
  {
    groupLabel: "",
    items: [
      {
        icon: NewspaperIcon,
        label: "News and Updates",
        link: "/admin/media",
      },

    ],
  },
  {
    groupLabel: "",
    items: [
      {
        icon: HelpCenterIcon,
        label: "Help Center",
        link: "/admin/help",
      },
    ],
  },
];
