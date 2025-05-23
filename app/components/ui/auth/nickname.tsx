import { checkNickname } from "@/app/lib/checker";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Nickname() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const checker = await checkNickname(username);
        if (checker !== '') {
            setError(checker);
            return;
        }
        const email = localStorage.getItem('email');
        if (!username || !email) {
            alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.')
            router.push('/login');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth/username`, {
                method: 'PUT',
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

    return (
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
        </div>
    )
}