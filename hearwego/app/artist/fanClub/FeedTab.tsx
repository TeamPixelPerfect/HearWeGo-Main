"use client";   
import React from "react";
import { Grid } from "@mui/material";
import SinglePost from "./SinglePost/page";
import { Post, Comment } from "./page";

type FeedTabProps = {
  posts: Post[];
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

const FeedTab: React.FC<FeedTabProps> = ({
  posts,
  onDeletePost,
  onEditPost,
  onAddComment,
  onEditComment,
  onDeleteComment,
}) => {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <SinglePost
            post={post}
            onDeletePost={onDeletePost}
            onEditPost={onEditPost}
            onAddComment={onAddComment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeedTab;
