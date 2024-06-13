"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import CampaignCard from "./CampaignSeeMore/[id]/SingleCampaignCard"; // Ensure this is correctly imported
import CreateCampaignPop from "./CreateCampaign/page"; // Ensure this is correctly imported

const campaigns = [
  {
    id: 1,
    title: "Campaign 1",
    image:
      "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "This is a campaign in progress.",
    completedProgress: 60,
    status: "in_progress",
    tasks: [
      { id: 1, name: "Task 1", completed: false },
      { id: 2, name: "Task 2", completed: true },
      { id: 3, name: "Task 3", completed: false },
    ],
  },
  {
    id: 2,
    title: "Completed Campaign 1",
    image:
      "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "This campaign has been completed.",
    completedProgress: 100,
    status: "completed",
    tasks: [
      { id: 3, name: "Task A", completed: true },
      { id: 4, name: "Task B", completed: true },
      { id: 5, name: "Task C", completed: true },
    ],
  },
  {
    id: 3,
    title: "Campaign 2",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "Another campaign in progress.",
    completedProgress: 40,
    status: "in_progress",
    tasks: [
      { id: 6, name: "Task 4", completed: false },
      { id: 7, name: "Task 5", completed: false },
      { id: 8, name: "Task 6", completed: true },
    ],
  },
  {
    id: 4,
    title: "Completed Campaign 2",
    image:
      "https://images.unsplash.com/photo-1518673741114-0169f29d57e8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "This campaign has also been completed.",
    completedProgress: 100,
    status: "completed",
    tasks: [
      { id: 9, name: "Task D", completed: true },
      { id: 10, name: "Task E", completed: true },
      { id: 11, name: "Task F", completed: true },
    ],
  },
  {
    id: 5,
    title: "Campaign 3",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "Yet another campaign in progress.",
    completedProgress: 75,
    status: "in_progress",
    tasks: [
      { id: 12, name: "Task 7", completed: true },
      { id: 13, name: "Task 8", completed: false },
      { id: 14, name: "Task 9", completed: false },
    ],
  },
  {
    id: 6,
    title: "Completed Campaign 3",
    image:
      "https://images.unsplash.com/photo-1518673741114-0169f29d57e8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "Another campaign that has been completed.",
    completedProgress: 100,
    status: "completed",
    tasks: [
      { id: 15, name: "Task G", completed: true },
      { id: 16, name: "Task H", completed: true },
      { id: 17, name: "Task I", completed: true },
    ],
  },
  {
    id: 7,
    title: "Campaign 4",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "A new campaign in progress.",
    completedProgress: 30,
    status: "in_progress",
    tasks: [
      { id: 18, name: "Task 10", completed: false },
      { id: 19, name: "Task 11", completed: true },
      { id: 20, name: "Task 12", completed: false },
    ],
  },
  {
    id: 8,
    title: "Completed Campaign 4",
    image:
      "https://images.unsplash.com/photo-1518673741114-0169f29d57e8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "This is another completed campaign.",
    completedProgress: 100,
    status: "completed",
    tasks: [
      { id: 21, name: "Task J", completed: true },
      { id: 22, name: "Task K", completed: true },
      { id: 23, name: "Task L", completed: true },
    ],
  },
];

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CampaignTabPanel = ({ status }: { status: string }) => {
    const filteredCampaigns = campaigns.filter(
      (campaign) => campaign.status === status
    );

    return (
      <Grid container spacing={3} maxWidth={"xxl"}>
        {filteredCampaigns.map((campaign) => (
          <Grid item xs={12} sm={8} md={3} key={campaign.id}>
            <CampaignCard
              title={campaign.title}
              image={campaign.image}
              description={campaign.description}
              completedProgress={campaign.completedProgress}
              status={campaign.status}
              tasks={campaign.tasks}
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
      <div>
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
              <Tab label="Drafts" />
              <Tab label="Scheduled Posts" />
            </Tabs>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => setOpenCreateDialog(true)}
            >
              Create New Campaign
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
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
              <CampaignTabPanel status="drafts" />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <CampaignTabPanel status="scheduled" />
            </TabPanel>
          </>
        )}
      </div>
      <CreateCampaignPop
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </>
  );
};

export default Dashboard;
