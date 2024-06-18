"use client";
import React, { use, useEffect, useState } from "react";
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
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Add as AddIcon } from "@mui/icons-material";
import FeedTab from "./FeedTab";
import PhotosTab from "./PhotosTab";
import VideosTab from "./VideosTab";
import DropFile from "../../components/DropFile";
import NewsPage from "./NewsTab";
import EventsTab from "./EventsTab";
import { set } from "date-fns";
import { addPost } from "../../services/FanClubServices";
import { ClubPost } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";

const dummyData: Post[] = [
  {
    id: 1,
    title: "First Post",
    content: "Content of the first post.",
    image:
      "https://res.heraldm.com/content/image/2022/12/01/20221201000743_0.jpg",
    likes: 10,
    comments: [
      {
        id: 1,
        user: "User A",
        content: "First comment",
        profilePicture: "path/to/user/profile/picture1.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        user: "User B",
        content: "Second comment",
        profilePicture: "path/to/user/profile/picture2.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist A",
    profilePicture: "path/to/artist/profile/picture1.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Second Post with Image",
    content: "Content of the second post.",
    image:
      "https://www.billboard.com/wp-content/uploads/2021/06/maroon-5-superbowl-2019-billboard-1548-1623086440.jpg",
    likes: 15,
    comments: [
      {
        id: 3,
        user: "User C",
        content: "Third comment",
        profilePicture: "path/to/user/profile/picture3.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 4,
        user: "User D",
        content: "Fourth comment",
        profilePicture: "path/to/user/profile/picture4.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist B",
    profilePicture: "path/to/artist/profile/picture2.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Third Post with Video",
    content: "Content of the third post.",
    video: "https://www.example.com/path/to/video.mp4",
    likes: 20,
    comments: [
      {
        id: 5,
        user: "User E",
        content: "Fifth comment",
        profilePicture: "path/to/user/profile/picture5.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 6,
        user: "User F",
        content: "Sixth comment",
        profilePicture: "path/to/user/profile/picture6.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist C",
    profilePicture: "path/to/artist/profile/picture3.jpg",
    timestamp: new Date().toISOString(),
  },
  // Add 10 more dummy posts here
  {
    id: 4,
    title: "Fourth Post",
    content: "Content of the fourth post.",
    image: "https://example.com/image4.jpg",
    likes: 5,
    comments: [
      {
        id: 5,
        user: "User E",
        content: "Fifth comment",
        profilePicture: "path/to/user/profile/picture5.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 6,
        user: "User F",
        content: "Sixth comment",
        profilePicture: "path/to/user/profile/picture6.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist D",
    profilePicture: "path/to/artist/profile/picture4.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Fifth Post with Video",
    content: "Content of the fifth post.",
    video: "https://example.com/video5.mp4",
    likes: 8,
    comments: [
      {
        id: 5,
        user: "User E",
        content: "Fifth comment",
        profilePicture: "path/to/user/profile/picture5.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 6,
        user: "User F",
        content: "Sixth comment",
        profilePicture: "path/to/user/profile/picture6.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist E",
    profilePicture: "path/to/artist/profile/picture5.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Sixth Post",
    content: "Content of the sixth post.",
    image: "https://example.com/image6.jpg",
    likes: 12,
    comments: [
      {
        id: 5,
        user: "User E",
        content: "Fifth comment",
        profilePicture: "path/to/user/profile/picture5.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 6,
        user: "User F",
        content: "Sixth comment",
        profilePicture: "path/to/user/profile/picture6.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist F",
    profilePicture: "path/to/artist/profile/picture6.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 7,
    title: "Seventh Post with Video",
    content: "Content of the seventh post.",
    video: "https://example.com/video7.mp4",
    likes: 3,
    comments: [
      {
        id: 5,
        user: "User E",
        content: "Fifth comment",
        profilePicture: "path/to/user/profile/picture5.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 6,
        user: "User F",
        content: "Sixth comment",
        profilePicture: "path/to/user/profile/picture6.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist G",
    profilePicture: "path/to/artist/profile/picture7.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 8,
    title: "Eighth Post",
    content: "Content of the eighth post.",
    image: "https://example.com/image8.jpg",
    likes: 9,
    comments: [
      {
        id: 5,
        user: "User E",
        content: "Fifth comment",
        profilePicture: "path/to/user/profile/picture5.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 6,
        user: "User F",
        content: "Sixth comment",
        profilePicture: "path/to/user/profile/picture6.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist H",
    profilePicture: "path/to/artist/profile/picture8.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 9,
    title: "Ninth Post",
    content: "Content of the ninth post.",
    image: "https://example.com/image9.jpg",
    likes: 7,
    comments: [
      {
        id: 5,
        user: "User E",
        content: "Fifth comment",
        profilePicture: "path/to/user/profile/picture5.jpg",
        timestamp: new Date().toISOString(),
      },
      {
        id: 6,
        user: "User F",
        content: "Sixth comment",
        profilePicture: "path/to/user/profile/picture6.jpg",
        timestamp: new Date().toISOString(),
      },
    ],
    user: "Artist I",
    profilePicture: "path/to/artist/profile/picture9.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 10,
    title: "Tenth Post with Video",
    content: "Content of the tenth post.",
    video: "https://example.com/video10.mp4",
    likes: 6,
    comments: [],
    user: "Artist J",
    profilePicture: "path/to/artist/profile/picture10.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 11,
    title: "Eleventh Post",
    content: "Content of the eleventh post.",
    image: "https://example.com/image11.jpg",
    likes: 13,
    comments: [],
    user: "Artist K",
    profilePicture: "path/to/artist/profile/picture11.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 12,
    title: "Twelfth Post with Video",
    content: "Content of the twelfth post.",
    video: "https://example.com/video12.mp4",
    likes: 4,
    comments: [],
    user: "Artist L",
    profilePicture: "path/to/artist/profile/picture12.jpg",
    timestamp: new Date().toISOString(),
  },
  {
    id: 13,
    title: "Thirteenth Post",
    content: "Content of the thirteenth post.",
    image: "https://example.com/image13.jpg",
    likes: 11,
    comments: [],
    user: "Artist M",
    profilePicture: "path/to/artist/profile/picture13.jpg",
    timestamp: new Date().toISOString(),
  },
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

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  image: Yup.mixed().nullable().required("Image is required"),
  video: Yup.mixed().nullable().required("Video is required"),
});

const ArtistPage: React.FC = () => {
  const artist = useAppSelector((state) => state.artist.user);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(dummyData);
  const [tabValue, setTabValue] = useState(0);

  const [postData, setPostData] = useState<ClubPost>({
    postType: "",
    postDescription: "",
    postpublisher: "ar4",
    postImage_URL: "",
    clubId: "fc0",
  });

  const [postImg, setPostImg] = useState<File | null>(null);

  useEffect(() => {
    if(postImg){
      setPostData({...postData, postImage_URL: postImg})
    }
  }, [postImg]);

  const submitData = async () => {
    try {
      await addPost(artist.token, postData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDialogOpen = (type: "post" | "news") => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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

  const handleCreatePost = async (values: {
    title: string;
    content: string;
    image: File | null;
    video: File | null;
  }) => {
    try {
      // Validate form values against the schema
      await validationSchema.validate(values, { abortEarly: false });

      // If validation succeeds, create a new post
      const newPost: Post = {
        id: posts.length + 1,
        title: values.title,
        content: values.content,
        image: values.image ? URL.createObjectURL(values.image) : undefined,
        video: values.video ? URL.createObjectURL(values.video) : undefined,
        likes: 0,
        comments: [],
        user: "New Artist", // Dummy user
        profilePicture: "path/to/artist/profile/picture.jpg", // Dummy path
        timestamp: new Date().toISOString(),
      };
      setPosts([...posts, newPost]);
      handleDialogClose();
    } catch (error) {
      // Handle validation errors
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        console.log("Validation errors:", errorMessages);
        // Optionally, you can set state to display error messages
        // This could be done with a state variable like errorMessage
        // errorMessage could then be displayed in the form
      }
    }
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
          onEditComment={function (
            postId: number,
            commentId: number,
            updatedContent: string
          ): void {
            throw new Error("Function not implemented.");
          }}
          onDeleteComment={function (postId: number, commentId: number): void {
            throw new Error("Function not implemented.");
          }}
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
        <EventsTab />
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
          <Formik
            initialValues={{ title: "", content: "", image: null, video: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleCreatePost(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors,
              touched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  as={TextField}
                  autoFocus
                  margin="dense"
                  value={postData.postType}
                  onChange={(e)=>setPostData({...postData, postType: e.target.value})}
                  name="title"
                  label="Title"
                  fullWidth
                  variant="standard"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field
                  as={TextField}
                  margin="dense"
                  name="content"
                  label="Content"
                  value={postData.postDescription}
                  onChange={(e)=>setPostData({...postData, postDescription: e.target.value})}
                  fullWidth
                  variant="standard"
                  multiline
                  rows={4}
                  error={touched.content && Boolean(errors.content)}
                  helperText={touched.content && errors.content}
                />
                {dialogType === "post" && (
                  <>
                    <DropFile
                      fileTypes="Image"
                      fileExtensions="JPEG,PNG,WEBP,SVG"
                      isCircular={false}
                      width="100%"
                      height="200px"
                      file={postImg}
                      setFile={setPostImg}
                      aspectX={1}
                      aspectY={1}
                      shape="rect"
                      error={touched.image && Boolean(errors.image)}
                      helperText={touched.image && errors.image}
                    />
                    <DropFile
                      fileTypes="Video"
                      fileExtensions="MP4,AVI,MOV"
                      isCircular={false}
                      width="100%"
                      height="200px"
                      file={null}
                      setFile={(file) => setFieldValue("video", file)}
                      aspectX={1}
                      aspectY={1}
                      shape="rect"
                      error={touched.video && Boolean(errors.video)}
                      helperText={touched.video && errors.video}
                    />
                  </>
                )}
                <DialogActions>
                  <Button onClick={handleDialogClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" onClick={submitData}>
                    Create
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
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
                height="500"
                sx={{ width: "600px" }}
                image={selectedPost?.image}
                alt={selectedPost?.title}
              />
            )}
            {selectedPost?.video && (
              <CardMedia
                component="video"
                height="500"
                sx={{ width: "600px" }}
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
