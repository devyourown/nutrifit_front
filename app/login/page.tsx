"use client";

import Login from "../components/ui/auth/login";
import { AuthProvider } from "../lib/use-auth";

export default function Page() {
    return (
        <AuthProvider><Login/></AuthProvider>
    )
}
