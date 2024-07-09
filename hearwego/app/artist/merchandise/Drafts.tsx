// Drafts.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Container,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import SingleProductCard from "../../components/SingleProductCardMerchA";
import { getDraftProductsforStore } from "@/app/services/StoreServices";
import { Product } from "@/app/constants/models";

// const draftProductsData = [
//   {
//     pid: 1,
//     title: "Draft Product 1",
//     description: "",
//     category: "Electronics",
//     price: 299,
//     quantity: null,
//     image: "https://via.placeholder.com/200x200.png?text=Draft+Product+1",
//   },
//   {
//     pid: 2,
//     title: "Draft Product 2",
//     description: "This is the second draft product",
//     category: "",
//     price: null,
//     quantity: null,
//     image: null,
//   },
//   {
//     pid: 3,
//     title: "",
//     description: "This is the third draft product",
//     category: "Books",
//     price: null,
//     quantity: null,
//     image: null,
//   },
//   {
//     pid: 4,
//     title: "Draft Product 4",
//     description: "",
//     category: "",
//     price: 499,
//     quantity: null,
//     image: null,
//   },
//   {
//     pid: 5,
//     title: "Draft Product 5",
//     description: "",
//     category: "Fashion",
//     price: 79,
//     quantity: null,
//     image: "https://via.placeholder.com/200x200.png?text=Draft+Product+5",
//   },
//   {
//     pid: 6,
//     title: "",
//     description: "This is the sixth draft product",
//     category: "",
//     price: 199,
//     quantity: null,
//     image: null,
//   },
//   {
//     pid: 7,
//     title: "Draft Product 7",
//     description: "",
//     category: "Fashion",
//     price: null,
//     quantity: null,
//     image: null,
//   },
//   {
//     pid: 8,
//     title: "",
//     description: "",
//     category: "Books",
//     price: 25,
//     quantity: null,
//     image: "https://via.placeholder.com/200x200.png?text=Draft+Product+8",
//   },
//   {
//     pid: 9,
//     title: "Draft Product 9",
//     description: "",
//     category: "Electronics",
//     price: null,
//     quantity: null,
//     image: null,
//   },
//   {
//     pid: 10,
//     title: "Draft Product 10",
//     description: "",
//     category: "",
//     price: 149,
//     quantity: null,
//     image: null,
//   },
// ];

interface Props {
  store_id: string;
}

const Drafts = ({ store_id }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [draftProductsData, setDraftProductsData] = useState<Product[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [editComplete, setEditComplete] = useState(false);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const getDraftProducts = () => {
    getDraftProductsforStore(store_id)
      .then((res) => {
        console.log(res);
        setDraftProductsData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDraftProducts();
    if (editComplete) {
      getDraftProducts();
      setEditComplete(false);
    }
  }, [store_id, editComplete]);

  const filteredDraftProducts = draftProductsData.filter(
    (product) =>
      product?.product_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product?.product_description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product?.product_id?.toString().includes(searchQuery)
  );

  const handleSnackbarOpen = (
    message: string,
    severity: "success" | "error"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.paper",
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={product?.product_id}>
              <SingleProductCard
                product={product}
                setEditComplete={setEditComplete}
                handleSnackbarOpen={handleSnackbarOpen}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Drafts;
