"use client";
import { useState } from "react";
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Container,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Add as AddIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import DropFile from "@/app/components/DropFile";
import EventsTab from "./EventsTab";
import FeedTab from "./FeedTab";
import NewsPage from "./NewsTab";
import PhotosTab from "./PhotosTab";
import VideosTab from "./VideosTab";

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
  image: Yup.mixed()
    .nullable()
    .test("image", "Image is required", (value, context) => {
      return value || context.parent.video; // Check if either image or video is provided
    }),
  video: Yup.mixed()
    .nullable()
    .test("video", "Video is required", (value, context) => {
      return value || context.parent.image; // Check if either video or image is provided
    }),
});

const ArtistPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(dummyData);
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for selected image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview URL
  const router = useRouter();

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
  }, { resetForm }: FormikHelpers<{
    title: string;
    content: string;
    image: File | null;
    video: File | null;
  }>) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      const newPost: Post = {
        id: posts.length + 1,
        title: values.title,
        content: values.content,
        image: values.image ? URL.createObjectURL(values.image) : undefined,
        video: values.video ? URL.createObjectURL(values.video) : undefined,
        likes: 0,
        comments: [],
        user: "New Artist",
        profilePicture: "path/to/artist/profile/picture.jpg",
        timestamp: new Date().toISOString(),
      };
      setPosts([...posts, newPost]);
      resetForm(); // Clear form fields after successful post creation
      setTabValue(0); // Reset tab value to the Feed tab after post creation
      handleDialogClose(); // Close the dialog after successful post creation
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach((err) => {
          errorMessages[err.path] = err.message;
        });
        console.log("Validation errors:", errorMessages);
      }
    }
  };


  const handleCardClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleClosePostDialog = () => {
    setSelectedPost(null);
  };

  const handleProfileClick = () => {
    router.push("/artist/fanClub/Profile"); // Replace with actual path to the artist's profile
  };

  return (
    <Container maxWidth="xl">
      <Paper
        sx={{
          p: 2,
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5" component="div">
            Artist Page
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 2 }}>
            This is a place where you can share your latest posts, updates, and
            news with your audience.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProfileClick}
        >
          Go to Profile
        </Button>
      </Paper>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Feed" />
        <Tab label="Photos" />
        <Tab label="Videos" />
        <Tab label="News" />
        <Tab label="Events" />
      </Tabs>
      <Box sx={{ display: tabValue === 0 ? "block" : "none" }}>
        <FeedTab
          posts={posts}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
          onAddComment={handleAddComment}
          onEditComment={() => {}}
          onDeleteComment={() => {}}
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

<Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ title: '', content: '', image: null, video: null }}
            validationSchema={validationSchema}
            onSubmit={handleCreatePost}
          >
            {({ setFieldValue, errors, touched,resetForm  }) => (
              <Form>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  fullWidth
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  margin="dense"
                />
                <Field
                  as={TextField}
                  name="content"
                  label="Content"
                  
                  multiline
                  rows={4}
                  error={touched.content && !!errors.content}
                  helperText={touched.content && errors.content}
                  margin="dense"
                  sx={{width:"100%"}}
                />
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue('image', file);
                    setSelectedImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                  style={{ margin: '16px 0' }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected Image"
                    style={{ maxWidth: '100%', marginTop: '16px' }}
                  />
                )}
                {touched.image && errors.image && (
                  <Typography variant="body2" color="error">
                    {errors.image}
                  </Typography>
                )}
                <input
                  id="video"
                  name="video"
                  type="file"
                  accept="video/*"
                  onChange={(event) => {
                    setFieldValue('video', event.currentTarget.files[0]);
                  }}
                  style={{ margin: '16px 0' }}
                />
                {touched.video && errors.video && (
                  <Typography variant="body2" color="error">
                    {errors.video}
                  </Typography>
                )}
                <DialogActions>
                  <Button onClick={handleDialogClose} color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                    Create
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {selectedPost && (
        <Dialog open={true} onClose={handleClosePostDialog} maxWidth="md" fullWidth>
          <DialogTitle>{selectedPost.title}</DialogTitle>
          <DialogContent>
            <Card>
              <CardHeader
                avatar={<Avatar src={selectedPost.profilePicture} />}
                title={selectedPost.user}
                subheader={new Date(selectedPost.timestamp).toLocaleString()}
              />
              {selectedPost.image && (
                <CardMedia component="img" image={selectedPost.image} alt={selectedPost.title} />
              )}
              {selectedPost.video && (
                <CardMedia component="video" controls>
                  <source src={selectedPost.video} type="video/mp4" />
                </CardMedia>
              )}
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {selectedPost.content}
                </Typography>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={selectedPost !== null} onClose={handleClosePostDialog}>
        {selectedPost && (
          <>
            <DialogTitle>{selectedPost.title}</DialogTitle>
            <DialogContent>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar src={selectedPost.profilePicture} alt="User" />
                  }
                  title={selectedPost.user}
                  subheader={new Date(selectedPost.timestamp).toLocaleString()}
                />
                {selectedPost.image && (
                  <CardMedia
                    component="img"
                    image={selectedPost.image}
                    alt="Post Image"
                  />
                )}
                {selectedPost.video && (
                  <CardMedia
                    component="video"
                    controls
                    src={selectedPost.video}
                  />
                )}
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPost.content}
                  </Typography>
                </CardContent>
              </Card>
              {selectedPost.comments.map((comment) => (
                <Paper
                  key={comment.id}
                  elevation={1}
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Avatar
                    src={comment.profilePicture}
                    alt={comment.user}
                    sx={{ mr: 2 }}
                  />
                  <div>
                    <Typography variant="body2">
                      <strong>{comment.user}</strong>
                    </Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(comment.timestamp).toLocaleString()}
                    </Typography>
                  </div>
                </Paper>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePostDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ArtistPage;
