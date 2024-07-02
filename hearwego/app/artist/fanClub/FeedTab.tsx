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
  Button,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { ClubPost, comments } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";
import {
  getClubPostsByArtist,
  addComments,
  getCommentsByPost,
} from "@/app/services/FanClubServices";

const FeedTab = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clubPost, setClubPost] = useState<ClubPost[]>([]);
  const [newComment, setNewComment] = useState("");
  const artist = useAppSelector((state) => state.artist.user);
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  const [commentsData, setCommentsData] = useState<comments[]>([]);
  const user = useAppSelector((state) => state.user.user);
  const [commentFormData, setCommentFormData] = useState({
    commenter: user?.username || "",
    commentBody: "",
    commenter_ProfilePic: user?.profilePicture || "",
    postId: "",
    timestamps: new Date().toISOString(),
  });

  useEffect(() => {
    if (artist?.token) {
      getClubPostsByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((post) => {
          console.log("Club Posts: ", post);
          setClubPost(post.data);
        })
        .catch((error) => console.log(error));
    }
  }, [artist]);

  useEffect(() => {
    if (selectedPost) {
      getCommentsByPost(artist.token, selectedPost.postId || "")
        .then((comments) => {
          console.log("Comments: ", comments);
          setCommentsData(comments.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedPost, artist.token]);

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    post: ClubPost
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMoreClose();
  };

  const handleDeleteClick = () => {
    handleMoreClose();
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
      await addComments(artist.token, {
        ...commentFormData,
        postId: selectedPost?.postId || "",
      });
      setCommentFormData({
        ...commentFormData,
        commentBody: "",
      });
      if (selectedPost) {
        getCommentsByPost(artist.token, selectedPost.postId || "")
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

  return (
    <Box>
      {clubPost.map((post) => (
        <Card
          key={post.createdAt}
          sx={{
            marginBottom: 2,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
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
                  <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                  <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                </Menu>
              </>
            }
            title={artist?.user.artistName}
            subheader={new Date(post.createdAt).toLocaleString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.postDescription}
            </Typography>
            {post.postImage_URL && (
              <img
                src={post.postImage_URL}
                alt="Post image"
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
            )}
            <Box
              sx={{ display: "flex", marginTop: "1rem", alignItems: "center" }}
            >
              <IconButton>
                <ThumbUpIcon />
              </IconButton>
              <IconButton onClick={() => handleCommentClick(post)}>
                <CommentIcon />
              </IconButton>
            </Box>

            {selectedPost && selectedPost.postId === post.postId && (
              <>
                <Divider sx={{ my: 2 }} />
                {commentsData.map((comment, index) => (
                  <Box key={index} sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
                    <Box sx={{ display: "flex", mb: 1 }}>
                      <Avatar
                        src={comment.commenter_ProfilePic}
                        sx={{ marginRight: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle2">
                          {comment.commenter}
                        </Typography>
                        <Typography variant="body2">
                          {comment.commentBody}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(comment.timestamps).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  <Avatar src={user?.profilePicture} sx={{ marginRight: 2 }} />
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
    </Box>
  );
};

export default FeedTab;
