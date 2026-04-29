
import React, { useState, useEffect } from 'react';
import { HeartPulseIcon } from './Icons';

const fullMessage = "Minha esposa, hoje é o seu dia! 🎉 Deus caprichou quando te criou. Cada ano da sua vida é uma prova do cuidado e do amor Dele por nós. Obrigado, Senhor, por ter colocado essa mulher incrível no meu caminho. Você merece toda alegria, toda festa e todo bolo do mundo! Que Deus continue te abençoando, te guardando e realizando os desejos do seu coração. Feliz aniversário, meu amor! 🎂🙏";

const LoveMessage: React.FC = () => {
  const [typedMessage, setTypedMessage] = useState('');

  useEffect(() => {
    setTypedMessage('');
    const timer = setTimeout(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullMessage.length) {
          setTypedMessage((prev) => prev + fullMessage.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, 500);
    
    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="relative flex-grow flex flex-col items-center justify-center text-center p-8 bg-amber-50 overflow-hidden pb-24">
       <div className="absolute inset-0 z-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute text-amber-400 text-3xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {['🎈', '🎉', '✨', '🎊', '⭐'][i % 5]}
          </div>
        ))}
      </div>
      <div className="relative z-10 max-w-2xl bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg">
        <p className="text-5xl mb-4">🎁</p>
        <h2 className="font-dancing-script text-4xl md:text-5xl text-violet-700 mb-6">Feliz Aniversário! 🥳</h2>
        <p className="text-left text-lg md:text-xl text-violet-800 leading-relaxed min-h-[280px]">
          {typedMessage}
          <span className="inline-block w-0.5 h-6 bg-violet-500 animate-pulse ml-1"></span>
        </p>
      </div>
      <button className="relative z-10 mt-10 flex items-center justify-center px-8 py-4 bg-violet-500 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform animate-pulse">
        <span className="text-xl mr-2">🎂</span>
        <span className="text-lg">Parabéns pra nós!</span>
      </button>
    </div>
  );
};

export default LoveMessage;
