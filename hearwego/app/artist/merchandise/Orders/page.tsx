// Required Imports
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import {
  OrderCard,
  OrderMedia,
  OrderDetails,
  OrderActions,
  SearchBar,
} from "@/app/styles/MerchOrdersArtistStyles";
import { useRouter } from "next/navigation";

export const orders = [
  {
    id: 1,
    customerName: "John Doe",
    product: "Laptop",
    quantity: 1,
    status: "To Prepare",
    details: "A high-performance laptop with 16GB RAM and 512GB SSD.",
    shippingAddress: "123 Main St, Anytown, USA",
    dateTime: "2024-06-10T10:00:00",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    product: "Phone",
    quantity: 1,
    status: "To Deliver",
    details:
      "A latest model smartphone with a stunning display and excellent camera.",
    shippingAddress: "456 Elm St, Anytown, USA",
    dateTime: "2024-06-11T11:00:00",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    customerName: "Alice Johnson",
    product: "Tablet",
    quantity: 1,
    status: "Delivered",
    details:
      "A lightweight tablet with a powerful processor and long battery life.",
    shippingAddress: "789 Oak St, Anytown, USA",
    dateTime: "2024-06-12T12:00:00",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    customerName: "Bob Brown",
    product: "Smartwatch",
    quantity: 1,
    status: "To Prepare",
    details:
      "A smartwatch with fitness tracking, heart rate monitoring, and GPS.",
    shippingAddress: "1011 Pine St, Anytown, USA",
    dateTime: "2024-06-13T13:00:00",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    customerName: "Charlie Green",
    product: "Headphones",
    quantity: 1,
    status: "To Deliver",
    details:
      "Wireless headphones with noise cancellation and long battery life.",
    shippingAddress: "1213 Cedar St, Anytown, USA",
    dateTime: "2024-06-14T14:00:00",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    customerName: "David White",
    product: "Camera",
    quantity: 1,
    status: "Delivered",
    details: "A mirrorless camera with 4K video recording and a 24MP sensor.",
    shippingAddress: "1415 Maple St, Anytown, USA",
    dateTime: "2024-06-15T15:00:00",
    imageUrl: "https://via.placeholder.com/150",
  },
  // Add more orders as needed
];

// Main Component
const Orders: React.FC = () => {
  const [orderList, setOrderList] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const theme = useTheme();
  const router = useRouter();

  const filteredOrders = orderList.filter((order) => {
    const statusMatches =
      selectedStatus === "All" || order.status === selectedStatus;
    const searchMatches =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatches && searchMatches;
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box my={4}>
          <Box mb={2}>
            <TextField
              placeholder="Search Orders by Customer Name or Product Name"
              variant="filled"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="To Prepare">To Prepare</MenuItem>
              <MenuItem value="To Deliver">To Deliver</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="To Refund">To Refund</MenuItem>
              <MenuItem value="Refunded">Refunded</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
            </Select>
          </Box>

          <Grid container spacing={4}>
            {filteredOrders.map((order) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={order.id}>
                <OrderCard>
                  <OrderMedia
                    component="img"
                    image={order.imageUrl}
                    alt={order.product}
                  />
                  <OrderDetails>
                    <Typography component="div" variant="h5">
                      {order.product}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="div"
                    >
                      Order ID: {order.id}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="div"
                    >
                      Customer: {order.customerName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {order.details}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Status: {order.status}
                    </Typography>
                  </OrderDetails>
                  <OrderActions>
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        router.push(`/artist/merchandise/order/${order.id}`)
                      }
                    >
                      View Details
                    </Button>
                  </OrderActions>
                </OrderCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Orders;
