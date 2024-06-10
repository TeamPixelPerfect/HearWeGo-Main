"use client";
import React, { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

interface Order {
  id: string;
  orderedItem: string;
  quantity: number;
  shippingAddress: string;
  dateTime: string;
  status: "prepare" | "deliver" | "delivered";
  returned: boolean;
}

const dummyOrder: Order = {
  id: "1",
  orderedItem: "Laptop",
  quantity: 1,
  shippingAddress: "123 Main St, City",
  dateTime: "2024-06-10 10:00",
  status: "prepare",
  returned: false,
};

const OrderDetailsPage: React.FC = () => {
  const [order, setOrder] = useState<Order>(dummyOrder);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateStatus = (newStatus: Order["status"]) => {
    setLoading(true);
    // Simulate API call to update order status
    setTimeout(() => {
      setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
      setLoading(false);
    }, 1000);
  };

  const handleReturn = () => {
    setLoading(true);
    // Simulate API call to mark order as returned
    setTimeout(() => {
      setOrder((prevOrder) => ({ ...prevOrder, returned: true }));
      setLoading(false);
    }, 1000);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6">Order Details</Typography>
          <Typography>Ordered Item: {order.orderedItem}</Typography>
          <Typography>Quantity: {order.quantity}</Typography>
          <Typography>Shipping Address: {order.shippingAddress}</Typography>
          <Typography>Date and Time: {order.dateTime}</Typography>
          <Typography>Status: {order.status}</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {!order.returned && order.status === "prepare" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateStatus("deliver")}
                >
                  Update Status to Deliver
                </Button>
              )}
              {!order.returned && order.status === "deliver" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdateStatus("delivered")}
                >
                  Update Status to Delivered
                </Button>
              )}
              {!order.returned && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleReturn}
                >
                  Mark as Returned
                </Button>
              )}
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OrderDetailsPage;
