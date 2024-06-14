"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const helpSections = {
  payment: [
    {
      question: "How to handle a failed payment?",
      answer:
        "If your payment fails, please check your payment details and try again or contact your bank.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Refunds can be requested by contacting our support team within 30 days of purchase.",
    },
    {
      question: "How do I update my payment method?",
      answer:
        "You can update your payment method in the Account Settings section.",
    },
    {
      question: "Why was my payment declined?",
      answer:
        "Payments can be declined due to insufficient funds or security checks by your bank.",
    },
    {
      question: "How to cancel a subscription?",
      answer:
        "You can cancel your subscription in the Subscription section of your account settings.",
    },
  ],
  account: [
    {
      question: "How to reset my password?",
      answer:
        'Go to the login page and click on "Forgot Password" to reset your password.',
    },
    {
      question: "How to update my profile?",
      answer: "Navigate to your profile settings and update your information.",
    },
    {
      question: "How to delete my account?",
      answer: "To delete your account, contact support for assistance.",
    },
    {
      question: "How do I change my email address?",
      answer:
        "You can change your email address in the Account Settings section.",
    },
    {
      question: "How to enable two-factor authentication?",
      answer:
        "Enable two-factor authentication for added security in your Account Settings.",
    },
  ],
  store: [
    {
      question: "How to track my order?",
      answer:
        "You can track your order in the Order History section of your account.",
    },
    {
      question: "What is the shipping policy?",
      answer:
        "Shipping policies are detailed in the Shipping section of our website.",
    },
    {
      question: "How to return an item?",
      answer:
        "Follow the return instructions in the Returns section of our website.",
    },
    {
      question: "How to contact customer support?",
      answer:
        'Contact customer support through the "Contact Us" form on our website.',
    },
    {
      question: "How to use discount codes?",
      answer:
        "Apply discount codes during checkout in the Discount Code section.",
    },
  ],
  club: [
    {
      question: "How to join a fan club?",
      answer:
        'To join a fan club, go to the Fan Club section and click on the "Join" button next to the club you want to join.',
    },
    {
      question: "How to participate in club events?",
      answer:
        "Check the Events section in your club for upcoming events and how to participate.",
    },
    {
      question: "How to cancel club membership?",
      answer: "Contact support to cancel your club membership.",
    },
    {
      question: "How to create a new club?",
      answer: "New clubs can be created by contacting our support team.",
    },
    {
      question: "How to change club settings?",
      answer:
        "Club settings can be managed in the Club Settings section of your account.",
    },
  ],
  others: [
    {
      question: "How to contact support?",
      answer:
        'You can contact support through the "Contact Us" form on our website.',
    },
    {
      question: "Where to find user guides?",
      answer:
        "User guides are available in the Help Center under the Resources section.",
    },
    {
      question: "How to provide feedback?",
      answer:
        'We welcome your feedback through the "Feedback" section of our website.',
    },
    {
      question: "How to report a bug?",
      answer: "Report bugs through the Bug Report form in our Help Center.",
    },
    {
      question: "How to request a feature?",
      answer:
        "Use the Feature Request form to submit your ideas for new features.",
    },
  ],
};

const Help: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    issue: string;
  }>({
    name: "",
    email: "",
    issue: "",
  });
  const [formModalOpen, setFormModalOpen] = useState<boolean>(false);
  const [submissionModalOpen, setSubmissionModalOpen] = useState<boolean>(
    false
  );
  const [loading, setLoading] = useState<boolean>(false); // Added for form submission loading indicator

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    setFormModalOpen(false); // Close form modal if open
    setSubmissionModalOpen(false); // Close submission modal if open
  };
  const handleOpenFormModal = () => {
    setFormModalOpen(true);
    setSubmissionModalOpen(false);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setFormData({ name: "", email: "", issue: "" }); // Reset form data
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Start loading indicator
    // Simulate form submission logic (replace with actual submission logic)
    setTimeout(() => {
      setLoading(false); // Stop loading indicator
      setFormModalOpen(false); // Close form modal
      setSubmissionModalOpen(true); // Open submission confirmation modal
    }, 1000); // Simulated delay of 1 second
  };
  const handleCloseSubmissionModal = () => {
    setSubmissionModalOpen(false);
    setSelectedSection(null); // Reset selected section
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        How Can I Help You?
      </Typography>
      <Box display="flex" alignItems="center" mb={3}>
        <SearchIcon />
        <TextField
          variant="outlined"
          placeholder="Search for help..."
          fullWidth
          margin="normal"
        />
      </Box>
      <Grid container spacing={3}>
        {Object.keys(helpSections).map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section}>
            <Card
              onClick={() => handleSectionClick(section)}
              style={{
                cursor: "pointer",
                minHeight: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {section.charAt(0).toUpperCase() + section.slice(1)} Help
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={selectedSection !== null}
        onClose={() => setSelectedSection(null)}
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
          {selectedSection && (
            <>
              <Typography id="help-modal-title" variant="h5" gutterBottom>
                {selectedSection.charAt(0).toUpperCase() +
                  selectedSection.slice(1)}{" "}
                Help
              </Typography>
              {helpSections[
                selectedSection as keyof typeof helpSections
              ].map((faq, index) => (
                <Accordion key={index} elevation={0} square={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
              <Box mt={3}>
                <Typography variant="h6">
                  Can't find what you're looking for?
                </Typography>
                <Button
                  onClick={handleOpenFormModal}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
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
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="issue"
              label="Describe your issue"
              name="issue"
              multiline
              rows={4}
              value={formData.issue}
              onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading} // Disable button when submitting
              >
                {loading && <CircularProgress size={24} style={{ marginRight: 8 }} />} {/* Show loading indicator */}
                Submit
              </Button>
              <Button
                onClick={handleCloseFormModal}
                variant="outlined"
                color="secondary"
                style={{ marginLeft: 10 }}
                disabled={loading} // Disable button when submitting
              >
                Cancel
              </Button>
            </Box>
          </Box>
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
          <Typography variant="h5" id="submission-modal-title" gutterBottom>
            Submission Confirmation
          </Typography>
          <Typography id="submission-modal-description" variant="body1">
            Your issue has been submitted. We will respond as soon as possible.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
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
  );
};

export default Help;

