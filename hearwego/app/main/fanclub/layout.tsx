"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Icon from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

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

const FanClubPage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [showMoreFan, setShowMoreFan] = useState(false);
    const [showMoreRecommendedArtist, setShowMoreRecommendedArtist] = useState(false);
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
  const profileImageUrl =
    "data:image/jpeg;base64,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"; // Replace with actual profile image URL
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

const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    // Implement your search logic here
    // Example: Filter topFans based on fan name containing input value
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
              <ArtistInfo>
                <Typography variant="h5">{artistName}</Typography>
                <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
                  {artistGenre}
                </Typography>
                <StyledBadge color="primary" badgeContent={fanCount}>
                  <ProfileAvatar src={profileImageUrl} alt={artistName} />
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

              {/* Vertical Tabs */}
              <Box mt={2}>
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
            </LeftSide>
      

            <Box
            mb={3}
            sx={{
              width: "100%",
              display: "flex",
            //   alignItems: "center",
              justifyContent: "center",
              borderRadius: "40px",
            }}
          >
         
              <TextField
                variant="outlined"
                placeholder="Search"
                margin="normal"
              
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "gray" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                    display: "flex", width: "60%"}}
              />
            </Box>

        <RightSide>
          <Box>
            <TopFansContainer>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Top Fans
                </Typography>
                <ExpandMoreIcon
                  style={{
                    cursor: "pointer",
                    transform: iconRotation ? "rotate(180deg)" : "rotate(0deg)",
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
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Recommended Artists
                </Typography>
                <ExpandMoreIcon
                  style={{
                    cursor: "pointer",
                    transform: iconRotation ? "rotate(180deg)" : "rotate(0deg)",
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
                    <RecommendedArtistName>{artist.name}</RecommendedArtistName>
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
                      <RecommendedArtistName>{artist.name}</RecommendedArtistName>
                      <RecommendedArtistsFollowers>
                      {artist.followers}
                    </RecommendedArtistsFollowers>
                    </RecommendedArtistInfo>
                    </RecommendedArtistItem>
                ))}
              {!showMoreRecommendedArtist && remainingRecommendedArtists.length > 0 && (
                <Typography></Typography>
              )}
            </RecommendedArtistsContainer>
          </Box>
        </RightSide>
       
        </Root>
    </>
  );
};

export default FanClubPage;
