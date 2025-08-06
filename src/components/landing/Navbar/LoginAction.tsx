"use client";

import { authService } from "@/api/services/auth.services";
import { UserResponse } from "@/api/types/auth.types";
import Avatar from "@/components/admin/ui/Avatar/Avatar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginAction() {
    const [user, setUser] = useState<UserResponse>({} as UserResponse);

    const { isLogin, setIsLogin } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchData = async () => {
                const data = await authService.getUser();
                setUser(data);
            };
            setIsLogin(true);
            fetchData();
        }
    }, [setIsLogin]);

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
