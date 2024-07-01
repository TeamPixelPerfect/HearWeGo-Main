"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';

const products = [
  {
    product_id: "prod_001",
    product_name: "Product A",
    product_description: "Description for Product A",
    product_images: [
      "https://uandt.lk/wp-content/uploads/2024/03/iPhone-13-Pro-ii.png",
      "https://uandt.lk/wp-content/uploads/2024/03/iPhone-13-Pro-ii.png",
    ],
    category_id: "cat1",
    product_price: 10.99,
    product_quantity: 100,
    product_variations: [
      {
        variation_name: "Red, M",
        variation_value: "Red",
        variation_price: 11.99,
        variation_quantity: 50,
      },
      {
        variation_name: "Blue, L",
        variation_value: "Blue",
        variation_price: 12.99,
        variation_quantity: 50,
      },
    ],
    product_rating: 4.5,
  },
  {
    product_id: "prod_002",
    product_name: "Product B",
    product_description: "Description for Product B",
    product_images: ["img3.jpg", "img4.jpg"],
    category_id: "cat2",
    product_price: 15.99,
    product_quantity: 50,
    product_variations: [
      {
        variation_name: "Green, S",
        variation_value: "Green",
        variation_price: 16.99,
        variation_quantity: 0,
      },
      {
        variation_name: "Yellow, M",
        variation_value: "Yellow",
        variation_price: 17.99,
        variation_quantity: 25,
      },
    ],
    product_rating: 4.0,
  },
  // More products...
];

const orderData = {
  order_id: "order_001",
  user_id: "user_001",
  order_total: 150.75,
  order_status: "Delivered",
  order_date: new Date("2024-06-01"),
  order_time: "14:30",
  delivery_date: new Date("2024-06-03"),
  order_address: "123 Main St, Anytown, USA",
  order_contact: "123-456-7890",
  order_email: "user@example.com",
  is_returned: false,
  product_ids: ["prod_001", "prod_002"],
  cart_id: "cart_001",
};

const getProductDetails = (productIds: string[]) => {
  return products.filter((product) => productIds.includes(product.product_id));
};

export default function OrderDetailsComponent() {
  const theme = useTheme();
  const router = useRouter();
  const [productDetails, setProductDetails] = React.useState<any[]>([]);

  const [order, setOrder] = React.useState<any>();

  React.useEffect(() => {
    setOrder(orderData);
    setProductDetails(getProductDetails(orderData.product_ids));
  }, []);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          >
            Merchandise
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<FaEdit />}
              sx={{
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
              }}
              // onClick={() => {
              //   router.push(`/admin/merchandise/stores/${id}/products/`);
              // }}
            >
              Edit Order
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              sx={{
                textTransform: "capitalize",
                // background: "#000",
                // color: "#fff",
              }}
              // onClick={() => {
              //   router.push(`/admin/merchandise/stores/${id}/products/`);
              // }}
            >
              Delete Order
            </Button>
          </Stack>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ width: "100%", margin: 0, padding: 2 }}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Order Details"
                subheader={`Order ID: ${order?.order_id}`}
              />
              <CardContent>
                <Typography variant="h6">Customer Information</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>User ID:</strong> {order?.user_id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Contact:</strong> {order?.order_contact}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {order?.order_email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Order Date:</strong>{" "}
                      {order?.order_date.toDateString()}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Order Time:</strong> {order?.order_time}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Delivery Date:</strong>{" "}
                      {order?.delivery_date
                        ? order?.delivery_date.toDateString()
                        : "N/A"}
                    </Typography>
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Shipping Information
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body1">
                  <strong>Address:</strong> {order?.order_address}
                </Typography>

                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Order Status
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body1">
                  <strong>Status:</strong> {order?.order_status}
                </Typography>
                <Typography variant="body1">
                  <strong>Is Returned:</strong>{" "}
                  {order?.is_returned ? "Yes" : "No"}
                </Typography>

                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Products in Order
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <List>
                  {productDetails.map((product) => (
                    <ListItem key={product?.product_id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt={product?.product_name}
                          src={product?.product_images[0]}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product?.product_name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Price: ${product?.product_price.toFixed(2)}
                            </Typography>
                            {" — "}
                            {product?.product_description}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ marginTop: 3, textAlign: "right" }}>
                  <Typography variant="h6">
                    <strong>Total:</strong> ${order?.order_total.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={() => router.push("/admin/merchandise/orders")}
            >
              Back to Orders
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
