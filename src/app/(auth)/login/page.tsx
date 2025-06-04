"use client";

import { authService } from "@/api/services/auth.services";
import { LoginResponse, UserResponse } from "@/api/types/auth.types";
import Button from "@/components/admin/ui/Button/Button";
import FormFloating from "@/components/admin/ui/Form/FormFloating";
import { useRouter } from "next/navigation";
import { FormHTMLAttributes, useEffect, useState } from "react";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<UserResponse>({} as UserResponse);

    const router = useRouter();

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            // Tambahkan validasi input sederhana
            if (!email || !password) {
                console.error("Email dan password diperlukan");
                return;
            }

            // Panggil API login
            const response = await authService.login({
                email,
                password,
            });

            // Pastikan response berisi token sebelum menyimpannya
            if (response && response.token) {
                // Simpan token ke localStorage
                localStorage.setItem("token", response.token);
                const user = await authService.getUser();
                setUser(user);

                if (user.role === "admin") {
                    router.push("/admin");
                }
                if (user.role === "student") {
                    router.push("/");
                }
            } else {
                // Handle kasus dimana response ada tapi tidak memiliki token
                console.error("Login berhasil tapi token tidak ditemukan");
            }
        } catch (error) {
            // Handle error dari API
            console.error("Login gagal:", error);
        }
    }

    return (
        <main id="login">
            <div className="login-layout">
                <div className="login-title">
                    <h2>Login</h2>
                    <h4> Silahkan Masukan Email dan Password pada form dibawah ini.</h4>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="email-input">
                        <FormFloating label="Email address" name="email" fixed={true} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password-input">
                        <span className="forgot-password-text">Forgot password?</span>
                        <FormFloating type="password" label="Password" name="password" fixed={true} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button color="black" className="mt-4">
                        Login
                    </Button>
                </form>
            </div>
        </main>
    );
}
