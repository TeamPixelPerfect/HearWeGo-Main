"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ADNavItemBox,
  ADNavItemGroupBox,
  ArtistDashboardSideNavContainer,
} from "../styles/artistDashboard.styles";
import Logo from "../components/Logo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, IconButton, useMediaQuery } from "@mui/material";
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
import SettingsIcon from "@mui/icons-material/Settings";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import ADNavItemGroup from "./ADNavItemGroup";
import { useRouter } from "next/navigation";

const ArtistDashboardSideNav = () => {
  const Router = useRouter();

  const app = useAppSelector((state) => state.app);
  const artist = useAppSelector((state) => state.artist.user);

  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const matches = useMediaQuery("(max-width:960px)");

  const sideMenuOpts = [
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
          icon: MilitaryTechIcon,
          label: "Top Charts",
          link: "/artist/topCharts",
        },
        {
          icon: AutoGraphIcon,
          label: "Audience Analytics",
          link: "/artist/audienceAnalytics",
        },
        {
          icon: SsidChartIcon,
          label: "Compare",
          link: "/artist/comparisons",
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

  useEffect(() => {
    console.log("Artist:::", artist);
    if (!artist) {
      Router.replace("/auth/artistSignUp");
    }
  }, [artist]);

  return (
    <ArtistDashboardSideNavContainer>
      <Box sx={{ marginBottom: "1em" }}></Box>
      <Box
        sx={{ cursor: "pointer" }}
        onClick={() => {
          Router.push("/artist");
        }}
      >
        {!matches ? (
          <Logo img_url="https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png" />
        ) : (
          <IconButton color="primary" sx={{ fontSize: "40px" }}>
            <IoIosArrowDroprightCircle />
          </IconButton>
        )}
      </Box>
      <Box>
        <Box
          sx={
            matches
              ? { padding: "1em 0", width: "auto" }
              : { padding: "1em 0", width: "100%" }
          }
        >
          {sideMenuOpts.map((opt) => {
            return (
              <ADNavItemGroup
                groupLabel={opt.groupLabel}
                items={opt.items}
              ></ADNavItemGroup>
            );
          })}
        </Box>
        <ADNavItemGroupBox>
          <ADNavItemBox>
            <Link href="/artist">
              <SettingsIcon sx={{ color: "#3730A3", marginRight: "10px" }} />
              {!matches && <div style={{ color: "#3730A3" }}>Settings</div>}
            </Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
      </Box>
    </ArtistDashboardSideNavContainer>
  );
};

export default ArtistDashboardSideNav;
