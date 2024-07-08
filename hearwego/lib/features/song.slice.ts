import { AppItem } from "@/app/constants/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongState {
  song_track: string;
  current_song: string;
  playing: boolean;
  song_name: string;
  cover_art: string;
  artist: string;
}

const initialState = {
  song_track: "",
  current_song: "",
  playing: false,
  song_name: "",
  cover_art: "",
  artist: "",
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<SongState>) => {
      return { ...state, ...action.payload };
    },
    playSong: (state, action: PayloadAction<SongState>) => {
      return { ...state, ...action.payload };
    },
    pauseSong: (state) => {
      return { ...state, playing: false };
    },
  },
});

export const { setSong, playSong, pauseSong } = songSlice.actions;
export default songSlice.reducer;
