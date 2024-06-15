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
} from "@mui/material";
import {
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
  onDeleteComment: (
    postId: number,
    commentId: number,
    replyId?: number
  ) => void; // Update the type of onDeleteComment
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

  const handleDeleteComment = (commentId: number, replyId?: number) => {
    if (replyId !== undefined) {
      // Delete reply comment
      onDeleteComment(post.id, commentId, replyId);
    } else {
      // Delete top-level comment
      onDeleteComment(post.id, commentId);
    }
  };

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

  return (
    <Paper sx={{ p: 2, marginBottom: 2 }}>
      <Typography variant="h6" component="div" gutterBottom>
        {post.title}
      </Typography>
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

      <Typography variant="h6" component="div" gutterBottom>
        Comments
      </Typography>
      <List>
        {post.comments.map((comment) => (
          <div key={comment.id}>
            <ListItem>
              <ListItemText
                primary={comment.user}
                secondary={comment.content}
              />
              <ListItemSecondaryAction>
                {!comment.isArtist && (
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
