"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Tabs,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  RecommendedArtistName,
} from "@/app/styles/fanclub.styles";
import FeedPage from "../feed/page";
import NewsPage from "../news/page";
import EventsPage from "../events/page";
import { useAppSelector } from "@/lib/hooks";
import { getAllArtists } from "@/app/services/ArtistServices";
import { getAllUsers } from "@/app/services/UserServices";
import { Artist, User } from "@/app/constants/models";

const topFans = [
  // Your top fans data here
];

const TabPanel = (props: any) => {
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

interface Props {
  params: { id: string };
}

const FanClubPage = ({ params: { id } }: Props) => {
  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);
  const [showMoreFan, setShowMoreFan] = useState(false);
  const [showMoreRecommendedArtist, setShowMoreRecommendedArtist] =
    useState(false);
  const [iconRotationFan, setIconRotationFan] = useState(false);
  const [iconRotationArtist, setIconRotationArtist] = useState(false);
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getAllArtists().then((res) => {
      console.log("Artist Data......", res.data);
      setArtistData(res.data);
    });
  }, [id]);

  useEffect(() => {
    getAllArtists().then((res) => {
      console.log("Artist Data......", res.data);
      setArtists(res.data);
    });
  }
  , [id]);

  useEffect(() => {
    getAllUsers().then((res) => {
      console.log("User Data......", res.data);
      setUserData(res.data);
    });
  }, [id]);

  const toggleShowMoreFan = () => {
    setShowMoreFan(!showMoreFan);
    setIconRotationFan(!iconRotationFan);
  };

  const toggleShowMoreArtists = () => {
    setShowMoreRecommendedArtist(!showMoreRecommendedArtist);
    setIconRotationArtist(!iconRotationArtist);
  };

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.artistName : 'Unknown';
  };

 const getArtistProfilePicture = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.profilePicture : '';
      };


  const getArtistGenres = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.musicGenres : 'Unknown';
      };  

  const getNumberOfFans = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.numberOfFans : 0;
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
                <Typography variant="h3" 
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: "1rem",
                
                }}
                >{getArtistName(id)}</Typography>
                <Typography variant="h6" sx={{ 
                  fontStyle: "italic",
                  color: "white",
                  marginBottom: "2rem",

                   }}>
                  {getArtistGenres(id)}
                </Typography>
                <StyledBadge color="primary" badgeContent={getNumberOfFans(80)}>
                  <ProfileAvatar src={getArtistProfilePicture(id)} sx={{
                    width: "250px",
                    height: "250px",
                    marginBottom: "3rem",
                    borderRadius: "50%",
                    border: "2px solid white",
                  
                  }}/>
                </StyledBadge>
              </ArtistInfo>

              {/* <StatsRow>
                <StatBox>
                  <Typography variant="h6">100</Typography>
                  <Typography variant="body2">Posts</Typography>
                </StatBox>
                <Divider orientation="vertical" flexItem />
                <StatBox>
                  <Typography variant="h6">35</Typography>
                  <Typography variant="body2">Events</Typography>
                </StatBox>
                <Divider orientation="vertical" flexItem />
                <StatBox>
                  <Typography variant="h6">20</Typography>
                  <Typography variant="body2">News</Typography>
                </StatBox>
              </StatsRow> */}
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
              </VerticalTabs>
            </Box>
          </Box>
        </LeftSide>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box sx={{ flexGrow: 1, padding: "1rem" }}>
            <TabPanel value={tabValue} index={0}>
              <FeedPage artist_id={id} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <NewsPage artist_id={id} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <EventsPage artist_id={id} />
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
                  {/* <ExpandMoreIcon
                    style={{
                      cursor: "pointer",
                      transform: iconRotationFan
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={toggleShowMoreFan}
                  /> */}
                </Box>
                {userData.slice(0, 3).map((fan, index) => (
                  <FanItem key={index}>
                    <Avatar
                      alt={fan.name}
                      src={fan.profilePicture}
                      sx={{ marginLeft: "0.5rem" }}
                    />
                    <FanInfo>
                      <FanName>{fan.name}</FanName>
                      <FanCountry>{fan.country}</FanCountry>
                    </FanInfo>
                  </FanItem>
                ))}
                {showMoreFan &&
                  userData.slice(3).map((fan, index) => (
                    <FanItem key={index}>
                      <Avatar alt={fan.name} src={fan.profilePicture} />
                      <FanInfo>
                        <FanName>{fan.name}</FanName>
                        <FanCountry>{fan.country}</FanCountry>
                      </FanInfo>
                    </FanItem>
                  ))}
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
                  {/* <ExpandMoreIcon
                    style={{
                      cursor: "pointer",
                      transform: iconRotationArtist
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={toggleShowMoreArtists}
                  /> */}
                </Box>
                {artistData.slice(0, 3).map((artist, index) => (
                  <RecommendedArtistItem key={index}>
                    <Avatar
                      alt={artist?.artistName as string}
                      src={artist?.profilePicture as string}
                      sx={{ marginLeft: "0.5rem" }}
                    />
                    <RecommendedArtistInfo>
                      <RecommendedArtistName>
                        {artist?.artistName as string}
                      </RecommendedArtistName>
                      <RecommendedArtistName>
                        {artist?.country as string}
                      </RecommendedArtistName>
                    </RecommendedArtistInfo>
                  </RecommendedArtistItem>
                ))}
                {showMoreRecommendedArtist &&
                  artistData.slice(3).map((artist, index) => (
                    <RecommendedArtistItem key={index}>
                      <Avatar
                        alt={artist.artistName as string}
                        src={artist.profilePicture as string}
                      />
                      <RecommendedArtistInfo>
                        <RecommendedArtistName>
                          {artist.artistName as string}
                        </RecommendedArtistName>
                        <RecommendedArtistName>
                          {artist.country as string}
                        </RecommendedArtistName>
                      </RecommendedArtistInfo>
                    </RecommendedArtistItem>
                  ))}
              </RecommendedArtistsContainer>
            </Box>
          </Box>
        </RightSide>
      </Root>
    </>
  );
}
         
 
export default FanClubPage;
