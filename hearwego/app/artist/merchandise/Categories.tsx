import React, { useState } from "react";
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
import DropFile from "../../components/DropFile"; // Adjust the import path as needed

interface Category {
  id: string;
  name: string;
  description: string;
  subCategories: string[];
  image: string;
}

const dummyCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Gadgets and devices",
    subCategories: ["Phones", "Laptops", "Cameras"],
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Clothing",
    description: "Apparel for all",
    subCategories: ["Men", "Women", "Kids"],
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Home & Kitchen",
    description: "Household items",
    subCategories: ["Furniture", "Appliances", "Decor"],
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Books",
    description: "Books and magazines",
    subCategories: ["Fiction", "Non-Fiction", "Children"],
    image: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Toys & Games",
    description: "Fun for kids",
    subCategories: ["Action Figures", "Board Games", "Puzzles"],
    image: "https://via.placeholder.com/150",
  },
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Categories: React.FC = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
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
    index?: number
  ) => {
    setConfirmDialogType(type);
    setDeleteIndex(index ?? null);
    setConfirmDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (confirmDialogType === "cancel") {
      handleClose();
    } else if (confirmDialogType === "delete" && deleteIndex !== null) {
      setCategories((prev) => prev.filter((_, i) => i !== deleteIndex));
      setSnackbarMessage("Category deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
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
      image: "",
      logoFile: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      subCategories: Yup.string().required("Required"),
      logoFile: Yup.mixed()
        .required("A file is required")
        .test("fileFormat", "Unsupported Format", (value) =>
          value
            ? [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/svg+xml",
              ].includes(value.type)
            : false
        ),
    }),
    onSubmit: (values) => {
      const newCategory: Category = {
        id: isEditing ? values.id : String(Date.now()),
        name: values.name,
        description: values.description,
        subCategories: values.subCategories
          .split(",")
          .map((subCat) => subCat.trim()),
        image: URL.createObjectURL(values.logoFile),
      };

      if (isEditing) {
        setCategories((prev) =>
          prev.map((category) =>
            category.id === newCategory.id ? newCategory : category
          )
        );
        setSnackbarMessage("Category updated successfully!");
      } else {
        const duplicate = categories.find(
          (category) =>
            category.name.toLowerCase() === newCategory.name.toLowerCase()
        );
        if (duplicate) {
          setSnackbarMessage("Category name already exists!");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          return;
        }
        setCategories((prev) => [...prev, newCategory]);
        setSnackbarMessage("Category added successfully!");
      }
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleClose();
    },
  });

  const handleEdit = (index: number) => {
    const categoryToEdit = categories[index];
    formik.setValues({
      id: categoryToEdit.id,
      name: categoryToEdit.name,
      description: categoryToEdit.description,
      subCategories: categoryToEdit.subCategories.join(", "),
      image: categoryToEdit.image,
      logoFile: null, // Reset the file input
    });
    handleClickOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Categories
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={category.id}>
                <Card style={{ position: "relative", height: "380px" }}>
                  <CardContent>
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="h5" component="div" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {category.description}
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
                      onClick={() => handleConfirmDialogOpen("delete", index)}
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
