import Header from "../components/Header";
import { AppItem } from "../constants/models";
import { base_url } from "../constants/keys";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const res = await fetch(`${base_url}/app`);
    const app: AppItem = await res.json();
    return (
        <>
            <Header app={app} />
            <Box sx={{minHeight:"100vh"}}>
                {children}
            </Box>
            <Footer />
        </>
    )
}