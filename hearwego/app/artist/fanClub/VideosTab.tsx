"use client";
import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import { Post } from "./page";

type VideosTabProps = {
  posts: Post[];
  handleCardClick: (post: Post) => void;
};

const VideosTab: React.FC<VideosTabProps> = ({ posts, handleCardClick }) => {
  return (
    <Grid container spacing={2}>
      {posts
        .filter((post) => post.video)
        .map((post) => (
          <Grid item xs={6} md={4} key={post.id}>
            <Tooltip
              title={
                <React.Fragment>
                  <Typography variant="body2">Likes: {post.likes}</Typography>
                  <Typography variant="body2">
                    Comments: {post.comments.length}
                  </Typography>
                </React.Fragment>
              }
              placement="top"
              arrow
            >
              <Card
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  "&:hover": {
                    "& $overlay": {
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => handleCardClick(post)}
              >
                <CardActionArea>
                  <CardMedia
                    component="video"
                    height="200"
                    src={post.video}
                    controls
                    sx={{
                      filter: "blur(0)",
                      transition: "filter 0.3s ease",
                      "&:hover": {
                        filter: "blur(4px)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    className="overlay"
                  >
                    <Box sx={{ color: "#fff", textAlign: "center" }}>
                      <Typography variant="body2">
                        Likes: {post.likes}
                      </Typography>
                      <Typography variant="body2">
                        Comments: {post.comments.length}
                      </Typography>
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            </Tooltip>
          </Grid>
        ))}
    </Grid>
  );
};

export default VideosTab;
