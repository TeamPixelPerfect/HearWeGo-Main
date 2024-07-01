import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { PressReleaseSaved } from "../styles/PressReleaseOriginal.styles";
import jsPDF from 'jspdf';

interface Props {
  id: string;
  title: string;
  releaseDate: string;
  handleShare: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function PressReleaseSavedRow({
  id,
  title,
  releaseDate,
  handleShare,
  handleDelete,
}: Props) {
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [shareMessage, setShareMessage] = useState("Select your share option");
  const [deleteMessage, setDeleteMessage] = useState("");

  const generatePDF = () => {
    const pdf = new jsPDF();
    // Add content to the PDF
    pdf.text('Press Release Title: ' + title, 10, 10);
    pdf.text('Release Date: ' + releaseDate, 10, 20);
    // Save the PDF
    pdf.save('press_release.pdf');
  };

  const handleShareClick = () => {
    setOpenShareDialog(true);
  };

  const handleShareClose = () => {
    setShareMessage("Successfully shared");
    setTimeout(() => {
      setOpenShareDialog(false);
      setShareMessage("Select your share option");
      handleShare(id);
    }, 2000);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    setDeleteMessage("Successfully deleted");
    setTimeout(() => {
      setOpenDeleteDialog(false);
      handleDelete(id);
    }, 2000);
  };

  return (
    <PressReleaseSaved>
      <Card
        sx={{
          // maxWidth: "12%",
          width: "200px",
          display: "flex",
          flexDirection: "column",
          margin: "30px",
        }}
      >
        <Box
          sx={{
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <Button onClick={generatePDF}>
            <PictureAsPdfIcon
              sx={{
                color: "red",
                fontSize: "140px",
              }}
            />
          </Button>
        </Box>
        <Divider />
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <Typography variant="body1">{title}</Typography>
            <Typography variant="body1">{releaseDate}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "white",
            }}
          >
            <Button onClick={handleDeleteClick}>
              <DeleteIcon
                sx={{
                  fontSize: "20px",
                }}
              />
            </Button>
            <Button onClick={handleShareClick}>
              <ShareIcon
                sx={{
                  fontSize: "20px",
                }}
              />
            </Button>
          </Box>
        </Box>
      </Card>

      <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <Typography>{shareMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <Typography>{deleteMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </PressReleaseSaved>
  );
}
