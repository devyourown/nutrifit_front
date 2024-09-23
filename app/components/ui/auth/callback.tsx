import { initCartWithDB } from "@/app/lib/trigger";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Nickname from "./nickname";
import { useAuth } from "@/app/lib/use-auth";

interface CallbackProps {
    service: string;
    code: string | null;
    state: string | null;
    replace: string | null;
}

export default function Callback({service, code, state, replace}: CallbackProps) {
    const router = useRouter();
    const { token, login } = useAuth();

    useEffect(() => {
        // 부모 창으로 데이터를 전송
        if (!window.opener && token) {
            window.dispatchEvent(new Event('usernameUpdated'));
            router.replace(replace || '/');
        } else if (window.opener && token) {
            window.opener.postMessage({ token }, `${process.env.NEXT_PUBLIC_DOMAIN}`);
            window.close();
        } else if (window.opener) {
            window.opener.postMessage({ code, provider: service, state }, `${process.env.NEXT_PUBLIC_DOMAIN}`);
            window.close();  // 팝업 창을 닫음
        }

        const checkUserStatus = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/${service}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code, state }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const username: string = data.username;
                    if (username.startsWith("temporary")) {
                        localStorage.setItem('email', data.email);
                    } else {
                        const userId = localStorage.getItem('id');
                        await initCartWithDB(userId!, data.token);
                        localStorage.setItem('id', data.token);
                        localStorage.setItem('email', data.email);
                        localStorage.setItem('username', data.username);
                        login(data.token);
                        router.replace('/');
                    }
                } else {
                    alert('로그인 중 에러가 발생했습니다. 잠시 후 다시 로그인해주세요.');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error checking user status:', error);
            }
            return null;
        };
        checkUserStatus();
    }, []);



    return ( !token && <Nickname/>);
}