import { styled, alpha } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";

export const HeaderBox = styled("div")(({ theme }) => ({
  width: "100%",
  bgColor: "#000",
  height: "fit-content",
  display: "flex",
  alignItems: "center",
}));

export const SearchArea = styled("div")(({ theme }) => ({
  height: "100%",
  width: "70%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const HitPredictorIco = styled("div")(({ theme }) => ({
  height: "100%",
  width: "10%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const HitPredictorBtn = styled(Fab)(({ theme }) => ({
  height: "50px",
  width: "50px",
  borderRadius: "50px",
}));
 
export const ProfileArea = styled("div")(({ theme }) => ({
  height: "100%",
  width: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const ProfileDetailArea = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: '8px',
  width: "100%",
  height: "70%",
  backgroundColor: "#F3E8FF",
  borderRadius: "12px",
  boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
  "& > *:nth-child(1)": {
    marginRight: 2,
  },
  "& > *:nth-child(2)": {
    flex: "auto",
  },
}));

export const ArtistDetail = styled("div")(({ theme }) => ({
    height: "100%",
    // width: "60%",
    // backgroundColor: "#F3E800",
  }));

export const ArtistName = styled("div")(({ theme }) => ({
    width: "100%",
    fontSize: '1em',
    marginLeft: '10px',
    fontWeight: 700
  }));

  export const ArtistGenre = styled("div")(({ theme }) => ({
    width: "100%",
    fontSize: '1em',
    marginLeft: '10px',
    fontFamily: "Dancing Script",
    fontWeight: 700,
    color: theme.palette.secondary.main
  }));

