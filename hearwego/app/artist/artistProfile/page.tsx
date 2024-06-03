"use client";
import {
  Autocomplete,
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCopy, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useAppSelector } from "@/lib/hooks";
import {
  ADArtistInfo,
  ADArtistPageUrl,
  ADHomeCoverBox,
  ADHomeName,
  ADHomeNameArea,
  ADHomeProfilePicture,
  ADHomeSocialIcons,
} from "@/app/styles/artistDashboard.styles";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { logInUser } from "@/lib/features/user.slice";
import { handleRegister } from "@/app/services/AuthServices";
import router from "next/router";
import { AuthTextField } from "@/app/styles/auth.styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface SocialMediaType {
  label: string;
  logo: string;
}

const socialMedias: readonly SocialMediaType[] = [
  {
    label: "Facebook",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    label: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
  },
  {
    label: "Instagram",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  },
  {
    label: "LinkedIn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
  },
  {
    label: "Snapchat",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/ad/Snapchat_logo.svg",
  },
  {
    label: "TikTok",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
  },
  {
    label: "YouTube",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/YouTube_icon_%282013-2017%29.png",
  },
  {
    label: "Pinterest",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
  },
  {
    label: "Reddit",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/82/Reddit_logo_and_wordmark.svg",
  },
  {
    label: "WhatsApp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  },
];
const genres = [
  {
    value: "Hip Pop",
    label: "Hip Pop",
  },
  {
    value: "Pop",
    label: "Pop",
  },
  {
    value: "Rock",
    label: "Rock",
  },
  {
    value: "Classical",
    label: "Classical",
  },
  {
    value: "Reggae",
    label: "Reggae",
  },
  {
    value: "Country",
    label: "Country",
  },
  {
    value: "Electronic",
    label: "Electronic",
  },
  {
    value: "Hip Hop",
    label: "Hip Hop",
  },
  {
    value: "Jazz",
    label: "Jazz",
  },
  {
    value: "R&B (Rhythm and Blues)",
    label: "R&B (Rhythm and Blues)",
  },
  {
    value: "Metal",
    label: "Metal",
  },
];

const ADHomePage = () => {
  const matches = useMediaQuery("(max-width:960px)");

  const [profilePic, setProfilePic] = useState<string>(
    // "https://placehold.co/600x600/png"
    "https://www.rollingstone.com/wp-content/uploads/2021/05/rembrandts-flashback.jpg"
  );
  const [coverPic, setCoverPic] = useState<string>(
    // "https://placehold.co/1280x720/png"
    "https://.com/wp-content/uploads/2019/07/The-Rembrandts-Via-Satellite-2.jpg"
  );

  const [tabValue, setTabValue] = React.useState(0);
  const artist = useAppSelector((state) => state.artist.user);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Grid container sx={{ width: "100%", margin: 0 }}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{ height: matches ? "600px" : "400px", margin: "0" }}
        >
          {/*  ADHomeCoverBox imgUrl={artist?.user.artistCovers[0]}*/}
          <ADHomeCoverBox
            imgUrl={
              "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/278804074/original/39f1798f84c97ce31effe60bffd192bec8b10306/design-a-single-cover-or-an-album-cover-art.jpeg"
            }
          >
            <ADHomeNameArea>
              <Box
                sx={{
                  display: "flex",
                  alignItems: matches ? "center" : "flex-end",
                  flexDirection: matches ? "column" : "row",
                  justifyContent: matches ? "flex-end" : "center",
                  mb: matches ? "2em" : 0,
                }}
              >
                <ADHomeProfilePicture imgUrl={artist?.user.profilePicture} />
                <Box
                  sx={
                    !matches
                      ? { ml: 3 }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }
                  }
                >
                  <ADHomeName>{artist?.user.artistName}</ADHomeName>
                  {artist.user.artistBio && (
                    <ADArtistInfo>
                      {artist?.user.artistBio.split(".")[0]}
                    </ADArtistInfo>
                  )}

                  <ADArtistPageUrl>
                    <Link href="">http://www.hearwego.com/wq23s</Link>
                    <FaCopy />
                  </ADArtistPageUrl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: matches ? "center" : "flex-end",
                  mr: matches ? 0 : 2,
                }}
              >
                <ADHomeSocialIcons>
                  <FaFacebook />
                  <AiFillInstagram />
                  <FaSquareXTwitter />
                </ADHomeSocialIcons>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: matches ? "center" : "flex-start",
                    justifyContent: matches ? "center" : "flex-start",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: "600", mb: 0 }}
                  >
                    22,522,155
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    Followers
                  </Typography>
                </Box>
              </Box>
            </ADHomeNameArea>
          </ADHomeCoverBox>
        </Grid>
      </Grid>
      <Card sx={{ border: "black", borderRadius: "5px", marginTop: "10px" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "60ch" },
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-evenly",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TextField id="alias" label="Alias (Optional)" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              id="birthDay"
              label="Birth Day"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="genre"
              select
              label="Genre"
              defaultValue="Hip Pop"
              variant="outlined"
            >
              {genres.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Card>
      <Card sx={{ border: "black", borderRadius: "5px", marginTop: "10px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "20px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <img
              src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/278804074/original/39f1798f84c97ce31effe60bffd192bec8b10306/design-a-single-cover-or-an-album-cover-art.jpeg"
              alt="Example"
              style={{ width: "300px" }}
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
          <Box sx={{ display: "flex" }}>
            <img
              src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2022/08/making_album_create_cover.jpg"
              alt="Example"
              style={{ width: "300px" }}
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
            </Box>
            <Box sx={{ display: "flex" }}>
            <img
              src="https://fiverr-res.cloudinary.com/videos/so_0.116681,t_main1,q_auto,f_auto/y5hg5qbfdyd8oquq7nom/create-unique-cover-art-for-your-music-album-ep-or-single.png"
              alt="Example"
              style={{ width: "300px" }}
            />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <IconButton>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Card>
      <Card sx={{ border: "black", borderRadius: "5px", marginTop: "10px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton sx={{ marginTop: "0px" }}>
            <MoreVertIcon />
          </IconButton>
        </Box>{" "}
        <pre style={{ display: "flex", marginTop: "0px" }}> CURRENT</pre>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: matches ? "flex-start" : "flex-start",
          }}
        >
          <ADHomeSocialIcons
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              marginLeft: "10px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <FaFacebook />
              <Link style={{ fontSize: "15px" }} href="">
                http://www.hearwego.com/wq23s
              </Link>
            </Box>
            <Box sx={{ display: "flex" }}>
              <AiFillInstagram />
              <Link style={{ fontSize: "15px" }} href="">
                http://www.hearwego.com/wq23s
              </Link>
            </Box>
            <Box sx={{ display: "flex" }}>
              <FaSquareXTwitter />
              <Link style={{ fontSize: "15px" }} href="">
                http://www.hearwego.com/wq23s
              </Link>
            </Box>
          </ADHomeSocialIcons>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <h4 style={{ marginLeft: "10px" }}> SocialProfile</h4>

          <Autocomplete
            id="social-media-select-demo"
            sx={{ width: 118, marginLeft: "20px", marginBottom: "20px" }}
            options={socialMedias}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img loading="lazy" width="10" src={option.logo} alt="" />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="social media"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <h4 style={{ marginInlineStart: "80px" }}>Web Address</h4>
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "60ch",

                marginTop: "2px",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Web Address"
              variant="outlined"
            />
          </Box>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row">
          <Button variant="text">Add Social Profile +</Button>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginLeft: "10px", marginBottom: "20px", marginTop: "20px" }}
        >
          <Button variant="outlined">Close</Button>
          <Button variant="contained">Save</Button>
        </Stack>
      </Card>
    </>
  );
};

export default ADHomePage;
function setSelectedDay(date: any) {
  throw new Error("Function not implemented.");
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
