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
      content: "Exciting news about the upcoming album!",
      image:
        "https://res.heraldm.com/content/image/2022/12/01/20221201000743_0.jpg",
      profilePicture: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHnaJf7dVGS4_YJ7OwOyWC7F7yia--3nJSR7LULSGIS2VpiYFo", // Dummy path
      user: "The Rembrandts",
      timestamp: new Date().toISOString(),
      comments: [
        {
          id: 1,
          user: "Alice",
          content: "Great news! Looking forward to it.",
          profilePicture: "https://randomuser.me/api/portraits/women/11.jpg", // Dummy path
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          user: "John",
          content: "Tour dates and locations revealed!",
          profilePicture: "https://randomuser.me/api/portraits/women/13.jpg", // Dummy path
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
      profilePicture: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHnaJf7dVGS4_YJ7OwOyWC7F7yia--3nJSR7LULSGIS2VpiYFo", // Dummy path
      user: "The Rembrandts",
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

 

  

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold"}}>
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
            
            />
          </Grid>
        ))}
      </Grid>

      

    </Container>
  );
};

export default ArtistPage;