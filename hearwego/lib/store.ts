import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/app.slice";
import userReducer from "./features/user.slice";
import artistReducer from "./features/artist.slice";
import songReducer from "./features/song.slice";
import albumReducer from "./features/album.slice";
import adminReducer from "./features/admin.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      user: userReducer,
      artist: artistReducer,
      song: songReducer,
      album: albumReducer,
      admin: adminReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
