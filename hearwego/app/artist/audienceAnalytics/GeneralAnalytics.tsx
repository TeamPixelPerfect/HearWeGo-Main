import {
  Box,
  Button,
  Card,
  Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ADAnalyticBox } from "../../styles/artistAnalytics.styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface DataRowProps {
  title: string;
  value: string;
  change?: string;
  up?: boolean;
  top?: boolean;
}

const DataRow = ({ title, value, change, up, top }: DataRowProps) => {
  return (
    <Grid container spacing={1}>
      <Grid xs={8} item>
        <Typography variant="body1" fontWeight={top ? "600" : "400"}>
          {title}
        </Typography>
      </Grid>
      <Grid
        xs={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        item
      >
        <Typography fontWeight="800" textAlign="right" variant="body1">
          {value}
        </Typography>
      </Grid>
      <Grid
        xs={2}
        item
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {!top && up ? (
          <ArrowDropUpIcon color="success" sx={{ fontSize: "32px" }} />
        ) : !top ? (
          <ArrowDropDownIcon color="error" sx={{ fontSize: "32px" }} />
        ) : null}
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            // minWidth: "30px",
          }}
        >
          {up === true || up === false ? change : ""}
        </Typography>
      </Grid>
    </Grid>
  );
};

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  currency: string;
  desc: string;
  rating: number;
  ratingCount: number;
}

const ProductCard = ({
  title,
  image,
  price,
  currency,
  desc,
  rating,
  ratingCount,
}: ProductCardProps) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={3}>
      <Card>
        <img src={image} alt="merchandise" width="100%" height={200} />
        <Box sx={{ padding: "1em", pb: "2em" }}>
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "13px",
              color: theme.palette.text.secondary,
            }}
          >
            {desc}
          </Typography>
          <Typography variant="body1" fontWeight="700" sx={{ mt: "1em" }}>
            {currency} {price}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Rating name="read-only" value={rating} readOnly />
            <Typography
              variant="body1"
              sx={{
                fontSize: "13px",
                color: theme.palette.text.secondary,
              }}
            >
              {ratingCount}
            </Typography>
          </Stack>
        </Box>
      </Card>
    </Grid>
  );
};

