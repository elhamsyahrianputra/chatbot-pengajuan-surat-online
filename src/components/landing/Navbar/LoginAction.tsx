"use client";

import { authService } from "@/api/services/auth.services";
import { UserResponse } from "@/api/types/auth.types";
import Avatar from "@/components/admin/ui/Avatar/Avatar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginAction() {
    const [user, setUser] = useState<UserResponse>({
        id: "",
        role: "",
        email: "",
        name: "",
    });

    const { isLogin, setIsLogin } = useAuth();
    const router = useRouter();

    async function handleLogout() {
        await authService.logout();
        localStorage.removeItem("token");
        setIsLogin(false);
        router.push('/login');
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            const fetchData = async () => {
                const data = await authService.getUser({ include: "profile" });
                setUser(data);
            };
            setIsLogin(true);
            fetchData();
        }
    }, []);

    return (
        <div className="navbar-action">
            {isLogin ? (
                <>
                    <div className="action-user">
                        <Avatar gender={user.profile?.gender || 'male'} className="login-avatar" />
                        <span>{user.name}</span>
                    </div>
                    <Link href="/admin" className="button-logout">
                        Dashboard
                    </Link>
                </>
            ) : (
                <Link href="/login" className="button-logout">
                    Login
                </Link>
            )}
        </div>
    );
}
