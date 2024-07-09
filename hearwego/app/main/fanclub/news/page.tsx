"use client";
import React, { useState, useEffect } from "react";
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
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import {
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Reply as ReplyIcon,
  AddComment as AddCommentIcon,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import {
  ClubNews,
  Newscomments,
  newsreplies,
  newsreacts,
  Artist,
} from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import {
  getClubNewsByArtist,
  addNewsComments,
  getCommentsByNews,
  addNewsReplies,
  getRepliesByNewsComment,
  addNewsReacts,
  getReactsByNews,
} from "@/app/services/FanClubServices";
import { getArtist, getArtistV2 } from "@/app/services/ArtistServices";
import { getAllArtists } from "@/app/services/ArtistServices";
// Dummy data for posts
const initialPosts = [
  {
    id: 1,
    artistName: "The Rembrandts",
    profileImageUrl:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHnaJf7dVGS4_YJ7OwOyWC7F7yia--3nJSR7LULSGIS2VpiYFo",
    title: "New Album Release",
    content: "Exciting news about the upcoming album!",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5b18735a3917ee20d18a2117/1549322017285-94FTON4XM8J7B5R9J2VX/TheRembrandts2018-101_R.jpg",
    postTime: new Date().toISOString(),
    likes: 10,
    comments: [
      {
        id: 1,
        commenterName: "Alice",
        commenterImageUrl: "https://randomuser.me/api/portraits/women/11.jpg",
        commentTime: new Date().toISOString(),
        commentText: "Great news! Looking forward to it.",
        replies: [],
      },
    ],
    showComments: false,
  },
  {
    id: 2,
    artistName: "The Rembrandts",
    profileImageUrl:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHnaJf7dVGS4_YJ7OwOyWC7F7yia--3nJSR7LULSGIS2VpiYFo",
    title: "Concert Tour Announcement",
    content: "Tour dates and locations revealed!",
    imageUrl: "https://picsum.photos/id/1018/500/300",
    postTime: new Date().toISOString(),
    likes: 15,
    comments: [],
    showComments: false,
  },
];

// interface Post {
//   id: number;
//   artistName: string;
//   profileImageUrl: string;
//   title: string;
//   content: string;
//   imageUrl: string;
//   postTime: string;
//   likes: number;
//   comments: Comment[];
//   showComments: boolean;
// }

interface Props {
  artist_id: string;
}
const NewsPage = ({ artist_id }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const [menuPostId, setMenuPostId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clubNews, setClubNews] = useState<ClubNews[]>([]);
  const [replyingTo, setReplyingTo] = useState<{
    postId: number;
    commentId: number;
  } | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artist, setArtist] = useState<any>();
  const [selectedNews, setSelectedNews] = useState<ClubNews | null>(null);
  const [commentsData, setCommentsData] = useState<Newscomments[]>([]);
  const [commentCounts, setCommentCounts] = useState<{ [key: string]: number }>(
    {}
  );
  const [reactsCount, setReactsCount] = useState<{ [key: string]: number }>({});

  const [repliesData, setRepliesData] = useState<{
    [key: string]: newsreplies[];
  }>({});
  const [userReactedNews, setUserReactedNews] = useState<Set<string>>(
    new Set()
  );
  
  const [commentFormData, setCommentFormData] = useState({
    newscommenter:user?.name as string,
    newscommentBody: "",
    newscommenter_ProfilePic: user?.profilePicture || "",
    newsId: "",
    timestamps: new Date().toISOString(),
  });
  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist.artist_id === artistId);
    return artist ? artist.artistName : 'Unknown';
  };

