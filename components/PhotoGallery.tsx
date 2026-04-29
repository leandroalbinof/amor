
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const photos = Array.from({ length: 23 }, (_, i) => `https://picsum.photos/seed/${i + 1}/800/600`);

const PhotoGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center w-full h-full bg-amber-50 overflow-hidden pb-16">
      <div className="w-full max-w-2xl aspect-[4/3] relative shadow-2xl rounded-lg overflow-hidden">
        {photos.map((photo, index) => (
          <img
            key={photo}
            src={photo}
            alt={`Lembrança ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <button 
          onClick={goToPrevious} 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 text-rose-800 p-2 rounded-full hover:bg-white/80 transition-colors z-10"
          aria-label="Foto anterior"
        >
          <ChevronLeftIcon />
        </button>
        <button 
          onClick={goToNext} 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 text-rose-800 p-2 rounded-full hover:bg-white/80 transition-colors z-10"
          aria-label="Próxima foto"
        >
          <ChevronRightIcon />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-violet-700 font-semibold">{`📸 Foto ${currentIndex + 1} de ${photos.length}`}</p>
    </div>
  );
};

export default PhotoGallery;
