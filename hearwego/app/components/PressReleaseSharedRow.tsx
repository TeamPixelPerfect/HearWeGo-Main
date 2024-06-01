"use client";

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
import { PressReleaseShared } from "../styles/PressReleaseOriginal.styles";

interface Props {
  id: string;
  title: string;
  releaseDate: string;
  handleDelete: (id: string) => void;
}

export default function PressReleaseSharedRow({
  id,
  title,
  releaseDate,
  handleDelete,
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
    <PressReleaseShared>
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
          <Button onClick={() => console.log(id)}>
            <PictureAsPdfIcon
              sx={{
                color: "red",
                fontSize: "140px",
              }}
            />
          </Button>
        </Box>
        <Divider />
        <Box sx={{
          //backgroundColor: "yellow",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          
        }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              //backgroundColor: "red",
              width: "70%",
            }}
          >
            <Typography variant="body1">{title}</Typography>
            <Typography variant="body1">{releaseDate}</Typography>
          </Box>
          <Box
            sx={{
              // display: "flex",
              // flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              //backgroundColor: "blue",
              width: "30%",	
             
            }}
          >
            <Button onClick={handleDeleteClick}>
              <DeleteIcon
                sx={{
                  fontSize: "25px",
                }}
              />
            </Button>
            
          </Box>
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
    </PressReleaseShared>
  );
}
