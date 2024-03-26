import { Box, ButtonGroup, Card, IconButton, styled } from "@mui/material";

export const SongCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-between",
  padding: "8px 16px",
  height: "80px",
  marginBottom: "12px",

  "& h6": {
    fontSize: "16px",
    fontWeight: 500,
  },

  "&:hover": {
    background:
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
  },
}));

export const SongCardItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "width"
})<{width: string}>(({ theme, width }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  fontWeight: 500,
  width: width,
  // borderLeftWidth: "1px",
  // borderLeftStyle: "solid",
  // borderLeftColor: theme.palette.text.primary,
  // borderRightWidth: "1px",
  // borderRightStyle: "solid",
  // borderRightColor: theme.palette.text.primary,

  "& svg": {
    color: theme.palette.secondary.main,
    marginRight: "12px",
    fontSize: "24px",
  },
}));

export const SongCardCoverArt = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imgUrl",
})<{ imgUrl: string }>(({ theme, imgUrl }) => ({
  height: "50x",
  width: "50px",
  minWidth: "50px",
  minHeight: "50px",
  background: `url(${imgUrl})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  marginRight: "12px",
  borderRadius: "50%",
}));

export const SongCardPlayButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "32px",
}));

export const AlbumCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-between",
  padding: 0,
  height: "100px",
  marginBottom: "8px",

  "& h6": {
    fontSize: "16px",
    fontWeight: 500,
  },

  "& p": {
    fontSize: "12px",
    fontWeight: 400,
  },

  "&:hover": {
    background:
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
  },
}));

export const AlbumCardCoverArt = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imgUrl",
})<{ imgUrl: string }>(({ theme, imgUrl }) => ({
    height: "100px",
    width: "80px",
    background: `url(${imgUrl})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    marginRight: "12px"
}));

export const SongCardButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  button: {
    // background: theme.palette.background.default,
    // color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textTransform: "capitalize",
    "&:hover": {
      // background:  theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    }
  },
}));