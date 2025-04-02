import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

export async function run(prompt) {
    // Initialize the GoogleGenAI instance using the API key stored in environment variables
    const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

    // Request text embeddings from the Gemini AI model
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-exp-03-07', // Embedding model used for generating vector representations
        contents: prompt, // The input text for which embeddings are generated
    });

    // Output the generated embeddings to the console
    console.log(response.embeddings);
}