useEffect(() => {
  if(user?.token) {
    setCommentFormData((prevData) => ({
      ...prevData,
      newscommenter: user.name,
      newscommenter_ProfilePic: user.profilePicture,
    }));
  }
}
, [user?.name, user?.profilePicture]);

  const [replyFormData, setReplyFormData] = useState({
    newsreplier: "",
    newsreplyBody: "",
    newsreplier_ProfilePic: user?.profilePicture || "",
    newscommentId: "",
    timestamps: new Date().toISOString(),
  });

  const [reactsData, setReactsData] = useState({
    newsreacter: "",
    newId: "",
    timestamps: new Date().toISOString(),
  });

  const [selectedComment, setSelectedComment] = useState<Newscomments | null>(
    null
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (user?.token) {
      getClubNewsByArtist(user?.token as string, artist_id)
        .then(async (news) => {
          console.log("Club news: ", news);
          setClubNews(news.data);

          // Fetch comment and react counts for each news
          const commentCounts = {};
          const reactCounts = {};
          for (const item of news.data) {
            const comments = await getCommentsByNews(user?.token? user.token:"", item.newsId);
            commentCounts[item.newsId ] = comments.data.length;

            const reacts = await getReactsByNews(user?.token? user.token:"", item.newsId);
            reactCounts[item.newsId] = reacts.data.length;
          }
          setCommentCounts(commentCounts);
          setReactsCount(reactCounts);
        })
        .catch((error) => console.log(error));
    }

    getArtistV2(artist_id).then((res) => {
      setArtist(res.user);
    });
  }, [artist_id, user?.token]);

  useEffect(() => {
    if (selectedNews) {
      getCommentsByNews(user?.token? user.token:"", selectedNews.newsId || "")
        .then((newscomments) => {
          console.log("NewsComments: ", newscomments);
          setCommentsData(newscomments.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedNews, user?.token]);

  const handleCommentClick = (news: ClubNews) => {
    if (selectedNews && selectedNews.newsId === news.newsId) {
      setSelectedNews(null);
    } else {
      setSelectedNews(news);
    }
  };

  useEffect(() => {
    setReplyFormData((prevData) => ({
      ...prevData,
      newsreplier: user?.name as string,
      newsreplier_ProfilePic: user?.profilePicture as string,
    }));
  }
  , [user?.name, user?.profilePicture]);

  const handleCommentSubmit = async () => {
    try {
      await addNewsComments(user?.token? user.token:"", {
        ...commentFormData,
        newsId: selectedNews?.newsId || "",
      });
      setCommentFormData({
        ...commentFormData,
        newscommentBody: "",
      });
      if (selectedNews) {
        const comments = await getCommentsByNews(
          user?.token? user.token:"",
          selectedNews.newsId || ""
        );
        console.log("Updated Comments: ", comments);
        setCommentsData(comments.data);
        setCommentCounts((prevCounts) => ({
          ...prevCounts,
          [selectedNews.newsId as string]: comments.data.length,
        }));
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
          user?.token? user.token:"",
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
      await addNewsReplies(user?.token? user.token:"", {
        ...replyFormData,
        newscommentId: selectedComment?.newscommentId || "",
      });
      setReplyFormData({
        ...replyFormData,
        newsreplyBody: "",
      });
      if (selectedComment) {
        getRepliesByNewsComment(
          user?.token? user.token:"",
          selectedComment.newscommentId || ""
        )
          .then((newsreplies) => {
            console.log("Updated Replies: ", newsreplies);
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
    if (userReactedNews.has(news.newsId as string)) {
      console.log("User has already reacted to this post");
      return;
    }

    try {
      await addNewsReacts(user?.token? user.token:"", {
        newsreacter: user?.name,
        newsId: news.newsId,
        timestamps: new Date().toISOString(),
      });

      const reacts = await getReactsByNews(user?.token? user.token:"", news.newsId || "");
      setReactsCount((prevCount) => ({
        ...prevCount,
        [news.newsId as string]: reacts.data.length,
      }));

      setUserReactedNews((prevSet) => new Set(prevSet).add(news.newsId as string));
    } catch (error) {
      console.error("Error adding react:", error);
    }
  };

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    post: ClubNews
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuPostId(news?.newsId || "");
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Latest News
          </Typography>
        </Grid>
        {artist &&
          clubNews.map((news) => {
            return (
              <Grid item xs={12} key={ClubNews?.artistId}>
                <Card variant="outlined" sx={{ margin: "10px",height:"100%"}}>
                  <CardContent>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Avatar
                          alt="Poster Profile Picture"
                          src={artist?.profilePicture as string}
                          sx={{ marginRight: 2 }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">
                          {artist?.artistName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(news.createdAt).toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h5" color="text.secondary">
                      {news.newsTitle || ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {news.newsBody || ""}
                    </Typography>
                  </CardContent>
                  <Box position="relative">
                    <img
                      src={news.newsImage_URL}
                      alt={news.newsPublisher}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                      }}
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
                        {news.newsTitle || ""}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => handleReactClick(news)}
                      color="primary"
                    >
                      <FavoriteIcon />
                      <Typography variant="body2" style={{ marginLeft: 8 }}>
                        {reactsCount[news.newsId as string] || 0}
                      </Typography>
                    </IconButton>
                    <IconButton
                      onClick={() => handleCommentClick(news)}
                      sx={{ marginLeft: "10px" }}
                    >
                      <CommentIcon />
                      <Typography variant="body2" style={{ marginLeft: 8 }}>
                        Comments  {commentCounts[news.newsId as string] || 0}
                      </Typography>
                    </IconButton>
                  </Box>
                  {selectedNews && selectedNews.newsId === news.newsId && (
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
                                  {comment.newscommenter}                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
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
                                onClick={() => handleReplyClick(comment)}
                              >
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
                                    src={user?.profilePicture}
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
                          src={user?.profilePicture}
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
            );
          })}
      </Grid>
    </Container>
  );
};

export default NewsPage;
