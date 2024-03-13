import { AppItem, Song } from "@/app/constants/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  song_tracks: Song[];
  album_img: string;
} = {
  song_tracks: [],
  album_img: "",
};

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbum: (
      state,
      action: PayloadAction<{ song_tracks: Song[]; album_img: string }>
    ) => {
      return { ...action.payload };
    },
  },
});

export const { setAlbum } = albumSlice.actions;
export default albumSlice.reducer;
