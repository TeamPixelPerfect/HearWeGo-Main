import type { Metadata } from "next";
import { Roboto, Dancing_Script } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Wrapper from "./components/Wrapper";
import { AppItem } from "./constants/models";
import { base_url } from "./constants/keys";
import React from "react";
import CustomeThemeProvider from "./styles/CustomeTheme";
import UserAuthProvider from "./auth/AuthProviders/UserAuthProvider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HearWeGo - Music For Living, Live For Music.",
  description: "All in one music marketing platform. Join as artist or fan.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch(`${base_url}/app`);
  const app: AppItem = await res.json();
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CustomeThemeProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <StoreProvider>
              <UserAuthProvider>
                <Wrapper app={app} children={children} />
              </UserAuthProvider>
            </StoreProvider>
          </AppRouterCacheProvider>
        </CustomeThemeProvider>
      </body>
    </html>
  );
}
