import React, { useState } from "react";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Category {
  name: string;
  description: string;
  subCategories: string[];
  image: string;
}

const dummyCategories: Category[] = [
  {
    name: "Electronics",
    description: "Gadgets and devices",
    subCategories: ["Phones", "Laptops", "Cameras"],
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Clothing",
    description: "Apparel for all",
    subCategories: ["Men", "Women", "Kids"],
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Home & Kitchen",
    description: "Household items",
    subCategories: ["Furniture", "Appliances", "Decor"],
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Books",
    description: "Books and magazines",
    subCategories: ["Fiction", "Non-Fiction", "Children"],
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Toys & Games",
    description: "Fun for kids",
    subCategories: ["Action Figures", "Board Games", "Puzzles"],
    image: "https://via.placeholder.com/150",
  },
];

const Categories: React.FC = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
    subCategories: [],
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = (isEdit: boolean) => {
    setOpen(true);
    setIsEditing(isEdit);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    // Reset the new category form fields
    setNewCategory({
      name: "",
      description: "",
      subCategories: [],
      image: "",
    });
  };

  const handleAdd = () => {
    if (newCategory.name && newCategory.description) {
      // If newCategory has a name and description, add or update the category
      if (newCategory.name !== "") {
        // Check if newCategory already exists, if yes, update it
        const index = categories.findIndex(
          (category) => category.name === newCategory.name
        );
        if (index !== -1) {
          const updatedCategories = [...categories];
          updatedCategories[index] = newCategory;
          setCategories(updatedCategories);
        } else {
          setCategories([...categories, newCategory]);
        }
      }
      handleClose();
    }
  };

  const handleEdit = (index: number) => {
    const categoryToEdit = categories[index];
    // Set the newCategory state with the category to be edited
    setNewCategory(categoryToEdit);
    handleClickOpen(true); // Open the dialog for editing
  };

  const handleDelete = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1); // Remove the category at the specified index
    setCategories(updatedCategories); // Update the state
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
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                    <IconButton onClick={() => handleDelete(index)}>
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {isEditing ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isEditing
                ? "Modify the details of the category below:"
                : "Enter details for the new category below:"}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              fullWidth
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Category Description"
              fullWidth
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Subcategories (comma separated)"
              fullWidth
              value={newCategory.subCategories.join(", ")}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  subCategories: e.target.value
                    .split(",")
                    .map((subCat) => subCat.trim()), // Trim whitespaces
                })
              }
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" onClick={handleAdd}>
                {isEditing ? "Save Changes" : "Add"}
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Categories;
