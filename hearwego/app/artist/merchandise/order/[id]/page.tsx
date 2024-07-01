"use client";
import React, { useState } from "react";
import {
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  orderedItem: string;
  quantity: number;
  shippingAddress: string;
  dateTime: string;
  status: "Preparing" | "Delivering" | "Delivered" | "Returned" | "Refunded";
  returned: boolean;
  productImage: string;
}

const dummyOrder: Order = {
  id: "1",
  orderedItem: "Laptop",
  quantity: 1,
  shippingAddress: "123 Main St, City",
  dateTime: "2024-06-10 10:00",
  status: "Preparing",
  returned: false,
  productImage:
    "https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg",
};

const OrderDetailsPage: React.FC = () => {
  const [order, setOrder] = useState<Order>(dummyOrder);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUpdateStatus = (newStatus: Order["status"]) => {
    setLoading(true);
    setTimeout(() => {
      setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
      setLoading(false);
    }, 1000);
  };

  const handleReturn = () => {
    setLoading(true);
    setTimeout(() => {
      setOrder((prevOrder) => ({
        ...prevOrder,
        returned: true,
        status: "Returned",
      }));
      setLoading(false);
    }, 1000);
  };

  const handleRefund = () => {
    setLoading(true);
    setTimeout(() => {
      setOrder((prevOrder) => ({ ...prevOrder, status: "Refunded" }));
      setLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    router.push("/artist/merchandise");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="89vh"
    >
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          width: "85%",
          maxWidth: "900px",
          height: "auto",
          position: "relative",
          padding: "12px", // Add padding for better spacing
        }}
      >
        <IconButton
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleClose}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box display="flex">
          <CardMedia
            component="img"
            alt={order.orderedItem}
            image={order.productImage}
            title={order.orderedItem}
            style={{ width: "40%", objectFit: "cover" }}
          />
          <Box display="flex" flexDirection="column" width="60%">
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom>
                Order Details
              </Typography>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    <strong>Ordered Item:</strong> {order.orderedItem}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    <strong>Quantity:</strong> {order.quantity}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    <strong>Shipping Address:</strong> {order.shippingAddress}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    <strong>Date and Time:</strong> {order.dateTime}
                  </Typography>
                </Box>
                <Typography variant="h6" color="textSecondary">
                  <strong>Status:</strong> {order.status}
                </Typography>
              </Box>
            </CardContent>
            <CardActions
              style={{ marginTop: "auto", justifyContent: "flex-end" }}
            >
              {loading ? (
                <CircularProgress size={40} />
              ) : (
                <>
                  {!order.returned && order.status === "Preparing" && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => handleUpdateStatus("Delivering")}
                    >
                      Update Status to Deliver
                    </Button>
                  )}
                  {!order.returned && order.status === "Delivering" && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => handleUpdateStatus("Delivered")}
                    >
                      Update Status to Delivered
                    </Button>
                  )}
                  {!order.returned && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleReturn}
                    >
                      Mark as Returned
                    </Button>
                  )}
                  {order.status === "Returned" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={handleRefund}
                    >
                      Mark as Refunded
                    </Button>
                  )}
                  {(order.status === "Delivered" ||
                    order.status === "Refunded") && (
                    <Button
                      variant="contained"
                      color="inherit"
                      size="large"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  )}
                </>
              )}
            </CardActions>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default OrderDetailsPage;
