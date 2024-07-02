"use client";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import DropFile from "@/app/components/DropFile";



const ArtistSignUp = () => {
  const [profilePicture, setProfilePicture] = useState<any>(null);

 
  return (
    <Box>
      
        
          
        
          <Box>
            <DropFile
              fileTypes="Profile Picture"
              fileExtensions="PNG,JPEG,WEBP"
              isCircular={true}
              width="200px"
              height="200px"
              file={profilePicture}
              setFile={setProfilePicture}
              aspectX={1}
              aspectY={1}
              shape="round"
            />
          </Box>
        
     
     
    </Box>
  );
};
export default ArtistSignUp;
