import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause } from 'lucide-react';

interface AudioWaveformPlayerProps {
  fileUrl: string;
}

const AudioWaveformPlayer: React.FC<AudioWaveformPlayerProps> = ({ fileUrl }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4a9eff',
        progressColor: '#1e3a8a',
        cursorColor: '#1e3a8a',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 3,
      });

      wavesurfer.current.load(fileUrl);

      wavesurfer.current.on('finish', () => setIsPlaying(false));

      return () => {
        if (wavesurfer.current) {
          try {
            wavesurfer.current.destroy();
          } catch (error) {
            console.error("Error during WaveSurfer destroy:", error);
          }
        }
      };
    }
  }, [fileUrl]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying((prevState) => !prevState);
    }
  };

  return (
    <div className="w-full">
      <div ref={waveformRef} className="w-full h-24" />
      <button
        onClick={handlePlayPause}
        className="mt-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
};

export default AudioWaveformPlayer;
