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
import { CartItem, Order } from "@/app/constants/models";
import Checkout from "@/app/components/Checkout";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const Payment = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.user?.user);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string>("");
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

  const [orderDetails, setOrderdetails] = useState<Order>({
    user_id: user?.user_id,
    order_total: total,
    order_status: "to prepare",
    order_date: dayjs().format("YYYY-MM-DD"),
    order_time: dayjs().format("HH:mm:ss"),
    delivery_date: dayjs().add(7, "day").format("YYYY-MM-DD"),
    order_address: shippingAddress as string,
    order_contact: user?.mobileNumber,
    order_email: user?.email,
    is_returned: false,
    cart_items: cart,
    cart_id: cartId,
  });

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
    setOrderdetails({ ...orderDetails, order_address: fullAddress });
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
        setCartId(res.cart_id);
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

            setOrderdetails({
              user_id: user?.user_id,
              order_total: total,
              order_status: "to prepare",
              order_date: dayjs().format("YYYY-MM-DD"),
              order_time: dayjs().format("HH:mm:ss"),
              delivery_date: dayjs().add(7, "day").format("YYYY-MM-DD"),
              order_address: shippingAddress as string,
              order_contact: user?.mobileNumber,
              order_email: user?.email,
              is_returned: false,
              cart_items: items?.data,
              cart_id: res?.cart_id,
            });
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
          <Checkout amount={total} orderDetails={orderDetails} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStripeClose}>Cancel</Button>
          <Button onClick={handleStripeClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <IconButton onClick={() => router.back()} color="primary">
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography
          variant="h4"
          sx={{ ml: 2, fontWeight: "bold", margin: "10px" }}
        >
          Payment Information
        </Typography>
      </Box>
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
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Shipping Address
              </Typography>
              {shippingAddress ? (
                <Typography>{shippingAddress}</Typography>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleAddShippingAddress}
                  sx={{ ppadding: "10px 20px", fontSize: "16px" }}
                >
                  Add Shipping Address +
                </Button>
              )}
            </CardContent>
          </Card>
          <Card sx={{ marginBottom: "30px" }}>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Shipping Method
              </Typography>
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
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Payment Method
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="payment-method"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod((e.target as HTMLInputElement).value)
                  }
                >
                  <FormControlLabel
                    value="Stripe"
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
                        <span>Stripe</span>
                        <img
                          src="https://i0.wp.com/www.frenchweb.fr/wp-content/uploads/2023/02/LOGO-850-stripe.png?fit=850%2C478&ssl=1"
                          alt="Stripe"
                          style={{ width: "60px" }}
                        />
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: "35%" }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Order Summary
              </Typography>
              {cart?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    borderBottom: "1px solid #e0e0e0",
                    paddingBottom: "10px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item?.cart_item_image}
                      alt={item?.cart_item_name}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item?.cart_item_name}
                    </Typography>
                    <Typography style={{ marginLeft: "10px" }}>
                      x{item?.product_quantity}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Rs.{" "}
                    {(
                      Number(item?.product_price) *
                      Number(item?.product_quantity)
                    ).toFixed(2)}
                  </Typography>
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total :
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Rs. {total.toFixed(2)}
                </Typography>
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
            <DialogContentText sx={{ marginBottom: "10px" }}>
              Please enter your shipping address below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="address-line1"
              label="Address Line 1"
              type="text"
              fullWidth
              variant="filled"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
            <TextField
              margin="dense"
              id="address-line2"
              label="Address Line 2"
              type="text"
              fullWidth
              variant="filled"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              fullWidth
              variant="filled"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              margin="dense"
              id="country"
              label="Country"
              type="text"
              fullWidth
              variant="filled"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              margin="dense"
              id="postal-code"
              label="Postal Code"
              type="text"
              fullWidth
              variant="filled"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddressDialog}>Cancel</Button>
            <Button onClick={handleSaveAddress}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={orderDialogOpen}
          onClose={handleCloseOrderDialog}
          PaperProps={{ sx: { borderRadius: 4, boxShadow: 10 } }}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              // bgcolor: "primary.main",
              // color: "white",
              textAlign: "center",
              py: 2,
            }}
          >
            Order Summary
          </DialogTitle>
          <DialogContent dividers sx={{ px: 4, py: 3 }}>
            <DialogContent
              dividers
              sx={{
                px: 4,
                py: 3,

                borderRadius: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "primary.main",
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  pb: 1,
                }}
              >
                Shipping Address
              </Typography>
              <Typography sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.5 }}>
                {shippingAddress || "No address provided."}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "primary.main",
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  pb: 1,
                }}
              >
                Shipping Method
              </Typography>
              <Typography sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.5 }}>
                {shippingMethod === "standard"
                  ? "Standard Shipping"
                  : "Express Shipping"}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "primary.main",
                  borderBottom: "2px solid",
                  borderColor: "primary.main",
                  pb: 1,
                }}
              >
                Payment Method
              </Typography>
              <Typography sx={{ mb: 3, fontSize: "1rem", lineHeight: 1.5 }}>
                {paymentMethod || "No payment method selected."}
              </Typography>
            </DialogContent>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, marginTop: "5px" }}
            >
              Order Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              {cart?.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    px: 2,

                    borderRadius: 2,
                    mb: 1,
                    boxShadow: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item?.cart_item_image}
                      alt={item?.cart_item_name}
                      style={{
                        width: "50px",
                        marginRight: "10px",
                        borderRadius: 4,
                      }}
                    />
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item?.cart_item_name}
                    </Typography>
                    <Typography sx={{ marginLeft: "10px", color: "grey.600" }}>
                      x{item?.product_quantity}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: "bold" }}>
                    LKR.{" "}
                    {(
                      Number(item?.product_price) *
                      Number(item?.product_quantity)
                    ).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                px: 2,

                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                LKR. {total.toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#f9f9f9", py: 2 }}>
            <Button
              onClick={handleCloseOrderDialog}
              sx={{
                bgcolor: "grey.200",
                color: "black",
                fontWeight: "bold",
                px: 3,
                borderRadius: 3,
                "&:hover": {},
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmOrder}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: "bold",
                px: 3,
                borderRadius: 3,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Confirm Order
            </Button>
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
