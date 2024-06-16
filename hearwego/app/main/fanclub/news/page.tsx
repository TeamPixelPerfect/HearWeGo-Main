"use client";
import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button, TextField, Avatar, Box, IconButton, Paper } from '@mui/material';
import { deepPurple } from '@mui/material/colors'; // Importing color for Avatar
import { Favorite as FavoriteIcon, Comment as CommentIcon, Reply as ReplyIcon } from '@mui/icons-material'; // Importing icons for like, comment, and reply
import { on } from 'events';

// Dummy data for posts
const initialPosts = [
  { 
    id: 1, 
    artistName: 'The Rembrandts', 
    profileImageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHnaJf7dVGS4_YJ7OwOyWC7F7yia--3nJSR7LULSGIS2VpiYFo', 
    title: 'New Album Release', 
    content: 'Exciting news about the upcoming album!', 
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5b18735a3917ee20d18a2117/1549322017285-94FTON4XM8J7B5R9J2VX/TheRembrandts2018-101_R.jpg', 
    postTime:  new Date().toISOString(), 
    likes: 10, 
    comments: [
      {
        id: 1,
        commenterName: 'Alice',
        commenterImageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
        commentTime:  new Date().toISOString(),
        commentText: 'Great news! Looking forward to it.',
        replies: []
      }
    ]
  },
  { 
    id: 2, 
    artistName: 'The Rembrandts', 
    profileImageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHnaJf7dVGS4_YJ7OwOyWC7F7yia--3nJSR7LULSGIS2VpiYFo', 
    title: 'Concert Tour Announcement', 
    content: 'Tour dates and locations revealed!', 
    imageUrl: 'https://picsum.photos/id/1018/500/300', 
    postTime:  new Date().toISOString(),
    likes: 15, 
    comments: []
  },

  
];

interface Post {
  id: number;
  artistName: string;
  profileImageUrl: string;
  title: string;
  content: string;
  imageUrl: string;
  postTime: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  commenterName: string;
  commenterImageUrl: string;
  commentTime: string;
  commentText: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  replierName: string;
  replierImageUrl: string;
  replyTime: string;
  replyText: string;
}

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [replyingTo, setReplyingTo] = useState<{ postId: number; commentId: number } | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);


  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (postId: number, commentText: string) => {
    const newComment: Comment = {
      id: posts[postId - 1].comments.length + 1,
      commenterName: 'User', // Replace with actual commenter's name
      commenterImageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
      commentTime: new Date().toISOString(),
      commentText,
      replies: []
    };


    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  };

  const handleReply = () => {
    if (!replyingTo) return;

    const { postId, commentId } = replyingTo;

    const newReply: Reply = {
      id: posts[postId - 1].comments[commentId - 1].replies.length + 1,
      replierName: 'User', // Replace with actual replier's name
      replierImageUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      replyTime: new Date().toISOString(),
      replyText
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? {
          ...post,
          comments: post.comments.map(comment =>
            comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
          )
        } : post
      )
    );

    // Clear reply state
    setReplyingTo(null);
    setReplyText('');
  };

  const handleReplyButtonClick = (postId: number, commentId: number) => {
    setReplyingTo({ postId, commentId });
  };

  const handleCommentExpand = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {posts.map(post => (
          <Grid item key={post.id} xs={12}>
            <Card variant="outlined">
              {/* Profile Picture, Artist Name, and Post Time */}
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar sx={{ bgcolor: deepPurple[500] }} src={post.profileImageUrl} alt={post.artistName} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{post.artistName}</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date(post.postTime).toLocaleString()}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {/* Content above the Image */}
              <CardContent>
                <Typography variant="h5" color="text.secondary">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              {/* Post Image with Title */}
              <Box position="relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                />
                <Box position="absolute" bottom={0} left={0} right={0} bgcolor="rgba(0, 0, 0, 0.5)" color="white" p={2}>
                  <Typography variant="h3" sx={{fontWeight:"bold"}}>
                    {post.title}
                  </Typography>
                </Box>
              </Box>
              {/* Like Button and Comments */}
              <CardActions >
                <Button
                  size="small"
                  startIcon={<FavoriteIcon />}
                  onClick={() => handleLike(post.id)}
                >
                  Like ({post.likes})
                </Button>
                <Button
                  size="small"
                  startIcon={<CommentIcon />}
                  onClick={() => handleCommentExpand(post.id)}
                >
                  Comments ({post.comments.length})
                </Button>
              </CardActions>
              {post.showComments && (
                <CardContent>
                  {post.comments.map(comment => (
                    <Paper key={comment.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Avatar src={comment.commenterImageUrl} alt={comment.commenterName} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2">{comment.commenterName}</Typography>
                          <Typography variant="caption" color="text.secondary">{new Date(comment.commentTime).toLocaleString()}</Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="body2" sx={{ mt: 1 }}>{comment.commentText}</Typography>
                      {comment.replies.map(reply => (
                        <Paper key={reply.id} elevation={1} sx={{ p: 2, mt: 1, ml: 3 }}>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                              <Avatar src={reply.replierImageUrl} alt={reply.replierName} />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle2">{reply.replierName}</Typography>
                              <Typography variant="caption" color="text.secondary">{new Date(reply.replyTime).toLocaleString()}</Typography>
                            </Grid>
                          </Grid>
                          <Typography variant="body2" sx={{ mt: 1 }}>{reply.replyText}</Typography>
                        </Paper>
                      ))}
                      {replyingTo?.postId === post.id && replyingTo.commentId === comment.id && (
                        <Box sx={{ mt: 2, ml: 2 }}>
                          <TextField                             fullWidth
                            variant="outlined"
                            placeholder={`Replying to ${comment.commenterName}`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleReply();
                              }
                            }}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            // sx={{ mt: 1 }}
                            onClick={handleReply}
                          >
                            Reply
                          </Button>
                        </Box>
                      )}
                      {!replyingTo && (
                        <IconButton
                          size="small"
                          onClick={() => handleReplyButtonClick(post.id, comment.id)}
                          sx={{ ml: 2, mt: 1 }}
                        >
                          <ReplyIcon />
                        </IconButton>
                      )}
                    </Paper>
                  ))}
                  <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(post.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </CardContent>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage;



