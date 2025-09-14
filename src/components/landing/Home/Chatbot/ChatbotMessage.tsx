import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { useState } from "react";
import { caseService } from "@/api/services/case.services";
import { feedbackService } from "@/api/services/feedback.services";
import { authService } from "@/api/services/auth.services";

interface ChatbotMessageProps {
    role: "user" | "assistant" | "system";
    message: string;
    problem: string;
}

export default function ChatbotMessage({ role, message, problem }: ChatbotMessageProps) {
    const formattedMessage = message.replace(/^\s*={3,}\s*$/gm, "___");
    const [isActive, setIsActive] = useState<string | null>(null);

    async function handleActive(active: "like" | "dislike") {
        // Hentikan fungsi jika salah satu tombol sudah pernah diklik
        if (isActive !== null) return;

        setIsActive(active);

        const caseRecord = await caseService.getByProblem(problem);
        const user = await authService.getUser();

        if (!caseRecord) {
            const newCaseRecord = await caseService.create({
                problem,
                frequency: 1,
            });

            console.log(newCaseRecord);
            console.log(newCaseRecord.id);

            await feedbackService.create({
                case_record_id: newCaseRecord.id,
                type: active,
                user_id: user.id,
            });
        } else {
            await caseService.update(caseRecord.id, {
                frequency: caseRecord.frequency + 1,
            });
            await feedbackService.create({
                case_record_id: caseRecord.id,
                type: active,
                user_id: user.id,
            });
        }
    }

    return (
        <>
            <div className={`dialog-buble ${role}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{formattedMessage}</ReactMarkdown>
            </div>
            {role === "assistant" && problem && (
                <div className="like-action">
                    <LikeActionButton type="like" tooltip="Membantu" active={isActive} onClick={() => handleActive("like")} disabled={isActive !== null} />
                    <LikeActionButton type="dislike" tooltip="Tidak Membantu" active={isActive} onClick={() => handleActive("dislike")} disabled={isActive !== null} />
                </div>
            )}
        </>
    );
}

function LikeActionButton({
    type,
    tooltip,
    active,
    onClick,
    disabled,
}: {
    type: "like" | "dislike";
    tooltip: string;
    active: string | null;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
}) {
    return (
        <button className={`like-button ${active === type ? "active" : ""}`} onClick={onClick} disabled={disabled}>
            {active !== type ? (
                <Image className={type == "dislike" ? "rotate" : ""} src="/icon/like.svg" alt="like icon" width={16} height={16} />
            ) : (
                <Image className={type == "dislike" ? "rotate" : ""} src="/icon/like-fill.svg" alt="like icon" width={16} height={16} />
            )}
            <span className="tooltiptext">{tooltip}</span>
        </button>
    );
}
