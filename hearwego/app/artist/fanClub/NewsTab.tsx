"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import {
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Reply as ReplyIcon,
  AddComment as AddCommentIcon,
} from "@mui/icons-material";

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

interface Post {
  id: number;
  artistName: string;
  profileImageUrl: string;
  title: string;
  content: string;
  imageUrl: string;
  postTime: string;
  likes: number;
  comments: Comment[];
  showComments: boolean;
}

interface Comment {
  id: number;
  commenterName: string;
  commenterImageUrl: string;
  commentTime: string;
  commentText: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  replierName: string;
  replierImageUrl: string;
  replyTime: string;
  replyText: string;
}

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [replyingTo, setReplyingTo] = useState<{
    postId: number;
    commentId: number;
  } | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]); // Array to store liked post IDs

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      // User has already liked the post, so unlike it
      setLikedPosts(likedPosts.filter((id) => id !== postId));
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
    } else {
      // User is liking the post for the first time
      setLikedPosts([...likedPosts, postId]);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    }
  };

  const handleComment = (postId: number, commentText: string) => {
    if (!commentText.trim()) return; // Prevent adding empty comments

    const newComment: Comment = {
      id: getNextCommentId(postId),
      commenterName: "User", // Replace with actual commenter's name
      commenterImageUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      commentTime: new Date().toISOString(),
      commentText,
      replies: [],
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const handleReply = () => {
    if (!replyingTo || !replyText.trim()) return;

    const { postId, commentId } = replyingTo;

    const newReply: Reply = {
      id: getNextReplyId(postId, commentId),
      replierName: "User", // Replace with actual replier's name
      replierImageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      replyTime: new Date().toISOString(),
      replyText,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...comment.replies, newReply] }
                  : comment
              ),
            }
          : post
      )
    );

    setReplyingTo(null);
    setReplyText("");
  };

  const handleReplyButtonClick = (postId: number, commentId: number) => {
    setReplyingTo({ postId, commentId });
  };

  const handleCommentExpand = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleAddComment = (postId: number) => {
    handleComment(postId, replyText);
    setReplyText("");
  };

  const getNextCommentId = (postId: number) => {
    const post = posts.find((post) => post.id === postId);
    if (!post) return 1;

    return post.comments.length + 1;
  };

  const getNextReplyId = (postId: number, commentId: number) => {
    const post = posts.find((post) => post.id === postId);
    if (!post) return 1;

    const comment = post.comments.find((comment) => comment.id === commentId);
    if (!comment) return 1;

    return comment.replies.length + 1;
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
        News
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12}>
            <Card variant="outlined" sx={{ margin: "10px" }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      sx={{ bgcolor: deepPurple[500] }}
                      src={post.profileImageUrl}
                      alt={post.artistName}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {post.artistName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(post.postTime).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <Box position="relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
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
                    {post.title}
                  </Typography>
                </Box>
              </Box>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<FavoriteIcon />}
                  onClick={() => handleLike(post.id)}
                  sx={{
                    color: likedPosts.includes(post.id) ? "red" : "inherit",
                  }}
                >
                  Like ({post.likes})
                </Button>
                <Button
                  size="small"
                  startIcon={<CommentIcon />}
                  onClick={() => handleCommentExpand(post.id)}
                >
                  Comments ({post.comments.length})
                </Button>
              </CardActions>
              {post.showComments && (
                <CardContent sx={{ height: "225px", overflow: "auto" }}>
                  {post.comments.map((comment) => (
                    <Paper key={comment.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Avatar
                            src={comment.commenterImageUrl}
                            alt={comment.commenterName}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">
                            {comment.commenterName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(comment.commentTime).toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {comment.commentText}
                      </Typography>
                      {comment.replies.map((reply) => (
                        <Paper
                          key={reply.id}
                          elevation={1}
                          sx={{ p: 2, mt: 1, ml: 3 }}
                        >
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                              <Avatar
                                src={reply.replierImageUrl}
                                alt={reply.replierName}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">
                                {reply.replierName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {new Date(reply.replyTime).toLocaleString()}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {reply.replyText}
                          </Typography>
                        </Paper>
                      ))}
                      {replyingTo?.postId === post.id &&
                        replyingTo.commentId === comment.id && (
                          <Box sx={{ mt: 2, ml: 2 }}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder={`Replying to ${comment.commenterName}`}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleReply();
                                }
                              }}
                            />
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleReply}
                              sx={{ mt: 1 }}
                            >
                              Reply
                            </Button>
                          </Box>
                        )}
                      {!replyingTo && (
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleReplyButtonClick(post.id, comment.id)
                          }
                          sx={{ ml: 2, mt: 1 }}
                        >
                          <ReplyIcon />
                        </IconButton>
                      )}
                    </Paper>
                  ))}
                  <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(post.id);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => handleAddComment(post.id)}
                          edge="end"
                        >
                          <AddCommentIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage;
