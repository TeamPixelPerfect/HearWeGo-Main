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
  Paper,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
} from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import {
  getClubNewsByArtist,
  getReactsByNews,
  deleteNews,
  addNewsComments,
  getCommentsByNews,
  addNewsReplies,
  getRepliesByNewsComment,
  addNewsReacts,
  deleteNewsComment,
} from "@/app/services/FanClubServices";
import { useAppSelector } from "@/lib/hooks";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { ClubNews, Newscomments, newsreplies } from "@/app/constants/models";

const NewsPage = () => {
  const artist = useAppSelector((state) => state.artist.user);

  const [clubNews, setClubNews] = useState<ClubNews[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClubNewsId, setSelectedClubNewsId] = useState<string | null>(
    null
  );
  const [menuPostId, setMenuPostId] = useState<string | null>(null);
  const [reactsCount, setReactsCount] = useState<{ [key: string]: number }>({});
  const [menuNewsId, setMenuNewsId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<ClubNews | null>(null);
  const [commentsData, setCommentsData] = useState<Newscomments[]>([]);
  const [repliesData, setRepliesData] = useState<{ [key: string]: newsreplies[] }>(
    {}
  );
  const user = useAppSelector((state) => state.user.user);

  const [commentFormData, setCommentFormData] = useState({
    newscommenter: artist?.user.artistName || "",
    newscommentBody: "",
    newscommenter_ProfilePic: artist?.user.profilePicture || "",
    newsId: "",
    timestamps: new Date().toISOString(),
  });

  const [replyFormData, setReplyFormData] = useState({
    newsreplier: "",
    newsreplyBody: "",
    newsreplier_ProfilePic: artist?.user.profilePicture || "",
    newscommentId: "",
    timestamps: new Date().toISOString(),
  });

  const [reactsData, setReactsData] = useState({
    reacter: "",
    postId: "",
    timestamps: new Date().toISOString(),
  });

  const [selectedComment, setSelectedComment] = useState<Newscomments | null>(
    null
  );
  const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    setReplyFormData({
      ...replyFormData,
      newsreplier: artist?.user.artistName || "",
      newsreplier_ProfilePic: artist?.user.profilePicture || "",
    });
  }, [user?.name, user?.profilePicture]);

  useEffect(() => {
    if (artist?.token) {
      getClubNewsByArtist(artist.token, artist?.user?.artist_id || "")
        .then((news) => setClubNews(news.data))
        .catch(console.log);
    }
  }, [artist]);

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

  useEffect(() => {
    if (selectedNews) {
      getCommentsByNews(
        artist?.token ? artist.token : "",
        selectedNews.newsId || ""
      )
        .then((comments) => {
          console.log("Comments: ", comments);
          setCommentsData(comments.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedNews, artist?.token]);

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    news: ClubNews
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuPostId(news?.newsId || "");
  };

  const handleCommentClick = (news: ClubNews) => {
    if (selectedNews && selectedNews.newsId === news.newsId) {
      setSelectedNews(null);
    } else {
      setSelectedNews(news);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await addNewsComments(artist?.token ? artist.token : "", {
        ...commentFormData,
        newsId: selectedNews?.newsId || "",
      });
      setCommentFormData({
        ...commentFormData,
        newscommentBody: "",
      });
      if (selectedNews) {
        getCommentsByNews(
          artist?.token ? artist.token : "",
          selectedNews.newsId || ""
        )
          .then((comments) => {
            console.log("Updated Comments: ", comments);
            setCommentsData(comments.data);
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReplyClick = async (comment: Newscomments) => {
    if (
      selectedComment &&
      selectedComment.newscommentId === comment.newscommentId
    ) {
      setSelectedComment(null);
    } else {
      setSelectedComment(comment);
      try {
        const newsreplies = await getRepliesByNewsComment(
          artist?.token ? artist.token : "",
          comment.newscommentId || ""
        );
        setRepliesData((prevReplies) => ({
          ...prevReplies,
          [comment?.newscommentId || ""]: newsreplies.data,
        }));
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    }
  };

  const handleReplySubmit = async () => {
    try {
      await addNewsReplies(artist?.token ? artist.token : "", {
        ...replyFormData,
        commentId: selectedComment?.newscommentId || "",
      });
      setReplyFormData({
        ...replyFormData,
        newsreplyBody: "",
      });
      if (selectedComment) {
        getRepliesByNewsComment(
          artist?.token ? artist.token : "",
          selectedComment.newscommentId || ""
        )
          .then((newsreplies) => {
            console.log("Updated newsreplies: ", newsreplies);
            setRepliesData((prevReplies) => ({
              ...prevReplies,
              [selectedComment?.newscommentId || ""]: newsreplies.data,
            }));
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  const handleReactClick = async (news: ClubNews) => {
    if (artist?.token && news.newsId) {
      try {
        const reacts = await getReactsByNews(artist.token, news.newsId);
        setReactsCount((prevCount) => ({
          ...prevCount,
          [news.newsId as string]: reacts.data.length,
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

  const handleDeleteClick = (commentId: string | undefined) => {
    deleteNewsComment(artist?.token ? artist.token : "", commentId || "")
      .then(() => {
        console.log("Comment deleted successfully");
        setDeleteSuccessMessage("Comment deleted successfully");
        setSnackbarOpen(true);
        setCommentsData(
          commentsData.filter((comment) => comment.newscommentId !== commentId)
        );
      })
      .catch((error) => console.log(error));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleReplyToComment = (
    newsId: string,
    newscommentId: string,
    replyContent: string
  ) => {
    const reply: Comment = {
      id: Date.now(),
      user: "User",
      content: replyContent,
      profilePicture: "path/to/artist/profile/picture.jpg", // Replace with actual path
      timestamp: new Date().toISOString(),
      isArtist: true,
    };

    const updatedPosts = clubNews.map((news: any) => {
      if (news.id === newsId) {
        const updatedComments = news.comments.map((comment: any) =>
          comment.id === newscommentId
            ? { ...comment, newsreplies: [...(comment.newsreplies || []), reply] }
            : comment
        );
        return { ...news, comments: updatedComments };
      }
      return news;
    });

    setClubNews(updatedPosts);
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
                onClick={(event) =>
                  handleMenuOpen(event, ClubNews.newsId as string)
                }
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
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "1rem",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => handleReactClick(ClubNews)}
                    color="primary"
                  >
                    <FavoriteIcon />
                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                      {reactsCount[ClubNews.newsId as string] || 0}
                    </Typography>
                  </IconButton>
                  <IconButton
                    onClick={() => handleCommentClick(ClubNews)}
                    sx={{ marginLeft: "10px" }}
                  >
                    <CommentIcon />
                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                      Comments
                    </Typography>
                  </IconButton>
                </Box>
              </CardActions>
              {selectedNews && selectedNews.newsId === ClubNews.newsId && (
                <>
                  <Divider sx={{ my: 2 }} />
                  {commentsData.map((comment, index) => (
                    <Paper
                      key={index}
                      sx={{
                        mb: 2,
                        p: 2,
                        // backgroundColor: "#f9f9f9",
                        borderRadius: "10px",
                      }}
                      elevation={1}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={comment.newscommenter_ProfilePic}
                            sx={{ marginRight: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle2">
                              {comment.newscommenter}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {new Date(comment.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              {comment.newscommentBody}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "right",
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              handleDeleteClick(comment.newscommentId)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => handleReplyClick(comment)}>
                            <ReplyIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      {selectedComment &&
                        selectedComment.newscommentId ===
                          comment.newscommentId && (
                          <Box sx={{ ml: 4 }}>
                            {repliesData[comment.newscommentId || ""]?.map(
                              (reply, index) => (
                                <Box
                                  key={index}
                                  sx={{ display: "flex", mb: 1 }}
                                >
                                  <Avatar
                                    src={reply.newsreplier_ProfilePic}
                                    sx={{
                                      marginRight: 2,
                                      marginTop: "8px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                  <Box sx={{ marginTop: "5px" }}>
                                    <Typography variant="subtitle1">
                                      {reply.newsreplier}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="textSecondary"
                                    >
                                      {new Date(
                                        reply.createdAt
                                      ).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2">
                                      {reply.newsreplyBody}
                                    </Typography>
                                  </Box>
                                </Box>
                              )
                            )}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 1,
                                borderRadius: 1,
                                // backgroundColor: "#f1f1f1",
                              }}
                            >
                              <Avatar
                                src={artist?.user.profilePicture}
                                sx={{ marginRight: 2 }}
                              />
                              <TextField
                                placeholder="Write your reply..."
                                fullWidth
                                value={replyFormData.newsreplyBody}
                                onChange={(e) =>
                                  setReplyFormData({
                                    ...replyFormData,
                                    newsreplyBody: e.target.value,
                                  })
                                }
                                variant="outlined"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={handleReplySubmit}
                                        color="primary"
                                      >
                                        <SendIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderRadius: "20px",
                                    },
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        )}
                    </Paper>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 1,
                      // backgroundColor: "#f1f1f1",
                    }}
                  >
                    <Avatar
                      src={artist?.user.profilePicture}
                      sx={{ marginRight: 2 }}
                    />
                    <TextField
                      placeholder="Write your comment..."
                      fullWidth
                      value={commentFormData.newscommentBody}
                      onChange={(e) =>
                        setCommentFormData({
                          ...commentFormData,
                          newscommentBody: e.target.value,
                        })
                      }
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleCommentSubmit}
                              color="primary"
                            >
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "20px",
                          },
                        },
                      }}
                    />
                  </Box>
                </>
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
