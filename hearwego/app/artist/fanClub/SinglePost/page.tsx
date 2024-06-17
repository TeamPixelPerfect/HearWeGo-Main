import React, { useState } from "react";
import {
  Typography,
  Paper,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { Formik, Field } from "formik";
import * as Yup from "yup";

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

type Props = {
  post: Post;
  onDeletePost: (postId: number) => void;
  onEditPost: (postId: number, updatedPost: Post) => void;
  onAddComment: (postId: number, comment: Comment) => void;
  onEditComment: (
    postId: number,
    commentId: number,
    updatedContent: string
  ) => void;
  onDeleteComment: (
    postId: number,
    commentId: number,
    replyId?: number
  ) => void;
};

const SinglePost: React.FC<Props> = ({
  post,
  onDeletePost,
  onEditPost,
  onAddComment,
  onEditComment,
  onDeleteComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(
    null
  );
  const [replyContent, setReplyContent] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState<number>(10); // Dummy data for likes count
  const [liked, setLiked] = useState<boolean>(false); // Track if post is liked
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDeleteComment = (commentId: number, replyId?: number) => {
    if (replyId !== undefined) {
      // Delete only the reply
      const updatedComments = post.comments.map((comment) => {
        if (comment.id === commentId && comment.replies) {
          const updatedReplies = comment.replies.filter(
            (reply) => reply.id !== replyId
          );
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      });

      onEditPost(post.id, { ...post, comments: updatedComments });
    } else {
      // Delete the entire comment
      const updatedComments = post.comments.filter(
        (comment) => comment.id !== commentId
      );
      onEditPost(post.id, { ...post, comments: updatedComments });
    }
  };

  const handleReplyToComment = (commentId: number) => {
    setReplyingCommentId(commentId);
    setReplyContent("");
  };

  const handleSendReply = () => {
    if (replyingCommentId !== null && replyContent.trim()) {
      const reply: Comment = {
        id: Date.now(),
        user: "Artist",
        content: replyContent,
        profilePicture: "path/to/artist/profile/picture.jpg", // Replace with actual path
        timestamp: new Date().toISOString(),
        isArtist: true,
      };

      const updatedComments = post.comments.map((comment) =>
        comment.id === replyingCommentId
          ? { ...comment, replies: [...(comment.replies || []), reply] }
          : comment
      );

      onEditPost(post.id, { ...post, comments: updatedComments });
      setReplyingCommentId(null);
      setReplyContent("");
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: "Maroon5", // Replace with actual user info
        content: newComment,
        profilePicture: "path/to/user/profile/picture.jpg", // Replace with actual path
        timestamp: new Date().toISOString(),
        isArtist: true,
        replies: [],
      };
      onAddComment(post.id, comment);
      setNewComment("");
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleLikePost = () => {
    if (!liked) {
      // Placeholder for future backend integration
      setLikes((prevLikes) => prevLikes + 1); // Example incrementing likes
      setLiked(true);
    }
    // Optionally, handle already liked state (if needed)
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    // Implement edit post functionality
    // For demonstration, log a message
    console.log(`Editing post with ID ${post.id}`);
    handleMenuClose();
  };

  const handleDeletePost = () => {
    // Implement delete post functionality
    // For demonstration, call onDeletePost with post.id
    onDeletePost(post.id);
    handleMenuClose();
  };

  return (
    <Paper sx={{ p: 2, marginBottom: 2, borderRadius: "10px" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            alt="Poster Profile Picture"
            src={post.profilePicture}
            sx={{ marginRight: 2 }}
          />
          <div>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {post.user}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(post.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </div>
        </Box>

        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditPost}>Edit</MenuItem>
          <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
        </Menu>
      </Box>

      <Typography variant="body1" gutterBottom>
        {post.content}
      </Typography>

      {post.image && (
        <div style={{ textAlign: "center", marginTop: 16, marginBottom: 16 }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ maxWidth: "70%", minWidth: "70%" }}
          />
        </div>
      )}

      <Divider sx={{ my: 2 }} />

      <Button
        startIcon={<ThumbUpIcon />}
        onClick={handleLikePost}
        disabled={liked}
      >
        Like ({likes})
      </Button>
      <Button startIcon={<CommentIcon />} onClick={handleShowComments}>
        Comment ({post.comments.length})
      </Button>

      {showComments && (
        <>
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" component="div" gutterBottom>
            Comments
          </Typography>
          <List sx={{ maxHeight: 200, overflow: "auto" }}>
            {post.comments.map((comment) => (
              <div key={comment.id}>
                <ListItem>
                  <Avatar
                    alt={comment.user}
                    src={comment.profilePicture}
                    sx={{ marginRight: 2 }}
                  />
                  <ListItemText
                    primary={`${comment.user} - ${new Date(
                      comment.timestamp
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })} ago`}
                    secondary={comment.content}
                  />
                  <ListItemSecondaryAction>
                    {!comment.isArtist && (
                      <IconButton
                        onClick={() => handleReplyToComment(comment.id)}
                      >
                        <ReplyIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDeleteComment(comment.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {comment.replies &&
                  comment.replies.map((reply) => (
                    <ListItem key={reply.id} sx={{ pl: 4 }}>
                      <Avatar
                        alt={reply.user}
                        src={reply.profilePicture}
                        sx={{ marginRight: 2 }}
                      />
                      <ListItemText
                        primary={`${reply.user} - ${new Date(
                          reply.timestamp
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })} ago`}
                        secondary={reply.content}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() =>
                            handleDeleteComment(comment.id, reply.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                {replyingCommentId === comment.id && (
                  <ListItem sx={{ pl: 4 }}>
                    <TextField
                      fullWidth
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      variant="standard"
                      margin="dense"
                      label="Reply to comment"
                    />
                    <IconButton onClick={handleSendReply}>
                      <SendIcon />
                    </IconButton>
                  </ListItem>
                )}
              </div>
            ))}
            <Formik
              initialValues={{ comment: "" }}
              validationSchema={Yup.object({
                comment: Yup.string().required("Comment is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setNewComment(values.comment);
                handleAddComment();
                setSubmitting(false);
              }}
            >
              <Field
                as={TextField}
                name="comment"
                label="Add a comment"
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setNewComment(e.target.value)}
                onKeyDown={(e: { key: string }) => {
                  if (e.key === "Enter") {
                    handleAddComment();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleAddComment} edge="end">
                      <SendIcon />
                    </IconButton>
                  ),
                }}
              />
            </Formik>
          </List>
        </>
      )}
    </Paper>
  );
};

export default SinglePost;
