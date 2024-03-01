import { Grid, styled } from "@mui/material";

export const SongDetailTable = styled(Grid)(({ theme }) => ({
    width: "100%",
    margin: 0,
}))

export const SongDetailTitle = styled(Grid)(({ theme }) => ({
    padding:"1em",
    background: theme.palette.secondary.main,
    fontWeight: 600,
    color: "#fff",
}));

export const SongDetailTitleEven = styled(Grid)(({ theme }) => ({
    padding:"1em",
    background: "#3730a3",
    fontWeight: 600,
    color: "#fff",
}));

export const SongDetailData = styled(Grid)(({ theme }) => ({
    padding: "1em",
}))

export const SongDetailDataEven = styled(Grid)(({ theme }) => ({
    padding: "1em",
    background: theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
}))