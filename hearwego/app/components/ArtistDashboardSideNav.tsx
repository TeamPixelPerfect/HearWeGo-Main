"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  ADNavItemBox,
  ADNavItemGroupBox,
  ArtistDashboardSideNavContainer,
} from "../styles/artistDashboard.styles";
import Logo from "../components/Logo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box } from "@mui/material";
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
import SettingsIcon from '@mui/icons-material/Settings';

const ArtistDashboardSideNav = () => {
  const app = useAppSelector((state) => state.app);

  return (
    <ArtistDashboardSideNavContainer>
      <Box sx={{ marginBottom: "8px" }}></Box>
      <Logo img_url="https://hwgbucket.s3.ap-south-1.amazonaws.com/hwgLogo.png" />
      <Box sx={{ marginTop: "12px" }}>
        <ADNavItemGroupBox>
          <label>Discography</label>
          <ADNavItemBox>
            <LibraryMusicIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/songs">Songs</Link>
          </ADNavItemBox>
          <ADNavItemBox>
            <AlbumIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/albums">Albums</Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
        <ADNavItemGroupBox>
        <label>Analytics</label>
          <ADNavItemBox>
            <MilitaryTechIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/topCharts">Top Charts</Link>
          </ADNavItemBox>
          <ADNavItemBox>
            <AutoGraphIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/audienceAnalytics">Audience Analytics</Link>
          </ADNavItemBox>
          <ADNavItemBox>
            <SsidChartIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/comparisons">Compare</Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
        <ADNavItemGroupBox>
        <label>Fans</label>
          <ADNavItemBox>
            <GroupsIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/fanClub">Fan Club</Link>
          </ADNavItemBox>
          <ADNavItemBox>
            <StorefrontIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/merchandise">Merchandise</Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
        <ADNavItemGroupBox>
        <label>Events</label>
          <ADNavItemBox>
            <LocalActivityIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/events">Events</Link>
          </ADNavItemBox>
          <ADNavItemBox>
            <EventIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/eventCalendar">Calendar</Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
        <ADNavItemGroupBox>
        <label>Public</label>
          <ADNavItemBox>
            <NewspaperIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/pressRelease">Press Releases</Link>
          </ADNavItemBox>
          <ADNavItemBox>
            <PublicIcon sx={{ color: "#4B4B4B", marginRight: "10px" }} />
            <Link href="/artist/publicRelationCampaigns">PR Campaigns</Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
        
      </Box>
      <ADNavItemGroupBox>
          <ADNavItemBox>
            <SettingsIcon sx={{ color: "#3730A3", marginRight: "10px" }} />
            <Link href="/artist" style={{color:"#3730A3"}}>Settings</Link>
          </ADNavItemBox>
        </ADNavItemGroupBox>
    </ArtistDashboardSideNavContainer>
  );
};

export default ArtistDashboardSideNav;
