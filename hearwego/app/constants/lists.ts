import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AlbumIcon from "@mui/icons-material/Album";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EventIcon from "@mui/icons-material/Event";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PublicIcon from "@mui/icons-material/Public";

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