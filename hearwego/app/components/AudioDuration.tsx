import React, { useRef, useState, useEffect } from "react";

const AudioDuration = ({ url }: any) => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [url]);

  return (
    <div>
      <audio ref={audioRef} src={url} preload="metadata" />
      {duration && (
        <p>
          Duration: {Math.floor(duration / 60)}:
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}
        </p>
      )}
    </div>
  );
};

export default AudioDuration;
