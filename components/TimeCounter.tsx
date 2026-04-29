
import React, { useState, useEffect } from 'react';

const startDate = new Date('1994-05-15T20:00:00');

interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeCounter: React.FC = () => {
  const [duration, setDuration] = useState<Duration>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (hours < 0) {
        hours += 24;
        days--;
      }
      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setDuration({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative flex-grow flex flex-col items-center justify-center text-center p-6 bg-cover bg-center" 
      style={{ backgroundImage: "url('https://picsum.photos/1080/1920?grayscale&blur=2')" }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 text-white">
        <p className="text-5xl md:text-7xl mb-2">🎂</p>
        <h1 className="font-dancing-script text-4xl md:text-6xl animate-float" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
          Feliz Aniversário! 🎉
        </h1>
        <div className="mt-8 md:mt-12 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30">
          <h2 className="text-lg md:text-2xl font-light mb-4">🕐 Já se passaram:</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 text-center">
            <div className="p-2">
              <p className="text-3xl md:text-5xl font-bold">{duration.years}</p>
              <p className="text-xs uppercase tracking-wider">Anos</p>
            </div>
            <div className="p-2">
              <p className="text-3xl md:text-5xl font-bold">{duration.months}</p>
              <p className="text-xs uppercase tracking-wider">Meses</p>
            </div>
            <div className="p-2">
              <p className="text-3xl md:text-5xl font-bold">{duration.days}</p>
              <p className="text-xs uppercase tracking-wider">Dias</p>
            </div>
            <div className="p-2">
              <p className="text-3xl md:text-5xl font-bold">{String(duration.hours).padStart(2, '0')}</p>
              <p className="text-xs uppercase tracking-wider">Horas</p>
            </div>
            <div className="p-2">
              <p className="text-3xl md:text-5xl font-bold">{String(duration.minutes).padStart(2, '0')}</p>
              <p className="text-xs uppercase tracking-wider">Minutos</p>
            </div>
            <div className="p-2">
              <p className="text-3xl md:text-5xl font-bold">{String(duration.seconds).padStart(2, '0')}</p>
              <p className="text-xs uppercase tracking-wider">Segundos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeCounter;
