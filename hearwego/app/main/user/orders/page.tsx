"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Stack,
  Pagination,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { CartItem, Order } from "@/app/constants/models";
import { getOrdersForUser } from "@/app/services/StoreServices";
import dayjs from "dayjs";

interface OrderItemProps {
  orderId: string;
  orderDate: string;
  status: string;
  items: CartItem[];
  total: number;
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  orderDate,
  status,
  items,
  total,
}) => {
  const router = useRouter();

  return (
    <Card
      style={{
        marginBottom: "20px",
        width: "100%",
        padding: "10px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
          {orderId}
        </Typography>
        <Typography variant="body2">{orderDate}</Typography>
      </Box>
      <Box>
        <Box style={{ display: "flex", flexDirection: "row" }}>
          {items.map((item, index) => (
            <Box
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <Box
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              >
                <img
                  src={item?.cart_item_image}
                  alt={item?.cart_item_name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <CardContent>
                <Typography variant="h6">{item?.cart_item_name}</Typography>
                <Typography variant="body2">
                  Rs. {item?.product_price?.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  {item?.product_quantity} item(s)
                </Typography>
              </CardContent>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {status}
        </Typography>
        <Typography variant="body2">Total: Rs. {total.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push("/main/user/orders/" + orderId);
          }}
        >
          Go To Order
        </Button>
      </Box>
    </Card>
  );
};

const OrderPage: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const [orderData, setOrderData] = useState<Order[]>([]);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getOrders = () => {
    getOrdersForUser(user?.token as string, user?.user_id as string).then(
      (response) => {
        if (response) {
          setOrderData(response.data);
        }
      }
    );
  };

  // const filteredOrders = orders.filter(
  //   (order) =>
  //     order.orderId.includes(searchQuery) ||
  //     order.items.some((item) =>
  //       item.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  // );

  useEffect(() => {
    if (user?.token && user?.user_id) {
      getOrders();
    }
  }, [user?.token, user?.user_id]);

  return (
    <Box
      style={{ padding: "20px", fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="order tabs"
        >
          <Tab
            label="All"
            style={{
              fontWeight: selectedTab === 0 ? "bold" : "normal",
              fontSize: selectedTab === 0 ? "1.2rem" : "1rem",
              color: "white",
            }}
          />
          <Tab
            label="To Ship"
            style={{
              fontWeight: selectedTab === 1 ? "bold" : "normal",
              fontSize: selectedTab === 1 ? "1.2rem" : "1rem",
              color: "white",
            }}
          />
          <Tab
            label="To Receive"
            style={{
              fontWeight: selectedTab === 2 ? "bold" : "normal",
              fontSize: selectedTab === 2 ? "1.2rem" : "1rem",
              color: "white",
            }}
          />
        </Tabs>
      </AppBar>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          // marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {/* <TextField
          label="Search Orders"
          variant="outlined"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          style={{ width: "50%" }}
        /> */}
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Box style={{ display: "flex" }}>
          <Box style={{ width: "100%" }}>
            {orderData &&
              orderData.map((order) => (
                <OrderItem
                  key={order?.order_id}
                  orderId={order?.order_id as string}
                  orderDate={dayjs(order?.order_date).format("DD MMM YYYY")}
                  status={order?.order_status as string}
                  items={order?.cart_items as CartItem[]}
                  total={order?.order_total as number}
                />
              ))}
          </Box>
          {/* <Card
            style={{
              width: "30%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <CardContent>
              <Typography variant="h6">50% Discount!</Typography>
              <Typography variant="body2">
                This is a card on the right side, spanning the height between
                the header and the footer.
              </Typography>
              <Box style={{ position: "relative" }}>
                <img
                  src={images[currentImageIndex]}
                  alt="Uploaded Image"
                  style={{ width: "410px", height: "410px" }}
                />
                <IconButton
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-20px",
                    transform: "translateY(-50%)",
                  }}
                  onClick={handleNextImage}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card> */}
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}></TabPanel>
      <TabPanel value={selectedTab} index={2}></TabPanel>

      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination count={10} color="secondary" />
        </Stack>
      </Box> */}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ padding: "24px" }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div
      style={{ fontFamily: "Arial, Helvetica, sans-serif", padding: "20px" }}
    >
      <OrderPage />
    </div>
  );
};

export default App;
