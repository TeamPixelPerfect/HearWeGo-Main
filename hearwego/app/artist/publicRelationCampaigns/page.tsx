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
  useTheme,
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
      { id: 3, name: "Task 3", completed: false}
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
      { id: 5, name: "Task C", completed: true}
    ],
  },
  {
    id: 3,
    title: "Draft Campaign 1",
    image:
      "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bmF0dXJhbHxlbnwwfHx8fDE3MTgyMDk1MTR8MA&ixlib=rb-4.0.3",
    description: "Draft campaign awaiting approval.",
    completedProgress: 0,
    status: "drafts",
    tasks: [
      { id: 5, name: "Task X", completed: false },
      { id: 6, name: "Task Y", completed: false },
      { id: 7, name: "Task Z", completed: false}
    ],
  },
  // Add more campaigns as needed
];


const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CampaignTabPanel = ({ status }: { status: string }) => {
    const filteredCampaigns = campaigns.filter(
      (campaign) => campaign.status === status
    );

    return (
      <>
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            title={campaign.title}
            image={campaign.image}
            description={campaign.description}
            completedProgress={campaign.completedProgress}
            status={campaign.status}
            tasks={campaign.tasks}
          />
        ))}
      </>
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
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
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
