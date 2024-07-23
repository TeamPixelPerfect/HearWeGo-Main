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
import { getAdmin } from "../services/UserServices";
import { logInAdmin } from "@/lib/features/admin.slice";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // select admin from redux store
  const admin = useAppSelector((state) => state.admin.user);

    useEffect(() => {
      // check if artist is logged in
      if (!admin) {
        const _admin = sessionStorage.getItem("hwg-admin");

        // if artist is logged in get artist data from server
        if (_admin) {
          const currentUser = JSON.parse(_admin);
          getAdmin(currentUser.user._id).then((res) => {
            if (res) {
              const newData = { ...currentUser, ...res.user };
              dispatch(logInAdmin(newData));
              sessionStorage.setItem("hwg-admin", JSON.stringify(newData));
            }
          });
        }

        // if artist is not logged in redirect to artist sign up page
        router.replace("/auth/adminSignIn");
      } else {
        // if artist is logged in redirect to the requested page
        let path = location.pathname.split("/");
        path.shift();
        path.shift();
        router.replace("/admin/" + path.join("/"));
      }
    }, [admin]);

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
