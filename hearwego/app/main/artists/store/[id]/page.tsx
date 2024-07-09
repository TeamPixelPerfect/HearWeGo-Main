"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import SwipeableBanner from "../../../../components/MerchandiseBanner";
import ProductCard from "../../../../components/MerchandiseProduct";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CategoryComponent from "../../../../components/MerchandiseCategory";
import Link from "next/link";
import { useState } from "react";
import {
  Cart,
  MerchCategory,
  MerchProduct,
} from "../../../../constants/models";
import {
  getCartByUser,
  getCartItems,
  getCategories,
  getMerchStore,
  getProductsforStore,
  getStoreForArtist,
} from "@/app/services/StoreServices";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  WhiteArea,
} from "../../../../styles/ArtistStrore.styles";
import { Category } from "@mui/icons-material";
import { useAppSelector } from "@/lib/hooks";
import { MerchStore } from "@/app/admin/models/models";
import { number } from "yup";

interface Props {
  params: { id: string };
}

const ArtistStore = ({ params: { id } }: Props) => {
  const [productsData, setProductsData] = useState<MerchProduct[]>([]);
  const [categories, setCategories] = useState<MerchCategory[]>([]);
  const [storeData, setStoreData] = useState<MerchStore>();
  const [banners, setBanners] = useState<
    { id: number; image: string; title: string }[]
  >([]);
  const [cartData, setCartData] = useState<Cart>();
  const [itemLength, setItemLength] = useState<number>(0);

  const user = useAppSelector((state) => state.user.user);

  console.log("Store User:::", user?.user_id);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  const filteredProducts = productsData
    .filter((product) =>
      product?.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 12);

  const filteredCategories = categories?.filter((category) =>
    category?.category_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getProductsforStore(id).then((data) => {
      console.log("Products for Store....", data);
      setProductsData(data);
    });

    getCategories().then((data) => {
      setCategories(data.data);
    });

    getMerchStore(id).then((data) => {
      console.log(data);
      setStoreData(data);

      const storeBanner = {
        id: 0,
        image: data?.store_banner,
        title: "Store Banner",
      };

      const _banners = data?.promo_banner?.map(
        (banner: string, index: number) => ({
          id: index,
          image: banner,
          title: `Banner ${index + 1}`,
        })
      );
      setBanners([storeBanner, ..._banners]);
    });
  }, [id]);

  useEffect(() => {
    if (user?.user_id) {
      getCartByUser(user?.user_id).then((data) => {
        if (data) {
          setCartData(data);
          getCartItems(data.cart_id).then((items) => {
            setItemLength(items.length);
          });
        }
      });
    }
  }, [user?.user_id]);

  return (
    <>
      <WhiteArea>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <SwipeableBanner banners={banners} />
          </Box>
        </Box>

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
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="Search"
                >
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
              <Badge badgeContent={itemLength} color="error">
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

        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Products
              </Typography>
            </Button>

            {/* <Link href="/main/artists/store/1/productSeeMore"> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                router.push(`/main/artists/store/${id}/productSeeMore`);
              }}
            >
              See More
            </Button>
            {/* </Link> */}
          </div>

          <Grid container spacing={4}>
            {filteredProducts?.map((product, index) => (
              <Grid item xs={5} sm={4} md={2} lg={2} key={product?.product_id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>

        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Button
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Category
              </Typography>
            </Button>
          </div>

          <Grid container spacing={2}>
            {filteredCategories.map((category) => (
              <Grid item xs={6} sm={8} md={8} lg={3} key={category.category_id}>
                <CategoryComponent category={category} />
              </Grid>
            ))}
          </Grid>
        </div>
      </WhiteArea>
    </>
  );
};
export default ArtistStore;
