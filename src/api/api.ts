// src/api/client.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://chatbot.admintokoplastik.my.id/";

const apiFile = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// Add request interceptor for auth with check for browser environment
apiFile.interceptors.request.use((config) => {
    // Periksa apakah kode sedang berjalan di browser
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add request interceptor for auth with check for browser environment
apiClient.interceptors.request.use((config) => {
    // Periksa apakah kode sedang berjalan di browser
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});


const apiAuth = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

// Add response interceptor for error handling
apiAuth.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response && error.response.status === 401) {
            // Redirect ke login atau refresh token
            if (typeof window !== "undefined") {
                // Arahkan ke halaman login jika di browser
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    },
);

export { apiClient, apiAuth, apiFile };
