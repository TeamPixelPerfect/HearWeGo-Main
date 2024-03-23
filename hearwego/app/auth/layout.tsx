"use client";
import Header from "../components/Header";
import { AppItem } from "../constants/models";
import { base_url } from "../constants/keys";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { HomeBanner } from "../styles/home.styles";
import { useAppSelector } from "@/lib/hooks";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const app = useAppSelector((state) => state.app);
  return (
    <>
      <Header app={app} />
      <HomeBanner
        imgs={[
          "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ]}
      >
        {children}
      </HomeBanner>
    </>
  );
}
