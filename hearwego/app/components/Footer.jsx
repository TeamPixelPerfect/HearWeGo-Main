"use client";
import React from "react";
import { Box } from "@mui/material";
import { FooterContainer } from "../styles/footer.styles";
import Logo from "../components/Logo";
import { useAppSelector } from "@/lib/hooks";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";

const Footer = () => {
  const app = useAppSelector((state) => state.app);
  return (
    <FooterContainer>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
          padding: "20px 0",
          paddingBottom: "100px",
          borderBottom: "1px solid #fff",
        }}
      >
        <Logo img_url={app.logo_url} alt="HearWeGo" />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <MailOutlineIcon style={{ color: "#fff", fontSize: "2em" }} />
          <InstagramIcon style={{ color: "#fff", fontSize: "2em" }} />
          <FacebookIcon style={{ color: "#fff", fontSize: "2em" }} />
          <YouTubeIcon style={{ color: "#fff", fontSize: "2em" }} />
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
          padding: "20px 0",
        }}
      >
        <Box style={{fontWeight: "300"}}>&copy; HearWeGo</Box>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Contact</Link>
        </Box>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
