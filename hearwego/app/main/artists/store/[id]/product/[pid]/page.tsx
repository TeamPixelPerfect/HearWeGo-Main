"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Rating,
  TextField,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Remove, ShoppingCart, ArrowBackIos } from "@mui/icons-material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { MerchProduct, ProductVariant } from "@/app/constants/models";
import {
  addItemToCart,
  getCartByUser,
  getProduct,
} from "@/app/services/StoreServices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

interface Comment {
  id: number;
  username: string;
  comment: string;
  rating: number;
  date: string;
}

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   rating: number;
//   ratingCount?: number;
//   category: string;
//   subcategory: string;
//   comments: Comment[];
//   productCount: number;
//   sold: number;
//   sizes: string[];
//   colors: string[];
// }

export const products: Product[] = [
  {
    id: 1,
    name: "CANON EOS R7",
    description:
      "The Canon EOS R7 is a compact yet powerful mirrorless camera, boasting high-resolution imaging and rapid autofocus. Its ergonomic design and intuitive controls make it a versatile choice for photographers of all levels.",
    price: 25000.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mly2gYaxlsywPgiP2sXaPEkOE333Dwgu3w&s",
    rating: 4,
    ratingCount: 10,
    category: "Camera",
    subcategory: "Camera",
    comments: [
      {
        id: 1,
        username: "JohnDoe",
        comment: "Great camera, high-quality images!",
        rating: 5,
        date: "2021-09-01",
      },
      {
        id: 2,
        username: "JaneSmith",
        comment: "Love the autofocus feature.",
        rating: 4,
        date: "2021-09-02",
      },
    ],
    productCount: 50,
    sold: 40,
    sizes: ["Small", "Medium", "Large"],
    colors: ["Black", "Silver", "Red"],
  },
];

interface Props {
  params: { pid: string; id: string };
}

