"use client";

import CompleteSkeleton from '@/app/components/skeleton/checkout/complete/complete';
import Complete from '@/app/components/ui/checkout/complete/complete';
import { fetchPaymentById } from '@/app/lib/api/payment';
import { PaymentDto } from '@/app/lib/types/definition';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function PaymentSuccessPage({params}: {params: {id: string}}) {
    const router = useRouter();
    const [payment, setPayment] = useState<PaymentDto>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getPayment = async () => {
            const response = await fetchPaymentById(params.id);
            if (response) {
                setPayment(response);
                setLoading(false);
            } else {
                alert("잘못된 접근입니다. 다시 시도해 주세요.");
                router.push('/');
                return;
            }
        }
        getPayment();
    }, []);
    return (
        loading ? <CompleteSkeleton/> : <Complete payment={payment!} />
    );
}
