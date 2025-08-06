import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// export const llm = new ChatOpenAI({
//     // modelName: "deepseek/deepseek-chat-v3-0324:free",
//     modelName: "qwen/qwen3-8b:free",
//     temperature: 0.8,
//     streaming: true,
//     maxTokens: 5400,

//     openAIApiKey: "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",
//     configuration: {
//         baseURL: "https://openrouter.ai/api/v1",
//     },
// });

// export const llm = new ChatOllama({
//     model: 'qwen3:8b'
// });

export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyAhWXEiL4EOQYWXJNMbrddSbVIv9rNZ6Gw",
});
