"use client";
import React, { use, useEffect, useState } from "react";
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
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import FeedTab from "./FeedTab";
import PhotosTab from "./PhotosTab";
import VideosTab from "./VideosTab";
import DropFile from "../../components/DropFile";
import NewsPage from "./NewsTab";
import EventsTab from "./EventsTab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ClubPost } from "../../constants/models";
import { addPost } from "../../services/FanClubServices";
import { useAppSelector } from "@/lib/hooks";
import { Artist, Comment, Reaction } from "../../constants/models";
import { add } from "date-fns";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.mixed().nullable().required("Image is required"),
});

const ArtistPage = () => {
  const router = useRouter();
  const artist = useAppSelector((state) => state.artist.user);
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  const [posts, setPosts] = useState<ClubPost[]>([]);
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);

  const[postImage, setPostImage] = useState<string | null>(null);






  const [file, setFile] = useState(null);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCardClick = (post: ClubPost) => {
    setSelectedPost(post);
  };

  const handleAddComment = (postId: number, comment: Comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.postId === String(postId)) {
        return {
          ...post,
          comments: [...comments, comment],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleClickOpen = () => {
    setSelectedPost(null);
    setOpen(true);
  };

  const handleClosePostDialog = () => {
    setOpen(false);
    setFile(null);
  };

  const handleSubmit = (values: any) => {
    const newPost = {
      id: posts.length + 1,
      title: selectedPost?.postpublisher || artistData?.user.artistName,
      content: selectedPost?.postDescription || values.content,
      image: selectedPost?.postImage_URL || "",
      likes: 0,
      comments: [],
      user: artistData?.user.artistName,
      profilePicture: artistData?.user.profilePicture,
      timestamp: new Date().toISOString(),
    };

    setPosts([...posts, newPost]);
    setOpen(false);
    setFile(null);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
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
          <Tab label="Events" />
          <Tab label="News" />
        </Tabs>
      </Paper>

      <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
        <div>
          <Card
            sx={{ marginBottom: 2, cursor: "pointer" }}
            onClick={handleClickOpen}
          >
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
            initialValues={{ 
              content: "", 
              image: "" ,
              title: "",
              
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit({ ...values, image: file });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box mb={2}>
                  <Field
                    name="content"
                    as={TextField}
                    variant="outlined"
                    label="Content"
                    multiline
                    rows={4}
                    error={errors.content && touched.content}
                    helperText={
                      errors.content && touched.content ? errors.content : ""
                    }
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box mb={2}>
                  <DropFile
                    file={file}
                    setFile={setFile}
                    fileTypes="image"
                    fileExtensions=".jpg,.png,.jpeg"
                    isCircular={false}
                    width="100%"
                    height="200px"
                    aspectX={4}
                    aspectY={3}
                    shape="rect"
                  />
                </Box>
                <DialogActions>
                  <Button onClick={handleClosePostDialog} variant="outlined">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
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

     

      <Dialog open={!!selectedPost} onClose={handleClosePostDialog}>
        <DialogContent>
          <Card>
            <CardHeader
              avatar={<Avatar src={"artistData?.user.profilePicture"} />}
              title={selectedPost?.postpublisher}
              subheader={new Date(
                selectedPost?.timestamps || ""
              ).toLocaleString()}
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
                Likes: {selectedPost?.reactions?.length ?? 0}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Comments:
              </Typography>
              {selectedPost?.comments?.map((comment) => (
                <Box key={comment.commentId} sx={{ display: "flex", mb: 1 }}>
                  <Avatar src={comment.commenter_ProfilePic} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="body2" component="p">
                      {comment.commenter}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {comment.commentBody}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {comment.timestamps &&
                        new Date(comment.timestamps).toLocaleString()}
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
