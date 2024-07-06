"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Container,
  CircularProgress,
} from "@mui/material";
import CampaignCard from "./CampaignSeeMore/[id]/SingleCampaignCard";
import CreateCampaignPop from "./CreateCampaign/page";
import CreatePost from "./SchedulePost/page";
import ScheduledPostCard from "./scheduledPostView/[id]/page";
import { PRCampaigns, PRPosts } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import {
  getPRCampaignsByArtist,
  getPRPostsByArtist,
} from "@/app/services/PrServices";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<PRCampaigns[]>([]);
  const [ScheduledPosts, setScheduledPosts] = useState<PRPosts[]>([]);
  const [openCreateCampaignDialog, setOpenCreateCampaignDialog] =
    useState(false);
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const artist = useAppSelector((state) => state.artist.user);

  useEffect(() => {
    if (artist?.token) {
      getPRCampaignsByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((response) => {
          setCampaigns(response.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [artist?.token, artist?.user?.artist_id]);

  useEffect(() => {
    if (artist?.token) {
      getPRPostsByArtist(
        artist.token,
        artist?.user?.artist_id ? artist.user.artist_id : ""
      )
        .then((response) => {
          setScheduledPosts(response.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [artist?.token, artist?.user?.artist_id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CampaignTabPanel = ({ status }: { status: string }) => {
    const filteredCampaigns = campaigns.filter(
      (campaign) => campaign.CampaignStatus === status
    );

    return (
      <Grid container spacing={3}>
        {filteredCampaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={campaign.CampaignID}>
            <CampaignCard
              title={campaign?.Campaign_Name as string}
              image={campaign?.CampaignImage_URL as string}
              description={campaign?.Campaign_Description as string}
              completedProgress={campaign?.completedProgress as number}
              status={campaign?.CampaignStatus}
              tasks={campaign?.PRtask}
              id={campaign?.CampaignID as string}
              token={artist?.token as string}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const ScheduledPostsTabPanel = () => {
    return (
      <Grid container spacing={3}>
        {ScheduledPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.PrPostID}>
            <ScheduledPostCard
              description={post.Description as string}
              assignedCampaign={post.CampaignID as string}
              image={post.PostImage_URL as string}
              socialMedias={post.SocialMedias as string[]}
              date={post.Scheduled_Date as Date}
              time={post.Scheduled_Time as string}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const TabPanel = ({
    children,
    value,
    index,
  }: {
    children: React.ReactNode;
    value: number;
    index: number;
  }) => {
    return (
      <div hidden={value !== index}>
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  };

  return (
    <>
      <Container maxWidth="xl">
        <AppBar
          position="static"
          sx={{ bgcolor: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              variant={isSmallScreen ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
            >
              <Tab label="In Progress" />
              <Tab label="Completed" />
              <Tab label="Scheduled Posts" />
            </Tabs>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => setOpenCreateCampaignDialog(true)}
            >
              Create New Campaign
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => setOpenCreatePostDialog(true)}
            >
              Schedule New Post
            </Button>
          </Toolbar>
        </AppBar>
        {loading ? (
          <Box p={3} textAlign="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={3}>
            <Typography variant="h6" color="error">
              Something went wrong: {error.message}
            </Typography>
          </Box>
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <CampaignTabPanel status="in_progress" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CampaignTabPanel status="completed" />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ScheduledPostsTabPanel />
            </TabPanel>
          </>
        )}
      </Container>
      <CreateCampaignPop
        open={openCreateCampaignDialog}
        onClose={() => setOpenCreateCampaignDialog(false)}
      />
      <CreatePost
        open={openCreatePostDialog}
        onClose={() => setOpenCreatePostDialog(false)}
      />
    </>
  );
};

export default Dashboard;
