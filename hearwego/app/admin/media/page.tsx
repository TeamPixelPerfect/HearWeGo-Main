"use client";
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton,
  TextField,
  Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'; 
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// Define the structure of a press release
interface PressRelease {
  id: number;
  title: string;
  description: string;
  artist: string;
  venue: string;
  date: string;
  logoImage: string;
  signatureImage: string;
}

// Define the structure of a PR post
interface PRPost {
  id: number;
  title: string;
  description: string;
  artist: string;
  date: string;
  imge : string;
}

// Define the functional component AdminNewsUpdatesPage
const AdminNewsUpdatesPage = () => {
  // State variables to manage component's state
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [prPosts, setPRPosts] = useState<PRPost[]>([]);
  const [filterBy, setFilterBy] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [selectedItem, setSelectedItem] = useState<PressRelease | PRPost | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Simulate fetching press releases and PR posts on component mount
  useEffect(() => {
    const fetchPressReleases = async () => {
      const pressReleasesData: PressRelease[] = [
        { id: 1, title: 'Press Release 1', description: 'Description of Press Release 1', artist: 'Artist A', venue: 'Venue A', date: '2024-06-01', logoImage: 'https://example.com/logo1.jpg', signatureImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-f1Q28jlyhcYuu_zWJp6oI1Fdb5RzEBkrA&s' },
        { id: 2, title: 'Press Release 2', description: 'Description of Press Release 2', artist: 'Artist B', venue: 'Venue B', date: '2024-06-05', logoImage: 'https://example.com/logo2.jpg', signatureImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-f1Q28jlyhcYuu_zWJp6oI1Fdb5RzEBkrA&s' },
        // Add more press releases as needed
      ];
      setPressReleases(pressReleasesData);
    };

    const fetchPRPosts = async () => {
      const prPostsData: PRPost[] = [
        { id: 1, title: 'PR Post 1', description: 'Description of PR Post 1', artist: 'Artist X', date: '2024-06-01',image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-f1Q28jlyhcYuu_zWJp6oI1Fdb5RzEBkrA&s'},
        { id: 2, title: 'PR Post 2', description: 'Description of PR Post 2', artist: 'Artist Y', date: '2024-06-05',image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN-f1Q28jlyhcYuu_zWJp6oI1Fdb5RzEBkrA&s'  },
        // Add more PR posts as needed
      ];
      setPRPosts(prPostsData);
    };

    fetchPressReleases();
    fetchPRPosts();
  }, []);

  // Function to handle pagination change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Function to handle tab change
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Function to handle filter change
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterBy(event.target.value as string);
    setFilterKeyword('');
  };

  // Function to handle keyword change for filtering
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterKeyword(event.target.value);
  };

  // Function to open view details dialog for an item
  const handleViewDetails = (item: PressRelease | PRPost) => {
    setSelectedItem(item);
    setOpenViewDialog(true);
  };

  // Function to open delete confirmation dialog for an item
  const handleDelete = (item: PressRelease | PRPost) => {
    setDeletingItemId(item.id);
    setEmailRecipient(`${item.artist}@example.com`); // Set default recipient email
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };

  // Function to confirm deletion of an item
  const confirmDelete = async () => {
    if (deletingItemId === null || !emailRecipient || !deleteReason) return;

    try {
      // Simulate deletion (replace with actual API call)
      if (tabValue === 0) {
        const updatedList = pressReleases.filter(pr => pr.id !== deletingItemId);
        setPressReleases(updatedList);
      } else if (tabValue === 1) {
        const updatedList = prPosts.filter(pr => pr.id !== deletingItemId);
        setPRPosts(updatedList);
      }
      
      handleSnackbarOpen(`Deleted ${selectedItem?.title}`);

      // Construct email data
      const emailData = {
        to: emailRecipient,
        subject: `Item Deleted: ${selectedItem?.title}`,
        body: `Dear ${selectedItem?.artist},\n\nWe regret to inform you that the item titled "${selectedItem?.title}" has been deleted.\n\nReason provided: ${deleteReason}\n\nSincerely,\n[Your Company Name]`,
      };

      // Replace with your actual email API endpoint and authentication headers
      const apiUrl = 'https://api.your-email-service.com/send';
      const response = await axios.post(apiUrl, emailData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_KEY', // Replace with your API key or authentication method
        },
      });

      // Check response status and handle accordingly (this is a basic example)
      if (response.status === 200) {
        console.log('Email sent successfully:', response.data);
      } else {
        console.error('Failed to send email:', response.data);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      // Reset state after deletion
      setOpenDeleteDialog(false);
      setDeletingItemId(null);
      setDeleteReason('');
      setEmailRecipient('');
    }
  };

  // Function to close view details dialog
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  // Function to close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingItemId(null);
    setDeleteReason('');
    setEmailRecipient('');
  };

  // Function to handle closing snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to handle opening snackbar with a message
  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  // Filter press releases based on keyword
  const filteredPressReleases = pressReleases.filter((release) =>
    release.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    release.artist.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  // Filter PR posts based on keyword
  const filteredPRPosts = prPosts.filter((post) =>
    post.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    post.artist.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  // Styles for the letter content in the view details dialog
  const letterStyles = {
    padding: '2em',
    lineHeight: '1.6',
  };

  // Render JSX content
  return (
    <Grid container sx={{ width: "100%", margin: 0 }}>
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          // background: theme.palette.background.default,
        }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ margin: "30px" }}>
            News and Updates
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2} marginBottom={2}>
          <Tabs value={tabValue} onChange={handleChangeTab}>
            <Tab label="Press Releases" />
            <Tab label="PR Posts" />
          </Tabs>
          <Box display="flex" alignItems="center" >
            <FormControl variant="outlined" sx={{ minWidth: 180 }}>
              <InputLabel>Filter By</InputLabel>
              <Select value={filterBy} onChange={handleFilterChange} label="Filter By">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
              </Select>
            </FormControl>
            {filterBy && (
              <TextField
                label="Keyword"
                value={filterKeyword}
                onChange={handleKeywordChange}
                variant="outlined"
                size="small"
                sx={{ marginLeft: '1em' }}
              />
            )}
          </Box>
          </Box>
          <div style={{ width: '100%', marginBottom: '1em',padding:"20px" }}>
            {tabValue === 0 && (
              <DataGrid
                rows={filteredPressReleases}
                columns={[
                  { field: 'id', headerName: 'ID', width: 60, sortable: true},
                  { field: 'title', headerName: 'Title', width: 150, sortable: true },
                  { field: 'description', headerName: 'Description', width: 350 },
                  { field: 'artist', headerName: 'Artist', width: 150 },
                  { field: 'date', headerName: 'Date', width: 150, sortable: true },
                  {
                    field: 'actions',
                    headerName: 'Actions',
                    width: 300,
                    renderCell: (params) => (
                      <>
                        <Button size="small" onClick={() => handleViewDetails(params.row)}>
                          View
                        </Button>
                        <Button size="small" onClick={() => handleDelete(params.row)} startIcon={<DeleteIcon />} sx={{ color: 'red' }}>
                          Delete
                        </Button>
                      </>
                    ),
                  },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            )}
            {tabValue === 1 && (
              <DataGrid
                rows={filteredPRPosts}
                columns={[
                  { field: 'id', headerName: 'ID', width: 60, sortable: true },
                  { field: 'title', headerName: 'Title', width: 150, sortable: true },
                  { field: 'description', headerName: 'Description', width: 350 },
                  { field: 'artist', headerName: 'Artist', width: 150 },
                  { field: 'date', headerName: 'Date', width: 150, sortable: true },
                  {
                    field: 'actions',
                    headerName: 'Actions',
                    width: 300,
                    renderCell: (params) => (
                      <>
                        <Button size="small" onClick={() => handleViewDetails(params.row)}>
                          View
                        </Button>
                        <Button size="small" onClick={() => handleDelete(params.row)} startIcon={<DeleteIcon />} sx={{ color: 'red' }}>
                          Delete
                        </Button>
                      </>
                    ),
                  },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            )}
          </div>
          <Dialog open={openViewDialog} onClose={handleCloseViewDialog} fullWidth maxWidth="md">
            <DialogTitle>
              {selectedItem?.title}
              <IconButton aria-label="close" onClick={handleCloseViewDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Paper elevation={3} sx={letterStyles}>

                <Typography variant="h6" gutterBottom>
                  {selectedItem?.title}
                </Typography>
                {(selectedItem as PRPost)?.image && (
                  <img src={(selectedItem as PRPost).image} alt="Artist's Signature" style={{ marginTop: '1em', maxWidth: '100%' }} />

                )}
                {selectedItem?.date && (
                  <Typography variant="caption" color="textSecondary" sx={{ display: "flex" }}>
                    Date: {selectedItem?.date}
                  </Typography>
                )}
                {selectedItem?.artist && (
                  <Typography variant="caption" color="textSecondary" sx={{ display: "flex" }}>
                    Artist: {selectedItem?.artist}
                  </Typography>
                )}
                {selectedItem?.venue && (
                  <Typography variant="caption" color="textSecondary" sx={{ display: "flex" }}>
                    Venue: {selectedItem?.venue}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ marginTop: '1em' }}>
                  {selectedItem?.description}
                </Typography>
                {selectedItem?.signatureImage && (
                  <img src={selectedItem?.signatureImage} alt="Artist's Signature" style={{ marginTop: '1em', maxWidth: '100%' }} />
                )}
              
              </Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewDialog}>
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} fullWidth maxWidth="md">
            <DialogTitle>
              Confirm Deletion
              <IconButton aria-label="close" onClick={handleCloseDeleteDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete "{selectedItem?.title}"?
              </Typography>
              {selectedItem?.artist && (
                <Typography variant="body1" sx={{ marginTop: '1em' }}>
                
                </Typography>
              )}
                <Typography variant="body1" sx={{ marginTop: '1em' }}>
                 To:
              </Typography>
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                // value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
              />
              <TextField
                margin="dense"
                id="reason"
                label="Reason for deletion"
                type="text"
                fullWidth
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} sx={{color:"primary.main"}}>
                Cancel
              </Button>
              <Button onClick={confirmDelete} >
                Send & Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for displaying messages */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          />

          {/* Pagination component */}
          {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
            <Pagination count={10} page={page} onChange={handlePageChange} />
          </Box> */}
        </Container>
      </Card>
    </Grid>
  );
};

export default AdminNewsUpdatesPage;

