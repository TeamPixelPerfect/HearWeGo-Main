"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ADTabBox } from "@/app/styles/artistDashboard.styles";
import { ProductModel } from "@/app/admin/models/models";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Original product data
const products = [
  {
    product_id: "1",
    product_name: "Product A",
    product_description: "Description for Product A",
    product_images: [
      "https://uandt.lk/wp-content/uploads/2024/03/iPhone-13-Pro-ii.png",
      "https://uandt.lk/wp-content/uploads/2024/03/iPhone-13-Pro-ii.png",
    ],
    category_id: "cat1",
    product_price: 10.99,
    product_quantity: 100,
    product_variations: [
      {
        variation_name: "Red, M",
        variation_value: "Red",
        variation_price: 11.99,
        variation_quantity: 50,
      },
      {
        variation_name: "Blue, L",
        variation_value: "Blue",
        variation_price: 12.99,
        variation_quantity: 50,
      },
    ],
    product_rating: 4.5,
  },
  {
    product_id: "2",
    product_name: "Product B",
    product_description: "Description for Product B",
    product_images: ["img3.jpg", "img4.jpg"],
    category_id: "cat2",
    product_price: 15.99,
    product_quantity: 50,
    product_variations: [
      {
        variation_name: "Green, S",
        variation_value: "Green",
        variation_price: 16.99,
        variation_quantity: 0,
      },
      {
        variation_name: "Yellow, M",
        variation_value: "Yellow",
        variation_price: 17.99,
        variation_quantity: 25,
      },
    ],
    product_rating: 4.0,
  },
  // More products...
];

interface ProductVariationsDataGridProps {
  params: { id: string };
}

// Render the DataGrid
export default function ProductVariationsDataGrid({
  params: { id },
}: ProductVariationsDataGridProps) {
  const theme = useTheme();
  const router = useRouter();

  const [productData, setProductData] = React.useState<ProductModel[]>([]);

  const productMap = (products: ProductModel[]) => {
    return products.flatMap((product, productIndex) =>
      product.product_variations.map((variation, variationIndex) => ({
        id: `${product.product_id}-${variationIndex}`, // Ensure unique ID
        product_id: product.product_id,
        product_name: product.product_name,
        product_description: product.product_description,
        product_images: product.product_images, // Convert array to string
        category_id: product.category_id,
        product_price: product.product_price,
        product_quantity: product.product_quantity,
        product_rating: product.product_rating,
        variation_name: variation.variation_name,
        variation_value: variation.variation_value,
        variation_price: variation.variation_price,
        variation_quantity: variation.variation_quantity,
      }))
    );
  };

  // Define the columns
  const columns: GridColDef[] = [
    { field: "product_id", headerName: "Product ID", flex: 1 },
    { field: "product_name", headerName: "Product Name", flex: 2 },
    { field: "product_description", headerName: "Description", flex: 3 },
    {
      field: "product_images",
      headerName: "Images",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          {params.value.map((image: string, index: number) => (
            <img
              key={index}
              src={image}
              alt={`product-${index}`}
              style={{ width: 50, height: 50, objectFit: "cover" }}
            />
          ))}
        </Box>
      ),
    },
    { field: "category_id", headerName: "Category ID", flex: 1 },
    { field: "product_price", headerName: "Price", flex: 1, type: "number" },
    {
      field: "product_quantity",
      headerName: "Quantity",
      flex: 1,
      type: "number",
    },
    { field: "product_rating", headerName: "Rating", flex: 1, type: "number" },
    { field: "variation_name", headerName: "Variation Name", flex: 2 },
    { field: "variation_value", headerName: "Variation Value", flex: 2 },
    {
      field: "variation_price",
      headerName: "Variation Price",
      flex: 1,
      type: "number",
    },
    {
      field: "variation_quantity",
      headerName: "Variation Quantity",
      flex: 1,
      type: "number",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <ButtonGroup>
          <IconButton color="primary" sx={{ fontSize: "16px" }}>
            <FaEdit />
          </IconButton>
          <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => {
              router.push(
                `/admin/merchandise/stores/${id}/products/${params.row.product_id}`
              );
            }}
          >
            <FaEye />
          </IconButton>
          <IconButton color="error" sx={{ fontSize: "16px" }}>
            <MdDelete />
          </IconButton>
        </ButtonGroup>
      ),
    },
  ];

  // Flatten the product data to include variations as separate rows
  const [rows, setRows] = React.useState(productMap(products));

  const handleFilterChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    if (checked) {
      const filteredData = rows.filter((product) => {
        if (product.product_quantity === 0) {
          return true;
        }
        if (product.variation_quantity === 0) {
          return true;
        }
      });
      console.log("Filtered data:", filteredData);
      setRows(filteredData);
    } else {
      setRows(productMap(products));
    }
  };

  const handleProductSearch = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value === "All") return setRows(productMap(products));
    const filteredProducts = products.filter(
      (product) => product.product_name === value
    );
    setRows(productMap(filteredProducts));
  };

  React.useEffect(() => {
    setProductData(products);
    setRows(productMap(products));
  }, []);

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
          >
            Merchandise
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<IoAddOutline />}
              sx={{
                textTransform: "capitalize",
                background: "#000",
                color: "#fff",
              }}
              onClick={() => {
                router.push("/admin/merchandise/products/add");
              }}
            >
              Add New Item
            </Button>
          </Stack>
        </Box>
        <ADTabBox>
          <Grid container>
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                id="admin-product-search"
                disableClearable
                options={[
                  "All",
                  ...productData?.map((option) => option.product_name),
                ]}
                sx={{ width: 300 }}
                onChange={handleProductSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search products"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}
            >
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox />}
                  name={"sold_out"}
                  onChange={handleFilterChange}
                  label="Sold Out"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                rows={rows ? rows : []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 25 },
                  },
                }}
                pageSizeOptions={[25, 50]}
                checkboxSelection
              />
            </Grid>
          </Grid>
        </ADTabBox>
      </Card>
    </Grid>
  );
}
