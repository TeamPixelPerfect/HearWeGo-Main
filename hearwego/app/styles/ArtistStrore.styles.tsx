import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Stack from '@mui/material/Stack';

export const Search = styled("div")(({ theme }) => ({
  p: "20px",
  display: "flex",
  alignItems: "center",
  width: "60%",
  backgroundColor: theme.palette.background.default,
  borderRadius: "90px",
  border: "2px solid #E6ECF0",
  height: "40px",
  position: "relative",
  
}));
export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
// backgroundColor: "red",
  
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",

}));

export const WhiteArea = styled(Stack)(({ theme }) => ({
    // backgroundColor:"#EEF2FF",
    // marginTop: '20px',
    padding: '10px',
    marginBottom: '1em'  
  }));
