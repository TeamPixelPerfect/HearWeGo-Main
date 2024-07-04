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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
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
import { useAppSelector } from "@/lib/hooks";
import { getClubPostsByArtist } from "@/app/services/FanClubServices";
import { ClubPost, comments, replies, reacts } from "../../constants/models";

type Comment = {
  id: number;
  user: string;
  content: string;
  profilePicture: string;
  timestamp: string;
  isArtist?: boolean;
  replies?: Comment[];
};

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  profilePicture: string;
  user: string;
  timestamp: string;
  comments: Comment[];
};

const FanClubFanPage = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [clubPost, setClubPost] = useState<Post[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

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

  const handleDialogOpen = (type: "post" | "news") => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewPostTitle("");
    setNewPostContent("");
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = clubPost.filter((post) => post.id !== postId);
    setClubPost(updatedPosts);
  };

  const handleEditPost = (postId: number, updatedPost: Post) => {
    const updatedPosts = clubPost.map((post) =>
      post.id === postId ? updatedPost : post
    );
    setClubPost(updatedPosts);
  };

  const handleAddComment = (postId: number, comment: Comment) => {
    const updatedPosts = clubPost.map((post) => {
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
    postId: number,
    commentId: number,
    replyContent: string
  ) => {
    const reply: Comment = {
      id: Date.now(),
      user: "Artist",
      content: replyContent,
      profilePicture: "path/to/artist/profile/picture.jpg", // Replace with actual path
      timestamp: new Date().toISOString(),
      isArtist: true,
    };

    const updatedPosts = clubPost.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) =>
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
    const updatedPosts = clubPost.map((post) =>
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    setClubPost(updatedPosts);
  };

  const handleShowComments = (postId: number) => {
    const updatedPosts = clubPost.map((post) =>
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
        {clubPost.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Paper sx={{ p: 2, marginBottom: 2, borderRadius: "10px" }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  alt="Poster Profile Picture"
                  src={post.profilePicture}
                  sx={{ marginRight: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {post.user}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(post.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" gutterBottom>
                {post.content}
              </Typography>

              {post.image && (
                <div
                  style={{ textAlign: "center", marginTop: 16, marginBottom: 16 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ maxWidth: "70%", minWidth: "70%" }}
                  />
                </div>
              )}

              <Divider sx={{ my: 2 }} />

              <Button
                startIcon={<FavoriteIcon />}
                onClick={() => handleLikePost(post.id)}
              >
                Like ({post.likes || 0})
              </Button>
              <Button
                startIcon={<CommentIcon />}
                onClick={() => handleShowComments(post.id)}
              >
                Comment ({post.comments.length})
              </Button>

              {post.showComments && (
                <>
                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" component="div" gutterBottom>
                    Comments
                  </Typography>
                  <List sx={{ maxHeight: 200, overflow: "auto" }}>
                    {post.comments.map((comment) => (
                      <div key={comment.id}>
                        <ListItem>
                          <Avatar
                            alt={comment.user}
                            src={comment.profilePicture}
                            sx={{ marginRight: 2 }}
                          />
                          <ListItemText
                            primary={`${comment.user} - ${new Date(
                              comment.timestamp
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })} ago`}
                            secondary={comment.content}
                          />
                          <ListItemSecondaryAction>
                            {!comment.isArtist && (
                              <IconButton
                                onClick={() =>
                                  handleReplyToComment(
                                    post.id,
                                    comment.id,
                                    "Reply content here"
                                  )
                                }
                              >
                                <ReplyIcon />
                              </IconButton>
                            )}
                          </ListItemSecondaryAction>
                        </ListItem>
                        {comment.replies &&
                          comment.replies.map((reply) => (
                            <ListItem key={reply.id} sx={{ pl: 4 }}>
                              <Avatar
                                alt={reply.user}
                                src={reply.profilePicture}
                                sx={{ marginRight: 2 }}
                              />
                              <ListItemText
                                primary={`${reply.user} - ${new Date(
                                  reply.timestamp
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })} ago`}
                                secondary={reply.content}
                              />
                              <ListItemSecondaryAction></ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        {comment.id === post.replyingCommentId && (
                          <ListItem sx={{ pl: 4 }}>
                            <TextField
                              fullWidth
                              value={post.replyContent || ""}
                              onChange={(e) =>
                                handleReplyToComment(
                                  post.id,
                                  comment.id,
                                  e.target.value
                                )
                              }
                              variant="standard"
                              margin="dense"
                              label="Reply to comment"
                            />
                            <IconButton
                              onClick={() =>
                                handleReplyToComment(
                                  post.id,
                                  comment.id,
                                  post.replyContent || ""
                                )
                              }
                            >
                              <SendIcon />
                            </IconButton>
                          </ListItem>
                        )}
                      </div>
                    ))}
                    <ListItem>
                      <TextField
                        fullWidth
                        value={post.newComment || ""}
                        onChange={(e) =>
                          handleAddComment(post.id, {
                            id: Date.now(),
                            user: "Maroon5", // Replace with actual user info
                            content: e.target.value,
                            profilePicture:
                              "path/to/user/profile/picture.jpg", // Replace with actual path
                            timestamp: new Date().toISOString(),
                            isArtist: true,
                            replies: [],
                          })
                        }
                        variant="standard"
                        margin="dense"
                        label="Add a comment"
                      />
                      <IconButton
                        onClick={() =>
                          handleAddComment(post.id, {
                            id: Date.now(),
                            user: "Maroon5", // Replace with actual user info
                            content: post.newComment || "",
                            profilePicture:
                              "path/to/user/profile/picture.jpg", // Replace with actual path
                            timestamp: new Date().toISOString(),
                            isArtist: true,
                            replies: [],
                          })
                        }
                      >
                        <SendIcon />
                      </IconButton>
                    </ListItem>
                  </List>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FanClubFanPage;
