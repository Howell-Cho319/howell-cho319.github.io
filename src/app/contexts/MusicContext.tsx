import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  pauseMusic: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

interface MusicProviderProps {
  children: React.ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  // Initialize state from localStorage
  const [isPlaying, setIsPlaying] = useState(() => {
    const saved = localStorage.getItem('music_playing');
    // Default to true for new users, but browsers might still block it
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('music_volume');
    return saved !== null ? JSON.parse(saved) : 0.3;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('music_playing', JSON.stringify(isPlaying));
  }, [isPlaying]);

  useEffect(() => {
    localStorage.setItem('music_volume', JSON.stringify(volume));
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/Howl\'s Moving Castle - Promise of the World (piano cover).mp4');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = 1.0;
      audioRef.current.preload = 'auto';
    }

    const audio = audioRef.current;

    const tryPlay = async () => {
      // ONLY try to play if the user's preference is actually set to playing
      if (!isPlaying) return;
      
      try {
        audio.playbackRate = 1.0;
        await audio.play();
        setIsPlaying(true);
        // Remove listeners once it successfully plays
        removeListeners();
      } catch (err) {
        console.log('Autoplay blocked by browser. Waiting for user interaction...');
      }
    };

    const handleInteraction = () => {
      tryPlay();
    };

    const removeListeners = () => {
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    // Add listeners for interaction to trigger autoplay if it was blocked
    if (isPlaying) {
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.addEventListener(event, handleInteraction, { once: true });
      });
      // Try immediate autoplay
      tryPlay();
    }

    return () => {
      removeListeners();
    };
  }, []); // Only on mount

  // Handle volume changes separately
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling music:', error);
      // If play failed, ensure state reflects that
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        toggleMusic,
        pauseMusic,
        volume,
        setVolume: handleVolumeChange,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};