const ADGeneralAnalytics = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={5} item>
        <ADAnalyticBox>
          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Your Latest Song
          </Typography>
          <Box
            sx={{
              width: "100%",
              background: "#fff",
              marginBottom: "1em",
            }}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="song cover"
              width="100%"
              height={200}
            />
          </Box>
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            I'll be there for you
          </Typography>
          <DataRow title="Ranking" value="1 of 20" change="04" up={true} />
          <DataRow title="Streams" value="128K" change="48K" up={false} />
          <Typography
            variant="body1"
            sx={{ mt: "1em", mb: "8px", fontSize: "13px" }}
          >
            Impressions
          </Typography>
          <DataRow title="Last Hour" value="245" change="05" up={true} />
          <DataRow title="Last Day" value="7400" change="200" up={true} />
          <DataRow title="Total" value="1.2M" change="400K" up={true} />
        </ADAnalyticBox>
      </Grid>
      <Grid xs={12} md={7} item>
        <ADAnalyticBox>
          <Grid xs={12} md={12} container sx={{ mb: 2 }}>
            <Grid xs={8} md={8} item>
              <Typography
                fontWeight="600"
                variant="h5"
                sx={{ marginBottom: "1em" }}
              >
                Overall
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                Fans
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                3,244,890
              </Typography>
            </Grid>
            <Grid
              xs={4}
              md={4}
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://c4.wallpaperflare.com/wallpaper/10/309/175/maroon-5-band-members-look-wallpaper-preview.jpg"
                width={100}
                height={100}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </Grid>
          </Grid>
          <DataRow title="Artist Rank" value="137" change="04" up={true} />
          <DataRow title="Fan Club Posts" value="95" change="04" up={false} />
          <DataRow
            title="Merchandise Sales"
            value="$3.4M"
            change="04"
            up={true}
          />
          <DataRow
            title="Total Impressions"
            value="70.4M"
            change="100K"
            up={false}
          />
          <DataRow title="Total Streams" value="1.2B" change="400M" up={true} />
          <DataRow title="Events Organized" value="14" change="01" up={true} />
          <Typography
            variant="body1"
            sx={{ mt: "1em", mb: "8px", fontSize: "13px" }}
          >
            Top Songs
          </Typography>
          <DataRow title="01. I'll be there for you" value="12M" top={true} />
          <DataRow title="02. I'll be there for you" value="12M" top={true} />
          <Typography
            variant="body1"
            sx={{ mt: "1em", mb: "8px", fontSize: "13px" }}
          >
            Top Albums
          </Typography>
          <DataRow title="01. L.P." value="26M" top={true} />
        </ADAnalyticBox>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card
          sx={{
            padding: "2em 1.5em",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Latest News
          </Typography>

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: "8px" }}>
              Rembrandts breaks records with new album L.P.
            </Typography>

            <img
              src="https://via.placeholder.com/150"
              alt="latest news"
              width="100%"
              height={200}
            />

            <Stack direction="row" spacing={1} sx={{ mt: "1em" }}>
              <Typography variant="body1" sx={{ fontSize: "13px" }}>
                2024-10-11
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                fontWeight={700}
                sx={{ fontSize: "13px" }}
              >
                Jon Doe
              </Typography>
            </Stack>

            <Typography
              variant="body1"
              textAlign="justify"
              sx={{ mt: "1em", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur. Nisl libero vestibulum
              tristique massa velit. Auctor vel diam turpis mauris vitae purus
              blandit turpis. Id nec nunc volutpat at et. Erat suscipit vitae
              dictumst viverra.
            </Typography>
          </Box>

          <Stack
            direction="row"
            sx={{
              width: "100%",
              mt: "3em",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="text" color="primary">
              Read More
            </Button>
          </Stack>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <Card
          sx={{
            padding: "2em 1.5em",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Last Fan Club Post
          </Typography>

          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: "1em",
              }}
            >
              <img
                src="https://c4.wallpaperflare.com/wallpaper/10/309/175/maroon-5-band-members-look-wallpaper-preview.jpg"
                width={40}
                height={40}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "0.6em",
                }}
              />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Rembrandts
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "13px" }}>
                  2024-10-11
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="body1"
              textAlign="justify"
              sx={{ fontSize: "13px", mb: "1em" }}
            >
              Lorem ipsum dolor sit amet consectetur. Nisl libero vestibulum
              tristique massa velit. Auctor vel diam turpis mauris vitae purus
              blandit turpis. Id nec nunc volutpat at et. Erat suscipit vitae
              dictumst viverra.
            </Typography>

            <img
              src="https://via.placeholder.com/150"
              alt="latest news"
              width="100%"
              height={200}
            />

            <Stack
              direction="row"
              sx={{
                mt: "0.5em",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FavoriteBorderIcon
                  color="secondary"
                  sx={{ paddingRight: "0.2em", fontSize: "24px" }}
                />{" "}
                Damindu and 12K others
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontSize: "13px" }}
              >
                250 Comments
              </Typography>
            </Stack>
          </Box>

          <Stack
            direction="row"
            sx={{
              width: "100%",
              mt: "3em",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="text" color="primary">
              Visit Fan Club
            </Button>
          </Stack>
        </Card>
      </Grid>
      <Grid xs={12} md={4} item>
        <ADAnalyticBox>
          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Your Latest Album
          </Typography>
          <Box
            sx={{
              width: "100%",
              background: "#fff",
              marginBottom: "1em",
            }}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="song cover"
              width="100%"
              height={200}
            />
          </Box>
          <Typography variant="h6" sx={{ marginBottom: "8px" }}>
            L.P.
          </Typography>
          <DataRow title="Ranking" value="1/20" change="04" up={true} />
          <DataRow title="Streams" value="128K" change="48K" up={false} />
          <Typography
            variant="body1"
            sx={{ mt: "1em", mb: "8px", fontSize: "13px" }}
          >
            Impressions
          </Typography>
          <DataRow title="Last Hour" value="245" change="05" up={true} />
          <DataRow title="Last Day" value="7400" change="200" up={true} />
          <DataRow title="Total" value="1.2M" change="400K" up={true} />
        </ADAnalyticBox>
      </Grid>
      <Grid xs={12} md={12} item>
        <ADAnalyticBox>
          <Typography variant="h6" sx={{ marginBottom: "1em" }}>
            Top Merchandise
          </Typography>
          <Grid container spacing={1}>
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Black Winter Jacket"
              price="45.00"
              currency="USD"
              desc="Autumn And Winter Casual cotton-padded jacket..."
              rating={4}
              ratingCount={6890}
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Black Winter Jacket"
              price="45.00"
              currency="USD"
              desc="Autumn And Winter Casual cotton-padded jacket..."
              rating={4}
              ratingCount={6890}
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Black Winter Jacket"
              price="45.00"
              currency="USD"
              desc="Autumn And Winter Casual cotton-padded jacket..."
              rating={4}
              ratingCount={6890}
            />
            <ProductCard
              image="https://via.placeholder.com/150"
              title="Black Winter Jacket"
              price="45.00"
              currency="USD"
              desc="Autumn And Winter Casual cotton-padded jacket..."
              rating={4}
              ratingCount={6890}
            />
          </Grid>
        </ADAnalyticBox>
      </Grid>
    </Grid>
  );
};

export default ADGeneralAnalytics;
