import { AppItem } from '@/app/constants/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    song_track: "",
}

export const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        setSong: (state, action: PayloadAction<{song_track: string}>) => {
            return {...action.payload};
        },
    }
});

export const { setSong } = songSlice.actions;
export default songSlice.reducer;
