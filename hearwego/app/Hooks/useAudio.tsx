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

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopCurrentAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }
  };

  const toggle = () => {
    setPlaying(!playing);
  };

  // useEffect(() => {
  //   const newAudio = new Audio(url);
  //   setAudio(newAudio);

  //   console.log("Audio URL: ", url);

  //   return () => {
  //     const handleEnded = () => setPlaying(false);
  //     newAudio.pause();
  //     newAudio.removeEventListener("ended", handleEnded);
  //     clearTimeout(timeoutRef.current!);
  //   };
  // }, [url]);

  useEffect(() => {
    if (playing) {
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
      // audio?.play();
      // timeoutRef.current = setTimeout(() => {
      //   stopCurrentAudio();
      // }, 30000); // Stop after 30 seconds
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
      audio?.pause();
      // clearTimeout(timeoutRef.current!);
    }

    // return () => {
    //   clearTimeout(timeoutRef.current!);
    // };
  }, [playing, audio]);

  return { playing, toggle, stopCurrentAudio };
};

export default useAudio;
