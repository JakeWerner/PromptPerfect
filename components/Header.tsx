
import React from 'react';
import { WandIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <WandIcon className="h-8 w-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Prompt Perfect
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;