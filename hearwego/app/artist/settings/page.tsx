"use client";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  styled,
  Stack,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
  Switch,
  createTheme,
  ThemeProvider,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
} from "@mui/material";
const FormContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const PasswordRequirements = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: "left",
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;



  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle password change logic here
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleDelete = () => {
    if (checked) {
      // Handle account deletion logic here
      console.log("Account deletion initiated");
    } else {
      alert("Please confirm that you want to delete your account.");
    }
  };
  const [artistBankDetails, setArtistBankDetails] = useState({
    bankDetails: {
      accountName: "John Doe",
      accountNumber: "123456789",
      bankName: "Bank of Example",
      bankBranch: "Main Branch",
    },
  });



  const theme = createTheme();

const purchases = [
  {
    itemName: 'Painting A',
    
    dateOfPurchase: '2024-06-15',
    details: 'Oil on Canvas',
    price: 2000,
    paymentMethod: 'Credit Card',
    status:'paid'
  },
  {
    itemName: 'Sculpture B',
 
    dateOfPurchase: '2024-06-20',
    details: 'Marble Sculpture',
    price: 3500,
    paymentMethod: 'PayPal',
    status:'paid'
  },
];



  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 700,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Password" {...a11yProps(1)} />
        <Tab label="General" {...a11yProps(2)} />
        <Tab label="Payment" {...a11yProps(3)} />
        <Tab label="Delete Account" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px",
            marginLeft: "200px",
            borderRadius: "20px",
          }}
        >
          <div style={{ marginLeft: "20px" }}>
            <AccountCircleIcon sx={{ fontSize: "200px", color: "GrayText" }} />
          </div>
          <div>
            <Stack>
              <Button sx={{ width: "250px" }} variant="contained">
                My Profile
              </Button>
              <Button
                sx={{ width: "250px", marginTop: "20px" }}
                variant="contained"
              >
                Log Out
                <LogoutIcon sx={{ marginLeft: "20px" }} />
              </Button>
            </Stack>
          </div>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormContainer component="main" maxWidth="xs">
          <Card
            sx={{ borderRadius: "20px", width: "600px", marginLeft: "500px" }}
          >
            <CardContent>
              <Typography component="h1" variant="h5">
                Change Password
              </Typography>
              <Form onSubmit={handleSubmit}>
                <TextField
                  sx={{ width: "500px" }}
                  variant="outlined"
                  margin="normal"
                  required
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  id="currentPassword"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                  sx={{ width: "500px" }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  sx={{ width: "500px" }}
                  variant="outlined"
                  margin="normal"
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: "20px",
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <SubmitButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </SubmitButton>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </div>
                <PasswordRequirements>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Password requirements:</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="ul"
                  >
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase character</li>
                    <li>At least one uppercase character</li>
                    <li>
                      At least one number, symbol, or whitespace character
                    </li>
                  </Typography>
                </PasswordRequirements>
              </Form>
            </CardContent>
          </Card>
        </FormContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 800,
            margin: "auto",
            padding: 4,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Box sx={{ flex: 1, paddingRight: 20,marginLeft:'20px' }}>
                <Typography variant="h6">Theme</Typography>
                <Typography component="div">
                  <a href="https://chrome.google.com/webstore">
                    Open Chrome Web Store
                  </a>
                </Typography>

                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Mode
                </Typography>
                <Select defaultValue="Dark" variant="outlined" fullWidth>
                  <MenuItem value="Light">Light</MenuItem>
                  <MenuItem value="Dark">Dark</MenuItem>
                </Select>

                <FormControlLabel
                  control={<Switch defaultChecked={false} />}
                  label="Show home button"
                  sx={{ display: "block", marginTop: 2 }}
                />

                <FormControlLabel
                  control={<Switch defaultChecked={false} />}
                  label="Show bookmarks bar"
                  sx={{ display: "block", marginTop: 2 }}
                />

                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Tab hover preview card
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked={true} />}
                  label="Show tab preview images"
                  sx={{ display: "block", marginTop: 1 }}
                />
                <FormControlLabel
                  control={<Switch defaultChecked={true} />}
                  label="Show tab memory usage"
                  sx={{ display: "block", marginTop: 1 }}
                />
              </Box>

              <Box sx={{ flex: 1, paddingLeft: 2 }}>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Side panel
                </Typography>
                <RadioGroup defaultValue="Show on right">
                  <FormControlLabel
                    value="Show on right"
                    control={<Radio />}
                    label="Show on right"
                  />
                  <FormControlLabel
                    value="Show on left"
                    control={<Radio />}
                    label="Show on left"
                  />
                </RadioGroup>

                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Font size
                </Typography>
                <Select defaultValue="Medium" variant="outlined" fullWidth>
                  <MenuItem value="Small">Small</MenuItem>
                  <MenuItem value="Medium">Medium (Recommended)</MenuItem>
                  <MenuItem value="Large">Large</MenuItem>
                </Select>

                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Page zoom
                </Typography>
                <Select defaultValue={100} variant="outlined" fullWidth>
                  <MenuItem value={50}>50%</MenuItem>
                  <MenuItem value={75}>75%</MenuItem>
                  <MenuItem value={100}>100%</MenuItem>
                  <MenuItem value={125}>125%</MenuItem>
                  <MenuItem value={150}>150%</MenuItem>
                  <MenuItem value={175}>175%</MenuItem>
                  <MenuItem value={200}>200%</MenuItem>
                </Select>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px",
            marginLeft: "50px",
            borderRadius: "10px",
          }}
        >
          <Box sx={{}}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60ch",
                marginLeft: "10px",
              }}
            >
              <Typography
                sx={{ marginTop: "10px",}}
                variant="h5"
                gutterBottom
              >
                Bank Details
              </Typography>
              <TextField
                id="bank-account-name"
                label="Bank Account Name"
                variant="filled"
                style={{ boxSizing: "initial", marginTop: "10px" }}
                value={artistBankDetails.bankDetails.accountName}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      accountName: e.target.value,
                    },
                  });
                }}
              />

              <TextField
                id="bank-account-no"
                label="Bank Account Number"
                variant="filled"
                style={{ boxSizing: "initial", marginTop: "10px" }}
                value={artistBankDetails.bankDetails.accountNumber}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      accountNumber: e.target.value,
                    },
                  });
                }}
              />

              <TextField
                id="bank"
                label="Bank"
                variant="filled"
                style={{ boxSizing: "initial", marginTop: "10px" }}
                value={artistBankDetails.bankDetails.bankName}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      bankName: e.target.value,
                    },
                  });
                }}
              />

              <TextField
                id="bank-branch"
                label="Bank Branch"
                variant="filled"
                style={{ boxSizing: "initial", marginTop: "10px" }}
                value={artistBankDetails.bankDetails.bankBranch}
                onChange={(e) => {
                  setArtistBankDetails({
                    ...artistBankDetails,
                    bankDetails: {
                      ...artistBankDetails.bankDetails,
                      bankBranch: e.target.value,
                    },
                  });
                }}
              />
            </form>
          </Box>
          <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop:'20px',
          marginLeft:'25px'


        }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">Cansel</Button>
          <Button variant="contained">Save</Button>
        </Stack>
      </div>
        </Card>
        <Card sx={{marginTop:'20px',marginLeft:'50px'}}>
        <Typography
                sx={{ marginTop: "10px", marginLeft: "10px" }}
                variant="h5"
                gutterBottom
              >
              Payment History
              </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
             
              <TableCell align="right">Date of Purchase</TableCell>
              <TableCell align="right">Details</TableCell>
              <TableCell align="right">Price (USD)</TableCell>
              <TableCell align="right">Payment Method</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {purchase.itemName}
                </TableCell>
                
                <TableCell align="right">{purchase.dateOfPurchase}</TableCell>
                <TableCell align="right">{purchase.details}</TableCell>
                <TableCell align="right">{purchase.price}</TableCell>
                <TableCell align="right">{purchase.paymentMethod}</TableCell>
                <TableCell align="right">{purchase.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
    </Card>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Card
          sx={{
            padding: 6,
            borderRadius: "4px",
            maxWidth: "900px",
            margin: "auto",
            marginLeft: "100px",
          }}
        >
          <Typography variant="h6">Delete Your Account</Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            When you delete your account, you lose access to Front account
            services, and we permanently delete your personal data. You can
            cancel the deletion for 14 days.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleCheckboxChange} />
            }
            label="Confirm that I want to delete my account."
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={!checked}
            >
              Delete
            </Button>
          </Box>
        </Card>
      </TabPanel>
    </Box>
  );
}
