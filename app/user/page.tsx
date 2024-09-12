"use client";

import User from '../components/ui/user/user';
import { AuthProvider } from '../lib/use-auth';

export default function UserProfile() {
    return (
        <AuthProvider><User/></AuthProvider>
    );
}
