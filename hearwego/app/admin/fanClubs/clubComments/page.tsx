"use client";

import useAudio from "@/app/Hooks/useAudio";
import { ADHomeTabBox, ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
  duration,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { IoIosPause, IoIosPlay, IoMdMore } from "react-icons/io";
import { MdAlbum, MdDelete } from "react-icons/md";
import { GiSoundWaves } from "react-icons/gi";
import {
  SongCard,
  SongCardButtonGroup,
  SongCardCoverArt,
  SongCardItem,
  SongCardPlayButton,
} from "@/app/styles/songCard.styles";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { bool } from "aws-sdk/clients/signer";
import { Song } from "@/app/constants/models";
import { useRouter } from "next/navigation";
import { getSongs, getSongsForArtist } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import { getAllFanClubs } from "@/app/services/FanClubServices";
import { FanClub } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";
import { Artist } from "@/app/constants/models";
import { getFanClubs } from "@/app/services/FanClubServices";
import { getClubMembers } from "@/app/services/FanClubServices";
import { ClubMember } from "@/app/constants/models";
import { getAllUsers } from "@/app/services/UserServices";
import { User } from "@/app/constants/models";
import { getClubPosts } from "@/app/services/FanClubServices";
import { ClubPost } from "@/app/constants/models";
import { getComments } from "@/app/services/FanClubServices";
import { Comment } from "@/app/constants/models";
import router from "next/router";
// import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem, DataGrid, GridToolbar } from "@mui/x-data-grid";
import { get } from "http";

function FanClubsDataGrid() {
  const router = useRouter();
  const [clubComments, setClubComments] = useState<Comment[]>([]);
  const [clubPosts, setClubPosts] = useState<ClubPost[]>([]);
  const [clubMembers, setClubMembers] = useState<ClubMember[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    getComments(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjFiMTNiYTg1MDg2ZjY1MDc4NzMwMCIsInJvbGUiOiJhcnRpc3QiLCJpYXQiOjE3MTg1MTAxNjAsImV4cCI6MTcxODc2OTM2MH0.bKV_fcbrHdDRtLS9kmyC4ubDLH4nKYTLPLQbndLRL5w"
    ).then((comments) => {
      console.log("Club Comments......", comments);
      setClubComments(comments);
    });

    getClubPosts(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjFiMTNiYTg1MDg2ZjY1MDc4NzMwMCIsInJvbGUiOiJhcnRpc3QiLCJpYXQiOjE3MTg1MTAxNjAsImV4cCI6MTcxODc2OTM2MH0.bKV_fcbrHdDRtLS9kmyC4ubDLH4nKYTLPLQbndLRL5w"
    ).then((posts) => {
      console.log("Club Posts......", posts);
      setClubPosts(posts);
    });

    getAllUsers().then((users) => {
      console.log("Users......", users);
      setUsers(users.data);
    });

    getAllArtists().then((artists) => {
      console.log("Artists......", artists);
      setArtists(artists.data);
    });
  }, []);

  const getPostImg = (postId) => {
    const post = clubPosts.find((post) => post.postId === postId);
    return post
      ? post.postImage_URL
      : "https://hwgbucket.s3.ap-south-1.amazonaws.com/images/profile.png";
  };

  const getPostPublisher = (postId) => {
    const post = clubPosts.find((post) => post.postId === postId);
    return post ? post.postpublisher : "-";
  };

  const getPostClub = (postId) => {
    const post = clubPosts.find((post) => post.postId === postId);
    return post ? post.clubId : "-";
  };

  function createCommentData(
    commentId: string,
    commenter: string,
    commentBody: string,
    postId: string,
    createdAt: string,
    updatedAt: string
  ) {
    return {
      commentId,
      commenter,
      commentBody,
      postId,
      createdAt,
      updatedAt,
    };
  }

  const cmRows = clubComments.map((fc) => {
    return createCommentData(
      fc.commentId,
      fc.commenter,
      fc.commentBody,
      fc.postId,
      fc.createdAt,
      fc.updatedAt
    );
  });

  const columns = [
    { field: "commentId", headerName: "Comment ID", flex: 1 },
    {
      field: "postImage",
      headerName: "Post Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={getPostImg(params.row.postId)}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    { field: "commenter", headerName: "Commenter", flex: 2 },
    { field: "commentBody", headerName: "Comment", flex: 2 },
    { field: "postId", headerName: "Post ID", flex: 2 },
    {
      field: "postPublisher",
      headerName: "Publisher ID",
      flex: 2,
      valueGetter: (params) => getPostPublisher(params.row.postId),
    },
    {
      field: "clubId",
      headerName: "Club ID",
      flex: 1,
      valueGetter: (params) => getPostClub(params.row.postId),
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <ButtonGroup>
          <IconButton color="primary" sx={{ fontSize: "16px" }}>
            <FaEdit />
          </IconButton>
          {/* <Link href={`/app/admin/events/${params.row.event_id}`}> */}
          <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => {
              router.push(`/admin/fanClubs/clubMembers`);
            }}
          >
            <FaEye />
          </IconButton>
          <IconButton color="error" sx={{ fontSize: "16px" }}>
            <MdDelete />
          </IconButton>
        </ButtonGroup>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={cmRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row.commentId}
        // checkboxSelection
        // disableSelectionOnClick
      />
    </div>
  );
}

const AdminUserPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          >
            Fan Club Comments
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                // background: "#000",
                border: "1px solid #000",
                color: "#000",
              }}
              onClick={() => {
                router.push(`/admin/fanClubs`);
              }}
            >
              Fan Clubs
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                // background: "#000",
                border: "1px solid #000",
                color: "#000",
              }}
              onClick={() => {
                router.push(`/admin/clubMembers`);
              }}
            >
              Club Members
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                // background: "#000",
                border: "1px solid #000",
                color: "#000",
              }}
              onClick={() => {}}
            >
              Reacts
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                // background: "#000",
                border: "1px solid #000",
                color: "#000",
              }}
              onClick={() => {
                router.push(`/admin/fanClubs/clubPosts`);
              }}
            >
              Posts
            </Button>
            <Button
              variant="contained"
              startIcon={<IoAddOutline />}
              sx={{
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
              }}
              onClick={() => {}}
            >
              Create fan club
            </Button>
          </Stack>
        </Box>
        <ADTabBox>
          <FanClubsDataGrid />
        </ADTabBox>
      </Card>
    </Grid>
  );
};

export default AdminUserPage;
