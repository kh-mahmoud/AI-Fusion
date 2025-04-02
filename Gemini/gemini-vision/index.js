import { GoogleGenerativeAI } from "@google/generative-ai";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from the .env file

const ai = new GoogleGenerativeAI(process.env.GEMENI_API_KEY); // Initialize AI with API key

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/************** Local Image Processing (Commented Out) *****************/

// Converts a local image to a format compatible with AI processing
// function fileToGenerativePart(imgPath, mimeType) {
//     return {
//         inlineData: {
//             data: fs.readFileSync(path.join(__dirname, imgPath)).toString("base64"), // Read image as base64
//             mimeType, // Set image type
//         },
//     };
// }

export async function run(prompt,url) {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-pro" }); // Use the Gemini AI model

    // Fetch an external image from a URL and convert it into an ArrayBuffer
    const imageResp = await fetch(url).then((response) => response.arrayBuffer());

    /************** Local Image Vision *****************/
    
    // Process a local image and get AI-generated content
    // const imageParts = [fileToGenerativePart("image.jpg", "image/jpg")];
    // const result = await model.generateContent([prompt, ...imageParts]);
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);

    /************ External Image Vision ******************/

    // Generate AI response based on an external image
    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"), // Convert image buffer to base64
                mimeType: "image/jpg", // Specify the image format
            },
        },
        prompt,
    ]);

    console.log(result.response.text()); // Output AI-generated description
}
