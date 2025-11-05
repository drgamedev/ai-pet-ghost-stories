import React from 'react';

interface HeaderProps {
  onLibraryClick: () => void;
  libraryCount: number;
}

const LibraryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 002 2z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onLibraryClick, libraryCount }) => {
  return (
    <header className="flex justify-between items-center pb-4 border-b border-gray-200">
      <div className="text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F35A6]">
          Pet Ghost Stories
        </h1>
        <p className="text-sm text-gray-500 mt-1">Magical Bedtime Adventures for Your Best Friend</p>
      </div>
      <button 
        onClick={onLibraryClick}
        className="relative flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-[#0F35A6] rounded-lg shadow-sm transition-all transform hover:scale-105"
        aria-label={`View my stories. You have ${libraryCount} saved.`}
      >
        <LibraryIcon />
        <span className="hidden sm:inline">My Stories</span>
        {libraryCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#BF0436] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {libraryCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;