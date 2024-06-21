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
} from "@mui/material";
import CampaignCard from "./CampaignSeeMore/[id]/SingleCampaignCard"; // Ensure this is correctly imported
import CreateCampaignPop from "./CreateCampaign/page"; // Ensure this is correctly imported
import CreatePost from "./SchedulePost/page";
import ScheduledPostCard from "./scheduledPostView/[id]/page"; // Ensure this is correctly imported
import { PRCampaigns } from "@/app/constants/models";
import { useAppSelector } from "@/lib/hooks";
import { getPRCampaigns } from "@/app/services/PrServices";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [campaigns, setCampaigns] = useState<PRCampaigns[]>([]);
  const [openCreateCampaignDialog, setOpenCreateCampaignDialog] =
    useState(false);
  const [openCreatePostDialog, setOpenCreatePostDialog] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const artist = useAppSelector((state) => state.artist.user);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsData = await getPRCampaigns(artist ? artist.token : "");
        if (Array.isArray(campaignsData)) {
          setCampaigns(campaignsData);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchCampaigns();
  }, [artist?.token]);

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
              title={campaign.Campaign_Name}
              image={campaign.CampaignImage_URL}
              description={campaign.Campaign_Description}
              completedProgress={campaign.Com_percentage}
              status={campaign.CampaignStatus}
              tasks={campaign.PRtask}
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
              description={post.description}
              assignedCampaign={post.assignedCampaign}
              image={post.image}
              socialMedias={post.socialMedias}
              date={post.date}
              time={post.time}
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
      <Container maxWidth="xxl">
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
        {error ? (
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
