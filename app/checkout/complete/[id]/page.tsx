"use client";

import CompleteSkeleton from '@/app/components/skeleton/checkout/complete/complete';
import Complete from '@/app/components/ui/checkout/complete/complete';
import { fetchPaymentById } from '@/app/lib/api/payment';
import { AuthProvider } from '@/app/lib/use-auth';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export default function PaymentSuccessPage({params}: {params: {id: string}}) {
    const router = useRouter();

    const {data: payment, error } = useSWR(
        params.id ? `/payment/${params.id}` : null,
        () => fetchPaymentById(params.id),
    );

    if (error) {
        alert('잘못된 접근입니다. 다시 시도해 주세요.');
        router.push('/');
        return null;
    }

    if (!payment) {
        return <CompleteSkeleton/>;
    }

    return (
        <AuthProvider><Complete payment={payment!} /></AuthProvider>
    );
}
