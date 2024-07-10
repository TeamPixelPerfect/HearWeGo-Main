import { Artist } from "@/app/constants/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { error } from "console";

interface UserState {
    user: any;
    loading: boolean;
    error: Error | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const adminSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {
        logOutAdmin: (state) => {
            return {user: null, loading: true, error: null};
        },
        logInAdmin: (state, action: PayloadAction<Artist>) => {
            return {...state, user: action.payload, loading: false, error: null};
        },
    }
});

export const { logInAdmin, logOutAdmin } = adminSlice.actions;
export default adminSlice.reducer;