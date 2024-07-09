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
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { getAllUsers } from "@/app/services/UserServices";
import { User } from "@/app/constants/models";
import { getAllArtists } from "@/app/services/ArtistServices";

interface UsersDataGridProps {
  params: { id: string };
}

export default function UsersDataGrid({ params: { id } }: UsersDataGridProps) {
  const theme = useTheme();
  const router = useRouter();

  const [userData, setUserData] = React.useState<User[]>([]);
  const [rows, setRows] = React.useState<User[]>([]);

  const [category, setCategory] = React.useState<string>("Fans");

  const columns: GridColDef[] = [
    { field: "user_id", headerName: "User ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: category === "Fanns" ? "name" : "artistName", headerName: "Name", flex: 2 },
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
    { field: "role", headerName: "Role", flex: 1 },
    { field: "joinedDate", headerName: "Joined Date", flex: 1 },
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
              router.push(`/admin/users/${params.row.user_id}`);
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
      const filteredData = rows.filter((user) => !user.isEmailVerified);
      setRows(filteredData);
    } else {
      setRows(userData);
    }
  };

  const handleUserSearch = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (value === "All") return setRows(userData);
    const filteredUsers = userData.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setRows(filteredUsers);
  };

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
    value: any
  ) => {
    setCategory(value);
    if (value === "Fans") {
      getUsers();
    } else {
      getArtists();
    }
  };

  const getUsers = () => {
    const users = getAllUsers().then((data) => {
      setUserData(data.data);
      setRows(data.data);
    });
  };

  const getArtists = () => {
    const artists = getAllArtists().then((data) => {
      setUserData(data.data);
      setRows(data.data);
    });
  };

  React.useEffect(() => {
    getUsers();
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
                router.push("/admin/users/add");
              }}
            >
              Add New User
            </Button>
          </Stack>
        </Box>
        <Box sx={{ padding: "2em" }}>
          <Grid container>
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
              <FormControl sx={{width: "300px"}}>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="fans" selected>Fans</MenuItem>
                  <MenuItem value="artists">Artists</MenuItem>
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
