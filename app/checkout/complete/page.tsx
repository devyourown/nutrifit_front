import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

// 임시 데이터
const order = {
    id: 'ORD123456789',
    items: [
        { id: 1, name: '상품 1', quantity: 2, price: 15000, imageUrl: '/sample1.jfif', },
        { id: 2, name: '상품 2', quantity: 1, price: 25000, imageUrl: '/sample1.jfif', },
    ],
    subtotal: 55000,
    shippingFee: 3000,
    discount: 5000,
    pointsUsed: 2000,
    total: 48000,
    paymentMethod: '신용카드',
    paymentId: 'PAY987654321',
    shippingAddress: {
        recipientName: '홍길동',
        recipientPhone: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로 123',
        addressDetail: '101호',
        cautions: '부재 시 문 앞에 놓아주세요.',
    },
};

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex flex-col items-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">
                        결제가 완료되었습니다!
                    </h1>
                    <p className="text-gray-600 mt-2">주문번호: {order.id}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">주문 요약</h2>
                    <div className="space-y-4">
                    {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b pb-4 mb-4"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="object-cover rounded"
                                />
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} x{' '}
                                        {item.price.toLocaleString('ko-KR')}원
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-gray-700">
                                    {(item.quantity * item.price).toLocaleString('ko-KR')}원
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">총 상품 금액</span>
                        <span>{order.subtotal.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">배송비</span>
                        <span>{order.shippingFee.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">할인 금액</span>
                        <span>-{order.discount.toLocaleString('ko-KR')}원</span>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm font-medium">사용한 포인트</span>
                        <span>-{order.pointsUsed.toLocaleString('ko-KR')}원</span>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-300">
                        <span className="text-xl font-semibold">총 결제 금액</span>
                        <span className="text-2xl font-bold text-gray-800">
                            {order.total.toLocaleString('ko-KR')}원
                        </span>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
                    <p>
                        <strong>결제 방법:</strong> {order.paymentMethod}
                    </p>
                    <p>
                        <strong>결제 ID:</strong> {order.paymentId}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">배송지 정보</h2>
                    <p>
                        <strong>받는 분:</strong> {order.shippingAddress.recipientName}
                    </p>
                    <p>
                        <strong>연락처:</strong> {order.shippingAddress.recipientPhone}
                    </p>
                    <p>
                        <strong>주소:</strong> {order.shippingAddress.address}, {order.shippingAddress.addressDetail}
                    </p>
                    <p>
                        <strong>배송시 주의사항:</strong> {order.shippingAddress.cautions}
                    </p>
                </div>

                <div className="flex justify-between">
                    <Link href="/shop">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            쇼핑 계속하기
                        </button>
                    </Link>
                    <Link href="/user/orders">
                        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition">
                            주문 내역 보기
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
