import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default volume at 30%
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [autoPlayAttempted, setAutoPlayAttempted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/music/Howl\'s Moving Castle - Promise of the World (piano cover).mp4');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    // Preload the audio
    audioRef.current.preload = 'auto';

    // Additional event listeners to ensure continuous playback
    const handleAudioEnd = () => {
      // Fallback: manually restart if loop fails
      if (audioRef.current && isPlaying) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
    };

    const handleAudioError = (e: Event) => {
      console.error('Audio error:', e);
      // Try to reload and restart if there's an error
      if (audioRef.current && isPlaying) {
        audioRef.current.load();
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().catch(console.error);
          }
        }, 1000);
      }
    };

    // Add event listeners for robust playback
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnd);
      audioRef.current.addEventListener('error', handleAudioError);
    }

    // Try immediate autoplay (works in some browsers)
    const tryImmediateAutoplay = async () => {
      if (!autoPlayAttempted && audioRef.current) {
        setAutoPlayAttempted(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasUserInteracted(true);
          console.log('Music auto-started successfully');
        } catch (error) {
          console.log('Immediate autoplay blocked, waiting for user interaction');
          // Set up interaction listeners if immediate autoplay fails
          setupInteractionListeners();
        }
      }
    };

    // Auto-start music on first user interaction
    const handleFirstInteraction = async () => {
      if (!hasUserInteracted && audioRef.current) {
        setHasUserInteracted(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          console.log('Music started after user interaction');
        } catch (error) {
          console.log('Autoplay prevented by browser policy');
        }
      }
    };

    const setupInteractionListeners = () => {
      // Listen for various user interaction events
      const events = ['click', 'touchstart', 'keydown', 'mousemove', 'scroll'];
      events.forEach(event => {
        document.addEventListener(event, handleFirstInteraction, { once: true });
      });

      // Clean up function for interaction listeners
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, handleFirstInteraction);
        });
      };
    };

    // Try immediate autoplay first
    const timeoutId = setTimeout(tryImmediateAutoplay, 100);

    return () => {
      clearTimeout(timeoutId);
      if (audioRef.current) {
        // Remove event listeners
        audioRef.current.removeEventListener('ended', handleAudioEnd);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [autoPlayAttempted, hasUserInteracted, volume]);

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
        setHasUserInteracted(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        toggleMusic,
        volume,
        setVolume: handleVolumeChange,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};