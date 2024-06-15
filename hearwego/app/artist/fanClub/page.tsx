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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SinglePost from "./SinglePost/page";

const ArtistPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "First Post",
      content: "Content of the first post.",
      image:
        "https://res.heraldm.com/content/image/2022/12/01/20221201000743_0.jpg",
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
      comments: [
        { id: 3, user: "User C", content: "Third comment" },
        { id: 4, user: "User D", content: "Fourth comment" },
      ],
    },
  ]);

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

  const handleEditPost = (postId: number, updatedPost: any) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  const handleAddComment = (postId: number, comment: any) => {
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
      comments: [],
    };
    setPosts([...posts, newPost]);
    handleDialogClose();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Artist Page
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" component="div">
              Welcome to the Artist Page!
            </Typography>
            <Typography variant="body1" component="p">
              This is a place where you can share your latest posts, updates,
              and news with your audience.
            </Typography>
          </Paper>
        </Grid>
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
      </Grid>
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
