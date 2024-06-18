"use client";

import AdminDashboardSideNav from "@/app/components/AdminDashboardSideNav";
import { ArtistDashboardLayout } from "../styles/artistDashboard.styles";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import { EventMainBox } from "../styles/artistDashboardEventsPage.styles";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logInArtist } from "@/lib/features/artist.slice";
import { getArtist } from "../services/ArtistServices";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

  // select artist from redux store
//   const artist = useAppSelector((state) => state.artist.user);

  //   useEffect(() => {
  //     // check if artist is logged in
  //     if (!artist) {
  //       const _artist = sessionStorage.getItem("hwg-artist");

  //       // if artist is logged in get artist data from server
  //       if (_artist) {
  //         const currentUser = JSON.parse(_artist);
  //         getArtist(currentUser.user._id).then((res) => {
  //           if (res) {
  //             const newData = { ...currentUser, ...res.user };
  //             dispatch(logInArtist(newData));
  //             sessionStorage.setItem("hwg-artist", JSON.stringify(newData));
  //           }
  //         });
  //       }

  //       // if artist is not logged in redirect to artist sign up page
  //       router.replace("/auth/artistSignUp");
  //     } else {
  //       // if artist is logged in check if artist is approved by admins
  //       // if not redirect to artist sign up page (admin approval page)
  //       if (!artist.user.isAdminApproved) {
  //         window.location.replace("/auth/artistSignUp/7");
  //         return;
  //       }

  //       // if artist is logged in check if artist has verified mobile number
  //       // if not redirect to artist sign up page (mobile verification page)
  //       if (!artist.user.isMobileVerified) {
  //         window.location.replace("/auth/artistSignUp/8");
  //         return;
  //       }

  //       // if artist is logged in redirect to the requested page
  //       let path = location.pathname.split("/");
  //       path.shift();
  //       path.shift();
  //       router.replace("/artist/" + path.join("/"));
  //     }
  //   }, [artist]);

  return (
    <ArtistDashboardLayout>
      <div className="ad-left">
        <AdminDashboardSideNav />
      </div>
      <div className="ad-right">
        <AdminDashboardHeader />
        <EventMainBox>{children}</EventMainBox>
      </div>
    </ArtistDashboardLayout>
  );
}
