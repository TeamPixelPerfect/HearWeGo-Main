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
  Avatar,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SinglePost from "../../../components/SinglePost";

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
      profilePicture: "path/to/artist/profile/picture1.jgp", // Dummy path
      user: "Artist A",
      timestamp: new Date().toISOString(),
      comments: [
        {
          id: 1,
          user: "User A",
          content: "First comment",
          profilePicture: "path/to/user/profile/picture1.jpg", // Dummy path
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          user: "User B",
          content: "Second comment",
          profilePicture: "path/to/user/profile/picture2.jpg", // Dummy path
          timestamp: new Date().toISOString(),
        },
      ],
    },
    {
      id: 2,
      title: "Second Post with Image",
      content: "Content of the second post.",
      image:
        "https://www.billboard.com/wp-content/uploads/2021/06/maroon-5-superbowl-2019-billboard-1548-1623086440.jpg",
      profilePicture: "path/to/artist/profile/picture2.jpg", // Dummy path
      user: "Artist B",
      timestamp: new Date().toISOString(),
      comments: [
        {
          id: 3,
          user: "User C",
          content: "Third comment",
          profilePicture: "path/to/user/profile/picture3.jpg", // Dummy path
          timestamp: new Date().toISOString(),
        },
        {
          id: 4,
          user: "User D",
          content: "Fourth comment",
          profilePicture: "path/to/user/profile/picture4.jpg", // Dummy path
          timestamp: new Date().toISOString(),
        },
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
      profilePicture: "path/to/new/artist/profile/picture.jpg", // Dummy path
      user: "New Artist",
      timestamp: new Date().toISOString(),
      comments: [],
    };
    setPosts([...posts, newPost]);
    handleDialogClose();
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" sx={{fontWeight:"bold"}}>
            Feed
          </Typography>
          {/* <Paper sx={{ p: 2 }}>
        
            <Typography variant="body1" component="p">
              This is a place where you can share your latest posts, updates,
              and news with your audience.
            </Typography>
          </Paper> */}
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

      

    </Container>
  );
};

export default ArtistPage;