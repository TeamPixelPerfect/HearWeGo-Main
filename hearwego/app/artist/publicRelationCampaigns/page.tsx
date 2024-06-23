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
import { PRCampaigns } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getPRCampaignsByArtist } from "@/app/services/PrServices";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<PRCampaigns[]>([]);
  const [openCreateCampaignDialog, setOpenCreateCampaignDialog] =
    useState(false);
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const artist = useAppSelector((state) => state.artist.user);

  useEffect(() => {
    if (artist?.token) {
      getPRCampaignsByArtist(artist.token, artist?.user?.artist_id ? artist.user.artist_id : "")
        .then((response) => {
          setCampaigns(response.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [artist?.token, artist?.user?.artist_id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CampaignTabPanel = ({ status }: { status: string }) => {
    console.log(status, campaigns)
    const filteredCampaigns = campaigns.filter(
      (campaign) => campaign.CampaignStatus === status
    );

    return (
      <Grid container spacing={3}>
        {filteredCampaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={campaign.CampaignID}>
            <CampaignCard
              title={campaign?.Campaign_Name}
              image={campaign?.CampaignImage_URL}
              description={campaign?.Campaign_Description}
              completedProgress={campaign?.Com_percentage}
              status={campaign?.CampaignStatus}
              tasks={campaign?.PRtask}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const ScheduledPostsTabPanel = () => {
    const scheduledPosts = campaigns.flatMap(
      (campaign) => campaign.PRPosts || []
    );

    return (
      <Grid container spacing={3}>
        {scheduledPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <ScheduledPostCard
              description={post.Description}
              assignedCampaign={post.CampaignID}
              image={post.PostImage_URL}
              socialMedias={post.SocialMedias}
              date={post.Scheduled_Date}
              time={post.Scheduled_Time}
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
