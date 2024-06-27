"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  
} from "@mui/material";

import SinglePost from "./SinglePost/page";
import { ClubPost } from "../../constants/models";

// import Post from "./page/Post";
// import { Comment } from "./page";


type FeedTabProps = {
  posts: ClubPost[];
  onDeletePost: (postId: number) => void;
  onEditPost: (postId: number, updatedPost: ClubPost) => void;
  onAddComment: (postId: number, comment: Comment) => void;
  onEditComment: (
    postId: number,
    commentId: number,
    updatedContent: string
  ) => void;
  onDeleteComment: (postId: number, commentId: number) => void;
  onAddPost: (newPost: ClubPost) => void;
};

const FeedTab = ({
  posts,
  onDeletePost,
  onEditPost,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onAddPost,
}: FeedTabProps) => {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} key={post.postId}>
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
