"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Typography,
  TextField,
  InputAdornment,
  Tabs,
  Link,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  Root,
  LeftSide,
  ArtistInfo,
  ProfileAvatar,
  StatsRow,
  StatBox,
  VerticalTabs,
  CustomTab,
  StyledBadge,
  RightSide,
  TopFansContainer,
  FanItem,
  FanInfo,
  FanName,
  FanCountry,
  RecommendedArtistsContainer,
  RecommendedArtistItem,
  RecommendedArtistInfo,
  RecommendedArtistsFollowers,
  RecommendedArtistName,
} from "../../styles/fanclub.styles";
import FeedPage from "./feed/page";
import NewsPage from "./news/page";
import EventsPage from "./events/page";
import PhotosPage from "./photos/page";
import VideosPage from "./videos/page";
import { useAppSelector } from "@/lib/hooks";


const topFans = [
  {
    name: "Chandler Bing",
    country: "New York, USA",
    avatar:
      "https://i.pinimg.com/originals/7f/3a/8d/7f3a8d5db6a8f9d9dbd52c430bbc1f2b.jpg",
  },
  {
    name: "Monica Geller",
    country: "New York, USA",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIuYsSHZGL7PHi0aVOC-VcZn-Ch3Z06zJ_kQ&s",
  },
  {
    name: "Sam Lee",
    country: "UK",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-PvRRmVq7vALXCCF2myKBrCvRnSuvQMOWtQ&s",
  },
  { name: "Alice Brown", country: "Australia", avatar: "/path/to/avatar4.jpg" },
  { name: "Bob Green", country: "USA", avatar: "/path/to/avatar5.jpg" },
  { name: "Eve White", country: "Canada", avatar: "/path/to/avatar6.jpg" },
  { name: "Tom Black", country: "UK", avatar: "/path/to/avatar7.jpg" },
  { name: "Lucy Gray", country: "Australia", avatar: "/path/to/avatar8.jpg" },
  { name: "Mike Orange", country: "USA", avatar: "/path/to/avatar9.jpg" },
  { name: "Sue Purple", country: "Canada", avatar: "/path/to/avatar10.jpg" },
];

