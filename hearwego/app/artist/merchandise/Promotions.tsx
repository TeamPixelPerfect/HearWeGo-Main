"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  SnackbarContent,
  IconButton,
  Container,
  Fade,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import QRCode from "qrcode.react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import CloseIcon from "@mui/icons-material/Close";
import { addMerchPromo } from "../../services/StoreServices";
import { useAppSelector } from "@/lib/hooks";

interface Promotion {
  id: number;
  code: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Promotions = () => {
  const artist = useAppSelector((state) => state.artist.user);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(
    null
  );
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const initialValues = {
    code: "",
    description: "",
    startDate: "",
    endDate: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      code: Yup.string().required("Promo Code is required"),
      description: Yup.string().required("Description is required"),
      startDate: Yup.date()
        .required("Start Date is required")
        .typeError("Invalid date"),
      endDate: Yup.date()
        .required("End Date is required")
        .typeError("Invalid date")
        .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const promoData = {
          promo_code: values.code,
          promo_description: values.description,
          promo_start: values.startDate,
          promo_end: values.endDate,
          promo_status: "active", // Example status, adjust as necessary
          store_id: "st20", // Example store ID, adjust as necessary
        };
        const newPromo = await addMerchPromo(artist.token, promoData);
        setPromotions([...promotions, { ...newPromo, id: Date.now() }]);
        resetForm();
        handleSnackbarOpen("Promotion created successfully!");
      } catch (error) {
        console.error("Error submitting promotion:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingPromotion) {
      setPromotions(
        promotions.map((p) =>
          p.id === editingPromotion.id ? editingPromotion : p
        )
      );
      setEditingPromotion(null);
    }
    setOpenEditDialog(false);
  };

  const handleDeletePromotion = (id: number) => {
    setPromotions(promotions.filter((promotion) => promotion.id !== id));
    setOpenEditDialog(false);
  };

  const generateQRCodeValue = (promotion: Promotion) => {
    return `Promo Code: ${promotion.code}\nDescription: ${promotion.description}\nStart Date: ${promotion.startDate}\nEnd Date: ${promotion.endDate}`;
  };

  const filteredPromotions = promotions.filter((promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    if (filter === "ongoing") return now >= startDate && now <= endDate;
    if (filter === "upcoming") return now < startDate;
    if (filter === "completed") return now > endDate;
    return true;
  });

  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Promotions
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create New Promotion
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Promo Code"
                  name="code"
                  fullWidth
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create Promotion"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter Promotions</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value as string)}
          label="Filter Promotions"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="ongoing">Ongoing</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredPromotions.map((promotion) => (
          <Grid item xs={12} sm={6} md={4} key={promotion.id}>
            <Fade in>
              <Card
                sx={{
                  mb: 3,
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {promotion.code}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <DescriptionIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      {promotion.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      <EventIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      {promotion.startDate} - {promotion.endDate}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <QRCode value={generateQRCodeValue(promotion)} size={128} />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditPromotion(promotion)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeletePromotion(promotion.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Promotion</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your promotion details here.</DialogContentText>
          {/* Add form fields for editing promotion */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </Container>
  );
};

export default Promotions;
