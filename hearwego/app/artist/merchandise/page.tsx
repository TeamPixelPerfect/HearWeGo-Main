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
import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import Categories from "./Categories";
import Promotions from "./Promotions";
import Orders from "./Orders/page";
import Store from "./Store";
import Drafts from "./Drafts";
import Inventory from "./Inventory";
import { getStoreForArtist } from "@/app/services/StoreServices";
import { useAppSelector } from "@/lib/hooks";

const ArtistMerchandise = () => {
  const theme = useTheme();
  const router = useRouter();

  const artist = useAppSelector((state) => state.artist.user);
  const [store, setStore] = useState<any>({});
  const [tabValue, setTabValue] = useState(0);

  const getStore = () => {
    getStoreForArtist(artist?.user?.artist_id ? artist.user.artist_id : "")
      .then((res) => {
        setStore(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    getStore();
  }, []);

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
            {!store?.store_id && (
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
            )}

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
            <Inventory store_id={store?.store_id} />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={1} fullWidth={true}>
            <Drafts store_id={store?.store_id} />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={2} fullWidth={true}>
            <Categories store_id={store?.store_id} />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={3} fullWidth={true}>
            <Promotions store_id={store?.store_id} />
          </CustomTabPanel>

          <CustomTabPanel value={tabValue} index={4} fullWidth={true}>
            <Orders store_id={store?.store_id} />
          </CustomTabPanel>

          {store?.store_id && (
            <CustomTabPanel value={tabValue} index={5} fullWidth={true}>
              <Store />
            </CustomTabPanel>
          )}
        </ADTabBox>
      </Card>
    </Grid>
  );
};

export default ArtistMerchandise;
