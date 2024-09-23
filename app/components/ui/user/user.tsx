"use client";

import { useEffect, useState } from 'react';
import { FaBoxOpen, FaTicketAlt, FaCoins, FaStar, FaCommentDots } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Welcome from './welcome';
import Tab from './tab';
import { useAuth } from '@/app/lib/use-auth';
import UserSkeleton from '../../skeleton/user/user';

export default function User() {
    const router = useRouter();
    const { isLoggedIn, authLoading } = useAuth();
    const [selectedTab, setSelectedTab] = useState('orders');
    const [username, setUsername] = useState('');
    const [jwt, setJwt] = useState('');
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState('');

    useEffect(() => {
        if (authLoading) {
            return;
        }
        if (!isLoggedIn) {
            alert('접근할 수 없습니다. 로그인이 필요합니다.');
            router.push('/');
            return;
        }
        const setUser = async () => {
            setUsername(localStorage.getItem('username')!);
            setJwt(localStorage.getItem('jwt')!);
            setLoading(false);
            setProfile(localStorage.getItem('profile')!);
        }
        setUser();
    }, [authLoading]);

    return (
        loading ? <div><UserSkeleton/></div> : <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <Welcome name={username} profileImage={profile} />

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
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg transition ${selectedTab === 'reviews' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('reviews')}
                    >
                        <FaStar className="mr-2" />
                        나의 리뷰
                    </button>
                    {/* Q&A 탭 */}
                    <button
                        className={`flex items-center px-4 py-2 rounded-lg transition ${selectedTab === 'qna' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedTab('qna')}
                    >
                        <FaCommentDots className="mr-2" />
                        나의 Q&A
                    </button>
                </div>

                <Tab profileImage={profile} token={jwt} selectedTab={selectedTab} />
            </div>
        </div>
    );
}
