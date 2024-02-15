import Header from "../components/Header";
import { AppItem } from "../constants/models";
import { base_url } from "../constants/keys";
import ArtistDashboardSideNav from "../components/ArtistDashboardSideNav";
import { ArtistDashboardLayout } from "../styles/artistDashboard.styles";
import ArtistDashboardHeader from "../components/ArtistDashboaardHeader";
import { EventMainBox } from "../styles/artistDashboardEventsPage.styles";
//import { ArtistDashboardHeader } from "../styles/artistDashboardHeader.styles";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
}
