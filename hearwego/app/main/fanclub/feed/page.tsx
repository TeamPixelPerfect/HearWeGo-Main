"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  TextField,
  Container,
  Grid,
  Paper,
  Button,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "@/lib/hooks";
import { getClubPostsByArtist } from "@/app/services/FanClubServices";
import { ClubPost, comments, replies, reacts } from "../../../constants/models";
import { getArtist } from "@/app/services/ArtistServices";

type Comment = {
  id: number;
  user: string;
  content: string;
  profilePicture: string;
  timestamp: string;
  isArtist?: boolean;
  replies?: Comment[];
};

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  profilePicture: string;
  user: string;
  timestamp: string;
  comments: Comment[];
};

interface Props {
  artist_id: string;
}
const FanClubFanPage = ({ artist_id }: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clubPost, setClubPost] = useState<ClubPost[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"post" | "news" | null>(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    console.log("Artist ID: ", artist_id);
    getClubPostsByArtist(user?.token as string, artist_id)
      .then((post) => {
        console.log("Club Posts: ", post);
        setClubPost(post.data);
      })
      .catch((error) => console.log(error));
  }, [artist_id]);

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
    const updatedPosts = clubPost.filter((post) => post.id !== postId);
    setClubPost(updatedPosts);
  };

  const handleEditPost = (postId: number, updatedPost: Post) => {
    const updatedPosts = clubPost.map((post: any) =>
      post.id === postId ? updatedPost : post
    );
    setClubPost(updatedPosts);
  };

  const handleAddComment = (postId: number, comment: Comment) => {
    const updatedPosts = clubPost.map((post: any) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });
    setClubPost(updatedPosts);
  };

  const handleReplyToComment = (
    postId: number,
    commentId: number,
    replyContent: string
  ) => {
    const reply: Comment = {
      id: Date.now(),
      user: "Artist",
      content: replyContent,
      profilePicture: "path/to/artist/profile/picture.jpg", // Replace with actual path
      timestamp: new Date().toISOString(),
      isArtist: true,
    };

    const updatedPosts = clubPost.map((post: any) => {
      if (post.id === postId) {
        const updatedComments = post.comments.map((comment: any) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), reply] }
            : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setClubPost(updatedPosts);
  };

  const handleLikePost = (postId: number) => {
    // Placeholder for future backend integration
    // Find the post and update its likes
    const updatedPosts = clubPost.map((post: any) =>
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
    setClubPost(updatedPosts);
  };

  const handleShowComments = (postId: number) => {
    const updatedPosts = clubPost.map((post: any) =>
      post.id === postId ? { ...post, showComments: !post.showComments } : post
    );
    setClubPost(updatedPosts);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Feed
          </Typography>
        </Grid>
        {clubPost.map((post) => {
          let artist = {}
          getArtist(post?.artistId as string).then((res) => {
            console.log(res);
          });
          return (
            <Grid item xs={12} key={post?.artistId}>
              <Paper sx={{ p: 2, marginBottom: 2, borderRadius: "10px" }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    alt="Poster Profile Picture"
                    src={(artist?.user?.profilePicture as string) || ""}
                    sx={{ marginRight: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {artist?.user?.artistName || ""}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(post?.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" gutterBottom>
                  {post.postDescription}
                </Typography>

                {post.postImage_URL && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  >
                    <img
                      src={post.postImage_URL}
                      alt={post.postType}
                      style={{ maxWidth: "70%", minWidth: "70%" }}
                    />
                  </div>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default FanClubFanPage;
