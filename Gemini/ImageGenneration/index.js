import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';

// Initialize the AI instance with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

export async function generateImage(prompt) {
  // Define the prompt for image generation
  const contents = prompt;

  try {
    // Request AI to generate content, specifying that both text and image responses are allowed
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation', // Specify the image generation model
      contents: contents,
      config: {
        responseModalities: ['Text', 'Image'], // Allow AI to return both text and image responses
      },
    });

    // Iterate through the response parts to handle both text and image outputs
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text); // Log any text response from the AI
      } else if (part.inlineData) {
        // If an image is returned, decode and save it as a file
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64'); // Convert base64 image data to buffer
        fs.writeFileSync('gemini-native-image.png', buffer); // Save the image to a file
        console.log('Image saved as gemini-native-image.png'); // Log the saved file name
      }
    }
  } catch (error) {
    console.error("Error generating content:", error); // Handle any errors in the API call
  }
}
