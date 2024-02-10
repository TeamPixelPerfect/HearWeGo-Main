import { Paper, formControlClasses, styled } from "@mui/material";

export const SearchBar = styled(Paper)(({ theme }) => ({
    p: '1px 1px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    backgroundColor: theme.palette.primary.main
    }));