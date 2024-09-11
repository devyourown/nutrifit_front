import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setToken(token);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('jwt', token);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem('jwt');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};