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
import { handleArtistLogin } from "../services/AuthServices";
import { getArtist } from "../services/ArtistServices";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const artist = useAppSelector((state) => state.artist.user);

  console.log(artist);

  useEffect(() => {
    if (!artist) {
      const _artist = sessionStorage.getItem("hwg-artist");
      if (_artist) {
        const currentUser = JSON.parse(_artist);
        getArtist(currentUser.user._id).then((res) => {
          if (res) {
            const newData = { ...currentUser, ...res.user };
            dispatch(logInArtist(newData));
            sessionStorage.setItem("hwg-artist", JSON.stringify(newData));
          }
        });
      }
      router.replace("/auth/artistSignUp");
    } else {
      console.log("isAdminApproved:::", artist.user.isAdminApproved);
      if (!artist.user.isAdminApproved) {
        window.location.replace("/auth/artistSignUp/7");
        return;
      }
      if (!artist.user.isMobileVerified) {
        window.location.replace("/auth/artistSignUp/8");
        return;
      }
      let path = location.pathname.split("/");
      path.shift();
      path.shift();
      router.replace("/artist/" + path.join("/"));
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
