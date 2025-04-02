import { GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Initialize the GoogleGenAI instance with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

export const run = async (prompt) => {
  // Generate content using the specified Gemini AI model
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash", // Available options: gemini-2.0-flash-lite, gemini-1.5-flash, gemini-1.5-pro
    contents: prompt, // Input prompt for AI to generate a response
  });

  // Output the generated response to the console
  console.log(response.text);
}
