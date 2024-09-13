"use client";


import Callback from '@/app/components/ui/auth/callback';
import { AuthProvider } from '@/app/lib/use-auth';
import { useEffect, useState } from 'react';

export default function Page({params}: { params: {service: string}}) {
    const [code, setCode] = useState('');
    const [state, setState] = useState('');
    const [replace, setReplace] = useState('');
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setCode(queryParams.get('code')!);
        setState(queryParams.get('state')!);
        setReplace(queryParams.get('replace')!);
    }, []);
    return code && <AuthProvider><Callback service={params.service} code={code}
    state={state}
    replace={replace}/></AuthProvider>
}