const recommendedArtists = [
  { name: "Artist 1", followers: "1200 followers", avatar: "url_to_image1" },
  { name: "Artist 2", followers: "1200 followers", avatar: "url_to_image2" },
  { name: "Artist 3", followers: "1200 followers", avatar: "url_to_image3" },
  { name: "Artist 4", followers: "1200 followers", avatar: "url_to_image4" },
  { name: "Artist 5", followers: "1200 followers", avatar: "url_to_image5" },
  { name: "Artist 6", followers: "1200 followers", avatar: "url_to_image6" },
  { name: "Artist 7", followers: "1200 followers", avatar: "url_to_image7" },
  { name: "Artist 8", followers: "1200 followers", avatar: "url_to_image8" },
  { name: "Artist 9", followers: "1200 followers", avatar: "url_to_image9" },
  { name: "Artist 10", followers: "1200 followers", avatar: "url_to_image10" },
];
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const FanClubPage = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);
  const [showMoreFan, setShowMoreFan] = useState(false);
  const [showMoreRecommendedArtist, setShowMoreRecommendedArtist] =
    useState(false);
  const initialTopFans = topFans.slice(0, 3);
  const remainingFans = topFans.slice(3);
  const initialRecommendedArtists = recommendedArtists.slice(0, 3);
  const remainingRecommendedArtists = recommendedArtists.slice(3);
  const [iconRotation, setIconRotation] = useState(false);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const artistName = "The Rembrandts";
  const artistGenre = "Rock | Duo";
  const fanCount = "97K+ Fans"; // Example fan count
  const profileImageUrl = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHnaJf7dVGS4_YJ7OwOyWC7F7yia--3nJSR7LULSGIS2VpiYFo"; // Replace with actual profile image URL
  const postsCount = 100; // Example posts count
  const eventsCount = 35; // Example events count
  const newsCount = 20; // Example news count

  const toggleShowMoreFan = () => {
    setShowMoreFan(!showMoreFan);
    setIconRotation(!iconRotation);
  };

  const toggleShowMoreArtists = () => {
    setShowMoreRecommendedArtist(!showMoreRecommendedArtist);
    setIconRotation(!iconRotation);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value.toLowerCase();
    // Implement your search logic here
    const filteredFans = topFans.filter((fan) =>
      fan.name.toLowerCase().includes(inputValue)
    );
    console.log(filteredFans);
    // Update state or perform other operations with filtered data
  };

  return (
    <>
      <Root>
        <LeftSide>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
              color: "white",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                flexDirection: "column",
                color: "white",
                justifyContent: "space-between",
              }}
            >
              <ArtistInfo>
                <Typography variant="h5">{artist?.user.artistName}</Typography>
                <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
                  {artist?.user.musicGenres}
                </Typography>
                <StyledBadge color="primary" badgeContent={fanCount}>
                  <ProfileAvatar src={artist?.user.profilePicture} alt={artist?.user.artistName} />
                </StyledBadge>
              </ArtistInfo>

              <StatsRow>
                <StatBox>
                  <Typography variant="h6">{postsCount}</Typography>
                  <Typography variant="body2">Posts</Typography>
                </StatBox>
                <Divider orientation="vertical" flexItem />
                <StatBox>
                  <Typography variant="h6">{eventsCount}</Typography>
                  <Typography variant="body2">Events</Typography>
                </StatBox>
                <Divider orientation="vertical" flexItem />
                <StatBox>
                  <Typography variant="h6">{newsCount}</Typography>
                  <Typography variant="body2">News</Typography>
                </StatBox>
              </StatsRow>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <VerticalTabs
                orientation="vertical"
                value={tabValue}
                onChange={handleTabChange}
              >
                <CustomTab label="Feed" />
                <CustomTab label="News" />
                <CustomTab label="Events" />
                <CustomTab label="Photos" />
                <CustomTab label="Videos" />
              </VerticalTabs>
            </Box>
          </Box>
        </LeftSide>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",

              justifyContent: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search"
              margin="normal"
              select={false}
              sx={{ display: "flex", width: "60%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "gray" }} />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearchInputChange}
            />
          </Box>
          <Box sx={{ flexGrow: 1, padding: "1rem" }}>
            <TabPanel value={tabValue} index={0}>
              <FeedPage />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <NewsPage />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <EventsPage />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <PhotosPage />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <VideosPage />
            </TabPanel>
          </Box>
        </Box>
        <RightSide>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <TopFansContainer>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h5"
                    style={{ flexGrow: 1, fontWeight: "bold" }}
                  >
                    Top Fans
                  </Typography>
                  <ExpandMoreIcon
                    style={{
                      cursor: "pointer",
                      transform: iconRotation
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={toggleShowMoreFan}
                  />
                </Box>
                {initialTopFans.map((fan, index) => (
                  <FanItem key={index}>
                    <Avatar
                      alt={fan.name}
                      src={fan.avatar}
                      sx={{ marginLeft: "0.5rem" }}
                    />
                    <FanInfo>
                      <FanName>{fan.name}</FanName>
                      <FanCountry>{fan.country}</FanCountry>
                    </FanInfo>
                  </FanItem>
                ))}
                {showMoreFan &&
                  remainingFans.map((fan, index) => (
                    <FanItem key={index}>
                      <Avatar alt={fan.name} src={fan.avatar} />
                      <FanInfo>
                        <FanName>{fan.name}</FanName>
                        <FanCountry>{fan.country}</FanCountry>
                      </FanInfo>
                    </FanItem>
                  ))}
                {!showMoreFan && remainingFans.length > 0 && (
                  <Typography></Typography>
                )}
              </TopFansContainer>
            </Box>

            <Box>
              <RecommendedArtistsContainer>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h5"
                    style={{ flexGrow: 1, fontWeight: "bold" }}
                  >
                    Recommended Artists
                  </Typography>
                  <ExpandMoreIcon
                    style={{
                      cursor: "pointer",
                      transform: iconRotation
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={toggleShowMoreArtists}
                  />
                </Box>
                {initialRecommendedArtists.map((artist, index) => (
                  <RecommendedArtistItem key={index}>
                    <Avatar
                      alt={artist.name}
                      src={artist.avatar}
                      sx={{ marginLeft: "0.5rem" }}
                    />
                    <RecommendedArtistInfo>
                      <RecommendedArtistName>
                        {artist.name}
                      </RecommendedArtistName>
                      <RecommendedArtistsFollowers>
                        {artist.followers}
                      </RecommendedArtistsFollowers>
                    </RecommendedArtistInfo>
                  </RecommendedArtistItem>
                ))}
                {showMoreRecommendedArtist &&
                  remainingRecommendedArtists.map((artist, index) => (
                    <RecommendedArtistItem key={index}>
                      <Avatar alt={artist.name} src={artist.avatar} />
                      <RecommendedArtistInfo>
                        <RecommendedArtistName>
                          {artist.name}
                        </RecommendedArtistName>
                        <RecommendedArtistsFollowers>
                          {artist.followers}
                        </RecommendedArtistsFollowers>
                      </RecommendedArtistInfo>
                    </RecommendedArtistItem>
                  ))}
                {!showMoreRecommendedArtist &&
                  remainingRecommendedArtists.length > 0 && (
                    <Typography></Typography>
                  )}
              </RecommendedArtistsContainer>
            </Box>
          </Box>
        </RightSide>
      </Root>
    </>
  );
};

export default FanClubPage;
