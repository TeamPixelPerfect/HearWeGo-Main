"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,

} from "@stripe/react-stripe-js";
import { base_url } from "../constants/keys";
import { Box, Button } from "@mui/material";
import { Paper, TextField, Typography,Grid} from "@mui/material";

type Props = {
    amount: number;
    setPaymentStatus: (status: boolean) => void;
};

export const EventCheckoutForm = ({amount, setPaymentStatus}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch(`${base_url}/Payment/makePayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "usd",
        email: emailInput,
        amount: amount * 100,
        paymentMethodType: "card",
      }),
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      //Elements instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.href, // Temporary return_url
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
        setPaymentStatus(true);
      // Your customer will be redirected to your return_url. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the return_url.
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '2em', maxWidth: '600px', margin: 'auto' }}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Payment Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit} style={{ padding: '0 1em' }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                id="email-input"
                type="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                variant="outlined"
                InputProps={{ style: { padding: '12px' } }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <PaymentElement />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!stripe || !elements}
              sx={{ padding: '12px', marginTop: '1em' }}
            >
              Pay Now
            </Button>
            {errorMessage && (
              <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {errorMessage}
              </Typography>
            )}
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};