"use client";
import { styled } from "@mui/material";
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';

export const EventMainBox = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.palette.background.default,
    height: 'auto',
    borderRadius: 30,
    // padding: '1em',
    marginTop: '1em'
}));

export const TopBar = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex'
}));

export const TabBar = styled(Box)(({ theme }) => ({
    width: '80%',
    // backgroundColor: '#E0E73F',
}));

export const BtnSec = styled(Box)(({ theme }) => ({
    width: '20%',
    // backgroundColor: '#E0273F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

export const EventSec = styled(Box)(({ theme }) => ({
    maxWidth: '100%',
    // backgroundColor: '#E0273F',
    // height: '500px',
    marginTop: '2em',
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'center'
}));

export const EventBar = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#E0E73F',
    height: '100px',
    marginBottom: '1em'
}));

export const EventImgArea = styled(Box)(({ theme }) => ({
    width: '25%',
    backgroundColor: '#E0E03F',
    height: '100px',
    display: 'flex',
    
}));

export const EventDetailRow = styled(Stack)(({ theme }) => ({
    marginBottom: '1em'  
}));



