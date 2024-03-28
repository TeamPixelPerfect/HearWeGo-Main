import { Height, Padding } from "@mui/icons-material";
import { styled } from "@mui/material";
import { serviceItem } from "../constants/models";

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
  position: "relative",
  float: "left",
  top: 0,
  marginTop: "-80px",
  '@media (max-width:960px)': {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop:"-80px"
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
  zIndex: 1,
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

export const HomeServicesContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "services",
})<{ services?: serviceItem }>(({ services }) => ({
  width: "70%",
  margin:"auto",
}));

export const HomeServiceItemOdd = styled("div", {
  shouldForwardProp: (prop) => prop !== "services",
})<{ service?: serviceItem }>(({ theme, service }) => ({
  width: "100%",
  // height: "300px",
  display: "flex",
  padding: "32px 0",
  gap: "30px",
  'h2': {
    color: theme.palette.text.primary,
    fontWeight: 700,
    textAlign:"right",
    margin:0,
    marginBottom:"8px",
    fontSize: "48px",
   
  },
  'p': {
    textAlign: "right",
    color: "#787878",
  },
  'div': {
    width: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-end"
  },
  '@media (max-width: 960px)': {
    flexDirection: "column",
    gap:"10px",
    'p, h2' :{
      textAlign: "left"
    },
    'div': {
      width: "inherit",
      alignItems: "flex-start",
    },
    'div:nth-child(1)': {
      height: "fit-content",
      order:0
    },
    'div:nth-child(2)': {
      minHeight: "270px",
      order:1
    }
  }
}));

export const HomeServiceItemEven = styled("div", {
  shouldForwardProp: (prop) => prop !== "services",
})<{ service?: serviceItem }>(({ theme, service }) => ({
  width: "100%",
  // height: "300px",
  display: "flex",
  padding: "32px 0",
  gap: "30px",
  'h2': {
    color: theme.palette.text.primary,
    fontWeight: 700,
    textAlign:"left",
    margin:0,
    marginBottom:"8px",
    fontSize: "48px",
   
  },
  'p': {
    textAlign: "left",
    color: "#787878",
  },
  'div': {
    width: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start"
  },
  '@media (max-width: 960px)': {
    flexDirection: "column",
    gap: "10px",
    'p, h2' :{
      textAlign: "left"
    },
    'div': {
      width: "inherit",
      minHeight: "300px",
      alignItems: "flex-start",
    },
    'div:nth-child(1)': {
      minHeight: "270px",
      order:1
    },
    'div:nth-child(2)': {
      height: "fit-content",
      order:0
    }
  }
}));

