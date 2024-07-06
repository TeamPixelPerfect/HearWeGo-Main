"use client";
import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  styled,
} from "@mui/material";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const About = () => {
  return (
    <Container maxWidth="md" sx={{ m: "2em auto" }}>
      <CustomBox>
        <Typography variant="h2" component="h1" gutterBottom>
          About HearWeGo
        </Typography>
        <Typography variant="h6" component="p" paragraph>
          Welcome to HearWeGo, a vibrant platform designed for music enthusiasts
          and artists to connect and engage. Our mission is to revolutionize the
          music marketing experience by providing comprehensive tools and
          features.
        </Typography>
        <Typography variant="h6" component="p" paragraph>
          For Artists, HearWeGo offers an exclusive dashboard to manage music
          catalogs, share content, analyze audiences, organize events, engage
          with the press, and manage public relations campaigns. The platform
          also supports merchandise sales and fan club creation, enhancing
          artist-fan interactions.
        </Typography>
        <Typography variant="h6" component="p" paragraph>
          For Fans, HearWeGo provides member-exclusive features such as fan
          clubs, merchandise stores, and event ticket purchases. Our advanced
          hit prediction algorithm helps fans discover potential hit songs and
          connect with upcoming music trends.
        </Typography>
        <Typography variant="h6" component="p" paragraph>
          Join us at HearWeGo and be part of a dynamic community where music
          lives and thrives.
        </Typography>
      </CustomBox>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Avatar
                  alt="Artist Icon"
                  src="/images/artist-icon.png"
                  sx={{ width: 56, height: 56, mb: 2 }}
                />
                <Typography variant="h5" component="div">
                  For Artists
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage music catalogs, share content, analyze audiences,
                  organize events, engage with the press, and handle public
                  relations campaigns.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Avatar
                  alt="Fan Icon"
                  src="/images/fan-icon.png"
                  sx={{ width: 56, height: 56, mb: 2 }}
                />
                <Typography variant="h5" component="div">
                  For Fans
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Access fan clubs, merchandise stores, event ticket purchases,
                  and discover potential hit songs with our advanced prediction
                  algorithm.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <CustomBox sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Features
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <strong>Music Catalog Management:</strong> Artists can efficiently
          manage and publish their music catalogs, gaining exposure and
          increasing streams.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <strong>Event Organization:</strong> Simplify the event management
          process with scheduling, ticketing, and budget tracking tools.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <strong>Merchandise and Fan Clubs:</strong> Enhance fan engagement and
          boost artist revenue through dedicated merchandise stores and fan
          clubs.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <strong>Press and PR Campaigns:</strong> Manage public relations with
          press release tools and social media marketing strategies.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <strong>Audience Analytics:</strong> Gain insights into audience
          preferences and behaviors with advanced analytics and visualizations.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <strong>Help Center:</strong> Access support through a dedicated help
          center for any issues or inquiries.
        </Typography>
        <Typography variant="body1" component="p" paragraph>
          <strong>Popularity Prediction:</strong> Predict song popularity using
          a pre-trained data model to assign a popularity score from 1 to 100.
        </Typography>
      </CustomBox>
    </Container>
  );
};

export default About;
