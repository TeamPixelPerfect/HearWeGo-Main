"use client";
import { playSong } from "@/lib/features/song.slice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState, useRef } from "react";

interface Props {
  url: string;
  songName: string;
  artist: string;
  coverArt: string;
}

// Custom hook for playing audio
const useAudio = ({ url, songName, artist, coverArt }: Props) => {
  const dispatch = useAppDispatch();

  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
    console.log("Playing: ", playing);
    if (playing === false) {
      dispatch(
        playSong({
          playing: true,
          current_song: url,
          song_name: songName,
          artist: artist,
          cover_art: coverArt,
          song_track: "",
        })
      );
    } else {
      dispatch(
        playSong({
          playing: false,
          current_song: url,
          song_name: songName,
          artist: artist,
          cover_art: coverArt,
          song_track: "",
        })
      );
    }
  };

  return { playing, toggle };
};

export default useAudio;
