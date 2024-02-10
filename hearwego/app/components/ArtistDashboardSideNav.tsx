import Link from "next/link";
import React from "react";

const ArtistDashboardSideNav = () => {
  return <div style={{display:"flex", flexDirection:"column", padding:"1em"}}>
    <Link href="/artist/songs">Songs</Link>
    <Link href="/artist/albums">Albums</Link>
    <Link href="/artist/topCharts">Top Charts</Link>
    <Link href="/artist/audienceAnalytics">Audience Analytics</Link>
    <Link href="/artist/comparisons">Compare</Link>
    <Link href="/artist/fanClub">Fan Club</Link>
    <Link href="/artist/merchandise">Merchandise</Link>
    <Link href="/artist/events">Events</Link>
    <Link href="/artist/eventCalendar">Calendar</Link>
    <Link href="/artist/pressRelease">Press Releases</Link>
    <Link href="/artist/publicRelationCampaigns">PR Campaigns</Link>
  </div>;
};

export default ArtistDashboardSideNav;
