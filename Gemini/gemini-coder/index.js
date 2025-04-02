import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the GoogleGenerativeAI instance using the API key stored in environment variables
const ai = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);

// Configure the AI model with code execution capabilities
const model = ai.getGenerativeModel({
    model: 'gemini-1.5-pro', // Specifies the Gemini AI model to use
    tools: [
        {
            codeExecution: {}, // Enables the model to generate and execute code
        },
    ],
});

export const run = async (prompt) => {
    // Request AI to generate and execute code for summing the first 50 prime numbers
    const result = await model.generateContent(prompt);

    const response = result.response;

    // Output the AI-generated response to the console
    console.log(response.text());
};
