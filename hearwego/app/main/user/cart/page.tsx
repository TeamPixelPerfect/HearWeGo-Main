"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import {
  deleteCartItem,
  getCartByUser,
  getCartItems,
  updateCartItem,
} from "@/app/services/StoreServices";
import { CartItem } from "@/app/constants/models";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const user = useAppSelector((state) => state.user.user);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deletId, setDeleteId] = useState<string>("");

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartItem(user?.token as string, id, {
      product_quantity: quantity,
    }).then((res) => {
      if (res) {
        fetchCart();
      }
    });
  };

  const handleRemoveItem = (id: string) => {
    setDeleteId(id);
    handleClickOpen();
  };

  const total = cart?.reduce(
    (acc, item: CartItem) =>
      acc + Number(item?.product_price) * Number(item?.product_quantity),
    0
  );

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = () => {
    deleteCartItem(user?.token as string, deletId).then((res) => {
      if (res) {
        fetchCart();
      }
    });
    setDeleteId("");
    setOpen(false);
  };

  const fetchCart = () => {
    getCartByUser(user?.user_id as string).then((res) => {
      if (res) {
        getCartItems(res.cart_id).then((items) => {
          if (items) {
            console.log(items);
            setCart(items.data);
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
    <Box sx={{ padding: "20px", marginTop: "10px", minHeight: "100vh" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center">
            <WarningIcon sx={{ color: "red", mr: 1 }} />
            <Typography variant="h6">Remove Item</Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove the item from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => router.back()} color="primary">
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography
          variant="h4"
          sx={{ ml: 2, fontWeight: "bold", margin: "10px" }}
        >
          Shopping Cart
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          borderRadius: "15px",
          margin: "auto",
          maxWidth: "1500px",
        }}
      >
        <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "24px", fontWeight: "bold" }}>
                Product
              </TableCell>
              <TableCell sx={{ fontSize: "24px", fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell sx={{ fontSize: "24px", fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell sx={{ fontSize: "24px", fontWeight: "bold" }}>
                Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.map((item) => (
              <TableRow
                key={item?.cart_item_id}
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                <TableCell
                  sx={{
                    display: "flex",
                    // justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item?.cart_item_image}
                    alt={item?.cart_item_name}
                    style={{
                      maxWidth: "100px",
                      marginRight: "25px",
                      // borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  {item?.product_name}
                </TableCell>
                <TableCell sx={{ justifyContent: "center" }}>
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(
                        item?.cart_item_id as string,
                        Number(item?.product_quantity) - 1
                      )
                    }
                    disabled={Number(item?.product_quantity) <= 1}
                    color="primary"
                   
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                    {item?.product_quantity}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      handleQuantityChange(
                        item?.cart_item_id as string,
                        Number(item?.product_quantity) + 1
                      )
                    }
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color: "primary.main",
                      fontSize: "20px",
                    }}
                  >
                    Rs{" "}
                    {Number(item?.product_price) *
                      Number(item?.product_quantity)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      handleRemoveItem(item?.cart_item_id as string)
                    }
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box sx={{ marginTop: "30px", textAlign: "right" }}>
        <Typography
          variant="h6"
          component="span"
          sx={{ marginRight: "30px", fontSize: "24px" }}
        >
          Total :
        </Typography>
        <Box
          component="span"
          sx={{
            marginRight: "200px",
            fontWeight: "bold",
            fontSize: "24px",
            color: "primary.main",
          }}
        >
          Rs {total}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push("/main/user/cart/payment");
          }}
          sx={{
            marginRight: "80px",
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "20px",
            textTransform: "none",

          }}
        >
          CheckOut
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
