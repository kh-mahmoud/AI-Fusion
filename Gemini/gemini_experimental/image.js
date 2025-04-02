import OpenAI from 'openai';
import * as dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Initialize OpenAI instance with OpenRouter API configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", // Use OpenRouter's API endpoint
  apiKey: process.env.API_KEY, // Retrieve API key from environment variables
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Used for rankings on OpenRouter.
    "X-Title": "<YOUR_SITE_NAME>", // Optional. Used for rankings on OpenRouter.
  },
});

export async function run(prompt,url) {
  // Send a chat completion request using the Gemini AI model
  const completion = await openai.chat.completions.create({
    model: "google/gemini-2.5-pro-exp-03-25:free", // Specify the AI model to use
    messages: [
      {
        "role": "user", // Define the user's message
        "content": [
          {
            "type": "text", // First part of the message is text
            "text": prompt
          },
          {
            "type": "image_url", // Second part is an image URL
            "image_url": {
              "url": url
            }
          }
        ]
      }
    ],
  });

  // Log the AI-generated response message
  console.log(completion.choices[0]?.message);
}
