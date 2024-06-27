"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Avatar,
  Card,
  CardHeader,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import SinglePost from "./SinglePost/page";
import { Post, Comment } from "./page";
import { ClubPost } from "../../constants/models";
import { addPost } from "../../services/FanClubServices";
import { useAppSelector } from "@/lib/hooks"; // Adjust path as per your project structure
import DropFile from "../../components/DropFile"; // Adjust path as per your project structure

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

const FeedTab = ({
  posts,
  onDeletePost,
  onEditPost,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onAddPost,
}: FeedTabProps) => {
  const artist = useAppSelector((state) => state.artist.user);


  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState<ClubPost>({
    // postType: "",
    postDescription: "",
    postpublisher: "ar4",
    postImage_URL: "",
    clubId: "fc0",
  });

  const [postImg, setPostImg] = useState<File | null>(null);

  useEffect(() => {
    if (postImg) {
      setPostData({ ...postData, postImage_URL: postImg });
    }
  }, [postImg]);

  const submitData = async () => {
    try {
      await addPost(artist?.token, postData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPostData({
      postType: "",
      postDescription: "",
      postpublisher: "ar4",
      postImage_URL: "",
      clubId: "fc0",
    });
    setPostImg(null);
  };

  const handleFileChange = (file: File) => {
    setPostImg(file);
  };

  // const handleAddPost = () => {
  //   const newPost: Post = {
  //     id: posts.length + 1,
  //     content: postData.postDescription || "",
  //     media: postData.postImage_URL || "",
  //     comments: [],
  //   };
  //   onAddPost(newPost);
  //   handleClose();
  // };

  return (
    <div>
      <Card
        sx={{ marginBottom: 2, cursor: "pointer" }}
        onClick={handleClickOpen}
      >
        <CardHeader
          avatar={<Avatar src={artist?.profilePicture} />}
          title={
            <Typography variant="body1" color="textSecondary">
              What's on your mind?
            </Typography>
          }
          action={
            <Tooltip title="Create Post">
              <IconButton onClick={handleClickOpen}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          }
        />
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Create Post
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <TextField
              autoFocus
              margin="dense"
              value={postData.postDescription}
              onChange={(e) =>
                setPostData({ ...postData, postDescription: e.target.value })
              }
              placeholder="What's on your mind?"
              multiline
              rows={4}
              variant="outlined"
              sx={{ borderRadius: 2, width: "100%" }}
            />
          </Box>
          <Box marginBottom={2}>
            <DropFile
              fileTypes="image"
              fileExtensions="jpeg, jpg, png, mp4"
              isCircular={false}
              width="100%"
              height="200px"
              file = {postImg}
              setFile={setPostImg}
              aspectX={4}
              aspectY={3}
              shape="rect"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={submitData} color="primary">
            Post
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
