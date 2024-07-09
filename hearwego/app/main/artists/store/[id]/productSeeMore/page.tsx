"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import {
  getCategories,
  getProductsforStore,
  getProducts
} from "@/app/services/StoreServices";
import { MerchCategory, MerchProduct } from "@/app/constants/models";
import { useParams } from "next/navigation";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputBase,
  Button,
  TextField,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ProductCard from "../../../../../components/MerchandiseProduct";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../../styles/ArtistStrore.styles";
export default function ArtistStoreProduct() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [subcategory, setSubcategory] = useState("All");
  const [CategoryData, setCategoryData] = useState<MerchCategory[]>([]);
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { id } = useParams();

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    setSubcategory("All");
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubcategory(event.target.value);
  };
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };
  const categories = Array.from(
    new Set(products.map((product) => product.catagory_name))
  );
  const subcategories =
    category === "All"
      ? []
      : Array.from(
          new Set(
            products
              .filter((product) => product.catagory_name === category)
              .map((product) => product.catagory_name)
          )
        );

  const filteredProducts = products.filter((product) => {
    return (
      (category === "All" || product.catagory_name === category) &&
      product.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minPrice === "" ||
        (product.product_price as unknown as number) >= parseFloat(minPrice)) &&
      (maxPrice === "" ||
        (product.product_price as unknown as number) <= parseFloat(maxPrice))
    );
  });

  useEffect(() => {
    getCategories().then((res) => {
      if (res) {
        setCategoryData(res.data);
      }
    });
  }, []);


  useEffect(() => {
    getProductsforStore(id as string).then((data) => {
      console.log("ID....", id);
      console.log(id, data);
      setProducts(data);
    });
  },[id]);


  // useEffect(() => {
  //   getProducts().then((res) => {
  //     if (res) {
  //       setProducts(res.data);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   getProductsforStore(id as string).then((res) => {
  //     if (res) {
  //       console.log("response",res.data)
  //       setProducts(res.data);
  //     }
  //   });
  // });

  return (
    <>
      {/* Search bar */}
      {/* Search bar */}
      <AppBar position="static" sx={{ p: "1em 0" }}>
        <Toolbar sx={{ alignItems: "center" }}>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            // sx={{ mr: 2 }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MqiW7aEQD6l9uy0Icz9mn48gFLO5eahaMw&s"
            />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <IconButton type="button" sx={{ p: "10px" }} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                padding: "8px 16px",
                paddingLeft: "60px",
              }}
              placeholder="Search here"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </Search>

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
            sx={{ marginLeft: "10px" }}
            onClick={() => {
              router.push("/main/user/cart/");
            }}
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "right",
              justifyContent: "right",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                router.push("/main/user/orders");
              }}
              sx={{ textTransform: "none", marginLeft: "80px" }}
            >
              Orders
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <WhiteArea>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "green",
          }}
        >
          {/* <Grid container spacing={3}>
          <Grid item xs={12} md={3}> */}
          <Box
            sx={{
              display: "flex",
              width: "25%",
              flexDirection: "row",

              // backgroundColor: "red",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                width: "100%",
                height: "auto",
                padding: { xs: "10px" },
                overflowY: "auto",
                maxHeight: "800px",
                gap: "20px",
              }}
            >
              <FormControl
                variant="outlined"
                size="small"
                sx={{
                  width: "100%",
                }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="All">All</MenuItem>
                  {CategoryData.map((category) => (
                    <MenuItem
                      key={category.category_id}
                      value={category.category_name}
                    >
                      {category?.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  marginTop: "30px",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="Minimum Price"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                />
                <TextField
                  label="Maximum Price"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              // height: "800px",
              // backgroundColor: "red",
              margin: "30px",
              border: "1px solid #E6ECF0",
            }}
          >
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Link href="/main/artists/store/1">
                  <Button>
                    <ArrowBackIosIcon />
                  </Button>
                </Link>

                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ marginTop: "10px" }}
                >
                  Products
                </Typography>
              </div>

              <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                  <Grid
                    item
                    xs={5}
                    sm={4}
                    md={2}
                    lg={3}
                    key={product.product_id}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Box>
        </Box>
      </WhiteArea>
    </>
  );
}
