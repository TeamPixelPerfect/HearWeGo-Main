// BannerEditForm.tsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Modal, Paper, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import DropFile from "./DropFile";

interface StoreImg {
  id: number;
  image: string | File;
  title: string;
}

interface StoreImgEditFormProps {
  open: boolean;
  StoreImg: StoreImg;
  onSave: (updatedStoreImg: StoreImg) => void;
  onClose: () => void;
}

const StoreImgEditForm: React.FC<StoreImgEditFormProps> = ({ open, StoreImg, onSave, onClose }) => {
  const [title, setTitle] = useState(StoreImg.title);
  const [image, setImage] = useState<string | File>(StoreImg.image);

  useEffect(() => {
    setTitle(StoreImg.title);
    setImage(StoreImg.image);
  }, [StoreImg]);

  const handleSave = () => {
    onSave({ ...StoreImg, title, image });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="rgba(0, 0, 0, 0.5)"
      >
        <Paper
          style={{
            width: "400px",
            borderRadius: "20px",
            // backgroundColor: "#ffffff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box padding="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
              <Typography variant="h6" component="h2">
                Edit StoreImg
              </Typography>
              <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <DropFile
              fileTypes="image"
              fileExtensions="jpg, png, jpeg"
              isCircular={false}
              width="100%"
              height="200px"
              file={image}
              setFile={setImage}
              aspectX={16}
              aspectY={9}
              shape="rect"
            />
            <Box display="flex" justifyContent="flex-end" marginTop="20px">
              <Button
                onClick={handleSave}
                variant="contained"
                // color="primary"
                style={{
                  borderRadius: "25px",
                  textTransform: "none",
                  boxShadow: "none",
                  marginRight: "10px",
                  padding: "10px 30px",
                }}
              >
                Save
              </Button>
              <Button
                onClick={onClose}
                variant="outlined"
                // color="primary"
                style={{
                  borderRadius: "25px",
                  textTransform: "none",
                  padding: "10px 30px",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default StoreImgEditForm;
