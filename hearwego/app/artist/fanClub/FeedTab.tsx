import React, { useState } from "react";
import { useEffect } from "react";
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
 
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { ClubPost, comments } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getClubPostsByArtist } from "@/app/services/FanClubServices";

const FeedTab = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clubPost, setClubPost] = useState<ClubPost[]>([]);
  const artist = useAppSelector((state) => state.artist.user);

  useEffect(() => {
    if (artist?.token) {
      getClubPostsByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((post) => {
          console.log("Club Posts: ", post);
          setClubPost(post.data);
        })

        .catch((error) => console.log(error));
    }
  }, []);

  const handleMoreClick = (
    event: React.MouseEvent<HTMLElement>,
    post: ClubPost
  ) => {
    setAnchorEl(event.currentTarget);
    setClubPost(post);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMoreClose();
  };

  const handleDeleteClick = () => {
    handleMoreClose();
  };


  return (
    <Box>
      {clubPost.map((ClubPost) => (
        <Card key={ClubPost.createdAt} sx={{ marginBottom: 2 }}>
          <CardHeader
            avatar={<Avatar src={artist?.user?.profilePicture? artist?.user?.profilePicture:""} />}
            action={
              <>
                <Tooltip title="Options">
                  <IconButton
                    aria-label="settings"
                    onClick={(event) => handleMoreClick(event, ClubPost)}
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
            subheader=   {new Date(ClubPost.createdAt).toLocaleString()}
          />
          <CardContent sx={{
            width: "90%",
         
            height: "500px",
          }}>
            <Typography variant="body2" color="textSecondary" component="p">
              {ClubPost.postDescription}
            </Typography>
            {ClubPost.postImage_URL && (
              <img
                src={ClubPost.postImage_URL}
                alt="Post image"
                style={{ width: "100%", marginTop: "1rem" }}
              />
            )}
            <Box sx={{ display: "flex", marginTop: "1rem" }}>
              <IconButton >
                <ThumbUpIcon />
              </IconButton>
              <IconButton
              >
                <CommentIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FeedTab;
