
import { GoogleGenAI, Type } from "@google/genai";
import { OptimizedPromptResponse, OptimizationMode } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    prompt: {
      type: Type.STRING,
      description: "The new, optimized prompt."
    },
    explanation: {
      type: Type.STRING,
      description: "A brief, clear explanation of the changes made and why they will lead to a better result. Focus on concepts like clarity, specificity, context, and role-setting. If token saving was requested, explain how the prompt was made more concise. If refining, explain how the feedback was incorporated."
    }
  },
  required: ['prompt', 'explanation']
};


export const optimizePrompt = async (originalPrompt: string, mode: OptimizationMode): Promise<OptimizedPromptResponse> => {
  try {
    const defaultInstruction = `You are an expert in prompt engineering. Your task is to refine and optimize user-provided prompts to get the best possible results from a large language model. Analyze the user's prompt and rewrite it to be clearer, more specific, and better structured. Return your response strictly as a JSON object matching the defined schema.`;
    const tokenSaverInstruction = `You are an expert in prompt engineering with a focus on token efficiency. Your task is to rewrite the user-provided prompt to be as concise as possible while preserving the core intent and expected output quality. The goal is to minimize the number of tokens used in the prompt. Return your response strictly as a JSON object matching the defined schema.`

    const systemInstruction = mode === 'token_saver' ? tokenSaverInstruction : defaultInstruction;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please analyze and optimize the following prompt:\n\n---START PROMPT---\n${originalPrompt}\n---END PROMPT---`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3,
      },
    });

    let jsonStr = response.text.trim();
    const parsedJson = JSON.parse(jsonStr) as OptimizedPromptResponse;
    
    if (!parsedJson.prompt || !parsedJson.explanation) {
        throw new Error("Invalid JSON response from API. Missing required fields.");
    }
    
    return parsedJson;

  } catch (error) {
    console.error("Error optimizing prompt:", error);
    if (error instanceof Error && error.message.includes("JSON")) {
         throw new Error("Failed to get a valid optimization from the AI. Please try again with a more specific prompt.");
    }
    throw new Error("An error occurred while communicating with the AI service.");
  }
};

export const refinePrompt = async (currentPrompt: string, feedback: string, mode: OptimizationMode): Promise<OptimizedPromptResponse> => {
  try {
    const baseInstruction = `You are an expert in prompt engineering, currently refining a prompt based on user feedback. The user was not fully satisfied with the output from the previous prompt. Your task is to modify the prompt to incorporate their specific feedback, improving its alignment with their desired outcome while preserving the original intent.`;
    const tokenSaverModifier = `Focus on making the prompt as token-efficient as possible during this refinement.`;
    
    const defaultInstruction = `${baseInstruction} Return your response strictly as a JSON object matching the defined schema.`;
    const tokenSaverInstruction = `${baseInstruction} ${tokenSaverModifier} Return your response strictly as a JSON object matching the defined schema.`;
    
    const systemInstruction = mode === 'token_saver' ? tokenSaverInstruction : defaultInstruction;

    const contents = `Here is the prompt that needs refinement:
---START PROMPT---
${currentPrompt}
---END PROMPT---

Here is the user's feedback on what was wrong with the output from this prompt:
---START FEEDBACK---
${feedback}
---END FEEDBACK---

Please rewrite the prompt to address this feedback.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.4, // Slightly higher temp for more creative refinement
        },
    });

    let jsonStr = response.text.trim();
    const parsedJson = JSON.parse(jsonStr) as OptimizedPromptResponse;

    if (!parsedJson.prompt || !parsedJson.explanation) {
        throw new Error("Invalid JSON response from API. Missing required fields.");
    }

    return parsedJson;

  } catch (error) {
    console.error("Error refining prompt:", error);
    if (error instanceof Error && error.message.includes("JSON")) {
         throw new Error("Failed to get a valid refinement from the AI. Please try again with different feedback.");
    }
    throw new Error("An error occurred while communicating with the AI service for refinement.");
  }
};
