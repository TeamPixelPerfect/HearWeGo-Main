"use client";
import { useEffect, useState } from "react";
import React from "react";
import { IconButton, TextField } from "@mui/material";
import { useSearchParams, useParams, useRouter } from "next/navigation";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import { Order, CartItem } from "@/app/constants/models";
import { getOrder } from "@/app/services/StoreServices";
import { useAppSelector } from "@/lib/hooks";
import { get } from "http";
import dayjs from "dayjs";

interface Props {
  params: { id: string };
}

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

// interface Order {
//   id: number;
//   orderNumber: string;
//   orderDate: string;
//   totalAmount: number;
//   status: string;
//   products: Product[];
//   shippingAddress: {
//     address: string;
//     phone: string;
//   };
//   billingAddress: {
//     address: string;
//     phone: string;
//   };
// }

// const order: Order = {
//   id: 1,
//   orderNumber: "123456",
//   orderDate: "2023-06-01",
//   totalAmount: 0,
//   status: "Delivered",
//   products: [
//     {
//       id: 1,
//       name: "CANON EOS R7",
//       quantity: 1,
//       price: 25000,
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
//     },
//     {
//       id: 2,
//       name: "Sony Alpha a6400",
//       quantity: 1,
//       price: 5000,
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQosxJapGxSo1m5gFF5usmkG49T0Jf3svWxJg&s",
//     },
//   ],
//   shippingAddress: {
//     address: "123 Street, City, Country",
//     phone: "+1234567890",
//   },
//   billingAddress: {
//     address: "123 Street, City, Country",
//     phone: "+1234567890",
//   },
// };

const getStatusStep = (status: string) => {
  switch (status) {
    case "to prepare":
      return 0;
    case "to receive":
      return 1;
    case "delivered":
      return 2;
    case "reviewed":
      return 3;
    default:
      return 0;
  }
};

const SingleOrderDetail = ({ params: { id } }: Props) => {
  const user = useAppSelector((state) => state.user.user);

  const steps = ["To Prepare", "To Receieve", "Delivered", "Reviewed"];
  const [order, setOrder] = useState<Order>();
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const currentStep = getStatusStep("to prepare");

  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "succeeded" | "failed" | null
  >(null);

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

  const getOrderDetails = async () => {
    getOrder(user?.token as string, id).then((res) => {
      if (res) {
        setOrder(res);
        setTotalAmount(res?.order_total);
      }
    });
  };

  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");
    const paymentStatus = searchParams.get("redirect_status");

    console.log(paymentIntentId, paymentStatus);

    if (paymentIntentId) {
      if (paymentStatus === "succeeded") {
        setPaymentStatus("succeeded");
      } else {
        setPaymentStatus("failed");
      }
      setDialogOpen(true);

      // // Replace the URL without the query parameters
      // router.replace(`/orders/${id}`);
    }
  }, [searchParams, params, router]);

  useEffect(() => {
    if (paymentStatus === "failed") {
      const timer = setTimeout(() => {
        router.push("/main/user/cart");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, router]);

  useEffect(() => {
    if (user?.token) {
      if (paymentStatus !== "failed") {
        getOrderDetails();
      }
    }
  }, [id, user?.token]);

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
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {paymentStatus === "succeeded" ? (
            <Box display="flex" alignItems="center" color="green">
              <CheckCircleIcon style={{ marginRight: "8px" }} /> Payment
              Succeeded
            </Box>
          ) : (
            <Box display="flex" alignItems="center" color="red">
              <ErrorIcon style={{ marginRight: "8px" }} /> Payment Failed
            </Box>
          )}
          <IconButton
            aria-label="close"
            onClick={() => setDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {paymentStatus === "succeeded"
              ? "Your payment was successful."
              : "Your payment failed. You will be redirected to your cart shortly."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => router.push("/main/user/cart")}
            color="primary"
            variant="contained"
          >
            Go to Cart
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        startIcon={<ArrowBackIos />}
        onClick={() => {
          router.push("/main/user/orders");
        }}
        sx={{
          marginBottom: "20px",
          fontSize: "32px",
          textTransform: "none",
          // color: "#1976d2"
        }}
      >
        Back to Orders
      </Button>

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
          Order #{order?.order_id}
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
                      secondary={dayjs(order?.order_date).format("DD MMM YYYY")}
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
                  {order?.order_address}
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {order?.order_contact}
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
                  {order?.order_address}
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  {order?.order_contact}
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
              {order?.cart_items &&
                order?.cart_items.map((product) => (
                  <React.Fragment key={product?.cart_item_id}>
                    <ListItem alignItems="flex-start">
                      <Avatar
                        variant="rounded"
                        src={product?.cart_item_image}
                        alt={product?.cart_item_name}
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
                            {product?.cart_item_name}
                          </Typography>
                        }
                        secondary={`Quantity: ${product?.product_quantity} | Price: Rs. ${product?.product_price}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </CardContent>
        </Card>

        {order?.order_status === "delivered" && !submitted && (
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
