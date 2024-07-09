"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Divider,
  Snackbar,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ClubPost, comments, replies, reacts } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";
import {
  getClubPostsByArtist,
  addComments,
  getCommentsByPost,
  getRepliesByComment,
  addReplies,
  deleteComment,
  deletePost,
  updatePost,
  addReacts,
  getReactsByPost,
} from "@/app/services/FanClubServices";
import set from "date-fns/fp/set/index";

const FeedTab = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuPostId, setMenuPostId] = useState<string | null>(null);
  const [clubPost, setClubPost] = useState<ClubPost[]>([]);
  const artist = useAppSelector((state) => state.artist.user);
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  const [commentsData, setCommentsData] = useState<comments[]>([]);
  const [reactsCount, setReactsCount] = useState<{ [key: string]: number }>({});
  const [repliesData, setRepliesData] = useState<{ [key: string]: replies[] }>(
    {}
  );
  const user = useAppSelector((state) => state.user.user);
  const [commentFormData, setCommentFormData] = useState({
    commenter: artist?.user.artistName || "",
    commentBody: "",
    commenter_ProfilePic: artist?.user.profilePicture || "",
    postId: "",
    timestamps: new Date().toISOString(),
  });

  const [replyFormData, setReplyFormData] = useState({
    replier: "",
    replyBody: "",
    replier_ProfilePic:artist?.user.profilePicture || "",
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
  const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    setReplyFormData({
      ...replyFormData,
      replier: artist?.user.artistName || "",
      replier_ProfilePic: artist?.user.profilePicture|| "",
    });
  }
  , [user?.name, user?.profilePicture]);



  useEffect(() => {
    if (artist?.token) {
      getClubPostsByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((post) => {
          console.log("Club Posts: ", post);
          setClubPost(post.data);

          // Fetch comments count for each post
          post.data.forEach((postItem: ClubPost) => {
            getCommentsByPost(artist.token, postItem.postId || "")
              .then((comments) => {
                setCommentsCount((prevCount) => ({
                  ...prevCount,
                  [postItem.postId || ""]: comments.data.length,
                }));
              })
              .catch((error) => console.log(error));
          });

          post.data.forEach((postItem: ClubPost) => {
            getReactsByPost(artist.token, postItem.postId || "")
              .then((reacts) => {
                setReactsCount((prevCount) => ({
                  ...prevCount,
                  [postItem.postId || ""]: reacts.data.length,
                }));
              })
              .catch((error) => console.log(error));
          });
        })
        .catch((error) => console.log(error));
    }
  }, [artist]);

  useEffect(() => {
    if (selectedPost) {
      getCommentsByPost(artist?.token?artist.token:"", selectedPost.postId || "")
        .then((comments) => {
          console.log("Comments: ", comments);
          setCommentsData(comments.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedPost, artist?.token]);

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    post: ClubPost
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuPostId(post?.postId || "");
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
    setMenuPostId(null);
  };

  const handleEditClick = () => {
    handleMoreClose();
  };

  const handleDeleteClick = (commentId: string | undefined) => {
    deleteComment(artist?.token?artist.token:"", commentId || "")
      .then(() => {
        console.log("Comment deleted successfully");
        setDeleteSuccessMessage("Comment deleted successfully");
        setSnackbarOpen(true);
        setCommentsData(
          commentsData.filter((comment) => comment.commentId !== commentId)
        );
      })
      .catch((error) => console.log(error));
  };
  const handleDeletePostClick = () => {
    deletePost(artist?.token?artist.token:"", menuPostId || "")
      .then(() => {
        console.log("Post deleted successfully");
        setDeleteSuccessMessage("Post deleted successfully");
        setSnackbarOpen(true);
        setClubPost(clubPost.filter((post) => post.postId !== menuPostId));
        setSelectedPost(null);
        handleMoreClose();
      })
      .catch((error) => console.log(error));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      await addComments(artist?.token?artist.token:"", {
        ...commentFormData,
        postId: selectedPost?.postId || "",
      });
      setCommentFormData({
        ...commentFormData,
        commentBody: "",
      });
      if (selectedPost) {
        getCommentsByPost(artist?.token?artist.token:"", selectedPost.postId || "")
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

  const handleReplyClick = async (comment: comments) => {
    if (selectedComment && selectedComment.commentId === comment.commentId) {
      setSelectedComment(null);
    } else {
      setSelectedComment(comment);
      try {
        const replies = await getRepliesByComment(
          artist?.token?artist.token:"",
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
      await addReplies(artist?.token?artist.token:"", {
        ...replyFormData,
        commentId: selectedComment?.commentId || "",
      });
      setReplyFormData({
        ...replyFormData,
        replyBody: "",
      });
      if (selectedComment) {
        getRepliesByComment(artist?.token?artist.token:"", selectedComment.commentId || "")
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
    try {
      const reacts = await getReactsByPost(artist?.token?artist.token:"", post.postId || "");
      setReactsCount((prevCount) => ({
        ...prevCount,
        [post.postId || ""]: reacts.data.length,
      }));
    } catch (error) {
      console.error("Error fetching reacts:", error);
    }
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


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "1rem",
      }}
    >
      {clubPost.map((post) => (
        <Card
          key={post.createdAt}
          sx={{
            marginBottom: 2,
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                src={
                  artist?.user?.profilePicture
                    ? artist?.user?.profilePicture
                    : ""
                }
              />
            }
            action={
              <>
                <Tooltip title="Options">
                  <IconButton
                    aria-label="settings"
                    onClick={(event) => handleMoreClick(event, post)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMoreClose}
                >
                  {/* <MenuItem onClick={handleEditClick}>Edit</MenuItem> */}
                  <MenuItem onClick={handleDeletePostClick}>Delete</MenuItem>
                </Menu>
              </>
            }
            title={artist?.user.artistName}
            subheader={new Date(post.createdAt).toLocaleString()}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              sx={{ marginLeft: "10px" }}
            >
              {post.postDescription}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {post.postImage_URL && (
                <img
                  src={post.postImage_URL}
                  alt="Post image"
                  style={{
                    width: "80%",
                    marginTop: "1rem",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{ display: "flex", marginTop: "1rem", alignItems: "center" }}
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
                  Comments  {commentsCount[post.postId as string] || 0}
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
                           src={comment.commenter_ProfilePic}
                          sx={{ marginRight: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle2">
                          {comment.commenter}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
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
                          onClick={() => handleDeleteClick(comment.commentId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleReplyClick(comment)}>
                          <ReplyIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    {selectedComment &&
                      selectedComment.commentId === comment.commentId && (
                        <Box sx={{ ml: 4 }}>
                          {repliesData[comment.commentId || ""]?.map(
                            (reply, index) => (
                              <Box key={index} sx={{ display: "flex", mb: 1 }}>
                                <Avatar
                                  src={reply.replier_ProfilePic}
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
                                    {new Date(reply.createdAt).toLocaleString()}
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
                              src={artist?.user.profilePicture}
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
                    src={artist?.user.profilePicture}
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
          </CardContent>
        </Card>
      ))}

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
    </Box>
  );
};

export default FeedTab;
