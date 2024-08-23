"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkNickname } from '@/app/lib/checker';

export default function Page() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
    const [error, setError] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        const provider = "google"

        // 부모 창으로 데이터를 전송
        if (!window.opener && jwt) {
            window.dispatchEvent(new Event('usernameUpdated'));
            router.replace('/');
        } else if (window.opener && jwt) {
            window.opener.postMessage({ jwt }, "*");
            window.close();
        } else if (window.opener) {
            window.opener.postMessage({ code, provider }, "*");
            window.close();  // 팝업 창을 닫음
        }

        const checkUserStatus = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/google/check`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code }),
                });

                console.log(response);

                if (response.ok) {
                    const data = await response.json();
                    const username: string = data.username;
                    if (username.startsWith("temporary")) {
                        localStorage.setItem('email', data.email);
                    } else {
                        setJwt(data.token);
                        localStorage.setItem('jwt', data.token);
                        localStorage.setItem('email', data.email);
                        localStorage.setItem('username', data.username);
                    }
                }
            } catch (error) {
                console.error('Error checking user status:', error);
            }
        };
        checkUserStatus();
    }, [jwt]);

    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const checker = await checkNickname(username);
        if (checker !== '') {
            setError(checker);
            return;
        }
        const email = localStorage.getItem('email');
        if (!username || !email) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('username', data.username);
                window.dispatchEvent(new Event('usernameUpdated'));
                router.replace('/');  // 닉네임 설정 후 대시보드로 이동
            } else {
                console.error('Failed to set nickname');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return ( !jwt &&
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6">닉네임 설정</h2>
                <p className="text-center text-gray-600 mb-4">
                    닉네임을 설정해주세요. 이 닉네임은 다른 사용자에게 표시됩니다.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nickname" className="block text-gray-700">
                            닉네임
                        </label>
                        <input
                            id="nickname"
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="밥상엔닭가슴살 | 뉴트리피잇"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className='text-red-400'>{error}</p>}
                    <button 
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900"
                    >
                        닉네임 짓기
                    </button>
                </form>
            </div>
        </div>);
}