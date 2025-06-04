"use client";

import { UserResponse } from "@/api/types/auth.types";
import { Thread } from "@/api/types/thread.types";
import { authService } from "@/api/services/auth.services";
import { threadService } from "@/api/services/thread.services";
import { useAuth } from "@/context/AuthContext";
import Icon from "@/components/admin/ui/Icon/Icon";
import ChatbotMessage from "./ChatbotMessage";
import ChatbotMessageLoading from "./ChatbotMessageLoading";
import chatbotAgent from "@/utils/langchain/agents";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";

const INITIAL_USER_STATE: UserResponse = {} as UserResponse;

export default function Chatbot() {
    const [isLoading, setIsLoading] = useState(true);
    const { isLogin, setIsLogin } = useAuth();
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<UserResponse>(INITIAL_USER_STATE);
    const [history, setHistory] = useState<Thread[]>([]);

    // Initialize login state from localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        }
    }, [setIsLogin]);

    // Fetch user data when logged in
    useEffect(() => {
        if (!isLogin) return;

        const fetchUser = async () => {
            try {
                const userData = await authService.getUser();
                setUser(userData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [isLogin]);

    // Fetch threads when user is logged in
    useEffect(() => {
        if (!isLogin) return;

        const fetchThreads = async () => {
            try {
                const threads = await threadService.getAll();
                setHistory(threads);
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
        } catch (error) {
            console.error("Error deleting thread:", error);
        }
    }, []);

    const handleSubmitMessage = useCallback(
        async (e?: FormEvent<HTMLFormElement>) => {
            if (e) {
                e.preventDefault();
            }

            const trimmedMessage = message.trim();
            if (!trimmedMessage) return;

            const resetMessage = () => setMessage("");
            const addToHistory = (thread: Thread) => setHistory((prev) => [...prev, thread]);
            const addErrorMessage = () =>
                addToHistory({
                    role: "assistant",
                    message: "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.",
                } as Thread);

            // Simpan pesan yang akan dikirim sebelum di-reset, untuk menghindari race condition
            const messageToSend = trimmedMessage;
            resetMessage(); // Reset input field segera

            try {
                // Add user message to history
                const userThreadPayload = {
                    role: "user" as const, // Pastikan tipe literal untuk role
                    message: messageToSend,
                };
                // Optimistic UI update untuk pesan pengguna
                // Anda mungkin ingin menambahkan ID sementara jika diperlukan untuk key
                addToHistory(userThreadPayload as Thread); // Asumsikan Thread kompatibel
                setIsMessageLoading(true);

                // Get chatbot response
                const response = await chatbotAgent(messageToSend); // Gunakan messageToSend
                const assistantThreadPayload = {
                    role: "assistant" as const, // Pastikan tipe literal untuk role
                    message: response.output as string,
                };
                const createdAssistantThread = await threadService.create(assistantThreadPayload);
                addToHistory(createdAssistantThread);
            } catch (error) {
                console.error("Error in chat process:", error);
                addErrorMessage();
            } finally {
                setIsMessageLoading(false);
            }
        },
        [message],
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

    // Fungsi render di bawah ini tidak mengembalikan JSX utama dari komponen,
    // melainkan JSX untuk bagian-bagian spesifik yang dipanggil dalam return utama.

    const renderChatHistory = () => (
        <ul className="dialog-list">
            <li className="dialog-item">
                <ChatbotMessage message={`Hallo ${user.name}. Selamat datang di Layanan Pengajuan Surat Online FKIP UNS. Ada yang bisa aku bantu?`} role="assistant" />
            </li>
            {history.map((item, index) => (
                <li key={index} className="dialog-item">
                    <ChatbotMessage message={item.message} role={item.role} />
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
            <button type="submit" className="form-button" disabled={isMessageLoading || !message.trim()}>
                <Icon icon="angle-right" />
            </button>
        </form>
    );

    return (
        <div className="chatbot">
            {!isShowDialog && (
                <button className="chatbot-button" onClick={toggleDialog}>
                    <img src="icon/chatbot.png" alt="chatbot icon" />
                </button>
            )}

            {isShowDialog && (
                <div className="chatbot-dialog">
                    {/* Header */}
                    <div className="dialog-header">
                        <div className="header-avatar">
                            <img src="/icon/chatbot.png" alt="Lofbot avatar" />
                        </div>
                        <div className="header-info">
                            <h4>Lofbot</h4>
                            <span>Asisten Akademik</span>
                        </div>
                        <div className="header-action">
                            {isLogin && (
                                <button className="button-delete" onClick={handleDeleteThread}>
                                    <Icon icon="trash" />
                                </button>
                            )}
                            <button className="button-toggle" onClick={toggleDialog}>
                                <Icon icon="chevron-right" />
                            </button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div>
                    ) : (
                        <>
                            <div className="dialog-body">{isLogin ? renderChatHistory() : renderLoginPrompt()}</div>

                            <div className="dialog-footer">{isLogin && renderMessageForm()}</div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
