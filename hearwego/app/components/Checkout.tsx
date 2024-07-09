"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "@/app/components/CheckoutForm";
import { Box } from "@mui/material";
import { CartItem, Order } from "../constants/models";

interface Props {
  amount: number;
  orderDetails: Order;
}

const Checkout = ({ amount, orderDetails }: Props) => {
  const stripePromise = loadStripe(
    "pk_test_51IlCEpL4tmTpsrTcesiKMgF17ZgnopCbFlTZN2qRq8PhLwAy2T47jX3xvL3gAqU0FkJDenzgAv7iVUh6fniNhasT00QF4ctvDA"
  );

  const options = {
    mode: "payment",
    amount: amount * 100,
    currency: "lkr",
    appearance: {
      /*...*/
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} orderDetails={orderDetails} />
      </Elements>
    </Box>
  );
};

export default Checkout;
