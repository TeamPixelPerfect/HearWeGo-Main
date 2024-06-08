"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface OrderItemProps {
  orderId: string;
  orderDate: string;
  status: string;
  imageSrc: string;
  title: string;
  price: number;
  total: number;
  itemCount: number;
  buttonLabel: string;
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  orderDate,
  status,
  imageSrc,
  title,
  price,
  total,
  itemCount,
  buttonLabel,
}) => {
  return (
    <Card
      style={{
        marginBottom: "20px",
        width: "98%",
        display: "flex",
        padding: "10px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle2">{orderId}</Typography>
        <Typography variant="body2">{orderDate}</Typography>
      </Box>

      <Box style={{ width: "100px", height: "100px", marginRight: "20px", marginTop: "50px" }}>
        <img
          src={imageSrc}
          alt={title}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </Box>
      <CardContent style={{ flex: 1 }}>
       
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">Rs. {price}</Typography>
        <Typography variant="body2">Total: Rs. {total}</Typography>
        <Typography variant="body2">{itemCount} item(s)</Typography>
        <Typography variant="body2" color="textSecondary">
          {status}
        </Typography>
      </CardContent>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}
      >
        <Button variant="contained" color="primary">
          {buttonLabel}
        </Button>
      </Box>
    </Card>
  );
};

const OrderPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const images = [
    "https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
    "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71INiT3PTcL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
    "https://ae01.alicdn.com/kf/Hc2ed792f16564287a61257e59e2ed3d52.jpg_640x640q90.jpg"
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const orders = [
    {
      orderId: "21479376954477",
      orderDate: "10 May 2024 19:08:22",
      status: "Cancelled",
      imageSrc: images[0],
      title: "Innvex 32inch HD Ready",
      price: 5449,
      total: 54923,
      itemCount: 1,
      buttonLabel: "Buy again",
    },
    {
      orderId: "214385127854477",
      orderDate: "04 Apr 2024 12:53:18",
      status: "Cancelled",
      imageSrc: images[1],
      title: "Smart Watch HK9 Pro",
      price: 7380,
      total: 7380,
      itemCount: 1,
      buttonLabel: "Buy again",
    },
    {
      orderId: "213856134354477",
      orderDate: "15 Feb 2024 22:23:23",
      status: "Delivered",
      imageSrc: images[2],
      title: "Sunco Zigma 4 outlets",
      price: 1110,
      total: 1110,
      itemCount: 1,
      buttonLabel: "Buy again",
    },
  ];

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
      <TabPanel value={selectedTab} index={0}>
        <Box style={{ display: "flex" }}>
          <Box style={{ width: "70%" }}>
            {orders.map((order) => (
              <OrderItem key={order.orderId} {...order} />
            ))}
          </Box>
          <Card style={{ width: "30%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <CardContent>
              <Typography variant="h6">15% discount!</Typography>
              <Typography variant="body2">This is a card on the right side, spanning the height between the header and the footer.</Typography>
              <Box style={{ position: "relative"}}>
                <img
                  src={images[currentImageIndex]}
                  alt="Uploaded Image"
                  style={{ width: "410px", height: "410px" }}
                />
                <IconButton
                  style={{ position: "absolute", top: "50%", right: "-20px", transform: "translateY(-50%)" }}
                  onClick={handleNextImage}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}></TabPanel>
      <TabPanel value={selectedTab} index={2}></TabPanel>
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
