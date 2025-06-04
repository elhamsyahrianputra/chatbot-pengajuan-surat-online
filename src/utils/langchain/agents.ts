import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createToolCallingAgent } from "langchain/agents";
import { AgentExecutor } from "langchain/agents";
import { getLetterRequirements, getNewestLetterSubmissions, getLetterTypes, explainLetterStatus, getLetterSubmissionsByCode } from "./tools";
import { llm } from "./llm";

export default async function chatbotAgent(query: string) {
    const tools = [getLetterTypes, getLetterRequirements, getNewestLetterSubmissions, explainLetterStatus, getLetterSubmissionsByCode];
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
    });

    const result = await agentExecutor.invoke({ input: query });
    return result;
}
