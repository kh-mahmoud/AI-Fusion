// Importing necessary modules for interacting with Azure's AI model inference API
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference"; // Azure AI Model client for inference
import { AzureKeyCredential } from "@azure/core-auth"; // For authenticating with Azure using API key
import * as dotenv from "dotenv"; // To load environment variables from .env file

// Load environment variables from a .env file
dotenv.config();

// Retrieve the API token from environment variables (or generate one on github marketplace)
const token = process.env.TOKEN;
// The Azure endpoint for AI model inference
const endpoint = "https://models.inference.ai.azure.com";
// The name of the model that will be used for inference
const modelName = "DeepSeek-R1";

// The main function that will make the request to the Azure API
export async function deep_run(prompt) {

  // Initialize the Azure ModelClient with the endpoint and authentication token
  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token), // Provides API token for authentication
  );

  // Make a POST request to the Azure API's /chat/completions endpoint
  const response = await client.path("/chat/completions").post({
    body: {
      // The messages for the model to process
      messages: [
        { role:"user", content: prompt } // User's question
      ],
      max_tokens: 1000, // Maximum tokens in the response (prevents too long responses)
      model: modelName // Specify which model to use
    }
  });

  // Check if there is an unexpected error in the response
  if (isUnexpected(response)) {
    throw response.body.error; // If an unexpected error occurs, throw it
  }

  // Log the model's response (the AI's answer to the user's question)
  console.log(response.body.choices[0].message.content); 
}
