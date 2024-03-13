"use client";
import {
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  ADArtistInfo,
  ADArtistPageUrl,
  ADHomeCoverBox,
  ADHomeName,
  ADHomeNameArea,
  ADHomeProfilePicture,
  ADHomeSocialIcons,
  ADHomeTabBox,
  FeaturedAlbumCard,
  FeaturedSongCard,
} from "../styles/artistDashboard.styles";
import Link from "next/link";
import { FaCopy, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { TabBar } from "../styles/artistDashboardEventsPage.styles";
import useAudio from "../Hooks/useAudio";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import {
  AlbumCard,
  AlbumCardCoverArt,
  SongCard,
  SongCardCoverArt,
  SongCardItem,
  SongCardPlayButton,
} from "../styles/songCard.styles";
import { MdAlbum } from "react-icons/md";
import { GiSoundWaves } from "react-icons/gi";
import CustomTabPanel from "../components/CustomeTabPanel";

interface HomeSongCardProps {
  songName: string;
  albumName: string;
  duration: number;
  songUrl: string;
  coverArt: string;
}

interface HomeAlbumCardProps {
  albumCoverArt: string;
  albumName: string;
  albumTracks: number;
  albumLength: number;
}

const HomeSongCard = ({
  songName,
  albumName,
  duration,
  songUrl,
  coverArt,
}: HomeSongCardProps) => {
  const { playing, toggle } = useAudio({ url: songUrl });

  return (
    <SongCard>
      <Box sx={{ display: "flex", alignItems: "center", width: "45%" }}>
        <SongCardCoverArt imgUrl={coverArt} />
        <Typography variant="h6">{songName}</Typography>
      </Box>
      <SongCardItem width="40%">
        <MdAlbum />
        <Typography variant="body1">{albumName}</Typography>
      </SongCardItem>
      <SongCardItem width="10%">
        <GiSoundWaves />
        <Typography variant="body2">{duration}</Typography>
      </SongCardItem>

     <Box sx={{width:"5%"}}>
     <SongCardPlayButton onClick={toggle}>
        {playing ? <IoIosPause /> : <IoIosPlay />}
      </SongCardPlayButton>
     </Box>
    </SongCard>
  );
};

const HomeAlbumCard = ({
  albumCoverArt,
  albumName,
  albumLength,
  albumTracks,
}: HomeAlbumCardProps) => {
  return (
    <AlbumCard>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AlbumCardCoverArt imgUrl={albumCoverArt} />
        <Box>
          <Typography variant="h6">{albumName}</Typography>
          <Typography variant="body1">Tracks: {albumTracks}</Typography>
          <Typography variant="body1">Length: {albumLength}</Typography>
        </Box>
      </Box>
    </AlbumCard>
  );
};

const ADHomePage = () => {
  const [profilePic, setProfilePic] = useState<string>(
    // "https://placehold.co/600x600/png"
    "https://www.rollingstone.com/wp-content/uploads/2021/05/rembrandts-flashback.jpg"
  );
  const [coverPic, setCoverPic] = useState<string>(
    // "https://placehold.co/1280x720/png"
    "https://londonmumsmagazine.com/wp-content/uploads/2019/07/The-Rembrandts-Via-Satellite-2.jpg"
  );

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Grid item xs={12} md={12} sx={{ height: "50vh", margin: "0" }}>
        <ADHomeCoverBox imgUrl={coverPic}>
          <ADHomeNameArea>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <ADHomeProfilePicture imgUrl={profilePic} />
              <Box sx={{ ml: 1 }}>
                <ADHomeName>The Rembrandts</ADHomeName>
                <ADArtistInfo>American Rock Duo</ADArtistInfo>
                <ADArtistPageUrl>
                  <Link href="">http://www.hearwego.com/wq23s</Link>
                  <FaCopy />
                </ADArtistPageUrl>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                mr: 2,
              }}
            >
              <ADHomeSocialIcons>
                <FaFacebook />
                <AiFillInstagram />
                <FaSquareXTwitter />
              </ADHomeSocialIcons>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ color: "#fff", fontWeight: "600", mb: 0 }}
                >
                  22,522,155
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff" }}>
                  Followers
                </Typography>
              </Box>
            </Box>
          </ADHomeNameArea>
        </ADHomeCoverBox>
      </Grid>
      <Grid item xs={12} md={8} sx={{ margin: 0 }}>
        <FeaturedSongCard>
          <Typography variant="h5" sx={{ fontWeight: "600", mb: 0 }}>
            Featured Songs
          </Typography>
          <ADHomeTabBox>
            <Tabs value={tabValue} onChange={handleChange}>
              <Tab label="Popular" />
              <Tab label="Recent" />
              <Tab label="Upcoming" />
            </Tabs>
          </ADHomeTabBox>
          <CustomTabPanel value={tabValue} index={0} fullWidth={false}>
            <HomeSongCard
              songName="I'll be there for you"
              albumName="L.P."
              duration={3.08}
              songUrl="https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3"
              coverArt="https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg"
            />
            <HomeSongCard
              songName="I'll be there for you"
              albumName="L.P."
              duration={3.08}
              songUrl="https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3"
              coverArt="https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg"
            />
            <HomeSongCard
              songName="I'll be there for you"
              albumName="L.P."
              duration={3.08}
              songUrl="https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3"
              coverArt="https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg"
            />
            <HomeSongCard
              songName="I'll be there for you"
              albumName="L.P."
              duration={3.08}
              songUrl="https://hwgbucket.s3.ap-south-1.amazonaws.com/songs/Numba+Daka+Ma+(Female+version)+-+Hashmi+Sathnara+%5BSONG.LK%5D.mp3"
              coverArt="https://i.pinimg.com/originals/0e/f4/51/0ef451a1c010f30e4d82f48f97c02637.jpg"
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1} fullWidth={false}>
            <Typography>Recent Songs</Typography>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2} fullWidth={false}>
            <Typography>Upcoming Songs</Typography>
          </CustomTabPanel>
        </FeaturedSongCard>
      </Grid>
      <Grid item xs={12} md={4} sx={{ margin: 0 }}>
        <FeaturedAlbumCard>
          <Typography variant="h5" sx={{ fontWeight: "600", mb: 2 }}>
            Featured Albums
          </Typography>
          <Box sx={{ m: 3 }}>
            <HomeAlbumCard
              albumCoverArt="https://i.discogs.com/UvK4JbCFNk0ewmfYkSUjscACrZgJyMdSLRwJrI6al2o/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0Njk4/MTMwLTE1Nzk5MTA2/ODgtMjg5OC5qcGVn.jpeg"
              albumName="L.P."
              albumTracks={15}
              albumLength={67.15}
            />
            <HomeAlbumCard
              albumCoverArt="https://i.discogs.com/UvK4JbCFNk0ewmfYkSUjscACrZgJyMdSLRwJrI6al2o/rs:fit/g:sm/q:90/h:594/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0Njk4/MTMwLTE1Nzk5MTA2/ODgtMjg5OC5qcGVn.jpeg"
              albumName="L.P."
              albumTracks={15}
              albumLength={67.15}
            />
          </Box>
        </FeaturedAlbumCard>
      </Grid>
    </Grid>
  );
};

export default ADHomePage;
