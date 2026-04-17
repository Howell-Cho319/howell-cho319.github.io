import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useMusicContext } from '../contexts/MusicContext';
import { motion, AnimatePresence } from 'motion/react';

export const MusicControls: React.FC = () => {
  const { isPlaying, toggleMusic, volume, setVolume } = useMusicContext();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Play/Pause Button */}
      <button
        onClick={toggleMusic}
        className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors group"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause - Howl\'s Moving Castle' : 'Play - Howl\'s Moving Castle'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
        ) : (
          <Play className="w-4 h-4 text-primary group-hover:scale-110 transition-transform ml-0.5" />
        )}
      </button>

      {/* Volume Controls */}
      <div 
        className="relative"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button
          onClick={handleVolumeToggle}
          className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors group"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          ) : (
            <Volume2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Volume Slider */}
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg z-50"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--secondary)) ${volume * 100}%, hsl(var(--secondary)) 100%)`
                  }}
                />
                <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Now Playing Indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-3 bg-primary rounded-full"
                animate={{
                  scaleY: [1, 1.5, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-primary font-medium">
            Howl's Moving Castle
          </span>
        </motion.div>
      )}
    </div>
  );
};