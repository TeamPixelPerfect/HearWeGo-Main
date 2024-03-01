"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DropSong from "@/app/components/DropSong";
import { useRouter } from "next/navigation";
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { Box } from "@mui/material";

const AddSong = () => {
  const Router = useRouter();

  const [songFile, setSongFile] = useState("");
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
      <React.Fragment>
    <CardContent>
    <div
      style={{
       
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          
          height: "Auto",
        }}
      >
        <div
          style={{
           
          }}
        >
          <h1 style={{  }}>Add New Album</h1>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack spacing={2} direction="row">
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            onClick={() => {
              Router.push("add2");
            }}
          >
            Create Album
          </Button>
        </Stack>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <DropSong
            fileTypes="Music Track"
            fileExtensions="MP3,AAC,M4A"
            isCircular={false}
            width="800px"
          height="300px"
            file={songFile}
            setFile={setSongFile}
            aspectX={1}
            aspectY={1}
            shape="rect"
          />
        </div>
        <div style={{ width: "90%", maxWidth: "800px" }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Privacy:
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Public"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <p style={{ width: "90%", maxWidth: "800px", textAlign: "center" }}>
          Supported file types and sizes - Upload troubleshooting tips -
          Copyright FAQs By uploading, you confirm that your sounds comply with
          our Terms of Use and you don't infringe anyone else's rights. Legal -
          Privacy - Cookies - Imprint - Creator Resources - Blog - Charts -
          Popular searches
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button  variant="outlined"  onClick={() => {
              Router.push("add");
            }} >Cansel</Button>
          <Button variant="contained"  onClick={() => {
              Router.push("add5");
            }}>Add</Button>
        </Stack>
      </div>
    </div>
     
    </CardContent>
    
  </React.Fragment>
        
        </Card>
    </Box>
    
  
  );
};

export default AddSong;
