import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config(); // Load environment variables from a .env file

// Initialize the AI instance with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function run(prompt,url) {
  // Define the local image file path
  const localImagePath = path.join(__dirname, "/image.jpg");

  // Upload the local image to be used for AI processing
  const image = await ai.files.upload({
    file: localImagePath,
  });

  // Fetch an external image as an array buffer
  const imageResp = await fetch(url).then((response) => response.arrayBuffer());

  // Generate content using the AI model with the uploaded local image
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash", // AI model being used for content generation
    contents: [
      createUserContent([
        prompt, // Text prompt for the AI
        createPartFromUri(image.uri, image.mimeType), // Attach the uploaded local image
        // createPartFromBase64(Buffer.from(imageResp).toString("base64"), "image/jpg") // Uncomment for external image usage
      ]),
    ],
  });

  // Log the AI's response
  console.log(response.text);
}
