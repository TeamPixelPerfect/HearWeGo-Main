"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/app/components/CheckoutForm";
import { Box } from "@mui/material";

type Props = {};

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const Checkout = (props: Props) => {
  const stripePromise = loadStripe(
    "pk_test_51IlCEpL4tmTpsrTcesiKMgF17ZgnopCbFlTZN2qRq8PhLwAy2T47jX3xvL3gAqU0FkJDenzgAv7iVUh6fniNhasT00QF4ctvDA"
  );
  // import meta.env.VITE_STRIPE_PK is the publishable key you can either directly paste your stripe key here but not recommending if you are planning to upload the code on github as it should remain only available to you or save the key in .env file

  return (
    <Box sx={{ display: "flex", mt: 8 }}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </Box>
  );
};

export default Checkout;
