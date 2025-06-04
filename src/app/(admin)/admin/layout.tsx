import "@/scss/admin.scss";
import Sidebar from "@/components/admin/layouts/Sidebar/Sidebar";
import Navbar from "@/components/admin/layouts/Navbar/Navbar";
import { publicSans } from "@/ui/fonts";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className={`${publicSans.className}`} style={{ overflowX: 'hidden' }}>
                <Sidebar />
                <div className="root-wrapper">
                    <Navbar />
                    <div className="main-wrapper container">{children}</div>
                </div>
            </body>
        </html>
    );
}
