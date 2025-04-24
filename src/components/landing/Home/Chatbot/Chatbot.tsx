'use client';

import { useState } from "react";

export default function Chatbot() {

    const [isOpen, setIsOpen] = useState(false);

    function handleIsOpen(value: boolean) {
        setIsOpen(value);
    }

    return (
        <div className="chatbot">
            <div className={`chatbot-icon ${!isOpen ? '' : 'chatbot-none'}`} onClick={() => handleIsOpen(true)}>
                <img src="/icon/customer-service.png" alt="" />
            </div>
            <div className={`chatbot-chat ${!isOpen ? 'chatbot-none' : ''}`}>
                <div className="chat-title">
                    <span>Chatbot FKIP UNS</span>
                    <button className="close-button"  onClick={() => handleIsOpen(false)}>x</button>
                </div>
                <div className="chat-main">
                    <div className="chat-bot">
                        <p>Hallo selamat datang di Layanan Chatbot FKIP UNS, ada yang bisa saya bantu?</p>
                    </div>
                    <div className="chat-user">
                        <p>Hallo, bisakah saya bertanya terkait syarat pengajuan surat ijin penelitian?</p>
                    </div>
                    <div className="chat-bot">
                        <p>Ya tentu, dengan senang hati!.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
