"use client";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import Grid from "@mui/material/Unstable_Grid2";
import { MdHeadset } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { FaSpotify } from "react-icons/fa";
import React, { useEffect, useState } from "react";

import {
  SongPreviewSong,
  SongPreviewDetails,
  SongPreviewShare,
} from "../../../../styles/artistAddSongs.styles";
import { Song } from "@/app/constants/models";
import { getSong, updateSong } from "@/app/services/SongServices";
import { useAppSelector } from "@/lib/hooks";
import useAudio from "@/app/Hooks/useAudio";
import { SiApplemusic, SiYoutube, SiYoutubemusic } from "react-icons/si";

interface Props {
  params: { id: string };
}

export default function AddSongPreview({ params: { id } }: Props) {
  const artist = useAppSelector((state) => state.artist.user);
  const [songData, setSongData] = useState<Song | null>(null);
  const [songId, setSongId] = useState("");
  const [platform, setPlatform] = React.useState("");
  const [platformLink, setPlatformLink] = React.useState("");

  const handleAddNewPlatform = () => {
    if (platform === "" || platformLink === "") {
      return;
    }
    setSongData((prev) => {
      if (prev) {
        if (prev.platform_links && prev.platform_links?.length > 0) {
          return {
            ...prev,
            platform_links: [
              ...prev?.platform_links,
              {
                platform_name: platform,
                link: platformLink,
              },
            ],
          };
        }
        return {
          ...prev,
          platform_links: [
            {
              platform_name: platform,
              link: platformLink,
            },
          ],
        };
      }
      return prev;
    });
    const data = {
      platform_links: songData?.platform_links
        ? [
            ...songData.platform_links,
            { platform_name: platform, link: platformLink },
          ]
        : [{ platform_name: platform, link: platformLink }],
    };
    updateSong(artist ? artist.token : "", songId, data).then((res) => {
    //   console.log(res);
      setSongData(res);
    });
  };

  const handlePlatformLinkDelete = (platform: string) => {
    if (songData?.platform_links) {
      const data = songData?.platform_links.filter(
        (link) => link.platform_name !== platform
      );
      setSongData((prev) => {
        if (prev) {
          return {
            ...prev,
            platform_links: data,
          };
        }
        return prev;
      });
      updateSong(artist ? artist.token : "", songId, {
        platform_links: data,
      }).then((res) => {
        // console.log(res);
        setSongData(res);
      });
    }
  };

  useEffect(() => {
    getSong(artist ? artist.token : "", id).then((res) => {
      setSongData(res);
      setSongId(res._id);
    });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {songData ? (
        <>
          <Box sx={{ width: "100%", marginBottom: "1em" }}>
            <Card variant="outlined">{NewSongPreviewCard(songData)}</Card>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Card variant="outlined">
              {NewSongPlatformLinkCard(
                songData,
                setSongData,
                platform,
                setPlatform,
                platformLink,
                setPlatformLink,
                handleAddNewPlatform,
                handlePlatformLinkDelete
              )}
            </Card>
          </Box>
        </>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
}

interface PlatformLinkClipsProps {
  songData: Song;
  handlePlatformLinkDelete: (platform: string) => void;
}

function PlatformLinkClips({
  songData,
  handlePlatformLinkDelete,
}: PlatformLinkClipsProps) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = (platform: string) => {
    handlePlatformLinkDelete(platform);
  };

  const [platformIcons, setPlatformIcons] = useState([
    {
      platform_name: "spotify",
      icon: <FaSpotify />,
    },
    {
      platform_name: "apple music",
      icon: <SiApplemusic />,
    },
    {
      platform_name: "youtube music",
      icon: <SiYoutubemusic />,
    },
    {
      platform_name: "youtube",
      icon: <SiYoutube />,
    },
  ]);
  return (
    <>
      {songData.platform_links?.map((link) => (
        <Stack
          sx={{ display: "flex", alignItems: "center", marginTop: "1em" }}
          direction="row"
          spacing={1}
        >
          <Box
            sx={{
              width: 32,
              fontSize: 32,
              display: "flex",
              alignItems: "center",
            }}
          >
            {platformIcons
              .filter(
                (platform) => platform.platform_name === link.platform_name
              )
              .map((icon) => icon.icon)}
          </Box>

          <Chip
            label={link.link}
            variant="outlined"
            onClick={handleClick}
            onDelete={() => {
              handleDelete(link.platform_name);
            }}
          />
        </Stack>
      ))}
    </>
  );
}

const NewSongPreviewCard = (songData: Song) => (
  <React.Fragment>
    <CardContent>
      <Typography
        variant="h4"
        sx={{
          fontSize: "20px",
          fontWeight: "500",
          padding: "1em",
        }}
        color="secondary"
      >
        Add New Song
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Preview
      </Typography>

      <SongPreview songData={songData} />

      <Typography
        sx={{ fontSize: 14, marginTop: "1em" }}
        color="text.secondary"
        gutterBottom
      >
        By uploading, you confirm that your sounds comply with our Terms of Use
        and you don't infringe anyone else's rights.
      </Typography>
    </CardContent>
  </React.Fragment>
);

const NewSongPlatformLinkCard = (
  songData: Song,
  setSongData: React.Dispatch<React.SetStateAction<Song | null>>,
  platform: string,
  setPlatform: React.Dispatch<React.SetStateAction<string>>,
  platformLink: string,
  setPlatformLink: React.Dispatch<React.SetStateAction<string>>,
  handleAddNewPlatform: () => void,
  handlePlatformLinkDelete: (platform: string) => void
) => (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div" sx={{ marginBottom: "1em" }}>
        Streaming Platform Links
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={3} sx={{}}>
            <SelectPlatform
              setSongData={setSongData}
              platform={platform}
              setPlatform={setPlatform}
            />
          </Grid>
          <Grid xs={7}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
              style={{ boxSizing: "initial" }}
            >
              <TextField
                id="filled-basic"
                label="Platform Link"
                variant="filled"
                onChange={(e) => {
                  setPlatformLink(e.target.value);
                }}
              />
            </Box>
          </Grid>

          <Grid xs={2}>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleAddNewPlatform}
            >
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <PlatformLinkClips
        songData={songData}
        handlePlatformLinkDelete={handlePlatformLinkDelete}
      />
    </CardContent>
  </React.Fragment>
);

function SelectPlatform({
  setSongData,
  platform,
  setPlatform,
}: {
  setSongData: React.Dispatch<Song>;
  platform: string;
  setPlatform: React.Dispatch<string>;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ minWidth: "100%" }}>
        <InputLabel id="demo-simple-select-filled-label">Platform</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={platform}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="spotify">
            <FaSpotify style={{ marginRight: "8px" }} /> Spotify
          </MenuItem>
          <MenuItem value="apple music">
            {" "}
            <SiApplemusic style={{ marginRight: "8px" }} /> Apple Music
          </MenuItem>
          <MenuItem value="youtube music">
            {" "}
            <SiYoutubemusic style={{ marginRight: "8px" }} /> Youtube Music
          </MenuItem>
          <MenuItem value="youtube">
            {" "}
            <SiYoutube style={{ marginRight: "8px" }} /> Youtube
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

interface ClickPlayProps {
  song_track: string;
}

function ClickPlay({ song_track }: ClickPlayProps) {
  const { playing, toggle } = useAudio({
    url: song_track,
  });

  return (
    <>
      {!playing ? (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PlayCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={toggle}
          />
        </IconButton>
      ) : (
        <IconButton sx={{ color: "text.primary", fontSize: 36 }}>
          <PauseCircleIcon
            sx={{ color: "text.secondary", fontSize: 54 }}
            //   sx={{ width: "30%", height: "auto" }}
            onClick={toggle}
          />
        </IconButton>
        // <PauseCircleIcon
        //   sx={{ width: "30%", height: "auto" }}
        //   onClick={togglePlay}
        // />
      )}
    </>
  );
}

interface SongPreviewProps {
  songData: Song;
}

function SongPreview({ songData }: SongPreviewProps) {
  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
    >
      <SongPreviewSong>
        <CardMedia
          component="img"
          sx={{ width: "100%", borderRadius: 1 }}
          image={songData.song_img ? songData.song_img : ""}
          alt="Song Cover Art"
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 1,
          }}
        >
          <ClickPlay
            song_track={songData.song_track ? songData.song_track : ""}
          />

          {/* <PlayCircleIcon sx={{ width: "30%", height: "auto" }} /> */}
        </Box>
      </SongPreviewSong>

      <SongPreviewDetails>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          ISRC: {songData.isrc}
        </Typography>
        <Typography component="div" sx={{ fontSize: 28, fontWeight: 600 }}>
          {songData.song_title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
          {songData.artist?.map((artist) => artist.artist_name).join(",")} -{" "}
          {songData.album_title ? songData.album_title : "Single"}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          {songData.primary_genre?.map((genre) => (
            <Chip label={genre} color="primary" sx={{ fontSize: 12 }} />
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "1em", fontSize: 12 }}
        >
          {songData.electronic_sub_genre?.map((genre) => (
            <Chip label={genre} color="secondary" sx={{ fontSize: 12 }} />
          ))}
        </Stack>

        {songData.privacy_status === "Private" && (
          <Chip
            icon={<LockIcon />}
            sx={{ marginBottom: "1em" }}
            label="Private"
          />
        )}

        <Alert variant="filled" severity="success" sx={{ width: "200px" }}>
          Upload Complete !
        </Alert>
      </SongPreviewDetails>

      <SongPreviewShare>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "1em",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: 18, marginBottom: "1em" }}
          >
            Share your new Track
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ marginBottom: "1em", fontSize: 32 }}
          >
            <IconButton>
              <FaFacebook />
            </IconButton>

            <IconButton>
              <AiFillInstagram />
            </IconButton>

            <IconButton>
              <FaXTwitter />
            </IconButton>

            <IconButton>
              <MdHeadset />
            </IconButton>
          </Stack>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "primary.main",
            padding: "5px",
            borderTopLeftRadius: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: "100%",
              color: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", fontSize: "14px" }}>
              https://www.hearwego.com/wq23s
            </Box>
            <IconButton>
              <ContentCopyIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
        </Box>
      </SongPreviewShare>
    </Paper>
  );
}
