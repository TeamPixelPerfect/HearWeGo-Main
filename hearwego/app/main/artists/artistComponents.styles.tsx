"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  Box,
  CardActionArea,
  CardActions,
  FormControl,
  Link,
} from "@mui/material";
import { Stack } from "@mui/material";
import { InputLabel, Select, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import { TableCell, TableRow } from "@mui/material";

//created the interface for the options in the select component
interface Option {
  value: string;
  label: string;
}

//created the interface for the custom select component
interface CustomSelectProps {
  labelId: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label: string;
  options: Option[];
  placeholder?: string;
}

//created the interface for the artist card component
interface ArtistCardProps {
  name: String;
  Genre: String;
  img_url: String;
  id?: string;
}

//created the interface for the trending row component
interface tableRow {
  LinkPage: string;
  Rank: {
    rank: number;
    rank_img: string;
  };
  Artist: {
    name: String;
    img_url: string;
  };
  Latest_song: {
    song_name: string;
    song_img: string;
  };
  Latest_album: {
    album_name: string;
    album_img: string;
  };
  Fans: number;
  popularity: string;
  country_img: string;
}

//created the custom select component
export const CustomSelect: React.FC<CustomSelectProps> = ({
  labelId,
  id,
  value,
  onChange,
  label,
  options,
}) => {
  return (
    <div>
      <FormControl sx={{ m: 1, color: "white" }} size="small">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={value}
          onChange={(event: React.ChangeEvent<{ value: string }>) =>
            onChange(event)
          }
          label={label}
          sx={{
            width: "150px",
            backgroundColor: "primary.light",
            color: "primary.default",
            height: "40px",
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

//created the styled component for the main div
export const Maindiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  height: "100%",
  paddingLeft: "30px",
  paddingRight: "10px",
}));

//created the styled component for the search paper
export const SearchPaper = styled(Paper)(({ theme }) => ({
  component: "form",
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "40%",
  backgroundColor: theme.palette.primary.light,
  borderRadius: "30px",
  height: "100%",
}));

//created the artist card component
export const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  Genre,
  img_url,
  id,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Card
      sx={{
        position: "relative",
        width: "190px",
        height: "230px",
        marginBottom: 0,
        borderRadius: "30px",
        transition: "transform 0.2s ease-in-out", 
        transform: isHovered ? "scale(1.10)" : "scale(1)",
        marginRight: "20px",
        marginTop: "20px",
      }}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <Link href={"/main/artists/" + id}>
        <CardActionArea
          style={{
            backgroundImage: `url(${img_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            textTransform: "capitalize",
          }}
        >
          <Box
            sx={{
              marginTop: "70%",
              padding: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.82)",
              color: "background.paper",
              textAlign: "right",
            }}
          >
            <Typography variant="h6" color="white" component="div">
              {name}
            </Typography>
            <Typography variant="body1" color="white">
              {Genre}
            </Typography>
          </Box>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export const TrendingRow: React.FC<tableRow> = ({
  LinkPage,
  Rank,
  Artist,
  Latest_song,
  Latest_album,
  Fans,
  popularity,
  country_img,
}) => {
  return (
    <TableRow>
      <TableCell align="center">
        <Stack
          direction={"row"}
          spacing={4}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              backgroundImage: `url(${Rank.rank_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "15px",
              height: "15px",
            }}
          ></div>
          <div>{Rank.rank.toString()}</div>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Link href={LinkPage}>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ justifyContent: "center", alignItems: "left " }}
          >
            <div
              style={{
                backgroundImage: `url(${Artist.img_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "25px",
                height: "25px",
                alignItems:"left"
              }}
            ></div>
            <div>{Artist.name}</div>
          </Stack>
        </Link>
      </TableCell>
      <TableCell align="center">
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              backgroundImage: `url(${Latest_song.song_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "25px",
              height: "25px",
            }}
          ></div>
          <div>{Latest_song.song_name}</div>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              backgroundImage: `url(${Latest_album.album_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "25px",
              height: "25px",
            }}
          ></div>
          <div>{Latest_album.album_name}</div>
        </Stack>
      </TableCell>
      <TableCell align="center">{Fans.toString()}</TableCell>
      <TableCell align="center">{popularity}</TableCell>
      <TableCell align="center">
        <div
          style={{
            backgroundImage: `url(${country_img})`,
            width: "15px",
            height: "15px",
          }}
        ></div>
      </TableCell>
    </TableRow>
  );
};
