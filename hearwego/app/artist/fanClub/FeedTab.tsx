"use client";
import React, { useState } from "react";
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SinglePost from "./SinglePost/page";
import { Post, Comment } from "./page";
import DropFile from "../../components/DropFile"; // Import the DropFile component

type FeedTabProps = {
  posts: Post[];
  onDeletePost: (postId: number) => void;
  onEditPost: (postId: number, updatedPost: Post) => void;
  onAddComment: (postId: number, comment: Comment) => void;
  onEditComment: (
    postId: number,
    commentId: number,
    updatedContent: string
  ) => void;
  onDeleteComment: (postId: number, commentId: number) => void;
  onAddPost: (newPost: Post) => void;
};

const FeedTab: React.FC<FeedTabProps> = ({
  posts,
  onDeletePost,
  onEditPost,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onAddPost,
}) => {
  const [open, setOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<File | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      image: newPostImage ? URL.createObjectURL(newPostImage) : "",
      comments: [],
    };
    onAddPost(newPost);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostImage(null);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        style={{ marginBottom: '16px' }}
      >
        Add Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New Post</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            multiline
            rows={4}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            sx={{width:"100%"}}
          />
          <DropFile
            fileTypes="image"
            fileExtensions="jpeg, jpg, png, mp4"
            isCircular={false}
            width="100%"
            height="200px"
            file={newPostImage}
            setFile={setNewPostImage}
            aspectX={4}
            aspectY={3}
            shape="rect"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPost} color="primary">
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <SinglePost
              post={post}
              onDeletePost={onDeletePost}
              onEditPost={onEditPost}
              onAddComment={onAddComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FeedTab;
