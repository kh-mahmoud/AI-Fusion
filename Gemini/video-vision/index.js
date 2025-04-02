// Import necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Internal video vision
const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = path.dirname(__filename); // Get the directory of the current module
const videoFileName = path.join(__dirname, "england.mp4"); // Define the path to the video file (replace with actual filename)

// Check if the video file exists; if not, throw an error
if (!fs.existsSync(videoFileName)) {
    throw new Error(`Video file not found: ${videoFileName}`);
}

export const run = async (prompt,url) => {
    // Read the video file and encode it in base64
    const videoBytes = fs.readFileSync(videoFileName, { encoding: "base64" });

    // Initialize GoogleGenerativeAI with the API key from the environment
    const ai = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" }); // Use the specified model for content generation

    // Generate content by sending a request with the video data and a prompt
    const result = await model.generateContent([
        prompt, // The prompt for the AI to describe the video
        {
            inlineData: {
                data: videoBytes, // Base64-encoded video data
                mimeType: "video/mp4", // The MIME type of the video
            },
        },
    ]);

    // Handle and output the AI's response
    console.log(result.response.text()); // Log the response text to the console
}

// External video vision (commented out example for fetching and analyzing a video from a URL)

// const videoUrl =url; // ✅ Replace with actual video URL

// export const run = async () => {
//     try {
//         // ✅ Step 1: Download the video as a buffer
//         const response = await fetch(videoUrl);
//         if (!response.ok) throw new Error(`Failed to fetch video: ${response.statusText}`);

//         const videoBuffer = Buffer.from(await response.arrayBuffer());

//         // ✅ Step 2: Convert buffer to Base64
//         const videoBase64 = videoBuffer.toString("base64");

//         const ai = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);
//         const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" });

//         // ✅ Step 3: Send Base64-encoded video to Gemini
//         const result = await model.generateContent([
//             "describe the video in detail",
//             {
//                 inlineData: {
//                     data: videoBase64, // ✅ Base64 data goes here
//                     mimeType: "video/mp4",
//                 },
//             },
//         ]);

//         // ✅ Handle the response
//         console.log(result.response.text());
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// };
