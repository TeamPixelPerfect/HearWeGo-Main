"use client";

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import DraftsIcon from "@mui/icons-material/Drafts";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import { PressReleaseDraft } from "../styles/PressReleaseOriginal.styles";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  releaseDate: string;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  switchTab: (tabId: string) => void; 
}

export default function PressReleaseDraftRow({
  id,
  title,
  releaseDate,
  handleEdit,
  handleDelete,
  switchTab,
}: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");



  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    setDeleteMessage("Successfully deleted");
    setTimeout(() => {
      setOpenDeleteDialog(false);
      handleDelete(id);
    }, 2000);
  };


  return (
    <PressReleaseDraft>
      <Card
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "row",
          marginTop: "20px",
        }}
      >
        <Box sx={{ display: "flex", padding: "10px" }}>
          <Button onClick={handleDeleteClick}>
            <DraftsIcon sx={{ fontSize: "40px" }} />
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
            width: "35%",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            {title}
          </Typography>
        </Box>

        <Divider sx={{ height: "80%"}} orientation="vertical" flexItem />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
            width: "35%",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            {releaseDate}
          </Typography>
        </Box>

        <Divider sx={{ height: "80%" }} orientation="vertical" flexItem />
       
       
        <Box sx={{ display: "flex", padding: "10px" }}>
        <Button onClick={() => handleEdit(id)}>
            <EditIcon sx={{ fontSize: "25px" }} />
          </Button>
        </Box>
     

        <Divider sx={{ height: "80%" }} orientation="vertical" flexItem />

        <Box sx={{ display: "flex", padding: "10px" }}>
          <Button onClick={handleDeleteClick}>
            <DeleteIcon sx={{ fontSize: "25px" }} />
          </Button>
        </Box>
      </Card>
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
    </PressReleaseDraft>
  );
}
