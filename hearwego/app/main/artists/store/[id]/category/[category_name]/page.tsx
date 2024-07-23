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
import { useParams } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";
import ProductCard from "../../../../../../components/MerchandiseProduct";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../../../styles/ArtistStrore.styles";
import { getProductsByCategory } from "@/app/services/StoreServices";
import { Product } from "@/app/constants/models";

export default function ArtistStoreProduct() {
  const router = useRouter();
  const { category_name } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategory, setSubcategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSubcategory(event.target.value as string);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value);
  };

  useEffect(() => {
    getProductsByCategory(category_name as string).then((res) => {
      if (res) {
        console.log("Category Products....", res);
        setProducts(res);
        const uniqueSubcategories = Array.from(
          new Set(res.map((product: Product) => product.sub_category))
        );
        setSubcategories(uniqueSubcategories);
      }
    });
  }, [category_name]);

  const filteredProducts = products?.filter((product) => {
    return (
      (subcategory === "All" || product.sub_category === subcategory) &&
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minPrice === "" ||
        (product.product_price as number) >= parseFloat(minPrice)) &&
      (maxPrice === "" ||
        (product.product_price as number) <= parseFloat(maxPrice))
    );
  });

  return (
    <>
      <AppBar position="static" sx={{ p: "1em 0" }}>
        <Toolbar sx={{ alignItems: "center" }}>
          <IconButton size="large" color="inherit" aria-label="open drawer">
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
              sx={{ padding: "8px 16px", paddingLeft: "60px" }}
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
            flexDirection: { xs: "column", md: "row" },
            padding: "20px",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              paddingRight: { md: "20px" },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{
              margin:"10px"
            }}>
              Filters
            </Typography>
            {/* <FormControl
              variant="outlined"
              size="small"
              sx={{ marginBottom: 2, width: "100%", marginTop: "20px" }}
            >
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={subcategory}
                onChange={handleSubcategoryChange}
                label="Subcategory"
              >
                <MenuItem value="All">All</MenuItem>

                {subcategories.map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
              sx={{ marginBottom: 2}}
            >
              <TextField
                label="Min Price"
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                variant="outlined"
                size="small"
                sx={{ width: { xs: "100%", sm: "50%" } }}
              />
              <TextField
                label="Max Price"
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                variant="outlined"
                size="small"
                sx={{ width: { xs: "100%", sm: "50%" } }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              margin: "30px",
              border: "1px solid #E6ECF0",
            }}
          >
            <Box sx={{ width: { xs: "100%", padding: "20px" } }}>
              <Box display="flex" alignItems="center" marginBottom="20px">
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
                  {category_name}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {filteredProducts?.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </WhiteArea>
    </>
  );
}
