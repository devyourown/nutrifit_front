"use client";

import { useEffect, useState } from "react";
import Checkout from "../components/ui/checkout/checkout";
import { Checkout as CheckoutType } from "../lib/types/definition";
import { useRouter } from "next/navigation";
import CheckoutSkeleton from "../components/skeleton/checkout/checkout";
import { AuthProvider } from "../lib/use-auth";

export default function Page() {
    const router = useRouter();
    const [checkout, setCheckout] = useState<CheckoutType>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const setCartWithId = async () => {
            const userId = localStorage.getItem("id");
            const response = await fetch(`/api/checkout?id=${userId}`);
            const checkout: CheckoutType = await response.json();
            if (checkout.items.length === 0) {
                alert("장바구니가 비었습니다. 다시 시도해 주세요.");
                router.push('/');
                return;
            }
            if (!checkout.order) {
                alert('잘못된 접근입니다. 다시 시도해 주세요.');
                router.push('/');
                return;
            }
            setCheckout(checkout);
            setLoading(false);
        };
        setCartWithId();
    }, []);

    return loading ? <CheckoutSkeleton/> :
    <AuthProvider><Checkout checkout={checkout!} /></AuthProvider>;
}
