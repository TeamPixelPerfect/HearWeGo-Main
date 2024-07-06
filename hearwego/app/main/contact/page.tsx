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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import BusinessIcon from "@mui/icons-material/Business";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ m: "2em auto" }}>
      <CustomBox>
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: 700 }}
          gutterBottom
        >
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          component="p"
          paragraph
          sx={{ fontWeight: 400 }}
        >
          We'd love to hear from you! Whether you have a question about
          features, trials, pricing, need a demo, or anything else, our team is
          ready to answer all your questions.
        </Typography>
      </CustomBox>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Avatar
                  sx={{ width: 56, height: 56, mb: 2, bgcolor: "primary.main" }}
                >
                  <SupportAgentIcon />
                </Avatar>
                <Typography variant="h5" component="div">
                  General Support
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Email: support@hearwego.com
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Phone: (123) 456-7890
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
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
                <Typography variant="h5" component="div">
                  Sales Inquiries
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Email: sales@hearwego.com
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Phone: (987) 654-3210
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <CustomBox sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
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
          <TextField required fullWidth label="Name" variant="outlined" />
          <TextField required fullWidth label="Email" variant="outlined" />
          <TextField required fullWidth label="Subject" variant="outlined" />
          <TextField
            required
            fullWidth
            label="Message"
            variant="outlined"
            multiline
            rows={4}
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
    </Container>
  );
};

export default Contact;
