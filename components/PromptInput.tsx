
import React from 'react';
import { InfoIcon } from './icons';

interface PromptInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  icon: React.ReactElement<{ className?: string }>;
  rows?: number;
  tooltipText?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ label, value, onChange, placeholder, icon, rows = 3, tooltipText }) => {
  const inputId = `prompt-input-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <label htmlFor={inputId} className="flex items-center gap-2 text-md font-semibold text-slate-700 dark:text-slate-300">
          {React.cloneElement(icon, { className: "h-5 w-5 text-indigo-400" })}
          {label}
        </label>
        {tooltipText && (
          <div className="relative group flex items-center">
            <InfoIcon className="h-4 w-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-help" />
            <div role="tooltip" className="absolute bottom-full left-1/2 z-20 w-64 p-3 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none dark:bg-slate-200 dark:text-slate-800 font-normal">
              {tooltipText}
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-slate-800 dark:border-t-slate-200"></div>
            </div>
          </div>
        )}
      </div>
      <textarea
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />
    </div>
  );
};

export default PromptInput;
