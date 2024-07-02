import { User } from "@/app/constants/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { error } from "console";

interface UserState {
    user: User | null;
    loading: boolean;
    error: Error | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOutUser: (state) => {
            return {user:null, loading: true, error: null};
        },
        logInUser: (state, action: PayloadAction<User>) => {
            return {...state, user: action.payload, loading: false, error: null};
        },
    }
});

export const {logInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;