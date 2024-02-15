"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/material";

export const CreateEventMainBox = styled(Box)(({ theme }) => ({
    width: '100%',
    backgroundColor: '#E0E7FF',
    height: 'auto',
    borderRadius: 30,
    padding: '1em',
    marginTop: '1em'
}));

export const EventFormBody = styled(Box)(({ theme }) => ({
    width: '100%',

}));

export const InputRow = styled(Box)(({ theme }) => ({
    width: '100%',
    marginBottom: '2em',
    // backgroundColor: 'green'
}));

export const SessionBox = styled(Box)(({ theme }) => ({
    width: '100%',
    // backgroundColor: '#E0E7FF',
    height: 'auto',
    borderRadius: 30,
    padding: '2em',
    marginTop: '1em',
    border: 1,
    borderColor: '#000'
}));

export const SessionInputRow = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    // backgroundColor: 'red'
}));

export const SessionInput = styled(Box)(({ theme }) => ({
    width: '70%',
}));

export const CalendarArea = styled(Box)(({ theme }) => ({
    width: '50%',
    // backgroundColor: 'yellow'
}));

export const SessionInfo = styled(Box)(({ theme }) => ({
    width: '50%',
    // backgroundColor: 'pink'
}));

