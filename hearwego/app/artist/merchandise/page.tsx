"use client";
import CustomTabPanel from "@/app/components/CustomeTabPanel";
import { ADTabBox } from "@/app/styles/artistDashboard.styles";
import {
  Box,
  Button,
  Card,
  Grid,
  Pagination,
  Tab,
  Tabs,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Categories from "./Categories";
import Promotions from "./Promotions";
import Orders from "./Orders/page";
import Store from "./Store";
import Drafts from "./Drafts";
import Inventory from "./Inventory";

const ArtistMerchandise = () => {
  const theme = useTheme();
  const router = useRouter();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1em 2em 0 2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.secondary.main,
            }}
          >
            Merchandise
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<IoAddOutline />}
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                router.push("/artist/merchandise/addStore");
              }}
            >
              Create New Store
            </Button>

            <Button
              variant="contained"
              startIcon={<IoAddOutline />}
              sx={{ textTransform: "capitalize" }}
              onClick={() => {
                router.push("/artist/merchandise/addProduct");
              }}
            >
              Add New Product
            </Button>
          </Stack>
        </Box>
        <ADTabBox>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Inventory" />
            <Tab label="Drafts" />
            <Tab label="Categories" />
            <Tab label="Promotions" />
            <Tab label="Orders" />
            <Tab label="Store" />
          </Tabs>

          <CustomTabPanel value={tabValue} index={0} fullWidth={true}>
            <Inventory />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            <Drafts />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2} fullWidth={true}>
            <Categories />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3} fullWidth={true}>
            <Promotions />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={4} fullWidth={true}>
            <Orders />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={5} fullWidth={true}>
            <Store />
          </CustomTabPanel>
        </ADTabBox>
      </Card>
    </Grid>
  );
};

export default ArtistMerchandise;
