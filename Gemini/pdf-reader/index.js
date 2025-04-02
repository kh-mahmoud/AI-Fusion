import { createPartFromUri, GoogleGenAI } from "@google/genai";
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from the .env file

// Initialize the AI instance with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

export async function run(prompt,url) {
    // Fetch the PDF from the URL as an ArrayBuffer
    const pdfBuffer = await fetch(url)
        .then((response) => response.arrayBuffer());

    // Create a Blob from the ArrayBuffer with the correct MIME type for a PDF
    const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    // Upload the file to the Google GenAI service
    const file = await ai.files.upload({
        file: fileBlob,
        config: {
            displayName: 'A17_FlightPlan.pdf', // Optional: You can set a display name for the file
        },
    });

    // Wait for the file to be processed by the AI (check the processing state)
    let getFile = await ai.files.get({ name: file.name });
    while (getFile.state === 'PROCESSING') {
        // Poll the status of the file until it is no longer being processed
        getFile = await ai.files.get({ name: file.name });
        console.log(`current file status: ${getFile.state}`);
        console.log('File is still processing, retrying in 5 seconds');

        // Wait for 5 seconds before checking again
        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });
    }

    // If file processing failed, throw an error
    if (file.state === 'FAILED') {
        throw new Error('File processing failed.');
    }

    // Prepare the content for the AI model, including a prompt and the processed file
    const content = [
        prompt, // Prompt asking the AI to summarize the document
    ];

    // Check if the file URI and MIME type exist before adding it to the content
    if (file.uri && file.mimeType) {
        const fileContent = createPartFromUri(file.uri, file.mimeType); // Add file content to the AI input
        content.push(fileContent);
    }

    // Generate content using the AI model with the provided file and prompt
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash', // The AI model to use for content generation
        contents: content, // Content includes the prompt and the uploaded file
    });

    // Output the generated response (summary of the document)
    console.log(response.text);
}
