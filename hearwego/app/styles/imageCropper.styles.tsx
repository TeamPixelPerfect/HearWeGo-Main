import { Box, Modal, Slider, Stack, Theme, Typography, styled } from "@mui/material";

export const CropperContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
}));

export const CropperActions = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: "0",
  width: "100%",
  background: theme.palette.background.default,
  padding: theme.spacing(1),
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
}));

export const CropperModal = styled(Modal)(({ theme }) => ({
  // background: theme.palette.background.default,
}));

export const SliderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: "1",
  alignItems: "center",
}));

export const SliderLabel = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    minWidth: 65,
  },
}));

export const CropSlider = styled(Slider)(({ theme }) => ({
    padding: "22px 0px",
    marginLeft: 32,
    [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        alignItems: "center",
        margin: "0 16px",
    },
    
}));


