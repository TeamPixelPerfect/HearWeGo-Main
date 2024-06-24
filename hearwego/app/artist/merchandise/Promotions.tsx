"use client";
import React, { useEffect, useState } from "react";
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
import { addMerchPromo, deletePromo, getPromosForStore } from "../../services/StoreServices";
import { useAppSelector } from "@/lib/hooks";
import { String } from "aws-sdk/clients/apigateway";
import { ar } from "date-fns/locale";

interface Promotion {
  promo_id: number;
  promo_code: string;
  promo_description: string;
  promo_start: string;
  promo_end: string;
}

interface Props {
  store_id: String
}

const Promotions = ({ store_id }: Props) => {
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
          store_id: store_id // Example store ID, adjust as necessary
        };
        const newPromo = await addMerchPromo(artist?.token? artist.token : "", promoData);
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
          p.promo_id === editingPromotion.promo_id ? editingPromotion : p
        )
      );
      setEditingPromotion(null);
    }
    setOpenEditDialog(false);
  };

  const handleDeletePromotion = (id: string) => {
    deletePromo(artist?.token? artist.token : "", id).then(() => {
      handleSnackbarOpen("Promotion deleted successfully!");
      fetchPromos();
    });
    
    setOpenEditDialog(false);
  };

  const generateQRCodeValue = (promotion: Promotion) => {
    return `Promo Code: ${promotion.promo_code}\nDescription: ${promotion.promo_description}\nStart Date: ${promotion.promo_start?.split("T")[0]}\nEnd Date: ${promotion.promo_end?.split("T")[0]}`;
  };

  const fetchPromos = () => {
    getPromosForStore(store_id).then((res) => {
      console.log(res)
      setPromotions(res);
    })
  }

  useEffect(() => {
    fetchPromos();
  }, [])

  const filteredPromotions = promotions.filter((promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.promo_start);
    const endDate = new Date(promotion.promo_end);

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
          <Grid item xs={12} sm={6} md={4} key={promotion.promo_id}>
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
                      {promotion.promo_code}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <DescriptionIcon
                        sx={{ verticalAlign: "middle", mr: 1 }}
                      />
                      {promotion.promo_description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      <EventIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                      {promotion.promo_start?.split("T")[0]} - {promotion.promo_end?.split("T")[0]}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <QRCode value={generateQRCodeValue(promotion)} size={128} />
                  </Box>
                </CardContent>
                <CardActions>
                  {/* <IconButton onClick={() => handleEditPromotion(promotion)}>
                    <EditIcon />
                  </IconButton> */}
                  <IconButton
                    onClick={() => handleDeletePromotion(promotion.promo_id)}
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
