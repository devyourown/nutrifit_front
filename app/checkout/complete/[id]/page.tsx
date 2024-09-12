"use client";

import CompleteSkeleton from '@/app/components/skeleton/checkout/complete/complete';
import Complete from '@/app/components/ui/checkout/complete/complete';
import { fetchPaymentById } from '@/app/lib/api/payment';
import { PaymentDto } from '@/app/lib/types/definition';
import { AuthProvider } from '@/app/lib/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        loading ? <CompleteSkeleton/> : <AuthProvider><Complete payment={payment!} /></AuthProvider>
    );
}
