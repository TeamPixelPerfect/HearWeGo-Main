"use client";
import React from "react";
import { Divider, Stack, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SingleFan from "@/app/components/Single Fan";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SinglePost from "@/app/components/SinglePost";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import DropFile from "../../components/DropFile";
import ImageCropper from "@/app/components/ImageCropper";

// Stack from "@mui/material";

// import { BorderBox } from "../../styles/fanclub.styles";
import {
  BorderBox,
  CoverBackgroundCard,
  CoverCardMedia,
  ProfilePicDiv,
  ProfilePicAvatar,
  ArtistNameBox,
  NoOfFollowersBox,
  ArtistDetailBox,
  ChatButton,
  FindMorebutton,
  CreatePostPopup,
  CreateContestPopup,
  ArtistDetail,
  PostTextField,
  SubmitButton,
  CancleButton,
} from "../../styles/fanclub.styles";



const userNames = [
  {
    name: "Chandler Bing",
    img: "https://pyxis.nymag.com/v1/imgs/079/792/3ed0d94be0a9bd3d023f00532889bab152-30-chandler-bing.rsquare.w330.jpg",
  },
  {
    name: "Ross Geller",
    img: "https://upload.wikimedia.org/wikipedia/en/6/6f/David_Schwimmer_as_Ross_Geller.jpg",
  },
  {
    name: "Joey Tribbiani",
    img: "https://upload.wikimedia.org/wikipedia/en/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg",
  },
  {
    name: "Monica Geller",
    img: "https://home.adelphi.edu/~ni21572/Monica.jpg",
  },
  {
    name: "Rachel Green",
    img: "https://pyxis.nymag.com/v1/imgs/47c/71a/130bf1e557e534b3f2be3351afc2ecf952-17-rachel-green-jewish.rsquare.w400.jpg",
  },
  {
    name: "Phoebe Buffay",
    img: "https://upload.wikimedia.org/wikipedia/en/f/f6/Friendsphoebe.jpg",
  },
];

const options = ["Edit Profile", "Manage Posts"];
const ITEM_HEIGHT = 24;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ArtistFanClub() {
  const theme = useTheme();

  const [openCreatePost, setOpenCreatePost] = React.useState(false);
  const handleCreatePostOpen = () => setOpenCreatePost(true);
  const handleCreatePostClose = () => setOpenCreatePost(false);

  const [openCreateContest, setOpenCreateContest] = React.useState(false);
  const handleCreateContestOpen = () => setOpenCreateContest(true);
  const handleCreateContestClose = () => setOpenCreateContest(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [songFile, setSongFile] = React.useState("");

  return (
    <>
      <CoverBackgroundCard>
        <CoverCardMedia
          image={
            "https://londonmumsmagazine.com/wp-content/uploads/2019/07/The-Rembrandts-Via-Satellite-2.jpg"
          }
        ></CoverCardMedia>

        <ProfilePicDiv>
          <ProfilePicAvatar
            src={
              "https://www.rollingstone.com/wp-content/uploads/2021/05/rembrandts-flashback.jpg"
            }
          ></ProfilePicAvatar>
        </ProfilePicDiv>

        <ArtistDetailBox>
          <Stack width="60%">
            <ArtistNameBox>The Rembrandts</ArtistNameBox>
            <NoOfFollowersBox>
              <i>2.5K Followers</i>
            </NoOfFollowersBox>
          </Stack>

          <Stack direction="row" spacing={1}>
            <ChatButton variant="contained" disableElevation>
              Chat
            </ChatButton>
          </Stack>
        </ArtistDetailBox>
      </CoverBackgroundCard>

      <Divider
        sx={{
          backgroundColor: "#9A9A9A",
          height: "2px",
          width: "100%",
          margin: "15px 0",
        }}
      />

      <Box
        sx={{
          fontSize: 16,
          fontWeight: "bold",
          marginLeft: 3,
          color: "#464141",
        }}
      >
        Fans<br></br>
        1,900 Fans
      </Box>

      <Grid container spacing={1} sx={{ margin: "1em auto", width: "95%" }}>
        {userNames.map(({ name, img }) => (
          <Grid item xs={4} md={3} style={{ paddingLeft: 0 }}>
            <SingleFan userName={name} userImg={img}></SingleFan>
          </Grid>
        ))}
      </Grid>

      <FindMorebutton color={"secondary"} fullWidth>
        See all Fans <ChevronRightRounded />
      </FindMorebutton>

      <Divider
        sx={{
          backgroundColor: "#9A9A9A",
          height: "2px",
          width: "100%",
          margin: "15px 0",
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          width: "100%",
       
        }}
      >
        <Stack direction="row" spacing={1}>
          <Button
            onClick={handleCreatePostOpen}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              fontSize: 14,
              textTransform: "capitalize",
            }}
          >
            Add Post
          </Button>

          <Modal open={openCreatePost} onClose={handleCreatePostClose}>
            <CreatePostPopup style={{width:"40%"}}>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  textAlign: "center",
                  padding: "8px",
                  borderColor: "divider",
                  borderBottom: "1px solid",
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  textTransform: "uppercase"
                }}
              >
                Create Post
              </Typography>
              <ArtistDetail sx={{  marginLeft: "30px" }}>
                <Avatar
                  sx={{
                    width: "60px",
                    height: "60px",
                    position: "relative",
                    margin: "10px",
                    //marginTop: "10px",
                  }}
                  alt="Remy Sharp"
                  src="https://www.rollingstone.com/wp-content/uploads/2021/05/rembrandts-flashback.jpg"
                />
                <Typography
                  sx={{
                    //paddingLeft: "5px",
                    color: theme.palette.text.primary,
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  The Rembrandts<br></br>
                 <Box sx={{fontSize: "14px", fontWeight: "400"}}>Musician</Box>
                </Typography>
              </ArtistDetail>

              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "5ch" },
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                 
                }}
                noValidate
                autoComplete="off"
              >
                <PostTextField
                  multiline
                  minRows={4}
                  placeholder="What's On Your Mind?"
                  variant="filled"
                  inputProps={{
                    style: {
                      color: theme.palette.text.primary,
                      width: "80%",
                      height:'50px',
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "center",
                    },
                  }}
                />
              </Box>
  
            <Box sx={{padding:'10px', width: "100%", display:"flex", justifyContent:"center"}}>
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                 backgroundColor:theme.palette.background.default ,
                 borderRadius:'10px'
                 
                }}
              >
                <DropFile
                  fileTypes="Music Track"
                  fileExtensions="MP3,AAC,M4A"
                  isCircular={false}
                  width="100%"
                  height="100%"
                  file={songFile}
                  setFile={setSongFile}
                  aspectX={1}
                  aspectY={1}
                  shape="rect"
                />
              </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  padding: "10px",
                  marginTop: "25px",
                }}
              >
                <Stack direction="row" spacing={1}>
                  <CancleButton variant="contained" disableElevation onClick={handleCreatePostClose}>
                    Cancle
                  </CancleButton>
                  <SubmitButton variant="contained" disableElevation>
                    Post
                  </SubmitButton>
                </Stack>
              </Box>
            </CreatePostPopup>
          </Modal>

          <Button
            onClick={handleCreateContestOpen}
            variant="contained"
            startIcon={<EditNoteIcon />}
            sx={{
              fontSize: 14,
              textTransform: "capitalize",
            }}
          >
            Create Contest
          </Button>
          
        </Stack>

        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
                color: "black",
                backgroundColor: "primary",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Box>

      <Box
        sx={{
          width: "100%",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <SinglePost></SinglePost>
        <SinglePost></SinglePost>
      </Box>

      <FindMorebutton color={"primary"} fullWidth>
        Find Out More <ChevronRightRounded />
      </FindMorebutton>
    </>
  );
}
