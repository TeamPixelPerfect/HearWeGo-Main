"use client";
import { useState } from "react";
import React from "react";
import { TextField } from "@mui/material";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Paper,
  Container,
  Stepper,
  Step,
  StepLabel,
  Rating,
} from "@mui/material";
import {
  ArrowBackIos,
  LocalShipping,
  LocationOn,
  Payment,
} from "@mui/icons-material";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  products: Product[];
  shippingAddress: {
    address: string;
    phone: string;
  };
  billingAddress: {
    address: string;
    phone: string;
  };
}

const order: Order = {
  id: 1,
  orderNumber: "123456",
  orderDate: "2023-06-01",
  totalAmount: 0,
  status: "Delivered",
  products: [
    {
      id: 1,
      name: "CANON EOS R7",
      quantity: 1,
      price: 25000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
    },
    {
      id: 2,
      name: "Sony Alpha a6400",
      quantity: 1,
      price: 5000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosxJapGxSo1m5gFF5usmkG49T0Jf3svWxJg&s",
    },
  ],
  shippingAddress: {
    address: "123 Street, City, Country",
    phone: "+1234567890",
  },
  billingAddress: {
    address: "123 Street, City, Country",
    phone: "+1234567890",
  },
};

{

}

const getStatusStep = (status: string) => {
  switch (status) {
    case "Payment Pending":
      return 0;
    case "Processing":
      return 1;
    case "Shipped":
      return 2;
    case "Delivered":
      return 3;
    default:
      return 0;
  }
};

const SingleOrderDetail: React.FC = () => {
  const steps = ["Payment Pending", "Processing", "Shipped", "Delivered"];
  const currentStep = getStatusStep(order.status);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const totalAmount = order.products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (value: number | null) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    // Here you can implement the logic to submit the review and rating
    console.log("Review submitted:", review);
    console.log("Rating submitted:", rating);
    // Optionally, you can clear the review input and rating
    setReview("");
    setRating(0);
    setSubmitted(true);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: { xs: "20px", md: "40px" },
        // backgroundColor: "#f0f2f5",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <Link href="/orders">
        <Button
          startIcon={<ArrowBackIos />}
          sx={{
            marginBottom: "20px",
            fontSize: "32px",
            textTransform: "none",
            // color: "#1976d2"
          }}
        >
          Back to Orders
        </Button>
      </Link>

      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          borderRadius: "12px",
          // background: "linear-gradient(135deg, #eceff1 30%, #ffffff 90%)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "40px",
            fontWeight: "bold",
            // color: "#333",
            textAlign: "left",
          }}
        >
          Order #{order.orderNumber}
        </Typography>

        <Box sx={{ marginBottom: "40px" }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocalShipping
                    sx={{
                      marginRight: "10px",
                      // color: "#1976d2"
                    }}
                  />{" "}
                  Order Details
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Order Date"
                      secondary={order.orderDate}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Total Amount"
                      secondary={`Rs. ${totalAmount}`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocationOn
                    sx={{
                      marginRight: "10px",
                      // color: "#1976d2"
                    }}
                  />{" "}
                  Shipping Address
                </Typography>
                <Typography sx={{ marginTop: "5px", color: "grey" }}>
                  {order.shippingAddress.address}
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {order.shippingAddress.phone}
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Payment
                    sx={{
                      marginRight: "10px",
                      // color: "#1976d2"
                    }}
                  />{" "}
                  Billing Address
                </Typography>
                <Typography sx={{ marginTop: "5px", color: "grey" }}>
                  {order.billingAddress.address}
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {order.billingAddress.phone}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Products
            </Typography>
            <List>
              {order.products.map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem alignItems="flex-start">
                    <Avatar
                      variant="rounded"
                      src={product.image}
                      alt={product.name}
                      sx={{
                        width: "100px",
                        height: "100px",
                        marginRight: "20px",
                        borderRadius: "12px",
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: "bold" }}>
                          {product.name}
                        </Typography>
                      }
                      secondary={`Quantity: ${product.quantity} | Price: Rs. ${product.price}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {order.status === "Delivered" && !submitted && (
          <Card
            sx={{
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Write a Review
              </Typography>

              <TextField
                id="review"
                label="Your Review"
                multiline
                rows={4}
                value={review}
                onChange={handleReviewChange}
                variant="outlined"
                // fullWidth
                sx={{ marginBottom: "20px", width: "100%" }}
              />
              <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => {
                  handleRatingChange(newValue);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitReview}
                sx={{
                  textTransform: "none",
                  margin: "10px",
                  marginBottom: "20px",
                }}
              >
                Submit Review
              </Button>
            </CardContent>
          </Card>
        )}
        {submitted && (
          
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "20px", color: "green" }}
          >
           
            Thanks for your rating
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SingleOrderDetail;
