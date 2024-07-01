"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  InputBase,
  styled,
  Badge,
  Toolbar,
  AppBar,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "@/lib/hooks";
import { getCartByUser, getCartItems } from "@/app/services/StoreServices";
import { CartItem } from "@/app/constants/models";
import Checkout from "@/app/components/Checkout";

const Payment = () => {
  const user = useAppSelector((state) => state?.user?.user);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [shippingAddress, setShippingAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [addressLine2, setAddressLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [shippingMethod, setShippingMethod] = useState<string | null>(null);

  const [stripOpen, setStripeOpen] = useState(false);

  const handleAddShippingAddress = () => {
    setAddressDialogOpen(true);
  };

  const handleCloseAddressDialog = () => {
    setAddressDialogOpen(false);
  };

  const handleSaveAddress = () => {
    const fullAddress = `${addressLine1}, ${addressLine2}, ${city}, ${country}, ${postalCode}`;
    setShippingAddress(fullAddress);
    setAddressDialogOpen(false);
  };

  const handlePlaceOrder = () => {
    if (shippingAddress && paymentMethod && shippingMethod) {
      setOrderDialogOpen(true);
    } else {
      alert("Please complete all fields before placing the order.");
    }
  };

  const handleCloseOrderDialog = () => {
    setOrderDialogOpen(false);
  };

  const handleConfirmOrder = () => {
    setOrderDialogOpen(false);
    handleClickStripeOpen();
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleClickStripeOpen = () => {
    setStripeOpen(true);
  };

  const handleStripeClose = () => {
    setStripeOpen(false);
  };

  const fetchCart = () => {
    getCartByUser(user?.user_id as string).then((res) => {
      if (res) {
        getCartItems(res.cart_id).then((items) => {
          if (items) {
            setCart(items.data);
            const total = items.data.reduce(
              (acc: any, item: CartItem) =>
                acc +
                Number(item?.product_price) * Number(item?.product_quantity),
              0
            );

            setTotal(total);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchCart();
    }
  }, [user?.user_id]);

  return (
    <>
      <Dialog
        open={stripOpen}
        onClose={handleStripeClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <Checkout />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStripeClose}>Cancel</Button>
          <Button onClick={handleStripeClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      <h1 style={{ marginLeft: "40px" }}>
        <ArrowBackIosNewIcon sx={{ marginRight: "10px" }} />
        Payment Information
      </h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "30px",
        }}
      >
        <Box sx={{ width: "40%" }}>
          <Card sx={{ marginBottom: "30px" }}>
            <CardContent>
              <Typography variant="h6">Shipping Address</Typography>
              {shippingAddress ? (
                <Typography>{shippingAddress}</Typography>
              ) : (
                <Button variant="contained" onClick={handleAddShippingAddress}>
                  Add Shipping Address +
                </Button>
              )}
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6">Shipping Method</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="shipping-method"
                  value={shippingMethod}
                  onChange={(e) =>
                    setShippingMethod((e.target as HTMLInputElement).value)
                  }
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Standard Shipping"
                  />
                  <FormControlLabel
                    value="express"
                    control={<Radio />}
                    label="Express Shipping"
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6">Payment Method</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="payment-method"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod((e.target as HTMLInputElement).value)
                  }
                >
                  <FormControlLabel
                    value="Payhere"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Payhere</span>
                        <img
                          src="https://payherestorage.blob.core.windows.net/payhere-resources/www/images/PayHere-Logo.png"
                          alt="Payhere"
                          style={{ width: "60px" }}
                        />
                      </Box>
                    }
                  />
                  {/* <FormControlLabel
                    value="visa"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Visa</span>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUrSAW3P8DAScPXnS2Wc6d_IbbZSNd_GlFKQ&s"
                          alt="Visa"
                          style={{ width: "60px" }}
                        />
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="mastercard"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Mastercard</span>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                          alt="Mastercard"
                          style={{ width: "40px" }}
                        />
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="applepay"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>Apple Pay</span>
                        <img
                          src="https://www.srcu4u.com/creditunion/wp-content/uploads/2019/07/Apple_Pay_Logo-01-01.png"
                          alt="Apple Pay"
                          style={{ width: "60px" }}
                        />
                      </Box>
                    }
                  /> */}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: "35%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              {cart?.map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item?.cart_item_image}
                      alt={item?.cart_item_name}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <Typography>{item?.cart_item_name}</Typography>
                  </Box>
                  <Typography>x{item?.product_quantity}</Typography>
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">LKR. {total.toFixed(2)}</Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "20px" }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Dialog open={addressDialogOpen} onClose={handleCloseAddressDialog}>
          <DialogTitle>Add Shipping Address</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your shipping address below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="address-line1"
              label="Address Line 1"
              type="text"
              fullWidth
              variant="standard"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
            <TextField
              margin="dense"
              id="address-line2"
              label="Address Line 2"
              type="text"
              fullWidth
              variant="standard"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              fullWidth
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              margin="dense"
              id="country"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              margin="dense"
              id="postal-code"
              label="Postal Code"
              type="text"
              fullWidth
              variant="standard"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddressDialog}>Cancel</Button>
            <Button onClick={handleSaveAddress}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={orderDialogOpen} onClose={handleCloseOrderDialog}>
          <DialogTitle>Order Summary</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Shipping Address</Typography>
            <Typography>{shippingAddress}</Typography>
            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              Shipping Method
            </Typography>
            <Typography>
              {shippingMethod === "standard"
                ? "Standard Shipping"
                : "Express Shipping"}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              Payment Method
            </Typography>
            <Typography>{paymentMethod}</Typography>
            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              Order Summary
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {cart?.map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item?.cart_item_image}
                      alt={item?.cart_item_name}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <Typography>{item?.cart_item_name}</Typography>
                    <Typography style={{ marginLeft: "10px" }}>
                      x{item?.product_quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">LKR. {total.toFixed(2)}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOrderDialog}>Cancel</Button>
            <Button onClick={handleConfirmOrder}>Confirm Order</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmationDialogOpen}
          onClose={handleCloseConfirmationDialog}
        >
          <DialogTitle>Order Confirmed</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <CheckCircleIcon
              sx={{ fontSize: "4rem", color: "green", marginBottom: "20px" }}
            />
            <Typography variant="h6">Your order has been confirmed!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmationDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Payment;
