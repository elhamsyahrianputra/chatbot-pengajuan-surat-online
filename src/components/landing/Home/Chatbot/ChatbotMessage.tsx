import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatbotMessageProps {
    role: "user" | "assistant" | "system";
    message: string;
}

export default function ChatbotMessage({ role, message }: ChatbotMessageProps) {
    // Ganti === (atau varian === dengan spasi) dengan dua line break
    const formattedMessage = message.replace(/^\s*={3,}\s*$/gm, "___");

    return (
        <div className={`dialog-buble ${role}`}>
            <ReactMarkdown  remarkPlugins={[remarkGfm]}>{formattedMessage}</ReactMarkdown>
        </div>
    );
}
