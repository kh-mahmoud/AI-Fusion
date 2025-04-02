// Importing necessary modules
import * as dotenv from "dotenv"; // To load environment variables from .env file
import OpenAI from 'openai'; // OpenAI client for interacting with the API

// Load environment variables from a .env file
dotenv.config();

// Initialize OpenAI client with the provided API key and base URL for OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", // API endpoint for OpenRouter service
  apiKey: process.env.API_KEY, // API key loaded from environment variables
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Add your site URL for ranking purposes
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Add your site title for ranking purposes
  },
});

// Main function to make a request to OpenAI API and get a response
export async function meta_llama(prompt) {
  // Make a request to create a chat completion using the specified model
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.2-3b-instruct:free", // The model to use for generating responses
    messages: [
      {
        "role": "user", // Specifies the role of the message sender
        "content": prompt // The user's question
      }
    ],
  });

  // Log the response message from the AI model
  console.log(completion.choices[0].message); 
}
