
import { createContext, useContext, useState } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const saveSession = (data, email) => {
        const authenticatedUser = {
            token: data.token,
            role: data.role,
            fullName: data.fullName,
            email,
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(authenticatedUser));

        setUser(authenticatedUser);

        return authenticatedUser;
    };

    const login = async (email, password) => {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        return saveSession(response.data, email);
    };

    const register = async (fullName, email, password) => {
        const response = await api.post("/auth/register", {
            fullName,
            email,
            password,
        });

        return saveSession(response.data, email);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
