
import React from 'react';
import { ClockIcon, ImageIcon, HeartIcon } from './Icons';

type Page = 'counter' | 'gallery' | 'message';

interface NavigationProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex flex-col items-center justify-center w-full pt-3 pb-2 transition-all duration-300 transform";
  const activeClasses = "text-violet-600 scale-110";
  const inactiveClasses = "text-violet-400 hover:text-violet-500";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className={`text-xs font-medium mt-1 ${isActive ? 'font-bold' : ''}`}>{label}</span>
    </button>
  );
};


const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-t border-violet-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        <NavButton
          label="Contagem"
          icon={<ClockIcon />}
          isActive={activePage === 'counter'}
          onClick={() => setActivePage('counter')}
        />
        <NavButton
          label="Galeria"
          icon={<ImageIcon />}
          isActive={activePage === 'gallery'}
          onClick={() => setActivePage('gallery')}
        />
        <NavButton
          label="Parabéns"
          icon={<HeartIcon />}
          isActive={activePage === 'message'}
          onClick={() => setActivePage('message')}
        />
      </div>
    </div>
  );
};

export default Navigation;
