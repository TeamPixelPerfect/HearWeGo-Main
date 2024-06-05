import { Box, Modal } from "@mui/material";
import React from "react";

const AddCategory = () => {
  return (
    <Modal open={true}>
      <Box
        sx={{
          width: "50%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
      >
        Add Category
      </Box>
    </Modal>
  );
};

export default AddCategory;
