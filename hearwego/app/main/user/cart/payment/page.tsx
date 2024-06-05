"use client";
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const App: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState<string>('');
  const [shippingMethod, setShippingMethod] = useState<string | null>(null);

  const handleAddShippingAddress = () => {
    setAddressDialogOpen(true);
  };

  const handleCloseAddressDialog = () => {
    setAddressDialogOpen(false);
  };

  const handleSaveAddress = () => {
    setShippingAddress(tempAddress);
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
    alert("Order confirmed!");
    setOrderDialogOpen(false);
  };

  return (
    <><h1 style={{marginLeft:'40px'}}>  <ArrowBackIosNewIcon sx={{ marginRight: '10px' }} />Shopping Cart</h1><Box sx={{ display: 'flex', justifyContent: "space-evenly", padding: '30px' }}>
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
                  label={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Afterpay</span>
                    <img src="https://business.afterpay.com/rs/539-RJA-633/images/AP_logo_badge_6328x2204_blackmint_jpg.jpg" alt="Afterpay" style={{ width: '60px', }} />
                  </Box>} />
                <FormControlLabel
                  value="visa"
                  control={<Radio />}
                  label={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Visa</span>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUrSAW3P8DAScPXnS2Wc6d_IbbZSNd_GlFKQ&s' alt="Visa" style={{ width: '60px',  }} />
                  </Box>} />
                <FormControlLabel
                  value="mastercard"
                  control={<Radio />}
                  label={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Mastercard</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" style={{ width: '40px', }} />
                  </Box>} />
                <FormControlLabel
                  value="applepay"
                  control={<Radio />}
                  label={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Apple Pay</span>
                    <img src="https://www.srcu4u.com/creditunion/wp-content/uploads/2019/07/Apple_Pay_Logo-01-01.png" alt="Apple Pay" style={{ width: '60px', }} />
                  </Box>} />
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
                <Typography>Fullset Black Chair & Sofa</Typography>
              </Box>
              <Typography>x1</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png" alt="Orange Cool Chair" style={{ width: '50px', marginRight: '10px' }} />
                <Typography>Orange Cool Chair</Typography>
              </Box>
              <Typography>x1</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">$240</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '20px' }} onClick={handlePlaceOrder}>
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
            id="address"
            label="Shipping Address"
            type="text"
            fullWidth
            variant="standard"
            value={tempAddress}
            onChange={(e) => setTempAddress(e.target.value)} />
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
              <Typography>Fullset Black Chair & Sofa</Typography>
            </Box>
            <Typography>x1</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png" alt="Orange Cool Chair" style={{ width: '50px', marginRight: '10px' }} />
              <Typography>Orange Cool Chair</Typography>
            </Box>
            <Typography>x1</Typography>
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
    </Box></>
  );
};

export default App;
