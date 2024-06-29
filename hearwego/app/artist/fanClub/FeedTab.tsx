import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { ClubPost, comments } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";

interface FeedTabProps {
  posts: ClubPost[];
  onDeletePost: (postId: string) => void;
  onEditPost: (postId: string, updatedPost: ClubPost) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

const FeedTab: React.FC<FeedTabProps> = ({ posts, onDeletePost, onEditPost, onLikePost, onAddComment }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPost, setSelectedPost] = useState<ClubPost | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState<{ [key: string]: boolean }>({});
  const [comment, setComment] = useState("");
  const artist = useAppSelector((state) => state.artist.user);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, post: ClubPost) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditOpen(true);
    handleMoreClose();
  };

  const handleDeleteClick = () => {
    setDeleteOpen(true);
    handleMoreClose();
  };

  const handleDeleteConfirm = () => {
    if (selectedPost) {
      onDeletePost(selectedPost.timestamps);
    }
    setDeleteOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSubmit = (updatedDescription: string) => {
    if (selectedPost) {
      onEditPost(selectedPost.timestamps, { ...selectedPost, postDescription: updatedDescription });
    }
    setEditOpen(false);
  };

  const handleLike = (postId: string) => {
    onLikePost(postId);
  };

  const handleAddComment = (postId: string) => {
    if (comment) {
      onAddComment(postId, comment);
      setComment("");
      setCommentOpen({ ...commentOpen, [postId]: false });
    }
  };

  const handleCommentIconClick = (postId: string) => {
    setCommentOpen({ ...commentOpen, [postId]: !commentOpen[postId] });
  };

  return (
    <Box>
      {posts.map((post) => (
        <Card key={post.timestamps} sx={{ marginBottom: 2 }}>
          <CardHeader
            avatar={<Avatar src={artist?.user.profilePicture} />}
    
            action={
              <>
                <Tooltip title="Options">
                  <IconButton
                    aria-label="settings"
                    onClick={(event) => handleMoreClick(event, post)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMoreClose}
                >
                  <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                  <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                </Menu>
              </>
            }
            title={artist?.user.artistName}
            subheader={new Date(post.timestamps ?? "").toLocaleString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.postDescription}
            </Typography>
            {post.postImage_URL && (
              <img
                src={post.postImage_URL}
                alt="Post image"
                style={{ width: "100%", marginTop: "1rem" }}
              />
            )}
            <Box sx={{ display: 'flex', marginTop: '1rem' }}>
              <IconButton onClick={() => handleLike(post.timestamps)}>
                <ThumbUpIcon />
              </IconButton>
              <IconButton onClick={() => handleCommentIconClick(post.timestamps)}>
                <CommentIcon />
              </IconButton>
            </Box>
            {commentOpen[post.timestamps] && (
              <Box sx={{ marginTop: '1rem' }}>
                <TextField
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  label="Add a comment"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
                <Button
                  onClick={() => handleAddComment(post.timestamps)}
                  variant="contained"
                  sx={{ marginTop: '0.5rem' }}
                >
                  Comment
                </Button>
              </Box>
            )}
            {post.comments && post.comments.length > 0 && (
              <Box sx={{ marginTop: '1rem' }}>
                {post.comments.map((comment: Comment, index: number) => (
                  <Box key={index} sx={{ marginBottom: '0.5rem' }}>
                    <Typography variant="body2">
                      <strong>{comment.user}:</strong> {comment.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            defaultValue={selectedPost?.postDescription}
            onChange={(e) => setSelectedPost({ ...selectedPost, postDescription: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleEditSubmit(selectedPost?.postDescription || "")} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedTab;
