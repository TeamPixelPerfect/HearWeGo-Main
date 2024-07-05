"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  Send as SendIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import {
  getClubNewsByArtist,
  getReactsByNews,
  deleteNews,
  getCommentsByNews,
  addNewsComments,
} from "@/app/services/FanClubServices";
import { useAppSelector } from "@/lib/hooks";
import { ClubNews } from "@/app/constants/models";

interface NewsComment {
  newscommentId?: string;
  newscommenter?: string;
  newscommentBody?: string;
  newscommenter_ProfilePic?: string;
  newsId?: string;
  timestamps?: string;
  parentCommentId?: string;
}

const NewsPage = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const user = useAppSelector((state) => state.user.user);

  const [clubNews, setClubNews] = useState<ClubNews[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClubNewsId, setSelectedClubNewsId] = useState<string | null>(
    null
  );
  const [reactsCount, setReactsCount] = useState<{ [key: string]: number }>({});
  const [menuNewsId, setMenuNewsId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedNews, setEditedNews] = useState<ClubNews | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<{
    [key: string]: boolean;
  }>({});
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [comments, setComments] = useState<{ [key: string]: NewsComment[] }>({});
  const [selectedNews, setSelectedNews] = useState<ClubNews | null>(null);
  const [newscommentsData, setNewsCommentsData] = useState<newscomments[]>([]);

  useEffect(() => {
    if (artist?.token) {
      getClubNewsByArtist(artist.token, artist?.user?.artist_id || "")
        .then((news) => setClubNews(news.data))
        .catch(console.log);
    }
  }, [artist]);

  useEffect(() => {
    if (selectedNews) {
  getCommentsByNews(artist?.token, selectedNews.newsId || "")
        .then((newscomments) => {
          console.log("Comments: ", newscomments);
          setNewsCommentsData(newscomments.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedNews, artist?.token]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    ClubNewsId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedClubNewsId(ClubNewsId);
    setMenuNewsId(ClubNewsId); // Set the menuNewsId when the menu opens
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClubNewsId(null);
  };

  const handleReactClick = async (news: ClubNews) => {
    if (artist?.token && news.newsId) {
      try {
        const reacts = await getReactsByNews(artist.token, news.newsId);
        setReactsCount((prevCount) => ({
          ...prevCount,
          [news.newsId]: reacts.data.length,
        }));
      } catch (error) {
        console.error("Error fetching reacts:", error);
      }
    }
  };

  const handleDeleteNewsClick = () => {
    if (artist?.token && menuNewsId) {
      deleteNews(artist.token, menuNewsId)
        .then(() => {
          console.log("News deleted successfully");
          setDeleteSuccessMessage("News deleted successfully");
          setSnackbarOpen(true);
          setClubNews(clubNews.filter((news) => news.newsId !== menuNewsId));
          handleMenuClose();
        })
        .catch((error) => {
          console.error(
            "Error deleting news:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEditNewsClick = (news: ClubNews) => {
    setEditedNews(news);
    setIsEditMode(true);
    handleMenuClose(); // Close the menu after clicking edit
  };

  const handleCommentIconClick = async (newsId: string) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [newsId]: !prev[newsId],
    }));

    if (!comments[newsId]) {
      try {
        const response = await getCommentsByNews(artist.token, newsId);
        setComments((prev) => ({
          ...prev,
          [newsId]: response.data || [], // Ensure response data is an array
        }));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newsId: string
  ) => {
    setCommentText((prev) => ({
      ...prev,
      [newsId]: event.target.value,
    }));
  };

  const handleCommentSubmit = async (newsId: string) => {
    if (artist?.token && commentText[newsId]) {
      try {
        const newComment = {
          newscommenter: user?.userId,
          newscommentBody: commentText[newsId],
          postId: newsId,
        };

        const response = await addNewsComments(artist.token, newComment);
        setComments((prev) => ({
          ...prev,
          [newsId]: [...(prev[newsId] || []), response],
        }));
        setCommentText((prev) => ({
          ...prev,
          [newsId]: "",
        }));
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Latest News
      </Typography>
      <Grid container spacing={3}>
        {clubNews.map((ClubNews) => (
          <Grid item key={ClubNews.newsId} xs={12}>
            <Card
              variant="outlined"
              sx={{ mb: 3, position: "relative", boxShadow: 2 }}
            >
              <IconButton
                aria-label="more"
                aria-controls={`post-menu-${ClubNews.newsId}`}
                aria-haspopup="true"
                onClick={(event) => handleMenuOpen(event, ClubNews.newsId)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 1,
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id={`post-menu-${ClubNews.newsId}`}
                anchorEl={anchorEl}
                open={
                  Boolean(anchorEl) && selectedClubNewsId === ClubNews.newsId
                }
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleEditNewsClick(ClubNews)}>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteNewsClick}>Delete</MenuItem>
              </Menu>

              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      sx={{ bgcolor: deepPurple[500] }}
                      src={artist?.user?.profilePicture || ""}
                      alt={ClubNews.newsPublisher}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {artist?.user?.artistName || ""}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(ClubNews.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {ClubNews.newsTitle || ""}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: grey[800] }}>
                  {ClubNews.newsBody || ""}
                </Typography>
                {ClubNews.newsImage_URL && (
                  <Box
                    sx={{
                      backgroundImage: `url(${ClubNews.newsImage_URL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: 350,
                      position: "relative",
                      borderRadius: 4,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        p: 2,
                        borderRadius: 4,
                      }}
                    >
                      <Typography variant="h4">
                        {ClubNews.newsTitle || ""}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </CardContent>
              <CardActions
                disableSpacing
                sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
              >
                <IconButton onClick={() => handleReactClick(ClubNews)}>
                  <ThumbUpIcon />
                  <Typography sx={{ ml: 1 }}>
                    {reactsCount[ClubNews.newsId || ""] || 0}
                  </Typography>
                </IconButton>
                <IconButton onClick={() => handleCommentIconClick(ClubNews.newsId)}>
                  <CommentIcon />
                </IconButton>
              </CardActions>
              {showCommentInput[ClubNews.newsId] && (
                <CardContent>
                  <List>
                    {Array.isArray(comments[ClubNews.newsId]) &&
                      comments[ClubNews.newsId].map((comment, index) => (
                        <ListItem key={index} alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar src={comment.newscommenter_ProfilePic || ""} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={comment.newscommenter}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {comment.newscommentBody}
                                </Typography>
                                <br />
                                <Typography
                                  component="span"
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {new Date(comment.timestamps || "").toLocaleString()}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      ))}
                  </List>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={commentText[ClubNews.newsId] || ""}
                    onChange={(e) => handleCommentChange(e, ClubNews.newsId)}
                    placeholder="Add a comment..."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleCommentSubmit(ClubNews.newsId)}
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as per your requirement
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {deleteSuccessMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default NewsPage;
