import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyANuD94WTrrHPrL-GR6WvPesRY_Q7VzF28",
});
