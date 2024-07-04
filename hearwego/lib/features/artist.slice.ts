import { Artist } from "@/app/constants/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { error } from "console";

interface UserState {
    user: Artist | null;
    loading: boolean;
    error: Error | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        logOutArtist: (state) => {
            return {user: null, loading: true, error: null};
        },
        logInArtist: (state, action: PayloadAction<Artist>) => {
            return {...state, user: action.payload, loading: false, error: null};
        },
        updateArtist: (state, action: PayloadAction<Artist>) => {
            return {...state, user: action.payload, loading: false, error: null};
        },
    }
});

export const { logInArtist, logOutArtist, updateArtist } = artistSlice.actions;
export default artistSlice.reducer;