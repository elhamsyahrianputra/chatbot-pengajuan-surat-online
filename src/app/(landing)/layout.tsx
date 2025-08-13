import type { Metadata } from "next";
import { roboto } from "@/ui/fonts";
import "@/scss/landing.scss";
import Navbar from "@/components/landing/Navbar/Navbar";
import Footer from "@/components/landing/Footer/Footer";
import Chatbot from "@/components/landing/Home/Chatbot/Chatbot";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
    title: "Akademik FKIP UNS",
    description: "Akademik FKIP UNS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.className}`}>
                <AuthProvider>
                    <Navbar />
                    {children}
                    <Chatbot />
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
