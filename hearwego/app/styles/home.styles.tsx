import { Padding } from "@mui/icons-material";
import { styled } from "@mui/material";

export const HomeBanner = styled("div", {
  shouldForwardProp: (prop) => prop !== "imgs",
})<{ imgs?: string[] }>(({ theme, imgs }) => ({
  width: "100%",
  minHeight: "100vh",
  height: "fit-content",
  background: "#000",
  backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${
    imgs ? imgs[0] : ""
  })`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  position: "absolute",
  top: 0,
  zIndex: -1,
  '@media (max-width:960px)': {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
}));

export const HomeTaglineContainer = styled("div")(({ theme }) => ({
  padding: "2em",
  marginTop: "20%",
  paddingBottom: "1em",
  maxWidth:"100%",
  "@media (max-width:960px)": {
    padding: 0,
    marginTop: "40%",
    width: "100%",
  },
}));

export const HomeTagline = styled("div")(({ theme }) => ({
  color: "#fff",
  fontSize: 80,
  fontWeight: "bold",
  marginBottom: 0,
  paddingBottom: 0,
  height: 80,
  width:"100%",
  "@media (max-width:960px)": {
    fontSize: 30,
    height: "fit-content",
    width: "50%",
    textAlign: "right",
  },
}));

export const HomeTagline2 = styled("div")(({ theme }) => ({
  color: "#A5B4FC",
  fontSize: 80,
  fontWeight: "bold",
  maxWidth: "50%",
  "@media (max-width:960px)": {
    fontSize: 30,
    width: "50vw",
    textAlign: "left",
    left: "50%",
    transform: "translateX(100%)",
  },
}));

export const HomeBannerButtonContainer = styled("div")(({ theme }) => ({
  zIndex: 100,
  marginLeft: 4,
  display: "flex",
  gap: 10,
  padding: 20,
  "@media (max-width:960px)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "3em",
    padding: 0,
  },
}));

export const HomeBannerButton = styled("button")(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: "#6366F1",
  border: "none",
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "18px",
  padding: "16px",
  width: "200px",
  transition: "all 0.5s",
  cursor: "pointer",
  margin: "5px",
  "& span": {
    cursor: "pointer",
    display: "inline-block",
    position: "relative",
    transition: "0.5s",
  },
    "& span:after": {
        content: "'\\00bb'",
        position: "absolute",
        opacity: 0,
        top: 0,
        right: "-20px",
        transition: "0.5s",
    },
    "&:hover span": {
        paddingRight: "25px",
    },
    "&:hover span:after": {
        opacity: 1,
        right: 0,
    },
}));
