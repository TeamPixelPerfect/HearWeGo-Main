import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/app.slice";
import userReducer from "./features/user.slice";
import artistReducer from "./features/artist.slice";
import songReducer from "./features/song.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      user: userReducer,
      artist: artistReducer,
      song: songReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
