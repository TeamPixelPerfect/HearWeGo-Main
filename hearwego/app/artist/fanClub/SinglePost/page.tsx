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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

const CommentList = ({
  comments,
  handleReply,
  handleDeleteComment,
  replyingCommentId,
  replyContent,
  setReplyContent,
  handleSendReply,
}) => (
  <List sx={{ maxHeight: 200, overflow: "auto" }}>
    {comments.map((comment) => (
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
              <IconButton onClick={() => handleReply(comment.id)}>
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
                  onClick={() => handleDeleteComment(comment.id, reply.id)}
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
  </List>
);

const SinglePost = ({
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(post.content);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
    setIsEditing(true);
    handleMenuClose();
  };

  const handleDeletePost = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    onDeletePost(post.id);
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleSaveEdit = () => {
    onEditPost(post.id, { ...post, content: editedContent });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

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

      {isEditing ? (
        <>
          <TextField
            fullWidth
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEdit}
            sx={{ mr: 2 }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Typography variant="body1" gutterBottom>
          {post.content}
        </Typography>
      )}

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

          <CommentList
            comments={post.comments}
            handleReply={handleReplyToComment}
            handleDeleteComment={handleDeleteComment}
            replyingCommentId={replyingCommentId}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleSendReply={handleSendReply}
          />

          <Formik
            initialValues={{ comment: "" }}
            validationSchema={Yup.object({
              comment: Yup.string().required("Comment is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleAddComment();
              setSubmitting(false);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  as={TextField}
                  name="comment"
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
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
              </form>
            )}
          </Formik>
        </>
      )}

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SinglePost;
