"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DropSong from "@/app/components/DropSong";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

const AddSong = () => {
  const Router = useRouter();
  const [songFile, setSongFile] = useState("");

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ minWidth: 275  }}>
    <Card variant="outlined">
    <React.Fragment>
  <CardContent>
    <>
      <div
        
      >
        <div
          style={{
            
          }}
        >
          <h1 style={{ margin: 0 }}>Add New Song</h1>
        </div>
        {/* <div {...getRootProps()} style={{ display: 'flex', width: '100%', maxWidth: '600px', border: '2px dashed #cccccc', borderRadius: '15px', alignItems: 'center', justifyContent: 'center', flexGrow: 2, marginBottom: '20px' }}>
        <input {...getInputProps()} />
        {isDragActive ? (
            <p>Drop the files here...</p>
        ) : (
            <p>Drag and drop your track here</p>
        )}
    </div> */}
    <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        <div
          style={{
            width: "90%",
            maxWidth: "800px",
            marginTop: "20px",
            marginLeft: "50px",
          }}
        >
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
      </div>
       
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => {
              Router.replace("add");
            }}
          >
            Cansel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              Router.push("add2");
            }}
          >
            Add
          </Button>
        </Stack>
      </div>
    </>
    </CardContent>
    
    </React.Fragment>
          
          </Card>
      </Box>
      
  );
};

export default AddSong;
