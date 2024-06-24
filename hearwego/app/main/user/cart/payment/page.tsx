"use client";
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton, InputBase, styled, Badge, Toolbar, AppBar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const App: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [shippingMethod, setShippingMethod] = useState<string | null>(null);

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
    setConfirmationDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <>
      <h1 style={{ marginLeft: '40px' }}>
        <ArrowBackIosNewIcon sx={{ marginRight: '10px' }} />
        Shopping Cart
      </h1>
      <Box sx={{ display: 'flex', justifyContent: "space-evenly", padding: '30px' }}>
        <Box sx={{ width: '40%' }}>
          <Card sx={{ marginBottom: '30px' }}>
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
          <Card sx={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">Shipping Method</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  name="shipping-method"
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod((e.target as HTMLInputElement).value)}
                >
                  <FormControlLabel value="standard" control={<Radio />} label="Standard Shipping" />
                  <FormControlLabel value="express" control={<Radio />} label="Express Shipping" />
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
                  onChange={(e) => setPaymentMethod((e.target as HTMLInputElement).value)}
                >
                  <FormControlLabel
                    value="afterpay"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span>Afterpay</span>
                        <img src="https://business.afterpay.com/rs/539-RJA-633/images/AP_logo_badge_6328x2204_blackmint_jpg.jpg" alt="Afterpay" style={{ width: '60px', }} />
                      </Box>
                    } 
                  />
                  <FormControlLabel
                    value="visa"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span>Visa</span>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUrSAW3P8DAScPXnS2Wc6d_IbbZSNd_GlFKQ&s' alt="Visa" style={{ width: '60px', }} />
                      </Box>
                    } 
                  />
                  <FormControlLabel
                    value="mastercard"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span>Mastercard</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" style={{ width: '40px', }} />
                      </Box>
                    } 
                  />
                  <FormControlLabel
                    value="applepay"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span>Apple Pay</span>
                        <img src="https://www.srcu4u.com/creditunion/wp-content/uploads/2019/07/Apple_Pay_Logo-01-01.png" alt="Apple Pay" style={{ width: '60px', }} />
                      </Box>
                    } 
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ width: '35%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src="https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71INiT3PTcL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png" alt="Fullset Black Chair & Sofa" style={{ width: '50px', marginRight: '10px' }} />
                  <Typography>Black music T-shirt</Typography>
                </Box>
                <Typography>x1</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src="https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png" alt="Orange Cool Chair" style={{ width: '50px', marginRight: '10px' }} />
                  <Typography>music Premium T-Shirt</Typography>
                </Box>
                <Typography>x1</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">$240</Typography>
              </Box>

              <Button 
              variant="contained" 
              color="primary" 
              fullWidth sx={{ marginTop: '20px' }} 
              onClick={handlePlaceOrder}>
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
              onChange={(e) => setAddressLine1(e.target.value)} />
            <TextField
              margin="dense"
              id="address-line2"
              label="Address Line 2"
              type="text"
              fullWidth
              variant="standard"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)} />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              fullWidth
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)} />
            <TextField
              margin="dense"
              id="country"
              label="Country"
              type="text"
              fullWidth
              variant="standard"
              value={country}
              onChange={(e) => setCountry(e.target.value)} />
            <TextField
              margin="dense"
              id="postal-code"
              label="Postal Code"
              type="text"
              fullWidth
              variant="standard"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)} />
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
            <Typography variant="h6" sx={{ marginTop: '20px' }}>Shipping Method</Typography>
            <Typography>{shippingMethod === 'standard' ? 'Standard Shipping' : 'Express Shipping'}</Typography>
            <Typography variant="h6" sx={{ marginTop: '20px' }}>Payment Method</Typography>
            <Typography>{paymentMethod}</Typography>
            <Typography variant="h6" sx={{ marginTop: '20px' }}>Order Summary</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71INiT3PTcL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png" alt="Fullset Black Chair & Sofa" style={{ width: '50px', marginRight: '10px' }} />
                <Typography>Black music T-shirt</Typography>
                <Typography style={{marginLeft:"38px"}}>x1</Typography>
              </Box>
             
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png" alt="Orange Cool Chair" style={{ width: '50px', marginRight: '10px' }} />
                <Typography>music Premium T-Shirt</Typography>
                <Typography style={{marginLeft:'10px'}}>x1</Typography>
                </Box>
              </Box>
           
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">$240</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOrderDialog}>Cancel</Button>
            <Button onClick={handleConfirmOrder}>Confirm Order</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
          <DialogTitle>Order Confirmed</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: '4rem', color: 'green', marginBottom: '20px' }} />
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

export default App;
