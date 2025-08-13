import "@/scss/admin.scss";
import { publicSans } from "@/ui/fonts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login - Akademik FKIP UNS",
    description: "Akademik FKIP UNS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body id="auth" className={`${publicSans.className}`}>
                <div className="auth-wrapper">
                    <aside className="aside-layout">
                        <div className="aside-header">
                            <Link href="/">
                                <Image src="/img/logo/uns-logo.webp" alt="awefawef" height={10} width={10} />
                            </Link>
                            <div className="aside-title">
                                <h1>Selamat Datang</h1>
                                <h4>Di Portal Dashboard Akademik FKIP UNS</h4>
                            </div>
                        </div>
                        <div className="aside-illustration">
                            <Image src="/img/illustration/login-illustration.png" alt="illustrations" width={432} height={345}/>
                        </div>
                    </aside>
                    {children}
                </div>
            </body>
        </html>
    );
}
