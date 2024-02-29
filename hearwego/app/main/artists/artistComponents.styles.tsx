"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { hearWeGoTheme } from "../../styles/theme";
import { Stack } from "@mui/material";
import { InputLabel, Select, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TableCell, TableRow } from "@mui/material";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  labelId: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label: string;
  options: Option[];
  placeholder?: string;
}

interface ArtistCardProps {
  name: string;
  Genre: string;
  img_url: string;
}

interface tableRow {
  Rank: {
    rank: number;
    rank_img: string;
  };
  Artist: {
    name: string;
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
          backgroundColor: "primary.main",
          color: "background.default",
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export const Maindiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  height: "100%",
  paddingLeft: "30px",
}));

export const SearchPaper = styled(Paper)(({ theme }) => ({
  component: "form",
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "50%",
  backgroundColor: theme.palette.primary.light,
  borderRadius: "10px",
  height: "60px",
}));

export const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  Genre,
  img_url,
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        width: "220px",
        height: "280px",
        marginBottom: 0,
      }}
    >
      <CardActionArea
        style={{
          backgroundImage: `url(${img_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            margin: "0px",
            padding: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.82)",
            color: "background.default",
            textAlign: "right",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{Genre}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export const TrendingRow: React.FC<tableRow> = ({
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
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              backgroundImage: `url(${Artist.img_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "25px",
              height: "25px",
            }}
          ></div>
          <div>{Artist.name}</div>
        </Stack>
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
