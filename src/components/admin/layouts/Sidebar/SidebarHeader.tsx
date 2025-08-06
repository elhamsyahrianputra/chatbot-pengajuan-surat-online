import Image from "next/image";
import Link from "next/link";

export default function SidebarHeader() {
    return (
        <div className="sidebar-header">
            <Link href="/" className="sidebar-brand">
                <Image src="/img/logo/uns-logo.webp" alt="" className="sidebar-brand-icon" width={20} height={20} />
                <span className="sidebar-brand-text">FKIP UNS</span>
            </Link>
        </div>
    );
}
