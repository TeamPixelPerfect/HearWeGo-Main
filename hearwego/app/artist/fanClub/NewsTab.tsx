"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Avatar,
  Box,
  IconButton,
  Paper,
  Menu,
  MenuItem,

} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import {
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { getClubNewsByArtist ,getReactsByNews} from "@/app/services/FanClubServices";
import { useAppSelector } from "@/lib/hooks";
import { ClubNews } from "@/app/constants/models";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const NewsPage = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [clubNews, setClubNews] = useState<ClubNews[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClubNewsId, setselectedClubNewsId] = useState<String | null>(null);
  const [reactsCount, setReactsCount] = useState<{ [key: string]: number }>({});
  const [ news, setNews] = useState<ClubNews[]>([]);

  useEffect(() => {
    if (artist?.token){
      getClubNewsByArtist(artist.token,artist?.user?.artist_id? artist.user.artist_id:"")
      .then((news) => {
        console.log("Club News: ", news);
        setClubNews(news.data);
      })

      .catch((error) => console.log(error));
    }
  },[]);
    
  
 const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    ClubNewsId: String
  ) => {
    setAnchorEl(event.currentTarget);
    setselectedClubNewsId(ClubNewsId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setselectedClubNewsId(null);
  };

  const handleSelectImage = (newsId: string, imageUrl: string) => {
    setClubNews((prevPosts) =>
      prevPosts.map((ClubNews) =>
        ClubNews.newsId === newsId ? { ...ClubNews, imageUrl } : ClubNews
      )
    );
  };

  const handleReactClick = async (news: ClubNews) => {
    try {
      const reacts = await getReactsByNews(artist?.token, news.newsId || "");
      setReactsCount((prevCount) => ({
        ...prevCount,
        [news.newsId || ""]: reacts.data.length,
      }));
    } catch (error) {
      console.error("Error fetching reacts:", error);
    }
  };
  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        News
      </Typography>
      <Grid container spacing={3}>
        {clubNews.map((ClubNews) => (
          <Grid item key={ClubNews.newsId} xs={12}>
            <Card variant="outlined" sx={{ margin: "10px" }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      sx={{ bgcolor: deepPurple[500] }}
                      src={artist?.user?.profilePicture? artist?.user?.profilePicture:""}
                      alt={ClubNews.newsPublisher}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {artist?.user?.artistName? artist?.user?.artistName:""}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(ClubNews.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              
              <Box position="relative">
              <Typography variant="h6">
                    {ClubNews.newsTitle? ClubNews.newsTitle:""}
                  </Typography>
                <Typography variant="body1">
                  {ClubNews.newsBody? ClubNews.newsBody:""}
                </Typography>
                <img
                  src={ClubNews.newsImage_URL? ClubNews.newsImage_URL:""}
                  alt={ClubNews.newsTitle? ClubNews.newsTitle:""}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  bgcolor="rgba(0, 0, 0, 0.5)"
                  color="white"
                  p={2}
                >
                  <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    {ClubNews.newsTitle? ClubNews.newsTitle:""}
                  </Typography>
                </Box>
              </Box>
             
              <CardActions>
              <Box
              sx={{ display: "flex", alignItems: "center",backgroundColor:"red" }}
            >
              <IconButton onClick={() => handleReactClick(news)}>
                <ThumbUpIcon />
              </IconButton>
              <Typography> : {reactsCount[news.newsId || ""] || 0}</Typography>
             
            </Box>
            </CardActions>
            <CardActions>
      
                <Box sx={{ marginLeft:"auto",backgroundColor:"blue"}}>
                  <IconButton
                    aria-label="more"
                    aria-controls={`post-menu-${ClubNews.newsId}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, ClubNews.newsId as string)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`post-menu-${ClubNews.newsId}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedClubNewsId === ClubNews.newsId}
                    onClose={handleMenuClose}
                  >
                    <MenuItem >
                      Edit
                    </MenuItem>
                    <MenuItem >
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage;
