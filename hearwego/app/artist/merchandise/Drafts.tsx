// Drafts.jsx
import React, { useState } from "react";
import { Box, TextField, Container, Grid } from "@mui/material";
import SingleProductCard from "../../components/SingleProductCardMerchA";

const draftProductsData = [
  {
    pid: 1,
    title: "Draft Product 1",
    description: "",
    category: "Electronics",
    price: 299,
    quantity: null,
    image: "https://via.placeholder.com/200x200.png?text=Draft+Product+1",
  },
  {
    pid: 2,
    title: "Draft Product 2",
    description: "This is the second draft product",
    category: "",
    price: null,
    quantity: null,
    image: null,
  },
  {
    pid: 3,
    title: "",
    description: "This is the third draft product",
    category: "Books",
    price: null,
    quantity: null,
    image: null,
  },
  {
    pid: 4,
    title: "Draft Product 4",
    description: "",
    category: "",
    price: 499,
    quantity: null,
    image: null,
  },
  {
    pid: 5,
    title: "Draft Product 5",
    description: "",
    category: "Fashion",
    price: 79,
    quantity: null,
    image: "https://via.placeholder.com/200x200.png?text=Draft+Product+5",
  },
  {
    pid: 6,
    title: "",
    description: "This is the sixth draft product",
    category: "",
    price: 199,
    quantity: null,
    image: null,
  },
  {
    pid: 7,
    title: "Draft Product 7",
    description: "",
    category: "Fashion",
    price: null,
    quantity: null,
    image: null,
  },
  {
    pid: 8,
    title: "",
    description: "",
    category: "Books",
    price: 25,
    quantity: null,
    image: "https://via.placeholder.com/200x200.png?text=Draft+Product+8",
  },
  {
    pid: 9,
    title: "Draft Product 9",
    description: "",
    category: "Electronics",
    price: null,
    quantity: null,
    image: null,
  },
  {
    pid: 10,
    title: "Draft Product 10",
    description: "",
    category: "",
    price: 149,
    quantity: null,
    image: null,
  },
];

const Drafts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const filteredDraftProducts = draftProductsData.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.pid.toString().includes(searchQuery)
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 3,
        borderRadius: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 3, mt: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by PID, Title, Description"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
          />
        </Box>
        <Grid container spacing={2}>
          {filteredDraftProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.pid}>
              <SingleProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Drafts;
