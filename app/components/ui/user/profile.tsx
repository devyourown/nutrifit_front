"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaBoxOpen, FaTicketAlt, FaCoins, FaUserEdit } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

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

interface ProfileProps {
    
}

export default function Profile() {
    const [selectedTab, setSelectedTab] = useState('orders');
    const [selectedOrderStatus, setSelectedOrderStatus] = useState('all');

    const renderOrderContent = () => {
        const filteredOrders = user.orders.filter(
            (order) => selectedOrderStatus === 'all' || order.status === selectedOrderStatus
        );

        return (
            <div>
                <div className="flex mb-4">
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg transition ${selectedOrderStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedOrderStatus('all')}
                    >
                        전체
                    </button>
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg transition ${selectedOrderStatus === '배송 준비중' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedOrderStatus('배송 준비중')}
                    >
                        배송 준비중
                    </button>
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg transition ${selectedOrderStatus === '배송중' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedOrderStatus('배송중')}
                    >
                        배송중
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition ${selectedOrderStatus === '배송 완료' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setSelectedOrderStatus('배송 완료')}
                    >
                        배송 완료
                    </button>
                </div>
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="p-4 border rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold">
                                주문번호: {order.id}
                            </h3>
                            <p className="text-sm text-gray-500">
                                주문일자: {order.date} | 상태: {order.status}
                            </p>
                            <div className="mt-2 space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>{(item.price * item.quantity).toLocaleString('ko-KR')}원</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'orders':
                return renderOrderContent();
            case 'points':
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">포인트</h2>
                        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                            <div className="flex justify-between">
                                <span>현재 보유 포인트</span>
                                <span className="text-xl font-bold text-blue-500">{user.points.toLocaleString('ko-KR')}점</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {user.pointsHistory.map((point) => (
                                <div key={point.id} className="p-4 border rounded-lg bg-gray-50">
                                    <div className="flex justify-between">
                                        <span>{point.description}</span>
                                        <span className="font-bold">{point.amount.toLocaleString('ko-KR')}점</span>
                                    </div>
                                    <p className="text-sm text-gray-500">소멸 예정일: {point.expiryDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'coupons':
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">보유 쿠폰</h2>
                        <div className="space-y-4">
                            {user.coupons.map((coupon) => (
                                <div key={coupon.id} className="p-4 border rounded-lg bg-gray-50">
                                    <div className="flex justify-between">
                                        <span>{coupon.description} ({coupon.code})</span>
                                        <span>{coupon.receivedDate} - {coupon.expiryDate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">프로필 설정</h2>
                        <div className="flex items-center mb-4">
                            <Image
                                src={user.profileImage}
                                alt="Profile"
                                width={64}
                                height={64}
                                className="rounded-full object-cover"
                            />
                            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                                이미지 변경
                            </button>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">이름</label>
                            <input
                                type="text"
                                value={user.name}
                                className="w-full px-3 py-2 border rounded-lg mb-4"
                                placeholder="이름을 입력해 주세요."
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">이메일</label>
                            <input
                                type="email"
                                value={user.email}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="이메일을 입력해 주세요."
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <Image
                        src={user.profileImage}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">안녕하세요, {user.name}님!</h1>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

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

                {renderTabContent()}
            </div>
        </div>
    );
}
