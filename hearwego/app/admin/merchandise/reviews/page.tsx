"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Rating,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";

const reviews = [
  {
    review_id: "1",
    product_id: "1",
    user_id: "user_001",
    review_text: "Great product, highly recommend!",
    review_rating: 5,
  },
  {
    review_id: "2",
    product_id: "2",
    user_id: "user_002",
    review_text: "Good quality but a bit expensive.",
    review_rating: 4,
  },
  // More reviews...
];

interface ReviewsDataGridProps {
  params: { id: string };
}

export default function ReviewsDataGrid({
  params: { id },
}: ReviewsDataGridProps) {
  const theme = useTheme();
  const router = useRouter();

  const [reviewData, setReviewData] = React.useState(reviews);
  const [rows, setRows] = React.useState(reviews);

  const columns: GridColDef[] = [
    { field: "review_id", headerName: "Review ID", flex: 1 },
    { field: "product_id", headerName: "Product ID", flex: 1 },
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "review_text", headerName: "Review Text", flex: 3 },
    {
      field: "review_rating",
      headerName: "Rating",
      flex: 1,
      type: "number",
      renderCell: (params) => (
        <Rating name="read-only" value={params.value} readOnly />
      ),
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
          {/* <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => {
              router.push(`/admin/reviews/${params.row.review_id}`);
            }}
          >
            <FaEye />
          </IconButton> */}
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
      const filteredData = rows.filter((review) => review.review_rating < 3);
      setRows(filteredData);
    } else {
      setRows(reviewData);
    }
  };

  const handleProductSearch = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value === "All") return setRows(reviewData);
    const filteredReviews = reviewData.filter(
      (review) => review.product_id === value
    );
    setRows(filteredReviews);
  };

  React.useEffect(() => {
    setReviewData(reviews);
    setRows(reviews);
  }, []);

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
            Reviews
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
                router.push("/admin/reviews/add");
              }}
            >
              Add New Review
            </Button>
          </Stack>
        </Box>
        <Box sx={{ padding: "2em" }}>
          <Grid container>
            <Grid item xs={6}>
              <Autocomplete
                freeSolo
                id="review-product-search"
                disableClearable
                options={[
                  "All",
                  ...reviewData.map((option) => option.product_id),
                ]}
                sx={{ width: 300 }}
                onChange={handleProductSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Product ID"
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
                  name={"low_rating"}
                  onChange={handleFilterChange}
                  label="Low Rating (< 3)"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                rows={rows ? rows : []}
                columns={columns}
                getRowId={(row) => row.review_id}
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
