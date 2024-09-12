"use client";

import { AuthProvider } from "@/app/lib/use-auth";
import Header from "./header";

export default function AuthHeader() {
    return (
        <AuthProvider>
            <Header/>
        </AuthProvider>
    )
}