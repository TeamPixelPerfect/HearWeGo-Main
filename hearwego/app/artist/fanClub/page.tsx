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
  Paper,
  Button,
  Tab,
  Tabs,
  Box,
  Card,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
  Fab,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import FeedTab from "./FeedTab";
import PhotosTab from "./PhotosTab";
import VideosTab from "./VideosTab";
import DropFile from "../../components/DropFile";
import NewsPage from "./NewsTab";

const dummyData: Post[] = [
  // Dummy data here
];

export type Comment = {
  id: number;
  user: string;
  content: string;
  profilePicture: string;
  timestamp: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: Comment[];
  user: string;
  profilePicture: string;
  timestamp: string;
};

const ArtistPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [newPostVideo, setNewPostVideo] = useState<File | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(dummyData);
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
    setNewPostImage(null);
    setNewPostVideo(null);
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
    const newPost: Post = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      image: newPostImage ? URL.createObjectURL(newPostImage) : undefined,
      video: newPostVideo ? URL.createObjectURL(newPostVideo) : undefined,
      likes: 0,
      comments: [],
      user: "New Artist", // Dummy user
      profilePicture: "path/to/artist/profile/picture.jpg", // Dummy path
      timestamp: new Date().toISOString(),
    };
    setPosts([...posts, newPost]);
    handleDialogClose();
  };

  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleClosePostDialog = () => {
    setSelectedPost(null);
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
          <Tab label="News" />
          <Tab label="Events" />
        </Tabs>
      </Paper>

      <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
        <FeedTab
          posts={posts}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
          onAddComment={handleAddComment}
          onEditComment={handleEditComment}
          onDeleteComment={handleDeleteComment}
        />
      </Box>

      <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
        <PhotosTab posts={posts} handleCardClick={handleCardClick} />
      </Box>

      <Box sx={{ display: tabValue === 2 ? "block" : "none" }}>
        <VideosTab posts={posts} handleCardClick={handleCardClick} />
      </Box>

      <Box sx={{ display: tabValue === 3 ? "block" : "none" }}>
        <NewsPage />
      </Box>

      <Box sx={{ display: tabValue === 4 ? "block" : "none" }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Events
        </Typography>
      </Box>

      {tabValue === 0 || tabValue === 3 ? (
        <Fab
          color="primary"
          onClick={() => handleDialogOpen(tabValue === 0 ? "post" : "news")}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: 80,
            height: 80,
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </Fab>
      ) : null}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          Create New {dialogType === "post" ? "Post" : "News"}
        </DialogTitle>
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
          {dialogType === "post" && (
            <>
              <DropFile
                fileTypes="Image"
                fileExtensions="JPEG,PNG,WEBP,SVG"
                isCircular={false}
                width="100%"
                height="200px"
                file={newPostImage}
                setFile={(file) => setNewPostImage(file)}
                aspectX={1}
                aspectY={1}
                shape="rect"
                error={false}
              />
              <DropFile
                fileTypes="Video"
                fileExtensions="MP4,AVI,MOV"
                isCircular={false}
                width="100%"
                height="200px"
                file={newPostVideo}
                setFile={(file) => setNewPostVideo(file)}
                aspectX={1}
                aspectY={1}
                shape="rect"
                error={false}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreatePost} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!selectedPost} onClose={handleClosePostDialog}>
        <DialogTitle>{selectedPost?.title}</DialogTitle>
        <DialogContent>
          <Card>
            <CardHeader
              avatar={<Avatar src={selectedPost?.profilePicture} />}
              title={selectedPost?.user}
              subheader={new Date(
                selectedPost?.timestamp || ""
              ).toLocaleString()}
            />
            {selectedPost?.image && (
              <CardMedia
                component="img"
                height="200"
                image={selectedPost?.image}
                alt={selectedPost?.title}
              />
            )}
            {selectedPost?.video && (
              <CardMedia
                component="video"
                height="200"
                src={selectedPost?.video}
                controls
              />
            )}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {selectedPost?.content}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Likes: {selectedPost?.likes}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Comments:
              </Typography>
              {selectedPost?.comments.map((comment) => (
                <Box key={comment.id} sx={{ display: "flex", mb: 1 }}>
                  <Avatar src={comment.profilePicture} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="body2" component="p">
                      {comment.user}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {comment.content}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {new Date(comment.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePostDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ArtistPage;
