"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Margarine } from "next/font/google";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   color: string;
//   availableColors: string[];
//   image: string;
// }

// const initialCart: CartItem[] = [
//   {
//     id: 1,
//     name: "Black music T-shirt",
//     price: 120,
//     quantity: 1,
//     color: "Black",
//     availableColors: ["Black", "Gray", "White"],
//     image:
//       "https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
//   },
//   {
//     id: 2,
//     name: "music Premium T-Shirt",
//     price: 120,
//     quantity: 1,
//     color: "Orange",
//     availableColors: ["Orange", "Red", "Yellow"],
//     image:
//       "https://m.media-amazon.com/images/I/91IM87eeuCL._CLa%7C2140%2C2000%7C81am2B0c2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
//   },
// ];

const Cart = () => {
  const user = useAppSelector((state) => state.user.user);
  const [cart, setCart] = useState<CartItem[]>();
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

  const handleColorChange = (id: string, color: string) => {
    setCart(
      cart?.map((item: CartItem) =>
        item?.cart_item_id === id ? { ...item, color } : item
      )
    );
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
    // Handle item removal logic here
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
        console.log(res?.cart_id);
        getCartItems(res.cart_id).then((items) => {
          if (items) {
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
    <Box sx={{ padding: "20px" }}>
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
          <Button onClick={handleClose} color="primary" variant="text">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="error" variant="text">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <h1>
          {" "}
          <ArrowBackIosNewIcon sx={{ marginRight: "10px" }} />
          Shopping Cart
        </h1>
      </Box>

      <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "17px" }}>Product</TableCell>
            <TableCell sx={{ fontSize: "17px" }}>Quantity</TableCell>
            <TableCell sx={{ fontSize: "17px" }}>Color</TableCell>
            <TableCell sx={{ fontSize: "17px" }}>Price</TableCell>
            <TableCell sx={{ fontSize: "17px" }}>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.map((item) => (
            <TableRow key={item?.cart_item_id}>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <img
                  src={item?.cart_item_image}
                  alt={item?.cart_item_name}
                  style={{ maxWidth: "50px", marginRight: "10px" }}
                />
                {item?.cart_item_name}
              </TableCell>
              <TableCell sx={{ justifyContent: "center" }}>
                <Button
                  onClick={() =>
                    handleQuantityChange(
                      item?.cart_item_id as string,
                      Number(item?.product_quantity) - 1
                    )
                  }
                  disabled={Number(item?.product_quantity) <= 1}
                >
                  -
                </Button>
                {item?.product_quantity}
                <Button
                  onClick={() =>
                    handleQuantityChange(
                      item?.cart_item_id as string,
                      Number(item?.product_quantity) + 1
                    )
                  }
                >
                  +
                </Button>
              </TableCell>
              <TableCell>
                <Select
                  value={item?.product_variation}
                  // onChange={(e) =>
                  //   handleColorChange(
                  //     item?.cart_item_id as string,
                  //     e.target.value as string
                  //   )
                  // }
                >
                  <MenuItem key={0} value={item?.product_variation}>
                    {item?.product_variation}
                  </MenuItem>
                  {/* {item.availableColors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))} */}
                </Select>
              </TableCell>
              <TableCell>
                ${Number(item?.product_price) * Number(item?.product_quantity)}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleRemoveItem(item?.cart_item_id as string)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ marginTop: "20px", textAlign: "right" }}>
        <Typography variant="h6" component="span" sx={{ marginRight: "70px" }}>
          Total:
        </Typography>
        <Box component="span" sx={{ marginRight: "300px", fontWeight: "bold" }}>
          ${total}
        </Box>
        <br></br>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push("/main/user/cart/payment");
          }}
          sx={{ marginRight: "50px", marginTop: "30px" }}
        >
          CheckOut
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