const ProductDetail = ({ params: { id, pid } }: Props) => {
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);

  const [quantity, setQuantity] = useState(1);
  const [commentInput, setCommentInput] = useState("");
  const [previousComments, setPreviousComments] = useState<Comment[]>(
    products[0].comments
  );
  const [commentRating, setCommentRating] = useState<number | null>(null);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(products[0].sizes[0]);
  const [selectedColor, setSelectedColor] = useState(products[0].colors[0]);
  const [selectedVariation, setSelectedVariation] = useState<string>();
  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: string;
  }>({});

  const [product, setProduct] = useState<MerchProduct>();
  const productImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6gzjk8O3ZsaAAZMgIzZpZ8XTm_Az-JPOCIA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxVUpd37ROVc_7LEW291Ql0HkBUUNUjEqjaA&s",
  ];

  const handleAddToCart = () => {
    if (user?.user_id) {
      getCartByUser(user?.user_id).then((res) => {
        const cart_id = res?.cart_id;

        const data = {
          product_id: product?.product_id,
          product_variation: selectedVariation,
          product_quantity: quantity,
          product_price: product?.product_price,
          cart_id: cart_id,
          cart_item_image: product?.product_Main_image,
          cart_Item_name: product?.product_name,
        };

        addItemToCart(user?.token as string, data).then((res) => {
          console.log("Item added to cart: ", res);

          handleClickOpen();
        });
      });

      handleClickOpen();
    } else {
      handleClickOpenLogIn();
    }
  };

  const handleQuantityChange = (type: string) => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleCommentInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommentInput(event.target.value);
  };

  const handleCommentRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setCommentRating(newValue);
  };

  const handleAddComment = () => {
    if (commentInput.trim() && commentRating !== null) {
      const newComment: Comment = {
        id: previousComments.length + 1,
        username: "Guest",
        comment: commentInput,
        rating: commentRating,
        date: new Date().toLocaleDateString(),
      };
      setPreviousComments([...previousComments, newComment]);
      setCommentInput("");
      setCommentRating(null);
    }
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSelectVariation = (variation: ProductVariant) => {
    setSelectedVariation(variation?.variation_name);
  };

  const handleVariationChange = (name: string, value: string) => {
    setSelectedVariations((prev) => ({ ...prev, [name]: value }));
  };

  const fetchProduct = async () => {
    getProduct(pid).then((res) => {
      console.log("Product fetched: ", res);
      setProduct(res);
    });
  };

  const [open, setOpen] = useState(false);
  const [openLogIn, setOpenLogIn] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenLogIn = () => {
    setOpenLogIn(true);
  };

  const handleCloseLogIn = () => {
    setOpenLogIn(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [pid]);

  return (
    <>
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
            <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
            <Typography variant="h6">Add to Cart Success</Typography>
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
            The item has been added to your cart successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="text">
            OK
          </Button>
          <Button
            onClick={() => {
              router.push("/main/user/cart");
            }}
            color="primary"
            variant="text"
          >
            Go To Cart
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openLogIn}
        onClose={handleClickOpenLogIn}
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
            <InfoIcon sx={{ color: "blue", mr: 1 }} />
            <Typography variant="h6">Login Required</Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseLogIn}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You need to be logged in to add items to the cart. Please log in to
            continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogIn} color="primary" variant="text">
            Cancel
          </Button>
          <Button
            onClick={() => {
              router.push("/auth/signIn");
            }}
            color="secondary"
            variant="text"
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "row",
            justifyContent: { xs: "center", md: "right" },
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "60%" }, margin: "40px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/main/artists/store/1">
                <Button>
                  <ArrowBackIos />
                </Button>
              </Link>
              <Typography
                sx={{
                  textAlign: "left",
                  marginBottom: "0px",
                  fontSize: "32px",
                }}
              >
                Product Details
              </Typography>
            </div>
            <Box sx={{ marginTop: "30px" }}>
              <ImageGallery
                items={[
                  product?.product_Main_image,
                  product?.product_Additional_image,
                ].map((image) => ({
                  original: image,
                  thumbnail: image,
                  originalWidth: "480px",
                  originalHeight: "320px",
                }))}
                showNav={false}
                showBullets={true}
                showThumbnails={true}
                showFullscreenButton={true}
                showPlayButton={true}

                // showIndex={false}
                // renderLeftNav={(onClick, disabled) => (
                //   <IconButton
                //     onClick={onClick}
                //     disabled={disabled}
                //     style={{ width: '24px', height: '24px' }} // Adjust the width and height as needed
                //   >
                //     <ArrowBackIos />
                //   </IconButton>
                // )}
                // renderRightNav={(onClick, disabled) => (
                //   <IconButton
                //     onClick={onClick}
                //     disabled={disabled}
                //     style={{ width: '24px', height: '24px' }} // Adjust the width and height as needed
                //   >
                //     <ArrowForwardIos />
                //   </IconButton>
                // )}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                marginTop: "2px",
                color: "gray",
                textAlign: "left",
              }}
            >
              {product?.product_description}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginTop: { xs: "20px", md: "90px" },
              padding: "20px",
            }}
          >
            <Typography
              sx={{
                marginBottom: "10px",
                fontSize: { xs: "32px", md: "40px", fontWeight: "bold" },
              }}
            >
              {product?.product_name}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              <Rating
                name="read-only-rating"
                value={Number(product?.product_rating)}
                readOnly
                precision={0.5}
              />
            </Typography>
            <Typography
              sx={{
                marginBottom: "20px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              Rs.{product?.product_price}
            </Typography>
            {/* <Typography variant="body1" sx={{ marginBottom: "10px" }}>
              Variations
            </Typography> */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                Size :
              </Typography>
              {product?.variations
                ?.find((variation) => variation.variation_name === "Size")
                ?.variation_value.split(",")
                .map((size) => (
                  <Chip
                    key={size}
                    label={size.trim()}
                    onClick={() => handleVariationChange("Size", size.trim())}
                    variant={
                      selectedVariations["Size"] === size.trim()
                        ? "filled"
                        : "outlined"
                    }
                    color={
                      selectedVariations["Size"] === size.trim()
                        ? "primary"
                        : "default"
                    }
                    sx={{ marginRight: 1, marginBottom: 1 }}
                  />
                ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="body1" sx={{ marginRight: 1 }}>
                Color :
              </Typography>
              {product?.variations
                ?.find((variation) => variation.variation_name === "Color")
                ?.variation_value.split(",")
                .map((color) => (
                  <Chip
                    key={color}
                    label={color.trim()}
                    onClick={() => handleVariationChange("Color", color.trim())}
                    variant={
                      selectedVariations["Color"] === color.trim()
                        ? "filled"
                        : "outlined"
                    }
                    color={
                      selectedVariations["Color"] === color.trim()
                        ? "primary"
                        : "default"
                    }
                    sx={{ marginRight: 1, marginBottom: 1 }}
                  />
                ))}
            </Box>

            <Typography variant="body1">Quantity</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <IconButton onClick={() => handleQuantityChange("decrement")}>
                <Remove />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={() => handleQuantityChange("increment")}>
                <Add />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ textTransform: "none", width: "30%" }}
            >
              Add to Cart
            </Button>
            {/* <Box sx={{ width: "20%", marginTop: "20px", position: "relative" }}>
              <Box sx={{ position: "relative" }}>
                <LinearProgress
                  variant="determinate"
                  value={
                    (Number(product?.product_sold) /
                      Number(product?.product_quantity)) *
                    100
                  }
                  sx={{ height: "15px", borderRadius: "15px" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    position: "relative",
                    top: "50%",
                    fontSize: "12px",
                    left: `${
                      (Number(product?.product_sold) /
                        Number(product?.product_quantity)) *
                      100
                    }%`,
                    transform: "translate(30%, -90%)",
                    color: "white",
                  }}
                >
                  {product?.product_sold} sold
                </Typography>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggleCommentsVisibility}
          sx={{ textTransform: "none" }}
        >
          {commentsVisible ? "Hide Comments" : "View Comments"}
        </Button>
      </Box>

      {commentsVisible && (
        <>
          <Box sx={{ padding: "20px" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Rating and Reviews
            </Typography>
            {previousComments.map((comment) => (
              <Card key={comment.id} sx={{ marginBottom: "10px" }}>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {comment.date}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {comment.username}
                  </Typography>
                  <Rating value={comment.rating} readOnly precision={0.5} />
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    {comment.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ padding: "20px" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Add a Comment
            </Typography>
            <TextField
              label="Your Comment"
              multiline
              rows={4}
              value={commentInput}
              onChange={handleCommentInputChange}
              variant="outlined"
              sx={{ marginBottom: "20px", width: "100%" }}
            />
            <Rating
              name="comment-rating"
              value={commentRating}
              onChange={handleCommentRatingChange}
              precision={0.5}
              sx={{ margin: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginBottom: "15px" }}
            >
              Submit
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductDetail;
