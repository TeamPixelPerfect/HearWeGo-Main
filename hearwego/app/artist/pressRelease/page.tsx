"use client";
import React, { useState, useEffect, use } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TabPanel from "@mui/lab/TabPanel";
import { Dayjs } from "dayjs";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
import DropFile from "../../components/DropFile";
import { set } from "date-fns";
import { addPressRelease } from "../../services/PressReleaseServices";
import { PressReleaseData } from "../../constants/models";
import { useAppSelector } from "@/lib/hooks";



export default function PressRelease() {
  const artist = useAppSelector((state) => state.artist.user);

  const [value, setValue] = useState<string>("1");
 

const[pressReleaseData, setPressReleaseData] = useState<PressReleaseData>({
  ArtistLogo_URL: "",	
  Headline: "",
  SubHeadline: "",
  EventDate: null,
  Venue: "",
  Description: "",
  Siganature: "",
  ReleaseDate: null,
  ArtistID: "ar4",
});


const [logoImg, setLogoImg] = useState<File | null>(null);

useEffect(() => {
  if(logoImg){
    setPressReleaseData({...pressReleaseData, ArtistLogo_URL: logoImg});
  }
}, [logoImg]);

const[signatureImg, setSignatureImg] = useState<File | null>(null);

useEffect(() => {
  if(signatureImg){
    setPressReleaseData({...pressReleaseData, Siganature: signatureImg});
  }
}, [signatureImg]);
const submitData = async () => {
  try{
    await addPressRelease(artist.token, pressReleaseData);
  }catch(error){
    console.log(error);
  }
};

  const validationSchema = Yup.object({
    Headline: Yup.string().required("Headline is required"),
    SubHeadline: Yup.string().required("Sub Headline is required"),
    date: Yup.date().nullable().required("Event Date is required"),
    Venue: Yup.string().required("Venue is required"),
    Description: Yup.string().required("Description is required"),
    releaseDate: Yup.date().nullable().required("Release Date is required"),
    ArtistLogo_URL: Yup.string().required("Logo is required"),
    Siganature: Yup.string().required("Signature is required"),
  });

  const formik = useFormik({
    initialValues: {
      Headline: "",
      SubHeadline: "",
      EventDate: null,
      Venue: "",
      Description: "",
      ReleaseDate: null,
      ArtistLogo_URL: "",
      Siganature: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

  };

//   const handleCancel = () => {
//     formik.resetForm();
//   };

  return (
    <Box sx={{ minWidth: 375, py: 3 }}>
      <Card
        variant="outlined"
        sx={{ maxWidth: 1200, mx: "auto", p: 3, boxShadow: 3 }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            Press Release
          </Typography>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TabList
                  onChange={handleTabChange}
                  aria-label="Press Release Tabs"
                >
                  <Tab label="Scheduling" value="1" />
                  <Tab label="Saved Ones" value="2" />
                  <Tab label="Drafts" value="3" />
                  <Tab label="Already Shared" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Paper elevation={3} sx={{ p: 3 }}>
                  <form onSubmit={submitData}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Box>
                          <DropFile
                            fileTypes="Logo"
                            fileExtensions=".jpg, .jpeg, .png"
                            isCircular={false}
                            width="100%"
                            height="250px"
                            file={logoImg}
                            setFile={setLogoImg}
                            aspectX={1}
                            aspectY={1}
                            shape="rect"
                            sx={{ margin: "30px" }}
                          />
                          {formik.touched.ArtistLogo_URL && formik.errors.ArtistLogo_URL ? (
                            <Typography color="error">
                              {formik.errors.ArtistLogo_URL}
                            </Typography>
                          ) : null}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              value = {pressReleaseData.Headline}
                              onChange = {(e) => setPressReleaseData({...pressReleaseData, Headline: e.target.value})}
                              label="Headline"
                              name="headline"
                              onBlur={formik.handleBlur}
                              sx={{ marginTop: "20px" }}
                            />
                            {formik.touched.Headline &&
                            formik.errors.Headline ? (
                              <Typography color="error">
                                {formik.errors.Headline}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              value = {pressReleaseData.SubHeadline}
                              onChange={(e) => setPressReleaseData({...pressReleaseData, SubHeadline: e.target.value})}
                              label="Sub Headline"
                              name="subHeadline"
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.SubHeadline &&
                            formik.errors.SubHeadline ? (
                              <Typography color="error">
                                {formik.errors.SubHeadline}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Event Date"
                                value = {pressReleaseData.EventDate}
                                onChange={(e) => setPressReleaseData({...pressReleaseData, EventDate: e.target.value})}
                                renderInput={(params) => (
                                  <TextField fullWidth {...params} required />
                                )}
                              />
                            </LocalizationProvider>
                            {formik.touched.date && formik.errors.date ? (
                              <Typography color="error">
                                {formik.errors.date}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              value = {pressReleaseData.Venue}
                              onChange = {(e) => setPressReleaseData({...pressReleaseData, Venue: e.target.value})}
                              label="Venue"
                              name="venue"
                            
                              sx={{ width: "100%" }}
                            />
                            {formik.touched.Venue && formik.errors.Venue ? (
                              <Typography color="error">
                                {formik.errors.Venue}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                             value = {pressReleaseData.Description}
                             onChange={(e) => setPressReleaseData({...pressReleaseData, Description: e.target.value})}
                              label="Description"
                              name="description"
                             
                              onBlur={formik.handleBlur}
                              multiline
                              rows={4}
                              sx={{ width: "100%" }}
                            />
                            {formik.touched.Description &&
                            formik.errors.Description ? (
                              <Typography color="error">
                                {formik.errors.Description}
                              </Typography>
                            ) : null}
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box>
                              <DropFile
                                fileTypes="Signature"
                                fileExtensions=".jpg, .jpeg, .png"
                                isCircular={false}
                                width="100%"
                                height="160px"
                                file ={signatureImg}
                                setFile={setSignatureImg}
                                aspectX={1}
                                aspectY={1}
                                shape="rect"
                              />
                              {formik.touched.Siganature &&
                              formik.errors.Siganature ? (
                                <Typography color="error">
                                  {formik.errors.Siganature}
                                </Typography>
                              ) : null}
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ width: "100%" }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Release Date"
                                  value = {pressReleaseData.ReleaseDate}
                                  onChange={(e) => setPressReleaseData({...pressReleaseData, ReleaseDate: e.target.value})}
                                
                                />
                              </LocalizationProvider>
                              {formik.touched.releaseDate &&
                              formik.errors.releaseDate ? (
                                <Typography color="error">
                                  {formik.errors.releaseDate}
                                </Typography>
                              ) : null}
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        // type="submit"
                        onClick={submitData}  
                        sx={{ mr: 2 }}
                      >
                        Save
                      </Button>
                      <Button variant="outlined">
                        Cancel
                      </Button>
                    </Box>
                  </form>
                </Paper>
              </TabPanel>
              <TabPanel value="2">
                <Typography variant="h6" sx={{ margin: "10px" }}>
                  Saved Ones{" "}
                </Typography>
              </TabPanel>

              <TabPanel value="3">
                <Typography variant="h6" sx={{ margin: "10px" }}>
                  Drafts
                </Typography>
              </TabPanel>

              <TabPanel value="4">
                <Typography> Shared </Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
