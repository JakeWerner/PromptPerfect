
import React from 'react';
import { Prompt } from '../types';
import PromptInput from './PromptInput';
import { UserIcon, TargetIcon, BookIcon, ListIcon, BanIcon } from './icons';

interface PromptBuilderProps {
  promptParts: Prompt;
  onUpdate: (part: keyof Prompt, value: string) => void;
}

const PromptBuilder: React.FC<PromptBuilderProps> = ({ promptParts, onUpdate }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col gap-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Construct Your Prompt</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 -mt-4">
        Break down your request into components. The more specific you are, the better the result.
      </p>

      <PromptInput
        label="Persona / Role"
        placeholder="e.g., A witty copywriter"
        value={promptParts.persona}
        onChange={(e) => onUpdate('persona', e.target.value)}
        icon={<UserIcon />}
        rows={2}
        tooltipText="Define the AI's personality or role. E.g., 'a friendly and encouraging fitness coach' or 'a professional and formal business analyst'."
      />
      <PromptInput
        label="Task / Goal"
        placeholder="e.g., Write a product description"
        value={promptParts.task}
        onChange={(e) => onUpdate('task', e.target.value)}
        icon={<TargetIcon />}
        rows={3}
        tooltipText="Clearly state what you want the AI to do. Be specific. E.g., 'create a 7-day workout plan' or 'summarize the attached report into three bullet points'."
      />
      <PromptInput
        label="Context / Background"
        placeholder="e.g., The product is a smart coffee mug..."
        value={promptParts.context}
        onChange={(e) => onUpdate('context', e.target.value)}
        icon={<BookIcon />}
        rows={4}
        tooltipText="Provide background information the AI needs to complete the task. E.g., 'My current fitness level is beginner' or 'The report is about quarterly sales performance'."
      />
      <PromptInput
        label="Format / Output Structure"
        placeholder="e.g., A JSON object with 'name' and 'description' keys"
        value={promptParts.format}
        onChange={(e) => onUpdate('format', e.target.value)}
        icon={<ListIcon />}
        rows={2}
        tooltipText="Specify how you want the output structured. E.g., 'a JSON object', 'a markdown table', or 'a numbered list with bold headings'."
      />
      <PromptInput
        label="Constraints / Rules"
        placeholder="e.g., Use a formal tone, do not exceed 100 words"
        value={promptParts.constraints}
        onChange={(e) => onUpdate('constraints', e.target.value)}
        icon={<BanIcon />}
        rows={2}
        tooltipText="Set any rules or limitations for the AI. E.g., 'keep the tone informal', 'do not exceed 200 words', or 'avoid technical jargon'."
      />
    </div>
  );
};

export default PromptBuilder;
