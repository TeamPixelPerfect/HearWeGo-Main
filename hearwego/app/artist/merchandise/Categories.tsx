import React, { useState, useEffect } from "react";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import DropFile from "../../components/DropFile";
import {
  addMerchCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../../services/StoreServices"; // Make sure to implement this service
import { MerchCategory } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  store_id: string;
}

const Categories = ({ store_id }: Props) => {
  const artist = useAppSelector((state) => state.artist.user);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState<
    "cancel" | "delete"
  >("cancel");
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [categories, setCategories] = useState<MerchCategory[]>([]);
  const [categoryId, setCategoryId] = useState<String>("");

  const handleClickOpen = (isEdit: boolean) => {
    setOpen(true);
    setIsEditing(isEdit);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    formik.resetForm();
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmDialogOpen = (
    type: "cancel" | "delete",
    categoryId?: string | undefined
  ) => {
    setConfirmDialogType(type);
    setCategoryId(categoryId ? categoryId : "");
    setConfirmDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (confirmDialogType === "cancel") {
      handleClose();
    } else if (confirmDialogType === "delete") {
      handleDelete(categoryId);
    }
    handleConfirmDialogClose();
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      subCategories: "",
      logoFile: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      // description: Yup.string().required("Required"),
      // subCategories: Yup.string().required("Required"),
      // logoFile: Yup.mixed().required("A file is required"),
    }),
    onSubmit: async (values) => {
      const newCategory: MerchCategory = {
        store_id: store_id,
        category_id: isEditing ? values.id : String(Date.now()),
        category_name: values.name,
        category_description: values.description,
        subCategories: values.subCategories
          .split(",")
          .map((subCat) => subCat.trim()),
        image: values?.logoFile ? values.logoFile : "",
      };

      try {
        if (isEditing) {
          editCategory(
            artist?.token ? artist.token : "",
            newCategory?.category_id ? newCategory.category_id : "",
            newCategory
          ).then((res) => {
            console.log("Category edited successfully:", res);
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setSnackbarMessage("Category edited successfully!");
            fetchCategories();
          });
        } else {
          const res = await addMerchCategory(
            artist ? artist.token : "",
            newCategory
          );
          if (res.error) {
            setSnackbarMessage(res.error);
            setSnackbarSeverity("error");
          } else {
            setSnackbarMessage("Category added successfully!");
            setSnackbarSeverity("success");
            fetchCategories();
          }
        }
      } catch (error) {
        console.error("Error adding/updating category: ", error);
        setSnackbarMessage("Error adding/updating category!");
        setSnackbarSeverity("error");
      }

      setSnackbarOpen(true);
      handleClose();
    },
  });

  const handleEdit = (index: Number) => {
    const categoryToEdit = categories[index];
    formik.setValues({
      id: categoryToEdit.category_id,
      name: categoryToEdit.category_name,
      description: categoryToEdit.category_description,
      subCategories: categoryToEdit.subCategories.join(", "),
      logoFile: categoryToEdit.image,
    });
    handleClickOpen(true);
  };

  const handleDelete = async (categoryId: string | undefined) => {
    deleteCategory(
      artist?.token ? artist.token : "",
      categoryId ? categoryId : ""
    ).then((res) => {
      console.log("Category deleted successfully:", res);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setSnackbarMessage("Category deleted successfully!");
      fetchCategories();
    });
  };

  const fetchCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Categories
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={category.category_id}>
                <Card style={{ position: "relative", height: "380px" }}>
                  <CardContent>
                    <img
                      src={category.image}
                      alt={category.category_name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="h5" component="div" gutterBottom>
                      {category.category_name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {category.category_description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Subcategories: {category.subCategories.join(", ")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleConfirmDialogOpen("delete", category.category_id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                onClick={() => handleClickOpen(false)}
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "2rem",
                  height: "380px",
                  backgroundColor: theme.palette.primary.main,
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              >
                <CardContent
                  style={{
                    color: theme.palette.primary.light,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <AddCircleOutlineIcon sx={{ fontSize: 60 }} />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ marginTop: "1rem" }}
                  >
                    Add New Category
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Dialog open={open} onClose={() => handleConfirmDialogOpen("cancel")}>
          <DialogTitle>
            {isEditing ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isEditing
                ? "Modify the details of the category below:"
                : "Enter details for the new category below:"}
            </DialogContentText>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                label="Category Name"
                fullWidth
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                margin="dense"
                label="Category Description"
                fullWidth
                id="description"
                name="description"
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
              <TextField
                margin="dense"
                label="Subcategories (comma separated)"
                fullWidth
                id="subCategories"
                name="subCategories"
                value={formik.values.subCategories}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.subCategories &&
                  Boolean(formik.errors.subCategories)
                }
                helperText={
                  formik.touched.subCategories && formik.errors.subCategories
                }
              />
              <DropFile
                fileTypes="Main Product Image"
                fileExtensions="JPEG,PNG,WEBP,SVG"
                isCircular={false}
                width="100%"
                height="200px"
                file={formik.values.logoFile}
                setFile={(file) => formik.setFieldValue("logoFile", file)}
                aspectX={1}
                aspectY={1}
                shape="rect"
                error={formik.touched.logoFile && formik.errors.logoFile}
              />
              {formik.touched.logoFile && formik.errors.logoFile && (
                <FormHelperText error>{formik.errors.logoFile}</FormHelperText>
              )}
              <DialogActions>
                <Button
                  onClick={() => handleConfirmDialogOpen("cancel")}
                  color="primary"
                >
                  Cancel
                </Button>

                <Button type="submit" color="primary">
                  {isEditing ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={confirmDialogOpen}
          onClose={handleConfirmDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {confirmDialogType === "cancel"
                ? "Are you sure you want to cancel? Your changes will not be saved."
                : "Are you sure you want to delete this category?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmAction} color="primary">
              {confirmDialogType === "cancel" ? "Yes, Cancel" : "Yes, Delete"}
            </Button>
            <Button
              onClick={handleConfirmDialogClose}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Categories;
