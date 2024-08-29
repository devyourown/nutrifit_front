"use client";

import { useEffect, useState } from "react";
import Checkout from "../components/ui/checkout/checkout";
import { Cart } from "../lib/types/definition";
import { useRouter } from "next/navigation";
import CheckoutSkeleton from "../components/skeleton/checkout/checkout";

export default function Page() {
    const router = useRouter();
    const [cart, setCart] = useState<Cart>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const setCartWithId = async () => {
            const userId = localStorage.getItem("id");
            const response = await fetch(`/api/cart?id=${userId}`);
            const cartData: Cart = await response.json();
            if (cartData.items.length === 0) {
                alert("장바구니가 비었습니다. 다시 시도해 주세요.");
                router.push('/');
                return;
            }
            if (!cartData.order) {
                alert('잘못된 접근입니다. 다시 시도해 주세요.');
                router.push('/');
                return;
            }
            setCart(cartData);
            setLoading(false);
        };
        setCartWithId();
    }, []);

    return loading ? <CheckoutSkeleton/> :<Checkout cart={cart!} />;
}
