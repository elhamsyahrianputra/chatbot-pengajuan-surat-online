"use client";

import { UserResponse } from "@/api/types/auth.types";
import { Thread } from "@/api/types/thread.types";
import { authService } from "@/api/services/auth.services";
import { threadService } from "@/api/services/thread.services";
import { useAuth } from "@/context/AuthContext";
import ChatbotMessage from "./ChatbotMessage";
import ChatbotMessageLoading from "./ChatbotMessageLoading";
import chatbotAgent from "@/utils/langchain/agents";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import Image from "next/image";
import { default as IconAdmin } from "@/components/admin/ui/Icon/Icon";
import Icon from "@/components/Icon/Icon";

export default function Chatbot() {
    const dialogBodyRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const { isLogin, setIsLogin } = useAuth();
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<UserResponse>({} as UserResponse);
    const [history, setHistory] = useState<Thread[]>([]);
    const [chatHistoryForAgent, setChatHistoryForAgent] = useState<(HumanMessage | AIMessage)[]>([]);

    useEffect(() => {
        if (dialogBodyRef.current) {
            const { scrollHeight, clientHeight } = dialogBodyRef.current;
            dialogBodyRef.current.scrollTop = scrollHeight - clientHeight;
        }
    }, [history, isShowDialog]);

    // Initialize login state from localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchUser = async () => {
            const user = await authService.getUser();
            setUser(user);
            setIsLoading(false);
        };

        if (token) {
            setIsLogin(true);
            fetchUser();
        }
    }, [setIsLogin]);

    // Fetch user data when logged in
    useEffect(() => {
        if (!isLogin) return;

        const fetchThreads = async () => {
            try {
                const threads = await threadService.getAll();
                setHistory(threads);

                const loadedHistory = threads.map((item) => {
                    if (item.role === "user") {
                        return new HumanMessage(item.message);
                    } else {
                        return new AIMessage(item.message);
                    }
                });
                setChatHistoryForAgent(loadedHistory);
            } catch (error) {
                console.error("Error fetching threads:", error);
            }
        };
        fetchThreads();
    }, [isLogin]);

    const handleDeleteThread = useCallback(async () => {
        const confirmed = window.confirm("Apakah Anda yakin ingin menghapus thread ini?");
        if (!confirmed) return;

        try {
            await threadService.delete();
            setHistory([]);
            setChatHistoryForAgent([]);
        } catch (error) {
            console.error("Error deleting thread:", error);
        }
    }, []);

    const handleSubmitMessage = useCallback(
        async (e?: FormEvent<HTMLFormElement>) => {
            if (e) e.preventDefault();
            const trimmedMessage = message.trim();
            if (!trimmedMessage) return;

            const messageToSend = trimmedMessage;
            setMessage("");

            setHistory((prev) => [...prev, { role: "user", message: messageToSend } as Thread]);
            const newHumanMessage = new HumanMessage(messageToSend);
            setChatHistoryForAgent((prev) => [...prev, newHumanMessage]);
            setIsMessageLoading(true);
            await threadService.create({
                role: "user",
                message: messageToSend,
            });

            try {
                const response = await chatbotAgent(messageToSend, chatHistoryForAgent); // <-- Kirim history

                const assistantResponse = response.output as string;

                const assistantThreadPayload = { role: "assistant" as const, message: assistantResponse };
                const createdAssistantThread = await threadService.create(assistantThreadPayload);

                setHistory((prev) => [...prev, createdAssistantThread]);
                const newAiMessage = new AIMessage(assistantResponse);
                setChatHistoryForAgent((prev) => [...prev, newAiMessage]);
            } catch (error) {
                console.log(error);
            } finally {
                setIsMessageLoading(false);
            }
        },
        [message, chatHistoryForAgent],
    );

    const toggleDialog = useCallback(() => setIsShowDialog((prev) => !prev), []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            // Ubah menjadi React.KeyboardEvent
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (message.trim()) {
                    handleSubmitMessage();
                }
            }
        },
        [handleSubmitMessage, message],
    );

    const renderChatHistory = () => (
        <ul className="dialog-list">
            <li className="dialog-item">
                <ChatbotMessage message={`Hallo ${user.name}. Selamat datang di Layanan Pengajuan Surat Online FKIP UNS. Ada yang bisa aku bantu?`} role="assistant" />
            </li>
            {history.map((item, index) => (
                <li key={index} className="dialog-item">
                    <ChatbotMessage message={item.message} role={item.role} />
                    {/* {item.role == "assistant" && <FeedbackOption />} */}
                </li>
            ))}
            {isMessageLoading && (
                <li className="dialog-item">
                    <ChatbotMessageLoading />
                </li>
            )}
        </ul>
    );

    const renderLoginPrompt = () => (
        <div className="dialog-login">
            <span className="text-login">
                Untuk menggunakan <b>Chatbot</b>, silahkan <b>Login</b> terlebih dahulu
            </span>
            <Link href="/login" className="button-login">
                Login
            </Link>
        </div>
    );

    const renderMessageForm = () => (
        <form className="footer-form" onSubmit={handleSubmitMessage}>
            <textarea
                className="form-message"
                placeholder="Masukkan pesan anda..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isMessageLoading}
            />
            <button type="submit" className="form-button" disabled={isMessageLoading || !message.trim()} style={{ color: '#ffffff' }}>
                <IconAdmin icon="chevron-right-white" />
            </button>
        </form>
    );

    return (
        <div className="chatbot">
            {!isShowDialog && (
                <button className="chatbot-button" onClick={toggleDialog}>
                    <Image src="/icon/chatbot.png" alt="chatbot icon" width={20} height={20} />
                </button>
            )}

            {isShowDialog && (
                <div className="chatbot-dialog">
                    {/* Header */}
                    <div className="dialog-header">
                        <div className="header-avatar">
                            <Image src="/icon/chatbot.png" alt="Lofbot avatar" width={30} height={30} />
                        </div>
                        <div className="header-info">
                            <h4>Lofbot</h4>
                            <span>Asisten Akademik</span>
                        </div>
                        <div className="header-action">
                            {isLogin && (
                                <button className="button-delete" onClick={handleDeleteThread} style={{ color: '#ffffff' }}>
                                    <IconAdmin icon="trash" />
                                </button>
                            )}
                            <button className="button-toggle" onClick={toggleDialog} style={{ color: '#ffffff' }}>
                                <IconAdmin icon="chevron-right-white" />
                            </button> 
                        </div>
                    </div>

                    <div className="dialog-body" ref={dialogBodyRef}>
                        {isLogin ? (
                            isLoading ? (
                                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div>
                            ) : (
                                renderChatHistory()
                            )
                        ) : (
                            renderLoginPrompt()
                        )}
                    </div>
                    <div className="dialog-footer">{isLogin && renderMessageForm()}</div>
                </div>
            )}
        </div>
    );
}
