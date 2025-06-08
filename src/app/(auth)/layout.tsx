import "@/scss/admin.scss";
import { publicSans } from "@/ui/fonts";
import Link from "next/link";

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
                                <img src="/img/logo/uns-logo.webp" alt="" />
                            </Link>
                            <div className="aside-title">
                                <h1>Selamat Datang</h1>
                                <h4>Di Portal Dashboard Akademik FKIP UNS</h4>
                            </div>
                        </div>
                        <div className="aside-illustration">
                            <img src="/img/illustration/login-illustration.png" alt="illustrations" />
                        </div>
                    </aside>
                    {children}
                </div>
            </body>
        </html>
    );
}
