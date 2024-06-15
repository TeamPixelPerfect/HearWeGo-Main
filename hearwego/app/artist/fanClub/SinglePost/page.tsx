"use client";
import React, { useState } from "react";
import {
  Typography,
  Paper,
  IconButton,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Reply as ReplyIcon,
} from "@mui/icons-material";

type Comment = {
  id: number;
  user: string;
  content: string;
  isArtist?: boolean;
  replies?: Comment[];
};

type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
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
  onDeleteComment: (postId: number, commentId: number) => void;
};

const SinglePost: React.FC<Props> = ({
  post,
  onDeletePost,
  onEditPost,
  onAddComment,
  onEditComment,
  onDeleteComment,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(
    null
  );
  const [replyContent, setReplyContent] = useState("");

  const handleEditPost = () => setEditMode(true);

  const handleSavePost = () => {
    const updatedPost = {
      ...post,
      title: editedTitle,
      content: editedContent,
    };
    onEditPost(post.id, updatedPost);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setEditMode(false);
  };

  const handleDeletePost = () => onDeletePost(post.id);

  const handleAddComment = () => {
    const comment: Comment = {
      id: Date.now(),
      user: "Artist", // Replace with actual artist info
      content: newComment,
      isArtist: true,
      replies: [],
    };
    onAddComment(post.id, comment);
    setNewComment("");
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  const handleSaveComment = () => {
    if (editingCommentId !== null) {
      onEditComment(post.id, editingCommentId, editingCommentContent);
      setEditingCommentId(null);
      setEditingCommentContent("");
    }
  };

  const handleDeleteComment = (commentId: number) =>
    onDeleteComment(post.id, commentId);

  const handleReplyToComment = (commentId: number) =>
    setReplyingCommentId(commentId);

  const handleSendReply = () => {
    if (replyingCommentId !== null) {
      const reply: Comment = {
        id: Date.now(),
        user: "Artist",
        content: replyContent,
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

  return (
    <Paper sx={{ p: 2, marginBottom: 2 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          {editMode ? (
            <>
              <TextField
                fullWidth
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                variant="standard"
                margin="dense"
                label="Title"
              />
              <TextField
                fullWidth
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                variant="standard"
                margin="dense"
                label="Content"
                multiline
                rows={4}
              />
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {post.content}
              </Typography>
            </>
          )}
        </div>
        <div>
          <IconButton onClick={editMode ? handleCancelEdit : handleEditPost}>
            <EditIcon />
          </IconButton>
          {editMode ? (
            <IconButton onClick={handleSavePost}>
              <SendIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </div>

      {post.image && (
        <div style={{ textAlign: "center", marginTop: 16, marginBottom: 16 }}>
          <img src={post.image} alt={post.title} style={{ maxWidth: "100%" }} />
        </div>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" component="div" gutterBottom>
        Comments
      </Typography>
      <List>
        {post.comments.map((comment) => (
          <div key={comment.id}>
            <ListItem>
              <ListItemText
                primary={comment.user}
                secondary={
                  editingCommentId === comment.id ? (
                    <TextField
                      fullWidth
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                      variant="standard"
                      margin="dense"
                    />
                  ) : (
                    comment.content
                  )
                }
              />
              <ListItemSecondaryAction>
                {comment.isArtist ? (
                  <>
                    {editingCommentId === comment.id ? (
                      <IconButton onClick={handleSaveComment}>
                        <SendIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEditComment(comment)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </>
                ) : (
                  <IconButton onClick={() => handleReplyToComment(comment.id)}>
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
                  <ListItemText
                    primary={reply.user}
                    secondary={reply.content}
                  />
                  <ListItemSecondaryAction>
                    {reply.isArtist && (
                      <>
                        {editingCommentId === reply.id ? (
                          <IconButton onClick={handleSaveComment}>
                            <SendIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => handleEditComment(reply)}>
                            <EditIcon />
                          </IconButton>
                        )}
                      </>
                    )}
                    <IconButton onClick={() => handleDeleteComment(reply.id)}>
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
        <ListItem>
          <TextField
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="standard"
            margin="dense"
            label="Add a comment"
          />
          <IconButton onClick={handleAddComment}>
            <SendIcon />
          </IconButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default SinglePost;
