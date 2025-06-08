// src/utils/langchain/agents.ts

import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import Tools from "./tools";
import { llm } from "./llm";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

// Hapus instansiasi BufferMemory yang sebelumnya ada di sini

export default async function chatbotAgent(query: string, chatHistory: (HumanMessage | AIMessage)[]) {
    const tools = Tools;

    const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            `Kamu adalah chatbot layanan pengajuan surat online FKIP UNS. yang dimana user bisa bertanya terkait 
            - jenis surat yang bisa diajukan, 
            - persyaratan yang dibutuhkan untuk mengajukan surat tertentu
            - mengecek status pengajuan surat yang terakhir mereka ajukan
            - mengecek status pengajuan surat berdasarkan code
            - arti dari masing-masing status pada pengajuan surat
        `,
        ],
        new MessagesPlaceholder("chat_history"), // Gunakan MessagesPlaceholder untuk riwayat chat
        ["human", "{input}"],
        ["placeholder", "{agent_scratchpad}"],
    ]);

    const agent = createToolCallingAgent({
        llm,
        tools,
        prompt,
    });

    const agentExecutor = new AgentExecutor({
        agent,
        tools,
        // Hapus `memory` dari sini karena sudah dikelola oleh client
    });

    const result = await agentExecutor.invoke({
        input: query,
        chat_history: chatHistory, // Kirim riwayat chat ke agent
    });

    return result;
}
