"use client";
import Header from "../components/Header";
import { AppItem } from "../constants/models";
import { base_url } from "../constants/keys";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import { HomeBanner } from "../styles/home.styles";
import { useAppSelector } from "@/lib/hooks";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const app = useAppSelector((state) => state.app);
    return (
        <>
            <Header app={app} />
            <HomeBanner imgs={app?.banner_imgs}>
                {children}
            </HomeBanner>
        </>
    )
}