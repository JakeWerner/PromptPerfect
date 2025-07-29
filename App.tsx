
import React, { useState, useEffect, useCallback } from 'react';
import { Prompt, OptimizationMode } from './types';
import PromptBuilder from './components/PromptBuilder';
import GeneratedPrompt from './components/GeneratedPrompt';
import OptimizedResult from './components/OptimizedResult';
import Header from './components/Header';
import { optimizePrompt, refinePrompt } from './services/geminiService';
import { OptimizedPromptResponse } from './types';

const App: React.FC = () => {
  const [promptParts, setPromptParts] = useState<Prompt>({
    persona: '',
    task: '',
    context: '',
    format: '',
    constraints: ''
  });
  const [combinedPrompt, setCombinedPrompt] = useState('');
  const [optimizationMode, setOptimizationMode] = useState<OptimizationMode>('default');
  const [optimizedResult, setOptimizedResult] = useState<OptimizedPromptResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [refinementInput, setRefinementInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { persona, task, context, format, constraints } = promptParts;
    const fullPrompt = [persona, task, context, format, constraints]
      .filter(part => part.trim() !== '')
      .join(' ')
      .trim();
    setCombinedPrompt(fullPrompt);
  }, [promptParts]);
  
  const handleUpdatePrompt = useCallback((part: keyof Prompt, value: string) => {
    setPromptParts(prev => ({ ...prev, [part]: value }));
  }, []);

  const handleOptimize = useCallback(async () => {
    if (!combinedPrompt) {
      setError('Cannot optimize an empty prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOptimizedResult(null);
    try {
      const result = await optimizePrompt(combinedPrompt, optimizationMode);
      setOptimizedResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [combinedPrompt, optimizationMode]);

  const handleRefine = useCallback(async () => {
    if (!refinementInput || !optimizedResult?.prompt) {
      setError('Cannot refine without feedback and an existing optimized prompt.');
      return;
    }
    setIsRefining(true);
    setError(null);
    try {
      const result = await refinePrompt(optimizedResult.prompt, refinementInput, optimizationMode);
      setOptimizedResult(result);
      setRefinementInput(''); // Clear input on success
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during refinement.');
    } finally {
      setIsRefining(false);
    }
  }, [refinementInput, optimizedResult, optimizationMode]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col">
      <Header />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-1">
            <PromptBuilder promptParts={promptParts} onUpdate={handleUpdatePrompt} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-8">
            <GeneratedPrompt 
              prompt={combinedPrompt} 
              onOptimize={handleOptimize} 
              isLoading={isLoading}
              optimizationMode={optimizationMode}
              onOptimizationModeChange={setOptimizationMode}
            />
            <OptimizedResult 
              result={optimizedResult} 
              isLoading={isLoading} 
              error={error} 
              isRefining={isRefining}
              onRefine={handleRefine}
              refinementInput={refinementInput}
              onRefinementInputChange={setRefinementInput}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 px-4 text-sm text-slate-500 dark:text-slate-400">
        <p>Disclaimer: The prompt builder and optimizer might not be perfect. Please double-check the work.</p>
        <p className="mt-2">Made by Jacob Werner</p>
      </footer>
    </div>
  );
};

export default App;
