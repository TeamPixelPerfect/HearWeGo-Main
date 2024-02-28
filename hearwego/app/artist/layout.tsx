"use client";

import Header from "../components/Header";
import { AppItem } from "../constants/models";
import { base_url } from "../constants/keys";
import ArtistDashboardSideNav from "../components/ArtistDashboardSideNav";
import { ArtistDashboardLayout } from "../styles/artistDashboard.styles";
import ArtistDashboardHeader from "../components/ArtistDashboaardHeader";
import { EventMainBox } from "../styles/artistDashboardEventsPage.styles";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logInArtist } from "@/lib/features/artist.slice";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const artist = useAppSelector((state) => state.artist.user);

  console.log(artist);

  useEffect(() => {
    if (!artist) {
      const _artist = localStorage.getItem("hwg-artist");
      if (_artist)
        dispatch(logInArtist(JSON.parse(_artist)));
      router.replace("/auth/artistSignUp");
    } else {
      let path = location.pathname.split("/");
      path.shift();
      if (path[0] === "artist" && path[1]) path.shift();
      let pathString = path.join("/");
      console.log(pathString);
      router.replace(pathString);
    }
  }, [artist]);

  if (artist)
    return (
      <ArtistDashboardLayout>
        <div className="ad-left">
          <ArtistDashboardSideNav />
        </div>
        <div className="ad-right">
          <ArtistDashboardHeader />
          <EventMainBox>{children}</EventMainBox>
        </div>
      </ArtistDashboardLayout>
    );

  return <></>;
}
