"use client";
import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Icon,
  styled,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage:
    'url("https://img.freepik.com/free-vector/music-vinyl-record-label-with-sound-notes_1017-33905.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  display: "flex",

  padding: theme.spacing(4),
}));

const Contact = () => {
  return (
    <BackgroundBox>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: 700,color:'white' }}
          gutterBottom
        >
          Contact Us
        </Typography>
        <Typography
        
         variant="body1"
          component="p"
          paragraph
          sx={{ fontWeight: 400,color:'white' }}
        >
          We'd love to hear from you! Whether you have a question about
          features, trials, pricing, need a demo, or anything else, our team is
          ready to answer all your questions.
        </Typography>
        <Box>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card sx={{backgroundColor:'rgba(0,0,0, 0.9)'}}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 2,
                      bgcolor: "primary.main",
                    }}
                  >
                    <SupportAgentIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" sx={{color:'white'}}>
                    General Support
                  </Typography>
                  <Typography variant="body1" sx={{color:'white'}}>
                    Email: support@hearwego.com
                  </Typography>
                  <Typography variant="body1" sx={{color:'white'}}>
                    Phone: (123) 456-7890
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Card sx={{backgroundColor:'rgba(0,0,0, 0.9)'}}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 2,
                      bgcolor: "secondary.main",
                    }}
                  >
                    <BusinessIcon />
                  </Avatar>
                  <Typography variant="h5" component="div" sx={{color:'white'}}>
                    Sales Inquiries
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{color:'white'}}>
                    Email: sales@hearwego.com
                  </Typography>
                  <Typography variant="body1" color="text.secondary"sx={{color:'white'}}>
                    Phone: (987) 654-3210
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
      <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
            <Card sx={{backgroundColor:'rgba(0,0,0, 0.9)'}}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 2,
                      bgcolor:"teal",
                    }}
                  >
              < HelpCenterIcon/>
                  </Avatar>
                  <Typography variant="h5" component="div" sx={{color:'white'}}>
                    Help Center
                  </Typography>
                  <Typography variant="body1" sx={{color:'white'}}>
                    Email: support@hearwego.com
                  </Typography>
                  <Typography variant="body1" sx={{color:'white'}}>
                    Phone: (123) 456-7890
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Card sx={{backgroundColor:'rgba(0,0,0, 0.9)'}}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 2,
                      bgcolor: "cornflowerblue",
                    }}
                  >
                    <LocationCityIcon/>
                  </Avatar>
                  <Typography variant="h5" component="div" sx={{color:'white'}}>
                  Address
                  </Typography>
                  <Typography variant="body1" sx={{color:'white'}}>
                   Bandaranayaka road,
                   Katubedda,Moratuwa
                  </Typography>
                 
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      </Box>
     
      <CustomBox sx={{ mt: 4, marginLeft:'30px',backgroundColor:'rgba(0,0,0, 0.6)' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{color:'white'}}>
          Send Us a Message
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 2 },
            "& .MuiButton-root": { mt: 2 },
          }}
          noValidate
          autoComplete="off"
        >
         <TextField
              required
              fullWidth
              label="Name"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <BadgeIcon />
                  </InputAdornment>
                ),
              }}
            />
          <TextField required fullWidth label="Email" variant="outlined" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }} />
          <TextField required fullWidth label="Subject" variant="outlined"  InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    < SubjectIcon />
                  </InputAdornment>
                ),
              }} />
          <TextField
            required
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={8}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SendIcon />}
          >
            Send Message
          </Button>
        </Box>
      </CustomBox>
    </BackgroundBox>
  );
};

export default Contact;
