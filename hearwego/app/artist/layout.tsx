import Header from "../components/Header";
import { AppItem } from "../constants/models";
import { base_url } from "../constants/keys";
import ArtistDashboardSideNav from "../components/ArtistDashboardSideNav";
import { ArtistDashboardLayout } from "../styles/artistDashboard.styles";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ArtistDashboardLayout>
      <div className="ad-left">
        <ArtistDashboardSideNav />
      </div>
      <div className="ad-right">
        {children}
    </div>
    </ArtistDashboardLayout>
  );
}
