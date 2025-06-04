import ReactMarkdown from "react-markdown";

interface ChatbotMessageProps {
    role: "user" | "assistant" | "system";
    message: string;
}

export default function ChatbotMessage({ role, message }: ChatbotMessageProps) {
    return (
        <div className={`dialog-buble ${role}`}>
            <ReactMarkdown>{message}</ReactMarkdown>
        </div>
    );
}
