"use client";
import React, { useState, ChangeEvent } from "react";
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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";


interface OrderItemProps {
  orderId: string;
  orderDate: string;
  status: string;
  items: {
    imageSrc: string;
    title: string;
    price: number;
    itemCount: number;
  }[];
  total: number;
  buttonLabel: string;
  
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  orderDate,
  status,
  items,
  total,
  buttonLabel,
}) => {

  const router = useRouter();

  return (
    
    <Card
      style={{
        marginBottom: "20px",
        width: "98%",
        padding: "10px",
       
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle2">{orderId}</Typography>
        <Typography variant="body2">{orderDate}</Typography>
      </Box>
      <Link href={"/main/user/orders/1"}>
      <Box style={{ display: "flex", flexDirection: "row" }}>
        {items.map((item, index) => (
          <Box key={index} style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
            <Box style={{ width: "100px", height: "100px", marginRight: "10px" }}>
              <img
                src={item.imageSrc}
                alt={item.title}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </Box>
            
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2">Rs. {item.price}</Typography>
              <Typography variant="body2">{item.itemCount} item(s)</Typography>
            </CardContent>
          </Box>
        ))}
      </Box>
      </Link>
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="textSecondary">
          {status}
        </Typography>
        <Typography variant="body2">Total: Rs. {total}</Typography>
        <Button 
        variant="contained" 
        color="primary"
        onClick={() => {
          router.push("/main/artists/store/1/product/1");
        }}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Card>
  
  );
};

const OrderPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const images: string[] = [
    "https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
    "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71INiT3PTcL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
    "https://ae01.alicdn.com/kf/Hc2ed792f16564287a61257e59e2ed3d52.jpg_640x640q90.jpg",
    "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C81gpJeXaukL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNt7xPi3jFBGDi_uVqCJ9ng5ljzmELKwhdKjiNStughHsidapgj3TdIJU885XSu7q2rNw&usqp=CAU",
    "https://cdn.vectorstock.com/i/1000v/06/31/special-summer-sale-banner-for-advertisement-vector-19600631.jpg",
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const orders: OrderItemProps[] = [
    {
      orderId: "21479376954477",
      orderDate: "10 May 2024 19:08:22",
      status: "Cancelled",
      items: [
        {
          imageSrc: images[0],
          title: "Innvex 32inch HD Ready",
          price: 5449,
          itemCount: 1,
        },
        {
          imageSrc: images[1],
          title: "Smart Watch HK9 Pro",
          price: 7380,
          itemCount: 1,
        },
      ],
      total: 12829,
      buttonLabel: "Buy again",
    },
    {
      orderId: "213856134354477",
      orderDate: "15 Feb 2024 22:23:23",
      status: "Delivered",
      items: [
        {
          imageSrc: images[2],
          title: "Sunco Zigma 4 outlets",
          price: 1110,
          itemCount: 1,
        },
      ],
      total: 1110,
      buttonLabel: "Buy again",
    },
    {
      orderId: "21479376954477",
      orderDate: "10 May 2024 19:08:22",
      status: "Cancelled",
      items: [
        {
          imageSrc: images[3],
          title: "Innvex 32inch HD Ready",
          price: 5449,
          itemCount: 1,
        },
        {
          imageSrc: images[4],
          title: "Smart Watch HK9 Pro",
          price: 7380,
          itemCount: 1,
        },
      ],
      total: 12829,
      buttonLabel: "Buy again",
    },
  ];

  const filteredOrders = orders.filter((order) =>
    order.orderId.includes(searchQuery) ||
    order.items.some(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  return (
    <Box style={{ padding: "20px", fontFamily: "Arial, Helvetica, sans-serif" }}>
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
      <Box style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
        <TextField
          label="Search Orders"
          variant="outlined"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          style={{ width: "50%" }}
        />
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Box style={{ display: "flex" }}>
          <Box style={{ width: "70%" }}>
            {filteredOrders.map((order) => (
              <OrderItem key={order.orderId} {...order} />
            ))}
          </Box>
          <Card style={{ width: "30%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <CardContent>
              <Typography variant="h6">50% Discount!</Typography>
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

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2} >
          <Pagination count={10} color="secondary" />
        </Stack>
      </Box>
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
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", padding: "20px" }}>
      <OrderPage />
    </div>
  );
};

export default App;
