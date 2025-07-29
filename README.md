# Prompt Perfect

**Prompt Perfect** is a modern, AI-powered web application designed to help users construct, refine, and optimize prompts for Large Language Models (LLMs). It provides a structured interface and leverages the Google Gemini API to transform basic ideas into highly effective, detailed prompts.

![App Screenshot](https://storage.googleapis.com/project-avocado-dev-images/prompt-perfect.png)

## Overview

Crafting the perfect prompt is an art. This application turns it into a science. By breaking down prompt creation into its core components—Persona, Task, Context, Format, and Constraints—it guides users toward clarity and specificity. The app then uses an AI to analyze the user's input and generate an optimized prompt, complete with an explanation of the changes made. For users who want to iterate further, a refinement feature allows them to provide feedback for continuous improvement.

## Features

-   **Structured Prompt Builder**: Guides users to create comprehensive prompts by filling out distinct fields for Persona, Task, Context, Format, and Constraints.
-   **Real-time Prompt Combination**: See your prompt components combine into a single, cohesive prompt as you type.
-   **Dual-Mode AI Optimization**: Choose between two optimization goals:
    -   **Balanced Mode**: Aims for the best possible output quality by enhancing clarity, detail, and structure.
    -   **Token Saver Mode**: Rewrites the prompt to be as concise as possible, preserving the core intent while minimizing token count for faster and cheaper API calls.
-   **Detailed Explanations**: The AI doesn't just rewrite your prompt—it explains *why* the changes were made, helping you become a better prompt engineer.
-   **Iterative Refinement Loop**: Not satisfied with the first optimization? Provide natural language feedback (e.g., "Make the tone more professional") and the AI will refine the prompt again based on your input.
-   **Responsive & Modern UI**: A clean, intuitive, and responsive interface built with TailwindCSS, featuring both light and dark modes.
-   **Copy-to-Clipboard**: Easily copy your generated or optimized prompts with a single click.

## Tech Stack

-   **Frontend**: [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **AI Integration**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
-   **Styling**: [TailwindCSS](https://tailwindcss.com/)
-   **Development Environment**: Buildless setup using ES Modules (`importmap`) served from a static server.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.0.0 or higher)
-   An active **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Configuration

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    This project uses `npm` to manage development dependencies like TypeScript types.
    ```bash
    npm install
    ```

3.  **Configure the API Key:**
    The application is hardcoded to look for the Gemini API key in `process.env.API_KEY`. In this client-side-only project, you must manually set it for the application to work.

    Open the file `services/geminiService.ts` and replace `process.env.API_KEY` with your actual API key string:

    ```typescript
    // In services/geminiService.ts

    // IMPORTANT: Replace this line with your actual key for local testing.
    const ai = new GoogleGenAI({ apiKey: "YOUR_GEMINI_API_KEY_HERE" }); 
    ```

    > **Security Warning**: Do NOT commit your API key to version control or deploy this code to a public-facing website with the key hardcoded. For a real production environment, you should build a backend proxy that securely manages and uses the API key, never exposing it to the client.

4.  **Run the application:**
    Since this is a static application with no build step, you can serve it with any simple local web server.

    A popular choice is `serve`:
    ```bash
    npx serve
    ```
    The application will be available at `http://localhost:3000` (or the port specified by the `serve` command).

## How to Use

1.  **Construct Your Prompt**: Fill out the fields in the "Construct Your Prompt" section on the left. Be as specific as you can.
2.  **Review**: Your combined prompt will appear in the "Your Generated Prompt" box.
3.  **Select Goal**: Choose your optimization goal: "Balanced" for quality or "Token Saver" for efficiency.
4.  **Optimize**: Click the "Optimize with AI" button.
5.  **Analyze Result**: The "AI Optimization Result" section will display the new, improved prompt and an explanation of the changes.
6.  **(Optional) Refine**: If the result isn't perfect, type your feedback into the "Refine Prompt" text area and click "Refine". The AI will try again based on your notes.
7.  **Copy & Use**: Click the copy icon to copy the final prompt to your clipboard.

---

*Disclaimer: The prompt builder and optimizer are powered by AI and might not be perfect. Please review and test the generated prompts before use in a production environment.*
