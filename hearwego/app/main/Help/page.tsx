"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HelpComplaints, HelpArticle } from "../../constants/models";
import {
  createComplaintForm,
  getHelpArticles,
} from "../../services/HelpServices";
import { useAppSelector } from "@/lib/hooks";
import { get } from "http";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  ComplaintTitle: Yup.string().required("Complaint title is required"),
  ProblemInBrief: Yup.string().required("Issue description is required"),
});

const quickHelp = [
  {
    question: "How to reset my password?",
    answer:
      'Go to the login page and click on "Forgot Password" to reset your password.',
  },
  {
    question: "How to track my order?",
    answer:
      "You can track your order in the Order History section of your account.",
  },
  {
    question: "How to update my payment method?",
    answer:
      "You can update your payment method in the Account Settings section.",
  },
];

const Help = () => {
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(
    null
  );
  const [ComplaintData, setComplaintData] = useState<HelpComplaints>();
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [submissionModalOpen, setSubmissionModalOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Added for form submission loading indicator
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const [helpArticles, setHelpArticles] = useState<HelpArticle[]>([]);

  useEffect(() => {
    getHelpArticles().then((res) => {
      console.log(res.data);
      setHelpArticles(res.data);
    });
  }, []);

  const handleSectionClick = (section: HelpArticle) => {
    setSelectedArticle(section);
    setFormModalOpen(false);
    setSubmissionModalOpen(false);
  };

  const handleOpenFormModal = () => {
    setFormModalOpen(true);
    setSubmissionModalOpen(false);
    setIsSubmitted(false);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    formik.resetForm(); // Reset formik form state
    setIsSubmitted(false); // Reset submission confirmation state
  };

  const handleSubmit = async (values: {
    userName: string;
    userEmail: string;
    ComplaintTitle: string;
    ProblemInBrief: string;
  }) => {
    setLoading(true);
    try {
      const complaintData: HelpComplaints = {
        userName: values.userName,
        userEmail: values.userEmail,
        ComplaintTitle: values.ComplaintTitle,
        ProblemInBrief: values.ProblemInBrief,
        isHandled: false,
        userId: user?.user_id ? user.user_id : "",
        status: "to_solve",
      };
      await createComplaintForm(user?.token ? user.token : "", complaintData);
      formik.resetForm(); // Reset formik form state
      setLoading(false);
      setFormModalOpen(false);
      setIsSubmitted(true); // Set submission confirmation state to true
      setTimeout(() => {
        setIsSubmitted(false); // Hide submission confirmation after some time (optional)
      }, 3000); // Example: Hide after 3 seconds
    } catch (error) {
      setLoading(false);
      // handle error
    }
  };

  const filteredHelpArticles = helpArticles.filter((article) =>
    article.articalTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSubmissionModal = () => {
    setSubmissionModalOpen(false);
    setSelectedArticle(null); // Reset selected section
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      userEmail: "",
      ComplaintTitle: "",
      ProblemInBrief: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mb={3}
          >
            <Box sx={{ height: "50%", marginTop: "5%" }}>
              <Typography variant="subtitle1" component="div">
                HearWeGo
              </Typography>
              <Typography
                variant="h2"
                component="div"
                align="center"
                fontWeight="bold"
                style={{ flexGrow: 1 }}
              >
                How Can We Help You?
              </Typography>
            </Box>
          </Box>

          <Box
            mb={3}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60%",
                borderRadius: "4px",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search for help..."
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "gray" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          <Grid container spacing={3}>
            {filteredHelpArticles.map((section) => (
              <Grid item xs={12} sm={6} md={4} key={section.articalId}>
                <Card
                  onClick={() => handleSectionClick(section)}
                  style={{
                    cursor: "pointer",
                    minHeight: "150px",
                    position: "relative",
                    borderRadius: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={section.articalImage_URL}
                    alt={section.articalTitle}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.4)",
                    }}
                  />
                  <CardContent
                    style={{
                      position: "absolute",
                      bottom: 50,
                      left: 0,
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.2)",
                      padding: "8px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{ textAlign: "center", color: "white" }}
                    >
                      {section.articalTitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={3} mb={3}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ marginTop: "50px", marginBottom: "20px" }}
            >
              Quick Help
            </Typography>
            {quickHelp.map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                square={true}
                sx={{ margin: "10px" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ marginLeft: "10px" }}>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Modal
            open={selectedArticle !== null}
            onClose={() => setSelectedArticle(null)}
            aria-labelledby="help-modal-title"
            aria-describedby="help-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxWidth: 600,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 4,
              }}
            >
              {selectedArticle && (
                <>
                  <Typography
                    id="help-modal-title"
                    variant="h5"
                    gutterBottom
                    sx={{ marginTop: "10px" }}
                  >
                    {selectedArticle.articalTitle}
                  </Typography>
                  {selectedArticle.QandA?.map((item, index) => (
                    <Accordion
                      key={index}
                      elevation={0}
                      square={true}
                      sx={{ marginTop: "10px" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                      >
                        <Typography>{item.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ marginLeft: "10px" }}>
                        <Typography>{item.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  <Box mt={3}>
                    <Typography variant="h6" sx={{ marginTop: "20px" }}>
                      Can't find what you're looking for?
                    </Typography>
                    <Button
                      onClick={handleOpenFormModal}
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: "10px",
                        marginLeft: "70%",
                        textTransform: "none",
                      }}
                    >
                      Submit Your Issue
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Modal>

          <Modal
            open={formModalOpen}
            onClose={handleCloseFormModal}
            aria-labelledby="issue-form-modal-title"
            aria-describedby="issue-form-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 4,
              }}
            >
              <Typography id="issue-form-modal-title" variant="h5" gutterBottom>
                Submit Your Issue
              </Typography>
              <form onSubmit={formik.handleSubmit} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="userName"
                  name="userName"
                  label="Name"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="ComplaintTitle"
                  name="ComplaintTitle"
                  label="Complaint Title"
                  value={formik.values.ComplaintTitle}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ComplaintTitle &&
                    Boolean(formik.errors.ComplaintTitle)
                  }
                  helperText={
                    formik.touched.ComplaintTitle &&
                    formik.errors.ComplaintTitle
                  }
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="userEmail"
                  name="userEmail"
                  label="Email"
                  type="email"
                  value={formik.values.userEmail}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userEmail && Boolean(formik.errors.userEmail)
                  }
                  helperText={
                    formik.touched.userEmail && formik.errors.userEmail
                  }
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  id="ProblemInBrief"
                  name="ProblemInBrief"
                  label="Describe your issue"
                  multiline
                  rows={4}
                  value={formik.values.ProblemInBrief}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.ProblemInBrief &&
                    Boolean(formik.errors.ProblemInBrief)
                  }
                  helperText={
                    formik.touched.ProblemInBrief &&
                    formik.errors.ProblemInBrief
                  }
                  sx={{ width: "100%" }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 2,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading && (
                      <CircularProgress size={24} style={{ marginRight: 8 }} />
                    )}
                    Submit
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCloseFormModal}
                    style={{
                      color: "#E74C3C",
                      marginLeft: 10,
                      textTransform: "none",
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>

          <Modal
            open={submissionModalOpen}
            onClose={handleCloseSubmissionModal}
            aria-labelledby="submission-modal-title"
            aria-describedby="submission-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 4,
              }}
            >
              <Typography
                id="submission-modal-title"
                variant="h5"
                gutterBottom
                align="center"
              >
                Thank you for submitting your issue!
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={3}
              >
                <Button
                  onClick={handleCloseSubmissionModal}
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        </Container>
      </Grid>
    </Grid>
  );
};
export default Help;
