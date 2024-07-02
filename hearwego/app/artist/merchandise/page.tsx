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
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const ArtistMerchandise = () => {
  const theme = useTheme();
  const router = useRouter();

  const [tabValue, setTabValue] = useState(0);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

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
          background: theme.palette.background.default,
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
          <Button
            variant="contained"
            startIcon={<IoAddOutline />}
            sx={{ textTransform: "capitalize" }}
            onClick={() => {
              router.push("/artist/merchandise/add");
            }}
          >
            Add New Product
          </Button>
        </Box>
        <ADTabBox>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Store" />
            <Tab label="Products" />
          </Tabs>

          <CustomTabPanel value={tabValue} index={0} fullWidth={true}>
            <Typography variant="body1" sx={{ p: 2 }}>
              <em>Store</em>
            </Typography>
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            <Typography variant="body1" sx={{ p: 2 }}>
              <em>Products</em>
            </Typography>
          </CustomTabPanel>
        </ADTabBox>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2em 0",
          }}
        >
          {tabValue == 0 ? (
            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              color="secondary"
            />
          ) : null}
        </Box>
      </Card>
    </Grid>
  );
};

export default ArtistMerchandise;
