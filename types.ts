export interface Prompt {
  persona: string;
  task: string;
  context: string;
  format: string;
  constraints: string;
}

export type OptimizationMode = 'default' | 'token_saver';

export interface OptimizedPromptResponse {
  prompt: string;
  explanation: string;
}