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
  TextField,
  Typography,
  useTheme,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getAllUsers } from "@/app/services/UserServices";
import { handleArtistAproved } from "@/app/services/AuthServices";
import { User } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";

interface UsersDataGridProps {
  params: { id: string };
}

export default function UsersDataGrid({ params: { id } }: UsersDataGridProps) {
  const theme = useTheme();
  const router = useRouter();

  const [userData, setUserData] = React.useState<User[]>([]);
  const [artistData, setArtistData] = React.useState<User[]>([]);
  const [rows, setRows] = React.useState<User[]>([]);
  const [category, setCategory] = React.useState<string>("All");
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isAdminApproved, setIsAdminApproved] = React.useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: category === "Fans" ? "name" : "artistName",
      headerName: "Name",
      flex: 2,
    },
    { field: "mobileNumber", headerName: "Mobile Number", flex: 2 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "birthDate", headerName: "Birth Date", flex: 1 },
    {
      field: "profilePicture",
      headerName: "Profile Picture",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <img
            src={params.value}
            alt={`profile-${params.row.user_id}`}
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        </Box>
      ),
    },
    {
      field: "isEmailVerified",
      headerName: "Email Verified",
      flex: 1,
      type: "boolean",
    },
    {
      field: "isMobileVerified",
      headerName: "Mobile Verified",
      flex: 1,
      type: "boolean",
    },
    {
      field: "isAdminApproved",
      headerName: "Admin Approved",
      flex: 1,
      type: "boolean",
    },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "joinedDate", headerName: "Joined Date", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <ButtonGroup>
          <IconButton
            color="secondary"
            sx={{ fontSize: "16px" }}
            onClick={() => handleOpenDialog(params.row)}
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
      const filteredData = rows.filter((user) => !user.isEmailVerified);
      setRows(filteredData);
    } else {
      setRows(category === "Fans" ? userData : artistData);
    }
  };

  const handleUserSearch = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value === "All")
      return setRows(category === "Fans" ? userData : artistData);
    const filteredUsers = (category === "Fans" ? userData : artistData).filter(
      (user) => user.name.toLowerCase().includes(value.toLowerCase())
    );
    setRows(filteredUsers);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setCategory(value);
    if (value === "All") {
      setRows([...userData, ...artistData]);
    } else if (value === "Fans") {
      setRows(userData);
    } else {
      setRows(artistData);
    }
  };

  const getUsers = () => {
    getAllUsers().then((data) => {
      setUserData(data.data);
      if (category === "All" || category === "Fans") {
        setRows(data.data);
      }
    });
  };

  const getArtists = () => {
    getAllArtists().then((data) => {
      setArtistData(data.data);
      if (category === "All" || category === "Artists") {
        setRows(data.data);
      }
    });
  };

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setIsAdminApproved(user.isAdminApproved);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleAdminApprovedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsAdminApproved(event.target.checked);
  };

  const handleSave = () => {
    if (selectedUser && selectedUser.role === "artist") {
      handleArtistAproved({
        artist_id: selectedUser.artist_id,
        email: selectedUser.email,
      })
        .then(() => {
          getArtists(); // Refresh artist data
          handleCloseDialog();
        })
        .catch((error) => {
          console.error("Error updating admin approved status:", error);
        });
    } else {
      handleCloseDialog();
    }
  };

  React.useEffect(() => {
    getUsers();
    getArtists();
  }, []);

  // Set default category to "All" on component mount
  React.useEffect(() => {
    setCategory("All");
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
            Users
          </Typography>
        </Box>
        <Box sx={{ padding: "2em" }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                freeSolo
                id="user-search"
                disableClearable
                options={["All", ...userData.map((option) => option.name)]}
                sx={{ width: 300 }}
                onChange={handleUserSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search users by name"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ width: "300px" }}>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={handleCategoryChange}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Fans">Fans</MenuItem>
                  <MenuItem value="Artists">Artists</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}
            >
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox />}
                  name={"email_not_verified"}
                  onChange={handleFilterChange}
                  label="Email Not Verified"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                rows={rows ? rows : []}
                columns={columns}
                getRowId={(row) => row._id}
                checkboxSelection
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
      {selectedUser && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>User Details</DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2,
              }}
            >
              <Typography variant="body1">
                <strong>User ID:</strong> {selectedUser.user_id}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedUser.name}
              </Typography>
              <Typography variant="body1">
                <strong>Mobile Number:</strong> {selectedUser.mobileNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Country:</strong> {selectedUser.country}
              </Typography>
              <Typography variant="body1">
                <strong>Gender:</strong> {selectedUser.gender}
              </Typography>
              <Typography variant="body1">
                <strong>Birth Date:</strong> {selectedUser.birthDate}
              </Typography>
              <Typography variant="body1">
                <strong>Email Verified:</strong>{" "}
                {selectedUser.isEmailVerified ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">
                <strong>Mobile Verified:</strong>{" "}
                {selectedUser.isMobileVerified ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {selectedUser.role}
              </Typography>
              <Typography variant="body1">
                <strong>Joined Date:</strong> {selectedUser.joinedDate}
              </Typography>
              {selectedUser.verificationDocuments &&
                selectedUser.verificationDocuments.length > 0 && (
                  <img
                    src={selectedUser.verificationDocuments[0]}
                    alt="Verification Document"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      marginTop: "16px",
                    }}
                  />
                )}
              {selectedUser.role === "artist" && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={isAdminApproved}
                      onChange={handleAdminApprovedChange}
                    />
                  }
                  label="Admin Approved"
                />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
}
