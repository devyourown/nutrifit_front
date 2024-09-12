"use client";

import { useEffect, useState } from 'react';
import { FaBoxOpen, FaTicketAlt, FaCoins, FaUserEdit } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Welcome from './welcome';
import Tab from './tab';
import { useAuth } from '@/app/lib/use-auth';

export default function User() {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [selectedTab, setSelectedTab] = useState('orders');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [jwt, setJwt] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            alert('접근할 수 없습니다. 로그인이 필요합니다.');
            router.push('/');
            return;
        }
        const setUser = async () => {
            setUsername(localStorage.getItem('username')!);
            setEmail(localStorage.getItem('email')!);
            setJwt(localStorage.getItem('jwt')!);
            setLoading(false);
        }
        setUser();
    }, []);

    return (
        loading ? <div>로딩중</div> : <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <Welcome name={username} email={email} profileImage={''} />

                <div className="flex space-x-4 mb-6">
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg transition ${selectedTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('orders')}
                    >
                        <FaBoxOpen className="mr-2" />
                        주문 내역
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg transition ${selectedTab === 'points' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('points')}
                    >
                        <FaCoins className="mr-2" />
                        포인트
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg transition ${selectedTab === 'coupons' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('coupons')}
                    >
                        <FaTicketAlt className="mr-2" />
                        쿠폰
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg transition ${selectedTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('settings')}
                    >
                        <IoSettingsOutline className="mr-2" />
                        프로필 설정
                    </button>
                </div>

                <Tab name={username} email={email} profileImage='' token={jwt} selectedTab={selectedTab} />
            </div>
        </div>
    );
}
