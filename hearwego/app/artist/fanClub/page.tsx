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
import { ClubPost, ClubNews } from "../../constants/models";
import { addNews, addPost } from "../../services/FanClubServices";
import { useAppSelector } from "@/lib/hooks";

const validationSchema = Yup.object().shape({
  postDescription: Yup.string().required("Description is required"),
});
const newsValidationSchema = Yup.object().shape({
  newsTitle: Yup.string().required("Title is required"),
  newsBody: Yup.string().required("Description is required"),
});
const ArtistPage = () => {
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);
  const artistId = artist?.user.artist_id ?? "";
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  const [posts, setPosts] = useState<ClubPost[]>([]);
  const [news, setNews] = useState<ClubNews[]>([]);
  const [artistData, setArtistData] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openNewsDialog, setOpenNewsDialog] = useState(false);

  const [postImage, setPostImage] = useState<File | null>(null);
  const [newsImage, setNewsImage] = useState<File | null>(null);

  const initialValues: ClubPost = {
    postType: "",
    postDescription: "",
    postpublisher: artist ? artist.user.artist_id : "",
    postImage_URL: "",
    reacts: "",
    comments: "",
    clubId: "fc0",
    artistId: artist ? artist.user.artist_id : "",
    timestamps: "",
  };

  const initialValuesNews: ClubNews = {
    newsTitle: "",
    newsBody: "",
    newsPublisher: artist ? artist.user.artist_id : "",
    newsImage_URL: "",
    clubId: "fc0",
    artistId: artist ? artist.user.artist_id : "",
    timestamps: "",
  };

  useEffect(() => {
    if (newsImage) {
      setNewsImage(newsImage);
    }
  }, [newsImage]);

  useEffect(() => {
    if (postImage) {
      setPostImage(postImage);
    }
  }, [postImage]);

  const submitData = async (values: ClubPost) => {
    try {
      await addPost(artist.token, values);
      setPosts([...posts, values]);
      setOpenPostDialog(false);
      setPostImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const submitNewsData = async (values: ClubNews) => {
    try {
      await addNews(artist.token, values);
      setNews([...news, values]);

      setOpenNewsDialog(false);
      setNewsImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClickOpenPostDialog = () => {
    setSelectedPost(null);
    setOpenPostDialog(true);
  };

  const handleClosePostDialog = () => {
    setOpenPostDialog(false);
  };
  const handleClickOpenNewsDialog = () => {
    setOpenNewsDialog(true);
  };

  const handleCloseNewsDialog = () => {
    setOpenNewsDialog(false);
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
          This is a place where you can share your latest posts, updates, and
          news with your audience.
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Feed" />
          <Tab label="Events" />
          <Tab label="News" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Box>
          <Card
            sx={{ marginBottom: 2, cursor: "pointer" }}
            onClick={handleClickOpenPostDialog}
          >
            <CardHeader
              title={
                <Typography variant="body1" color="textSecondary">
                  What's on your mind?
                </Typography>
              }
              action={
                <Tooltip title="Create Post">
                  <IconButton onClick={handleClickOpenPostDialog}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </Card>

          <FeedTab
            posts={posts}
            onAddPost={(newPost) => {}}
            onDeletePost={(postId) => {}}
            onEditPost={(postId, updatedPost) => {}}
            onAddComment={(postId, comment) => {}}
            onEditComment={(postId, commentId, updatedContent) => {}}
            onDeleteComment={(postId, commentId) => {}}
          />
        </Box>
      )}
      <Dialog
        open={openPostDialog}
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
            onClick={handleClosePostDialog}
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
                    error={
                      touched.postDescription && Boolean(errors.postDescription)
                    }
                    helperText={
                      touched.postDescription && errors.postDescription
                    }
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

      {tabValue === 1 && (
        <Box>
          <EventsTab />
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{ position: "relative" }}>
          <NewsPage
           news={news}
            onAddNews={(newNews) => {}}
            onDeleteNews={(newsId) => {}}
            onEditNews={(newsId, updatedNews) => {}}
           />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ position: "absolute", top: 5, right: 16 }}
            onClick={handleClickOpenNewsDialog} // Replace with the actual handler for adding news
          >
            Add News
          </Button>
        </Box>
      )}

      {/* News Dialog */}
      <Dialog
        open={openNewsDialog}
        onClose={handleCloseNewsDialog}
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
          Create News
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseNewsDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Formik
            initialValues={initialValuesNews}
            validationSchema={newsValidationSchema}
            onSubmit={(values, { resetForm }) => {
              submitNewsData(values);
              resetForm();
            }}
          >
            {({ handleSubmit, setFieldValue, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Title"
                    variant="outlined"
                    name="newsTitle"
                    error={touched.newsTitle && Boolean(errors.newsTitle)}
                    helperText={touched.newsTitle && errors.newsTitle}
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    
                    name="newsBody"
                    error={
                      touched.newsBody && Boolean(errors.newsBody)
                    }
                    helperText={
                      touched.newsBody && errors.newsBody
                    }
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
                    file={newsImage}
                    setFile={setNewsImage}
                    aspectX={4}
                    aspectY={3}
                    shape="rect"
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleCloseNewsDialog} variant="outlined">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Add News
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ArtistPage;
