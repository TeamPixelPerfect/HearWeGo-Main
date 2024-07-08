'use client';
import React from 'react';
import { Container, Typography, Box, Grid, CardContent, Avatar, Card, Paper } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled(Box)({
  backgroundImage: `url('https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=600')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  color: 'white',
  padding: '2rem',
});

const Overlay = styled(Container)({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '2rem',
  borderRadius: '10px',
});

const SectionTitle = styled(Typography)({
  marginBottom: '1.5rem',
  fontWeight: 'bold',
});

const Paragraph = styled(Typography)({
  marginBottom: '1rem',
});

const AboutHearWeGo: React.FC = () => {
  return (
    <Root>
    
        <SectionTitle variant="h2" component="h1">
          About HearWeGo
        </SectionTitle>
      <Paper sx={{padding:'20px',backgroundColor:'rgba(255, 255, 255, 0.1)'}}>
      <Typography variant="body1" sx={{color:'white'}} >
          Welcome to HearWeGo, a vibrant platform designed for music enthusiasts and artists to connect and engage. Our mission is to revolutionize the music marketing experience by providing comprehensive tools and features.
        </Typography>
        <Typography variant="body1"sx={{color:'white'}}>
          For Artists, HearWeGo offers an exclusive dashboard to manage music catalogs, share content, analyze audiences, organize events, engage with the press, and manage public relations campaigns. The platform also supports merchandise sales and fan club creation, enhancing artist-fan interactions.
        </Typography>
        <Typography variant="body1"sx={{color:'white'}} >
          For Fans, HearWeGo provides member-exclusive features such as fan clubs, merchandise stores, and event ticket purchases. Our advanced hit prediction algorithm helps fans discover potential hit songs and connect with upcoming music trends.
        </Typography>
        <Typography variant="body1" sx={{color:'white'}}>
          Join us at HearWeGo and be part of a dynamic community where music lives and thrives.
        </Typography>
        </Paper>
         <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card sx={{opacity:'inherit',backgroundColor:'rgba(255, 255, 255, 0.2)'}}>
              <CardContent>
                <Box sx={{display:'flex',flexDirection:'row'}}>
            
                <Avatar
                  alt="Artist Icon"
                  src="/images/artist-icon.png"
                  sx={{ width: 56, height: 56, mb: 2 }}
                />
                <Typography variant="h5" component="div" sx={{color:'white',marginTop:'10px',marginLeft:'30px'}}>
                  For Artists
                </Typography>
                </Box>
                <Typography variant="body1" color="white">
                  Manage music catalogs, share content, analyze audiences,
                  organize events, engage with the press, and handle public
                  relations campaigns.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{backgroundColor:'rgba(255, 255, 255, 0.2)'}}>
              <CardContent>
              <Box sx={{display:'flex',flexDirection:'row'}}>
                <Avatar
                  alt="Fan Icon"
                  src="/images/fan-icon.png"
                  sx={{ width: 56, height: 56, mb: 2 }}
                />
                <Typography variant="h5" component="div" color="white" sx={{marginTop:'10px',marginLeft:'30px'}}>
                  For Fans
                </Typography>
                </Box>
                <Typography variant="body1" color="white" >
                  Access fan clubs, merchandise stores, event ticket purchases,
                  and discover potential hit songs with our advanced prediction
                  algorithm.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Card sx={{ mt: 4,padding:'20px',backgroundColor:'rgba(255, 255, 255, 0.1)' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{color:'white'}}>
          Our Features
        </Typography>
         <Box sx={{marginLeft:'20px'}}>
        <Typography variant="body1" component="p" paragraph sx={{color:'white'}}>
          <strong>Music Catalog Management:</strong> Artists can efficiently
          manage and publish their music catalogs, gaining exposure and
          increasing streams.
        </Typography>
        <Typography variant="body1" component="p" paragraph sx={{color:'white'}}>
          <strong>Event Organization:</strong> Simplify the event management
          process with scheduling, ticketing, and budget tracking tools.
        </Typography>
        <Typography variant="body1" component="p" paragraph sx={{color:'white'}}>
          <strong>Merchandise and Fan Clubs:</strong> Enhance fan engagement and
          boost artist revenue through dedicated merchandise stores and fan
          clubs.
        </Typography>
        <Typography variant="body1" component="p" paragraph sx={{color:'white'}}>
          <strong>Press and PR Campaigns:</strong> Manage public relations with
          press release tools and social media marketing strategies.
        </Typography>
        <Typography variant="body1" component="p" paragraph sx={{color:'white'}}>
          <strong>Audience Analytics:</strong> Gain insights into audience
          preferences and behaviors with advanced analytics and visualizations.
        </Typography>
        <Typography variant="body1" component="p" paragraph sx={{color:'white'}}>
          <strong>Help Center:</strong> Access support through a dedicated help
          center for any issues or inquiries.
        </Typography>
        <Typography variant="body1" component="p" paragraph sx={{color:'white'}}>
          <strong>Popularity Prediction:</strong> Predict song popularity using
          a pre-trained data model to assign a popularity score from 1 to 100.
        </Typography>
        </Box>
      </Card>
  
    </Root>
  );
};

export default AboutHearWeGo;
