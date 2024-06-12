"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
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
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const orders = [
  {
    order_id: "order_001",
    user_id: "user_001",
    order_total: 150.75,
    order_status: "Delivered",
    order_date: new Date("2024-06-01"),
    order_time: "14:30",
    delivery_date: new Date("2024-06-03"),
    order_address: "123 Main St, Anytown, USA",
    order_contact: "123-456-7890",
    order_email: "user@example.com",
    is_returned: false,
    product_ids: ["prod_001", "prod_002"],
    cart_id: "cart_001",
  },
  {
    order_id: "order_002",
    user_id: "user_002",
    order_total: 89.99,
    order_status: "Processing",
    order_date: new Date("2024-06-05"),
    order_time: "10:15",
    delivery_date: null,
    order_address: "456 Elm St, Othertown, USA",
    order_contact: "987-654-3210",
    order_email: "user2@example.com",
    is_returned: false,
    product_ids: ["prod_003"],
    cart_id: "cart_002",
  },
  // More orders...
];

interface OrderDataGridProps {
  params: { id: string };
}

export default function OrderDataGrid({ params: { id } }: OrderDataGridProps) {
  const theme = useTheme();
  const router = useRouter();

  const [orderData, setOrderData] = React.useState(orders);

  const [orderStatuses, setOrderStatuses] = React.useState<string[]>([
    "Delivered",
    "Processing",
    "Cancelled",
    "Returned",
    "Refunded",
    "Delivering",
    "To Refund",
  ]);

  const columns: GridColDef[] = [
    { field: "order_id", headerName: "Order ID", flex: 1 },
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "order_total", headerName: "Total", flex: 1, type: "number" },
    { field: "order_status", headerName: "Status", flex: 1 },
    { field: "order_date", headerName: "Order Date", flex: 1, type: "date" },
    { field: "order_time", headerName: "Order Time", flex: 1 },
    {
      field: "delivery_date",
      headerName: "Delivery Date",
      flex: 1,
      type: "date",
    },
    { field: "order_address", headerName: "Address", flex: 2 },
    { field: "order_contact", headerName: "Contact", flex: 1 },
    { field: "order_email", headerName: "Email", flex: 1 },
    { field: "is_returned", headerName: "Returned", flex: 1, type: "boolean" },
    {
      field: "product_ids",
      headerName: "Product IDs",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {params.value.map((id: string, index: number) => (
            <Typography key={index} variant="body2">
              {id}
            </Typography>
          ))}
        </Box>
      ),
    },
    { field: "cart_id", headerName: "Cart ID", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <ButtonGroup>
          <IconButton color="primary" sx={{ fontSize: "16px" }}>
            <FaEdit />
          </IconButton>
          <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => {
              router.push(`/admin/merchandise/orders/${params.row.order_id}`);
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

  const handleFilterChange = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    if (checked) {
      const filteredData = orderData.filter((order) => order.is_returned);
      setOrderData(filteredData);
    } else {
      setOrderData(orders);
    }
  };

  const handleOrderSearch = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value === "All") return setOrderData(orders);
    const filteredOrders = orders.filter((order) => order.order_id === value);
    setOrderData(filteredOrders);
  };

  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card sx={{ width: "100%", minHeight: "100vh" }}>
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
            Orders
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
                router.push("/admin/orders/add");
              }}
            >
              Add New Order
            </Button>
          </Stack>
        </Box>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                id="admin-order-search"
                disableClearable
                options={["All", ...orderData.map((order) => order.order_id)]}
                sx={{ width: 300 }}
                onChange={handleOrderSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search orders"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                // label="Order Status"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  const status = event.target.value as string;
                  if (status === "All") return setOrderData(orders);
                  const filteredOrders = orders.filter(
                    (order) => order.order_status === status
                  );
                  setOrderData(filteredOrders);
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {orderStatuses.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Returned"
                  onChange={handleFilterChange}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                rows={orderData}
                columns={columns}
                getRowId={(row) => row.order_id}
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
        </Box>
      </Card>
    </Grid>
  );
}
