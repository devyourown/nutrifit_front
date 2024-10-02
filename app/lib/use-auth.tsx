import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { generateUniqueId } from "./generator";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null;
    authLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        setToken(token);
        setLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('jwt', token);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem('jwt');
        setToken(null);
        localStorage.clear();
        localStorage.setItem('id', generateUniqueId());
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn: token != null, login, logout, token, authLoading: loading }}>
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