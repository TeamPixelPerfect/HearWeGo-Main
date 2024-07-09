//Single Song page

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Stack, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import { BsSpotify } from "react-icons/bs";
import { SiApplemusic } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";

import {
  Maindiv,
  CoverCardMedia,
  ProfilePicAvatar,
  ArtistNameBox,
  GenreBox,
  ArtistDetailBox,
  OptionBox,
  SocialMediaBox,
  AllMiddleBox,
  TableContainer,
  TableRow,
  TableCell,
  RightBox,
} from "@/app/styles/SingleArtistPage.styles";
import { getSong, getSongDuration } from "@/app/services/SongServices";
import { Song } from "@/app/constants/models";
import dayjs from "dayjs";
import AudioDuration from "@/app/components/AudioDuration";
import { addSongImpression } from "@/app/services/AnalyticServices";

interface Props {
  params: { id: string };
}

export default function SingleSongPage({ params: { id } }: Props) {
  const matches = useMediaQuery("(max-width:960px)"); //This is used to check the screen size

  const [songData, setSongData] = React.useState<Song>({});

  const getSongData = () => {
    getSong("", id).then((res) => {
      setSongData(res);
    });
  };

  const incrementSongImpressions = () => {
    addSongImpression(id).then((res) => {
      // console.log(res);
    });
  };

  React.useEffect(() => {
    getSongData();
    incrementSongImpressions();
  }, []);

  React.useEffect(() => {
    if (songData?.song_track) {
      getSongDuration(songData?.song_track).then((res: any) => {
        setSongData((prev) => ({ ...prev, song_length: res }));
      });
    }
  }, [songData?.song_track]);

  const tableData = [
    {
      key: 1,
      attribute: "Released",
      value: dayjs(songData?.release_date).format("YYYY MMMM DD"),
    },
    {
      key: 2,
      attribute: "Recorded",
      value: dayjs(songData?.release_date).format("YYYY"),
    },
    {
      key: 3,
      attribute: "Length",
      value:
        songData?.song_length &&
        Math.floor(songData?.song_length / 60) +
          ":" +
          Math.floor(songData?.song_length % 60)
            .toString()
            .padStart(2, "0"),
    },
    { key: 4, attribute: "Label", value: songData?.record_label },
    {
      key: 5,
      attribute: "Songwriter(s)",
      value: songData?.song_writers?.map((w) => w?.artist_name).join(", "),
    },
    {
      key: 6,
      attribute: "Producer(s)",
      value: songData?.composer?.map((p) => p?.artist_name).join(", "),
    },
  ];

  return (
    <Maindiv>
      {/* This is CardMedia component for backcover img */}
      <CoverCardMedia image={songData?.song_img}>
        <div
          style={{
            background: "black",
            height: matches ? "1000px" : "500px",
            width: "100%",
            opacity: "0.7",
          }}
        ></div>

        <AllMiddleBox>
          <Stack
            direction={matches ? "column" : "row"}
            width="100%"
            spacing={"1px"}
          >
            {/* This is the profilepictureavtar for artist profile pic*/}
            <ProfilePicAvatar src={songData?.song_img}></ProfilePicAvatar>

            {/* This is the artistdetailbox for artist details*/}
            <ArtistDetailBox>
              <ArtistNameBox>{songData?.song_title}</ArtistNameBox>
              <GenreBox>{songData?.song_genre?.join(", ")}</GenreBox>
              <SocialMediaBox>
                <Button>
                  <FacebookRoundedIcon
                    style={{ color: "white", fontSize: "25px" }}
                  />
                </Button>
                <Button>
                  <InstagramIcon style={{ color: "white", fontSize: "25px" }} />
                </Button>
                <Button>
                  <XIcon style={{ color: "white", fontSize: "25px" }} />
                </Button>
                <Button>
                  <LanguageIcon style={{ color: "white", fontSize: "25px" }} />
                </Button>
              </SocialMediaBox>

              <Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    padding: "50px 0px 0px 0px",
                    //backgroundColor: "white",
                  }}
                >
                  Album : {songData?.album_title}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    padding: "5px 0px 0px 0px",
                    //backgroundColor: "white",
                  }}
                >
                  Genre(s) : {songData?.song_genre?.join(", ")}
                </Box>
              </Box>
            </ArtistDetailBox>
            <OptionBox>
              <Stack direction="row" width="100%" spacing={"1px"}>
                <Button>
                  <BsSpotify style={{ color: "white", fontSize: "35px" }} />
                </Button>
                <Button>
                  <SiYoutubemusic
                    style={{ color: "white", fontSize: "35px" }}
                  />
                </Button>
                <Button>
                  <SiApplemusic style={{ color: "white", fontSize: "35px" }} />
                </Button>
              </Stack>
            </OptionBox>
          </Stack>
        </AllMiddleBox>
      </CoverCardMedia>

      <Box
        sx={{
          display: "flex",
          flexDirection: matches ? "column" : "row",
          alignItems: "flex-start",
          padding: "1em",
        }}
      >
        <TableContainer>
          <table
            style={{
              width: "100%",
              //borderCollapse: "collapse",
              // border: "1.5px solid black",
              //borderRadius: "20px",
            }}
          >
            {tableData.map((row, rowIndex) => (
              <TableRow key={row.key}>
                <TableCell>{row.attribute}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </table>
        </TableContainer>
        <RightBox>
          <Box
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            {" "}
            Lyrics
          </Box>
          <Box
            sx={{
              fontSize: "14px",
              padding: "20px",
              display: "flex",
            }}
          >
            {songData?.lyrics ? songData?.lyrics : "No Lyrics Found"}
          </Box>
        </RightBox>
      </Box>
    </Maindiv>
  );
}
