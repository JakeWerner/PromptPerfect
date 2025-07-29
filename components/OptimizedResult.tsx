
import React, { useState } from 'react';
import { OptimizedPromptResponse } from '../types';
import { LightbulbIcon, CopyIcon, CheckIcon, AlertTriangleIcon, SlidersIcon, LoadingIcon } from './icons';

interface OptimizedResultProps {
  result: OptimizedPromptResponse | null;
  isLoading: boolean;
  error: string | null;
  isRefining: boolean;
  onRefine: () => void;
  refinementInput: string;
  onRefinementInputChange: (value: string) => void;
}

const OptimizedResult: React.FC<OptimizedResultProps> = ({ result, isLoading, error, isRefining, onRefine, refinementInput, onRefinementInputChange }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-slate-500 dark:text-slate-400">AI is thinking...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-r-lg" role="alert">
                    <div className="flex items-center">
                        <AlertTriangleIcon className="h-6 w-6 mr-3"/>
                        <div>
                            <p className="font-bold">Operation Failed</p>
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (!result) {
            return (
                <div className="text-center p-8 text-slate-500 dark:text-slate-400">
                    Click "Optimize with AI" to see suggestions here.
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Optimized Prompt</h3>
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Copy optimized prompt"
                        >
                            {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <CopyIcon className="h-5 w-5 text-slate-500" />}
                        </button>
                    </div>
                    <div className="mt-2 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                        {result.prompt}
                    </div>
                </div>
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
                        <LightbulbIcon className="h-5 w-5 text-amber-400"/>
                        Explanation
                    </h3>
                    <div className="mt-2 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">
                        {result.explanation}
                    </div>
                </div>
                
                {/* Refinement Section */}
                <div className="mt-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">4. Refine Prompt</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Not quite right? Explain what you want to change and the AI will try again.</p>
                    <div className="flex flex-col gap-3">
                        <textarea
                            value={refinementInput}
                            onChange={(e) => onRefinementInputChange(e.target.value)}
                            placeholder="e.g., The tone was too formal, make it more casual and witty. Also, add a call to action at the end."
                            rows={3}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            aria-label="Refinement feedback"
                        />
                         <button
                            onClick={onRefine}
                            disabled={isRefining || !refinementInput}
                            className="flex items-center justify-center gap-2 w-full sm:w-auto self-end bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all duration-200"
                            >
                            {isRefining ? (
                                <>
                                <LoadingIcon className="h-5 w-5 animate-spin" />
                                Refining...
                                </>
                            ) : (
                                <>
                                <SlidersIcon className="h-5 w-5" />
                                Refine
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg min-h-[200px]">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. AI Optimization Result</h2>
            {renderContent()}
        </div>
    );
};

export default OptimizedResult;
