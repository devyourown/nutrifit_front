"use client";

import { useEffect, useState } from 'react';
import { FaBoxOpen, FaTicketAlt, FaCoins, FaUserEdit } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import Tab from '../components/ui/user/tab';
import Welcome from '../components/ui/user/welcome';
import { useRouter } from 'next/navigation';

// 임시 데이터
const user = {
    name: '홍길동',
    email: 'honggildong@example.com',
    points: 1500,
    pointsHistory: [
        { id: 1, description: '상품 구매 적립', amount: 500, expiryDate: '2024-12-31' },
        { id: 2, description: '이벤트 참여', amount: 1000, expiryDate: '2025-01-15' },
    ],
    coupons: [
        { id: 1, code: 'WELCOME10', description: '10% 할인', receivedDate: '2024-07-01', expiryDate: '2024-12-31' },
        { id: 2, code: 'FREESHIP', description: '무료 배송', receivedDate: '2024-08-01', expiryDate: '2024-11-01' },
    ],
    profileImage: '/path-to-profile-image.jpg',
    orders: [
        {
            id: 'ORD123456789',
            date: '2024-08-20',
            status: '배송 준비중',
            items: [
                { id: 1, name: '상품 1', quantity: 2, price: 15000 },
                { id: 2, name: '상품 2', quantity: 1, price: 25000 },
            ],
        },
        {
            id: 'ORD987654321',
            date: '2024-07-15',
            status: '배송중',
            items: [
                { id: 3, name: '상품 3', quantity: 1, price: 35000 },
            ],
        },
        {
            id: 'ORD654321987',
            date: '2024-06-10',
            status: '배송 완료',
            items: [
                { id: 4, name: '상품 4', quantity: 3, price: 12000 },
            ],
        },
    ],
};

export default function UserProfile() {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState('orders');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [jwt, setJwt] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
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
