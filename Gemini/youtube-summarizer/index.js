// Import the necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Initialize the GoogleGenerativeAI instance with the API key from the environment
const ai = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);

// Get the generative model, using a specific model version ("gemini-1.5-pro")
const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });

export const run = async (prompt,url) => {
    // Generate content by providing a prompt and video file data (URL of the video)
    const result = await model.generateContent([
        // Prompt to ask about the main idea of the video
        "what is the main idea of this video?",
        {
            fileData: {
                fileUri: url, // URL of the video to analyze
            },
        },
        // Additional prompt to request details at specific timestamps in the video
        { text: prompt }
    ]);

    // Log the AI's response to the console
    console.log(result.response.text());
}
