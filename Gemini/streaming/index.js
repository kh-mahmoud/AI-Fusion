// Import necessary modules
import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config()

// Initialize GoogleGenAI instance with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

export async function run(prompt) {
  // Call the generateContentStream method to get streamed content from the AI model
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash", // Specify the AI model to use for content generation
    contents: prompt, // The input prompt to be processed by the model
  });

  // Loop through the streamed response chunks and log the text content
  for await (const chunk of response) {
    console.log(chunk.text); // Output the text of each chunk to the console
  }
}
