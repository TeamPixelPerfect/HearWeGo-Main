"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  TextField,
  Container,
  Grid,
  Paper,
  Button,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InputAdornment from "@mui/material/InputAdornment";
import { useAppSelector } from "@/lib/hooks";
import {
  getClubPostsByArtist,
  addComments,
  getCommentsByPost,
  getRepliesByComment,
  addReplies,
  getReactsByPost,
  addReacts,
} from "@/app/services/FanClubServices";
import {
  ClubPost,
  comments,
  replies,
  reacts,
  Artist,
} from "../../../constants/models";
import { getArtist, getArtistV2 } from "@/app/services/ArtistServices";
import { getAllArtists } from "@/app/services/ArtistServices";
// type Post = {
//   id: number;
//   title: string;
//   content: string;
//   image?: string;
//   profilePicture: string;
//   user: string;
//   timestamp: string;
//   comments: Comment[];
// };

interface Props {
  artist_id: string;
}
const FanClubFanPage = ({ artist_id }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const [menuPostId, setMenuPostId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clubPost, setClubPost] = useState<ClubPost[]>([]);
  const [artist, setArtist] = useState<any>();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  const [commentsData, setCommentsData] = useState<comments[]>([]);
  const [reactsCount, setReactsCount] = useState<{ [key: string]: number }>({});
  const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>(
    {}
  );

  const [repliesData, setRepliesData] = useState<{ [key: string]: replies[] }>(
    {}
  );
  const [userReactedPosts, setUserReactedPosts] = useState<Set<string>>(
    new Set()
  );

  const [commentFormData, setCommentFormData] = useState({
    commenter: user?.name as string,
    commentBody: "",
    commenter_ProfilePic: user?.profilePicture as string,
    postId: "",
    timestamps: new Date().toISOString(),
  });

  const getArtistName = (artistId) => {
    const artist = artists.find(artist => artist?.user._id === artistId);
    return artist ? artist?.user.artistName : 'Unknown';
  };

  useEffect(() => {
    if(user?.token) {
      setCommentFormData((prevData) => ({
        ...prevData,
        commenter: user.name,
        commenter_ProfilePic: user.profilePicture,
      }));
    }
  }
  , [user?.name, user?.profilePicture]);

  const [replyFormData, setReplyFormData] = useState({
    replier: "",
    replyBody: "",
    replier_ProfilePic:user?.profilePicture || "",
    commentId: "",
    timestamps: new Date().toISOString(),
  });

  const [reactsData, setReactsData] = useState({
    reacter: "",
    postId: "",
    timestamps: new Date().toISOString(),
  });

  const [selectedComment, setSelectedComment] = useState<comments | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (user?.token) {
      getClubPostsByArtist(user?.token as string, artist_id)
        .then(async (post) => {
          console.log("Club Posts: ", post);
          setClubPost(post.data);

          // Fetch reacts count for each post
          const reactsPromises = post.data.map((p: ClubPost) =>
            getReactsByPost(user?.token ? user.token : "", p.postId as string)
          );
          const reactsResults = await Promise.all(reactsPromises);
          const reactsCountData: { [key: string]: number } = {};
          reactsResults.forEach((reacts, index) => {
            reactsCountData[post.data[index].postId] = reacts.data.length;
          });
          setReactsCount(reactsCountData);

          // Fetch comments count for each post
          const commentsPromises = post.data.map((p: ClubPost) =>
            getCommentsByPost(user?.token ? user.token : "", p.postId as string)
          );
          const commentsResults = await Promise.all(commentsPromises);
          const commentsCountData: { [key: string]: number } = {};
          commentsResults.forEach((comments, index) => {
            commentsCountData[post.data[index].postId] = comments.data.length;
          });
          setCommentsCount(commentsCountData);
        })
        .catch((error) => console.log(error));
    }

    getArtistV2(artist_id).then((res) => {
      setArtist(res.user);
    });
  }, [artist_id, user?.token]);

  useEffect(() => {
    if (selectedPost) {
      getCommentsByPost(
        user?.token ? user.token : "",
        selectedPost.postId || ""
      )
        .then((comments) => {
          console.log("Comments: ", comments);
          setCommentsData(comments.data);
          // setCommentsCount((prevCount) => ({
          //   ...prevCount,
          //   [selectedPost.postId as string]: comments.data.length,
          // }));
        })
        .catch((error) => console.log(error));
    }
  }, [selectedPost, user?.token]);

  useEffect(() => {
    setReplyFormData((prevData) => ({
      ...prevData,
      replier: user?.name as string,
      replier_ProfilePic: user?.profilePicture as string,
    }));
  }
  , [user?.name, user?.profilePicture]);

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    post: ClubPost
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuPostId(post?.postId || "");
  };

  const handleCommentClick = (post: ClubPost) => {
    if (selectedPost && selectedPost.postId === post.postId) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await addComments(user?.token ? user.token : "", {
        ...commentFormData,
        postId: selectedPost?.postId || "",
      });
      setCommentFormData({
        ...commentFormData,
        commentBody: "",
      });
      if (selectedPost) {
        getCommentsByPost(
          user?.token ? user.token : "",
          selectedPost.postId || ""
        )
          .then((comments) => {
            console.log("Updated Comments: ", comments);
            setCommentsData(comments.data);
            setCommentsCount((prevCount) => ({
              ...prevCount,
              [selectedPost.postId as string]: comments.data.length,
            }));
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReplyClick = async (comment: comments) => {
    if (selectedComment && selectedComment.commentId === comment.commentId) {
      setSelectedComment(null);
    } else {
      setSelectedComment(comment);
      try {
        const replies = await getRepliesByComment(
          user?.token ? user.token : "",
          comment.commentId || ""
        );
        setRepliesData((prevReplies) => ({
          ...prevReplies,
          [comment?.commentId || ""]: replies.data,
        }));
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    }
  };

  const handleReplySubmit = async () => {
    try {
      await addReplies(user?.token ? user.token : "", {
        ...replyFormData,
        commentId: selectedComment?.commentId || "",
      });
      setReplyFormData({
        ...replyFormData,
        replyBody: "",
      });
      if (selectedComment) {
        getRepliesByComment(
          user?.token ? user.token : "",
          selectedComment.commentId || ""
        )
          .then((replies) => {
            console.log("Updated Replies: ", replies);
            setRepliesData((prevReplies) => ({
              ...prevReplies,
              [selectedComment?.commentId || ""]: replies.data,
            }));
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleReactClick = async (post: ClubPost) => {
    if (userReactedPosts.has(post.postId as string)) {
      console.log("User has already reacted to this post");
      return;
    }

    try {
      // Send the react to the backend
      await addReacts(user?.token ? user.token : "", {
        reacter: user?.name,
        postId: post.postId,
        timestamps: new Date().toISOString(),
      });

      // Fetch updated reacts count
      setReactsCount((prevCount) => ({
        ...prevCount,
        [post.postId || ""]: (prevCount[post.postId || ""] || 0) + 1,
      }));

      // Mark this post as reacted by the user
      setUserReactedPosts((prevSet) =>
        new Set(prevSet).add(post.postId as string)
      );
    } catch (error) {
      console.error("Error adding react:", error);
    }
  };

  const handleDialogOpen = (type: "post" | "news") => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
  };

  const handleAddComment = (postId: number, comment: Comment) => {
    const updatedPosts = clubPost.map((post: any) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });
    setClubPost(updatedPosts);
  };

  const handleReplyToComment = (
    postId: string,
    commentId: string,
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

    const updatedPosts = clubPost.map((post: any) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment: any) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setClubPost(updatedPosts);
  };

  const handleLikePost = (postId: number) => {
    // Placeholder for future backend integration
    // Find the post and update its likes
    const updatedPosts = clubPost.map((post: any) =>
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    setClubPost(updatedPosts);
  };

  const handleShowComments = (postId: number) => {
    const updatedPosts = clubPost.map((post: any) =>
      post.id === postId ? { ...post, showComments: !post.showComments } : post
    );
    setClubPost(updatedPosts);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Feed
          </Typography>
        </Grid>
        {artist &&
          clubPost.map((post) => {
            return (
              <Grid item xs={12} key={post?.artistId}>
                <Paper
                  sx={{
                    p: 2,
                    marginBottom: 2,
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      alt="Poster Profile Picture"
                      src={artist?.profilePicture as string}
                      sx={{ marginRight: 2 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {artist?.artistName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(post?.createdAt as string).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body1" gutterBottom>
                    {post.postDescription}
                  </Typography>

                  {post.postImage_URL && (
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: 16,
                        marginBottom: 16,
                      }}
                    >
                      <img
                        src={post.postImage_URL}
                        alt={post.postType}
                        style={{
                          width: "90%",
                          height: "400px",
                          //  maxWidth: "60%",
                          //   minWidth: "60%",
                          // maxHeight: "40%",
                        }}
                      />
                    </div>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={() => handleReactClick(post)}
                      color="primary"
                    >
                      <FavoriteIcon />
                      <Typography variant="body2" style={{ marginLeft: 8 }}>
                        {reactsCount[post.postId as string] || 0}
                      </Typography>
                    </IconButton>
                    <IconButton
                      onClick={() => handleCommentClick(post)}
                      sx={{ marginLeft: "10px" }}
                    >
                      <CommentIcon />
                      <Typography variant="body2" style={{ marginLeft: 8 }}>
                        Comments {commentsCount[post.postId as string] || 0}
                      </Typography>
                    </IconButton>
                  </Box>
                  {selectedPost && selectedPost.postId === post.postId && (
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
                                src=
                               
                                    {comment.commenter_ProfilePic as string}
            
                                sx={{ marginRight: 2 }}
                              />
                              <Box>
                                <Typography variant="subtitle2">
                                  {comment.commenter}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  {new Date(comment.createdAt).toLocaleString()}
                                </Typography>
                                <Typography variant="body2">
                                  {comment.commentBody}
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
                            selectedComment.commentId === comment.commentId && (
                              <Box sx={{ ml: 4 }}>
                                {repliesData[comment.commentId || ""]?.map(
                                  (reply, index) => (
                                    <Box
                                      key={index}
                                      sx={{ display: "flex", mb: 1 }}
                                    >
                                      <Avatar
                                        src={reply.replier_ProfilePic as string}
                                        sx={{
                                          marginRight: 2,
                                          marginTop: "8px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                      <Box sx={{ marginTop: "5px" }}>
                                        <Typography variant="subtitle1">
                                          {reply.replier}
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
                                          {reply.replyBody}
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
                                    value={replyFormData.replyBody}
                                    onChange={(e) =>
                                      setReplyFormData({
                                        ...replyFormData,
                                        replyBody: e.target.value,
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
                          src={user?.profilePicture as string}
                          sx={{ marginRight: 2 }}
                        />
                        <TextField
                          placeholder="Write your comment..."
                          fullWidth
                          value={commentFormData.commentBody}
                          onChange={(e) =>
                            setCommentFormData({
                              ...commentFormData,
                              commentBody: e.target.value,
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
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default FanClubFanPage;
