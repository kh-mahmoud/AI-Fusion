import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI instance using the API key stored in environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_API_KEY });

export async function run(message) {
    // Create a new chat instance with the Gemini AI model
    const chat = ai.chats.create({
        model: "gemini-2.0-flash", // Specifies the AI model to use
        history: [
            {
                role: "user", // Represents a user message in the chat history
                parts: [{ text: "Hello" }],
            },
            {
                role: "model", // Represents the AI's response in the chat history
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
            {
                role: "user", 
                parts: [{ text: message}],
            },
        ],
    });

    // ----- Normal chat response  -----
    // The following code sends a message to the AI and logs the response.
    // It is currently commented out but can be used for standard chat interactions.

    // const response1 = await chat.sendMessage({
    //     message: "I have 2 dogs in my house.",
    // });
    // console.log("Chat response 1:", response1.text);

    // ----- Streaming chat response -----
    // Instead of waiting for the entire response, this sends a message and processes the output in chunks.
    const stream1 = await chat.sendMessageStream({
        message: "Tell me about yourself and what you can do?",
    });

    // Iterate through the streamed response chunks and log them as they arrive
    for await (const chunk of stream1) {
        console.log(chunk.text);
    }
}
