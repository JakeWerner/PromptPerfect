import React, { useState } from 'react';
import { CopyIcon, CheckIcon, SparklesIcon, LoadingIcon, FeatherIcon } from './icons';
import { OptimizationMode } from '../types';

interface GeneratedPromptProps {
  prompt: string;
  onOptimize: () => void;
  isLoading: boolean;
  optimizationMode: OptimizationMode;
  onOptimizationModeChange: (mode: OptimizationMode) => void;
}

const GeneratedPrompt: React.FC<GeneratedPromptProps> = ({ prompt, onOptimize, isLoading, optimizationMode, onOptimizationModeChange }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getButtonClasses = (mode: OptimizationMode) => {
    const baseClasses = "flex items-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors duration-200";
    const activeClasses = "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 ring-indigo-500";
    const inactiveClasses = "bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 ring-transparent";
    return `${baseClasses} ${optimizationMode === mode ? activeClasses : inactiveClasses}`;
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Your Generated Prompt</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">This is the complete prompt ready to be used or optimized.</p>
        </div>
        <button
            onClick={handleCopy}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Copy prompt"
        >
            {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <CopyIcon className="h-5 w-5 text-slate-500" />}
        </button>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg min-h-[120px] text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
        {prompt || <span className="text-slate-400 dark:text-slate-500">Your combined prompt will appear here...</span>}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 block">Optimization Goal</label>
          <div className="flex items-center gap-2">
            <button onClick={() => onOptimizationModeChange('default')} className={getButtonClasses('default')} aria-pressed={optimizationMode === 'default'}>
              <SparklesIcon className="h-5 w-5" />
              Balanced
            </button>
            <button onClick={() => onOptimizationModeChange('token_saver')} className={getButtonClasses('token_saver')} aria-pressed={optimizationMode === 'token_saver'}>
              <FeatherIcon className="h-5 w-5" />
              Token Saver
            </button>
          </div>
        </div>
        <button
          onClick={onOptimize}
          disabled={isLoading || !prompt}
          className="flex items-center justify-center gap-2 w-full sm:w-auto self-end bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all duration-200 mt-4 sm:mt-0"
        >
          {isLoading ? (
            <>
              <LoadingIcon className="h-5 w-5 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              Optimize with AI
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GeneratedPrompt;