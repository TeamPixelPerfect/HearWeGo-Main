"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
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
  IconButton,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FeedTab from "./FeedTab";
import PhotosTab from "./PhotosTab";
import DropFile from "../../components/DropFile";
import NewsPage from "./NewsTab";
import EventsTab from "./EventsTab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ClubPost } from "../../constants/models";
import { addPost } from "../../services/FanClubServices";
import { useAppSelector } from "@/lib/hooks";

const validationSchema = Yup.object().shape({
  postDescription: Yup.string().required("Description is required"),
});

const ArtistPage = () => {
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  const [posts, setPosts] = useState<ClubPost[]>([]);
  const [artistData, setArtistData] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [postImage, setPostImage] = useState<File | null>(null);
  

  const initialValues: ClubPost = {
    postType: "",
    postDescription: "",
    postpublisher: "ar4",
    postImage_URL: "",
    reacts: "",
    comments: "",
    clubId: "fc0",
    timestamps: "",
  };

  useEffect(() => {
    if (postImage) {
      setPostImage(postImage)
    }
  }, [postImage]);

  const submitData = async (values: ClubPost) => {
    try {
      await addPost(artist.token, values);
      setPosts([...posts, values]);
      setOpen(false);
      setPostImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClickOpen = () => {
    setSelectedPost(null);
    setOpen(true);
  };

  const handleClosePostDialog = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCardClick = (post: ClubPost) => {
    setSelectedPost(post);
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 2, marginBottom: 2 }}>
        <Typography variant="h5" component="div">
          Artist Page
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          This is a place where you can share your latest posts, updates, and news with your audience.
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Feed" />
          <Tab label="Photos" />
          <Tab label="Events" />
          <Tab label="News" />
        </Tabs>
      </Paper>

      <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
        <div>
          <Card sx={{ marginBottom: 2, cursor: "pointer" }} onClick={handleClickOpen}>
            <CardHeader
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
        </div>
      </Box>

      <FeedTab
        posts={posts}
        onAddPost={(newPost) => {}}
        onDeletePost={(postId) => {}}
        onEditPost={(postId, updatedPost) => {}}
        onAddComment={(postId, comment) => {}}
        onEditComment={(postId, commentId, updatedContent) => {}}
        onDeleteComment={(postId, commentId) => {}}
      />

      <Dialog
        open={open}
        onClose={handleClosePostDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            height: "60vh",
            width: "60vw",
          },
        }}
      >
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              submitData(values);
              resetForm();
            }}
          >
            {({ handleSubmit, setFieldValue, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    name="postDescription"
                    error={touched.postDescription && Boolean(errors.postDescription)}
                    helperText={touched.postDescription && errors.postDescription}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box mb={2}>
                  <DropFile
                    fileTypes="image"
                    fileExtensions=".jpg,.png,.jpeg"
                    isCircular={false}
                    width="100%"
                    height="200px"
                    file={postImage}
                    setFile={setPostImage}
                    aspectX={4}
                    aspectY={3}
                    shape="rect"
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClosePostDialog} variant="outlined">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Add Post
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Box sx={{ display: tabValue === 1 ? "block" : "none" }}>
        <PhotosTab posts={posts} handleCardClick={handleCardClick} />
      </Box>

      <Box sx={{ display: tabValue === 2 ? "block" : "none" }}>
        <EventsTab />
      </Box>

      <Box sx={{ display: tabValue === 3 ? "block" : "none" }}>
        <NewsPage />
      </Box>

      {/* <Dialog open={!!selectedPost} onClose={handleClosePostDialog}>
        <DialogContent>
          <Card>
            <CardHeader
              avatar={<Avatar src={artistData?.user?.profilePicture} />}
              title={selectedPost?.postpublisher}
              subheader={new Date(selectedPost?.timestamps || "").toLocaleString()}
            />
            {selectedPost?.postImage_URL && (
              <CardMedia
                component="img"
                height="500"
                sx={{ width: "600px" }}
                image={selectedPost?.postImage_URL}
                alt={selectedPost?.postDescription}
              />
            )}
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {selectedPost?.postDescription}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Likes: {Array.isArray(selectedPost?.reacts) ? selectedPost?.reacts.length : 0}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Comments:
              </Typography>
              {Array.isArray(selectedPost?.comments) && selectedPost?.comments.map((comment: any) => (
                <Box key={comment.commentId} sx={{ display: "flex", mb: 1 }}>
                  <Avatar src={comment.commenter_ProfilePic} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="body2" component="p">
                      {comment.commenter}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {comment.commentBody}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {comment.timestamps && new Date(comment.timestamps).toLocaleString()}
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
      </Dialog> */}
    </Container>
  );
};

export default ArtistPage;
