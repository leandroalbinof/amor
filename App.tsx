
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import TimeCounter from './components/TimeCounter';
import PhotoGallery from './components/PhotoGallery';
import LoveMessage from './components/LoveMessage';
import { PlayIcon, PauseIcon } from './components/Icons';

type Page = 'counter' | 'gallery' | 'message';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('counter');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.getElementById('background-music') as HTMLAudioElement;
  }, []);
  
  const handlePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Autoplay failed, user interaction needed.", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const renderPage = () => {
    switch (activePage) {
      case 'counter':
        return <TimeCounter />;
      case 'gallery':
        return <PhotoGallery />;
      case 'message':
        return <LoveMessage />;
      default:
        return <TimeCounter />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-white to-rose-100 text-rose-800 flex flex-col antialiased overflow-hidden">
      <main className="flex-grow flex flex-col">
        {renderPage()}
      </main>
      
      <button 
        onClick={handlePlayPause} 
        className="fixed top-4 right-4 z-50 bg-rose-200 text-rose-700 p-3 rounded-full shadow-lg hover:bg-rose-300 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-50"
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <footer className="w-full">
        <Navigation activePage={activePage} setActivePage={setActivePage} />
      </footer>
    </div>
  );
};

export default App;
