import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyAhWXEiL4EOQYWXJNMbrddSbVIv9rNZ6Gw",
});
