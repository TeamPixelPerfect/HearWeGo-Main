"use client";

import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Container,
  Grid,
  Paper,
  Button,
  Tab,
  Tabs,
  Box,
  Card,
  CardMedia,
  Tooltip,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SinglePost from "./SinglePost/page"; // Assuming SinglePost component is in the same directory

type Comment = {
  id: number;
  user: string;
  content: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
};

const ArtistPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "First Post",
      content: "Content of the first post.",
      image:
        "https://res.heraldm.com/content/image/2022/12/01/20221201000743_0.jpg",
      likes: 10,
      comments: [
        { id: 1, user: "User A", content: "First comment" },
        { id: 2, user: "User B", content: "Second comment" },
      ],
    },
    {
      id: 2,
      title: "Second Post with Image",
      content: "Content of the second post.",
      image:
        "https://www.billboard.com/wp-content/uploads/2021/06/maroon-5-superbowl-2019-billboard-1548-1623086440.jpg",
      likes: 15,
      comments: [
        { id: 3, user: "User C", content: "Third comment" },
        { id: 4, user: "User D", content: "Fourth comment" },
      ],
    },
  ]);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleEditPost = (postId: number, updatedPost: Post) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  const handleAddComment = (postId: number, comment: Comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleEditComment = (
    postId: number,
    commentId: number,
    updatedContent: string
  ) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: updatedContent }
            : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCreatePost = () => {
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      image: "/mnt/data/image.png",
      likes: 0,
      comments: [],
    };
    setPosts([...posts, newPost]);
    handleDialogClose();
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 2, marginBottom: 2 }}>
        <Typography variant="h5" component="div">
          Artist Page
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          This is a place where you can share your latest posts, updates, and
          news with your audience.
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Feed" />
          <Tab label="Photos" />
          <Tab label="Videos" />
          <Tab label="Events" />
        </Tabs>
      </Paper>

      <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <SinglePost
              post={post}
              onDeletePost={handleDeletePost}
              onEditPost={handleEditPost}
              onAddComment={handleAddComment}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          </Grid>
        ))}
      </Box>

      <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Photos
        </Typography>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={6} md={4} key={post.id}>
              <Tooltip
                title={
                  <React.Fragment>
                    <Typography variant="body2">Likes: {post.likes}</Typography>
                    <Typography variant="body2">
                      Comments: {post.comments.length}
                    </Typography>
                  </React.Fragment>
                }
                placement="top"
                arrow
              >
                <Card
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    "&:hover": {
                      "& $overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    className="overlay"
                  >
                    <Box sx={{ color: "#fff", textAlign: "center" }}>
                      <Typography variant="body2">
                        Likes: {post.likes}
                      </Typography>
                      <Typography variant="body2">
                        Comments: {post.comments.length}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: tabValue === 2 ? "block" : "none" }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Videos
        </Typography>
        {/* Add your videos component or logic here */}
      </Box>

      <Box sx={{ display: tabValue === 3 ? "block" : "none" }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Events
        </Typography>
        {/* Add your events component or logic here */}
      </Box>

      <IconButton
        color="primary"
        onClick={() => handleDialogOpen("post")}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <AddIcon />
      </IconButton>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreatePost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ArtistPage;
